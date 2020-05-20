# Single File Component

Coming soon...

We've seen the most basic thing you can do with view, you can initialize, view, tell
it what uh, element to bind to and pass it a template string and that.

Okay.

And that actually works. And you notice here when you instate your view, you pass it
in options object and there are numerous different options that you can pass.
Probably one of the most important ones is called data, which only the other options
is actually a function that returns an array or returns another object full of
variables that you want to be available inside of. Um, your template. Now, none of
us, um, yes, Linda's a little bit angry. Sometimes it's temporarily angry cause it
doesn't like my empty line. Just ignore it. Sometimes it's a little bit overeager.
Let's add a new variable. Let's just make one up call first name and I'm going to
initialize that to Ryan to begin to begin with

[inaudible].

Now as soon as we've done that down here, instead of hell of you, we can say hello
curly curly Ryan up currently girly first name. Yes. By coincidence, it actually used
the exact same syntax as twig. Now before we turn this notice, Eastland is still a
little bit angry and it's saying Eastland expected method shorthand. So some of the
keys inside the view options are um, are set directly to bat are our keys that have
said the values like L and template. Other options are set to functions and when you
have somebody to send you a function, you can actually use in objects shorthand,
which is like that just a lot more attractive. It's shorter and that's what you're
going to see me use. All right? To make this little orange thing down at the bottom,
I'm going to temporarily say window. That app = app. What that's going to do is
create a global app variable that we can mess with over in our browser. So let's
refresh here. It renders, so that's already cool and I'm not here though. We can say
app dot first name and you can actually see it already knows that it's Ryan = my
son's name, Beckett. Boom. As soon as you do that it changes and we can change this
over and over again. So view is a lot like twig that at this template that renders
variables, but it has this super power that as we change these data dynamically it's
going to be render itself. And of course that's exactly what we want.

And that's really it. Those are the view basics you already understand effectively
what view does not clean up, how it's removed this window, that add variable cause we
don't need that. And we actually also don't need this app variable up here. I will
just say new view is going to temporarily yell at me cause it thinks that it's a
little weird that I'm instantiating an object and messaging through variable. Ignore
that for now. That's going to go away in a little while. That's just yes. Now the way
that view works behind the scenes is that when it renders this object, it actually
calls a render method on our object in normally. You don't have to worry about what
that render method does. It just takes your template, takes care of everything for
you. But if we can see it one time, it's actually gonna make the you make a little
bit more sense. So at the bottom here, I'm going to add a render function. And what
I'm going to put in here is actually basically the default render function that we,
that that view normally gives us without us having to do anything. And it is
returning to view dot compile this.options dot templates. This is actually a special
way that we can reference this template property here.

Yeah.

That render that call this comma H. Now I know that was totally crazy and I don't
want you to worry about that specifically. I would never expect you to figure out or
care about this. Well basically what you're seeing here is that view as a compile
function where you can basically say compile this template and then you can call a
render method on it. And the render.call thing is basically a fancy way of
effectively saying render and passing at this age variable, this age variables called
hyper scripts. And it's basically engine that helps render things. It's not that
important. So now that we have this render function, we're actually overriding the,
uh, the normal render function. And so we go over and refresh, receive the exact same
things as before, but actually it's calling our render function to get that done. Of
course, if you kind of look at this, you start to wonder why do we have this template
key here at all? We're just referencing it down here. What I mean is we could
actually remove this template function stuff here. I'll say constant template = that
will just create a normal local variable called template and down here I'll just
reference that, right? That should work too. In fact, we go over refresh. It does
work. It works just fine

and what I like about this is that it really you, how simple view is view is nothing
more than a system that says compile a template and then call render on it and pass
it to this data. So we're effectively passing this data into this template exactly
like we would normally do in twig. Of course there's more, it gets more interesting
than this, but that is really what view is a under the hood. Of course if we started
building this application right now and age one doesn't look too bad, but as we
started to have more and more markup, this template would get really ugly. And in
fact this whole file would get really ugly. So for that reason, view has a syntactic
concept called single file components. And in fact, what you likes to do is it likes
you to organize all of your markup like this into little components. So I'm going to
create, because I'm going to go into my JS directory here and create a new directory
called pages. Inside of there, I'm gonna create a new file called products dot view.

Okay,

now that's not new extension. These are very special files that have a very special
format to them. On top, I'm actually going to create a template tag. It's a very
special thing inside of view. And then we'll go over here and copy my age one and
delete my template variable.

Cool.

And then paste it here. And then down here I'm actually going to have a script tag.
And inside the script tag I can write JavaScript. I'm gonna say export default. And
we're going to export, export default, and we're going to export the options array
that we have here. What a specifically I'm going to do is I'm gonna take this data
function and it's deleted out of our main components and move it over here. Now a
high level, the syntax is a bit strange because it's specific to view, but it's
really cool because we actually have a nice area up here where we can create our
template in a nice area here where we can create our data and there's gonna be other
things that we're gonna add there as well.

Okay.

And this is a file that I could actually work with instead of our products that JS to
use this, we can import it. Import app, we'll say app. That's a pretty, it doesn't
matter what that's called from dot /pages /products. And I don't need the, that view
on the end of it because that's going to find that instantly. And then instead of
view dot compile template that render we actually, to simplify this with render
return H

and then it's app.

So this H functions hypermedia has the ability where you can just pass it one of
these single file components and it's just going to render it. So let's try that move
over. Refresh ad we see absolutely no difference. So now things are starting to get
organized,

which means we can start to focus on doing real work instead of this products that
you file. Before we do, one thing I'm always going to put on these files is another
option called name and it doesn't matter what it's called, I'm going to say products
here, something that helps you represent the file. The biggest reason you have his
name, he here is that when you have an error, it's going to be easier to read because
you're going to see that the error is coming from the products components. So always
make sure you put a name key here to help you debug.

The other thing I'm gonna do is that you say this L option here, this tells view that
it should attach itself to the ID = app, uh, element on a page. This, oops, this L
option is totally legal, but a more common thing to see is instead of having an El
option is to initialize, is to initialize the view object and then call a dot dollar
sign at Mount method on it and then say Mount that to app and it kind of makes more
sense to me. So it's kind of create this, this, uh, this view object and now actually
mounted into my dumb and when we refresh that make that works as well. And the last
thing I'm going to do, and this is going to take us to fully the place where the way
that you actually see view applications rendered is that because this render function
just returns a value, we can actually change, shorten the syntax here we can say
render colon and that H equal->age app. So this is a short syntax for a->function
that's going to take an age argument and is going to return age app. So if we see
that at first it might seem like that looks like a crazy function, but now we
understand what that means and this time we move over, refresh. It works. All right,
so next, let's get to work inside of our products that view and really start to bring
this thing to life.

