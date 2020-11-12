# Add To Cart

Coming soon...

Great. We have a

Really killer product catalog and product show, page

Pages. We're really

Ready to start adding products to our cart, to help with this indie tutorial
directory, which you should have. If you download the course code copied the current
service file into our assets /services directory

Real quick,

Like product category and color. Clark is one of the resources in our API, which you
can say, if you go to local host colon 8,000 /API,

Yeah.

Each car has an ID, which you would, you need to fetch that cart or add items to it.
Now on the server, we're setting the current users cart ID in the session. If there
is one in dumping that onto the page as a global variable, I can actually go view my
source on the page right here. And if I searched for a cart, there we go. Window, not
cart. I R I = no, because right now we don't have a cart. And as soon as we added a
something to our cart, that would suddenly have the, I R I for our cart.

Okay.

Hard to service at JS as a number of methods on it for fetching the cart, uh, and
adding items to the cart and so on. And this method is actually smart enough to read
that global cart. I R I variable if there is one and use that, or it will create a
new cart. If there isn't one already specifically down here in this add item to cart,
this is where it actually checks to see, Hey, if we don't have a car, if we do have a
cart, let's update it. If we don't have a cart, let's create

You ate one. And

In reality, the entire card itself is stored in the session, not in the database,
that's not really important. And in a real app, I would store the cart in the
database. But if you want to see how to create an API platform resource that uses
your session as a data store, instead of the database, you can check out the code in
this project. But the big point is from a JavaScript perspective,

Okay.

Our API works like anything else. So here's the plan In product show. We're going to
first load the cart object from an Ajax call. Once we have that, we'll use it to add
new items to the cart.

Let me show you that. Add item to cart method has the cart object as its first

Argument. Part of the reason why that's needed and not just the cart IRI is so that
if we add a product to the cart, that's already in the cart, we can actually read its
quantity and increase its quantity, uh, in the cart.

If our API could do that for us, that would simplify life here, but I'm purposely
trying to see how we can overcome imperfect situations from inside of our JavaScript,
by the way, you could simplify part of what we're about to do by rendering the entire
cart as the global variable, instead of just the cart ID. So in templates and based
at each time, a twig down here at the bottom, this is actually where I'm rendering
the cart IRI. And if we actually rented the entire cart, uh, object as JSON, it
would, it would allow us to, that would make our life easier. So in general, keep in
mind that the more data you pass from your server into view, the less Ajax calls view
needs to make to get set up. And a couple of times here, I'm sometimes doing things
the harder way, just so that we configure out how we're kit, but it'd be easier to
just do the whole object. Anyways, let's get let's load the cart inside of a product
to show dot view. So first down and data, we are going into a new piece of data
called the cart. This is what we're going to keep track of what the cart currently
is.

[inaudible]

And then down here in a sync created, I'll actually go to the top here. I'll say
fetch cart, and actually let me auto-complete that. And I want to get the one from my
services. Actually, let me take this opportunity right now to go to my tutorial
directory, right? Click on this and say Mark directory as excluded. I don't actually
want PhpStorm to be reading from that directory anyways, when I auto completed that,
right then just as a reminder, that did add the import for fetch cart up here.
Anyways, we can say fetch cart dock, and then because fetch cart returns a promise
that resolves to the cart object and want say this.cart = a cart. Now, if you're
wondering why I'm not using a weight, I'm doing that on purpose. I don't want to, um,
I don't want to make this first AGS wait for this purchase. It's called a finish and
then start the second Ajax call. Um, by doing this, we will start the first AGS call
and then immediately start the second AGS call for product. And then once this one
finishes, it will be called. So I'm using the traditional promise index here just to
avoid it, blocking the fetch one product Ajax.

Anyways,

That's really enough for us to kind of see what's going on. So let's refresh the page
here and I'll go over to my view, dev tools, go to components, click on product show
and

Cool. You can see,

I see that I do have a cart object with an items key, but it's empty right now
because in reality, I don't even have a cart yet.

No,

But at least gets initialized to the sort of empty object.

All right. So first when we click it,

And one thing that we want to prevent is that cart object is being loaded.
Asynchronously is we don't want someone to hit add to cart before we have the cart
object. So we can fix that really easily. By going up to the add to cart button, and
here we can say, colon disabled set to cart = equal notes. We don't have a cart, it
should be disabled.

And

Now we can hook up the real functionality we want, which is that on click, let's call
it a new add to cart method down here. Let's add that method. I'll go down to the
bottom

That the ads add a cart. This one

Won't take, don't need any arguments here. And what we're gonna do here now is
actually call that add to cart method from inside of our cart service. So I'll say

Add item to

Cart. I'll hit tab to auto, complete that again, it's a little redundant, but I just
want to show you that that did add the import

Or up here.

I'm the cart and what we need to pass. This is going to be the cart object, which we
know is going to be this.cart. And we know that it's safe to reference that because
we know that in practice, this add to cart method is not going to be callable. Um,
until the cart is loaded because the button will be disabled.

So

This, that cart, and then we need a pass.

The

Yeah. And what would, this actually is each item in the cart is actually three
things. It is the product IRI, which we can set to this.product, less racket at ID,

The color,

Which for right now, I'm going to set to Nolte or about that in a second and a
quantity, which I will set to one. Now, if you look confused, why I know fields to
put there again, this is just how my API is designed. So if I go back and look at the
cart API and look at the put end point here, and the put end point allows us to, uh,
add a product color and quantity and array of those objects inside of here. So that's
what we are passing

[inaudible]

All right. So that should be it. Let's actually see if this works. So let me refresh
one more time. Fresh. I'm going to add a cart and I think it worked. I don't see any
areas here. You can actually see the Ajax call was successful down here for post /API
/cart. Since we don't have a car yet to refresh [inaudible]

And check the carton data and Oh, you can see it's actually still empty. This is
actually a little bug I've been seeing on my computer. I wanted to show you in case
any of you hit it. You actually look at the source code right now. You see the window
dot cart. IRA is still no. The problem is that I use local host colon 8,000 for tons
of projects. And since I'm using on HTTP, which means I already have cookies from
other projects. And since I'm using this on HTTP, it's actually rejecting my cookie
in favor of those existing secure cookies. Long way of saying, if you get this, you
can actually go into application and clear your storage completely. So this is
basically clearing my session storage. Now I'm going to refresh, I'll go back to the
view data tools. I'm going to add a cart one more time.

This time when I refresh. Yeah. So you can see actually up in the header, it says
shopping cart one. And if we look at the view tools down here, yes, our cart has one
item in it with quantity one. So that kind of, we had that quantity thing going, I'm
going to hit add a cart two more times and you actually see that this header doesn't
update yet. We're going to fix that soon. But when we refresh now, it says three and
our cart here still has one item in it. But now that one item has quantity three. So
yes, we are adding things to our cart.

[inaudible]

So next, let's make this fancier with some animations, hook up the quantity and color
selectors for products that need a color and somehow update this cart header
immediately, whenever we click add to cart. So we don't have to wait for it to
refresh.

