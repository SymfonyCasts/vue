# Featured Sidebar

Here's our mission: to render a featured product on the cart sidebar with
fully-functional "add to cart" controls. OoooOoOo.

Start by going to the `asset/services/` directory and opening `products-service.js`.
This file was included in the starting code for the tutorial and it already has
a function called `fetchFeaturedProducts`. This returns a `Promise` that *resolves*
to an Axios response that contains an array of products that our API says should
be "featured". Phew!

[[[ code('858ef1ffd6') ]]]

Now go into `shopping-cart.vue`: the component that renders the entire cart page.
Here's what I'm thinking: when this component is created, we make an AJAX request
to fetch the featured products. We'll then find the *first* featured product in
that collection, set it onto a new piece of data on this component and render
it up here in the sidebar.

Let's do it!

## Fetching the Featured Products

Start by adding the new piece of data: `featuredProduct` set to null.

[[[ code('60fc1a7ffe') ]]]

To make the AJAX request, let's create a method and then *call* that method
from `created`. How about: `loadFeaturedProducts`. Inside, say
`const featuredProducts =` and execute that `fetchFeaturedProducts()` function
we just saw. Make sure to auto-complete this so PhpStorm adds the import on top.

`fetchFeaturedProducts` returns a `Promise` whose data resolves to a response.
So what we *really* want to do here is say `await` and then this will be an Axios
response. Put that in parentheses... including around the `await`... then grab
the `data` key from the response... and `hydra:member` from the data. That's the
field on the JSON that *actually* holds the collection of products. Oh, and we,
of course, *now* need to make the method `async`.

[[[ code('95f9c865d4') ]]]

After this, because we only need a *single* featured product, I'll do a little sanity
check: if `featureProducts.length === 0`, just return. We're not going to code
too much for this case. Finish this with `this.featuredProduct =`
`featuredProducts[0]`.

[[[ code('04d4c5b26e') ]]]

Sweet! Wait... why is ESLint mad? Ah, it wants me to be cooler than I am and
use array destructuring. Ok then! Put `this.featuredProducts` in an array and
set that to `featuredProducts`.

[[[ code('b1dd02df87') ]]]

That will accomplish the same thing. *Now* we can copy the method name, head
up to created, and call it! Make sure you put it *above* the `this.colors`
line: we don't want our code to `await` for that to finish before fetching
the featured product. In this order, both AJAX requests will effectively start
at the same moment.

Ok! To make sure this is working, find your shiny browser, refresh and go to the Vue
Dev Tools. On Components, find `ShoppingCart`. Let's see... there! We *do* have a
`featuredProduct` data.

## The New cart-sidebar Component

The sidebar itself is going to be complex enough that I think we should put it
into its own component. If you downloaded the course code, you should have a
`tutorial/` directory with a `cart-sidebar.vue` file inside.

Copy that into `assets/components/shopping-cart/`.

[[[ code('1065ffdca2') ]]]

There's nothing fancy here: it has a `featuredProduct` required prop... and
then it renders its data! Let's use this inside `shopping-cart`. You know the
drill: go above the component and `import CardSidebar from`
`@/components/shopping-cart/cart-sidebar`. Add that to `components`...

[[[ code('b36639fa21') ]]]

... then scroll up so we can use it. Let's see: make the `aside` *not* be
self-closing... then put `<cart-sidebar` inside with a `v-if` set to `featuredProduct`.

[[[ code('21bde64d51') ]]]

I'm just coding defensively in case there is *no* feature product for some reason.
The one prop we need to pass is `:featuredProduct` set to our `featuredProduct`
data.

[[[ code('a0ae4233d8') ]]]

Awesomesauce! Move over and... there it is! The feature product is our beloved
Inflatable Sofa!

The *last* step is to make this *functional* by importing and using the
`cart-add-controls` component. Let's do that next!
