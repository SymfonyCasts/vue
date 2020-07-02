# Async Computed Properties

Our search is cool... it's fast... but it won't work if we start paginating
the products... and the logic used in the search is *super* basic: we're just
comparing the product name. In most cases, I'll want my search to be smarter
than this: like a smarter database query or by using something like Elasticsearch.

For both of these reasons, I want to refactor our search to fetch the data from
the *server*, instead of doing it all in JavaScript.

Open a new tab and go to `/api/products.jsonld`: our shortcut to see what our API
looks like. I've already added a basic filter to API Platform: you can add
`?name=` and some term, and it will only filter products. This is actually only
filtering on the `name` property. But you can make the search in your API however
rich you need. The point is: our API has a way for us to send a search query and
get a sub-set of results.

## Adding Search to the Product Service

Back at our code, open up `services/products-service.js`. This function is
responsible for making the AJAX request for products. It can already filter by
category. Now, add a *second* argument called `searchTerm`. Then, very simply,
if we have a `searchTerm`, then `params.name = searchTerm`.

That will add the query parameter. Let's add another param to the docs: this
will be a `string` or `null` and it's called `searchTerm`.

Very nice!

## AJAX inside a Computed Property?

Let's use this in `catalog.vue`. I'm going to do this in the *simplest* way
possible first... and it's totally *not* going to work! We currently have a
`filteredProducts` computed property. It works great because it can *compute*
the correct array of Products to use based on the `searchTerm` and `products`.

So the easiest thing to is say: if there is *no* `searchTerm`, return
`this.products`. Else, if there *is* a `searchTerm`, let's make our API call!
I'll copy the `fetchProducts()` line from below and say
`const response = await fetchProducts()`. And, of course, Webpack is *mad*
because this method now needs to be `async`.

Much better! To finish the function, I'll go steal some more code and say
`return response.data['hydra:member']`.

So... this makes sense, right? When we reference `filterProducts` in the template,
that will call our function, we make the AJAX call, wait for it to finish,
and then return the new array of products. Genious!

But... you can already see that we have an angry underline below `await` from
ESLint. But... let's ignore that and try it! I'll refresh and... you can already
see that it's *broken*. And we have a nice error to enjoy:

> Invalid prop: type check failed for prop "products". Expected Array got Promise.

This is coming from `ProductList` and that prop is passed by `Catalog`. Yep,
when we render `<product-list`, the `filteredProducts` is *no* longer an Array.
It's a Promise!

And... yep! That makes sense. When you make a method `async`, when someone
calls that function, it finishes *immediately* and returns a `Promise`: it
does *not* actually wait for your code to run. Then, later, when your function
*does* finally finish its work, the promise *resolves*.

So this is a *long* way of saying that computed properties can *only* do synchronous
work: they must return a value immediately. If you try to do something async, then
you'll end up returning a `Promise` instead of your real value.

Nope, if you need to do something asynchronous, then you *can't* use a computed
property. So, computed properties are "yay!" for calculating synchronous stuff
but are "boo!" for async stuff.

## Adding a new Data

The solution is to abandon your project and take up a peaceful career herding
sheep. *Or*, you'll need to convert the computed property into a piece of data.
And then, whenever that data needs to change - like whenever the `SearchTerm`
changes - you'll call a method that will *make* the AJAX call
and *update* that data once its done.

So... let's do this! The first step is to add a piece of data that can hold the
filtered products. But, actually, now that we're not trying to keep *all* the
products in the `products` data so we can filter based off of it, whenever our
AJAX call finishes, it's now ok to *change* that `products` array directly.
So instead of adding a *new* piece of data - we'll just change products.

This means that, up in the template, we should change `filteredProducts`
back to `products`. And back down, we can remove the computed section entirely.

## Updating products on searchTerm Change

Here's the plan then: whenever the `searchTerm` changes, we basically want to
re-run all of this code that makes the Ajax call and updates the `products` data
with a minor tweak to *also* include the search query.

To help re-use this, create a new method called  `loadProducts()` with a
`searchTerm` argument.

Now, copy the entire `created()` function... and paste that. To search the
`searchTerm`, pass that as a second arg to `fetchProducts()`. Oh and, of course,
make this method `async`.

Up in created, call this: `this.loadProducts()` and pass `null` because when we
first load, there will be *no* search term. We *could* pass `this.searchTerm`...
but I'm going to delete that data in a minute.

*This* was just a simple refactoring. And... if we reload the page! Yay,
our refactoring did *not* make the site catch on fire. A win!

Back in the editor, the *last* step is to call `this.loadProducts()` whenever
the search changes... which is *exactly* when `onSearchProducts()` is called.
Call `this.loadProducts()` pass `event.term`.

Thanks to this, when `onSearchProducts()` is called, this will *start* the AJAX
call. Later, when it finishes, the `products` data will get updated and the component
will re-render.

And hmm. If you think about it: we don't even need the `searchTerm` data anymore.
I'll look for it: we're setting it here... and initializing it in `data`. The
`loadProducts()` method doesn't need it because we pass it as an argument.

Celebrate by removing the `searchTerm` data.

Ok, moment of truth! Let's refresh the page to be safe and... type. Yes! This
matches 2 products and `disk` matches one. In Symfony's web debug toolbar, you
can see the AJAX calls. We now have the ability to make our search as *powerful*
on the server as we want.

## Destructured Event Arg

Oh, but there's one *tiny* other thing I want to show you. In `onSearchProducts`,
we get the `term` with `event.term`. Awesome! In fact, that's the *only* part of
the `event` object that we're using. In the JavaScript world, you'll often
see the method written like this: `{ term }`.

This is object destructuring: this grabs the `term` property from the `event`
argument that's being passed to us and sets it as a `term` variable. It allows
us to just say `term` below. We can even document this: the `term` param is a
string. Extra credit if you describe the function above too.

After this change... the search still works. But... wow! This is making a *lot*
of AJAX calls! Even if we type *really* fast, it makes one AJAX call per letter.
Let's fix that next by adding debouncing.
