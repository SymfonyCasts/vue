# Magic "this" & its Properties

The best and worst part of Vue is its magic. We know that if you update
a data key, Vue *somehow* knows that it needs to re-render. That's why we
can play with data in the Vue dev tools and the HTML automatically updates.

We even know that if we pass that data as a prop to *another* component, Vue knows
to re-render that one too! We can see this on the `Catalog` component: it has a
`legend` data... there it is... which we pass to the `legend-component` as the
`title` prop. When we update the `legend` data inside `Catalog`, it updates
the `title` prop *and* re-renders that component.

## console.log(this)

But... the magic I want to talk about is not this re-rendering stuff. I *love* that
part! The *real* magic of Vue is the Vue instance, the `this` variable. Let's
take a few minutes to dive into the `this` variable. I promise, it will go a
*long* way to helping us *truly* master Vue.

Let's play around in the `Sidebar` component. Add a new option called `created`,
which is a function. We're going to talk more about this later, but basically,
if you add an option called `created` to any component, Vue will automatically
call that function when your instance is being created. We're going to use this
as an easy way to dig into the `this` variable: `console.log(this)`.

Let's go check it out! On my console... there it is! But I'll refresh anyways just
to clear things out. Cool! It's a `VueComponent`: an object with... a *ton* of
properties. If you're using Vue 3, instead of `VueComponent`, you'll see
something called a Proxy. I'll talk about what a "Proxy" is in a few minutes. For
now, if you're using Vue 3, click the "Target" property to see the real object.

## The Properties of this

Ok, so `this` is an object with a bunch of properties... and the *vast* majority
of these are things that you will never need to worry about. If a property starts
with a `$`, you're *technically* allowed to use it, but you probably won't need
to except in advanced situations. If a property starts with `_`, then it's
meant to be internal and should *not* be used. In Vue 3, all of the internal keys
live below a property called `_`.

Oh! But check this out: the object *also* has a property called `categories` and
another called `collapsed`! Woh! Those are the keys we have in `data`! That
explains why we can reference `this.collapsed`: the `this` variable really *does*
have a `collapsed` property! And if you look back at the log, the instance *also*
has a method called `toggleCollapsed`. This is here because, under the `methods`
option, we added one with that name.

Before we talk more about this, let's try one more thing. Right now, sidebar
doesn't have any `props`. Let's temporarily add one. Say `props:` and create one
called `testProp` with `type: String`. One of the *other* things you can do here
is give a prop a *default* value in case it's not passed to the component. Set this
to a misspelled version of "I am the default value".

Perfecto-ish. Back on the browser, our code was already updated and... if we scroll
down on the console... here's the latest log. Inside... yes! It now has a property
called `testProp`!

## How the "this" Object is Created

Here's the big picture. We configure Vue by passing it a set of options, like
`name`, `data`, `created`, `props` and `methods`. Behind the scenes, Vue takes
these options and creates a Vue object - the object that's in the console.
When it does that, it takes all of the keys from `data`, all of the keys from
`props` *and* all of our `methods` and *adds* those to the instance! This is why
we can say `this.collapsed` to reference the `collapsed` data or `this.testProp`
to reference that prop. Heck, we can even say `this.toggleCollapsed()`! Our
`methods` become *real* methods on the object.

So the first thing I want you to understand is exactly this: Vue reads our options
and uses them to create a Vue object where `data`, `props` and `methods` are
*real* keys on that object. Later, we'll see one *more* option - called `computed`
properties - that are added to the object in the same way.

## Variables in the Template are called on this

Now that we understand this, we can demystify how the template works. In a
template, we know that we can magically reference `categories` because `categories`
is in data. Or we can magically reference `toggleCollapsed` because that's a key
under `methods`.

But in reality, whenever you reference a variable or call a method in a template,
Vue, sort of, prefixes it with `this.`. So the `@click` is really
`this.toggleCollapsed` and when we're referencing `collapsed`, it's really
`this.collapsed`.

Back on our browser... if you scroll down on the log, the object has a property
called `_uid`. On Vue 3, it's `_.uid`. This is an internal, unique identifier for
the component that we normally don't care about. But *technically*, because the
instance has a property called `_uid`, we should, in theory, be able to say
`{{ _uid }}` to print it. If I'm telling the truth about Vue, this should call
`this._uid` on the object.

And... it does! It prints "7"! Well, the value was 6 before, but when
it re-rendered, `_uid` was 7.

Let's try something else: print `definitelyNotARealProperty`. Back on the browser...
the error is *wonderful*:

> Property or method `definitelyNotARealProperty` is not defined on the *instance*
> but was referenced during render.

Vue is literally saying: this is not a property on the instance! And the way you
*add* something to the instance is by defining it under `data`, `props`, `methods`
or the `computed` option that we'll talk about later. I love it!

Next, Vue has *one* other piece of magic I want to explore called reactivity.
It's all about how Vue is smart enough to re-render a template at the *instant*
that we change a simple piece of data.
