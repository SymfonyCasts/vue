# Faking AJAX calls: Reading Synchronously

The `categories` data is now available as a global variable: `window.categories`.

In `sidebar.vue`, we're calling `fetchCategories()`, which lives in our fancy
new `categories-service` module. You can find this at
`assets/js/services/categories-service.js`.

To switch this from an AJAX call to the global variable, just `return window.categories`. 
Celebrate by removing the `axios` import on top.

[[[ code('cf391754d1') ]]]

*This* is what I like about centralizing the `fetchCategories()` method: we don't
need to run around and change our code in a bunch of places: just here. Well...
that's not *quite* true yet. One problem is that our function does *not* return a
`Promise` anymore! It now returns an array. That could affect code that uses this.

## Whoops! We're Returning Different Data

But... let's ignore that for a moment! Move over and refresh. Bah! It's broken:

> Cannot read property `hydra:member` of undefined

We *did* change the function from returning a `Promise` to returning an array.
But that's actually *not* what broke our code! The *real* problem is that, down
in `created()`, `fetchCategories()` no longer gives us a `response` object with
a `data` key!

Let's back up: it's actually *ok* to use `await` on a non-async function:
JavaScript just grabs the return value from the function and gives it to us: no
error. The *real* problem is that the value that the *previous* code gave us was
a `response` object... but *now* we're returning an *array* of categories.
This means that `response.data` is undefined!

The simplest way to fix this is right here: comment out the old `this.categories`
line and directly say `this.categories = fetchCategories()`. We don't need
the `await` anymore, but it doesn't hurt anything.

[[[ code('ea9c97e2f6') ]]]

Simple enough! Back on the browser, it's *already* showing the categories on the
left. And if we reload... yes! The categories are *instantly* there! Woo!
There *is* still a slight delay before the styles load, but that will only
happen in dev mode: we did that to allow hot module replacement. So, mission
accomplished!

## Returning a Promise from the Sync Method

One of the cool things about isolating our AJAX calls into functions like
`fetchCategories()` is that, when we call that function, we don't need to know
or care if it's talking to an API, or which API, or if we're just loading the
data locally from local storage or a variable.

But... that's not really true right now. Because when we changed this from
using the API to the global variable, we changed what this function returned!
We changed it from returning a `Promise` to an array and we *also* changed the
actual *data* that's returned from a `response` object with `data` and
`hydra:member` properties to an array. This meant that, once this function was
synchronous, we needed to update any code that called this.

And... that's fine. If you know that you're going to load categories
synchronously via `window.categories`, then you can just update your code to
reflect that. It's not a huge problem.

But when we changed to the global variable, we could have *also* written our
function in a way that *did* not break any code that used it: we *could* have
returned a `Promise`.

Let's try that: `return new Promise()`. This needs one argument: a callback with
`resolve` and `reject`. If you've never seen a `Promise` like this, check out our
[ES6 tutorial](https://bit.ly/sfcasts-promises) all about them. They're *fascinating*.

[[[ code('85aeae5467') ]]]

Anyways, once our work is done - which will be *instantly* since we don't need
to make any AJAX calls, call `resolve()` and pass it the *data* that we want the
promise to return. Now, we're not *really* making an AJAX request... so we can't
*exactly* return the same data as before because... we don't have a response. But
we know that what we *really* care about is that this Promise returns a object with
a `data` key and a `hydra:member` key below it. Let's at least fake that here: add
`data` set to an object and `hydra:member` set to `window.categories`. I'll
remove the extra return at the bottom and, above the function, once again, advertise
that we return a `Promise`!

[[[ code('cd3cc884a1') ]]]

Now, back in `sidebar.vue`, we can revert all of our changes and use the
*exact* code we had before: `const response = await fetchCategories()`.

And... that's it! The `Promise` *is* a little funny... because it will *always*
resolve immediately. But that's fine! When it resolves, it will return data
that's not *exactly* the same as an Axios response, but it's close.

Moment of truth! At our browser... it *looks* like it's working. Let's refresh.
Yes! It *definitely* works. So this is a *great* way to get dynamic data from
your server *without* needing an AJAX call when you *really* want something to
be available almost instantly.

Next, let's use the categories data and `currentCategoryId` to print the *name*
of the category on each page. To do that, we'll need to make sure all of
that data lives in the right component.
