# Deep and Smart Watchers

The fact that we can add things to our cart from the sidebar and have everything
just... magically update is *incredible* and shows the power of Vue. But... we
have a bug. Gasp sounds!

## We have a Bug!

Remove all of the inflatable sofa items from the cart do a full page refresh.
*Now* try to add a red sofa and... oh! It did *not* show up in the cart. I see
11 items in the cart, and I just added 1 more... so the new total should be 12...
and that *does* show up in the header! But the item is missing!

Let's check the console. Woh! Huge error!

> Cannot read property `price` of undefined

Coming from `ShoppingCartList`. Yikes! The problem is subtle. Head over to
`shopping-cart.vue` and find our watcher function... here it is.

Let's remember how this works: after the cart AJAX call finishes, Vue calls our
cart watcher function and *it* calls the `loadProducts` function. That then collects
the product ids from the items in the cart and makes one AJAX call to fetch all
of that product data. By the end of this, we have a `cart` object and an array
that holds the data for all of the products *in* the cart.

The problem *now* is that when we add a totally *new* product to the cart, this,
naturally, causes our Vue component to-render. That process calls our computed
property: `completeCart`. But *this* time, that new product is *missing* from
the `products` data! This means the `product` ends up being `null`, which is
*not* something we expect. Eventually, we try to read the `price` property from
this and... well, you saw it: things fall apart.

But, hold on a minute... this doesn't make sense! When we add a new item to the
cart, that *changes* the `cart` data. That should cause our cart watcher function!
And *that* should cause the load products method to make a *fresh* AJAX call for
all of the products in the cart, *including* the new product.

## Watcher Functions are Not "Deep"

Then, when we re-render, the `completeCart` computed property should *work*...
and everything should be awesome! So... why didn't that happen?

The answer is that the watcher functions only watch to see if an *entire* piece
of data is changed or replaced: like when the cart goes from `null` to an object
after the initial AJAX call. But if a piece of data is an array or an object like
`cart`, a watcher does *not* watch for changes to the items in that array or the
properties on that object. In other words, when a new item is added to the
`cart.items` array, our watcher is *not* called. And so, the AJAX call for the
fresh new products is never made.

## Ok, so make the Watcher Deep!

So what's the fix? Well, you actually *can* make a watcher watch in "deep" where
it calls the function for a change on *any* level. Copy the `loadProducts()` line.
A deep watcher has a different syntax. Change `cart` to a property set to an object
with `deep: true`. *That's* the key. The function now lives under a `handler()`
callback. Inside, call `this.loadProducts()`.

Ok, let's try this thing! Move over to the browser, remove the sofa from the cart
and refresh. Now add the green sofa back and... it works! The new product showed
up in the cart!

## Coding Defensively while we Wait for It

But... you probably also noticed the big error in the console... which is actually
the *same* error as before! That's because, after the `cart` changes, but *before*
the new products AJAX call finishes, Vue re-renders and the `completeCart` computed
prop is *still*  the new product data. And so, it explodes.

A moment later, the products AJAX call finishes, Vue re-renders *again*, and it
works just fine. So... it *does* work eventually, but not after a huge error.

To fix this, inside the computed prop, let's code defensively. I'm thinking,
if any of these items - after we go through the `map` function - is missing its
product, let's just filter it out. That would temporarily *hide* the item until
its data is available.

We can do that very simply by setting the items key to `completeItems.filter`,
with a callback that checks to see if `product.item` is set. So basically, this
filters out any items that are missing their product.

Now, once again, refresh, remove the sofa, and refresh again. Add a red sofa
with quantity 2 and... yes! That was perfect!

## Watching the Cart Items Length

But... this "deep" watcher is kind of overkill. Now, even when we change the
*quantity* of an item, it will cause a new API call for the products. Check it
out: open the Network tools and filter to the XHR - or AJAX requests. I'll clear
things out. Each time I change the quantity, check it out! Our watcher function
is called... and we make a fresh call for the products, which is overkill.

And maybe it's not that big of a deal... but we can do better.

So let's think about it. The only time that we *really* need to load the products
is when a new item has been added to the cart. Could we... somehow... have a watcher
that's only executed when the *length* of the `cart.items` array changes? As strange
as it sounds, we can!

Copy that `loadProducts()` line and change this to yet *another* syntax. This time,
make the key a string - `cart.items.length` - set to a function with... any name
you want, like `watchCartItemsLength`. That part doesn't matter. Inside, call
`this.loadProducts()`,

Yup, that works! Try it! Once again, remove the item and refresh the page so we
can see the *whole* thing working. I'll add a blue sofa... oh bit first clear the
requests. And... it shows up! If we change the `quantity`... yes! There is *one*
AJAX call to *save* the updated cart, but not an *extra* one to for the products.

The only AJAX, obviously down there is saving the cart. We don't see the
extra one for the cart items. There is a fresh AJAX call when we *remove* an item,
which is technically not necessary, but I am happy with this.

So... watchers are powerful, but can be tricky. That's part of the reason that
I only use them when I absolutely need to: there are usually simpler, more direct
solutions.

Next: I think I'm ready to buy these great products. Let's learn about Vue
transitions so that we can make this cart *transition* cooly into a checkout form.
