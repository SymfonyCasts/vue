# More Mixin Logic: Updating Quantity in Header

In `cart-item.vue`, when the quantity changes, we're emitting an `updateQuantity`
event. But... it occurred to me that we're passing too much data in the event...
or really, we're passing more data than we *need* to.

[[[ code('db04cf12d8') ]]]

## Passing Less Data to the Event

Think about it: both `productId` and `colorId` come from `this.item`... which is
*passed* to us as a prop... which means that our *parent* component already *knows*
the `productId` and `colorId` that this component instance is tied to. Passing
these *back* to our parent in the event data is... redundant!

[[[ code('afed6ef190') ]]]

On a philosophical level, all we should *need* to pass to `updateQuantity`
is the new quantity.

This is a tiny detail, but let's clean this up. Copy both `productId` and `colorId`
and then delete them from the event data.

[[[ code('19bb33213e') ]]]

Now go to `index.vue`. When we emit the event here, we *do* need to include
`productId` and `colorId` so that `ShoppingCart` knows *which* item's quantity is
being updated. We can *add* that info right here: call `$emit()` and this time pass
an object. Paste those keys - `productId` and `colorId` - change `this.item` to
`item`... and then make sure to continue including `quantity` set to
`$event.quantity`.

[[[ code('63b777cb9b') ]]]

That's it! It worked fine before... and it works fine now... but this feels better.

## Fixing the Cart Header

The one thing that is *not* working when we change the quantity is the cart header:
it's *still* not updating. But we *do* have logic to handle this. Open
`shopping-cart.vue` and find the `updateQuantity()` method.

We know that this component uses a mixin: `get-shopping-cart.js`. And
*that* holds the code to update the shopping cart count in the header. We run
this after adding a new product to the cart.

Ok then: if we isolated this into its own method, we could call that from
inside of `shopping-cart.vue` when the quantity is updated. Let's do it! But wait,
let's go even further. We have this nice mixin... whose job is to hold cart data
and methods *related* to that data. So it makes sense to *also* include a method
here to handle *everything* related to updating an item's quantity.

## Adding More Logic to the Mixin

Check it out: in the mixin, add a new method called `updateProductQuantity()` with
3 arguments for the 3 pieces of info this needs: `productId`, `colorId` and
`quantity`.

[[[ code('8911039473') ]]]

*Now* go to `shopping-cart`, copy the `updateCartItemQuantity()` function that
updates the quantity and makes the AJAX call, and paste it here. When I did that,
PhpStorm automatically added the import on top for me... though I don't love that
syntax.

[[[ code('993d7a9309') ]]]

Anyways, now that we have this method, we can call it from our `shopping-cart`
component. Remove the `console.log()` and just say `this.updateProductQuantity()`
passing the same arguments, except that we don't need to pass `this.cart`:
the mixin already has that.

[[[ code('f0208e0570') ]]]

Sweet! Just a little bit of reorganization so that more cart-related logic lives
in the mixin. And if we try it... yup! It's not broken. We're *awesome*!

Thanks to this, updating the cart header will be even easier. Start by copying
the header logic and scrolling down so we can create a new method. Call it
`updateCartHeaderTotal()` and paste!

[[[ code('3413772419') ]]]

Now, very simply, at the end of `addProductToCart()` call
`this.updateCartHeaderTotal()` and... repeat that in `updateProductQuantity`:
`this.updateCartHeaderTotal()`.

Oh, and we don't need to do this, but I'm going to add an `await` and then make
the method `async`. This will now wait for that quantity AJAX call to finish and
*then* update the quantity in the header.

[[[ code('3413772419') ]]]

Let's try it! I'll do a full page refresh to be safe. The cart header says 13.
Increase a quantity... boom! Everything updates - including the cart header.

Next: let's hook up the *last* part of the cart functionality: the remove from
cart button.
