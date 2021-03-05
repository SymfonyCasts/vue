# Cart Structure

We now have *all* the cart data we need to *really* render the products! For
each item, we're going to print out *quite* a few details, like name, price,
a quantity box and a "remove from cart" button. To keep things organized, let's
make a new component whose job is to render one item.

In the `assets/components/` directory, add a new folder called `shopping-cart`.
This time, to create the component, I'll do something a bit different: right click
on `shopping-cart`, search for "Vue" and select "Vue component". Call it `cart-item`.

[[[ code('2d30f5ca14') ]]]

## Creating the cart-item Component

Ok! This generates a basic Vue structure... though it looks a bit different
than how we normally do things. PhpStorm *does* let you customize these templates,
if you want to improve this.

Let's clean things up. Start by adding a div with a `class` attribute. Actually,
make it dynamic - `:class` set to an array - so we can reference a modular
class - `$style.component` - *and* give it two other classes. We'll add the
`component` style in a minute.

[[[ code('d0bbedf711') ]]]

Next, in the component itself, give it a better name: like `ShoppingCartItem`:

[[[ code('56b2e04f85') ]]]

And because this will render an *individual* cart item, allow that object to be passed to
us as a prop. Add `props` with `item`, `type: Object` and `required: true`.

[[[ code('30a806f52f') ]]]

What we're going to pass into this component will be the "complete cart item":
the thing that we're looping over inside of `shopping-cart`. We know that this
has `product`, `color` and `quantity` properties.

In the new template, start by printing `item.product.name`.

[[[ code('2c20c42404') ]]]

Finally, at the bottom, instead of scoped styles, we're using modular styles and
`lang="scss"`. I'll paste in some basic styles to give each item a bottom border.

[[[ code('3be6293cd1') ]]]

## Creating the Cart "list" Component

Awesome! Now we *could* use this new component directly inside of `shopping-cart.vue`:
we would `v-for` over this component.

And... that would be fine! But instead, I'm going to create *another* component
that's between `shopping-cart` and `cart-item`: its job will be to render the entire
"cart list", including the "your cart is empty message". You don't *have* to do this...
but because the `shopping-cart` component is going to get more and more complex -
including eventually rendering a checkout form - I want to do this now to help
keep that component "sane".

In the `shopping-cart/` directory, create a new `index.vue`. I'll paste in a basic
template. This receives an `items` array... and already has a `v-if` to show the
"you cart is empty" message if there are no items.

[[[ code('0150cf9747') ]]]

All *we* need to do is loop *over* those items and render `cart-item`.

Start by importing that component: `import ShoppingCartItem` from
`@/components/shopping-cart/cart-item`:

[[[ code('ff61b721be') ]]]

Then add the `components` key and pop that inside:

[[[ code('46529be51f') ]]]

Up in the template, we can use the `v-for` *directly* on that component:
`<shopping-cart-item` then `v-for=` with the long syntax: `(item, index) in items`.
The reason we're doing *this* is that each item in the cart does *not* have a unique
key. So, temporarily, we will say `:key=index`. That's not ideal, but we'll
improve it soon. Finally, pass the required prop: `:item="item"`

[[[ code('1c42c6b944') ]]]

Ok! This component is ready! Let's use it in `shopping-cart`. Import it:
`import ShoppingCartList` from `@/components/shopping-cart`, add that to the
`components` option and... we get to delete a *bunch* of code! 

[[[ code('013df5fa9d') ]]]

Replace this with `<shopping-cart-list`. Oh, but we need to be careful: the
`completeCart` variable is *not* available immediately. So add
`v-if="completeCart"` and *then* pass in the prop: `:items=completeCart.items`.

[[[ code('353146aae9') ]]]

Time to try this thing! Find your browser and... we got it! It doesn't look like
much yet, but we have a flexible component structure that we can use to add more
features... without making any *one* component insanely complex.

But before we add more stuff, in `index.vue`, it *does* bother me that we're still
using the `index` from the array as the `key` in `v-for`. This... "might" be ok...
but it could cause rendering problems. Next: let's fix this and then celebrate
by adding more structure and data to the cart.
