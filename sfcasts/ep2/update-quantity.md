# Update Quantity

Coming soon...

I'm really happy with that. Our, how our cart page is starting to look now, we need
to make the quantity and remove buttons, actually work. Let's start with the quantity
input. First, as a reminder, each of these rows is being rendered in the shopping
cart item component, but the data for the quantity lives on shopping cart, it's under
cart items, and then each item has among other things, the quantity. So that is what
we ultimately need to update. And since we are down here in the shopping cart item
component, to communicate up to this shopping cart component, we need to dispatch an
event. No problem. Over in cart item, let's go into the input and I'll add an input =
and I'll call a new function. I'll update quantity, and I'll copy that now down at
the bottom, we don't have any methods yet. So let's add a method section with update
quantity, which we'll take in of course, an event object, as an argument inside of
here, all we need to do is just emit. So I'll say this.dollar sign that you meant to
call the admit function and how about let's call this

Update quantity.

And then for the data, if you think about it, we really need to pass two things. We
need to pass some sort of identifier for which product, which cart item this is. And
then also what the new quantity is now, as we know the way we're identifying
different items in the cart is via their product and color combination. That's kind
of the, uh, the unique key. So I'm actually going to pass here, product ID set to
this.item dot product, left square bracket at ID, and then caller ID set to basically
the same thing. But first I'll check to see if there is a color. And if there is,
we'll pass this to item that color at square bracket, ID else will pass null. So
these two here basically identify which pro which item we're updating. And then
finally we'll pass the new quantity, which is not stored on any state in our
components. It's just going to be equal to the value in that box. So event that
target that value.

Beautiful.

So let's use the view dev tools to at least see if this is updating. I probably don't
need to refresh. I'm just going to click over to events here and perfect. When I
click up or down, I see the update quantity event being admitted. If you look at the
payload down here, Oh, that's not quite right. You see the color and product ID look
good, but the quantity is a string that makes sense. Inputs are strings, but that's
not what we want. We really want that to be a number. And that's actually why we
sometimes use V model dot number. We're not using V model here, but earlier when we
were used the V model that number, because that converts the input into a number.
We're not, we can't use that here, obviously, but we can use the same trick manually
down inside of our, uh, event by calling parse float event. That target that value.
Now over here,

When we click

Change the quantity, yes. Now we have a number.

So unfortunately we can't

Just listen to this new update quantity event from shopping cart because shopping
cart doesn't render the item directly. The items are rendered by the list components.
So it's no problem, but we need to do is actually listen to the event on the shopping
cart list and remit it so that we can listen to it on the top level.

So check this out

In, in next step view, find where we rented the shopping cart item. Here it is. And
now we know that we can add a new app update quantity to listen to that new event
that we just through. I'm going to set this to equal, and I'm going to use an inline
function here. Number you can actually just usually here we say something like, um,
some method and it will call some method name, but we can actually just write

Code here. And

When we do that, we can actually call an emit dollar send emit function. So we can
actually emit a new event from right here. I'm going to call it the same thing,
updated quantity, and then for the data for that, we can actually pass a dollar sign
event. So we're just basically going to emit that exact same event again. And you can
see this over here, back on the events for the view dev tools. When I click now, you
can see there's actually two different, that same event is dispatched twice for each
component.

So

Finally we can listen to that up in our shopping cart. So up in the template, I'll
find where we render our shopping cart list.

Okay.

And I'll say, add update quantity = and I'll call a new method called update
quantity. I'll copy that, go down and find our methods section here it is. And add
the new update quantity methods.

Now,

You know that this is going to receive an event object,

Which

We know because we're dispatching it is going to contain product ID, color ID, and
quantity keys on

It. So let's

Use a Ray de-structuring here on the argument to get those values immediately. So
open, curly, close curly, and then we can say product ID, color ID, and quantity.
We'll just make our method a little bit cleaner. And then inside the first and let's
do it. Let's actually just console that log. Those three things. I'll copy them and
put them into my console log just so we can make sure that that's all working. Yeah,
I'll get that actually a quick check over here. Uh, let's change our inflatable sofa
and perfect. You can see the product IRI, the color IRI, and then the new quantity.
They're beautiful. So really inside this function, we need to do two things we need
to, we need to update the quantity on the cart data, which lives in this component.
And we need to make an Ajax call to the server to save the updated cart. Fortunately,
the cart service helper,

The current service module that we put in our project earlier has a function that
does both. So check this out. We can down here, call update cart, item quantity. I'm
gonna hit tab so that it adds the import on top for me. And then we need to pass this
the cart or which is going to be this.cart. And then the product ID, color ID and
quantity, product ID, color ID, and quantity. And that's it. I'm actually going to
jump into this function. So I'll hold command or control and jump into that. So as
you can see, this takes in the cart, finds the, where the index for that item in the
cart. So this is a little fine to function that helps you find the actual item based
on the product ID and color ID, and then sets the quantity to the new quantity and
ultimately saves it via an Ajax request. So I do want to highlight one thing. This
function actually changes our car to data right here.

That's usually something that we do directly from inside of a components. But if you
pass a piece of data from view like cart to an outside function, and that function
changes the data like here that will of course update the piece of data in the
component. I think this is okay, but just be aware, this is happening. Be aware that
this function is not just saving your cart, but it's actually changing the data that
you're passing into it. If we want it to be more clear, we could split this function
into two pieces. One, one function that helps us simply update the cart data like
update cart, item, quantity

[inaudible],

Which is what the method is called now. And another one that saves the already
updated cart object, like save cart. Anyways, let's try this thing back in the
browser. If we change the quantity model. Yeah. Check this out. The price and total
are changing the current header isn't changing yet, but we'll fix that soon. And most
importantly, when we refresh you see this is 20 right now.

Okay.

The quantity sticks. It was saved back to the server. Next there's a small clean up
that I want to do with how we're dispatching the event. Once we do that, we'll follow
the same path to get our remove button working. Yep. Fully functional cart. Here we
come.

