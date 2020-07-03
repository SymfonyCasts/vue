# Watchers

One of the things that we need to know on every page load is what the current
category is. To handle this, we pass that info from the server into Vue by
setting `currentCategoryId` as a global variable. Actually, to make that
a *little bit* easier, we even set up this `page-context` service that reads
that global variable for us.

We *then* use this info to highlight which a category is active on the sidebar
and *also* to filter the products. One thing that we *could* have done is,
just call `currentCategoryId` in every component that needed that. For example,
in `sidebar.vue`, where we need the current category, we could have just
imported the `page-context` service and called `getCurrentCategoryId`. Then,
we could have done the same thing in `catalog`. And it *would* be safe to do
that because the `currentCategoryId` is *not* something that changes. It's not
one of those things where we it's going to change and we need our component to
rerender. That's why we set it to just grab it from a service.

However, I knew that eventually I would want my `categoryId` to be able to
change *dynamically* and have the rest of my code update. Whenever we need some
data to change and have our components rerender, we need to make this data
"*reactive*". In Vue 2, this means that this needs to be part of a `data`,
a `prop`, or a `computed property` inside of a component. Looking at our
component tree over here, if both our `<Catalog>` and our `<Sidebar>` needed
`currentCategoryId` to be reactive, a sensible way to structure that, would be
to set it as `data` in `<Products>` and pass it down via `props`.

***TIP
By the way, in Vue 3, it is possible to have reactive objects outside of Vue
components.
*** 

The good news is: We planned ahead a little bit! If you look inside of our
`products.vue`, `currentCategoryId` is actually a computed property, which
just calls -I'll hold command or control and click-, this service here. This
doesn't *quite* work because `currentCategoryId` in our service is not *really*
reactive, but I have a `currentCategoryId` computed property and I'm passing
that into my catalog. I *already* kind of architected the passing down to the
`props` so that I could easily change it later.

## Replace the Computed Property for Data

Now, I actually *do* want to change that `currentCategoryId` to `data` for a
reason you're going to discover very soon! Remove this computed property and,
up in `data`, set up a new variable called `currentCategoryId`. I'll set its
initial value to `getCurrentCategoryId()`. I *can* still use my service to
get the initial value.

If we go over here to the browser, everything still works wonderfully! It's
*still* passing down `currentCategoryId` in *exactly* the same way. The cool
thing now is, I can go to products and -let's go down here to
`currentCategoryId`- and change that to, let's, say `24` and... Boom! It
changes!

You can see that it highlighted the correct category in the `sidebar` and
updated the title there! But what it *didn't* do is change the list of products!
We'll check this out again. I'll change it to `25` (notice your numbers will
probably be different) and again it updates in `sidebar` and `title` but it
does *not* update the products. Why?

## Where are our Products Loaded?

Let's look inside of `catalog.vue`. This is the element that has the `products`
data. The thing is, the `products` data actually depends on two things. If we
go down to our `loadProducts` -the method that actually makes the Ajax call-,
we can see that `products` depend on the `searchTerm` and *also* on
`currentCategoryId`. This means that when either of these things change,
we need to *recall* `loadProducts` so that it will make the new Ajax request.

`searchTerm` was really easy because our search bar was already emitting an
event whenever our search changes. We then call the `onSearchProducts()` method
that in turn calls `this.loadProducts()`. There's already an event in place 
that triggers `loadProducts()`. So how can we run code when `currentCategoryId`
changes?

Well, here's the answer: When there is no other way to do something, when you
simply *must* execute code when a prop or data changes, you can use something
called a `watcher`!

## Watchers

I'm not gonna lie. Watchers *kind of* get a bad reputation. There's nothing
wrong with Watchers. The problem is that a lot of times people use Watchers
when there is actually a *better* solution to use. For example, if I look
back in search bar, remember we are using the `v-model` up here to bind our
input to this `searchTerm`. I also added this `@input` so that down here, we
could actually emit the event. Another way that I could have done this is
instead of having this `@input` here, I could have added a watcher for
`searchTerm`, and then whenever `searchTerm` changes, I could emit that event.
The reason I didn't do that is, as I just said, watchers are kind of your
last resort. They're not as performant as other parts of your system which
means that the `@input` here was *actually* the better way to handle that.

Looking back here in `catalog`: There's simply no way for us to do it. We
simply want to run code, and it has to be *asynchronous* code, when this prop
changes. *That's* why we're going to use a watcher.

## Adding a Watcher

Add a new option here called `watch: {}`. You pass it an object that will 
contain some property names. For instance, we want to watch for
`currentCategoryId` changes, so we say `currentCategoryId`, and this is
actually going to be a function that is passed two different arguments: The
new value and the old value. For right now, let's just
`console.log(newVal, oldVal)`. Awesome!

## Check it out in the Console

So when you go back over here, let's see the console... Everything's clear.
Since we don't have a way to change the `currentCategoryId` from within our
application, I'm going to go over to our Vue Dev Tools and change it manually.
Let's set it to 24... hit it... Go into the console and... Perfect! You can
see the new value first, and then the old value. 

## Load Products When currentCategoryId Changes

Back into `catalog.vue`, I'm actually going to delete these two arguments.
You usually don't need them. Instead, we can just reference the
`currentCategoryId` prop directly. What we're gonna do here is just say
`this.loadProducts()` and for the search term I'll just say `null` for now.
This *will* trigger the `loadProducts` which in turn will *read* the new
`currentCategoryId` and get our products back from the server.

## Check it out in the Browser!

So let's check it out! I'll go back over to Vue Dev Tools here and change
this to 23 and... Beautiful! With the loading screen and everything! I *love*
that we can even change it to `null` and it goes to "All products". Awesome!
 
The only rough thing here is that if I, for example, search for "disk"...
Actually let's try this under "office supplies" first. Search for "disk"...
Then go over to products in Vue Dev Tools and change the `currentCategoryId`
to... let's say `24`. It returns everything! It didn't actually *apply* that
`searchTerm` onto our products. The reason, of course, is that in our watcher,
we're passing `this.loadProducts(null);`, so we're saying: "Hey, load the
products with no `searchTerm`".

## Make our Watcher smarter

If you look on data, we don't have `searchTerm` as a data key right now because,
until now, we didn't need it. All we needed to do when `onSearchProducts()`
was called, was take the search and immediately load the products.
We didn't need to store the term anywhere for later. But now we do! We *need*
to store it so that when the `currentCategoryId` changes, we *know* what the
`searchTerm` is.

Let's re-add a `searchTerm` to our data. Down in `onSearchProducts`, we'll say
`this.searchTerm = term`. We can now *remove* the `term` from `loadProducts`
because we can just make things simpler now. Take out the argument to
`loadProducts` and then just say `this.searchTerm` instead. Perfect!
 
Let's see up here in `created()`, we don't need any arguments... And same
thing in `currentCategoryId()`. They will just use whatever the search term is.
Perfect! Let's try it!

## Try it one more time!

I'm actually going to click on "Office Supplies" to get a full page refresh here.
We'll do "disk"... Go over Vue Dev Tools one more time, click on "products" and
let's change the `currentCategoryId` to 24. Wow! No products found! If I change
this back to `null` for "all categories"... It works perfectly!

Of course, it's not actually updating the URL here. That's something we'll talk
about in the future. We would need a *router* for that, where we could actually
start clicking these links and then having the URL change *without* a full page
refresh, but that is for later!
 
People, friends, you've made it through our first Vue tutorial! Woo!

There are more things to talk about, but we *will* do a second tutorial...
But wow! You are *incredibly* dangerous. I hope you enjoyed this process as
much as I have! Vue is a *very* powerful, *very* fun tool to work with. And I
hope you guys can use it to build something *awesome*.

Let us know what you're building in the comments. And, as always, if you have
any questions, please, let us know. All right, friends, see you next time!
