# Intro to CSS Transitions

Forget about Vue for a few minutes. Instead, let's focus on how CSS transitions
work by themselves. If you're already super familiar with CSS transitions, you
rock. Feel free to jump to the next video. If not... let's go!

## The Setup: Changing Opacity on Click

In `shopping-cart.vue`, add a temporary div with some text inside: testing
transitions. *Also* use the dynamic class syntax - `:class` - to give this two
classes: `transition-testing` - a class it will always have - and `hidden`, which
it will only have when the `currentState` is equal to checkout.

[[[ code('8a9f39abb6') ]]]

Down in the styles, add some CSS for this: `.transition-testing` with `opacity: 1`.
That's... not actually necessary... because that's the default value, but it'll
help make things more clear.

[[[ code('de88175ae7') ]]]

Then, when `.transition-testing` *also* has the `hidden` class, set opacity to
zero. 

[[[ code('49fdbcf794') ]]]

Basically, we're going to hide this element when we click the checkout
button. Try it: there's the text and click the button. Gone! Back! Gone! Back!
We're not using `v-show`, but the result is, effectively, the same.

## CSS Transitions!

CSS transitions allow us to... well to *transition* between certain CSS property
changes. Right now, when the `hidden` class is added, the opacity *instantly*
changes from one to zero. But we can tell CSS to make that change *slowly*, like
transitioning from one to zero over, let's say 3 seconds

To do that, on the class that the element *always* has, define that you want
a transition to happen: `transition: opacity` over `3s`.

[[[ code('d261b20d23') ]]]

Check it out: when we click, the message slooowly fades out. How cool is that!
I'm old enough to remember building page layouts with tables and rounding corners
with images. This... is like winning the lottery.

There are a *lot* more things you can do with CSS transitions, but this is the
basic idea. Back in our code, remove the `opacity: 1`... just because it's
redundant.

[[[ code('d65f3922b8') ]]]

## Switching back to v-show

So... how does this relate to life in Vue? Back up in the template, find the
temporary element and change it to use a proper `v-show`: the way we
*normally* hide and show things.

Copy the `currentState === 'checkout'` line, change this to a boring
`class="transition-testing"`, and then add `v-show=""`, paste, but now we need
the reverse: show this when `currentState === 'cart'`.

[[[ code('c36d01a38f') ]]]

When we try this... we lost our transition entirely! It hides and shows
instantly. We can see the reason when we inspect the element: Vue hides and shows
things by adding and removing `display: none`. What we *really* need Vue to do
is change the opacity from 1 to 0.

Let's talk about how Vue can do that next.
