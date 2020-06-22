# The await Keyword

Before we start using the products data from the AJAX call, there's *one* other
way to work with promises... and I really like it! It's the `await` syntax. We
know that Axios returns a Promise... and that we *normally* run code *after* a
promise has finished - or "resolved" - by calling `.then()` on it.

This works great. But instead add `const response =` before the axios call and
then remove the callback.

If we stopped right now, response would actually be a *Promise* - not a response.
But if we put `await` in front of it, it *will* be a response! The `await`
keyword causes your code to *wait* for that Promise to resolve. And whatever data
is *normally* passed to your callback as an argument is instead *returned*. There
is *still* an asynchronous AJAX call happening, but our code *reads* a bit more like
synchronous code. The `await` keyword is syntactic sugar.

## Why do we need async?

Hmm... PhpStorm looks mad... but... let's ignore it and try this anyways! Move
back over to the browser and scroll to the bottom of the console. Ah!

> Cannot use keyword await outside an async function.

So... first: I hope that the general idea of `await` makes sense to you. If you
have something that is asynchronous, you put `await` in front of it and that says:

> Please wait for this to finish, get the return value and *then* keep executing
> my code.

That's great. But this comes with one rule: whenever you use the `await` keyword,
whatever function you're *inside* of needs to have an `async` keyword in front of
it. Let me put back the `console.log(response)`.

When you make a function `async`, it means that your function will *now*
automatically and *always* return a `Promise`. If your function has a `return` value,
that will be the *data* of the Promise.

This... can be confusing at first: when `mounted()` is called, our code *will*
freeze on the `async` line and wait for the AJAX call to finish. But this doesn't
freeze our entire JavaScript app. In reality, the `mounted()` function will almost
*immediately* finish and will return a Promise. That Promise will *resolve* once
all of our code executes.

To say this a different way: if *we* called `mounted()` directly from our code -
we won't do that, but just pretend - then `mounted()` would finish before the
AJAX call and it would *now* return a Promise. If we wanted to do something
*after* the AJAX call and the rest of the code in `mounted()` finished, we could
chain a `.then()` *from* that Promise.

But in reality, *Vue* is responsible for calling `mounted()` and Vue doesn't
care about or use any value that we might return from `mounted()`. So basically,
Vue couldn't care less that we just changed this to `async` and so, caused our
method to return a Promise.

The key thing to know about `async` and `await` is that even though our code will
wait on this line, *really* the `mounted()` function will finish nearly instantly.
Vue isn't going to call `mounted()` then freeze our *entire* Vue app waiting for
it to finish. It starts our AJAX call then keeps going. That's *perfect*.

Anyways, now when we refresh... yes! The AJAX call finishes and logs the response.
Feel free to use Promises directly or with `await`: we'll use `await` in this tutorial.

## Adding the products Data & hydra:member

Ok, let's use our *real* products data! Inside `catalog`, if you think about it,
the products are something that will *change* during the lifecycle of our
component. At the *very* least, when the `catalog` component first loads, the
products will be empty. And then, as soon as the Ajax call finishes, they will
*change* to be the real products.

That's a *long* way of saying that products need live in `data`. Head up to
to the `data` option and add a new `products` key set to an empty array as its
default data.

In `mounted()`, instead of logging the response, now we can say
`this.products = response.data` and... let's see. Inside `response.data`, we want
the `hydra:member` property. Cool! Add `.hydra:member`. Oh but that `:` mucks
things up. We need to use square brackets here with that in quotes.

Ok, let's check out the `products` data. Move over... I'll refresh just to be
safe... then on the Vue dev tools, find the `Catalog` component. Yes! Our
`products` data has 12 items in it!

So... let's celebrate and *use* this data! Up in the template, remove that pesky
TODO. In our design, we need to have one of these divs for each product. Break it into
multiple lines and then loop with `v-for="product in products"`. And every time
we use `v-for`, we need to add a `key` attribute set to some unique, non-changing
key for each item.

## The Useful @id IRI

If you look at the products data on the dev tools, you'll notice that we *do* have
an `id` property. It's not very important in this case, but I'm actually
going to use this `@id` instead. This is called an "IRI" - it's a unique key
that API Platform adds to *every* resource. It's... just more *useful* than a
database ID or UUID because it's a *real* URL: we could make a request to this
address to fetch that specific product.

That "usefulness" won't be... well... *useful* in this situation. But because
of this, in general, I'm going to use `@id` everywhere as my unique identifier.
The only problem is that when you say `product.@id`, JavaScript gets mad because
you can't use an `@` sign in this syntax. Once again, use square brackets and
wrap this in quotes.

Inside the div, start by printing the name: `{{ product.name }}`... because
name is one of the keys in the data. And... yea! You can already see it being
used! There is our list of *real*, high-quality, products.

Next, if we added all of the markup and data we need for each product directly
into the `catalog` component... things could get big and ugly fast. Let's split
the product listing into two, smaller, sleeker components.
