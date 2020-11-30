# AJAX & Delayed Rendering

Let's start building the product page. In the component, we have the `productId`, but
not the product *data*. We'll need an AJAX call to get that.

## AJAX call for Product Data

In `services/products-services.js`, this is where we've been centralizing the AJAX
logic for products. Let's add a new method to fetch just *one*:
`export function fetchOneProduct()` with an `iri` argument.

[[[ code('addb1e65d7') ]]]

My favorite part about these IRI strings is that they are *also* URLs. So we can
say return `axios.get()` and literally pass it `iri`.

[[[ code('80278dbb8b') ]]]

Pretty awesome. We can even add documentation to be extra cool: the argument will
be a string and this will return a `Promise`... that will resolve to an
`AxiosResponse`, which you can keep for some extra auto-complete if you want.
And a description and... nice!

[[[ code('251c8f6cb4') ]]]

Over in `product-show.vue`, we're definitely going to need to store the response
from the AJAX call as a piece of `data`. Start there: add a `data()` function and
return an object with a `product` key initialized to `null`. Oh, but... ESLint
wants me to move `data` *after* `props`: that's just a coding standards thing.

[[[ code('1c3767f729') ]]]

For the AJAX call, we want to make it as *early* as possible. Do that by adding
a `created()` function. Let's think... we're also going to want to know when
the AJAX call is still loading.... so add a `loading` data set to `true`.

[[[ code('7dc54d427e') ]]]

Back in `created()`, wrap the AJAX call in a try block *just* to
get some rudimentary error handling. Say `this.product` equals and use that new
`fetchOneProduct()` function. Hit tab to auto-complete that so PhpStorm adds the
`import` for us. Good job editor!

Pass the function `this.productId`. Oh, but what we *really* want to do is *wait*
for this: add `await` and then, of course, the function now needs to be `async`.
And since `fetchOneProduct()` resolve to an AxiosResponse, what *we* want - the
`product` details - will live on its `data` key.

Cool! Finish by adding `finally` with `this.loading = false`.

[[[ code('a82f4f0744') ]]]

If I thought that this endpoint might fail for some legitimate reason, I'd add
a `catch`, set an error on some data & display it. But this at *least*
sets loading to false if something unexpected happens.

## Using v-if for Truly Conditional Rendering

Ok! Up on the template, let's start rendering data! As a reminder, our API
has a *full* page of documentation at `http://localhost:8000/api`. Fancy! Here,
you can see what all of the different endpoints return. For example, this
shows all the fields we expect to get back for a product, like `name`!

Back in the component, add an `<h1>` tag with `{{ product.name }}`.

[[[ code('1d51315f84') ]]]

Easy enough! We make an AJAX call and set it on the `product` data. We also
have a `loading` data, which we'll use in a second.

But when we check this in the browser...error! If we refresh... bah! It won't
go away!

> Cannot read property name of null

And it's coming from `ProductShow`. I'm pretty sure the problem is right here in
the template and... it makes sense! When the template *first* renders, the `product`
is `null`. Hence, error!

One way to avoid this is to initialize your `product` to an object with a `name`
key... something like this. But I prefer a different solution... because this looks
kinda hacky to me.

Instead, simply don't render the product until it's loaded. Doing this is easy.
Up in the template, wrap the `<h1>` in another `<div>` because we will soon have
*other* product stuff that we want to render conditionally. On that `div`, add
`v-if="product"`.

[[[ code('c030c60a05') ]]]

The `v-if` is important. If we used `v-show`, it would *still* try to execute the
code inside... it would just be hidden. With `v-if`, the code is not
executed at *all*.

So when we over over now and refresh... it's empty? And no error? Let me check
the Dev tools: find `ProductShow` and... yea - the `product` data is *still*
`null`.

That's because of a typo that you probably saw me make a minute ago. Down in
`created`, it should be `this.product` equals.

Now... I don't even need to refresh: we instantly see the name. Well, *nearly*
instantly: when we refresh, it *waits* until the `product` data is available,
and *then* loads.

## Loading Animation

Before we keep going, since the page *is* empty for a moment, let's adds a loading
animation. Back in the component, import `Loading` from `@/components/loading`:

[[[ code('081b5cf2d7') ]]]

add a `components` key - `Loading`:

[[[ code('f68639937a') ]]]

then up in the template say `<loading>` with `v-if="loading"`!

[[[ code('e5e28d8389') ]]]

Two things about this. One: we might not even need a `loading` data for this
component because either the product is `null` - which means we're loading - or
it's not... which means loading is done. Your call.

Two, notice I'm using `v-if` on the `<loading>` component. Until now, I've always
used `v-show` for the loading component. Why the change? Well... it doesn't
really matter. If a loading animation will be shown and hidden multiple times, I
would *definitely* choose `v-show` because that's faster at hiding and showing.
But since it will only load once... and then disappear forever, `v-if` allows the
component to be completely destroyed. But really, these are micro optimizations.

Anyways, when we move over now and refresh... there we go! We see the loading
animation and *then* the product name.

Hmm, except this `h1` looks a bit different than our product list page. See: it
has a smaller font over here. Why? Look at the `catalog` component: it renders
a `title` component. Yep, we centralized our title into its own component in the
last tutorial so that all titles would have the same "look". But in `product-show`,
we are not using it yet!

Let's fix that next, which... will expose a problem in that component. It's too
smart!
