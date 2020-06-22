# Loading Component

Google for "vue lifecycle hooks" and click into
[The Vue instance](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)
page. About half way down, you'll find a spot that talks about "Instance Lifecyce Hooks".

If you look back at `catalog.vue`, "lifecycle hooks" is referring to things like
the `mounted()` function, which is called when the component is added to the page.

## The Important Lifecycle Hooks

If you scroll down a bit on the docs, they have a *huge* diagram that you can
*Really* nerd out on: this shows all the different things that happen between
a Vue instance being instantiated, mounted onto the page, rendering, updating
and being removed from the page if you programmatically remove a component.

Feel free to stdy this - it's fund stuff. But I'll highlight the three most
important hooks: `created`, `mounted` and `destroyed`, which is called after
your component is completely removed.

## mounted vs created

We use `mounted` earlier to start our AJAX call. That means that our Vue instance
was created, mounted into the DOM, and *then* the function was called. It turns
out that a better place to load data is actually `created`.

Let's try this: change `mounted` to `created` and then I'll refresh to be safe.
That works *jut* fine.

The `created()` function is called as *soon* as the Vue instance for our component
is instantiated. That let's us start our AJAX call as *early* as possible. By the
time it's mounted on the page, the `products` may or may *not* yet be available,
probably they aren't. But it doesn't really matter. And we can see this when we
refresh: the products are *missing* for a moment.

The point is: `created` is the best place to do data setup like this. `mounted` is
a great hook point if you need to do something that will manipulate the DOM.

## Creating the Loading Component

Now even though this is loading a *tiny* bit faster, it's still not instant. And
so, to give our users confidence that our server isn't on vacation, we need a
loading messaging.

To help us have a *consistent* loading message whenever we need one, let's create
a shiny new Loading component. Inside `components/`, create a new `loading.vue`
component. Add the `template` with an `<h4>` that says `Loading...` inside. Let's
also give this a class: `:class="$style.component"`.

Before we *add* that style, create the `<script>` tag with `export default` the
options object. The only needs a `name` key set to `Loading`.

*Now* let's add the `<style>` tag with `lang="scss"` and `module`. Add just
one class: `.component`.

If you look at the `assets/` directory, it has an `images/` directory with a
`loading.gif`. In the `.component` class, we're going to set this as a background
image. We can do that with `background: url()`. To refer to the image in Webpack,
use the real, relative path to it from here: `../../images/loading.gif`. We could
also add a Webpack alias for `images/` if we want. Finish this with
`no-repeat left center`. Also add a little padding to put the text next to this
animation.

Say hello to our *super* fancy loading component!

## Using the Component

Over in `index.vue`, let's use this! I'll start by adding some markup to hold
the loading message. Now, import it with `import Loading from '@/components/loading'`
and add `Loading` to components - the order doesn't matter.

Back in the template, say `<Loading />`.

We're not *conditionally* hiding and showing that yet but... there it is! Not bad!

## Hiding / Showing the Loading Animation

Let's see: we only want to show the `Loading` component when the products AJAX
call hasn't finished. The two different ways to conditionally hide or show something
is `v-show` and `v-if`. In this case, especially because we're *eventually* going
to be loading the product list multiple times when we have a search bar, let's use
`v-show`. Add `v=show=""`. And, let's see: the easiest way to know if the products
are still loading is to check if `products.length === 0`.

That's not a *perfect* solution - and we'll see why later - but it's good enough
for now. And when we reload... nice! That's much better.

We can also add a `v-show=""` on the `product-card` element with
`products.length > 0`. It's not *really* needed since this won't even loop if there
are no products, but it balances things nicely.

We now have dynamic products *and* a loading animation while the AJAX call is
finishing. I'm super happy about that! But our categories are *not* dynamic yet.
Let's fix that next. But after we do, we'll explore a *faster* way of loading them.
