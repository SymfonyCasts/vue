# Loading

Coming soon...

Google for "vue lifecycle hooks". And you'll find, uh, on the Vue instance page all the way at the
bottom, there's a spot about the instance lifestyle hooks. In what we're talking
about here is back in catalog, that view we're talking about, about the things like
the mounted function you can look at. So if you scroll down here a little bit, they
have a lifecycle diagram and wow, you can really nerd out on all the different things
that happen between you starting a new view instance to it being rendered onto the
page, do it updating to it. Finally being removed from the page. If you ever actually
removed a component. So feel free to nerd out on this. I just want to highlight
probably the three most important lifecycle hooks are `created`, `mounted`.
And there's a third one, which is not as common, but occasionally you need to unload
things. If your element is extra removed from the page and that's `destroyed` so
earlier,

We use `mounted` to loader data. So that means that our Vue instance was created. And
then it was added to the page actually mounted under the DOM. And then this function
was called.

well it turns out that a better place to low data is actually `created`. It is

I'll close this. And if we go over and I'll just refresh to be safe, you can see that
that works just fine. So the `created()` function is called as soon as our view instance
is instantiated. This function starts and then Vue immediately continues to load our
instance and then mounted on the page. So by the time our instances mounted onto the
page, our products may or may not be available. It doesn't really matter. And in
fact, you can see that they are not available for an instant. So mountain `created` is
really the best place to kind of do any kind of data setup stuff. `mounted` is
something that you only need. If you needed to do some sort of a direct Dom
manipulation, where you literally already need to be `mounted` onto the page. Now, as
Jose, even though this is loading a little bit faster than before, we still have a
spot where there's nothing on the page for just an instance. So what we really need
is some sort of a loading message. And that's of course, a super common thing in all
rich JavaScript applications is you're going to have to have some way for things to
load.

So to help with this and have some consistency, let's create a new loading component.
So inside its `components/`, I'm gonna create a new `loading.vue` component. This
is gonna be a really basic component while the template here. And it doesn't really
matter what this looks like, but I'll put an `<h4>`,

With just loading inside. And I'm going to give us a class as well. It's actually be
a style class all to `:class=""`. And I'll say, stop the `$style.component` that
components from those that kind of standard. Sometimes you have a class on the
outside of your, on the top low of your component. You call a class `$style.component`
in a second. We'll add a `<style>` tag down here that actually adds that. But
first let's add the `<script>` that we need say `export default`. And this is gonna be a
really simple component. It's just going to have a `name` and that's actually going to
be it.

And finally, I went down here, we'll put the `<style>` tag or so we're going to say 
`lang="scss"`. Cause we like using SASS. And they'll say module to turn this into a `module`
thing. And here we'll put `.component` to define our component class a what I'm
basically doing here is I'm gonna put like a little loading animation background. If
you look in our `assets/` directory, there's an `images/` directory, which actually already
has a little `loading.gif` that we're going to put inside of here. So I'm gonna set
that as my background image. So I'm gonna say `background: url()`. And in Webpack
in general, this is not specific to Vue. If you want to refer to a image inside of
CSS, you just need to put the real relative path to that. So we need to basically go
up one directory into JS up another director into assets and then into images to get
there. so `../../images/loading.gif`. We could also set up a web Webpack alias
for this, like we did for these styles. That's up to you and I'll finish this with a
`no-repeat` and we'll do `left center` for its positioning. The one more thing, I was
going to be a little padding on here.

Um, it's a position that loading animation

and say hello to our super fancy loading component. Now to get this to show properly,
we're not going to put an `index.vue`, this is actually a, where are we?

We're going to add it to `index.vue` because basically if, uh, the products are
empty, then we need to put something inside of here that actually says loading. So
bump this. I'm gonna add a little bit of markup.

`<div>` give it a little bit of bootstrap. Uh, it would boost her up column some padding and
here is where I'm actually going to add my loading component. So of course, to do
that, um, first I need to go down here and actually import that. So let's 
`import Loading from '@/components/loading'`

And then we'll add our `Loading` component here. The order doesn't matter on that. And
then up here, I'm going to say `<loading />` and it's that simple. Now of course, we look
at this. Now we're going to have a loading animation, always, which is not exactly
what we want. We only want this to show on the products haven't been loaded yet.
Remember there's two different ways to conditionally show or hide things in view
there's `v-show`. And there's `v-if` now in this case, this loading thing is going to be
something that shows and actually on a hives. So it's actually more appropriately be
`v-show` a `v-if` it's more appropriate when you actually want entire sections to load or
load or never load `v-show` is a little bit faster to hide and show things. So let's
add a `v-show` on the element on the component. And let's see right now, the
easiest way to do this is that if the products is empty, then we know that this
should show this is going to be a perfect solution as you'll see later, but it's
going to work really well for us right now. So I'll say `products.length === 0`.

Perfect. So I go over now and refresh. Yes, that looks perfect. And we don't need to
do this, but if you want to down here, you can also add a `v-show=""` on the other
one. You could say `products.length > 0`. It's not really needed
since this is a loop. So of course it's not going to show up products is empty, but
that's just an example of how we would, um, kind of show that only in the other
situation. Perfect. Now we have a nice loading thing that we'll use going forward.
Next, our products are loading dynamically. I'm very happy about that. Our categories
are still not loading dynamically. That's something we need to fix.

