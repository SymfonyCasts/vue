# Advancing Between Cart & Checkout

Shopping cart... check! There's just one more feature we need to add to the site:
the ability to fill out a checkout form. No... we won't create a *real* checkout
form with a credit card field and payment processing. That's not the point of this
tutorial. But we *will* build a real form for the customer's info with real
validation: both server-side and client-side.

So: should this checkout form be a new page? We *could* do that. But this time,
instead, I'm going to add that form right to this page. This one component will
hold both steps of the checkout process. Step one will show this cart and
then, by clicking a button, the user will go to step two: the checkout form.
This will be a *great* opportunity to chat about Vue transitions so that this
process *feels* really smooth.

## Adding the Checkout Button

Let's get to work. In `assets/pages/shopping-cart.vue`, this component renders
the entire page - including `cart-sidebar` and `shopping-cart-list`.

Add a div to hold the "Checkout" button. Give it a `v-if=` so that
we *only* render this once the `completeCart` data has finished loading *and*
if `completeCart.items.length > 0`. We don't want to show a checkout button if
the cart is empty.

[[[ code('68a32dffff') ]]]

Inside, say `<button class="btn btn-primary">` and "Check Out!".

[[[ code('d2010ce7e8') ]]]

Let's see how that looks. Nice!

## The "currentState" Data

Our `ShoppingCart` component is going to have two, sort of, "states" that the user
can toggle between: the "cart" state that shows the shopping cart and the "checkout"
state that shows the checkout form. We're going to need a piece of data to keep
track of the current state.

Add a new `currentState` data that defaults to `cart`. I'll... make sure I spell
that correctly.

[[[ code('ea39b4ebc0') ]]]

Next, when the user clicks the button, let's call a new method to *change* that
data to the other state: `@click="switchState"`.

[[[ code('fc44ee2ef2') ]]]

Copy that name and head down to the bottom of the component to add that method:
`switchState()`. Inside, since we only have 2 states, it's pretty simple:
`this.currentState =`, then if `this.currentState === 'cart'`, set it to `checkout`,
else we are *in* the `checkout` state and want to go back to `cart`. The button
will let us go back and forth.

[[[ code('51b2e07046') ]]]

## Vue Dev Tools Quirk when no Re-Render

We're not using `currentState` in the template yet... but we can
*at least* check to see if clicking this button changes that data. Go to Vue dev
tools, find `ShoppingCart` and find `currentState`. Yep, it's `cart`.

Click the button. Huh. It didn't change! Spoiler alert: it *did* change! If you
click *off* of that component and back on... and go find that data again, it *did*
change! This is a quirk with the Vue dev tools. If you change a piece of data,
but that data doesn't cause anything to re-render. the dev tools won't instantly
update. No big deal: it *is* working.

## Toggling the Title Between States

So let's render something based on the data... actually two things. When we click
the button, the title should change from "Shopping Cart" to "Checkout" *and* the
text on the button itself should go from "Check out!" to "Go Back".

Instead of hardcoding this logic and messages in the template, let's leverage
some computed props. Find the `computed` section and call the first `pageTitle`.
`return` if `this.currentState === 'cart'` then `Shopping Cart`, else `Checkout`:

[[[ code('460425292c') ]]]

Copy this and do something similar for `buttonText`, returning `Check Out`
if we're on the cart page and `Back` if we're on checkout:

[[[ code('137ac25fd3') ]]]

Very nice! Scroll up to use these. Change the title to `:text="pageTitle"`:

[[[ code('f25558262d') ]]]

and... for the button, `{{ buttonText }}`:

[[[ code('d29a4d5adf') ]]]

Let's check it! Back at the browser... click the button. Got it!

## Creating the Checkout Form Component

The last step is to toggle the content on the main part of the page. The
shopping cart list is already isolated into its own component. Let's *now* create
*another* component to hold the checkout form... so we don't have to add all
its HTML and logic right into `shopping-cart`.

Create a new `checkout/` directory and then an `index.vue` file inside. I'll
paste in a very simple component that prints some text and exports a name.

[[[ code('200203752f') ]]]

Back in `shopping-cart.vue`, use this. Step one: import it:
`import CheckoutForm from` `@/components/checkout`... but where is my auto-complete?
Ah! Ryan! I accidentally put the new `checkout/` directory in `assets/`. It
should live in `components/`. *Now* Webpack is happy.

Add `CheckoutForm` to components and scroll up to the template.

[[[ code('e5d1195252') ]]]

Before we render this, look at `<shopping-cart-list`. Thanks to the `v-if`, this
only renders once the `completeCart` data is available. *Now* we want to render
it when the `completeCart` data is there *and* if the `currentState` equals cart.

[[[ code('c79b0df47e') ]]]

Below this, render `<checkout-form`. Oh, but copy the `v-if` from above, paste,
and render it when the `currentState` is `checkout`.

[[[ code('3471196f95') ]]]

By the way, you could make a *really* good argument that the `currentState` logic
should live in `v-show` instead of `v-if`. We'll talk more about that at the end of
our discussion about Vue transitions.

Anyways, let's do this! Find your browser and click "Check Out". Beautiful! We
can switch back and forth, back and forth.

But... the change *is* a little.. abrupt. I'd love to have a nice transition
between the two pages, like the old one fades out and the new one fades in. Can
we do that? Of course! CSS itself supports transitions and with a special feature
from Vue, we can leverage those perfectly. Let's learn how next.
