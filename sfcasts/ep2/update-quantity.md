# Quantity: Updating Data & Saving to the Server

When we change the quantity input, the `ShoppingCartList` component is now
emitting an `updateQuantity` event. In `ShoppingCart`, let's listen to that!

Up in the template, find where we render `shopping-cart-list`. Then add
`@updateQuantity=` and make this execute a new method called, how about,
`updateQuantity`.

[[[ code('e936b84b7a') ]]]

Copy that, go down to the `methods` section... here it is... and add that new
function.

## Object Destructing the Event Args

We know that this will receive an event object... and because *we* are the ones
emitting that event, we know the object will have `productId`, `colorId` and
`quantity` keys.

In the new method, let's use object destructuring on the first argument to grab
those values and set them onto variables. Do it with `{}`, `productId`, `colorId`
and `quantity`:

[[[ code('14784dc144') ]]]

Let's `console.log()` all 3 values to make sure everything is hooked up:

[[[ code('cee1966141') ]]]

At the browser... change the quantity on the inflatable sofa. Yes! The product IRI,
color IRI and quantity *do* log.

## Saving the new Quantity to the Server

Inside this function, we need to do two things. First, we need update the `quantity`
on the cart data, which lives in this component thanks to the mixin. And second,
we need to make an AJAX call to the server to *save* the updated cart.

Fortunately, the `cart-service` module, that we copied into our project earlier,
has a function that does *both*. Down in `updateQuantity`, say
`updateCartItemQuantity()` and hit tab to auto-complete this so that PhpStorm adds
the `import` on top. Pass this the cart - `this.cart` - then `productId`,
`colorId` and `quantity`.

[[[ code('5c71b08d16') ]]]

That's it! But let's see what that function *really* does: hold Command or
Ctrl and click the `updateCartItemQuantity` to jump into it.

[[[ code('67f5f5b6fc') ]]]

## Setting Data from Outside a Component?

This is *pretty* simple stuff: it takes the cart, finds the array *index* of that
item in the cart by using the `productId` and `colorId`, then sets the quantity
to the new quantity. It finishes by making an AJAX request back to the server to
save this.

Simple, right? Yep! But... I *do* want to highlight one thing. This function
actually *modifies* the cart object... which means it's actually *changing* the
`cart` data! Changing data is *usually* something that we do directly inside a
component, specifically whatever component that piece of data belongs to. But if
you pass a piece of data from Vue - like `cart` - to an outside function... and
that function *changes* a property on that data, then that will - of course - cause
the data to be changed!

I think this is okay. After all, the most important thing is that we're changing
*data*... we're not accidentally changing a prop like we did earlier. But you
*should* be aware that this is happening, be careful, and ultimately, make sure
that the data is being updated, not a prop.

If we wanted to be more clear, we could rewrite this function into *two* pieces.
The first piece would simply update the cart *data*: we could even put that inside
the component or mixin. The second would take the already-updated `cart` object
and save it via AJAX. That might feel less convenient, but it's a more "pure"
way to do things.

*Anyways*, because this function does *both* things we need... I think this
should work! Let's try it! Back at the browser, change the quantity and... yea!
The price and total are changing! The header count is *not* changing yet...
but we will fix that soon. Most importantly, when we refresh... the new quantity
*sticks*. This *was* saved back to the server!

Next: there's a small improvement, kind of a "clean up", that I want to make related
to how we emit the event. Once we make that improvement, we'll use this same strategy
to get the remove button working. Fully functional cart here we come!
