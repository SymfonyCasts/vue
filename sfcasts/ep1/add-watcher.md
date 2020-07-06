# Adding a Watcher

Let's add a watcher! Create a new option called `watch: {}` set to an object
of property names. For instance, since we want to run code when
`currentCategoryId` changes, we'll add `currentCategoryId` set to the function
that will be called. When Vue executes this, it will pass us two arguments: the
new value of `currentCategoryId` and the old value. For now, just
`console.log(newVal, oldVal)`.

Let's see if this works! Move over to the browser: the console looks clear.
Since we haven't *actually* added a way to change the `currentCategoryId` from
within our app, head over to the Vue Dev Tools and change it there.
I'll set it to 24, go back to the console and... yes! You can
see the new value first and then the old value.

## Load Products When currentCategoryId Changes

Back to `catalog.vue`! I'm actually going to delete these two arguments because
I don't need them. Instead, our code can reference the new value directly via the
`currentCategoryId` prop. Ok: when the `currentCategoryId` changes, we want to
call `this.loadProducts()`. For the search term pass `null` for now.
This will trigger `loadProducts()`... which in turn will *read* the new
`currentCategoryId`, get our products back from the server and update the
`products` data. It's a fool-proof plan!

So let's check it out! I'll go back to the Vue Dev Tools, change the data to
23 and... ah! It works! With the loading screen and everything! I *love*
that we can even change it to `null` and it goes to "All products". Awesome!

The only rough part is that if I, for example, search for "disk"...
Actually let's try this under "office supplies". Search for "disk"...
Then go find the `<Products>` component in the Vue Dev Tools and change the
`currentCategoryId` to... let's say `24`.

Ah! It returns everything! It did *not* apply the `searchTerm` on the products.
The reason, of course, is that, in our watcher, we're passing
`this.loadProducts(null)`. Yep, we're saying:

> Hey Vue!, load the products with no `searchTerm`".

And darn it, Vue is following our directions perfectly!

## Suddenly we Do Want a searchTerm Data

If you look at data, we do *not* have `searchTerm` as a data key. Why? Because,
until now, we didn't need it! All we needed to do - when `onSearchProducts()`
was called - was use the `term` to immediately load the products. There was...
no need to store search the term anywhere for later. But now we *do* have a need!
We *do* need to store the `searchTerm` so that when the `currentCategoryId` changes,
we *know* what the `searchTerm` is.

Ok! Re-add `searchTerm` to data. And, down in `onSearchProducts`, say
`this.searchTerm = term`. We can now *remove* the `term` argument from `loadProducts`
and just say `this.searchTerm` instead.

That looks good! Now... let's see: up in `created()`, we don't need any arguments...
and same in the `currentCategoryId()` watcher.

Each will now automatically use the current search term is. Let's try it!

## Try it one more time!

I'll click on "Office Supplies" to get a full page refresh. Search for
"disk"... and go over to the Vue Dev Tools one more time. Click on `<Products>`.
change the `currentCategoryId` to 24 and... wow! No products found! If I change
this back to `null` for "all categories"... it *does* find the product!

Of course, it's not updating the URL when we change the category...
which it probably should. For that, we would need a Vue Router: a key component
of single page apps - or even "mini" single-page "sections" that you might create
on part of your site. With the Router, we could click on these links and have the
URL change *without* a full page refresh. We'll save that topic for another time.

People! Friends! You made it through our first, *gigantic* Vue tutorial! Congrats!
You deserve a snack... and probably some outside time.

There *are* more things to talk about - we'll save those for a future tutorial -
but wow! You are already *incredibly* dangerous. I hope you enjoyed this process as
much as I have! Vue is a *very* powerful, *very* fun tool to work with. So go build
something *awesome*... then tell us about it!

And, as always, if you have any questions, comments or kitten videos, let us know
down in the comments. All right, friends, see you next time!
