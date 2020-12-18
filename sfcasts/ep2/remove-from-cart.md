# Remove From Cart

Coming soon...

In cart item, when the quantity changed, we're dispatching this update, we're
emitting this update quantity event, but it occurred to me that we're kind of passing
too much data in the event. I mean, it's fine, but think about it, both the product
ID and the color ID come from this.item and item is passed to us as a prop, which
means that our parents components is aware of which item is tied to this component.
So it's a bit redundant to pass product and be in color ID to our parent. When it
already has that information, all we should really need to say here and update
quantity is my new quantity is, and then that value, the parent component already
knows which cart item we are. This is a tiny detail, but let me show you move product
ID and color ID from

Here. In fact, I will copy those and then delete them

So that we're just emitting an event with the quantity data. Now, going to index that
view. When we emit the event here, we do need to include the product ID in color ID.
So that shopping cart knows which item is being updated.

Both. Since

We already have the item inside of our loop, we can actually do that right here. So
it looks like yours. We call the admit function and this time we will actually pass
this an object and I will paste Paste those keys probably to the in color ID. I'm
going to change this to item, to item

In those three places.

And then for the last part, we'll pass quantity and we can use the dollar sign event
that quantity. So that's it, it's a, it's a really minor detail and it would have
worked either way. It just feels a little bit better to me, it's it feels a little
bit cleaner. Everyone is responsible for what their part is. So, and back over here,
it looks like everything is still working fine. The one thing that is not working is
that when we change the quantity, the cart header is not updating

Yet. We do

Have logic to do this. So if we're looking at shopping cart dot view, we have update
quantity here.

Um,

And we know that shopping cart uses are mixing our get shopping cart Mixon. So we do
have inside of this mixing logic to update the shopping cart, uh, count header. And
we call that after we add a new product to the cart. So one thing we could do is we
could isolate this code here into its own method. And then we could call that from
inside of shopping cart view. So let's do that. But actually, since we do have this
really nice mix in that can hold the cart and data and methods related to the cart.
Let's also move the update cart functionality as a new method inside here To check it
out in the mix. Then I'm going to add a new method here called update product
quantity

Inside of here

In order to update the product quantity. It's going to need to know the product ID,
caller ID, and quantity. And then I'll actually go over my shopping cart here. It's
really the same thing as this method. I'm going to steal this update cart item,
quantity method. And I'm going to paste that here. Not when I did that. Just so
you're aware that did add the, uh, extra import up here though. I don't love that
syntax. Now that we have this new method, we can call it from our shopping cart
component. So I'll go to the console.log( and it's just going to be this.update
product quantity, and then passing the same organs. So we don't need to pass in
this.cart because that's going to be, that's handled by the mixing

So

Easy. That's just a reorganization of code to have a little bit of more logic inside
of our mixing. And over here, it looks like when I change things, it is working just
fine. Now, thanks to this updating, the current header is going to be much easier.
First let's isolate this logic into its own function and his own methods. So I'll
copy that logic. And then down here, I will create a new method called

Okay,

Update cart, header, total, and paste in that logic. Okay.

And then we can very simply that from the end of our ad product to cart Vista update
cart at or total, and then same thing down here and the update product quantity,
this.update cart had our total. Um, now the only thing here is that technically to
make it a little bit more realistic with the saving, what I'll do here is I will add
an await and then an async. So it doesn't really matter, but now we'll actually wait
for that AGS called a finish. That updates the quantity before then updates the cart
header total.

Okay, let's try it. I'm going to do a full page refresher over here just to be sure
we have 13 up here. We have 11 one-on-one. So when I hit up, boom, yes, everything
updates here and our cart header is updating. So the last thing we need to do is make
this remove button work, which now it should be pretty easy. Let's repeat the process
that we use for quantity. So first in cart item, find the button and we need to add
an ad click onto this. So I'll break this into multiple lines and I'll add at click =
and I'll just use the inline emit and let's call this one removed from cart this
time, we don't need to include any extra data. There's not like a quantity that we
need to communicate next. In index that view, we will also listen to, well, listen to
this at remove from cart equals. It'll do the same thing we did before. Will you
miss? And I'll emit an event with that same thing with that same name, remove from
cart, but now we do need to include the product and color ID so that our parent
component knows which item to remove. So I'll actually copy these from the method
above

[inaudible].

Finally, we can listen to this, remove from cart on the top level, shopping cart to
dot view. So go up to our templates. I have an extra import I can remove yay. And
we'll say, add, remove cart equals. And then here, instead of calling a method on our
components, let's go ahead and immediately put a new method in the mix in that helps
us remove items from the cart.

[inaudible]

So over in mixing, I'll add a new method here called remove product from cart. And we
know this is going to need the product ID and the color ID, because those are the
things that identify which item it is. And then inside of here, we can call another
method on the car to service that we haven't used before. It's called remove item
from cart. I'll hit tab so that it will add the import for me. And then we need to
pass this, the cart, this.cart, product ID and color ID I'll hold command and jump
into this function. So you can see it just like last time. It actually does two
things. The first thing it does is it actually modifies the data. So it actually
removes the item from the cart and overrides card dot items. So it modifies our data
and then it saves it on the server. So of course we don't also don't want to, we're
also wanting to watch them once this finishes update the cart header. So I'll put
that below and for consistency, with everything else, let's wait for this to happen
before we actually update the cart header.

So now we have this removed product from cart method. We can go back into shopping
cart, dive view. And since we use that mix in here, we can call that method directly,
which is kind of cool. I'll say remove probably from cart.

Okay.

And then here we can pack, can use the events, say event that product ID, comma event
dot color ID. All right, let's try that on. Move over. I'll do another full page
refresh just to be safe. And let's remove our inflatable 15 items in here. This is
three I'll hit remove, and as looked like it worked, we've got the 12 up here. It's
gone, the total updated. And most importantly, when I refresh it's gone still. So
next I have a challenge for us to help sell more high quality merchandise. The
marketing department has asked us to add a featured product sidebar

To the cart,

With the ability to actually add the item to the cart, including choosing the color.
If we need to directly from this page to make this happen, we're going to need to
reuse a lot of code between the sidebar and the cart show page with view. We can do
that.

