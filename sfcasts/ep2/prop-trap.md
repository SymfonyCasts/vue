# Prop Trap

Coming soon...

Time to render the details for each of these cart items. I'll start inside of cart
item by adding a little bit of structure for the name div class = call dash two,

Okay.

With the product name inside, and then I'll go down and actually add a div class =
called that or one. And what we're going to put here is a color square in case the
product has a color. So span. I'll use multiple lines here and I'm giving us a class
= color dash square.

So for disconnected,

Miss will need some style. So down here, inside of dot component, I'm going to add
color square And just make this like basically a little, a little square with an
height of 25 pixels.

They

Border radius to make it kind of cute.

Mostly going to add a colon global African Ponant that prevents the dot color square
from having an unnecessary, extra module prefix in the final CSS. We talked about
that in our first mute tutorial. All we need to do now on this color square is give
it a background, color style set to whatever the color is for the current product. So
I'll add style = and actually I'm going to want colon style = so I can set this to
the nice object syntax instead of here. Background, background color. Remember inside
of here, it's not background dash color. They normalize things to the kind of be a
camel case. And I'm going to set this to my cool tick syntax so I can use the pound
sign and then Diasend open parentheses, close parentheses. And basically here we'll
get the items color now to kind of keep my template clean here a little bit. I'm
using computer property called hex color. So I'll copy that. Go down and add a new
computer section with hex color in it.

Inside of here, we'll return this that I am that color, which will either be nor set
an object. So if we have that, we'll return this to, I don't know, color dot hex
color L to return F F F so that it's just an invisible white box, basically. Um, if
there is no color, we could also use like a V if up here, if we wanted to hide or
show that completely for those products, it doesn't matter. Anyways. Look over now.
Sweet color box color, max, no color box. All right, let's keep going. Next is the
quantity. So what we really want for this, we really want this to be an input box
that the user can change so easy.

I'll add a div

Dave classicals call [inaudible] that lines up kind of correctly with this header.
These are all called three up here.

Okay.

Then I'll add an input, Apple design, multiple lines. Now what we really want is for
this value, the value of this input

To be

Bound to the item dot quantity, property

Prop.

So whatever item that quantity is, we want that to be the value on the input. And
when we change the input, we want that to change the item dot quantity. And that is
exactly the job of the bind or V model my bad. So I'll say V dash model and I'll use
the cool V dash model of dot number. Is that a cast it into a number and they'll say
= item dot quantity. Then I'll say class = form dash control to make it look nice
type = number. So it's a little number dropdown and men = one. And just make sure
this input isn't too big down here. I'll add a little input. CSS, say that the width
should be 60 pixels. All right, let's go check that out. And woo. And you can see
it's instantly showing the correct numbers, but there's a problem with this. We sort
of just fell into a anti-pattern. Do you remember how were it never supposed to
modify a prop? Well, we just did. Yep. The item is passed to us as a prop and then
via the model, we're actually modifying the quantity

Key

On the item prop.

In reality, this isn't quite as bad as changing an entire prop because the item
object on the top level, shopping cart, specifically the items inside of the
computed, uh, cart, each of these items, objects will be the exact same object in a
memory as the item inside of each shopping cart component. So if we changed the
quantity down here on a shopping cart item, that will literally be changing the
quantity on the exact same object that we have on, on the top of the shopping cart.
So those two values do stay in sync, which is really the biggest problem with
modifying a prop.

We can actually see this, check this out, let's change the inflatable. Let's change
our floppy disc down to quantity 12. And if we look down at our first item here, we
can of course see quantity 12 there. And if we go look at our shopping cart, open up
our computed property, look at the first item, look at quantity 12, but here is where
things get weird. I'm gonna change is now down to 10. Check this out. It didn't, it
did not change here. Well, it did, but you only see it once you actually click off of
the shop MacArthur component and then reopen it. There is quantity 10. The problem is
that this just isn't how Vue is supposed to work, even if we're kind of getting away
with it a little bit. And so weird things like this start to happen. And this the
view dev tool, not the only weird thing that would happen. You're risking. Uh, plus
what we're literally doing is changing the quantity on a computed prop,

Which is even weirder. And most importantly, we're not changing the quantity on the
actual source of truth, which is the car to data. Look at cart items and open the
first item that's still has quantity 15. This is not changing. So if shopping cart
ever re rendered, it would actually completely wipe out the value on a computer
property reset of the correct one, and we would basically lose it. So in short,
accidentally, we added up modified a prop and the result is a big mess. The point is
we can not use the model here. Fortunately, we already know the correct solution,
simple use colon value = item dot quantity so that it's at least rendering that
value. Then in a few minutes, we'll dispatch an event whenever this input changes to
notify our parent component, that the source data should change no different than
anything else. But before we do that, let's finish the kind of last little pieces of
the row here. So let's run to the price down here. I will say div class = call dash
three, and then I'll say dollar sign, and I'm going to print out a total price
computed property so that we can do a formatting on it actually important right now I
know I'll need the, uh, format price function from components helpers from helpers
format price down here. I will add that total price computed property.

That's going to return format price, this.item dot product dot price times this.item
dot quantity. And finally, before I even check that out, I'm going to add even one
more column down here for eight remove from cart button. So same thing called
[inaudible]. And this time I will do a button with a couple of basic classes to make
it look nice. And we'll call this remove all right, when will bring, actually make
that button do something in a minute when we move her. Now that looks nice. So next,
all we need to do now is make this quantity is make the quantity and remove buttons
actually work. When we change the quantity, it should change the date on the top
level and say that to the server. And one remove an item that should remove from the
cart on the top of a component and save that back to the server as well. Let's do
that next with of course events.

