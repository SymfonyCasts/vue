# Organizing into more Components

One of the huge benefits of Vue is being able to organize your DOM elements and
their behavior into smaller pieces. Our app is still pretty simple - we aren't
even loading products yet! But you can already see that our template is getting
a bit difficult to look at. Can we break this into some sub-components?

Let's see: this really looks like two parts: a sidebar and then a main area that
will display the list of products - I'm going to call that the "catalog". Ok!
We'll create two new components to keep things organized.

## Creating the Catalog Component

Let's start with the catalog. Inside the `components/` directory - because this
will technically be a component that we could re-use, create a new file called
`catalog.vue`.

Inside, we always start the same: add a `<template>` tag - I'll just put an empty
`<div></div>` to start - and then a `<script>` tag. Inside that, we at *least*
need `export default` and then an object. And to help debugging, we're always
going to include a `name` key to identify this component.

Nice start! Let's go grab the pieces that we want to move here. Let's see: I want
the Products title, the area where we will list products and the legend down here.
Basically, I want to bring in this entire `col-xs-12` div. But... I won't *exactly*
do that. It's up to you, but I think the `col-xs-12` belongs in *this* template
because it defines the "shape" for the catalog. In theory, the catalog itself
could be embedded into *any* area on the site.

So I'm going to copy the 3 divs inside of this. Back in `catalog.vue`, I'm going
to keep this empty div. Why? Of the rules of a Vue is that you *must*
have a *single* outer element in each component. If we deleted the div, we would
have *three* outer elements and... you won't be friends in Vue anymore.. There
*is* a way to fix this in Vue 3 - called Fragments, and you can even use a
a fragments plugin for Vue 2 if you really want to avoid this. But we'll keep the
extra div.

Let's see: we're using `<legend-component />`, so we need to import that just
like we did before - `import LegendComponent from ./legend` - and add a `components`
option with this inside.

Perfect: `LegendComponent` down here, allows us to use `legend-component` in the
template.

The last thing we need is our data: this is the text that we pass to
`LegendComponent`. Copy the `data()` function from `products.vue` and paste it
here.

Now we *could* have kept this `data` key in `products` and passed it into
`catalog` as a prop. We're going to talk more later about *where* a piece of
`data` should live and why... because it's not always clear. But don't worry
about that yet.

## Creating the Sidebar Component

Ok! I think this component is ready! Let's do the sidebar. Create a new file
called `sidebar.vue` and start the same way: with a `<template>` tag. This time,
let's immediately grab the template code we need. Like last time, I'm going to
leave the `col-xs-12` here so that the parent component can determine the layout.
Copy the `<div>` inside and paste it into `sidebar.vue`.

Perfect! Now add the `<script>` tag with `export default`, `name: 'Sidebar'`.
And... that's all the config this component needs.

But the sidebar *does* need some styling. Back in `products.vue`, all the way
at the bottom, copy the *entire* `style` tag and put it into `sidebar.vue`.

## Cleaning up the Parent Component

I think we're ready to use our new stuff! In `products.vue`, this is going to be
*super* satisfying. Remove the old import and replace it with
`import Catalog from` and then we need to go up one level `../components/catalog`.
I'll copy that and also import `Sidebar` from `sidebar`. Add both of these to the
`components` option to make them available in the template.

Ready to delete some code? Remove *all* sidebar markup and instead say:
`<sidebar />`. Do the same for the 3 catalog divs: just `<catalog />`.

In the component itself, if you look at `data()`, the `legend` key is no longer
used directly in this component... so we can delete the whole function. Also remove
the `style` tag.

Wow. Look at that! Down to about 25 lines of code! Deciding *when* a component
should be split into smaller components isn't a science. In this case, none of
the code we removed was *complex*, but splitting it allowed us to organize quite
a lot of HTML and styles.

This feels good to me. Let's see if it works! And, thanks to the `dev-server`
that's running in hot mode, we don't even need to refresh: it *does* work. But
I'll refresh just to prove it.

Next: as our app grows, there will be more and more directories and paths to keep
track of, like going to `../components` or `../../scss`. That's not a huge deal,
but we can add a shortcut to make our life easier.
