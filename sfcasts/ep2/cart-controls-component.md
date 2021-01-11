# "Add to Cart Controls" Component

The marketing department wants us to add a "featured product" to the cart sidebar
*with* the ability to add that item to the cart right from this page.

Let's go look at the product show page for our trusty inflatable sofa. The most
complex part of this page - by far - is the "add to cart controls": the quantity
box, color selector, button *and* all the functionality related to those. I'd
*really* like to *reuse* all of this on the featured product sidebar.

And so, this is a *perfect* opportunity to isolate this chunk of HTML and
functionality into a beautiful re-usable component.

## Refactoring to a product-show/ Directory

Start inside the `assets/components/` directory: create a new folder called
`product-show/` for organization. Then move the `product-show.vue` component
*into* that directory... but rename it to `index.vue` so that our existing import
statements still work. But... this change *does* confuse Webpack: it doesn't
realize that it should *stop* looking for `product-show.vue` and *start* looking
for `product-show/index.vue`.

Ht Control+C on Encore to stop it, and then restart it:

```terminal-silent
yarn dev-server
```

Perfect!

## Creating the Component

Inside `product-show/`, create the new file. Let's call it `cart-add-controls.vue`.
Poetry. Start like we always do: add the `template` and the `script` with
`export default`... and a `name` key to start. How about `ProductCartAddControls`.

For the template... let me first close a few old files so we can focus. Much better!
Open `index.vue`: the component for the product show page. Up in the template,
copy the entire div that surrounds all of these controls and replace it with a
nice TODO.

Paste this into the new component. Let's see: this uses the `color-selector`
component, so we need to import that. Copy the import from the old file, delete
it and delete the key from `components`. We can also remove this old, unused import.

Back in the new component, paste the import, add a `components` key and put
`ColorSelector` inside.

Fixed! Back up in the template, let's see what else we need. Ah yes! The original
component had some styling for an `input` element: this was for the quantity
input. Copy that and delete it. In the new component, at the bottom, add the usual
`<style lang="scss" module>`.

Then create a `.component` class with the `:global` pseudo-selector, though
that's not important yet: it would just help remove excessive modular class prefixes
*if* we later add nested CSS classes under `.component` . Paste the `input`
styling inside.

Finally, for this to work, we need to add that `component` class to the top level
element. Refactor to use `:class`, set it to an array and surround the existing
classes with quotes. Oh, whoops! I forgot to separate `d-flex` and
`align-items-center`. That won't cause any issues... but make sure to separate
them in your app. Add `$style.component`.

## Adding & Organizing the Props

Ok! *Now* we're ready to get to the interesting stuff. Normally, if you want to
make some code reusable in PHP or JavaScript, you isolate it into a function.
Then, you usually need to add some arguments so that whoever *calls* that function
can pass information it needs and control its behavior.

The same is true when we create a reusable Vue component, except that instead of
adding function arguments, we add component *props*.

When I look at the template, I can see three props that we need to pass: the
`product` these controls are for and also `addToCartLoading` and
`addToCartSuccess`... because *this* component will not be responsible for actually
*saving* the new item to the cart. And so, it needs to be *passed* these props to
know if the cart AJAX call is currently happening or if it just finished successfully.

Scroll down to the component. Add `props`... and I'm going to paste those 3 props:
`product` is an object, the other two are booleans and all are required.

Back up in the template, PhpStorm is a *bit* happier thanks to those new props,
but we *are* still referencing a few other undefined things.

One of them is `cart`. We use this in exactly *one* spot: to figure out if the
button should be disabled because the cart is still loading. So we *could*
add a `cart` prop... it would be our way of saying:

> Hey! You need to pass the `cart` to us so we configure out whether or not the
> the button should be disabled!

But... do we really *need* the entire cart object? Nope: we just need to know
whether or not the user should be allowed to add the item to the cart.
So instead of forcing the *entire* `cart` object to be passed as a prop, let's
add a simpler prop. Copy `addToCartLoading`, paste and call this one
`allowAddToCart`.

Now, on the button, it should be disabled if *not* `allowAddToCart`.

Awesome! Another way to explain *why* I'm using an `allowAddToCart` prop instead
of a prop for the entire `cart` is that I want my component to be as *dumb* as
possible. The dumber it is, the more control we have over it. Each time we
use this component, *we* can control whether the button is disabled using
*whatever* logic we need.

## Adding Data

Ok: the template is *still* referencing one more variable: `quantity` on
`v-model`. In addition to that, the user will *also* select a color via the
`color-selector` component. When that happens, we're currently calling an
`updateSelectedColor` method, which still lives in the *old* component. Its
job was to set a `selectedColorId` data.

If you think about it: both the `quantity` and the `selectedColorId` will need
to be stored as *data* inside the new, reusable component: we need to keep track
of both values so that we have them handy when the "add to cart" button is clicked.

In `index.vue`, find `data`, copy those two keys and delete them. Back in the new
component, add the `data` function and *return* the two keys.

Alright! Our template is *still* referencing some undefined methods... but I think
we should at *least* get this to render!

Next, let's use this component from `index.vue` and finish the last pieces:
implementing the missing methods as... methods... or by emitting an event.
