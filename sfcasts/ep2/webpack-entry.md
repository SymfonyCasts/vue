# New Page, New Webpack Entry

Yay! Our customers can now add these top-quality products to their cart. *Now*
we need a way for them to check out. Here's the plan: we're going to create a
*brand new* page that holds a, sort of, "shopping cart" / "checkout" combo.

To build this page, if we want, we could build it *entirely* on the server-side
with Twig. That's a great option if we don't need the power Vue... which we definitely
do *not* always need. But... you know, because this *is* a Vue tutorial, I think
we should use Vue.

## New Page Controller & Template

The first step to creating a page is... *exactly* the same no matter if it will
use Vue or not: to create a route, controller and template. And... I've done that
work for us! Open `src/Controller/CartController.php`. This `shoppingCart()` action
will be called when we go to `/cart` and it renders a template:
`templates/cart/cart.html.twig`... which holds a giant TODO.

The name of the route for this page is `app_cart`. So, as a *first* step, let's
link to this from the shopping cart total at the top of the page. Open
`templates/base.html.twig`. And... set the cart link `href=""` to
`{{ path('app_cart') }}`.

Go back to the browser... refresh and click the shopping cart. Hello big, gigantic
`<h1>` tag!

## Adding to our Smart Component vs New Webpack Entry

Ok! Let's create the new Vue component for this page! But... wait... because
we have two options to choose from. First, we *could* make the `products.vue`
component *even* smarter and give it the ability to render one of *three* different
components. Remember: this dynamic `component` is already capable of rendering
the `catalog` component or `product-show` component based on what page we're on.
We could, pretty easily, make this able to render a new `cart` component if we're
on the cart page.

A second option is to create a totally new Webpack entry that renders the new
component. The benefit of this approach is that it split the final JavaScript into
two different files. If the user goes to the catalog or product page, they would
download *one* JavaScript file containing the code for *those* two pages, but
*not* the code for the cart component. They would only download *that* code once
they actually *went* to that page.

This is *not* the only way to split and optimize your code... and you should beware
of premature optimizations, but this *is* something to keep in mind.

Anyways, for our new cart page, I'm going to create a totally separate Webpack
entry file... in part so we can see how that approach looks.

## Creating the new Entry

In `assets/pages/` directory - because that's where we're putting components that
render the entire "main" part of the page - create a new file called
`shopping-cart.vue`. I'll paste in some content, which is pretty boring right now:
a basic layout, a component that's empty and a little CSS.

Next, we need a new pure JavaScript "entry file" that will *render* this component.
For the catalog and product show page, the entry file is `assets/products.js`.
On a high level, the purpose of an entry file is to execute *all* of the JavaScript
code needed for the page or pages where it's used. Since our entire page is being
rendered in Vue... its only job is rendering that component!

Copy `products.js` to create our new `shopping-cart.js` entry file. Inside, the
only difference is that we want to render the `shopping-cart` component.

Finally, we need to tell Encore about the new entry file. Open `webpack.config.js`,
scroll down to `addEntry()`, copy the one for products and change this to
`shopping-cart` and `shopping-cart`.

Because we just updated `webpack.config.js` file, this is a *rare* instance where
we need to restart Encore. Find your terminal, go to the tab that's running
Encore, stop it with Control + C and re-start it:

```terminal
yarn dev-server
```

Perfecto! The result is that Encore is now outputting new `shopping-cart` JS
and CSS files that we can include on the page. And *that* means, we're ready
to include those no the page.

Go back to `cart.html.twig`. This will look a *lot* like the template that renders
the `products` vue app: `product/index.html.twig`. Let's copy the contents of this
file, close it, and paste into `cart.html.twig`.

Okay... let's see: this has a `<div id="app">` - which is perfect because, in our
`shopping-cart.js` entry file, we're rendering *into* that element.

All we need to do is change the entry name to `shopping-cart` in both the
`stylesheets` section and, at the bottom for the JavaScript file. And so far, we
don't need any global variables... so I'll delete all of those. Remember: our
new Vue component is, so far, completely empty.

That's... about as simple of a template as you can get! Let's try it! Find your
browser, refresh and... tada! There's our Vue application. I'll even reopen my
Vue dev tools... to see the component. Good start!

Next: one of the things that this component has in common with the `product-show`
component is that both need access to the shopping cart.... and both will need the
ability to add items to the cart... because we're going to allow people to change
the quantity of the items from this page. In fact, there are going to be a
*bunch* of things that these two pages need to share. To tackle this, let's talk
about mixins, which are Vue 2's way of sharing code between components. In Vue 3,
mixins are replaced by the composition API. But both mixins and composition
share the same fundamental goal and philosophy.
