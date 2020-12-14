# No Data Duplication! Fancy Computed Prop

This cool new `completeItems` array combines data from *two* AJAX calls:
one for the `cart` and another for the products that are in that cart. If we can
make this available to our template, we could loop over it and start printing
out some *real* product.

So... how can we do that! Easy! Create a new `completeItems` data, set it here,
then reference it in the template! We're unstoppable!

## Be Careful with Duplicate Data

But... there's a problem with that approach, and I bet some of you see it too.
What is it? Duplicaated data.

If we set this `completeItems` onto data, then some of the basic cart items data -
their product IRI, color IRI and quantity - would be *duplicated* in two places.
They would be reflected in the `completeItems`... but they would *also* be on the
`cart` data itself.

And we *never* want to store a piece of data in multiple places. Because, if we
later *changed* a piece of data - like the `quantity` of an item - it would change
in *one* spot... but not the other... unless we added extra code to keep them
in sync. Yuck. It's really no different than a database: you typically don't want
to store a piece of data in multiple places because they could get out of sync.

## Computed Prop to the Rescue

So let's be smarter. Think about it: the only *new* piece of data we have is the
`products` data that we get back from the AJAX call. If we stored *that* as data...
we could still access this nice `completeItems` array in the template via a
computed property.

Let's do it! Start by adding a `data` key, which is a function, then returning
an object with `products` initialized to `null`.

Down below in the watcher function, instead of `const products`, say `this.products`...
and reference `this.products` below inside the loop.

Next, add a `computed` key with one new computed prop inside. Call it `completeCart()`.

Before we do *anything* else in this function, if someone calls us and the `cart`
data is not ready yet, we should *also* return null. So if `!this.cart`... *or*
of `!this.products` - if we *also* haven't finished loading the products - then
return `null`. So if `completeCart` returns null, it means that things are not
done loading yet.

Now, copy all this `completeItems` stuff from `watch`, move it here, but instead
of logging, return a new object. We'll make this look *just* like the cart: with
an `items` key set to `completeItems`.

That should do it. If we've done everything correctly, after the `cart` data has
initially loaded the watcher will call our function, we will then make an AJAX
request for the `products`, and then finally, in our template, we will reference
this `completeCart` variable, which will combine all that data once it's available.
Remember: one of the magic things about computed properties is that it Vue will
automatically re-render and re-call the function whenever any pieces of data that
it *references* - like `this.cart` or `this.products` - changes.

## Rendering Complete Cart Data

So let's go to our template. We basically want to update everything from `cart`
to `completeCart`. Copy that, use it on the `v-if` and inside the `v-for`.

Then, since `cartItem.product` will now be an *object*, we can *prove* everything
works by printing `cartItem.product.name`. Oh, and I'll change one more spot to
`completeCart`.

Testing time! Back at the browser... ha! I didn't even need to refresh: it's
already printing the product name! I know, it doesn't look that impressive yet,
but we just put together a lot of data.

Check out the Vue dev tools for this component: `cart` data, `product` data and
a beautiful `completeCart` computed prop that allows us to easily use the data
we need in the template without duplicating anything.

Next: we're still missing one piece of data inside `completeCart`: the color.
This is still a color IRI string... but what we need is the color *data*, which
will include the hex color so that we can render a color box on the screen. Let
fix that *and* learn a cool trick for making AJAX requests in parallel.
