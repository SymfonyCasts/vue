# Cart API & Data

Ok team! We have two great pages - a product catalog and a product show page.
We're ready to start adding products to our cart.

To help with this, in the `tutorial/` directory, which you should have if you
download the course code - copy the `cart-service.js` file into
`assets/services/`.

## The Cart API Endpoints & Service

Just like product, category and color, "cart" is one of the "resources" in our
API. Check it out: go to `http://localhost:8000/api`. Yep, we have a set of
endpoints to *create* a cart, view it or modify it, and each cart has an "id".

Now, on the server, we're storing the current user's cart ID in the session. And
if the user *does* already have a cart, we're dumping its ID onto the page as a
global variable. Check it out: right click, go to "View Page Source" and search
for "cart". There we go: `window.cartIri = null` because - right now - we don't
have a cart associated with our session yet.

The `cart-service.js` file holds a number of functions for fetching the cart, adding
items to the cart and so on. To get the cart id, this calls `getCartIrI()`, which
reads that global `cartIri` variable. Back in `addItemToCart()`, this is smart
enough to work even if the user doesn't have a cart yet. If the `cartIri` is *not*
null, it updates it. But if it *is* null, it creates a new cart, which our API
will automatically associate with the current user's session.

By the way, the cart data itself is *also* stored in the session instead of the
database. That fact is completely *not* important for us in Vue. I just mention
it in case you're an API Platform geek and want to see how that was implemented.
In a real app, I *would* store carts in the database.

From a JavaScript perspective, the important point is that we have a traditional
set of API endpoints for our cart and the current user's cart IRI is available
to us on page load.

So here's the plan: in `product-show`, we're going to *first* load the full cart
data via an Ajax call if there is one. Once we have that, we'll *use* it to add
new items to the cart. Why do we need to fetch the cart data in order to add an
item to it?

The reason is... well... in *part* because I'm trying to make our life difficult,
but not entirely. Look at `addItemToCart`: the `cart` object is the first argument.
That's needed so that if we add a product to the cart and it's already *in* the
cart, it can read the existing quantity and *increase* it. Now, we *could* have
moved this smartness into our API, which would make our life easier in Vue. But
since we don't always have the luxury in the real world, we'll handle it here.

Oh, and speaking of complications, we could *also* make our life simpler by
rendering the *entire* cart object as a global variable... instead of just the
cart IRI. In `templates/base.html.twig`, at the bottom, this where we're setting
the `cartIri` variable. If we output the *entire* cart as JSON, then we could
avoid an AJAX call for the cart data. I probably *would* do that in a real app.
But for the tutorial, this AJAX call is going to complicate things in *wonderful*
ways.

## Fetching the Cart via AJAX

Anyways, let's get to work! Inside `product-show.vue`, we need the `cart` object
so that we can use it when an item as *added* to the cart. Down in `data`, add
a new key for this called `cart`.

Next, in `created()`, call one of the new functions - `fetchCart()` and let
PhpStorm auto-complete that - we want the one from `assets/`. Let's make sure
PhpStorm stops looking at the `tutorial/` directory: right click on it and go
to "Mark Directory as Excluded".

Anyways, when I auto-completed that, PhpStorm added the `fetchCart` import for us.
Back in create, since `fetchCart()` return a `Promise`, we can say `.then()`
and pass a callback with a `cart` argument. Inside, all we need is
`this.cart = cart`.

If you're wondering why I didn't use `await`, good question! If we *had* used
`await`, it would mean that this first AJAX call would need to finish before the
second call even started. By using `.then()`, both AJAX calls will effectively
start instantly.

Ok! Let's make sure the data loads! Refresh the page, go over to the Vue Dev
tools, Components... and find `ProductShow`. Yes! We have a `cart` data set to
an object with an `items` key. It's empty because, in reality, we *don't* have
a cart yet. But the `fetchCart()` function is nice enough to create an empty object
for us in this case.

Next, let's hook up the "Add to Cart" button *and* make sure the user *cannot*
add any items until we're ready.
