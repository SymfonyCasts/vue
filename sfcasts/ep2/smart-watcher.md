# Deep and Smart Watchers

The fact that we can add things to our cart from the sidebar and have everything
just... magically update is *incredible* and shows the power of.. the dark side.
I mean, Vue. But... we have a bug. Gasp sounds!

## We have a Bug!

Remove all of the inflatable sofa items from the cart and do a full page refresh.
*Now* try to add a red sofa and... oh! It did *not* show up in the cart! I see
11 items in the cart... and I just added 1 more... so the new total should be 12...
and that *does* show in the header! But the item is missing!

Let's check the console. Woh! Huge error!

> Cannot read property `price` of undefined

Coming from `ShoppingCartList`. Yikes! The problem is... subtle. Head over to
`shopping-cart.vue` and find our watcher function... here it is.

Let's remember how this works: after the cart AJAX request finishes, Vue calls our
cart watcher function and *it* executes the `loadProducts` function. That
collects the product ids from the items in the cart and makes one AJAX call to
fetch all of that product data. By the end of this, we have a `cart` object *and*
an array that holds the data for every product in the cart.

The problem *now* is that when we add a totally *new* product to the cart, this,
naturally, causes our Vue component to re-render. That process calls our computed
property: `completeCart`. But *this* time, the new product is *missing* from
the `products` data! This means the `product` ends up being `null`, which is
*not* something we expect. Eventually, we try to read the `price` property from
this and... well, you saw it: things fall apart.

But, hold on a minute... this doesn't make sense! When we add a new item to the
cart, that *changes* the `cart` data. That should cause Vue to call our cart watcher
function... and *that* should cause the load products method to make a *fresh* AJAX
call for all of the products in the cart, *including* the new product.

## Watcher Functions are Not "Deep"

Then, when we re-render, the `completeCart` computed property should *work*...
and everything should be awesome! So... why isn't everything awesome?

The answer is that watcher functions *only* watch to see if an *entire* piece
of data is changed or replaced: like when the cart goes from `null` to an object
after the initial AJAX call. But if a piece of data is an array or an object like
`cart`, a watcher does *not* watch for changes to the items in that array or the
properties on that object. In other words, when a new item is added to the
`cart.items` array, our watcher is *not* called. And so, the AJAX call for the
fresh new products is never made!

## Ok, so make the Watcher Deep!

So what's the fix? Well, you actually *can* make a watcher watch in "deep" mode,
where it calls the function for a change on *any* level. Copy the `loadProducts()`
line. A deep watcher has a different syntax. Change `cart` to a property set to
an object with `deep: true`. *That's* the key. The function now lives under a
`handler()` callback. Inside, paste `this.loadProducts()`.

Let's try it! Move over to the browser, remove the sofa from the cart and refresh.
Now add the green sofa back and... woohoo! The new product showed up in the cart!

## Coding Defensively while we Wait for It

But... you probably also noticed the big error in the console... which is the
*same* error as before! That's because, after the `cart` changes, but *before*
the new products AJAX call finishes, Vue re-renders and the `completeCart` computed
prop is *still* missing the new product data. And so, it explodes.

A moment later, the products AJAX call finishes, Vue re-renders *again*, and it
works fine.

To fix this, inside the computed prop, let's code defensively. I'm thinking that,
after we go through the `map` function, if any of these items are missing their
`product`, let's just filter them out. That would temporarily *hide* an item
until its data is available.

We can do that very simply by setting the items key to `completeItems.filter`,
with a callback that checks to see if `product.item` is .. truthy. So basically,
this filters out any items that are missing their product.

Now, once again, refresh, remove the sofa, and refresh again. Add a red sofa
with quantity 2 and... yes! That was perfect!

## Watching the Cart Items Length

But... this "deep" watcher is kind of overkill. Now, even when we change the
*quantity* of an item, it will cause a new API call for the products. Check it
out: open the Network tools and filter to XHR - or AJAX requests. I'll clear
things out. Each time I change the quantity, 2 AJAX calls are made! The first one
saves the cart - we expect that - but the second one is because our watcher function
is called... and  *that* makes an unnecessary AJAX call for the products.

And maybe... this isn't that big of a deal. But we can do better.

So let's think about it. The only time that we *really* need to load the products
is when a new item has been added to the cart. Could we... somehow... have a watcher
watches the *length* of the `cart.items` array for changes? As strange as it
sounds, we can!

Copy that `loadProducts()` line and change this to yet *another* syntax. This time,
make the key a string - `cart.items.length` - set to a function with... any name
you want, like `watchCartItemsLength`. That part doesn't matter. Inside, call
`this.loadProducts()`.

Yup, that works! Try it! Once again, remove the item and refresh the page so we
can see the *whole* process. I'll add a blue sofa... oh bit first clear the
requests. And... it shows up! If we change the `quantity`... yes! There is *one*
AJAX call to *save* the updated cart, but not an *extra* one for the products.
There *is* a fresh AJAX call when we *remove* an item, which is technically not
necessary, but I am happy with this.

So... watchers are powerful, but can be tricky! That's part of the reason that
I only use them when I absolutely need to. There are usually simpler, more direct
solutions.

Next: I think I'm ready to buy these great products. Let's make our
shopping cart page able to toggle between the cart and a checkout component.
Eventually, we'll use this setup to learn all about Vue transitions.
