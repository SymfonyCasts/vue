# Event Payload

Our search bar is working really well! We can type in it and it keeps things 
synchronized with the `searchTerm` data member here. We now need to
communicate when the `searchTerm` changed *up* to catalog, so that catalog
knows whenever the `searchTerm` changes and somehow change the products list
displayed in the page!

We could think that, since `Catalog` *needs* to know about this data, we should
move this data up to `Catalog`, then somehow pass it down back to `search-bar` as
a prop. We did this in a couple of cases already, where we see data on a specific
element and *later* we find out it's needed in other elements, so we moved it up
the tree to make it accessible. But in this case, I'm not going to do that.

The one *main* reason why I'm not going to do that, if you really think of search
bar as its own standalone component, then what we want to do in `Catalog` is to
update the product list *when* the search term changes. In this context, we want
it to perform an action when an *event* happens, so instead of having search bar
*change* something in catalog, we want it to just just to notify us and say: "Hey,
I changed!", and when it emits that event, it will pass us the new search term.

It's not really that different than moving the data up to `Catalog`. In both
cases, `search-bar` would need to emit an event up to notify it. My point is that
the `searchTerm` data really only needs to be owned by `search-bar` because it's
going to communicate the value of the search, when it changes, via the event
itself. It makes sense to have `search-bar` *and* `searchTerm` be part of the
same standalone component.

Another reason I'm not going to move the `searchTerm` up to `Catalog` is that in
a few minutes, we're going to add debouncing, which basically means that as the
search bar changes here, the search term will update, but we'll actually wait for
a second before we send a notification to catalog. This will help us only make
Ajax calls when the user has finished typing. We're effectively de-coupling the
`searchTerm` changes in `search-bar` from the search action itself.

## $emmit a Search Event

What we need to do here then is emit a custom event when the `searchTerm`
changes. To do that, I'm going to add an `@input=""` and here I'm going to say
`onInput`, which will be a new method.

As I mentioned earlier, when you have `v-model`, one of the things it does
behind the scenes is, it adds an `@input` which sets the `searchTerm` to this
input's value. In this case, we're actually adding a second `@input`, so
the `@input` behind `v-model` is *still* going to update the `searchTerm` data,
and after it finishes, our own custom code will run, which is pretty cool!

Down here, add `methods` and a new method called `onInput()`. Inside, we're going
to emit an event via the `this.$emit` function. Let's call this `search-products`.
If we wanted to, we *could* actually design this component to be reused in other
contexts. In that case, we probably would want to just emit a more generic
`search` event, whatever makes sense to you.

When calling `$emit`, Vue has prepared for us a really cool optional second
argument, which can hold *any* data that you want to pass onto the event object.
Good news! Because, in addition to just say that the `search-products` event has
happened, we need to *also* pass what the `searchTerm` is. We'll say
`term: this.searchTerm`.

## Check the Event in Vue DevTools

Before we touch anything else, let's actually move over to the browser. On the Vue
Dev Tools, click on the search bar, and on the events tab, so that we can actually
see this happening. Yay! There are *four* events there! One for *each change*
made to the input text! Check the last event here, it has a `payload` property
that, if we explore, has the *`term`* on there. Awesome!

## Products Filtering Strategies

Back to `Catalog`, we're going to filter the products in two ways. The first and
*easiest* way to do this is to just take this product array that we have and
filter it using JavaScript. Later, we're going to do a server side search, which
is a *much* more powerful way to do things than just searching whatever products
you have in memory here. But let's keep things simple for now.

When the `searchTerm` changes, we don't *actually* want to change the `products`
array here because we don't want to lose the information we have. We just want to
loop over them and filter out the ones that we want, then return a copy. So for
that, we are going to keep track of the full list of `products` and also keep
track of the `searchTerm`. Then, we'll use these two pieces of data to actually
figure out what subset of products to show.

Now you might be yelling: "Hey Ryan, you have just duplicated the `searchTerm`
data!! You have `searchTerm` in the `search-bar` and you have `searchTerm`
inside of `Catalog`! You said never to do that!!" That is a *very* good point.
However, I'm doing it on purpose, so stick with me on this one! The `searchTerm`
instead of `search-bar` is really an *internal* state just to help this component
do its job. The real end result of this component is that it dispatches events
with the new `searchTerm`. If we're using search bar, we don't really care that
it has this `searchTerm` data inside. We only care that it emits an event.

In `Catalog`, we're going to listen to that event and, because of our current
approach, we need to *also* have a `searchTerm` there just so that it can get
its filtering done. If you *still* think that this is kind of weird, in a few
minutes, we're going to add de-bouncing. When that happens, as we type in the
`search-bar`, its `searchTerm` will update instantly, but there'll be a slight
delay before we emit an event. This means that in `search-bar`, the `searchTerm`
will update very often, but *fewer* changes will affect our `searchTerm` in
`Catalog`. They are two slightly different sets of data that are related, but
they're not actually identical all the time.

## Listen to `search-products` Event in Catalog

All right. So we have `products` and we have `searchTerm`. Let's update the
`searchTerm` when we get an event from `search-bar`. Remember we're dispatching
an event called `search-prodcuts`. Go up to your `search-bar` up in `Catalog`'s
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
