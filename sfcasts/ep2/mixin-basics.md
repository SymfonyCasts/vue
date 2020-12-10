# Sharing Vue-ish Logic: Mixin Basics

We've talked quite a bit about code re-use in Vue. And there are few types we know
about. For data related stuff, like Ajax calls, we have a nice `services/` directory
full of modules that return functions. For other logic, like formatting a price,
we have a `helpers/` directory. And most importantly, to isolate chunks of markup
and the behavior for that markup, we can create components. One of the nicest
examples we have is `color-selector`: it's some markup along with behavior that
let's us choose a color & emits an event.

But there's *another* type of functionality that you sometimes need to share. It's,
sort of, Vue-related behavior that is *not* specific to any one component and markup.

## Why Mixins?

Consider the product page inside of `components/product-show.vue`. This makes an
AJAX call for the cart down in `created`, and allows us to add an item to the
cart with a few extra benefits: like tracking if it's still saving and when it's
successful. It even updates the header with the new cart item count!

Well... it turns out that our new shopping cart page will *also* need to make an
AJAX call for the `cart` data... and it will *also* need the ability to add an item
to the cart. Well, not exactly. We're going to allow users to change the quantity
of each item, which is similar to adding an item. In both cases, we may want to
show a little loading animation when it's saving and update the header when it's
done.

The point: these two components need to share a bunch of behavior, like the logic
in `addToCart` and even pieces of `data`... but with *totally* different HTML. That
means we *can't* just isolate this stuff into its own component.

What's the solution? Say hello to mixins. Very simply mixins allow us to extract
parts of a Vue components - like `data`, `methods` or even things like a `created`
function - into something that can be reused by many components. In Vue 3, mixins
still exist, but are replaced by the composition API - something we'll talk about
in a future tutorial. But fundamentally, both mixins and composition do the same
thing, just with a slightly different mechanism.

## Bootstrapping the Mixing

Let's start really simple: with a mixin that holds a `cart` data and fetches that
via AJAX in a `created` function. In `assets/`, create a new directory called
`mixins/` and, inside, a new file called `get-shopping-cart.js`... because that's
kind of the point of this file: to get the shopping cart data.

Mixins mostly look... just like a component! We `export default` an object. And
inside, we can have most of the same keys as a component. Start with a `data` key
holding `cart` set to null.

Next, back in the component, copy the `created` function, paste it into the mixin...
then delete the part that fetches the product.

Ok, that's enough to start! Oh, but now that this is the only AJAX call in `created`,
we can simplify with await: `this.cart = await fetchCart()`.

Cool! Say hello to our simple mixin! We can now use this inside any component and
that component will magically have a `cart` data and a `created` function as *if*
this code were *literally* written inside that component.

## Using a Mixin

So... let's go use this! In `product-show.vue`, find the `import` section and
import the mixin like any normal variable:
`import ShoppingCartMixin from '@/mixins/get-shopping-cart'`. Then, after the
`components` option, add a special new key: `mixins`. This is simple: set it to
an array with `ShoppingCartMixin` inside.

Thanks to this, we do *not* need the `cart` data anymore. It will *already*
exist thanks to the mixin. By the way, as *powerful* as mixins are, this is one
of its biggest downsides: for our human brains... and also for my editor, it's not
super clear that there *is* a `cart` data or where it's coming from. Mixins are
truly Vue magic.

We also don't need the `fetchCart` logic down in `created`. *Both* the `created`
function from our component *and* the mixin will be called. I'll even remove the
extra import on top to keep things clean.

Ok! With any luck, this will work *exactly* like before. Let's try it! Go
back to the homepage, click into a product and... let's add 3 more of these to
our cart. Watch that 12 in the header... and hit "Add to Cart". Got it!

Next, there is a lot more cart functionality that we can move into the mixin, like
the logic to add an item to the cart - including the loading state - and updating
the cart header. That will make this a *truly* valuable mixin when we build the
shopping cart page.
