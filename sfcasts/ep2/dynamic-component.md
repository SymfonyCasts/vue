# The Dynamic Component

Our top level component - `products.vue`-  can now read the `currentProductId`,
which will either be set if we're on a product page or will be null if we're on
the page that lists products, which is known as the "catalog" in our code.

So here's the plan: I want both the product show and the catalog pages to use the
same sidebar - this list of categories. But each will render something different
for the central content part. The catalog will render the `catalog` component
and the product show page will render something different... like a *new* component
that we'll create now.

## Bootstrapping the Product Show Component

Inside `assets/components/`, create a new file called `product-show.vue`. Inside,
add the template - with just a `div` and some text to start.

Next, add the `script` tag with `export default` an object with just `name`
set to `ProductShow`.

Before we worry about rendering `catalog` *or* `product-show`, let's first
see if we can render both. Start with
`import ProductShow from '@/components/products-show'`. Then, under `components`,
make that available with `ProductShow`. Finally, in the template, say
`<product-show/>`.

Easy enough! When we check the browser, it's already there. Awesome!

## Conditionally Rendering Components

But of course, we don't want to render *both* components, we want to render
*either* `product-show` *or* `catalog` based on the `currentProductId`. How can
we do that?

Well, one easy option is to use `v-if` on each component, like
`v-if="currentProductId"` so that it only renders if `currentProductId` is set.
We would do the opposite for `catalog`.

That is a *fine* option, really, a *great* option! But, since we already know how
to use `v-if`, I want to show you another way to do this. It's really the same
behind the scenes, but this *other* way is *even* nicer if you need to toggle
between more than two components. It's called a *dynamic* component. Oooo.

To use it, we first need to calculate *which* component should be rendered. Let's
add a computed property to do this - call it `currentComponent()`. Inside, use
the ternary syntax: if `currentProductId` does not equal `null`, then we want
to render `ProductShow`. Yep, we're referencing the component variable that we
imported. Else, we want to render `Catalog`.

How can we *use* this in the template to render whatever it returns? By
leveraging a special component called... well actually it's called literally...
`<component>`! Clear out the product stuff and change `catalog` to `component`.
This special tag can render *any* component. You tell it *what* to render via a
special `is` prop. Say `:is="currentComponent"`.

That's it! Test drive time! Back at the browser, let's click "All Products" and...
yea! That works! It renders the `catalog` component. Clicking on any category
renders the same... but clicking on a product renders `product-show`.

## Passing Props to Dynamic Component

So far, this component... isn't very interesting and we're not even passing
any props to it. But obviously, it will need to know the `currentProductId`
so that we can eventually make an AJAX call for the full product data. Let's add
that prop: `props`, call it `productId`, and this will be `type: String`
because it's an IRI string. Also add `required: true`.

Over in `products.vue`, hmm. It's a little weird: this component will either
render the `catalog` component or the `product-show`... and those both need
*different* props. These two props are for `Catalog`. For now, I guess let's just
pass all the possible props needed. Add `:product-id="currentProductId"`.

Oh, and back in `product-show.vue`, to see if this is working, change the text
in the template to render the `productId` prop.

Over at our browser... yea! It already works!

But... it *is* weird that - no matter which component we're rendering - we're
always passing *extra* props: the first two are needed only for `catalog` and
the last only for `product-show`. Is that ok? Ah... not really.

Other than being messy, by default, extra props show up as *attributes*. We can
see this in the DOM: this `div` has an extra `category` attribute set to a bunch
of weird `[object]` things. I... don't love that.

## Binding Dynamic Props

No problem. Create another computed property. This time call it `currentProps()`.
Like `currentComponent`, this will return *only* the props needed for the
*current* situation. Use the ternary syntax again: if
`this.currentComponent` equals `ProductShow`, we'll return one set of props, else,
we'll return a different set. The first situation needs `productId` set to
`this.currentProductId`. And then second needs... I think `currentCategoryId`. Let
me check... Yep! It needs `currentCategoryId` and `categories`. Oh, but while we
use these kebab-case attributes in the template, we'll use camel case down in
the computed prop: Vue takes care of normalizing all of that.

So: `currentCategoryId` set to `this.currentCategoryId` and `categories` set to
`this.categories`.

Perfecto! But now... how do we use this? Usually we pass props to a component using
`v-bind` - like `v-bind:categories`... or just `:categories`, for short. That
allows us to pass in *one* prop. But this time, we want to bind a *bunch* of
props all at once. How can we do that?

The answer is with `v-bind` set to an *object*. So `v-bind=""` - but no `:prop-name` -
then `currentProps`.

Let's try it! I'll move over and refresh manually just to be safe. And... it
works! No errors, no extra weird attributes and every page seems to be *not*
exploding.

Ok: this is a good situation! We have two separate pages and a blank slate
*waiting* for us to fill in the product details... once we get that data via
AJAX. That's next.
