# Add to Cart Controls on the Sidebar

Now that we're *rendering* the featured product on the sidebar, our next job
is to make it work! Make it possible to add the item to the cart *right* from
this page.

Thanks to our *wonderful* work isolating the "add to cart" controls into
its own component, this is going to be fun! Practically a victory lap!

## Rendering the Cart Controls

In `cart-sidebar.vue`, let's get to work: `import CartAddControls` from
`@/components/product-show/cart-add-controls`, add a `components` key, then
put that inside.

Up in the template, after the `h6` render `<cart-add-controls`. This needs a number
of different `props` and if I hit Command+Spacebar PhpStorm will show them to me:
3 boolean props and a `product` object prop.

Pass `:product` set to `featuredProduct`. For the other three, hardcode them
for now: I want to see this render first: `:add-to-cart-loading="false"`,
`:add-to-cart-success="false"` and `:allow-add-to-cart="false"`.

Let's go check it! And... awesome! Well, not *that* awesome: it looks terrible!
Things aren't quite... "fitting". This button really needs to be smaller.

## Adding more Flexibility to the Cart Controls Component

This is a great example of the lifecycle of a reusable component. Open
`cart-add-controls.vue`. Until now, the "Add to Cart" text on the button did
*not* need to be dynamic. But suddenly, we *do* need to be able to control it
so we can make it shorter *only* on the sidebar.

This means our component needs to be made *more* configurable with a new prop.
Call it `addButtonText`, the type is `String`, but this time, instead of making
it required, set a default value of `Add to Cart`.

Back up in the template, replace the hardcoded text with `{{ addButtonText }}`.

Over in `cart-sidebar`, let's leverage this new flexibility: pass the
`add-button-text` prop set to `+`. We don't need to say `:add-button-text`
because we're not setting this to a variable or JavaScript expession: it's just
a plus sign.

Now when we refresh.. yes! So much better!

## Passing in the Real Prop Values

Let's make the button actually *work*... and we're super close! Step one is to
pass real values for the 3 hardcoded props. All of this information *really* lives
up in our parent `ShoppingCart` component. There, we're using the `get-shopping-cart`
mixin, which holds a number of pieces of data, including `addToCartLoading` and
`addToCartSuccess`. And so, we're going to need to do a little bit of prop passing:
we need to pass this info from `shopping-cart` into `cart-sidebar`... so that
*it* can pass them into `cart-add-controls`. Passing props down several components
isn't my *favorite* thing to do in Vue, but it's fairly simple.

Start by stealing the three props from `cart-add-controls`. Copy them... and
paste those into `cart-sidebar`. Use these up in the template: `addToCartLoading`,
`addToCartSuccess` and `allowAddToCart`.

Finally, we need to pass these props into `cart-sidebar` from `shopping-cart`.
Scroll to the template. Yep! `<cart-sidebar` is mad because it's missing 3
required props! Set `:allow-add-to-cart` to `cart !== null` because the
user should be *allowed* to add an item to the cart once the `cart` data
has been loaded from AJAX. Then `:add-to-cart-success` set to `addToCartSuccess`
and `:add-to-cart-loading` set to `addToCartLoading`.

By the way, I've repeated this `cart !== null` logic both here and in the
`product-show` template. If we wanted, we could add a new `allowAddToCart`
computed property to the mixin to make this easier.

## Listening to the add-to-cart Event

*Anyways*, the *last* step to make this work is to make the button *do* something
when it's clicked. Remember: in `cart-add-controls`, when we click that button...
it calls an `addToCart` method... and *that* emits an event: `add-to-cart`. We
can listen to that to *do* the logic.

In `cart-sidebar`, add `@add-to-cart=`. And, hmm. The `cart` data we need to
modify does *not* live in this component... so we need to emit the event again
so `shopping-cart` can use it. Do it with `$emit('add-to-cart', $event)`.

Then, in `shopping-cart`, listen to that. On `<cart-sidebar`, say
`@add-to-cart=`. Let's think... in the `get-shopping-cart` mixin, we have an
`addProductToCart` method. Ah, we can call that *directly*: `addProductToCart()`
with the three arguments it needs: `featuredProduct`, `selectedColorId`, which is
on the event - so `$event.selectedColorId` - and the quantity - also on the event:
`$event.quantity`.

Phew! That *was* a good amount of work to connect all the pieces together, but
I think we're done! Find your browser and do a full refresh. Let's see what
happens. I already have 3 blue sofas in my cart. Let's add 2 more. Yes! This is
so cool! The cart instantly updated!

Add a couple more red sofas... boom... and green isn't in the cart yet... but
that works too! Even if we remove an item... and add it back: it all looks
perfect.

But... yes there *is* a but... we have a subtle bug. If the featured product - the
inflatable sofa - were *not* already in the cart when the page loaded, then clicking
the plus button would make things go *bananas*. Let's find out why next and solve
it with a deeper understanding of watcher functions.
