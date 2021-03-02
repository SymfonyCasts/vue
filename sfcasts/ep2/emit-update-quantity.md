# Emitting up the Component Tree

I'm really happy with how our cart page is looking. *Now* we need to bring the
quantity and remove button to life and make them *work*. First up is the quantity
input.

As a reminder, each row is being rendered by the `ShoppingCartItem` component...
but the data for `quantity` lives up on `ShoppingCart`... inside the `cart` data:
each item has, among other things, a quantity. So *this* is what we ultimately
need to update.

The input lives down here in the `ShoppingCartItem` component. So, to communicate
up to `ShoppingCart`, we need to emit an event. No problem!

## Emitting the Event

Over in `cart-item`, find the `input` and add `@input=""`. So, whenever this
value changes, call a new function: `updateQuantity`:

[[[ code('2493e0a4ab') ]]]

Copy that, scroll to the bottom and... add a `methods` key with an `updateQuantity` 
function inside. This will be passed an `event` object.

[[[ code('dd7b07e84c') ]]]

All we need to do here is emit an event. Do that with `this.$emit()` and...
call the event, how about, `updateQuantity`. Though, I have to admit, I got a
little lazy when I recorded this. *Technically* this event name is fine and will
work.. but the Vue best practice is to use kebab-casing for event names. So this
*should* be `update-quantity`. Both work, but follow the convention... not lazy
Ryan.

[[[ code('45d5a2ba93')]]]

*Anyways*, for the event data, let's think. We really need to pass 2 things: something
that identifies *which* cart item is being updated and what its new *quantity*
should be.

For the first thing, the way we're identifying each item in the cart is via its
product and color combination. So pass both: `productId` set to
`this.item.product['@id']`, then `colorId` set to basically the same thing... but
first check to see if there *is* a color. If there is, pass
`this.item.color['@id']`, else pass `null`:

[[[ code('fe02340709') ]]]

You could also pass that `id` property we added to each item... and then find the
correct item using *that*... it's your call.

The *other* thing we need to pass is the quantity, which isn't stored as a piece
data, but *is* available via `event.target.value`:

[[[ code('f05d98659b') ]]]

Beautiful! Let's check this in the browser. Go to the Vue dev tools: we can
*at least* make sure the event emits correctly. And... perfect! When we click
up or down, the `updateQuantity` event *does* show up.

## Converting the Quantity to a Number

Check the "payload".. this contains the event object. Oh... that's not quite
right: the color and product id's look good... but the quantity is a *string*.
That makes sense: input values are strings... but *we* want a number.

This is *exactly* the reason why we sometimes use `v-model.number`: it grabs the
value, *converts* it into a number and *then* updates the data. We're not using
`v-model` here, but we *can* do that same conversion manually. Wrap the input
value with `parseFloat()`:

[[[ code('5449d7f552') ]]]

*Now* when we change the quantity... yes! We have a number!

## Emitting the Event up the Component Chain

So: unfortunately, we can't just listen to the new `updateQuantity` event from
`shopping-cart`... because `shopping-cart` doesn't render `cart-item` directly:
it's rendered by the shopping cart list component.

But it's no problem! We just need to do one extra step: listen to the event
in `ShoppingCartList` and *re-emit* that event so that we can *then* listen to it
from the top-level `ShoppingCart`.

Open `index.vue` and find where we render `shopping-cart-item`: here it is.
Add `@updateQuantity` to listen to the new event. Normally, we set this to a method
name... but we can *also* just... write code here! Re-emit the event with
`$emit()`... and I'll keep the same name - `updateQuantity`. For the data...
just use the same event! We have access to it here as `$event`:

[[[ code('0092c95fff') ]]]

Check this out in the Vue dev tools: *now* when we change the quantity... yes!
There are *two* events, one emitted from each component.

*Finally*, we can listen to this event in `ShoppingCart` and *use* it to update
the data *and* save the new quantity back to the server. Let's do that next!
