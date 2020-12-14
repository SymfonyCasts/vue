# Loading the "Complete" Cart

To render real product details on the cart page, we need more data than the original
cart API returns.

So here is what we need to do: wait for the cart AJAX call to finish, collect
the product IRI strings for each cart item, then make a *second* AJAX request for
*those* product details. Normally, waiting for one AJAX call to finish before starting
another one is easy. But in this case, the cart AJAX call lives in the mixin, in
`created()`... and this new code needs to live in our `shopping-cart` component.

So: how can we run code *after* the cart AJAX call finishes? The answer is... a
watcher. Remember: a watcher is a way to run a function whenever a piece of data
changes. We *rarely* use them, because there are usually *other* ways to accomplish
what we need, like listening to an event. But in this case, a watcher that watches
for the `cart` data to change - specifically for it to change from `null` to an
object - is probably our only simple option.

## Adding the Watcher

Add a new `watch` key with a function called `cart()` inside... so that it's executed
when the `cart` data changes. The first time this function will be called -
and the *only* time in our app - is when the `cart` data change from `null` to
an object.

Inside, we need to get an array of all the product IRI's for all the items in
the cart. Do that with `const productIds =`, `this.cart.items.map()`. Pass a
callback with an `item` argument. I'll use the *very* short syntax
`=> item.product`.

So: this will loop over all the cart items, call this function for each item,
and we return the IRI string via `item.product`. The result is that `productIds`
will be an *array* of the IRI strings: *exactly* what we want.

We can use that with the new function we copied a few minutes ago:
`const productsResponse = await` - then `fetchProductsById()`. Let PhpStorm
autocomplete that so it adds the import. Pass this `productIds`. And, of course,
as soon as we add `await`, the function needs to be `async`.

To see what this looks like, let's `console.log(productsResponse)`.

Cool! Move over, refresh, go to the console and.... nice! The response has the
usual `data` key... with a `hydra:member` property that holds an array of *all*
those beautiful products.

Oh, and to help us understand the next step, let's also log `this.cart`. Remember:
the `cart` object has an `items` key and each item has `color`, `product` and
`quantity`. The problem is that `product` and `color` are just IRI strings, instead
of *real* data.

## Creating the Complete Cart Data

Because of that, looping over `this.cart.items` inside our template is not very
useful. Instead, I want to create a *new* array of cart items that has the *same*
structure - `color`, `product` and `quantity` keys - but where `product` and `cart`
are set to data *objects*, instead of strings. Then, we can loop over *that*
in the template and have *everything* we need. What could go wrong?

Back in our component, remove the log and say
`const products = productResponse.data['hydra:member']` to get to where the actual
data is stored.

Now create a new object: `const completeItems`. This is going to be kind
of cool: set it to `this.cart.items.map()`. So once again, this will loop over
each item and call our function. Give it the `cartItem` argument, and, just like
last time, I'm going to use the short syntax... but since I want to use multiple
lines, I'll add parenthesis.

Inside, return an object, well... thanks to the short syntax, the `return` statement
is *implied* - our function will return this object. And this object will have
the same keys as the cart items, like `product`! But *this* time, we want to set
it to the product *object*. And we can use the `products` array to find it:
`products.find()`, pass an arrow function with a `product` argument, and return
true if `product['@id']` equals `cartItem.product`. So, we're comparing the IRI
strings.

You *could* choose to write some extra code in case an item in the cart is *not*
returned from the products AJAX call, like maybe it was removed from our system.
But I'll skip that.

Next, set `color` to `cartItem.color`. That's *still* the IRI string... not a
color object - but we'll fix that soon. And then `quantity` is simple: set that
to `cartItem.quantity`.

To celebrate, let's see what this looks like! `console.log(completeItems)`.

Back at the browser... I don't even need to refresh: the log is already here:
3 items... which are *much* more useful. The `color` is still a string, but
`product` is an object.

If we loop over *this*, we're going to be a *lot* more dangerous.

So the question *now* is: how can we make this new `completeItems` array accessible
to our template? The easiest thing to do would be to set it as a new key on data.
But... that would *not* be our *best* idea. Let's talk about *why* next and find
a solution that, honestly, I *love*.
