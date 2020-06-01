# v-bind: Dynamic Attributes

We added a `title` prop to legend to make it dynamic: whenever we use this component,
we can pass it different text. But in this situation, I want to go one step further:
I want to pretend that the legend text on this page needs to *change* while our
app is running - like the shipping time magically starts to go down if the user is
on the site for awhile.

Whenever we need a value to change while our app is running, that value needs to
be stored as `data`. In `products.vue`, we already have a `legend` data from earlier,
but we're temporarily not using it. So what we really want to do is this: pass the
`legend` data as the `title` prop, instead of having this hardcoded text.

Okay: easy enough! We know that anything that in `data` or `props` is available
in our template. So, for `title` attribute, or technically `prop`, say
`title="{{ legend }}"`

As *soon* as we do that, Webpack is *mad*! Go check out the terminal. Yikes, it
doesn't like this syntax at all - it can't even *build* our assets. It says:

> interpolation inside attributes has been removed. Use v-bind or the colon
shorthand instead. For example, instead of `id="{{ val }}"`, use `:id="val"`.

That's an *awesome* error message.

## Using v-bind for Dynamic Attributes

Basically, the `{{ }}` syntax that we've grown to know and love... can't be used
inside of an attribute. If you need something dynamic in an attribute, you need to
prefix the attribute with `v-bind:`. And then, inside the attribute, just use
the variable name.

*Now* it builds successfully. Before we talk more about this, let's try it! Refresh
and... it works! Over on the Vue dev tools, the `Products` component has a `legend`
data... and it looks like the `Legend` component is *receiving* that as its `title`
prop.

The *cool* thing is that if we modify the `legend` data - "Will ship slowly!" - the
text updates! The modified data is passed as the `title` component and Vue re-renders.
So while we never change a prop directly, if we change a data... and that data is
passed to a prop, the prop *will* update to reflect that.

## v-bind is Full JavaScript

Back at your editor, let's talk about this `v-bind` thing. There will actually
be *several* of these `v-` things in Vue: they're used whenever Vue needs to do
something special, including if statements and for loops. `v-bind` is probably the
most important one. Very simply: if you want an attribute to be set to a dynamic
value, you must prefix the attribute with `v-bind`.

As *soon* as you do that, the attribute is no longer just text, like `pb-2` up
here. We're now wriring *JavaScript* inside the attribute.

I'll prove it: add `+` open quote and say

> this is really JavaScript.

And... when we try this... yea! That text shows up! It's a mixture of our data
and that string.

So... that's really it! `v-bind` is meant to "bind" an attribute to some dynamic
value, often a data or prop. But honestly, I don't even think of it like that.
I just think: if I want to use JavaScript inside of an attribute, I need to use
`v-bind`.

## The v-bind Colon Shorthand

We're going to use this *all* the time: we're constantly going to be setting
attributes to dynamic values. Vue understand this. And so, they've provided us
with a nice shortcut. Instead of `v-bind:title`, just say `:title`.

That means the exact same thing: it's still *really* `v-bind` behind the scenes.

I like this a lot better. In my mind, an attribute without a `colon` is literally
set to that string. Prefixing the attribute with `:` transforms it into JavaScript.

Anyways, when we try it now it... of course, works brilliantly.

## Specifying the *type* of a Prop

While we're talking about the `legend` component, I want to make one small tweak
to the `props` option. Remember: to *allow* a `title` prop to be passed to us,
we needed to first define the prop here.

If you hover over this, ESLint is mad:

> prop `title` should define at least its type.

In addition to just saying "please allow a prop called `title`", we can *also*
tell Vue whether this prop should be a string, number, object, or something else
*and* whether or not it's required.

Change `props` to an object where `title` is a key. Set this to another object
with two keys: `type` set to String and also `required` set to `true`. Valid types
are things like String, Number, Boolean, Array, Object and a few others - all
with upper case names.

Oh, and ESLint is still mad because I messed up my indentation! Thanks!

This won't change how our app *works*: it just helps to document our code *and*
Vue will give us some nice validation. Back in `products.vue`, temporarily
"forget" to pass the `title` prop.

When we reload... error!

> Missing required props: "title".

Remember: props are basically arguments you pass to a component. But since they're
*so* dynamic, *this* is the way that we, sort of, type-hint each prop and mark it
as required or not. There's also a `default` option you can pass for optional
props.

Next: let's make our styles more hipster - *and* less likely to cause accidental
side - effects - by using *modular* CSS.
