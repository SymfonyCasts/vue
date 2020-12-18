# Inventing a Proper v-for :key

Our cart items are kind of weird... but it's not our fault! We fetch the `cart`
via AJAX... but each item does *not* have a unique ID on it. Because of this, when
we loop over the items in `index.vue`, we have to use the array index as the key.

## Why do we care about :key Again?

In a more perfect, sunnier world with rainbows, the key would be something that's
unique *and* will always be the *same* for each item. The array index *is* unique,
but if we re-ordered the items inside the `cart`, suddenly each would render with
 a *different* key than it had before.

hat's the problem with that? Well... there may be *no* problem. But under certain
situations, this could could cause some rows to re-render incorrectly. And... that's
really the whole point of the key prop! To help Vue keep track of which component -
or HTML element - is associated with each *item* in the array.

## Creating a New, Unqiue :key

So let's improve this! How? By adding a unique key ourselves to each item! Really,
if you combine an item's product and color, *that* forms a unique key. It *is*
valid to have the same product in the cart twice, with different colors.

In `shopping-cart.vue`, find the `completeCart` computed property. We have a *lot*
of power here to add any data we want to each item, like an id!

Change the function to use multiple lines instead of the super short format with
the implied return statement: we need a bit more room. This is now equivalent to
what we had before... except that ESLint is mad because it *wants* me to use the
short format since we *only* have a `return` statement.

Add a `const product =` set to the `products.find()` line... then use that below:
`product: product`. Or, even better, shorten it to `product`. Do the same thing
for color: `const color =`, copy the `find()` line, replace it with `color`,
and paste that above.

Cool! Except... for the duplicate `product` and `color` variables. In the callback,
change it to `productItem`... and also `colorItem`.

So far, this is the same... just written with a few extra lines. But *now* we can
say: `id:`, use fancy "ticks", then `${cartItem.product}`.

The `cartItem` variable is here from the *original* AJAX data, which is equal to
the IRI string. Add an underscore, then the same for color: `${}` then if
`cartItem.color`, print `cartItem.color` else the string `none`... or an empty
string - whatever you want.

Nice! Let's go use this in `index.vue`: use the simpler syntax - `item in items`
then set `:key` to `id`.

I love it! When we check the browser... it looks exactly the same. In the Vue dev
tools, down below `ShoppingCartList`, we can see the `key` used for each item.

## Rendering More Cart Stuff!

Enough of that! I want to fill in this page with more stuff! In `index.vue`, I'll
paste in some HTML. This creates a, sort of, "table" structure for the items with
quantity & price columns. Move the `v-for` into the middle of this. So, we have
a row of headers, each cart-item is *also* a row, and then there are also columns
for each bit of data.

And... *now* the page is taking shape! For the price, we need to total up the price
and quantity of each item. Hey! That's a *textbook* opportunity for a computed
prop!

Back in the component, add a computed key with one method called `totalPrice`. This
is boring... "math" stuff, so I'll paste I some logic. This loops over each item,
adding *its* total to the `total` variable. At the bottom, return
`formatPrice(total)`.

Head to the top to import that function: `import formatPrice` from
`@/helpers/format-price`.

Ok! Now that we have a `totalPrice` computed prop, we can use in the template:
`{{ totalPrice }}`.

Go check it out. Nice! We can't see the price of each item yet... but I'll
"guess" that this is correct.

Oh, but if you want to make your code more hipster... and probably less readable
to most people, you can refactor the computed prop to use the `reduce()` function.
Go go gadget fast typing! Dan Abramov - one of the maintainers of React -
[would be impressed](https://twitter.com/dan_abramov/status/1338253118199508992) :p.
But on a serious note, do whatever looks most *clear* to you. In a real project,
I'd probably stick with the boring `forEach`.

But, in the brower, *both* work.

Next: let's finish each item row: we need to render the product color, quantity
input price & a remove button. The quantity input will be especially interesting
because we're going to *accidentally* fall into a trap!
