# CSS: Styling a Component

Our main focus in this tutorial will be to build a rich product listing page inside
of `products.vue`. To get that started, I'm going to replace the `h1` with some new
markup - you can copy this from the code block on this page.

Notice that there is nothing special yet. We're not rendering any variables: this
is 100% static HTML. If you refresh the page, ok! We have a sidebar on the left,
and an area on the right where we will *eventually* list some products. Good start!

## Global CSS and Vue Components

And, though it's not pretty, it *does* already have *some* styling. If you look back
at the HTML I just pasted, the basic styling is thanks to some Bootstrap classes
that are on the elements. This works because, in the `assets/scss/app.scss` file,
we're importing Bootstrap and I've decided to include the built `app.css` file on
every page. So, naturally, if we use any Bootstrap classes in Vue, those elements
get styled.

## Custom Component style Section

But I also want to add some extra styling that's *specific* to the sidebar. The
question is: where should that CSS live? We could, of course, add some classes
to `app.scss` and use those inside our Vue component.

But Vue gives us a better option: because we want to style an element that's
created in this *component*, Vue allows us to also put the *styles* in the component.

First, inside the `aside` element, give this `<div>` a new class called `sidebar`.
Next, at the bottom - though it doesn't matter where - there is *third* special
section that any `.vue` file can have: you can have a `<template>` tag, a
`<script>` tag and also a `<style>` tag. Inside, we're writing CSS: add `.sidebar`
and let's give it a border, a `box-shadow` and a `border-radius`.

Styling done! Remember: we're still running `yarn watch` in the background,
so Webpack is constantly re-dumping the built JavaScript and CSS files as we're
working. Thanks to that, without doing *anything* else, we can refresh and...
the sidebar is styled!

This works thanks to some Vue and Webpack teamwork. When Webpack sees
the `style` tag, it grabs that CSS and puts it into the entry file's CSS file,
so `products.css`.

View the page source: here's the `link` tag to `/build/products.css`. Whenever
we add any styles to any component that this entry uses, Webpack will find those
and put them in here. Like a lot of things with Webpack, it's not something you
really need to think about: it just works.

## Using Sass Styles

So this is awesome... but I *do* like using Sass. If you look at
`webpack.config.js`, down here... yep! I've already added Sass support to Encore
with `.enableSassLoader()`.

Open up `assets/scss/components/light-component.scss`. This is a Sass mixin that
holds the exact CSS I just added manually. If we could use Sass code
inside the `style` tag, we could *import* this and save ourselves some duplication!

And that's *totally* possible: just add `lang="scss"`.

Now that we're writing Sass we can
`@import '../../scss/components/light-component'` and inside `.sidebar`,
`@include light-component;`.

Let's try it! Back over on your browser, refresh and... we have Sass!

To finish off the styling, I'll use Sass's nesting syntax to add a hover state
on the links. Now after we refresh... got it!

Being able to put your styles *right* inside the component is one of my
*favorite* features of Vue. And in a bit, we're going to do something even *fancier*
with modular CSS.

Next, let's add some dynamic data back to our app and play with one of the *coolest*
things in Vue: the developer tools.
