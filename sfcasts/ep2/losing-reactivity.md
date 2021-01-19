# Losing Reactivity

Vue reactivity is *magic*. What I mean by "reactivity" is how Vue is smart enough
to re-render whenever a piece of data changes. Or, even more impressive, if that
piece of data is an object and you change just *one* property on it, Vue
will *still* figure out that it needs to re-render any components that depend on
that.

## The Situations When Reactivity Fails

But there *are* a few limitations to Vue reactivity: a few edge cases where Vue
can't work its magic and does *not* realize that it needs to re-render. Well,
to be clear: Vue *2* has a few limitations... that Vue 3 solves. So if you're
using Vue 3, feel free to skip ahead: it does *not* suffer from this issue.

Search for "Vue reactivity" to find a page on their docs. Scroll down to "change
detection caveats".

There aren't many situations like this, but this first situation talks about
what is currently happening to *us*: Vue cannot detect property addition or
deletion. And a property must be present in the data object in order for Vue to
convert it and make it reactive.

We talked about how reactivity works under the hood
[in part one of this series](https://symfonycasts.com/screencast/vue/reactivity).
The short explanation for Vue 2 is that when a piece of data is an object, Vue
replaces each property on that object with a getter and setter method. This is
invisible to us, but it allows Vue to be *notified* - via the setter method -
whenever someone changes a property.

## Our Reactivity Problem: Property Addition

Our problem starts in the checkout form component's `data` function. We initialize
`validationErrors` to an empty object. And then, in the `validateField()` method,
we *add* a new property to `validationErrors`. That's the "property addition" that
Vue was talking about. Vue doesn't have a way to detect that the new property was
added. And so, it can't add the getter and setter methods that are the key to
making that property reactive. We *can* still read from and write to that property...
but Vue isn't *aware* that we're doing that.

This is a long way of saying that if you have a piece of data that's an object
like `validationErrors`, be sure to include all of its properties when you
initialize it, even if some are null.

Head up to `data` and add all 6 properties to the object - setting each one to
`null`. Thanks to this, from the *very* first moment the data is initialized, it
will have *all* of its properties. Then, we're not *creating* a property down
inside `validateField()`: we're just changing its value!

Oh, and now, instead of deleting the property, set it to null.

Ok! Let's test this! Go to checkout and... perfect! It instantly updates! But if
we submit the form... funny things start to happen.

No validation error on Ryan. Right? That makes sense. But if I clear that out and
hit tab... hey! Why didn't I get my validation error? This... is the same problem,
but I want to show it to you in more detail.

Back in the component, at the top of `validateField()`, let's
`console.log(this.validationErrors)`.

Head back over: my page already refreshed. Go to checkout and open the console.
Now notice: when I first blur, the entire object has a `...`. That's
because the `validationErrors` data is wrapped in a getter method, which is Vue's
way of adding reactivity to it. And if we click to open this, each property
*also* has a `...` next to it. That's an easy way for us to see that each property
*is* reactive: Vue *did* have the opportunity to wrap it in a getter and setter.

Now submit the form, focus the name field... and hit tab again. Scroll down on
the console to see the *new* log. The object does *not* have the `...` anymore.
And more importantly, each property under it *also* does not have `...`.
The fact that those are gone means that each property lost reactivity.
If we set the `customerCity` property, there is no setter, and so Vue would not
be notified that it needs to re-render.

The reason this is happening is, up at the top of `onSubmit()`, we're resetting
`validationErrors` back to an empty object. Then, when we set a key on
`validationErrors` later, we are, once again, creating new properties.

Let's reinitialize just *one* field to start: set `customerName` to `null`.

Now go back, head to the checkout form and re-submit it. Click on the name field
and blur it to get the log. Oooo: `customerName` now *does* still have its
getter method! But the other fields do *not*. By including the `customerName`
property when we replaced the `validationErrors` data, Vue was able to *wrap*
it and make it reactive at that moment.

So the *full* solution is this. Either use Vue 3... and this will all just
work, *or* whenever you set a full key on data that's an object, whether you're
setting it inside the `data` function or somewhere else - be sure to include every
property it needs. There *are* other work arounds the docs mention, but this is
what I like.

To do this without repeating ourselves, let's add a new method called
`getEmptyValidationErrors()` that will return an object. Go up to our initial
data, steal those fields, head down and paste. Perfect.

We can use this up inside `data()`: `validationErrors` set to
`this.getEmptyValidationErrors()`. Do the same thing down here in `onSubmit()`:
`this.getEmptyValidationErrors()`.

Let's check it! Go back to the checkout form, submit it... see the errors,
type a name, hit tab and... it's gone! Reactivity is back!

Let's celebrate by removing the `console.log()`.

Woh team, we're done! You did it! You are now *massively* dangerous in Vue.
So go build something really cool and tell us about it. I would love to know.

In a future tutorial, we'll cover the Vue 3 composition API: that's the really
big new, optional feature in Vue 3 that has the potential to make sharing code
and data a lot nicer.

If there's something else that you want to know about, let us know down in the
comments.

Alright friends, see you next time!
