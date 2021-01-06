# Add to Cart Controls on the Sidebar

Now that we're *rendering* the featured product on the sidebar, our next job
is to make it functional: to make it possible to add this item to the cart
*right* from this page.

And thanks to our *wonderful* work isolating the "add to cart" controls into
its own component, this is going to be fun! Practically a victory lap!

## Rendering the Cart Controls

In `cart-sidebar.vue`, let's get to work: `import CartAddControls` from
`@/components/product-show/cart-add-controls`, add a `components` key, then
put that inside.

Up in the template, after `h6` render `<cart-add-controls`. This needs a number
of different `props`. If I hit Command+Spacebar PhpStorm will show them: 3
boolean props and `product` object prop.

Pass  `:product` set to `featuredProduct`. For the other three, hardcode them
to start so we can see if things are working: `:add-to-cart-loading="false"`,
`:add-to-cart-success="false"` and `:allow-add-to-cart="false"`.

Ok! Let's go check it. And... awesome! Well, not *that* awesome: it looks terrible.
Things aren't quite "fitting" here.... this button really needs to be smaller.

## Adding more Flexibility to the Cart Controls Component

This is a great example of the lifecycle of a reusable components. Open
`cart-add-controls.vue`. Until now, the "Add to Cart" text on the button did
*not* need to be dynamic. But suddenly, we *do* need to be able to control it
so we can make it shorter *only* on the sidebar.

This means our component needs to be made *more* configurable with a new prop.
Call this `addButtonText`, the type is String, but this time, instead of making
it required, set a default value of `Add to Cart`.

Back up in the template, replace the hardcoded text with `{{ addButtonText }}`.

Over in `cart-sidebar`, let's leverage this new flexibility: pass the
`add-button-text` prop set to `+`. We don't need to say `:add-button-text`
because we're not setting this to a variable or JavaScript code, we're hardcoding
it to the plus sign.

Now when we refresh.. yes! So much better!

## Passing in the Real Prop Values

So let's make the button actually *work*... and we're super close! Step one is to
pass real values for the 3 hardcoded props. All of this information *really* lives
up in our parent `ShoppingCart` component. There, we're using the `get-shopping-cart`
mixin, which holds a number of pieces of data, including `addToCartLoading` and
`addToCartSuccess`. And so, we're going to need to do a little bit of prop passing:
we need to pass this info prompts from `shopping-cart` into `cart-sidebar` so that
*it* can pass them into `cart-add-controls`. This is *not* my favorite thing to
do in Vue, but it's fairly simple.

Start by stealing these three props from `cart-add-controls`. Copy them... and
paste those into `cart-sidebar`. Use these up in the template: `addToCartLoading`,
`addToCartSuccess` and `allowAddToCart`.

Finally, we need to pass these props into `cart-sidebar` from `shopping-cart`.
Scroll to the template. Yep! The `<cart-sidebar` is mad because it's missing 3
required props! Set `:allow-add-to-cart` set to `cart !== null`. Basically, the
user should be *allowed* to add an item to the cart, as long as the `cart` data
has finished loading from AJAX. Then `:add-to-cart-success` set to `addToCartSuccess`
and `:add-to-cart-loading` set to `addToCartLoading`.

By the way, I've repeated this `cart !== null` logic both here and in the
`product-show` template. If we wanted to, we *could* add a new `allowAddToCart`
computed property to the mixin to make this simpler.

## Listening to the add-to-cart Event

*Anyways*, the *last* step to make this work is to make the button *do* something
when it's clicked. Remember: in cart-add-controls, when we click that button...
it calls an `addToCart` method... and *that* emits an event: `add-to-cart`. We
can listen to that to *do* the logic.

In `cart-sidebar`, add `@add-to-cart=`. And, hmm. The `cart` data we need to
modify does *not* live in this component... so we need to emit the event again
so `shopping-cart` can listen to it. Do it with `$emit('add-to-cart, $event)`.

Then, in `shopping-cart`, listen to this again. On `<cart-sidebar`, say
`@add-to-cart=`. Remember, in the `get-shopping-cart` mixin, we have an
`addProductToCart` method. We can call this directly: `addProductToCart()` with
the three arguments it needs: `featuredProduct`, `selectedColorId`, which is
on the event - so `$event.selectedColorId` - and the quantity - also on the event:
`$event.quantity`.

Phew! There *was* some work to connect the pieces together, but I think we're
done! Find your browser and do a full refresh. Let's see what happens. I already
have 3 blue sofas in my cart. Let's add 2 more. Yes! This is so cool! The cart
instantly updated.

Let's add a couple more red sofas... boom! Green isn't in the cart yet... but
that works too! Even if we remove an item... then add it back: it all looks
perfect.

But... yes there *is* a but... there's a subtle bug. If the featured product - the
inflatable sofa- was *not* already in the cart when the page load, then clicking
the plus button would make things go *bananas*. Let's find out why next and
solve it with a deeper understanding of watcher functions.
