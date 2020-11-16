# External Dom Updates

Coming soon...

Let me add

The cart, the last piece of data that we kind of have hard coded as no one here is
the color. Now some of our products have colors and some don't. So when we, when
we're on a product that has a color, like our inflatable sofa, we need to make sure
that we sent this to that colors. IRI,

This is actually pretty close to the, uh, how he handled the quantity. In that case,
we had an input. Whenever the input changed, we updated the, this `quantity` data via
`v-model`. And then down here, once we did that, it was very easy for us to just
reference the `this.quantity` data. Now, as you can see, we already have this cool
color selector component, which allows us to select a color on a page. This comes
from our `components/color-selector.vue` An important thing to know is that
whenever we change the color, this emits a `color-selected` event and send the IRI of
that color. As the data on that event,

We can use that in our components, same `products-show.vue`,

Go up to the template and find where our color selector is. There we go. You can
already see, this is the only rendered. If the product actually has, uh, colors here,
we'll say `@color-selected=""`, and we'll call a new method called 
`updateSelectedColor`. We're going to do, and I'll copy that method name. Now we're going to
do is just like with quantity, we'll add a `selectedColorId`

Piece

Of data, set it to null, and down here under `methods`, I'll add a new method called
`updatesSelectedColor()`.

And we know

This is going to receive the `iri` as an argument. And very simply we can say
`this.selectedColorId = iri`.

Beautiful.

Finally, up here and `addToCart()`. We can use this `color: this.selectedColorId`. And
of course, that defaults to null also the product doesn't have a color that will
still be null, everything will be happy.

Oh, except

We need to make sure that if the product does have a color, we need to enforce that a
color is in fact selected. So up here and had a car. The first thing I'm gonna do is
add an if statement that says if `this.product.colors.length`. So if, if
this, if this product does have some and `this.selectedColorId === null` we have a
problem for. Now. I'm just going to `alert('Please select a color first')`. And then down
here, I will `return`. That's not a great user experience, but it's good enough for us
in a real app. I'd set a new piece of data, a new error piece of data here and render
it above. Alright, let's try it. When I move over, I'll refresh just to be safe and I
click add to cart. You see our alert and let's see, we have 15 items in the cart now.
So let's select green, one hit add to cart and it looks like it worked. Let me
refresh. This one is 16, and let's go down to product show here and look at our cart.
We have two items in there. Now look at item one, perfect exact quantity one. And
this one has a color

At this point. I'm pretty happy with our add to cart. Well, except for one detail,
it's not super great that I need to refresh to see the cart count, change in the
header. I got to read, add a cart, nothing until we refresh the problem is that,
well, what can we do? This is not inside of our view app, but who cares? If it's
important for us to update this for a good user experience, we can totally do it
using good, boring JavaScript. First open the template that holds this, that is in
`templates/base.html.twig` let's see here. I'll sure search for shopping cart
line 44. And here is where we're printing out the items on the span. I'm going to add
an `id="js-shopping-cart-items"`. I'm doing that. So we can select that from
inside of our JavaScript, back in our components.

After we have successfully added the item to the cart, we can say 
`document.getElementById()` paste. The ID `js-shopping-cart-items` and
then `.innerHTML=getCartTotalItems()`. This is actually when I hit tab there,
that was actually going to import a function. If I go up here, you can see all the
way up here. You can see it actually important, this new cart, total items. I'm
actually gonna move this back to one line that kind of annoys me. This is one of the
methods that, uh, that exist in the cart service that we just copied from the
templates directory to feel a cart service here, I'll search for `cartTotalItems` very
simply just goes through the items and it counts up all of them using the quantity.
So it's a simple helper to get the number. The point is in product showed up view. We
go back down here. We can call, `getCartTotalItems()` and we can pass it `this.cart`. And
since this returns a number, I'm actually call `.toString()` on this.

Beautiful. Yeah, That is not the most hipster code I've Ever written, but it, 
but it will work.

And of course, if I were doing this in multiple places in my code, I would definitely
isolate this into its own JavaScript module so that I'm not repeating myself. We move
our I'll refresh so that that new ID gets on there. And let's see, let's add three
more green ones. Watch that header. Boom. That is so much nicer. So next let's create
a shopping cart page.

