# Faking AJAX calls: Reading Synchronously

The `categories` data is now available as a global variable: `window.categories`.

In `sidebar.vue`, we're calling `fetchCategories()`, which lives in the fancy
new `categories-service` module. This lives at
`assets/js/services/category-service`. To switch this from the AJAX call to the
global variable, just `return window.categories`. And we can celebrate by removing
the `axios` import on top.

This is what I like about centralizing the `fetchCategories` method: we don't
need to run around and change our code in many places, just here. Well... that's
not *quite* true yet. One change is that our function does *not* return a
`Promise` anymore! It now returns an array.

## Whoops! We're Returning Different Data

But... let's ignore that for a moment! Move over and refresh. Bah! It's broken:

> Cannot read property `hydra:member` of undefined

We *did* change the function from returning a `Promise` to an array. But that's
actually *not* what broke our code. The *real* problem is that, down `created()`,
`fetchCategories()` no longer returns a `response` object with a `data` key!
It's actually *ok* that we use `await` on a non-async function: JavaScript just
sends us what that function returns. The *real* problem is that the *previous*
code gave us a `response` object... but *now* we're returning just the array of
categories. Calling `response.data` isn't right.

There are two ways to fix this. First, we could comment out the old `this.categories`
line and directly say `this.categories = fetchCategories()`. And we don't need
the `await` anymore.

Simple enough! Back on the browser, it's *already* showing the categories on the
left again. And if we reload... yes! The categories are *instantly* there! Woo!
There *is* still a slight delay before the styles load, but that will only
happen in dev mode: we did that to allow hot module replacement.

## Returning a Promise from the Sync Method

One of the cool things about isolating our AJAX calls into functions like
`fetchCategories()` is that, when we call that function, we don't need to know
or care if it's talking to an API, or which API, or if we're just loading the
data locally from local storage or a variable. We don't need to care at all.

But... that's not really true right now. Because when we changed this from
using the API to the global variable, we changed what this method returned!
We changed it from returning a `Promise` to an array and we also changed the
actual *data* that's returned from a `response` object with a `data` and
`hydra:member` properties to an array.

So... this is fine. If you know that you're going to be load categories
synchronously via `window.categories`, then you can just update your code to
reflect that. No problem.

But when we changed to the global variable, we could have *also* written our
function in a way where it *did* still return the same value as it did before.
In other words, we can make it return a `Promise`.

To do that, return a new `Promise()`. The `Promise` takes a callback with two
arguments `resolve` and `reject`. If you've never seen a `Promise` check out our
[ES6 tutorial](https://bit.ly/sfcasts-promises) about them. They're *fascinating*.

Anyways, once all our work is done - which will be *instantly* since we don't need
to make any AJAX calls, call `resolve()` and pass it the *data* that we want the
promise to return. Now, we're not *really* making an AJAX request... so we can't
*exactly* return the same data as before because there is no response. But we
know that what we *really* care about is that this Promise returns a object with
a `data` key and a `hydra:member` key below it. Let's at least fake that here: add
`data` set to an object and `hydra:member` set that `window.categories`. I'll
remove the extra return at the bottom. Above the function, once again, advertise
that we return a `Promise`.

Thanks to this, back in `sidebar.vue`, we can revert our changes and use the
exact code we had before: `const response = await fetchCategories()`.

And... that's it! The `Promise` *is* a little funny... because it will *always*
resolve immediately. But that's fine! And when it resolves, it will return data
that's not *exactly* the same as an Axios response, but it's close.

Moment of truth! At our browser... it *looks* like it's working. When we refresh...
yes! It *definitely* is. So this is a *great* way to refactor dynamic data from an
AJAX call to data set by your server when you need something to be available
nearly instantly.

Next, let's use the categories data and `currentCategoriId` to print the *name*
of the category on each category page. To do that, we'll need to make sure all of
that data lives in the right spot.
