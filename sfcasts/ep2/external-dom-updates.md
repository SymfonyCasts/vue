# External DOM Updates

When we add something to the cart, the last piece of data that's hardcoded is
the color. Now, some products come in multiple colors and some don't. But when
we *are* on a product with multiple colors - like our inflatable sofa - we need
to make sure that we send the selected colors IRI with the AJAX call.

Doing this is... pretty similar to how we handled the quantity. In that case,
we had an `input`. When the input changes, we update this `quantity` data via
`v-model`. Then, down here, once we did that, it was very easy to reference
`this.quantity` when adding the item to the cart.

## Listening to the color-selected Event

For the color, we already have this cool color selector component. This comes
from `assets/components/color-selector.vue` The important thing to know for *us*
is that whenever we select a color, this component emits a `color-selected` event
and send the IRI of that color as the data.

So... we can use that! In `product-show.vue`, scroll up to the template and find
the color selector. There it is. We've already made this *only* render if the
product *does* come multiple colors. To listen to the event, add `@color-selected`
set to a new method - how about `updateSelectedColor`.

Next, copy that method name and scroll down to add a new piece of data:
`selectedColorId` set to null. Then, under `methods` add `updatesSelectedColor()`.
And because the event we're listening to sends the `iri` as its data, this will
receive an `iri` argument. Now... `this.selectedColorId = iri`!

By the way, later in the tutorial, we'll learn how we could have written the
`colors-selector` component in a way that would have allowed us to use `v-model`
on it, instead of creating this method. Yep, `v-model` isn't just for *real* form
inputs: it can also be used for custom components.

Anyways, up in `addToCart()`, change to use `color: this.selectedColorId`. Because
this defaults to null, if a product doesn't come in multiple colors, this will
still be null, and everything will be happy.

## Very Basic Color Validation

Oh, except we need to make sure that if the product *does* have a color, that the
user *selects* a color before adding the item to the cart. We can do that right
here: if `this.product.colors.length` - so if this product comes in multiple colors -
and `this.selectedColorId === null`, we have a problem! For now, I'm just going to
`alert('Please select a color first')` and then return.

That's not a great user experience, but it's good enough for us. But solving this
correctly wouldn't be much more work: I'd create a new piece of data, like
`addToCartError` - set that here, and render it above.

Anyways, let's try it! Move over and... I'll refresh just to be safe. Click
"Add to Cart". Alert! Ok, we have 15 items in the cart now. Let's select green,
quantity 1, "Add to Cart" and... it looks like it worked! Let's refresh. Yep!
The cart is up to 16. In the Vue dev tools, find the `cart`: two items. And...
this has `quantity` 1 *and* a color set.

## Updating the Shopping Cart Header Count

At this point. I'm pretty happy with our "add to cart". Well, happy except for one
detail: I don't like that the shopping cart count in the header doesn't update
until I refresh the page.

But... what can we do? This isn't inside of our Vue app!

The answer is... who cares? What I mean is, if it's important for us to update this
count for a good user experience, we can *totally* do it using good, boring
JavaScript.

First open the template that holds this: `templates/base.html.twig`. I'll search
for "shopping cart". Here it is: line 44. To be able to find this `span` in
JavaScript, add an `id="js-shopping-cart-items"`.

Next, back in the component, after we successfully added the item to the cart, we
can say  `document.getElementById()` - paste the `js-shopping-cart-items` string -
then `.innerHTML = getCartTotalItems()`.

That's a *new* function that we haven't used yet. And when I hit tab to auto-complete
it, PhpStorm added the new import for us... though I'm going to move this all back
onto one line.

Anyways, this function comes from `cart-service` - the file we copied into our project
a few minutes ago. Here it is. Very simply. is loops through the items and counts
all of them using their quantity. A simple helper to get the number.

Back in `product-show.vue`, down in the method, we can call `getCartTotalItems()`
and pass it `this.cart`. Because this returns a Number, call `.toString()` on the result.

So... no. This is *not* the most hipster code that you will ever write. But it
*will* work and give us the user experience we want. And if I needed to update
this header from *multiple* places in my code, I would *definitely* isolate it
into its own JavaScript module to avoid duplication.

Let's see if it works! Back at the browser, make sure to refresh so the `span`
gets the new id. Let's add 3 more green sofas. Watch the header... boom! That is
*so* much nicer.

Next: with the add to cart done, let's create a new page: one that will display
the shopping cart and checkout!
