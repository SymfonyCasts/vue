# Filtering Products

Coming soon...

All right. So we have `products` and we have `searchTerm`. Let's update the
`searchTerm` when we get an event from `search-bar`.

## Listen to `search-products` Event in Catalog

Remember we're dispatching
an event called `search-products`. Go up to your `search-bar` up in `Catalog`'s
template and say `@search-products=""`. Set it to `onSearchProducts`, which
is a method that we now need to create.

Down here at the bottom, I'll add `methods: {}` and then `onSearchProducts()`.
Since this method is going to be called when an event is dispatched, it is going
to get an `event` argument *kind of* like normal JavaScript, and because when we
dispatch the event, we added a `term` key, we can use that here! So we can say
`this.searchTerm = event.term`, and that should be enough to do it.

## Check it in Vue Dev Tools

Let's just check our work over here. If I type in `disc` there, of course the
`search-bar` search term updates. But if we look on `catalog`, the search term
has *also* updated there! Perfect!

## Finally Filter our Products

The *last* thing we need to do is actually filter the products list. If you
scroll up little bit, to render the products, we actually pass them into the
`<product-lis>` component. Right now we're always passing in *all* of the
products. What we really want this to be now is just a subset of those products.

This is a *perfect* situation for using a computed property. Let's change this
to `filteredProducts`. I'll copy that name. Go down and above `created`, say,
`computed: {}`, `filteredProducts()`. Inside that function, say
`if (!this.searchTerm)`, then we're going to return `this.products`. Just the
normal array of products.

If there *is* a search term, what we can do is return `this.products.filter()`
and pass that a call back. We'll use an arrow function that will take the
individual product as we're looping over it and I'm going to introduce a kind
of *shortcut* syntax here. Because I didn't do a curly brace -I just did
parentheses here- this means we're just returning whatever is inside. So here,
I'm going to say
`product.name.toLowerCase().includes(this.searchTerm.toLowerCase())`.
There we go. Basically it's going to loop over all the products and for each
product, if `product.name.toLowerCase()` includes `this.searchTerm.toLowerCase()`
then it's going to be included in the new array that gets returned from here.
Just some JavaScript magic!

## Try it in the browser!

If we go over now... You can see that right now we have the full list of office
supplies. If I type in `disk`... Yes! It just gives one! Try `dis`...
"Disappearing ink pens"... It works perfectly!

The only problem with this, as fast and cool as this is, is that this won't work
well with sites where our list is paginated! We would just be filtering through
a single page of products! Or what if we wanted the search to *also* be
performed in database fields that are *not* shown in this list? While we don't
*have* this problem now, it would be really cool if we could just get results
form the server!

Next, let's make this more powerful by performing this search server-side via
an Ajax call, instead of doing it right inside JavaScript.
