# Cart Controls Component

Coming soon...

Okay.

The marketing department has asked us to add a featured product to the cart sidebar
with the ability to add that item to the cart, right from this page, go check out a
product show page. I'll actually go to my trusty sofa. And the most complex part by
far of this page is this entire sort of add to cart controls right here. I'd really
like to reuse that entirely on the sidebar. So this is a perfect opportunity to
isolate this chunk of HTML and functionality into a beautiful re-usable component.
And for us, it's a great opportunity to go through the process of creating that
beautiful reusable component. So to start inside the assets components directory, I'm
going to create a new directory called a product show, and then move the product show
component into that directory. But rename it as to index that view, this won't break
anything. The imports will still work the same. It's just for organization. This new
directory will be a great spot for that new add to car controls component, but this,
but this does confuse Webpack a little bit. You'll see it kind of doesn't really see,
it's still looking for the old file name. So I'll hit control C on a Encore and
restart it so that it sees that new path perfect. Now, inside that same spot, I'll
create the new file. I'm going to call it okay.

Cart, add controls that view. And as usual, I'll add the template and then the
script, and we'll say export default, and we'll at least give our component a name of
how about product cart, add controls For the template. Let me actually close a few
old items here to focus a little bit, go into the index dot view component. This is
the product show page and up on the template. I'm going to copy the entire div around
all of these controls and replace that with a nice to do

Paste

This into the new component. Now, there are a few things that this temple is going to
need to work. And actually the first one I see is the color selector component. We're
going to need to import that in here. So let me go down here. I'll actually copy the
color selector import from our main template, delete that delete different components
and also remove this other old import And then a car add controls. We can add that
import and add a new components key with color selector inside.

Okay.

Okay. Let's see what else we need to do to fully refactor this thing. The original
components over here had a, uh, an input which was actually styling our quantity
input. So that's also something that we're going to need to move into the new, uh,
component. So I'll copy that input here. It's not needed in our old components and
then a car add controls and the bottom I'll add our usual style Lang = SSS, and make
sure that this is modular. And we'll go ahead and add a dot components with a global
pseudo selector on it and paste the input there. We don't really need the colon
global in this case, but it helps in case we use some classes later and then for this
to work, we're gonna need that component class on the top level component. So I'm
going to refactor this to be a colon class = that, that to an array, Put quotes
around the existing two classes. And then at the beginning we can add Scottish and
style that component.

Yeah.

All right. So let's look at the template here. Anytime you isolate some code and make
it reusable, whether you're creating a function or a new component like this, you're
probably going to need to pass in some arguments that control the behavior for a view
component. That means passing in some props. If we look at the template, I can see
three prompts that we need to pass. We're going to need to be past the product and
also add the cart loading and add to cart success because our components not going to
be responsible for actually loading the card or saving the item to the cart. So that
information about whether we're still low, whether the saving is loading, whether
it's successful is going to need to be passed to us.

So add down here, let's add props and I'm just going to paste those in quick. We
scroll to our template. Now, Peter storm is a bit happier. There are still a couple
other things that we're referencing that, uh, that we need to take care of. But one
of them that jumps out to me is the cart. The cart itself. We use this in exactly one
spot to figure out if the button should be disabled because the cart is still
loading. So we could actually also add the cart as a prop, which I mean, Hey, you
need to pass the cart to us so we configure out whether or not the disabled button,
the button should be disabled, but we really don't need the entire cart object. What
we really need to know here is should we allow users to add the item to the cart yet
or not? So instead of forcing the entire cart object we passed in, let's add a
simpler prop called allow, add to cart. So actually copy, add to cart loading. We'll
call this one, allow, add to cart. It will be a brilliant, it's a very simply whoever
includes us can tell us whether or not it's, we should be allowed to add the item to
the cart,

Okay.

Up here on the disabled, we can now say it should be disabled. If not allow, add the
cart. Another way to explain why I'm requiring this allow, add to cart prop instead
of the entire cart is that I really want my components to be as dumb as possible. The
dumber it is the more control we have over this component. Each time we use

It

Again, it's really no different than functions in PHP or JavaScript. We want to pass
in the most specific information. We need the template also references to variables,
quantity on the V model and also references quantity in the template. Okay. And
actually it just is the quantity. One of the things the user selects is the color.
Now, right now, this is calling an update selected color method, which still lives in
our own, uh, on our original component. But you can see that sets a selected color
ID. So if you think about it, both the quantity and the selected color ID are now
things that are really data from our reusable component, our reusable component,
we'll be keeping track of what quantity and what color is selected on it. So let's go
into our top level component, and those are also things that we can copy and remove
from the old components and then move here. So down on the component, I will add a
new data key. Okay. Saturated function that returns quantity one and selected a
caller ID. Nope. Okay.

Okay.

At this point we let's try it. We still have two methods that we're referencing that
don't exist, but I think we should be able to at least get this to render. So inside
of our original component, let's import this, I'm going to import cart, add controls
from, and I can use the app /components here, or if we want, we're going to say dot
/cart, add controls. Cause they live in the same directory. It's up to you. And then
I'll add this down here for the components. Now we can use that instead of our to do
so. I'll say cart, add controls. And the cart I control is needs a product prop. So
we only really want to render this if the product is actually loaded. So here are the
prompts that we need to pass in. Our I'll start with calling product = product. Then
we'll pass on all the other ones all next. I'll do allow, add to cart. We know,
allow, add to cart. We should be allowed to add a cart. If the cart is loaded in this
component, as a reminder, this component uses our shopping cart mixing. So it
actually does have a data, a cart data. So up here we can actually use our logic of
cart

Does not equal

No. So allowed to add a cart if cart does not equal. No.

So then the line

Stupid bits, add to cart loading, which we're going to send to our, add to cart
loading data also from the mixing and add to cart success, which we can set it to add
to cart success. The other piece of data from our mixing. Okay. Let's try it for me.
Are now yes, it renders

Well sort of, yeah,

The view isn't happy because our template is still rendering a couple of methods that
are not defined.

So let's fix those.

It's updated, selected color. So I'll go into the original component, but on updates,
like the color, this just updates, these selected caller ID, which no longer lives on
this component anyways and over in cart, add controls, scroll down and add a new
method section and paste that. So as a reminder, this is actually we listened to the
color selector, uh, color selected event. We call updates, select a color. And then
down here that just updates the selected color data to that event.

Beautiful. The last that we're referencing

Up here is add to cart, which also lives on our top level components. This one's a
bit more complex. We can't just copy this entire method and move it because this
references add product to cart, which comes I'll click into it, comes from our
mixing. And more importantly, the reason we can't just, uh, move this is that, um,
add product to cart depends on the cart data. This modifies the cart data and the
card data lives inside of this components. So this is another classic situation where
what we need to do is emit an event from the child component and then listen to it on
a pair of component so it can update the data. And that's actually awesome. Emitting
an event from a component is a great way to make that component generic. And
re-usable anyone using this component will be able to do whatever logic they want
when the add to cart event happens.

So at click = add to cart. So let's go down here and add an add to cart method. And
here is that of modifying the cart data directly this time, we will say this.dollar
sign emit to emit and event alcohol, add dash two dash cards. And then the things
that we need to communicate up there up are the quantity, this.quantity, and selected
polar ID, this.selected color ID. Now we can listen to this, add to cart inside of
our top level component when we use this. So when we include the attic heart
controls, we will say at add to cart equals, and I'm actually going to call it our
add to cart method that we already have down below. And of course, now that we're
listening to an event down in our add to cart, this is going to receive that event
object that we passed here with quantity and selected color ID.

So I will use a Ray de-structuring to get those here. So I'll say curly brace,
quantity and selected caller ID. And on here for ad product at cart, we're still
gonna pass this stop product, but instead of we don't have, but inside of these two
pieces of data that no longer exist, we will just pass those, that information that's
passed to us from the event. Phew. So a lot of moving around to get working, but now
we have a really nice component that gets past the prompts needs, manages the data
needs and emits an event when it needs to. So let's try it. I'm gonna go over and
give us a full page refresh just in case. And let's say we have 12 items in the car
right now. Let's add three Ballou couches had add a cart and as the cart had updated
and when I click into the shopping cart, we have three inflatable sofas. Okay. Next
let's leverage our hard work to add the featured product sidebar.

