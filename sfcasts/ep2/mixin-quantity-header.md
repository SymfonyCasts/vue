# More Mixin Logic: Updating Quantity in Header

In `cart-item.vue`, when the quantity changes, we're emitting an `updateQuantity`
event. But... it occurred to me that we're passing too much data in the event...
or really, we're passing more data than we *need* to.

## Passing Less Data to the Event

Think about it: both `productId` and `colorId` come from `this.item`... which is
passed to us as a prop... which means that our *parent* component is *aware* of
which item this component instance is tied to. This means that it's a bit
redundant to pass `productId` and `colorId` *back* to our parent because it
already has that information.

Yep, on a philosophical level, all we should need to pass to `updateQuantity`
is... the new quantity!

This is a tiny detail, but let's clean this up. Copy both `productId` and `colorId`
and then delete them from the event data.

Now, go to `index.vue`. When we emit the event from here, we *do* need to include
the `productId` and `colorId` so that `ShoppingCart` knows which item is being
updated. We can *add* that info right here: call `$emit()` and this time pass an
object. Paste those keys - `productId` and `colorId` - change `this.item` to `item`...
and then make sure to continue including the quantity: `quantity` set to
`$event.quantity`.

That's it! It worked fine before... and it works fine now... but this feels better
to me.

## Fixing the Cart Header

The one thing that is *not* working when we change the quantity is the cart header:
it's *still* not updating. But we *do* have logic to handle this. Open
`shopping-cart.vue` and find the `updateQuantity()` method.

We know that this component uses a mixin: `get-shopping-cart.js` . And
*that* has logic to update the shopping cart count in the header, which we call
after adding a new product to the cart.

Ok then: if we isolated that code into its own method, we could call that from
inside of `shopping-cart.vue`. Let's do it! Hmm, but let's go even further: since
we have this nice mixin... whose job is to hold cart data and methods *related*
to the cart, why not *also* move the `updateCart()` functionality into here too?

## Adding More Logic to the Mixin

Check it out: in the mix, add a new method called `updateProductQuantity()` with
3 arguments for the 3 pieces of info this will need: `productId`, `colorId` and
`quantity`.

*Now*, go to `shopping-cart`, copy the `updateCartItemQuantity()` function that
updates the quantity and makes the AJAX call, and paste it here. When I did that,
PhpStorm automatically added the import on top for me... though I don't love that
syntax.

Now that we have this new method, we can call it from our `shopping-cart`
component. Remove the `console.log()` and just call `this.updateProductQuantity()`
passing the same arguments, except that we don't need to pass `this.cart` because
the mixin already has that.

Easy peasy! Just a bit of reorganization so that more cart-related logic lives in
the mixin. And if we try it... yup! It's not broken. We're *awesome*!

Thanks to this, updating the cart header will be easy. First, we need to isolate
that logic into its own methods. Copy it, go down, create a new method called
`updateCartHeaderTotal()` and paste!

Then, very simply, at the end of `addProductToCart()` call
`this.updateCartHeaderTotal()` and... repeat that in `updateProductQuantity`:
`this.updateCartHeaderTotal()`.

And, we don't have to do this, but I'm going to add an `await` and then make the
method `async`. This will now wait for that quantity AJAX call to finish and
*then* update the quantity in the header.

Let's try it! I'll do a full page refresh to be save. The cart header says 13.
Increase a quantity... boom! Everything updates - including the cart header.
