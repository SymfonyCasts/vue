# Vue Transitions

When we click the button, our little "Testing transitions" div hides and shows
thanks to `v-show`... but *without* any transitions. The reason is that Vue
hides and shows by adding and removing `display: none`. Our CSS transition will
only work if the *opacity* changes.

So, instead of `display: none`, what we *really* need Vue to do is change the
opacity from 1 to 0. Or, more generically, we need Vue to add a new class when
it's hidden so that *we* can set `opacity: 0` on that class, just like we're
already doing with our `hidden` class. That would make this works just like before.

## Hello &lt;transition&gt;: Adding & Removing Classes

Fortunately, Vue has a feature *just* for this. The key is to surround the
element that we're hiding and showing with a special `transition` component. Check
it out: add `<transition` before and after the div... and indent to keep ESLint happy.

But I want to be *super* clear about what this `<transition>` tag does and does
*not* do. Go back to your browser and do a full refresh. Now, click. Woh! It
doesn't even hide anymore! Oh, wait... it *did* hide... it just took a few
seconds. When I click again, it's instantly back. That's... odd.

Inspect element on the `div` and watch really closely. Thanks to the `<transition>`
component, when I click, it adds a few classes... then after a few seconds, it removes
those and hides the element with `display: none`. When we click again, it removes
the `display: none` and temporarily adds some *other* classes... which *also*
disappear after a few seconds.

Obviously, these classes on their own do nothing: this did not magically cause
the `div` to fade in and out. But we can *use* those classes in CSS to *add* the
transitions.

## &lt;transition&gt; Reads your CSS Transition Time

So the first takeaway is this: the `<transition>` component is a fancy mechanism
to temporarily add a few classes whenever the item inside is hidden or shown.
That's it. Though it *is* a bit smarter than it first appears.

Head over to the CSS in the component... and temporarily comment-out the
`transition: opacity 3s`.

Now go back to the browser and watch the `div` again. When I click the button...
boom! It *instantly* hides and does *not* add those temporary classes! It turns
out that the transition component actually *looks* at the element that's being hidden
or shown and *detects* if it has a CSS transition. If it does, it uses that to
know how *long* to add those temporary classes.

Remove the comment and put the transition back. *Now* when we click, watch:
the classes are added for exactly *3* seconds and *then* the `display: none` is
set. Vue does this so that our CSS transition - which is not quite working yet -
has the time it needs to finish before Vue finally, fully hides the element with
`display: none`.

## Adding the Transition CSS

So to get the CSS transition working, all *we* need to do is *use* the temporary
classes that Vue is adding *instead* of the `hidden` class we were using before.
Replace `.hidden` with `.v-enter` and `.v-leave-to`. If you're using Vue 3, it's
called `.v-enter-from` instead of `.v-enter`.

These are both classes that Vue adds in specific situations. Don't worry, we'll
talk about *exactly* how this all works in a minute.

We can *also* replace the `transition-testing` class with `.v-enter-active` and
`.v-leave-active`. Back up in the template, we can remove the `transition-testing`
class that we're no longer using.

Before we talk about how this all works, let's try it. Move over and... beautiful!
It takes 3 seconds to fade out... and 3 seconds to fade in!

## All About How/When the Transition Classes are Added

To help explain this, search for "Vue Transitions", click into the
[Enter/Leave Transitions](https://vuejs.org/v2/guide/transitions.html) page on
their docs and scroll down a bit. Here they explain when each class is added and
removed with a little diagram.

## Transition Classes when Hiding / Leaving

When we first click the button, we're hiding the element. So we're on the "leave"
side of the diagram. When that happens, Vue cleverly adds several classes at
*just* the right moment so that we can add transitions.

First, Vue adds the `v-leave-active` class. This *remains* on the element during
the entire transition, so the entire 3 seconds for us. If we go back down to our
CSS, the `.v-leave-active` class establishes that we want a 3 second transition on
the opacity property. That doesn't *cause* the transition - but our browser now
knows that we *want* a transition if the opacity changes.

Next, still at the *very* start of things, Vue adds the `v-leave` class, or
`v-leave-from` in Vue 3. That... actually doesn't do anything in our case, which
means that the opacity is still the default 1. Then, *one* frame later, something
very important happens: Vue remove the `v-leave` class and adds `v-leave-to` at
the same moment. Thanks to our CSS, that changes the `opacity` from 1 to 0 and
*that* causes our browser to transition the opacity for 3 seconds.

After 3 seconds, Vue removes all of the classes and adds `display: none`. How
crazy is that?

## Transition Classes when Showing / Entering

A similar thing happens in the other "enter" direction, when we're changing an
element from hidden to shown. Once again, before the process starts, Vue adds
a `v-enter-active` class. This establishes that our element *should* have a
3 second transition for opacity.

Next, still at the very start of the process, Vue adds `v-enter`, or `v-enter-from`
in Vue 3. This is important because, thanks to our CSS, that sets the opacity to 0.
One frame later, Vue removes the `display: none` from the element. At that
moment, the item is *technically* displayed... but has an opacity of 0. One frame
after, Vue removes `v-enter` and adds `v-enter-to`. For us, the important part is
that it removes `v-enter`, which changes the opacity from 0 back to the default 1.
That triggers the nice 3 second transition. The `v-enter-to`, in our case, doesn't
do anything because we don't need it to. Finally, after the 3 seconds is done,
all of these classes are removed.

Phew! Pretty wild, right? We can, "kind of" see this in action. When we
click the button, we see some of the classes... but not all of them, because
some classes are literally added for 1 frame and then removed: too fast for us
to see.

So... Vue transitions are an intelligent way add a set of classes at just the
right time when an element is shown or hidden, either via `v-show` or `v-if`.
By themselves, the classes don't do anything. That's our job with CSS.

Next: let's use this to transition between our two components: the checkout form
and the shopping cart. We'll also talk about transition "modes".
