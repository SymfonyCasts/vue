# Remove From Cart

Coming soon...

updates here and our cart header is updating. So the last thing we need to do is make
this remove button work, which now it should be pretty easy. Let's repeat the process
that we use for quantity. So first in cart item, find the button and we need to add
an `@click` onto this. So I'll break this into multiple lines and I'll add `@click=`
and I'll just use the inline `$emit` and let's call this one `removeFromCart` this
time, we don't need to include any extra data. There's not like a quantity that we
need to communicate next. In `index.vue`, we will also listen to, well, listen to
this `@removeFromCart=""`. It'll do the same thing we did before. Will you
miss? And I'll emit an event with that same thing with that same name, `removeFromCart`
but now we do need to include the `productId` and `colorId` so that our parent
component knows which item to remove. So I'll actually copy these from the method
above

Finally, we can listen to this, `removeFromCart` on the top level, `shopping-cart.vue`
So go up to our templates. I have an extra import I can remove yay. And
we'll say, `@removeFromCart=""`. And then here, instead of calling a method on our
components, let's go ahead and immediately put a new method in the mix in that helps
us remove items from the cart.

So over in mixing, I'll add a new method here called `removeProductFromCart()`. And we
know this is going to need the `productId` and the `colorId`, because those are the
things that identify which item it is. And then inside of here, we can call another
method on the car to service that we haven't used before. It's called `removeItemFromCart()`
I'll hit tab so that it will add the import for me. And then we need to
pass this, the cart, `this.cart`, `productId` and `colorId` I'll hold command and jump
into this function. So you can see it just like last time. It actually does two
things. The first thing it does is it actually modifies the data. So it actually
removes the item from the cart and overrides `cart.items`. So it modifies our data
and then it saves it on the server. So of course we don't also don't want to, we're
also wanting to watch them once this finishes update the cart header. So I'll put
that below and for consistency, with everything else, let's wait for this to happen
before we actually update the cart header.

So now we have this removed product from cart method. We can go back into
`shopping-cart.vue`. And since we use that mix in here, we can call that method directly,
which is kind of cool. I'll say `removeProductFromCart()`.

Okay.

And then here we can pack, can use the events, say `$event.productId`, comma
`$event.colorId`. All right, let's try that on. Move over. I'll do another full page
refresh just to be safe. And let's remove our inflatable 15 items in here. This is
three I'll hit remove, and as looked like it worked, we've got the 12 up here. It's
gone, the total updated. And most importantly, when I refresh it's gone still. So
next I have a challenge for us to help sell more high quality merchandise. The
marketing department has asked us to add a featured product sidebar

To the cart,

With the ability to actually add the item to the cart, including choosing the color.
If we need to directly from this page to make this happen, we're going to need to
reuse a lot of code between the sidebar and the cart show page with view. We can do
that.
