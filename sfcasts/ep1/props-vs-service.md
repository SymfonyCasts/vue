# Passing Props vs Fetching Directly

At this point, we have access to which category we're currently on and *all* the
category data. I think we can use all that goodness to print a better title: we
should print the category name if we're on a category page.

Check out `catalog.vue`: *this* is where the `h1` lives. Ok, all *we* need to do
is use the `currentCategoryId` to find that category in the `categories` data, and
then print its name.

To do this, we *could* create a computed property right in `catalog` with all of
this logic, and then print it right here. But instead, I'm actually going to
isolate this title area into its own component. Again, *when* you should move
something into its own component is subjective, but I'm planning to reuse this
title area in the next tutorial.

## Creating the Title Component

In the `components/` directory, create a new `title.vue` file and start the same
way as always: with the template. I'm going to set this to a `<div>` and
immediately add `:class="$style.component"`. Add the `h1` inside of that. For now,
I'll hardcode "Products".

Next, add the `<script>` tag with the minimum needed: `export default` and
`name: 'Title'`.

Finally, at the bottom, because we're already referencing `$style`, add
`<style lang="scss"` and make it modular. Add just one style: `.component {}`,
an `h1 {}` inside, and give it `font-size: 1.7rem`.

Perfecto! A nice, simple component to render the title.

In `catalog.vue`, let's use this! But when I import it, I'm going to call it
`TitleComponent` from `@/components/title`. The reason is that, when we add
`TitleComponent` to `components`, it *really* means
`TitleComponent: TitleComponent`.

Anyways, by using key - `TitleComponent` - it allows us, in the template, to say
`<title-component />`.

That's great. But if we had called it `Title`, then, in the template, we would
need to use `<title />`. See the problem? `<title>` is a *real* HTML tag! And
so instead of rendering our `title` component, it would just... render a `title`
tag!

In general, if you want to avoid collisions, a best practice - which I admit we
have *not* been following - is to include a `-` every time you render a component.
There's a W3C spec that recommends that every custom component in HTML contain
a dash.

Anyways, when we use `<title-component>`... I think it's working! I still see
"Products".

To make that print the actual *category* name, *something* needs to use the
`currentCategoryId` and `categories` info to find the current category's name.
For now, I'm going to put that logic directly into `title`. That means that
`title` will need to receive both of these pieces of data as props. add `props:`
with `currentCategoryId`, `type: String` and `default: null` so that null is allowed.
Then add `categories` with `type: Array` and `required: true`. This is everything
we need get the correct category name.

## categories Prop vs Use the Service!

But I want to talk about the `categories` prop. Obviously, our `title` component
will need the `categories` Array so it can do its job. By adding it as a prop,
you can already see that my plan is to pass this in from the parent component.

But in our app, we know that categories are *actually* being loaded from the
global `windows.categories` variable: they are *not* being loaded via Ajax.
They're also not something that will never *change*: once we get the categories,
those are the categories forever.

So in reality, because the categories are *instantly* available - they don't require
an AJAX call - and they will never change, instead of using a prop, we *could*
just use our `category-service` to get that data!

## Props vs Grabbing a Value Directly

This is a *key* thing that I want you to understand: we use props for two reasons.

The first reason is to directly pass configuration to a component.
For example, our `Legend` component has a `title` prop. If you want to use this
component, then you need to pass that configuration, which could be a piece
of data, a hardcoded string or anything. It's like an argument to a method.

The second reason we use props is related, but more subtle. When something will
*change* during the lifecycle of our Vue app, then that "thing" *must* live as
data on a component. And once something lives as data on a component, the only
way to make it accessible to child components is by passing the value as a
prop. In a more perfect world, we might store that data in a central location
outside of *any* components, and then let each component that needs it grab it
directly. And that actually *is* possible with Vuex or some new features of Vue 3,
which we'll talk about in another tutorial.

*Anyways*, in this situation, because `categories` is boring, static data, it
doesn't really need to live as data anywhere. And that means, we do *not* need
to pass it down as props. If we want to, it would be *totally* ok fetch the
categories directly from `categories-service` wherever we need it.

Now that you know the *easy* solution, let's take the *harder* path. Let's pretend
that our categories *are* still loading via AJAX... which means that *technically*
they *do* change during our app's lifecycle: they're empty for a moment, and
*then* they populate. Let's tackle this next.
