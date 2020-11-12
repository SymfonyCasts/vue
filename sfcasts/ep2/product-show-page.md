# Page 2: Product Show Page

Let's build a page to *view* a single product! We'll get there by clicking on this
link... or the image or... any of this.

Now we *could* use the Vue router so that when we click any of these links,
there's no full page refresh. We'll save that for another tutorial in part, because
I want to show how Vue can be used as a mini SPA for part of your site *or* as
just one piece of traditional app.

## Linking to Another Page

This means that we will make these nice traditional links. The Vue component that
renders this lives at `assets/components/product-list/product-card.vue`. Let's
start by wrapping the image and an anchor tag. Add an `a`, a closing `a`, indend
and, for the `href`, we can use a computed property to keep things clean:
`:href=productUrl`.

Do the same thing down around the product name: `<a :href="productUrl">`. And to
be *extra*, we can use `:text` and to print the product name.

That part is *totally* unnecessary, it's just more hipster because now the anchor
can be self-closing. Oooo.

Finally, for the "View Product" button, we should really change this to a normal
anchor tag with an `href`. But to be extra complicated, let's activate it with a
click listener: `@click=""` and call a method we'll add soon: `goToProduct()`.

To be clear: I would *not* do this in a real app - it's weird to make normal
navigational links use fancy JavaScript... and it's not great for accessibility.
I'm just trying to make our life harder for the tutorial. Yay learning!

Head over to the browser and I'll open my debugging tools. Thanks to the dev
server, we don't even need to refresh: it's already panicking because the
"property or method, productUrl is not defined on the instance".

Let's add that first. In the component, we already have a `computed` section. Add
another for `productUrl`. For the `return`, use the fancy "ticks" so we can say
`/products/` then `${}` with `product.id` inside. As you'll see in a minute, I've
*already* created a route and controller for this URL.

And, yes: I *am* hardcoding that URL. You *can* generate URLs dynamically by using
FOSJsRoutingBundle, but I'm *fine* with hardcoding them: it makes life simpler.
We also talked about this in
[the first tutorial](https://symfonycasts.com/screencast/vue/categories-ajax#linking-properly).

To finish things, we need a method for the `@click` listener: `goToProduct()`.
At the bottom, add a `methods` section with `goToProduct()`. Inside we can use
`window.location =` and then `this.productUrl` to re-use our computed property.

Super nice! Let's try it! When I move back to the browser, it automatically reloaded
for me. Click any of the spots and... big error page!

## The Product Page

Before I started recording the tutorial, I created a route and controller for this.
Open `src/ControllerProductController.php`. This controller renders every page
we've seen so far: the homepage - which renders all the products - the category
page and - now - the individual *product* page. This is what's currently being
executed.

Notice that all of these pages render the same template, which is
`templates/product/index.html.twig`.

But, hold on, let's back up. We could make this "product show" page look and work
*however* we want. For example, we could decide that this is going to be a normal,
Twig-rendered HTML page: maybe we only needed Vue for our fancy product list. So,
we could render a new `product/show.html.twig` and... be done.

*Or*, if the page *is* going to be fancy and Vue would be nice to use, we could
render a totally *different* Webpack entry that renders a *different*, new Vue
application.

*Or*... again, we could render the *same* Vue application that we've *been* using,
but make that app smarter by *detecting* that we're on the product show page and
rendering in a different way.

We're still doing full page refreshes, but this is the idea behind a single page
application, or even a mini single page application that powers just one section
of your site. You have one app that renders different components based on the
URL.

So which page you're on and then renders differently based on that. *This* is what
we're going to do.

## The current Vue Setup

As a reminder, here is how the whole thing works currently. In `index.html.twig`,
we're including the `products` entry, which is the `assets/products.js` file.
This file grabs the `assets/pages/products.vue` component - that's right here - and
renders it. We're now going to make this component smart enough to either render
the product list page *or* the product show page. Normally that kind of toggling
is done with a Vue router, but we're going to do it by passing info from the server,
which in some ways, will be trickier.

Anyways, the new product show controller is already set up to use that same
`index.html.twig` template that renders the `products` entrypoint and ultimately
renders the `products.vue` component. But to get this to work, the template needs
a `categories` variable so it can set a global `categories` JavaScript variables
that we're using.

To do that, we'll use the same code as the other controllers. I'll copy the
`categories` variable from up here. Then, we'll need to autowire the
`CategoryRepository`: `CategoryRepository $categoryRepository`, add a 2nd argument
to `render()` and paste!

Now when we refresh... it's alive! Well... it's still executing the *exact* same
Vue app as before.... which renders the product *list* page... but it's a start.

So next: let's pass some info to Vue to say:

> Hey! We are on the product show page!

We'll then use that info inside `products.vue` to render something different.
