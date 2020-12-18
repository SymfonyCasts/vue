# Cart Structure

We now have *all* the cart data we need to *properly* render the products. For
each item, we're going to print out *quite* a few details, including price,
quantity box and a "remove from cart" button. To keep things organized, let's
create a new component that will render each item.

In the `assets/components/` directory, create a new folder called `shopping-cart`.
This time, to create the component, I'll do something a bit different: right click
on `shopping-cart`, search for "Vue" and select "Vue component". Call it `cart-item`.

## Creating the cart-item Component

Ok! This generates a basic Vue structure... though it *does* look a bit different
than how we normally do things. PhpStorm *does* let you customize these templates,
if you want to improve this.

Let's clean things up. Start by adding a div with a `class` attribute. But make
it dynamic with `:class` set to an array so that we can reference a modular
class - `$style.component` - but also give it a `row` class and extra padding.
We'll add the `component` style in a minute.

Next, in the component itself, give it a better name, like `ShoppingCartItem`. Then,
because this will render an *individual* cart item, allow that object to be passed
to us by adding a `props` key with `item` inside. This will be an object and
`required: true`.

What we're going to pass into this component will be the "complete cart item",
the thing that we're looping over inside of `shopping-cart`. We know that this
has `product`, `color` and `quantity` properties.

In the new template, start by printing `item.product.name`.

Finally, at the bottom, instead of scoped styles, we're using module styles and
`lang="scss"`. I'll paste in some basic styles that give each item a bottom border.

## Creating the Cart "list" Component

Awesome! We *could* use this new component directly inside of `shopping-cart.vue`:
we would `v-for` over this component.

And, that would be fine. But I'm going to create *another* component that's between
`shopping-cart` and `cart-item`: it's job will be to render the entire "cart list",
including the "your cart is empty message". You don't *have* to do this... but
because the `shopping-cart` component is going to get more and more complex - including
eventually rendering a checkout form - this will help keep things organized.

In the `shopping-cart/` directory, create a new `index.vue`. I'll paste in a basic
template. This receives an `items` array and it already has a `v-if` to show the
"you cart is empty" message if there are no items.

All *we* need to do is loop *over* those items and render `cart-item`.

Start by importing that component: `import ShoppingCartItem` from
`@/components/shopping-cart/cart-item`. Then add a `components` key and pop that
inside.

Up in the template, we can use the `v-for` *directly* on that component:
`<shopping-cart-item` then `v-for=` with the long syntax: `(item, index) in items`.
The reason we're doing *that* is each item in the cart does *not* have a unique
key yet. So, temporarily, we will say `:key=index`. That's not ideal, but we'll
improve it soon. Finally, pass the required prop: `:item="item"`

Ok! This component is ready! LEt's use it in the `shopping-cart`. Import it:
`import ShoppingCartList` from `@/components/shopping-cart`, add that to the
`components` option and... now we can simplify a *lot*. Remove this entire div and
replace it with `<shopping-cart-list`. Oh, but we need to be careful: the
`completeCart` variable is *not* available until after some AJAX calls. So add
`v-if="completeCart"` and *then* pass in the prop: `:items=completeCart.items`.

Time to try this thing out! Find your browser and... got it! It doesn't look like
much yet, but we have a flexible component structure we can use to add more features,
while managing complexity.

But before we get there, in `index.vue`, it *does* bother me that we're still using
the `index` from the array as the `key` in `v-for`. This... "might" be ok... but it
could cause rendering problems when updating items in the list. Next: let's fix
that and then render more stuff for each cart item.
