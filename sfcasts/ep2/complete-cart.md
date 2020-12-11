# Complete Cart

Coming soon...

To render real product data on the cart page. We need more data than the original
cart API is returning. So the goal is to wait for that Ajax called to finish, collect
the product IRI of each cart item. Then make a second Ajax request for those product
details. Normally waiting for one Ajax call to finish before starting another one is
easy, but in this case, the card Ajax call lives in the mixing in created, and this
new code needs to live in our shopping cart component.

Okay.

Probably also in created, but after the original AGS call finishes. So how can we run
code after the cart? AGS call finishes. The answer is a watcher. Remember a watcher
is a way to run a function whenever a piece of data changes, but we ran, but we
rarely use them because there are usually other and better ways to do things like
listening to an event. But in this case, a watcher watching for one, the cart data
changes is probably our only option.

Okay.

Add a new watch key with a cart function inside. Now in here, what we want to do is
get an array of all the product iritis with const product IDs. I also need to mention
that this function won't be called until it is set, = this.cart dot items, that map.
And then I'll put a little call back here with an item argument and I'll use the very
short syntax, equal->item dot product. So this will loop over all of the cart items,
call this function one time and the function will always return item dot product, and
it will return that into the array. So a fancy way of creating an array with just the
product I R I strings.

Then we can use that new function we copied a second ago. So I will say const
products, response = await, and I'll use that fetch products by ID function graded a
second ago. Now returns a promise, which is why I can use a wait and I'll pass this
my product IVs. And of course, as I added a weight there, this needs to become an
async function. And just to see what that looks like, let's console that log the
products response. Cool. Let's try it. Move over. I will refresh go to the console
and nice here is the response things. The inside there is something called data and
inside data, hydrocarbon member is where we actually see our product details. The
second thing that I,

Oh, well actually, I'm also going to go back here real quick and just log vis dot
cart in addition to that. So I want you to see what the cart looks like as a
reminder. So each card has an items key and each item just has color product and
quantity. Of course, the problem being that the product is an IRI and a color. If it
has a color is also just the IRI. So here's the plant looping over this cart dot
items inside of our template is not very useful because it doesn't contain beginning
because it contains so little details. Instead, I want to create a new array of cart
items that has the same structure as this, but with more data like the product object
and the color object, instead of just the, I R I strings, then we can loop over that
in the template. So check this out, back in our component,

I'll remove the log and say constant products = product response, that data left
square bracket, hydro colon member to get down to where the actual data is stored.
And now I'm gonna create a new object called constant complete items. This is going
to be kind of cool. I'm going to set this to this.cart, that items, that map. So once
again, this will loop over every item and it will call our function. So cart item
over the argument, and just like last time I'm going to use these short syntax here.
Uh, but it's going to be multiline. So I'll use a parenthesis.

And then inside of here, I'm going to return an object. So just as a reminder, when
you use this short syntax here without a curly brace, what this means is that there's
an implied return statement. So this function is going to return, whatever object I
put here. So complete items will eventually be an array of these objects that we've
put here. And what I'm going to put here are the same keys that we currently have in
the cart. So product, but this time I'm going to set it to the product object, which
we can use the, this array up here to find that. So I say products that find, once
again, we'll put a little->function, their product does the argument and we'll
return. We want to return the one where product left square bracket at ID. Okay.
That's where the IRI is stored on there equals, = = cart item, that product, which we
know holds the IRI. So we'll find the one product that matches the IRI that we know
is in our cart now for the other things for color. Okay.

For color.

I'm just going to set this to, for now to cart item that color. That's still an IRI
string. We'll need to fix that later. And then for quantity, that is simple enough
cart item quantity. All right, after this, I'm going to console that log, the
complete item.

All right, let's move on now.

And don't even need to refresh. It's already down here, three items in there and
check this out much more useful. So you can see that we have still a color IRI, but
our product is now actually in object. So if we loop over this, we're going to be a
lot more dangerous. So the question now is I want to be able to access this complete
items from our templates so we can leap over it. So what's the best way to do that?
Well, a simple thing would be to add this as data, we could add a new, complete
items, data up here, set it in this cart function, and then reference it in the
template,

Easy button.

There's something about that. That bothers me.

What is it, duplicated data.

If we set this complete items onto data, then the kind of cart items itself, their
product IRI color IRI and quantity would be duplicated in two places. They would be
reflected in the complaint items, but they would also be on the cart to data itself.
And remember, even though these one of these lives in lives in a Mixon and one lives
in a component they're effectively inside the same component. So duplicated that data
in two places, and we never want to store a piece of data in multiple places, because
if we later change a piece of that data, it will change in one spot, but not the
other. So it's really no different than a database, right? You would never want to
start two pieces of data, uh, a piece of data, two places of database, because they
could get out of sync. So let's be smarter. The only new piece of data here is
actually the products data that we get back from the Ajax. If we store that as data,
we could still get access to this nice, complete items, array in the template via a
computed property. Let me show you, let's start by adding a new products data. So
I'll add a new data key here, which is a function,

And I'm going to return an array with

Products and we'll initialize it to know. Now down below, we will set that. So
instead of cons products, I will say this stock products equals, and then we can
reference this got products below, inside of our loop. And that should do it. Now,
check this out. We can move

The goods,

Middle chunk of this logic into a computed prop called complete cart. So I'll add a
new computed key

Inside of there a new

Method called complete cart. And the first thing I'm actually going to do inside of
here is if anybody calls this before the car is actually loaded, I don't want to do
anything. So I'm going to say, if not this.cart, so if the cart isn't there, or if
not this stop products, if we also haven't finished loading the products, then I'm
going to return. No. So if the complete car returns, no, it basically means that, uh,

Um, we're not done loading yet now

To copy all this complete item stuff from watch,

Hey, sit up here. But instead of logging, let's return a new object. We'll make this
look like the cart. Remember the cart has an items key on here. So I'll say items set
to complete items. All right. So that should do it. So to follow the flow here, once
our cart has initially loaded the Watcher's going to call our function, we will then
make an Ajax request for the products. And then finally, in our template, we are
going to reference this complete cart, which we'll use that data once it's available.
Remember one of the magic things about, uh, computer properties is that it view will
automatically rerender once any of the things inside of it, like this.card of
this.products changes, let's go to our template. And we just need to basically update
a bunch of stuff from cart to complete cart And actually get a copy of that changed
on the VF

Inside the V4

Down here to prove it's working cart, item cart ended up product is now going to be
an object. So I'll print cart, that product, current item dot product, that name, and
then one more spot down here for the empty shop McCart. All right, let's try it move
over and didn't even need to refresh it is already printing correctly. I know it
doesn't look that impressive yet. We just put together a lot of data. If we look at
the view dev tools, as you can see that we have the cart and we have the product
stuff done here and with his beautiful completed cart, our computer property, that
allows us to get what we need in our template without actually duplicating anything.
So next, we're still missing one piece of data inside of our complete cart. And that
is the color. This is still a color. I R I, what we needed the color data, because
that's going to contain the hex color so we can print that a little bit nicer on the
screen. So let's fix that next and learn how we can send both the color Ajax call and
this product's Ajax call in parallel instead of one waiting for the other.

