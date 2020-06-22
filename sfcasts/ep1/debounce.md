# Debounce

Coming soon...

Well, the only problem is that we've made our search too awesome. I type really fast.
You can watch those are Ajax requests. That's keeping drag over that made for Ajax
requests. Whenever we type anything in is firing, uh, requests on us, no matter how
fast we type every character fires a request. Um, and so it's just kind of flooding
our API unnecessarily with AGL Ajax requests. So we probably want to do instead is,
uh, wait until the user stops typing. Maybe just wait until 200 milliseconds has gone
by, without the user typing. This is something called D bouncing. And it's a very,
very common thing. And I want to see how we can do this inside of view. We're going
to use it set time out.

So the cool thing is we're going to do this entirely entitled instead of search bar.
We're just going to delay emitting this event until we're sure that the user has
stopped typing. The great thing about doing it in search bar is our catalog code.
Isn't going to need to change at all. It's just waiting for the search bar to notify
us that the search has changed. So very simply down here, I'm going to say set time
out and I'm gonna pass this in->function and then move our code inside and set it to
200 milliseconds. So now instead of it emitting this event immediately, it's gonna
wait 200 seconds and then admit it. One important thing here is that we're using
an->function. You have to use an->function here. If you use a normal function, this
will not be your view instance.

Now some of you are probably already realizing that this isn't going to quite work
all around refresh for sure. If we type really fast, it's still sends a four Ajax
requests over here. It just delayed all them 200 milliseconds before we did them. So
when you do D balancing, what you really want to do is when on input is called, if
one of these timeouts is waiting to, we actually want to cancel it and restart the
timer to do that with set timeout, we basically need to set the return value of set.
Time out is a handler that we can use, um, to clear the timeout. So we basically need
to set the set time out to a variable. The, the one, the only kind of trick with this
is that we need a place to store the timeout handler. And easiest thing to do is
actually to add it as data. So I'm going to add a

search

timeout set to no data. And then down here, or we can say,

is

this, that search time out = set time out. And then the top of the function we can
say, if this.search time out, I'll say clear time out

that search them out. So we have one set and then go ahead and clear it and just to
make sure things are really clean here, uh, after we admit the event, we'll say this,
that search time out = no. So if we type really, really fast it, the second time we
call this, it should actually clear the time out. And then down here, it will restart
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

