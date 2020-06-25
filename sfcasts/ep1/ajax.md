# Ajax with Axios

Our app is *really* starting to come together. I think it's time to make our
data *dynamic*: the categories on the sidebar are hardcoded and the products
aren't even loading yet. Let's make some Ajax calls!

## Installing Axios

To make those, we're going to use a library called Axios. To install it,
open a new terminal tab and run:

```terminal
yarn add axios --dev
```

The `--dev` part isn't very important.

The other popular option for AJAX calls is to use `fetch()` instead of Axios.
`fetch()` is actually a built-in JavaScript function, which means you don't need
any outside library. However, if you need to support IE 11, then you *will* need
a polyfill to use it. Both Axios and fetch are great options.

## Investigating our API

For our first trick, let's load products onto the page. Our app already has
an API - powered by API Platform - and you can see its docs by going to `/api`.
Scroll down to the section about products and expand the endpoint for
`GET /api/products`.

The best way to see how this works is... to try it! Let's see... hit Execute
and... here's the response body. We already have a set of products in the
database.

If you haven't used API Platform before - it's *no* problem. But, the structure
with `@id`, `@context`, `hydra:member` and other keys might look odd. This *is*
JSON, but it's using a format called JSON-LD Hydra, which is basically JSON with
extra metadata: each response will have the same structure with extra fields
to give you more info. It's super handy.

Now, notice that the URL to the endpoint is `/api/products`. But if we put
`/api/products` in our browser... we don't see JSON! It's the same documentation
page! That's because API Platform *realizes* - by reading the `Accept` header -
that we're requesting this from a browser and so it returns HTML. When we request
this from Axios with no `Accept` header, we'll get back JSON.

But if you ever want to see the JSON in a browser to see how it looks, there's a
hack: add `.jsonld` to the end of the URL. *This* is our endpoint.

Let's go *all* the way back to our homepage and... I'll re-open the browser dev tools.

## Making the AJAX Call from mounted()

Ok, when we load products, which component is going to *need* that data? The
top-level `products.vue` component renders the sidebar and catalog. We *could*
load the products here... but we won't *actually* need them. Hold Command or Ctrl
and click `<catalog` to jump to that component.

Ah, *this* is the component that needs the products data.

Here's the goal: as *soon* as Vue loads this component, we'll start the AJAX call
so that we can load the products as quickly as possible. Fortunately, Vue allows
us to run code during its startup process, and there are two main "hook" points:
`mounted` and `created`. We'll talk more about these later but Vue considers your
component `mounted` when it's actually added to the page - like, in `products.js`
when we call `.$mount()`.

To run code right *after* our component is mounted, all we need to do is create
a function called `mounted()`. Inside, we'll make the AJAX call.

How? First, at the top of the `script` section `import axios from 'axios'`.

[[[ code('ce714dd447') ]]]

Then, *using* Axios is beautifully simple: `axios.get('/api/products')`. And like 
every AJAX library, this will return a *Promise*, which you can learn *all* about
in a [JavaScript Tutorial](https://symfonycasts.com/screencast/javascript/all-about-promises)
here on SymfonyCasts.

To use the Promise, add `.then()`, and pass an arrow function with `response`
as the argument. Let's `console.log(response)` to see what it looks like.

[[[ code('0b3f6576f4') ]]]

Testing time! Back over on the browser, click to view the console. Thanks to hot
module replacement... that already ran! But to make the flow more realistic,
let's refresh the page.

Now... boom! The log shows up almost instantly. The `response` is an object
with `headers`, `status` and other things. What *we* want is `data`. One of the
nice features of Axios is that it decodes the JSON automatically.

When you're working with JSON-LD Hydra like this, the collection of items
is stored on a `hydra:member` property. Yep, it's an array with 12 products. We
have product data!

Next, this is working *great*, but I'm going to choose a slightly *different*
syntax for handling Promises: async and await. Then, we'll use our brand new
data to render those products onto the page.
