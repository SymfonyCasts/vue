# The Formidable v-model

Ya know what just occurred to me? We *haven't* talked *at all* about form
elements yet! And what a wonderful coincidence! Because our *next* challenge is to
add a search bar input to filter the product list.

The search bar will, of course, contain some HTML. It will also need to manage
the value of the search bar and help us know when we should filter the product
list. That's *enough* that I think we should isolate this in a new component.

## Creating the search-bar Component

In `components/`, create a new file called `search-bar.vue`. Add the `<template>`
with `<div>` and an `<input>` with `class="form-control"`, a `placeholder` and
`type="search"`.

[[[ code('f98141f60c') ]]]

So nothing special. If you're wondering why I added the `div`, it's just because
we're going to have *more* than just the input later.

At the bottom add the `<script>` section with the basic
`export default` and `name: 'SearchBar'`.

[[[ code('941acdff6a') ]]]

*Love* it! Over in `catalog.vue`, let's see... change the `div` around the title
to `col-3`, and then, below, add a new `<div class="col-9">`. Inside, we haven't
imported the `search-bar` component yet... but ah! Let's try to use it anyway!
Type `<sea` and hit tab to auto-complete that.

[[[ code('345c0dee30') ]]]

When we did that, because PhpStorm is *awesome*, it added the import *and* put this
down in the `components` section. PhpStorm, did we just become best friends?

[[[ code('0b06cbb76f') ]]]

Let's check the browser. Boom! That's a *sweet* search bar. *Now* let's bring
it to life

## Binding a data to the Input

To filter the product list, we need to know the *value* of the input. There are
a few ways to get this, but the simplest is to add a piece of `data` to the component
that we keep "in sync" with the text of the input. Add `data` and return an object
with one item: `searchTerm` set to an empty string to start.

[[[ code('4568551097') ]]]

To "bind" this data to the input, we need to do two things. First, set the input
value to the data: `:value="searchTerm"`.

[[[ code('13c16e17d4') ]]]

Now with *just* that, if move over to the browser and look at the Vue dev tools,
we can click on `SearchBar`, change the `searchTerm` data and... voilà! The
input text updates... which shouldn't be too surprising. That's Vue goodness
in action.

But what we *can't* do yet is type in the box and have it *update* that data.
That's the *second* part of binding an input to data.

## @input for when the Input Changes

How can we do that? It's lovely: by listening to an event on the input.

Remember: the way we listen to an event is with `v-on:` and then the name of the
event, like `click` or `keydown`. Well, in practice, we use the shortcut `@` syntax,
so `@click` or `@keydown`.

In this case, use `@input`. The `input` event is a native, normal JavaScript
event that's *similar* to `keyup`: it will trigger any time the input's value
changes.

Inside the quotes, *so far*, we've set this to something like `someMethod`.
Then, we've added a `methods` option, with a `someMethod` function, and put
whatever code we want to run right there.

That's *totally* valid, but if what you need to do is simple, you can *also*
write an expression right inside the attribute. In this case, when the input
changes, we only need to set the `searchTerm` data to the new string.

## Inline v-on Expression

To do that, say `searchTerm` - which we know *really* means `this.searchTerm` -
equals `$event.target.value`.

[[[ code('[[[ code('a2fd8dc644') ]]]') ]]]

That... deserves an explanation. If we set this to a method name, then the method
will receive an `event` argument. Then we can say `event.target.value` to get
this input's value.

When you write an inline expression, Vue magically makes the `event` object available
as a `$event` variable.

But... hmmm... ESLint is mad: it doesn't like how I ordered my attributes. From
a technical standpoint, we can put these in *whatever* order we want. But as a
standard, ESLint likes to have listeners - like `@input` - on the bottom.

Ok, let's take our input for a test drive! Back at the browser, find `SearchBar`
on the dev tools. Now, as we type... yea! The data is updating!

What we *effectively* just did is took a piece of data - `searchTerm` - and *bound*
it to a form input. When the data changes, the input changes. When the input
changes, the data changes.

## Hello v-model!

This is a *very* common thing to do in Vue. In fact, it's *so* common that Vue
created a special directive *just* for it.

Check this out: we can delete the `@input` and `:value` lines and replace them with
*one* line that will do the *exact* same thing. It's `v-model="searchTerm"`.

[[[ code('f7cec55c97') ]]]

This is one of the *last* important directives that we haven't already talked
about. `v-model="searchTerm"` *literally* means: set the value attribute to
`searchTerm` and, on input, *update* the `searchTerm` data with the input value.
It's identical to what we had before.

Now `v-model` *does* act a little bit different with things like checkboxes or
select elements, but those are minor normalizations to make `v-model` work how you
*want* it to work for those elements. Back at the browser, everything is hooked
up just like before.

You're probably going to see `v-model` *all* the time. For me, it helps to remember
what it's *really* doing behind the scenes: setting the input's `value` to the
`searchTerm` data and, on change, *updating* that data for you.

Next: let's use this search term to filter our product list as the user is typing!
