# More Mixin Magic

We created this mixin with the goal of sharing Vue logic between the `product-show`
component and the new `shopping-cart` component that we're about to *really* start
building. Specifically, both need a `cart` data and both need to make an Ajax call
to *populate* that `cart` data. That stuff is now inside the mixin. Woo!

Both pages will also need the ability to add an item to the cart. It might seem
weird to add an item to the cart *from* the shopping cart page, but
we're going to add a "featured product" sidebar on this page with an "add the cart"
button. So, in preparation for that, let's *also* move the add to cart functionality
from `product-show` into the mixin.

## Moving addToCart to the Mixin

This *literally* means that we're going to move the `addToCart` method from the
component into the mixin. So let's copy it, delete it, and then, in the mixin,
I'll add `methods` and then paste.

Oh, and this references two pieces of data that are related to this process:
`addToCartLoading` and `addToCartSuccess`. Those should *also* now live in the
mixin. Go find them, copy them, delete them, and paste them inside the mixin.

If we stopped now, this probably *would* work because the new data and the new
method are, as I mentioned, basically *copied* into our component. But it *is* a
bit weird because the mixin references things like `this.product` and
`this.selectedColorId`... but those *don't* live in the mixin. That's
technically okay... and we sometimes do things like this in PHP with traits...
which are very similar to mixins.

But I don't like. It makes the mixin hard to use correctly. The only way
you *can* use this mixin is if your component has `data` with these exact names...
which you would need to, kind of, dig a little to find. It also makes it easy to
break your mixin... because if you renamed a piece of data in the component and
updated all the references *in* that component... it wouldn't be very obvious
that the mixin is *also* relying on this.

## Being Explicit about what your Mixin Needs

Fixing this properly is simple enough. Instead of referencing these three
pieces of data down here, let's force them to be passed as arguments to the method.
So: `product`, `selectedColorId` and `quantity`. Then we can update the code below:
change `this.product` to just `product`, and then `product`, `selectedColorId`
and `quantity`.

Oh, but ESLint is mad because we can shorten this from `quantity: quantity` to just
`quantity`.

Ok! I like this function... but it will *totally* not work yet. This method is
called directly in the component thanks to the `@click` on the add to cart button.
But now that this method needs 3 arguments... we can't use it like this.

One option is to switch to the "inline" `@click` syntax, where we say
`addToCart()` and pass it the three arguments it needs. That's a totally valid
way to do it. Or, we could rearrange things a bit.

Change it back to just point to the `addToCart` method. Then, in the mixin, rename
the method from `addToCart` to, how about, `addProductToCart` so that our `@click`
doesn't call this directly. Finally, in the component, find `methods`, re-add
`addToCart()` and call the mixin method: `this.addProductToCart()`
with `this.product`, `this.selectedColorId` and `this.quantity`.

Ok! That should do it! Testing time! Find your browser and... I'll refresh
to be safe. We just want to make sure that this all still works. Hit add to cart
and... it... sort of worked? I didn't see any animations, but the header *did*
change from 15 to 16.

## What a Bad data key Looks Like

Let's check the console to see what's going on:

> property or method, `addToCartSuccess`, and `addToCartLoading` are not defined
> on the instance.

And above that it says:

> the `data` option should be a function that returns a per instance value in
> component definitions.

Ah! I think I know what I did wrong, and it's kind of cool! Go back to the mixin
and scroll up to `data`. Yup! `data` should be a *function* that returns an object
not just a key *set* to an object. That's easy to do because some Vue keys are
functions and others are just set to values. Because of this mistake, our mixin
was not *actually* defining *any* of these pieces of data.

But... wait. If that's true, then how did this work at all? I mean, I *did* see
the cart header update. And if we refreshed, we *would* see that it *did*
truly add the item to the cart. How is that possible if there is no `cart` key
in data?

The answer is kind of cool! First, though there is *no* `cart` data, saying
`this.cart =` *does* still work! How? Remember: each Vue component is a normal
JavaScript object... and it *is* valid to say `this.cart = ` on any JavaScript
object, even if that property doesn't currently exist. So basically, our `created`
function added a normal, non-reactive JavaScript property. And then, we
*referenced* that normal JavaScript property via `this.cart` in other parts of
our component. That was enough to make our add to cart work!

The reason that things *appeared* broken is that, for `addToCartSuccess`
and `addToCartLoading`, we reference those in our *template*. Vue makes *data*
available as variables in the template, but it does *not* make normal, non-Reactive
properties that we randomly add to our object available as variables. So while
we could have *technically* referenced `this.addToCartSuccess` in our component,
referencing `addToCartSuccess` in the template does *not* work.

So... I messed up, but it *was* a nice chance to think about how things work
under the hood inside our Vue instance. Let's fix it: change `data` to a function
that returns our data object.

Back in the browser, it looks like it already reloaded. Hit add to cart and... it
works!

## Using the Mixin in shopping-cart

We now have some really nice, reusable code for our `shopping-cart` component.

So let's go use it there! Import `ShoppingCartMixin` from `@/mixins/get-shopping-cart`.
Then, like before, add a `mixins` key set to an array with this inside.

We're not going to *do* anything with that mixin yet, but we can already check
if it's working. At your browser, click to the shopping cart and go down to the
Vue dev tools. Find the `ShoppingCart` component and... yes! It has a `cart` data
and you can see that it's *already* been populated via AJAX!

And *that* means we are dangerous. Next, let's use this `cart` data to build the
page.
