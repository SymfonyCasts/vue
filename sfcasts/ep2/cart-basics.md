# The Cart Page

Thanks to the mixin, our `shopping-cart` component has the `cart` data, which is
being loaded via AJAX on `created`. Let's use that to build this page!

[[[ code('37ae7a089d') ]]]

Start with a `v-if` so that we don't try to use the `cart` data before it's loaded.
`<div v-if=` then `cart !== null`.

[[[ code('61181cd85e') ]]]

To know what we can do inside of this, go check out the Vue dev tools. The
`ShoppingCart` component's `cart` data has an `items` key that we can loop over.
Now, each item does *not* have any unique "id" property, which is a bit of an odd
setup in our API, but it's fine. A unique id would really be the combination of
the `product` IRI and the `color` IRI.

Anyways, let's loop over this: add `div`, put it on multiple lines, with `v-for`.
I'm going to use the longer syntax so we can access the index: `cartItem, index`
in `cart.items`.

I'm doing this because the `cartItem` doesn't have a unique id. So for right
now, set `:key` to `index`. We'll improve that later with a *true* unique key,
but it will work fine to start.

[[[ code('4a99377415') ]]]

Inside the div, let's print `cartItem.product` and also `cartItem.quantity`.

[[[ code('bd1b9a62b4') ]]]

Let's see how this looks! Move over to your browser. Hey! It works! It's
not very pretty or *useful* yet... but it's a start! Crawl before you walk,
as I like to say.

## When the Cart is Empty

Before I forget, let's also handle the situation where the cart is empty... we
want to give those customers some *encouragement* to keep shopping. Down below,
but still inside the `v-if` for `cart`, add `<div v-if="cart.items.length === 0"`,
then we know that

> Your cart is empty. Get to shopping!

[[[ code('40f52ef310') ]]]

We can test this by messing with the Vue dev tools. Find the `cart` data, edit
the `items` key and set it to an empty array. There we go!

# Loading Animation

As a final touch, since the cart doesn't render until the cart AJAX call has finished,
let's add a loading animation. Down on the component, start by importing our
re-usable loading component: `import Loading from '@/components/loading`. Then
add that to the `components` option... and in the template, use it with
`<loading v-show="cart === null" />`.

[[[ code('7c3301c269') ]]]

We could also use `v-if` since the loading animation will be shown once and then
hidden forever... but as we talked about, these are micro-optimizations. It doesn't
really matter.

Oh, and *later* we might need a smarter loading mechanism that uses some `loading`
data. But right now, checking the `cart` is perfect: if it's set, we know that
we're ready to render!

Let's try it! Move over, refresh and... yep! It was quick - but we have a loading
animation!

## We need More Data!

What's next? Well, we *really* need to render more data, like the product name and
price. The problem is... we don't have that data! Look at the Vue dev tools
and find the `cart` data. Each cart item has just these three keys. In a more
perfect world, the cart API call might return more, like the actual product
data instead of just the IRI string.

But since it doesn't, we're going to need to make *another* AJAX call to get
the product data for each item in the cart.

Start by opening `assets/services/products-service.js`. At the bottom, I'm going
to paste in a new function: `fetchProductsById()`, which you can copy from the
code block on this page.

[[[ code('190ee4c818') ]]]

This is going to be *really* useful. It will allow us to collect the product IRI
string for each item in the cart, then call this function to make *one* AJAX call
to fetch *all* that product data at once.

But... how exactly can we do that? In `shopping-cart`, we need to call this new
function *after* the `cart` AJAX call has finished... because we *need* that data
to know which product IRIs to fetch. But the cart AJAX call doesn't live in this
component: it lives over in `created` in the mixin. How can we run some code
after this finishes?

Next, let's talk about how to do this. Then we'll get to work fetching and filling
in all of our missing data thanks to a clever computed property.
