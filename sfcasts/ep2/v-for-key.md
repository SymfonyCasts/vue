# Inventing a Proper v-for :key

Our cart items are kind of weird... but it's not our fault! We fetch the `cart`
via AJAX... but each item does *not* have a unique ID. Because of this, when
we loop over the items in `index.vue`, we have to use the array index as the key.

## Why do we care about :key Again?

In a more perfect, sunnier world with rainbows, the key would be something that's
unique *and* will always be the *same* for each item. The array index *is* unique,
but if we re-ordered the items inside the `cart` data, suddenly each would render
with a *different* key than it had before.

What's the problem with that? Well... there may be *no* problem! But in certain
situations, this could could cause some rows to re-render incorrectly. And... that's
really the whole point of the key prop! To help Vue keep track of which component -
or HTML element - is associated with each *item* in the array.

## Creating a New, Unqiue :key

So let's improve this! How? By adding a unique key ourselves to each item! Really,
if you combine an item's product and color, *that* forms a unique key. It *is*
valid to have the same product in the cart twice, with different colors.

In `shopping-cart.vue`, find the `completeCart` computed property. We have a *lot*
of power here to add *anything* we want to each item, like an id!

Change the function to use multiple lines instead of the super short format with
the implied return statement: we need a bit more space to work. This is now equivalent
to what we had before... except that ESLint is mad because it *wants* me to use the
short format since we *only* have a `return` statement.

[[[ code('91730a3b32') ]]]

Add a *new* statement: `const product =` set to the `products.find()` line. Then...
use that below: `product: product`. Or, even better, shorten it to `product`:

[[[ code('569a6ff3a8') ]]]

Repeat this for color: `const color =`, copy the `find()` line, replace it with `color`,
and paste that above:

[[[ code('e4c575dd96') ]]]

Cool! Except... for the duplicate `product` and `color` variables. In the callback,
change the name to `productItem`... and also `colorItem`.

[[[ code('8423d6a8f0') ]]]

So far, this is the same... just written with extra lines. But *now* we can
say: `id:`, use fancy "ticks", then `${cartItem.product}`.

The `cartItem` variable comes from the *original* AJAX data, which means the
`product` property is an IRI string. Add an underscore and do the same for color:
`${}` then if `cartItem.color`, print `cartItem.color` else the string `none`...
or an empty string: whatever you want.

[[[ code('d2d0cb771c') ]]]

Nice! Let's go use this in `index.vue`: use the simpler syntax - `item in items` -
then set `:key` to `id`.

[[[ code('7e3622bcc8') ]]]

I love it! When we check the browser... it looks exactly the same. In the Vue dev
tools, down below `ShoppingCartList`, we can see the `key` used for each item.

## Rendering More Cart Stuff!

Ok, enough of that! *I* want to fill in this page with more stuff! In `index.vue`,
I'll paste in some HTML. This creates a, sort of, "table" structure for the items
with quantity & price columns. Move the `v-for` into the middle of this. So, we have
a row of headers, each cart-item is *also* a row, and then there are columns for
each bit of data.

[[[ code('f285177eaa') ]]]

And... *now* the page is taking shape! For the price, we need to total up the price
and quantity of each item. Hey! That's a *textbook* case for a computed prop!

Back in the component, add a computed key with one method called `totalPrice`. This
is boring... "math" stuff, so I'll paste in the logic. At the bottom, return
`formatPrice(total)`.

[[[ code('67f023181a') ]]]

Head to the top to import that function: `import formatPrice` from
`@/helpers/format-price`.

[[[ code('8cd4fa4c56') ]]]

Ok! Now that we have a `totalPrice` computed prop, we can use it in the template:
`{{ totalPrice }}`.

[[[ code('aed0ac28d8') ]]]

Let's check it. Nice! We can't see the price of each *item* yet... or the quantity...
but this total is *probably* correct.

Oh, and if you want to make your code more hipster... and probably less readable
to most people... you can refactor the computed prop to use the `reduce()` function:

[[[ code('e854cb76b3') ]]]

Go go gadget fast typing! Dan Abramov - one of the maintainers of React -
[would be impressed](https://twitter.com/dan_abramov/status/1338253118199508992)...
or not. On a serious note, do whatever looks most *clear* to you. In a real project,
I'd probably stick with the boring, but readable `forEach`.

Next: let's finish each item row: we need to render the product color, quantity
input, price & a remove button. The quantity input will be especially interesting
because we're going to *accidentally*... fall into a trap! Ah!
