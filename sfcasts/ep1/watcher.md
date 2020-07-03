# Watcher

Coming soon...

So one of the things that we need to know on every page load is what the current
category is. And the way that we handled that was that we actually pass that from the
server into Vue, by setting a `currentCategoryId` as a global variable. And then we
use that in our application and actually to make that a little bit easier, we even
set up this `page-context` service that reads that global variable, but we can just
call, `getCurrentCategoryId()` from the service to get that. Now we use that in
two places. We use that as a highlight, which a category is active on the sidebar. We
also use that to filter the products. So what we could have done is that we could
have just called `currentCategoryId` and every component that needed that. Like for
example, in `sidebar.vue`, where we need the current category, we could have just
called imported the `page-context` and called `getCurrentCategoryId`.

And then we could have done the same thing in catalog. Here's another spot where we
need to know that we could have just imported that to `page-context` and called that
method on it. And we could, and it's safe to do that. We didn't do that, but it would
be safe to do that because the `currentCategoryId` is not something that changes. So
we don't need, it's not one of those things where we it's going to change and we need
our component to rerender. So that's why we saved just to grab that from a service.
However, I knew that eventually I probably would want my category ID to be able to
change dynamically and have the rest of my code update. So whenever something,
whenever we need some data to change and then our components to rerender, we know
that that piece of data needs that that thing needs to live as data and looking at
our component tree over here, if our, both our `<Catalog>` and our `<Sidebar>` would need
that, it would mean that that data would need to live on `<Products>`.

By the way, in Vue 3, it is possible to have a have, uh, your data stored in
some outside, uh, module like this and have it be reactive, but Vue 2, if you want
something to be reactive, it needs to live on data. So if we wanted to be able to
change `currentCategoryId` it means that data would need to live on `<Products>`. Now we
plan ahead a little bit. If you look inside of our `products.vue` the 
`currentCategoryId` is actually a computed property, which just calls a hold command or
control, which just calls this service here. So I sort of faked it. `currentCategoryId`
is not data, but I have a `currentCategoryId` computer property, and I'm passing that
into my catalog. And it's my sidebar. So I already kind of architected the passing
down to the props so that I could easily change it later. So anyway, yeah. Now I
actually do want to change that `currentCategoryId` to data, and it's going to be so
simple. So down here, I'm going to remove this computed property and up here going to
set a new data called `currentCategoryId`, and I'll set its initial value to 
`getCurrentCategoryId()`. So I can still use my helper to get the initial value.

Now we'll go over here. Everything still works perfectly cause it's still passing
down in exact same way. The cool thing is I can now go to products and let's go down
here to current category ID and let's see, let's try to change that to 24 and foam it
changes. You can see that it highlighted here and it updated there, but what it
didn't do is change the list of products. We'll check this out again. I'll change it
to 25. For me, your numbers will probably be different updates here up it's there. It
does not update the products. Why? So let's look inside of `catalog.vue`. This is
the element that has the well down here. Of course, the `products` data,

and the thing is the `products`. Data actually depends on two things. If we go down to
our load products, this is a method that actually makes the Ajax call. The products
depend on the `searchTerm`. And they also depend on the `currentCategoryId`, which
means that when either of these things need to change, we need to recall load
products so that it will make the new Ajax request. Now search term was really easy
because our search bar was already emitting an event. So I'll scroll up here a little
bit to our search bar, search bar already emits an event whenever our search changes
and we call the `onSearchProducts()` and then we can just call it `this.loadProducts()`.
So there's already a hook point. There's already an event that when that event
happens, we just call `loadProducts()`, but this, but w how can we run code when 
`currentCategoryId`, when that prop changes? Well, here's the answer when there is no other
way to do something, when you simply must execute use code, when a prop or data
changes, you can use something called a watcher.

Now, Watchers kind of get a bad reputation. There's nothing wrong with Watchers. The
problem is that a lot of times people use Watchers when there is actually a better
solution to use. Like, for example, if I look back in search bar, remember we are
using the `v-model` up here to bind our input to this search term. I also added this
`@input` so that down here, we could actually emit the event. Another way that I
could have done this is instead of having this `@input` here, I could have added a
watcher and S for `searchTerm`, and then whatever `searchTerm` changes I could emit
that event. The reason I didn't do that is, as I just said, watches are kind of your
last resort. They're not as performant as other parts of your system. And so what we
really wanted to do is, and so the input here was actually a better way to handle
that. But looking back here in catalog, there's simply no way for us to do it. Like
we simply want to run code when this prop changes. So that's why we're going to use a
watcher.

So we are going to use a new option here called `watch: {}`, and we'll watch it as you pass
it an object. And you're going to add a property name. For instance, we want to watch
for current category idea change. We're going to say `currentCategoryId`, and this is
actually going to be a function it's past two different arguments, the new value, the
old value. And for right now, let's just `console.log(newVal, oldVal)` that.

Awesome. So when you go back over here, let's see there's the console. Everything's
clear. I'm going to go over to view. And, uh, since we don't actually have a way to
change the `currentCategoryId` I'm gonna go over here and just manually change this
to 24, hit it, go ahead and cancel and perfect. You can see it's the new value first,
and then it's the old value. So this Watchers want to make this work. So I'm actually
going to delete these two arguments. You usually don't need them instead. We can just
reference the `currentCategoryId` a prop directly. So what we're gonna do here is
just say `this.loadProducts()` and for the search term, I'll just say, `null` for now.
That's not going to be perfect, but this will trigger the low products and the little
products we'll read the new `currentCategoryId`. So let's check it out and I'll go
back over to view here, let's change this to 23 and beautiful with the loading screen
and everything.

I love that we can even change it to null, and it goes to all products. Awesome. Now
the only kind of thing that's a little bit rough here is that if I, for example,
search for disc, actually let me go to office supplies, first, search for disk, and
then figure over to products and change the `currentCategoryId` to B, maybe category
24. It returns everything. You see it didn't, uh, didn't actually apply that to a
`searchTerm` onto the, uh, onto our products. And the reason of course is that we're
passing in our watcher. We're passing a `this.loadProducts(null)`. No. So we're passing,
we're saying, Hey, lo the products with no `searchTerm`. Now, if you look back up here
on data, we don't have `searchTerm` as a data key right now. And the reason is that
until now we didn't need it. All we needed to do was when our `onSearchProducts()` on
search products, uh, method was called. We could take the search and immediately load
the products, and then we didn't need to store the term anywhere for later. It just
wasn't something that we needed inside of our components. But now we do, we need to
store it so that when the `currentCategoryId` changes, we know what the `searchTerm`
is. So what I'm going to do up here is actually Riyadh

Riyadh a `searchTerm` to my data. And then down in on search products, we'll say
`this.searchTerm = term`,

and I'm actually going to remove the term from load products. Cause we can just make
this a simpler. Now I'll take out the argument to `loadProducts` and then down here,
we'll just say `this.searchTerm` instead. Perfect. And then let's see up here and
`created()`. We don't need a second argument and same thing in the `currentCategoryId()`, they
will just use whatever the search term is. Perfect. Let's try it. I actually click on
office supplies to get a forward page refresh here. Well, do disk, uh, click on
products and let's change this to 24 womb. No products found by changes back to
normal for all categories. It works perfectly. Of course, it's not actually updating
the URL here. That's something we'll talk about in the future. We would need a router
for that, where we could actually start clicking these links and then having the URL
change without a full page refresh. But that is for later people, friends, you made
it through our first Vue tutorial. There are more things to talk about. We will do a
second tutorial, but wow, you are incredibly dangerous. I hope you enjoy this
process. As much as I have Vue is a very powerful, very fun tool to work with. And I
hope you guys can use it to build some awesome stuff. Let us know what you're
building in the comments. And as always, if you have any questions, let us know. All
right, friends, see you next time.

