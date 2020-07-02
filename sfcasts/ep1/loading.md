# Loading Component

Google for "vue lifecycle hooks" and click into
[The Vue Instance](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)
page. About half way down, you'll find a spot that talks about "Instance Lifecycle Hooks".

If you look back at `catalog.vue`, "lifecycle hooks" is referring to things like
the `mounted()` function, which is called when the component is added to the page.

## The Important Lifecycle Hooks

If you scroll down a bit on the docs, they have a *huge* diagram that you can
*really* nerd out on: this shows all the different things that happen between
a Vue instance being instantiated, mounted onto the page, rendered, updated
and removed from the page if you programmatically remove a component.

Feel free to study this - it's fun stuff. But I'll highlight the three most
important hooks: `created`, `mounted` and `destroyed`, which is called after
your component is completely removed.

## mounted vs created

We used `mounted` earlier to start our AJAX call. That means that our Vue instance
was created, mounted into the DOM, and *then* the function was called. It turns
out that a better place to load data is actually `created`.

Let's try this: change `mounted` to `created` and then I'll refresh to be safe.
That works *just* fine.

[[[ code('63e5042dc0') ]]]

The `created()` function is called as *soon* as the Vue instance for our component
is instantiated. That lets us start our AJAX call as *early* as possible. By the
time it's mounted onto the page, the `products` data may or may *not* yet be available,
probably they aren't. But it doesn't really matter. And we can see this when we
refresh: the products are *missing* for a moment.

The point is: `created` is the best place to do data setup like this. And `mounted`
is the correct hook if you need to do something that will manipulate the DOM.

## Creating the Loading Component

Now even though this is loading a *tiny* bit faster, it's still not instant. And
so, to give our users confidence that our server isn't on vacation, we need a
loading message.

To help us have a *consistent* loading message whenever we need one, let's create
a shiny new `Loading` component. Inside `components/`, add a new `loading.vue`
file. Give this a `<template>` with an `<h4>` that says: - wait for it -
`Loading...`. That's good writing.

Let's also give this a class: `:class="$style.component"`.

[[[ code('4ac76cf7e2') ]]]

Before we *add* that style, create the `<script>` tag with `export default` and
the options object. This only needs a `name` key set to `Loading`.

[[[ code('f131a9b0a7') ]]]

*Now* let's add the `<style>` tag with `lang="scss"` and `module`. Add just
one class: `.component`.

[[[ code('19c0f5285f') ]]]

## Referencing an Image in CSS

If you look at the `assets/` directory, it has an `images/` directory with a
`loading.gif`. In the `.component` class, we're going to set this as the background
image. We can do that with `background: url()` and then the relative path to the
file from here: `../../images/loading.gif`. We could also add a Webpack alias for
`images/` if we want. Finish this with `no-repeat left center` and add a little
padding to get the positioning just right.

[[[ code('a96d08f1d0') ]]]

Say hello to our *super* fancy loading component!

## Using the Component

Over in `index.vue`, time to put it to work! Start by adding some markup to hold
the loading message. 

[[[ code('868ca15e85') ]]]

Next, import it with `import Loading from '@/components/loading'` and add `Loading` 
to `components`: the order doesn't matter.

[[[ code('0be1ac2c10') ]]]

Finally, celebrate in the template with: `<Loading />`.

[[[ code('2f51af1bec') ]]]

We're not *conditionally* hiding and showing that yet but... there it is! Not bad!

## Hiding / Showing the Loading Animation

Ok: we only want to show the `Loading` component when the products AJAX
call hasn't finished. The two different ways to conditionally hide or show something
are `v-show` and `v-if`. In this case, especially because we're *eventually* going
to be loading the product list multiple times when we have a search bar, let's use
`v-show` so we can hide & show it quickly. Add `v-show=""`. And, let's see: the
easiest way to know if the products are still loading is to check if
`products.length === 0`.

[[[ code('d80f786f93') ]]]

That's not a *perfect* solution - we'll see why later - but it's good enough
for now. And when we reload... that's nice!

We can also add a `v-show=""` on the `product-card` element with
`products.length > 0`. It's not *really* needed since this won't even loop if there
are no products, but it balances things.

We now have dynamic products *and* a loading animation while the AJAX call is
finishing. I'm super happy about that! But our categories are *not* dynamic yet.
Wah, wah. Let's fix that next. But after we do, we'll explore a *faster* way to
load them.
