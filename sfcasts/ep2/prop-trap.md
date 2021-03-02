# Accidentally Modifying Prop Objects

Let's render the rest of the details for each row.

## Rendering the Color Square

Inside `cart-item`, start by adding some some structure -
`<div class="col-2">` - with the name inside:

[[[ code('9a3d30807c') ]]]

Then add *another* div with `col-1` to hold the product *color*, if there is one. 
Do that with a `<span class="color-square" />`:

[[[ code('53bfd61231') ]]]

Head down to the bottom to style this: `.color-square` with some CSS to make this
a 25px square with rounded borders. I'm also going to add a `:global` after
`.component`. We talked about this in the first Vue tutorial: because we're nesting
the `.color-square` inside of `.component`, it's safe to add `:global` and will
avoid an extra, unnecessary module prefix before `color-square` in the final CSS.

[[[ code('9ccd63e0f8') ]]]

All we need to do *now* is add a background-color set to the dynamic color. Add
a `style` attribute - actually a `:style` attribute - set to an object with a
`backgroundColor` key. Remember: instead of `background-color`, Vue wants you to
use camel-case names: it handles converting things. Set this
to a string using our magic "ticks": `#`, `${}` then, to keep my template readable,
use a new computed prop: `hexColor`.

[[[ code('410ff4b52e') ]]]

Copy that, then head down to define it: `computed`, `hex()`, then return,
*if* `this.item.color` - which will either be null or an object - return
`this.item.color.hexColor` else `fff`, which will be an invisible white box.
You could also use transparent. Or, if there *is* no color, you could avoid
rendering *any* color box with `v-if`.

[[[ code('1bd30fbf22') ]]]

Anyways, let's see how it looks. Very nice!

## The Quantity Input

Next up is quantity. I want this to render an `input` box so the user can easily
change the quantity. Add a `div` with `class="col-3"` so that it lines up with
the headers, which are each `col-3`. Then say `<input`.

[[[ code('519ea2fdca') ]]]

Let's think: we want the `value` of this input to be equal to the `item.quantity`
prop. And when we *change* the input, we want that to *update* the `item.quantity`
value. Whelp, that is *exactly* the job of `v-model`. Add `v-model` - with the cool
`.number` so that Vue converts the input into a number - equals `item.quantity`.
Finish with `class="form-control"` and `type="number"`.

[[[ code('6397e985ba') ]]]

Oh, and to make sure the input is small. At the bottom, add an `input` style
with `width: 60px`.

[[[ code('7aafbae4fa') ]]]

Let's try it! Back at the browser, it instantly shows the correct numbers!

## Whoops! We Modified a Prop!

But... there's a problem with this... a *big* problem. Do you remember how we're
*never* supposed to *modify* a prop? Well... we just did. My bad!

The `item` is passed to us as a prop. Then, thanks to `v-model`, we're
*modifying* the quantity *key* on that prop. Yikes!

In reality, this isn't *quite* as bad as changing, or *replacing* an *entire* prop.
Think about it: on the top-level `ShoppingCart` component... this `completeCart`
computed property is what is passed down to the other components. And each object
inside of the `items` array will be the *exact* same object in memory as the
`item` prop in the `cart-item` component. So if we change the `item.quantity` key
in `cart-item`, that will *also* change the `quantity` property on that object
in the top-level `ShoppingCart` component.... because... those are *literally* the
same object!

We can see this! Change our floppy disk quantity to 12. In the Vue dev
tools, find the first `ShoppingCartItem` component. Its `item.quantity` value
is, of course, 12... which makes sense because we just set that value directly.

Now go look at the top-level `ShoppingCart` component, find the `completeCart`
computed property and open the first item. Hey! It has `quantity` 12!

So... if a prop is an *object*... is modifying a key on that object *really*
a problem? After all, everything *seems* to stay "in sync"!

In some cases... maybe not. But, you're playing with fire. In *our* situation,
it causes things to... well... get weird.

Change the quantity back to 10. Look at the Vue dev tools! The `quantity` prop
did *not* update! In reality, it *did* update... but you can't see it until you
click off of the `ShoppingCart` component and re-open it. *There* is `quantity` 10.

The problem is that this just *isn't* how Vue is supposed to work... even if we're
"kind of" getting away with it. And so, weird things like this start to happen.

And the Vue dev tool is not the *only* weird thing. Our situation is *especially*
strange because, by accident, we're *literally* changing the quantity of a computed
property!

That means that the we are *not* updating the `quantity` on the actual "source of
truth", which is the `cart` *data*. Find the `cart` data and open the first item.
Yep, it *still* has `quantity` 15: the *original* quantity. That is *not* changing.
So if the shopping cart re-rendered right now, it would *completely* wipe out the
updated value on the computed property and replace it with the one from `data`.

In other words... we accidentally modified a prop by modifying a key of an object!
And while you might *sometimes* get away with this, you're asking for trouble.

## Replacing v-model with value=

For us, it means that we *cannot* use `v-model` in this situation. But... that's
ok! We already know the correct solution! Change this to `:value="item.quantity"`
so that it *renders* the correct value. In a few minutes, we'll add some code so
that when the input *changes*, we emit an event, which is the proper way to notify
a parent component that something has changed.

[[[ code('9bf55f776f') ]]]

## Rendering the Price

Before we do that, there are two more quick things I want to render. Add another
`<div class="col-3">`, a `$` then print a `totalPrice` computed property:

[[[ code('6dc9c3f16e') ]]]

Next, import the `formatPrice` helper that we've been using... then add a `totalPrice`
function under `computed`. Return `formatPrice()` of `this.item.product.price`
times `this.item.quantity`.

[[[ code('246b7bc895') ]]]

*Finally*, up in the template, add *one* more column with a `button`, some styling
classes and the word `Remove`. We'll make this actually *do* something in a few
minutes.

[[[ code('6905a6c560') ]]]

Moment of truth! Find your browser. Yes! *That* looks wonderful.

Next: when the user changes the quantity, we need to update the `cart` data
on the `ShoppingCart` component *and* save the changes back to the server. Let's
do that with - of course - events!
