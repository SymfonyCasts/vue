# Where should a Piece of Data Live?

This collapsing sidebar looks better... except that the layout doesn't change.
Hmm, it would make more sense if the main content moved over to take up more space.

Right click and inspect element on this area. When we collapse the sidebar, what
we *need* to do is change the classes on the `<aside>` to take up less space and
change the classes on the main `<div>` to take up *more* space.

Pff. No problem: we just need to make a few classes dynamic!

Yes... but... it's not so simple. The `collapsed` data lives inside of `sidebar`.
But the elements where we need to use that information do *not*. They live inside
`products.vue`: here's the `<aside>` and this is the `<div>`. Somehow we need to
access the collapsed data right here.

## Never Duplicate Data

Let me *first* say one important thing: a piece of data - like `collapsed` -
should *never* be duplicated. It must always live in exactly *one* spot. So what
we're *not* going to do is create another `collapsed` data inside of `products`...
and then - somehow - try to keep the new `collapsed` data in sync with the
`collapsed` data in sidebar. Yuck!

Nope, a piece of data should always live in exactly one spot.

Now, if you use something like Vuex - or some strategies in Vue 3 that we'll talk
about in a future tutorial - then it's possible to store your data in a central
location, *outside* of your components. Then multiple components can get and set
that data directly. But in our case, there's only one place that data can live:
inside a component.

## In which Component should Data Live?

And so, each time you need to introduce a new piece of data into your app, there's
a natural question: which component should this data live in? Like, why did we
put `collapsed` in `sidebar` instead of, maybe inside `products.vue`?

Here's the rule: you should add data to the deepest component that needs it. By
deepest, I'm referring to the component hierarchy that you can see in the Vue
Dev tools: `Sidebar` is a deep component and `Products` is higher.

Now, until this moment, the *only* component that needed access to the `collapsed`
data was `Sidebar`. So it made *perfect* sense to put it inside `Sidebar`. But
*now* we realize that we *also* need access to the `collapsed` data inside of
`Products`.

To make this work, we actually need to *move* the `collapsed` data from `sidebar`
up into the `products` components. That will allow us to *pass* it down into
`sidebar` as a prop. You can't pass data *up*, but you *can* pass it down.

## Moving the collapsed Data

Let's get to work! Inside of `products.vue`, let's add the new data. Create the
`data()` function. Call the data `sidebarCollapsed` - so we know *what* is
collapsed - and initialize it to `false`.

Now that the data lives here, we need to pass it to `sidebar`. No problem! Say
`:collapsed` - because we need this to be set to a dynamic value -
`="sidebarCollapsed"`.

Perfect! To be able to *receive* this `collapsed` prop, in `sidebar`, we need
to define it. Add `props:` set to an object with a `collapsed` key set to *another*
object. We need `type: Boolean` and I like adding `required: true` to make sure
it's passed.

We now temporarily have a `collapsed` prop *and* a `collapsed` data and PhpStorm
is *mad*! And... it's right: we can't do that and we don't want to. Delete
the `collapsed` data.

The *cool* thing is that, because we named the `collapsed` prop the same as the
data we had before, most of our code is just going to work! Vue doesn't care
if the `collapsed` variable is a data or prop.

Let's try it! Find your browser and I'll refresh just to be safe. Click on the
`Products` component in the dev tools and change the new `sidebarCollapsed` data
to true.

Yes! The sidebar collapsed! If you click on `Sidebar`, you can see that the prop
is true. Each time we change the `sidebarCollapsed` data, the prop in `Sidebar`
*also* changes.

## What Happens when you Modify a Prop

Even clicking the collapse button works! Well... *sort of*. Click on the console
to find... ah! A horrible error!

> Avoid mutating a prop directly since the value will be overwritten whenever the
> parent component re-renders.

So... here's what's happening. We *are* able to reference the `collapsed` prop inside
`sidebar`. But down on the button, when we click it, this calls `toggleCollapsed()`.
Jump down to that method. Ah... then this method *changes* the `collapsed` *prop*.

Earlier, I said that you should *never*, *ever* change the value of a prop. Props
are meant to be *read* but not *modified*. Of course, you might be thinking:

> Yeah... but it worked! When we changed the prop, the sidebar *totally*
> re-rendered correctly!

And that's true! But not everything is right with the world. Look back at the Vue
Dev tools and the `Sidebar` component. The `collapsed` prop is false. When we click
the button, that *correctly* changes to `true`.

But now look at the `Products` component. Under data, `sidebarCollapsed` is false!
When we click the button it does *not* change! By modifying the prop, we've cause
our `sidebarCollapsed` data and `collapsed` prop to get out of sync. If we were
using the `sidebarCollapsed` data in the `Products` component, the sidebar would
probably look half collapsed and half *not* collapsed.

The point is, each piece of data must live in exactly *one* location and *that*
location is the "source of truth". *That* is where the value needs to change.

What we *really* need to do is somehow have the `Sidebar` *tell* the `Products`
component:

> Hey! The button was clicked so... the collapsed data should change!

And *then* the `Products` component could change its *own* data. The *way* to do
this is with `$emit()`. Let's talk about it next.
