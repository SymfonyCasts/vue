<<<<<<< HEAD
# Debouncing: Data can Hold Anything
=======
# Debounce

Coming soon...

Well, the only problem is that we've made our search too awesome. I type really fast.
You can watch those are Ajax requests. That's keeping drag over that made 4 Ajax
requests. Whenever we type anything in is firing, uh, requests on us, no matter how
fast we type every character fires a request. Um, and so it's just kind of flooding
our API unnecessarily with AGL Ajax requests. So we probably want to do instead is,
uh, wait until the user stops typing. Maybe just wait until 200 milliseconds has gone
by, without the user typing. This is something called debouncing. And it's a very,
very common thing. And I want to see how we can do this inside of Vue. We're going
to use it `setTimeout()`.

So the cool thing is we're going to do this entirely entitled instead of search bar.
We're just going to delay emitting this event until we're sure that the user has
stopped typing. The great thing about doing it in search bar is our catalog code.
Isn't going to need to change at all. It's just waiting for the search bar to notify
us that the search has changed. So very simply down here, I'm going to say `setTimeout()`
and I'm gonna pass this in arrow function and then move our code inside and set it to
200 milliseconds. So now instead of it emitting this event immediately, it's gonna
wait 200 seconds and then admit it. One important thing here is that we're using
an arrow function. You have to use an arrow function here. If you use a normal function, this
will not be your view instance.

Now some of you are probably already realizing that this isn't going to quite work
all around refresh for sure. If we type really fast, it's still sends a four Ajax
requests over here. It just delayed all them 200 milliseconds before we did them. So
when you do debouncing, what you really want to do is when on input is called, if
one of these timeouts is waiting to, we actually want to cancel it and restart the
timer to do that with set timeout, we basically need to set the return value of set.
Time out is a handler that we can use, um, to clear the timeout. So we basically need
to set the set time out to a variable. The, the one, the only kind of trick with this
is that we need a place to store the timeout handler. And easiest thing to do is
actually to add it as data. So I'm going to add a

`searchTimeout` set to `null` data. And then down here, or we can say,is
`this.searchTimeout = setTimeout(...)`. And then the top of the function we can
say, if `this.searchTimeout`, I'll say `clearTimeout(this.searchTimeout)`
 So we have one set and then go ahead and clear it and just to
make sure things are really clean here, uh, after we admit the event, we'll say 
`this.searchTimeout = null`. So if we type really, really fast it, the second time we
call this, it should actually clear the timeout. And then down here, it will restart
it just to go back over now, refresh just to be sure and type really fast, boom, just
one Ajax call down here for our categories that works perfectly. Now, this is in some
ways it's kind of struck, strikes me as a bit of an abuse of data. Um, search term
timeout. Isn't really something that we're using in a reactive way. We don't need a,
whenever we change search timeout, we don't need our template to rerender or anything
like that, but really it's fine. It's searched how it is something that is just a
piece of data that we need, uh, to be able to have on our instance. And we need to be
able to change on our instance, even though we're not using it, like in our template
to do something it's totally fine and works really well. Next, let's reflect a little
of our code into hellebores.
>>>>>>> origin/master

The only problem is that we made our search *too* awesome. When I type...
wow! Look at those are AJAX requests - one for *every* character I type. It's,
sort of unnecessarily flooding our API.

This is a common problem with a common solution: debouncing, which is *almost*
as fun as it sounds. With debouncing, instead of sending an AJAX request after
*every* letter, we wait until the user *stops* typing - maybe 200 milliseconds -
and *then* make the request.

The *cool* thing is that we're going to be able to add debouncing *entirely* inside
of the `search-bar` component. This means that our catalog code won't need to
change at *all*; it will *instantly* be able to take advantage of it.

How can we do that? By delaying the custom `search-products` event until the user
is done typing.

## Adding the setTimeout()

Start by adding `setTimeout()`, passing it an arrow function, then moving the
`$emit` call inside. Set the timeout to 200 milliseconds. Now, instead of emitting
the event immediately, it will be *slightly* delayed.

Easy peasy! Oh, and the arrow function is important: if we used a traditional
function, the `this` variable wouldn't be our Vue instance. Silly JavaScript!

Now, some of you probably realize that this isn't going to *quite* work yet.
If we refresh... and then type really fast. Ah! It *still* sent four AJAX
requests... it just waited 200 milliseconds before making each them. Whoops!

## Storing and Clearing the Timeout

To get debouncing to work, what we *really* need to do is, `onInput()`, if a
timeout is currently active and *waiting* to be called, we need to *cancel* it
and restart the timer.

To do that, we need to keep track of the return value of `setTimeout()`: it's
a "timeout id". Then, the next time `onInput()` is executed we will call
`clearTimeout()` and pass it that id.

None of this is too complex... but I *do* have one question: where should
we store this "timeout id" so that we can reference it later? The easiest thing
to do is to store it as data.

Add a new data called `searchTimeout` set to `null`.

Then, in the function, say `this.searchTimeout = setTimeout()`. Now that this is
stored, at the top of the function, *check* if it has a value: if
`this.searchTimeout`, then `clearTimeout(this.searchTimeout)`.

Oh, and to round this all out nicely, once the callback *is* finally called, we
can reset the `searchTimeout` back to null.

Now, if we type really fast, the second time `onInput()` is called, it will
*clear* the timeout, and then, below, start a *new* one.

Let's try it! I'll refresh to be sure then... type super fast. Yes! Just one AJAX
call down here to the categories API. That's *beautiful*!

## Non-Reactive Stuff on Data?

For me, the most interesting thing about what we just did is that, in some ways,
storing `searchTimeout` as *data* seems like an *abuse* of data. Normally
we put something in data because we want it to be *reactive*: when that value changes,
we want any component that uses it to re-render. For `searchTimeout`... we don't
really need that! We just needed a place to *stash* that value. But... this is *fine*.
The main purpose of `data` *is* to store "reactive" data. But if you need a place
to store something else, go nuts.

Next, if we have some business logic that we want to re-use between components,
where should that live? Let's take our organization up to the next level!
