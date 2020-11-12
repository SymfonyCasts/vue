# Product Context

Coming soon...

So here's the plan. Make our top level view component, product style view, able to
render either the product list page or the product show page. Right now, it always
renders just this product list page. As I keep mentioning, this kind of thing is
normally done with the view router, which reads your URL and then renders different
components based on the URL for now. We're going to do that same thing ourselves, but
instead of reading the URL to figure out which component we're going to render, we'll
pass some info into view that says, Hey, we are on the product

Show page.

If you look on a template when we're on a specific category page, like for example,
if I click office supplies,

We're

Already passing a current category ID global variable, which our view app reads to
load the correct category. Now we'll do the same thing by adding a current product ID
and the controller. If you actually look on a controller for the show category, the
current category ID is not actually the database ID. It's actually the, I R I, the
kind of /API /category slash

A string.

And we generated that by auto wind, this IRI converter interface thing. So we're
gonna do the same thing down here. I'm going to add IRI converter interface,
arguments, call IRI converter, and then we'll pass the picker

Current product ID set to IRI converter

Arrow, get IRI from item and pass it. The product. This is the product object we're
using the functionality from a Senseo framework, extra bundle to automatically query
for that object.

By the

Way, we could pass the entire product object into the template and then serialize it
kind of similar to what we did with the categories that would help us avoid an Ajax
call for the product data and allow our view after render more quickly, I'm going to
avoid that here mostly just to make our life a bit harder again,

In a template.

We'll do basically the same thing as before. We'll say if current product ID is
defined and window dot current product ID = current product ID, and then we'll escape
it. So it's safe. And JSON though, that shouldn't be a problem L's current
productivity = no.

Cool.

So in theory, if I click into a product over here, we now have that global variable
being printed out in our template back, you can even say, uh, window dot current
product ID.

So how could we read this in our view component? Well, it's a global variable. So in,
we really could just read that anywhere that we want it to and JavaScript via window
dot current product E but in the last tutorial, we were centralizing these global
variables into a services /page context that JS. So those reminder services is a
directory that holds for the most part files that help us with Ajax calls. But in the
case of page contact, instead of reading data from ADSL calls, it's actually reading
the global variables. So let's add a new method here, export a function called get
current product ID, And it will return window dot current product ID. And if we want
we'll even put a, uh, some documentation on there, returns a string on it.

No,

It returns the current product ID. That's set by the server.

Beautiful

To make sure this is all working. Let's render the current product ID inside of our
view component to do that. We need to make it available up here as a variable and
easiest way to do that. Nicest way to do that is via computed prop. In fact, we look
down here and compute it.

All right,

Slide, a new computer prop here

Called current product ID

Here. We'll return get current product ID and I'll hit tab to auto complete that.
Now, when I did that, that actually automatically up here added this new import for
me though. I don't love that it put this on multiple lines, like that's unnecessary,
so I will fix that, but it adds this little import here from that. So, uh, which of
course is important. All right, now that we have a computer property called current
product D let's use this up here.

We'll just put it right. Yeah.

For our catalog. I'll say curly, curly, current product ID. All right. When you move
over, yay. Don't even need to reload. It is already there. Okay, cool. So now how do
we render something different inside of this component based on this? Well, there are
a couple options, including V if, but instead we're going to use something really
cool called a generic component. That's next.

Okay.

