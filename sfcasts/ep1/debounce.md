# Debouncing: Data can Hold Anything

The only problem is that we've made our search *too* awesome. When I type
wow: look at those are AJAX requests - one for *every* character I type. It's,
sort of unnecessarily flooding our API.

This is a common problem with a common solution: debouncing. That's where, instead
of sending an AJAX request after *every* letter, we wait until the user *stops*
typing - maybe 200 milliseconds - and *then* make the request. Let's add this in
our Vue app.

The *cool* thing is that we're going to add this feature *entirely* inside of the
`search-bar` component. How? By delaying the custom `search-products` event until
the user is done typing. This means that our catalog code won't need to change at all.

## Adding the setTimeout()

Start by adding `setTimeout()`, passing it an arrow function, then moving the
`$emit` call inside. Set the timeout to 200 milliseconds. Now, instead of emitting
the event immediately, it will be *slightly* delayed.

Easy peasy! Oh, and the arrow function is important: if we used a traditional
function, the `this` variable wouldn't be our Vue instance.

Now, some of you probably realize that this isn't going to quite work yet.
If we refresh... and then type really fast. Ah! It *still* sends four Ajax... it
just waited 200 milliseconds before making them. Whoops!

## Storing and Clearing the Timeout

To get debouncing to work, what we *really* need to do is, `onInput()`, if one a
timeout is currently active and *waiting* to be called, we need to *cancel* it
and restart the timer at 200 milliseconds.

To do that, we need to keep track of the return value of `setTimeout()` - it's
a "timeout id" and, the next time `onInput()` is executed, call `clearTimeout()`
and pass it.

None of this stuff is too complex... but I *do* have one question: where should
we store this timeout id so that we can reference it later? The easiest thing
to do is actually to store it as data.

Add a new data called `searchTimeout` set to `null` data.

Then, in the function, say `this.searchTimeout = setTimeout()`. Now that this is
stored, at the top of the function, *check* if it has a value: if
`this.searchTimeout`, then `clearTimeout(this.seaarachTimeout)`.

Oh, and to round this out all nicely, once the callback *is* finally called, we
can reset the `searchTimeout` back to null.

Thanks to this, if we type really fast, the second time we call this, it will
*clear* the timeout, and then, below, we'll set a *new*.

Let's try it! I'll refresh to be sure then... type super fast. Yes! Just one AJAX
call down here to the categories API. That's *beautiful*!

For me, the most interesting thing about what we just did is that, in some ways,
storing `searchTimeout` as *data* seems a bit like an *abuse* of data. Normally
we put something in data because we want it to be *reactive*: when the value changes,
we want any component that uses it to re-render. For `searchTimeout`... we don't
really need that: we just needed a place to stash this value. But... this is *fine*.
The main purpose of `data` *is* to store "reactive" data. But if you need a place
to store something else, go nuts.

Next, if we have some business logic that we want to re-use between components,
where should that live? Let's take our organization up a level!
