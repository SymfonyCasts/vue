# Transition Name & Mode

As we just learned, Vue adds, these `v-` classes to our element when it's being
hidden or shown.

We actually have partial control over how these are named. In the template,
on the transition element, add `name="fade"`. What does that do? Very simply: it
changes the *prefix* that Vue uses for the classes.

[[[ code('85065f4a64') ]]]

Thanks to this, down in the styles, instead of `v-`, everything needs to be `fade-`.

We could have used `name=""` *anything*. Fade is a good name because the CSS
causes the element to, ya know, fade in and out.

[[[ code('d511633801') ]]]

Move over and try it. Yep! It works like before, except that the classes are
different. The advantage of this is that you could have CSS in your project for
several different *types* of transitions, like `fade` or `bounce` and then
choose whichever one you want with `<transition name=""`.

## Transitioning Between 2 Components

Now that we are Vue transition pros, up in the template, let's remove that
temporary element. Our *real* goal is to transition between the shopping cart and
checkout components so that it's not so... abrupt.

No problem! Wrap each component in its *own* `transition` component, right? We
*could* do that - and I'll talk more about that approach in a few minutes. But
we can *also* wrap a `transition` around *multiple* components or elements.

Add `<transition name="fade"` so that we use the same CSS, wrap this around both
components and indent them.

[[[ code('ce0ef2f176') ]]]

Wrapping multiple elements or components inside a single `transition` only works
when you're using `v-if`, not `v-show`... and it only works when there's exactly
*one* element or component being displayed at a time... which is exactly our
situation! I'll talk more about this limitation in a few minutes.

But let's try it! And... yea! It's *super* slow, but it works! Let's shorten
that transition time to something more realistic. Down at the bottom of the component,
change the 3 seconds to .2 seconds.

[[[ code('7f2c0cf27d') ]]]

## Transition Modes

Try it now. *Much* better. Though... it's still kinda jumpy. The problem
is that the new component is already being shown and fading in while the old
component is still there and fading out. So it... kind of jumps a bit, which will
look worse once the checkout component renders a form.

Fortunately, because we wrapped *both* of these components inside the same transition,
we can leverage a cool `mode` option on the `transition`. Say `mode="out-in"`:

[[[ code('e48e527c2d') ]]]

This says:

> Fade out the old component and *then* fade in the new one... instead of doing
> them at the same time.

Check it out now... awesome! The old component fades out completely before the
new one starts: no jumping around.

## The Problem with Transitions and v-if

But... there is one problem with the approach of wrapping multiple elements or
components inside the same `transition`. The problem is `v-if`. It's
not very obvious right now, but each time we click the button, the old component
is completely *destroyed*. When we click back, it's completely re-created.
That *could* be a slight performance issue, though that's not really the problem.
The problem is that any data on the component is completely lost.

This will be *much* more obvious in a few minutes when we add a true checkout form.
Then, if we filled out a few fields... then clicked back to the cart... then
returned to the checkout form, those fields would now be *blank* because the
component was re-created with new data and new HTML.

The solution would be to make *how* we hide & show the components smarter. We would
still rely on `v-if` to check for `completeCart`... because we can't render at all
until that variable is ready. But then we would use `v-show` to check the current
state. Thanks to that, instead of destroying the component, it would just hide it.

The problem is that... this doesn't work:

> `<transition>` can only be used on a single element. Use `<transition-group>`
> for lists, which is not our situation.

So basically... we can't wrap multiple things unless we're using `v-if` exclusively.
The solution would be to wrap each component in its *own* transition tag: one
around the shopping cart and another around the checkout form.

But when we do this, we can no longer use the `mode` option, which is what helped
us fix that jumping problem. One common work-around is to absolutely position the
two components on top of each other so that as they fade out and in, the do it
in the same spot without the jumping.

Anyways, I'm going to undo this and go back to `v-if`: I just wanted to give you
some extra background. I'll refresh to make sure I didn't break things... excellent!

There's one more thing that I want to transition: the title on the page. If you
watch, it *still* changes instantly. That's not a huge deal, but it would be cool
if that *also* faded out and faded back in. This is interesting because, in this
case, we will be transitioning over a *prop* change. Let's talk about how to do that
next.
