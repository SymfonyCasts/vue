# Watchers: The Good, The Bad & The Useful!

One of the things that we need to know on every page load is what the current
category is. To get that, we pass it from the server to Vue by
setting a `currentCategoryId` global variable. To make that
a bit nicer, we even set up this `page-context` service that reads
the global variable for us. We *then* use this info to highlight which category
is active on the sidebar and *also* to filter the products.

One thing that we *could* have done is just call the `getCurrentCategoryId()`
function in every component that needed that. For example,
in `sidebar.vue`, where we need the current category, we could have
imported the `page-context` service and called `getCurrentCategoryId()`. And
we could have done the same thing in `catalog`. That would be safe
because the `currentCategoryId` is *not* something that changes: it's not
one of those things where, when it changes, we need our component to
re-render. We don't need it to be *reactive*.

But now, I *do* want to do this. Here's our new goal: make it possible to change
`currentCategoryId` while our app is running and for the sidebar and products to instantly
update. This *now* means that we *do* need `currentCategoryId` to be "reactive".
And *that* means it needs to live as `data` in a component.

Look at the component tree in the Vue dev tools. You know the drill: if both
`<Catalog>` and `<Sidebar>` need `currentCategoryId`, then it needs to live as
`data` in `<Products>`. Then, we can pass it down via `props`.

***TIP
By the way, in Vue 3, it *is* possible to have reactive objects outside of a Vue
component.
***

The good news is: we planned ahead! Look inside of
`products.vue`. Hey! This has a `currentCategoryId` computed property, which
just calls - I'll hold command or control and click -, the `page-context` service.
Then, we're passing this down as `props` to the other components.

## Replace the Computed Property for Data

This means that all *we* need to do is change `currentCategoryId` from a computed
prop to `data` and... everything should just work! Famous last words!

Let's do this: remove this computed property and,
up in `data`, add up a new variable called `currentCategoryId`. I'll set its
initial value to `getCurrentCategoryId()`. We *can* still use the service to
get the initial value.

Now, If we go to the browser, everything still works wonderfully! It's
*still* passing down `currentCategoryId` in *exactly* the same way. The cool
thing now is, I can go the Vue Dev tools, click on `<Products>`,  scroll down
to the `currentCategoryId` and change it. Let's, say `24` and... boom! Our
app updated! The new category is highlighted in the sidebar *and* we can see
the correct title.

Oh... but what it *didn't* do is change the list of products!
Let's try this again: I'll change to `25` - your id numbers will probably
be different - and... again! It updated the `sidebar` and `title`... but *not*
the product list. What's going on?

## Products Data Depends on a Changing Prop

Out in your debugging had and dive into `catalog.vue`, the component that
has the `products`
data. The thing is, the `products` data depends on two things. If we
go down to `loadProducts()` - the method that actually makes the AJAX call -
we can see that `products` depend on the `searchTerm` and *also* on
`currentCategoryId`. This means that when *either* of these change,
we need to *re-call* `loadProducts` so that it will make the new AJAX request.

Making sure that `loadProducts()` was called when the `searchTerm` changes
was really easy because our `search-bar` was already emitting an
event whenever the search changes. We then call the `onSearchProducts()` method,
*that* calls `this.loadProducts()` and *that* makes the AJAX call and changes
the `products` data. That works *perfectly*.

The question now is: how can we run code when `currentCategoryId` changes?
How can we detect when this prop changes?

Here's the answer: When there is *no* other event or hook that you can listen
to and you simple *must* execute code when a prop or data changes, you can use
something called a `watcher`! Very simply: a watcher is a function that's called
by Vue whenever a specific prop or data changes.

## Watchers

I'm not gonna lie. Watchers *kind of* get a bad reputation. But there's nothing
wrong with them. The problem is that, a lot of times, people use watchers
when there's actually a *better* solution available. For example, look
back at `search-bar`. Remember: we're using `v-model` in the template to bind our
input to the `searchTerm` data. I also added `@input` so that, down here, we
could emit the custom event.

Another way that I could have done this is, instead of listening with `@input`,
I could have added a watcher for `searchTerm`: a function that is called whenever
that data changes. Then, whenever `searchTerm` changes and my watcher function
was called, I would emit the custom event.

The reason I *didn't* do that is, as I just said, watchers are kind of your
last resort. They're not as performant as other parts of your system. In this
case, listening via `@input` was *better* than adding a watcher on `searchTerm`.

But looking back in `catalog`, there's simply *no* other solution. We need to run
code when the `currentCategoryId` prop changes. And we can't use a computed
prop called `products` because the code we need to run is async. *That* is why
we're going to use a watcher.

Let's do this next!
