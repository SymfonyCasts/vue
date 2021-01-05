# Finishing the Cart Controls Component

We've successfully extracted most of the markup and functionality for the
"add to cart" controls into this new component. Our template still references
a few undefined methods, but thanks to the props and data we added to the component,
all the variables *should* now be defined. And *that* means, we *should* be able
to get this to render.

## Using the Component

Back in `index.vue`, let's import this puppy: import `CartAddControls from` and
I'll be lazy and just use `./cart-add-controls` because they live in the same
directory. Add this to `components`...

Then head up to the template: `<cart-add-controls`. Pass this the props it needs:
`:product` set to `product` and then `allowAddToCart`. This should be true *if*
the `cart` is done loading.

As a reminder, this component uses the `get-shopping-cart` mixin, which means it
has a data called `cart`. We can use that here: `allowAddToCart` if
`cart !== null`.

Next add `:add-to-cart-loading` set to the `addToCartLoading` data - which also
comes from the mixin - and `:add-to-cart-success` set to `addToCartSuccess`.

Done! Let's try it out! Move over to the browser and... yes! It renders!
Well, yes, it *does* render, but Vue is *totally* mad because our template
references some undefined methods. Time to fix those!

## Moving the Method

The first is `updateSelectedColor`. Go into the original component and find this
method. This updates `this.selectedColorId`... which no longer *lives* in this
component anyways. Copy the method, delete it, go to `cart-add-controls`, scroll
down, add a new `methods` section and paste.

Thanks to this, when the `color-selector` component emits its `color-selected`
event, we call this method and *it* updates the `selectedColorId` data.

## Emitting an Event

The last undefined method we're referencing is `addToCart()`, which *also* lives
in the parent `index.vue` component. This one is a bit more complex. We can't
just copy the method and move it... because it calls `this.addProductToCart()`.
If I hold Command or Ctrl and click that method, *it* comes from the mixin.

And, more importantly, adding an item to the cart *modifies* the `cart` data...
and so that logic should happen *inside* the component that holds that data,
which is `index.vue`.

In other words, this is another *classic* situation where we need to emit an
event from a child component so that its parent component can *listen* to that
event and update some data.

And... that's actually awesome! Emitting an event from a component is a *great*
way to make that component generic and reusable. Anyone using this will
be able to do *whatever* logic they want when the "add to cart" button is pressed.

Down in methods, add `addToCart()`. But now, instead of modifying some data, say
`this.$emit()` to emit an `add-to-cart` event. Pass this the two things that our
component needs to communicate: `quantity` set to `this.quantity` and
`selectedColorId` set to `this.selectedColorId`.

Finally, back in `index.vue`, when we include `cart-add-controls`, we can listen
to this: `@add-to-cart=` and then call the `addToCart()` method that we already
have... we'll just need to tweak it slightly.

Head down to find `addToCart()`. This will *now* receive the `event` object that
we're sending to the `add-to-cart` event: with `quantity` and `selectedColorId`.
Instead of adding an `event` argument and reading those keys off of it, let's
put our fancy hat on and use object destructuring: `{}` then `quantity` and
`selectedColorId`. Remove the `this` from both of those variables below.

Phew! We moved a *lot* of stuff around to get this working... but we now have a
*beautiful* component that receives the props it needs, manages the data it
needs and emits an event when it needs to.

So let's try it! Move over and do a full refresh just in case. We have 12 items
in the cart right now. Add 3 blue couches and... yea! The loading animation was
right, the check box shows and the cart header updated! And when we go to the cart
page, it's *there*!

Next: let's leverage our hard work to add the featured product sidebar.
