# Add to Cart Controls Component

The marketing department wants us to add a "featured product" to the cart sidebar
*with* the ability to add that item to the cart right from this page.

Let's go look at the product show page for our trusty inflatable sofa. The most
complex part of this page - by far - is the "add to cart controls": the quantity
box, color selector, button *and* all the functionality related to those. I'd
*really* like to *reuse* all of this for the featured product sidebar.

And so, this is a *perfect* opportunity to isolate this chunk of HTML and
functionality into a beautiful re-usable component.

## Refactoring to a product-show/ Directory

Start inside the `assets/components/` directory: create a new folder called
`product-show/` for organization. Then move the `product-show.vue` component
*into* that directory but rename it to `index.vue` so that our existing import
statements all still work. But... this change *does* confuse Webpack: it doesn't
realize that it should *stop* looking for `product-show.vue` and *start* looking
for `product-show/index.vue`.

Ht Control+C on the Encore to stop it, and then restart it:

```terminal-silent
yarn dev-server
```

Perfect!

## Creating the Component

Inside `product-show`, create the new file. Let's call it `cart-add-controls.vue`.
Poetry. Start like we always do: add the template and the `script` with
`export default` and a `name` key to start. How about `ProductCartAddControls`.

For the template... let me first close a few old files so we can focus. Much better!
Open `index.vue` file: the component for the product show page. Up in the template,
copy the entire div that surrounds all of these controls and replace it with a
nice TODO.

Paste this into the new component. And... let's see: this uses the `color-selector`
component, so we need to import that. Copy the import from the old file, delete
it and delete it from `components`. We can also remove this old, unused import.

Back in the new component, paste the import, add a `components` key and put
`ColorSelector` inside.

Perfect! Back up in the template, let's see what else we need. Ah yes! The original
component had some styling for an `input` element - this was for the quantity
input. Copy that and delete it. In the new component, at the bottom. add the usual
`<style lang="css" module>`.

Let's create a `.component` class with the `:global` pseudo-selector, though
that's not important yet: it would just help remove excessive modular class prefixes
if we added nested class CSS later. Paste the `input` styling inside.

Finally, for this to work, we need to add that `component` class to the top level
element. Refactor to use `:class`, set it to an array and surround the existing
classes with quotes. Whoops! I forgot to separate `d-flex` and `align-items-center`.
That won't cause any issues... but make sure to separate them in your app. Now
add `$style.component`.

## Adding & Organizing the Props

Ok! *Now* we're ready to get to the interesting stuff. Normally, if you want to
make some code reusable in PHP or JavaScript, you isolate it into a function.
Then, you usually need to add some arguments so that whoever *calls* or function
can pass information we need and control our behavior.

The same is true when we create a reusable Vue component, except that instead of
adding function arguments, we add component *props*.

When I look at the template, I can see three props that we need to pass: the
`product` these controls are for and also `addToCartLoading` and `addToCartSuccess`
because *this* component will not be responsible for actually *saving* the new
item to the cart. And so, it needs to be *passed* these props to know if the cart
save is currently loading or if it just finished successfully.

Scroll down to the component, add `props` and I'm going to paste those 3 props:
`product` is an object, the other two are booleans and all are required.

Back up in the template, PhpStorm is a *bit* happier thanks to those new props,
but there *are* still a few other undefined things that we're referencing.

One of them is `cart`. We use this in exactly *one* spot to figure out if the
button should be disabled because the cart is still loading. So we *could* also
add a `cart` prop... it would be our way of saying:

> Hey! You need to pass the `cart` to us so we configure out whether or not the
> the button should be disabled!

But... do we really *need* the entire cart object? Nope: we just need to know
whether or not the user should be allowed to add the item to the cart or not.
So instead of forcing the *entire* `cart` object to be passed as a prop, let's
add a simpler one. Copy `addToCartLoading`, paste and call this one
`allowAddToCart`.

Now, on the button, it should be disable if *not* `allowAddToCart`.

Awesome! Another way to explain *why* I'm using an `allowAddToCart` prop instead
of a prop for the entire `cart` is that I want my component to be as *dumb* as
possible. The dumber it is, the more control we have over it. Each time we
use this component, *we* can control whether the button is disabled *however*
we want.

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
component, add the `data` function and *return* these two keys.

## Using the new Component

Alright! Our template is *still* referencing some undefined methods... but I think
we should at *least* get this to render.

Back in `index.vue`, let's import this puppy:
import `CartAddControls from` and I'll be lazy and just use `./cart-add-controls`
because they live in the same directory. Add this to `components`...

Then head up to the template: `<cart-add-controls`. Pass this the props it needs:
`:product` set to `product` and then `allowAddToCart`. This should be true *if*
the `cart` is done loading.

As a reminder, this component uses the `get-shopping-cart` mixin, which means it
has a data called `cart`. We can use that here: `allowAddToCart` if
`cart !== null`.

Next add `:add-to-cart-loading` set to the `addToCartLoading` data - which also
comes from the mixin - and `:add-to-cart-success` set to `addToCartSuccess`.

Done! Let's try it out! Move over to the browser and... yes! It renders!
Well it *does* render, but Vue is *totally* mad because our template references
some undefined methods. Let's fix those!

## Moving the Method

The first is `updateSelectedColor`. Go into the original component and find this
method. This updates `this.selectedColorId`... which no longer *lives* in this
component anyways. Copy this, delete it, go to `cart-add-controls`, scroll down,
add a new `methods` section and paste.

Thanks to this, when the `color-selector` component emits its `color-selected`
event, we call this method and *it* updates the `selectedColorId` data.

## Emitting an Event

The last undefined method we're referencing is `addToCart()`, which *also* lives
in the parent `index.vue` component. This one is a bit more complex. We can't
just copy the method and move it... because it calls `this.addProductToCart()`.
If I hold Command or Ctrl and click that method, *it* comes from the mixin.

And, more importantly, adding an item to the cart *modifies* the `cart` data...
and so that logic needs to happen *inside* the component that holds that data,
which is `index.vue`.

In other words, this is another *classic* situation where we need to do emit an
event from a child component so that its parent component can *listen* to it
and update some data.

And... that's actually awesome! Emitting an event from a component is a *great*
way to make that component generic and reusable. Anyone using this component will
be able to do *whatever* logic they want when the "add to cart" button is pressed.

Down in methods, add `addToCart()`. But now, instead of modifying some data, say
`this.$emit()` to emit an `add-to-cart` event. Pass this the two things that our
component needs to communicate: `quantity` set to `this.quantity` and
`selectedColorId` set to `this.selectedColorID`.

Finally, back in `index.vue`, when we include `cart-add-controls`, we can listen
to this: `@add-to-cart=` and then call that `addToCart()` method we already have...
we'll just need to tweak that slightly.

Head down to find that. This will *now* receive the `event` object that we're
sending to the `add-to-cart` event, with `quantity` and `selectedColorId`.
Instead of adding an `event` argument and reading those keys off of it, let's
put our fancy hat on and use object destructuring: `{}` then `quantity` and
`selectedColorId`. Then, remove the `this` from both of those variables below.

Phew! We moved a lot of things around to get this working... but now we have a
*super* nice component that receives the props it needs, manages the data it
needs and emits an event when it needs to.

So let's try it! Move over and do a full refresh just in case. We have 12 items
in the cart right now. Add 3 blue couches and... yea! The loading animation is
right, the check box shows and the cart header updated! And if we go to the cart
page, it's *there*.

Next: let's leverage our hard work to add the featured product sidebar.
