# Add To Cart

The cart data is being loaded via AJAX... and we *need* that data *before* we
can add a *new* item to the cart. It should all load pretty quickly, but to be safe,
let's *prevent* the user from clicking the "Add to cart" button *until* that
AJAX call is done.

Head up to find that button. This is delightfully simply: add `:disabled` set to
`cart === null`.

[[[ code('69abe63cea') ]]]

If we don't have a `cart`, no clicky the button! It's disabled.

## On Click, Add to Cart

Now let's hook up the *real* functionality: `@click=""` and call a new `addToCart()`
method:

[[[ code('b265a4eb59') ]]]

Head down to the component, add `methods: {}`, then `addToCart()`. This
won't need any arguments.

[[[ code('f45bc5feab') ]]]

Inside, we can use an `addItemToCart` method from `cart-service`. I'll
type `addItemToCart()` and hit tab to auto-complete... because that little trick
gets PhpStorm to add the import *for* me.

Ok, the first argument is the cart object - so `this.cart`. In practice, we know
that it's safe to reference `this.cart` because our `addToCart` method can't be
called until *after* the cart AJAX call has finished. Until then, the button is
disabled.

[[[ code('4f0f22de16') ]]]

The second argument is the *item* to add. This is an object with *three* things:
`product` - set to the product IRI, so `this.product['@id']` - `color` -
which for right now, I'm going to set to `null` - and `quantity` set to 1.

[[[ code('a668af6a6e') ]]]

If... you're thinking:

> How did Ryan magically know what keys to pass here?

That's... a fair question. This is just how the API is designed. If you go back
to the API docs... and open the `put` endpoint, the example shows the keys
we're using. Both of those strings are *IRI* strings.

Anyways... I think it's testing time! I'll refresh to be sure... hit "Add to Cart"
and... I think it worked? I don't see any errors... but I *can* see the successful
AJAX call to `/api/carts`. It's a POST request because this is creating a *new* cart.

## Rejected Cookie on http

Let's see if the `cart` data updated inside Vue. Hmm, it did not! This is a quirk
that is *completely* unrelated to Vue... but I wanted to show in case it happens
to you. If we look at the HTML source, we can see that `window.cartIri` is still
`null`. The problem is that I use `localhost:8000` for tons of projects, which
means I already have some session cookies from those other projects. And since
I'm using `http` instead of `https` this time, my browser is *refusing* to override
my old secure cookie with an insecure one.

The fix is to go to Application and clear the storage to get rid of any cookies
from other projects.

Let's try this again. Refresh... go back to the Vue dev tools and click "Add to Cart".
This time when I refresh... yea! Look at the header! It says: "Shopping cart (1)".
And if we look at the Vue tools... yes! The `cart` contains 1 item with `quantity`
1.

To prove we can *increase* the quantity, hit "Add to Cart" 2 more times. Notice
that the header does *not* instantly update. That's no surprise, but we *will*
fix that. Refresh to see the new value and... yes! It says 3! Our `cart` still
only has one item, but with `quantity` 3.

So.. yay! We can add things to our cart! Next, let's make this whole process
fancier with some animations *and* hook up the `quantity` input.
