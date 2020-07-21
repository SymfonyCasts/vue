# Filtering Products

Ok: we have `products` and `searchTerm` data. Let's *update* the
`searchTerm` when the `search-bar` component tells us it's changed.

## Listen to `search-products` Event in Catalog

Remember, in that component, we're dispatching
an event called `search-products`. In `Catalog`, up in the template, find the
`<search-bar` element and add `@search-products="onSearchProducts"`, which
is a method that we now need to create.

[[[ code('f2c109d672') ]]]

Down in the code, do it: add `methods: {}` and then `onSearchProducts()`.
Since this method is going to be called when an event is emitted, it will
receive an `event` argument. And because, when we
emitted the event, we added a `term` key, we can use that here! We can say
`this.searchTerm = event.term`.

[[[ code('cafbade99b') ]]]

## Check it in Vue Dev Tools

Let's go check it out! Back on the dev tools... if I type `disc`, the `searchTerm`
in `SearchBar`, of course, updates. But if we look in `Catalog`, the search term
*also* changed here! Yes!

## Filter the Products Client-Side

We can *finally* filter the product list. Scroll up to the template. To render
the products, we pass them into the
`<product-list>` component: we're currently passing in *all* of the
products. But when there is a `searchTerm` we *now* want this to be a *subset*.

This is, yet again, a situation where we need to reference a value in the template
that requires some custom logic. In other words, it's computed property time!
In preparation, pass `filteredProducts` to `product-list`.

[[[ code('58eb3f29e8') ]]]

Copy that name, go down and, above `created`, add
`computed` with `filteredProducts()`. Inside the function,
`if (!this.searchTerm)`, then we can just return `this.products`: the
normal array of products.

[[[ code('0b90225896') ]]]

But if there *is* a search term, return `this.products.filter()`
and pass an arrow function with a `product` argument. I'm going to use
the *super* hipster shortcut syntax: because I don't have any curly braces - just
parentheses - this has an implied `return` statement. So, return
`product.name.toLowerCase().includes(this.searchTerm.toLowerCase())`.

[[[ code('51dc6a3e94') ]]]

Basically, loop over all the products and return a new array containing *only*
the products whose name includes the search term.

## Try it in the browser!

Let's try it! Over in the browser, this is the *full* list of office
supplies. If I type in `disk`... yes! It shows just one! Try `dis`... 2!

But... as cool and fast as this is... our JavaScript filtering has some serious
downsides. First, if our products were paginated, this would *not* work: the user
would only be searching through a single page of products! Yikes! And second, what
if we wanted the search to *also* match on fields that are *not* shown in this
list? Or maybe we have a super-cool Elasticsearch system that we want to use?

The point is: filtering on the client-side *might* work in some simple cases...
but most of the time, you'll probably want to perform a search on the server via
an AJAX call. Let's do that next!
