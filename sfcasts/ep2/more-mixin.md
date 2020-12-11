# More Mixin

Coming soon...

Okay.

We've created this mix in with the goal of sharing some specific things between the
product show components and the new shopping cart component that we're about to build
out specifically, both we'll need a, to data and we'll need to make an Ajax call to
get that card data. That stuff is now inside the mix in whew, both pages. We'll also
need the ability to add an item to the cart. That might sound weird to be able to add
an item to the cart from the shopping cart page, but we're going to have a featured
product sidebar with an add the cart button. So in preparation for that, let's also
move the add to cart functionality from product show into the mixing. This literally
means that we're going to move the add to cart method from the components and the
mixing. So let's copy it, delete it. And then in the mixing I'll add methods

And then paste.

Oh, and this references two pieces of data that are related to this process, add to
cart loading and add to cart success. Those should also now live in the mixing. So
let's go and find them, copy them out of the component, delete them. And then we will
put them inside Mixon.

Okay.

Now this probably would work because the new data and the new method are, as I
mentioned, basically copied into our component, but it is a bit weird because the mix
in is referencing things like this.product in this.selected color ID, but those don't
live in the mixing and that's technically okay. And we sometimes do things like this
in PHP with traits, which are very similar to mix-ins, but I don't like it because it
makes the traits hard to reuse you. Only way you can reuse this trait is if you have
data that have these exact names, the Melyssa makes the trait, it kind of easy to
break the trait, because if you renamed any of these data in your components, then
you might unknowingly be breaking the mixing. And the fix for this is simple enough.
Instead of referencing these three pieces of data down here, let's force them to be
passed as arguments. So product selected color ID and quantity. Then we can update
the code down here. So instead of this, that product product, and then down here,
we'll reference product again, select a caller ID and just quantity.

Okay.

And you can see that ELN is mad because I can shorten this from quantity, colon
quantity to just quantity, but Hmm, this method is called things to our app click
list and our peer at click add to cart calls this add to cart. But now our add to
cart has some arguments has those three arguments to it. So we can't just have the
act quick, call it directly. Now we could just call the method in line. We could do
something like add to cart, and then we could reference the, uh, the variables like
this, Or, and that's a valid way to do that. Or we can rearrange things a little bit.
So I'm going to undo that. So that's just pointing to the method name. Okay.

Okay.

Now, and then in the mix and I'm going to, instead of calling it add to cart, I'm
going to call it, add product to cart so that our clinic listeners not calling this
directly then in our component, we will re add this, add a cart as a method down
here. So I'll find methods, Riyadh, add a cart, And then we'll call that new method
from mixing. So this, that add product to cart. And we'll say this stock product,
this, that selective color ID and this dock quantity.

All right, that should do it. Let's try it. I'll go over. I'll refresh just to be
sure. And we're just looking to see that this actually all still works. So I'll add
this to my cart and it does not work interesting. Let's go check out our dev tools
here. We have property or method, add to cart, success, and add to cart. Loading are
not defined in the instance. Then we have the data options should be a function that
returns per instance value in component definitions. So if you look back over on our
mix in and scroll up, ah, Ryan, you made a mistake in the last spot. This is an easy
thing to do because so many of the things in view are sometimes keys and are
functions. I totally messed this up. Data is actually a function that's called one
time by view. I know that. So I need to actually do here is turn this into a
function. And with the function returns is our data object. I'll need to check and
see why that worked before. So anyways, if you make that mistake, this that's the
error that you're going to see from view. You can see it already reloaded in the
error has gone right now. I'll hit add a cart and it works. And now we have some
really nice reusable code for our shopping cart component. So let's import the mix in
there. I'll import

Shop for current mixing from at /Mixon /get shopping cart. And then just like last
time down here, it's very simple. We will just add mix-ins

Okay.

And inside it, I'll put shopping cart Mixon. Now we're not going to do anything with
that mixing yet, but if I click over to the shopping cart in our browser and go down
to the view dev tools, click on that shopping cart. Yes, we do have a cart data, and
you can see that it is already being loaded via Ajax. And that means we are dangerous
on this page. Next let's use this card data to build this page.

Okay.

