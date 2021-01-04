# Remove From Cart

Our cart page is *nearly* fully functional! Just one last task: make the remove
button work.

Let's repeat the process we used for quantity. Start in `cart-item`. Find the
button and add an "on click". I'll break this onto multiple lines.
`@click=` then `$emit` and call the event, how about, `removeFromCart`, though
`remove-from-cart` would follow a more standard naming convention.

Unlike for quantity, this time, we do *not* need to include *any* data: we're
simply "removing".

Next, in `index.vue`, listen to this with `@removeFromCart=""`. Do the same thing
we did before: emit an event with that same name - `removeFromCart` - and make
sure to include `productId` and `colorId` so that our parent component knows *which*
item to remove. I'll actually copy these from the emit above.

*Finally*, we can listen to the `removeFromCart` event from the top level
`shopping-cart.vue`. Scroll up. Hey! I have an extra import I can remove - yay!
Now keep going to find the `<shopping-cart-list` component. Add
`@removeFromCart=""`.

But this time, instead of calling a method on *this* component, let's *immediately*
put a new method in the mixin to handle removing items from the cart.

## Adding More Mixin Logic

Over in `get-shopping-cart`, add a new method called `removeProductFromCart()`. We
know this will need the `productId` and `colorId` to identify *which* item it is.
Inside, we can call another function from `cart-service` that we haven't used yet
called called `removeItemFromCart()`. I'll hit tab so that it adds the import for
me. Pass this the cart: `this.cart`, `productId` and `colorId`.

Hold Command or Ctrl and click `removeItemFromCart` to jump into that function.
Just like with `updateCartItemQuantity()`, this does two things. First it *modfies*
the cart object to remove the item. And second, it *then* makes an AJAX call to
save that to the server.

Back in the mixin, don't forget to update the header: `this.updateCartHeaderTotal()`.
Oh, but let's `await` for the AJAX call to finish before doing this.

Let's put this new method to work! Back in `shopping-cart.vue`, since we use that
mixin, we can call that method directly: `removeProductFromCart()` passing
`$event.productId` and `$event.colorId`.

Testing time! Find your browser, do a full page refresh to be safe. Right now,
we have 15 items. Remove the couch with quantity 3 and.... it worked! The header
says 12, the item is gone, the total updated. We rock! *And*, when we refresh,
the item *is* still gone.

Next: I have a challenge for us! To help sell, I mean, "share", more high quality
merchandise with the world, the marketing department has asked us to add a
"featured product" to the sidebar of the cart page *with* the ability to add
them item to the cart *directly* from this page - including choosing the color.

To accomplish this, we're going need to reuse a *lot* of code between the sidebar
and the cart show page. Let's do it!
