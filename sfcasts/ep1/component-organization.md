# Organizing into more Components

One of the huge benefits of Vue is being able to organize your DOM elements and
their behavior into smaller pieces. Our app is still pretty simple but you can
*already* see that our template is getting a bit crowded. Could we break this
into sub-components?

Let's see: this really looks like two parts: a sidebar and a main area that
will eventually list products - I'm going to call that the "catalog". Ok!
Let's create two new components to keep things organized.

## Creating the Catalog Component

Start with the catalog. Inside the `components/` directory - because this
will technically be a component that we could re-use, create a new file called
`catalog.vue`.

Then we *always* start the same - I *love* when things are boring! Add a
`<template>` tag - with an empty `<div></div>` to start - and a `<script>` tag.
The *minimum* we need here is `export default` an object. To help debugging, we
always include at least a `name` key that identifies this component.

[[[ code('5b57285b79') ]]]

Nice start team! Let's go grab the parts that we want to move here. Let's see: I want
the Products title, the area where that will list products and the legend.
Basically, I want to move this entire `col-xs-12` div. But... I won't *exactly*
do that. It's up to you, but I think the `col-xs-12` belongs in *this* template
because it defines the "layout" for `products` page. In theory, the catalog component
could be embedded into *any* area on the site, so I won't put this element in there.

Instead, copy the 3 divs *inside* of this element. Back in `catalog.vue`, I'm going
to keep the empty div. Why? One of the rules of Vue is that you *must* have a
*single* outer element in each component. If we deleted the div, we would
have *three* outer elements and... you won't be friends with Vue anymore! There
*is* a way to fix this in Vue 3 - called Fragments - and you can even use a
a fragments plugin for Vue 2 if you really want to avoid this. But we'll keep the
extra div.

[[[ code('86430c0420') ]]]

In the template, we're using `<legend-component />` so we need to import that just
like we did before - `import LegendComponent from ./legend` - and add a `components`
option with that inside.

[[[ code('ac7a705c3a') ]]]

Perfect: `LegendComponent` down here, allows us to use `legend-component` in the
template.

The last thing we need is our data: this is the text that we pass to
`LegendComponent`. Copy the `data()` function from `products.vue` and paste it
here.

[[[ code('97ddc7b4ec') ]]]

Now we *could* have kept this `data` key in `products` and passed it into
`catalog` as a prop. We're going to talk more later about *where* a piece of
`data` should live and why. But don't worry about that yet.

## Creating the Sidebar Component

Ok! I think this component is ready! Let's do the sidebar. Create a new file
called `sidebar.vue` and start the same way: with a `<template>` tag. This time,
let's immediately grab the elements we need. Like last time, I'm going to
leave the `col-xs-12` here so that the parent component can determine the layout.
Copy the `<div>` inside and paste it into `sidebar.vue`.

[[[ code('c46c0ab3bc') ]]]

Perfect! Next, the `<script>` tag with `export default`, `name: 'Sidebar'`
and... that's all the config this component needs!

[[[ code('5a1a18d0e7') ]]]

But the sidebar *does* need one more thing: some styles. In `products.vue`, all
the way at the bottom, copy the *entire* `style` tag and put it into `sidebar.vue`.

[[[ code('f3ce2d2500') ]]]

## Cleaning up the Parent Component

I think we're ready! In `products.vue`, this is going to
be *so* satisfying. Remove the old import and replace it with
`import Catalog from` and go up one level `../components/catalog`. Copy that and
also import `Sidebar` from `sidebar`. Add both of these to the
`components` option to make them available in the template.

[[[ code('df3e698837') ]]]

Ready to delete some code? Remove *all* the sidebar markup and instead say:
`<sidebar />`. Do the same for the 3 catalog divs: just `<catalog />`.

[[[ code('a0f96fd6e6') ]]]

In the component itself, if you look at `data()`, the `legend` key is no longer
used directly in this component... so we can delete the whole function. Also remove
the `style` tag.

Wow. Look at that! Down to about 25 lines of code! Deciding *when* a component
should be split into smaller components isn't a science. In this case, none of
the code we removed was *complex*, but splitting it allowed us to organize a lot
of HTML and styles. I can *think* more clearly now.

Let's see if it works! Thanks to the `dev-server` that's running in hot mode, we
don't even need to refresh: it *does* work. But... I'll refresh just to prove it.

Next: as our app grows, there will be more and more directories and paths to keep
track of, like going to `../components` or `../../scss`. That's not a huge deal,
but we can add a shortcut to make life easier.
