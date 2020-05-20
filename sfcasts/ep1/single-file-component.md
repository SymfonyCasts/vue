# Single File Component

Coming soon...

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

