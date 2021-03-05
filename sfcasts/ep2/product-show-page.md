# Page 2: Product Show Page

Let's build a page to view a single product! We'll get there by clicking on this
link... or the image or... any of this.

We *could* use the Vue router so that when we click any of these links,
there's no full page refresh. We'll save that for another tutorial in part, because
I want to show how Vue can be used as just one piece of a traditional app.

## Linking to Another Page

This means that we will make these nice traditional links. The Vue component that
renders this lives at `assets/components/product-list/product-card.vue`. Let's
start by wrapping the image in an anchor tag. Add an `a`, a closing `a`, indent
and, for the `href`, we can use a computed property to keep things clean:
`:href=productUrl`.

[[[ code('2bae0023ea') ]]]

Do the same thing down around the product name: `<a :href="productUrl">`. And to
be *extra* cool, we can use `v-text` to print the product name.

That part is *totally* unnecessary, it's just more hipster... because now the anchor
can be self-closing. Oooo.

[[[ code('07ac0d260c') ]]]

Finally, for the "View Product" button, we should really change this to a normal
anchor tag with an `href`. But to be extra complicated, let's activate it with a
click listener: `@click=""` and call a method we'll add soon: `goToProduct()`.

[[[ code('aa33b26087') ]]]

To be clear: I would *not* do this in a real app - it's weird to make normal
navigational links use fancy JavaScript... and it's not great for accessibility.
I'm just trying to make our life harder for the tutorial. Yay learning!

Head over to the browser and open your debugging tools. Thanks to the dev
server, we don't even need to refresh: it's already panicking because the
"property or method, productUrl is not defined on the instance".

Let's add that first. In the component, we already have a `computed` section. Add
another: `productUrl`. For the `return`, use the fancy "ticks" so we can say
`/products/` then `${}` with `product.id` inside. As you'll see in a minute, I've
*already* created a route and controller for this URL.

[[[ code('00084efbc9') ]]]

And, yes: I *am* hardcoding that URL. You *can* generate URLs dynamically by using
FOSJsRoutingBundle, but I'm *fine* with hardcoding them: it makes my life simpler.
We also talked about this in
[the first tutorial](https://symfonycasts.com/screencast/vue/categories-ajax#linking-properly).

To finish things, we need a method for the `@click` listener: `goToProduct()`.
At the bottom, add a `methods` section with `goToProduct()`. Inside, say
`window.location =` and then `this.productUrl` to re-use our computed property.

[[[ code('7a65300d93') ]]]

Super nice! Let's try it! When I move back to the browser, it automatically reloaded
for me. Click any of the spots and... big error page!

## The Product Page

Before I started recording the tutorial, I created a route and controller for this
URL. Open `src/Controller/ProductController.php`. This controller renders every page
we've seen so far: the homepage - which lists all the products:

[[[ code('eb3a0f7854') ]]]

the category page:

[[[ code('ce82ee9757') ]]]

and - now - the individual *product* page. This is what's currently being executed.

[[[ code('63ad09600d') ]]]

Notice that all of these render the same template, which is
`templates/product/index.html.twig`.

But, hold on, let's back up. We can make this "product show" page look and work
*however* we want. For example, we could decide that this is going to be a normal,
Twig-rendered HTML page: maybe we only needed Vue for the fancy product list. So,
we could render a new `product/show.html.twig` and... be done.

*Or*, if the page *is* going to be fancy and Vue would be useful, we could
render a totally *different* Webpack entry that renders a different, *new* Vue
application.

*Or*... again, we could render the *same* Vue application that we've *been* using,
but make that smarter by *detecting* that we're on the product show page and
rendering in a different way.

We're still doing full page refreshes, but this is the idea behind a single page
application, or even a mini single page application that powers just one section
of your site. You have one piece of code that renders different components based
on the URL. *This* is what we're going to do.

## The current Vue Setup

As a reminder, here is how the whole thing works currently. In `index.html.twig`,
we're including the `products` entry, which is the `assets/products.js` file.

[[[ code('bd2e21465a') ]]]

This grabs the `assets/pages/products.vue` component - that's right here - and
renders it. 

[[[ code('478d784817') ]]]

We're now going to make this component smart enough to either render
the product list page *or* the product show page. Normally that kind of toggling
is done with a Vue router, but we're going to do it by passing info from the server,
which in some ways, will be trickier.

Anyways, the new product show controller is already set up to use that same
`index.html.twig` template that renders the `products` entrypoint and ultimately
renders the `products.vue` component. But to get this to work, the template needs
a `categories` variable so it can set a global `categories` JavaScript variable
that we're using.

To pass that, we'll use the same code as the other controllers. Copy the
`categories` variable from up here. Then, we'll need to autowire the
`CategoryRepository`: `CategoryRepository $categoryRepository`, add a 2nd argument
to `render()`, and paste!

[[[ code('d9e5443c7a') ]]]

Now when we refresh... it's alive! Well... it's still executing the *exact* same
Vue app as before.... which renders the product *list* page... but it's a start.

So next: let's pass some info to Vue to say:

> Hey! We are on the product show page!

We'll then use that info inside `products.vue` to render something different.
