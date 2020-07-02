# The Formidable v-model

We've done a *lot* with rendering, data, props and other stuff... but we *haven't*
talked about form elements yet. What a wonderful coincidence! Because our *next*
challenge is to add a search bar to the page to filter the product list.

The search bar will, of course, contain some HTML. It's also going need to manage
the value of the search bar and help us know when we should filter the product
list. That's *enough* that I think we should create a new component for this!

## Creating the search-bar Component

In `components/`, create a new file called `search-bar.vue`. Add the `<template>`
with `<div>` and an `<input>` inside. If you're wondering why I added the `div`,
it's because we're going to add *more* than just an input later.

Add `class="form-control"`, a `placeholder` and `type="search"`.

So nothing special. At the bottom add the `<script>` section with the basic
`export default` and `name: 'SearchBar'`.

*Love* it! Over in `catalog.vue`, let's see. Change the `div` around the title to
`col-3`, and then, below, add a new `<div class="col-9">`. Inside, even though
we haven't imported the `search-bar` component yet... ah, let's try ti use it
anyway! Type `<sea` and hit table to auto-complete that.

When we did that, because PhpStorm is awesome, added the import *and* put this
down in the `components` section.

When we check the browser.... boom! We have a nice search bar. *Now* let's bring
it to life

## Binding a data to the Input

To filter the product list, we need to know the value of the input. There are
a few ways to do this, but the simplest is to add a `data` to the component that
we keep "in sync" with the text in the input. Add `data` and return an object with
one key `searchTerm` set to an empty string to start.

To "bind" this data to the input, we need to do two things. First, set the input
value to the data: `:value="searchTerm"`.

Now with *just* that, if move over to the browser and look at the Vue dev tools,
we can click on `SearchBar`, change the `searchTerm` data and... voilà! The
input text updates... which shouldn't be too surprising.

But what we *can't* do yet is type in this box and have it *update* that data.
That's the *second* part of binding an input to data.

## @input for when the Input Changes

How can we do that? It's lovely: we can *listen* to an event on this input.

Remember: the way we listen to an event is with `v-on:` and then the name of the
event, like `click` or `keydown`. Or, really, we use the shortcut `@` syntax,
so `@click` or `@keydown`.

In this case, let's use `@input`. The `input` event is a native, normal JavaScript
event that's *similar* to `keyup`: it will trigger any time the input's value
changes.

For the value, *so far*, we've usually set this to something like `someMethod`.
Then, we've added a `methods` option, with a `someMethod` function, and put
whatever code we want to run right there.

That's *totally* valid, but if what you need to do is simple, you can *also*
write an expression right here. In this case, when the input changes, we want
to change the `searchTerm` data to the new string.

## Inline v-on Expression

To do that, say `searchTerm` - which we know *really* means `this.searchTerm` -
then equals `$event.target.value`.

That... deserves an explanation. If we set this to a method name, then the method
will receive an `event` argument. And then we can say `event.target.value` to get
this input's value.

When you write an inline expression, Vue magically makes the `event` object available
via a `$event` variable.

But... hmmm... ESLint is mad... it doesn't like how I ordered my attributes. From
a technical standpoint, we can put this in *whatever* order we want. But as a
standard, ESLint likes to have listeners - like `@input` - on the bottom.

Ok, let's take our input for a test drive! Back at the browser, find `SearchBar`
on the dev tools. Now, as we type... yea! The data is updating!

What we *effectively* just did is take a piece of data - `searchTerm` - and *bound*
it to a form input. When the data changes, the input changes. When the input
changes, the data changes.

## Hello v-model!

This is a *very* common thing to do in Vue. In fact, it's *so* common that Vue
created a special directive *just* for it.

Check it out: we can delete the `@input` and `:value` lines and replace them with
*one* line that will do the *exact* same thing. It's `v-model="searchTerm"`.

This is one of the *last* important directives that we haven't already talked
about. `v-model="searchTerm"` *literally* means: set the value attribute to
`searchTerm` and, on input, *update* the `searchTerm` data with the input value.
It's identical to what we had before.

Now `v-model` *does* act a little bit different with things like checkboxes or
select elements, but those are minor normalizations to make these work how you
*want* them to. Back at the browser, everything works just like before.

You're probably going to see `v-model` all the time. For me, it helps to remember
what it's *really* doing behind the scenes: setting the `value` to the `searchTerm`
data and, on change, *updating* the data for you.

Next: let's use this search term to filter our product list as the user is typing!
