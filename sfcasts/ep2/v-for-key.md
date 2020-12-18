# V For Key

Coming soon...

Our cart items are kind of weird. We fetch them via Ajax, but each item does not have
a unique ID on it. Like we might expect for lots of things being returned from an
API. And so, because of this, when we loop over them in index dot view, we have to
use the array index as the key,

But

In a perfect world, the key should be something that's unique and will always be the
same for each item. If you use just the array index like we are, then if you, if
something re ordered the items in inside of that items, data,

Suddenly

Each one we rendered each item would have a different key. So what's the problem.
Well, there's maybe no problem, but under certain situations, the fact that the key
could change for each item could cause some rows to rerender incorrectly. That's
really the whole point of key

To help them.

You keep track of which row in the HTML is associated with which item in the array
That helps it update or remove the correct items. They're correct things. If the
items array changes. So let's improve this, even though each cart item doesn't have a
unique property, we can actually invent a unique property by combining the product
and color I, our eyes, it is valid to have the same product in the cart, but with two
different colors that shows up as two different items. So let's do this in a shopping
cart, find the complete cart computed property. This is where we create the complete
items.

Okay,

We're going to add a new ID key to each item. Let's first change the function to use
multiple lines instead of the super short format, saw a curly brace and then a return
statement. And then actually I have an extra set of parentheses and then a semicolon.
So perfect. That's the same thing as before Eastland is only complaining because it's
saying, Hey, you only have a return statement in your function, so you can use the
short format, but now we're going to create a private variable, constant product =
and set that to our products, find the thing. And now we can use down here. We can
say product one product, or really, we know that we can actually just shorten that to
just product. I'm going to do the same thing for color cons color Eagles.

And I'll set this out, actually just use color down in the, uh, return and then paste
that up there. Cool. Now of course you can see that it's mad because we're actually
duplicating the product variable. So I'm going to change this to product item inside
of my little callback and color item inside the second call back. Cool. So, so far I
know Jane's just writing this code in a few extra lines, but now we can add that ID
property. So I'll say ID colon, and I use the fancy tick format here. So I'll, I can
say dollar sign, open parentheses cart item, item dot product cart item is the result
of us looping over the original non-complete cart. So cart item dot product in that
case is just the IRI underscore. And then the same dollar sign, open print, open
curly brace, uh, current item dot color. I'll actually say I'll use the Turner's
syntax. If we have a car I'm not color, then print a cart item that color else,
Alfred, how about none? Or we could use, uh, an empty string. It doesn't really
matter.

Perfect. Okay. So now we can use this inside of our V4. So I will go to the simpler
format just before item in items. And then key is going to be equal to item that
item. The sweet love it. When we check our browser, it looks exactly the same, but
you can see, see down here now in the shopping cart list, we open up the shopping
cart items below it. You can see the key inside of each one. Okay. Let's give our
cart some ex some struggle inside of index. That view I'll paste in a sort of table
format for our cart with item, quantity, price kind of columns on top movies,
shopping cart item, right into the middle of that. You can see, we have some rows.
Each shopping. Our item has also its row and we'll have some columns inside of there
instantly. This starts to take some sort of shape. So cool for the price. We need to
total up the price of each of these items, which we're not rendering yet. And so
that's a perfect opportunity. A computed property.

Let's go back over to our components. Let's add a computed prop or a computed, a key
and have one called total price. And what we'll do inside of here is I'm going to
keep it kind of as simple as possible to begin. So I'll say, let total = zero. Then
I'll quickly put in some logic here that loops over each items and multiplies each
product price by its quantity and adds that to the total. And at the bottom, finally,
we will return format price, which we don't have important yet. And then total that
format price. We've been reusing that in several different places. I'll go up here
and say import format price from at /helpers /format price.

Perfect. So now that we have a total price computed, we can use that up here. Dollar
sign, curly, curly, total price, back over gorgeous. Can't see the exact prices here,
but if we did, they would total to $702. Oh. But if you do want to be a little bit
more hipster down in our computer property, we can do that. It's your recall, check
this out. Instead of the forage, I'm going to impress my friends by saying return
format, price, and passing that this.items that reduce, Ooh, and this will take a
call back with an accumulator and the actual item that we're going to be looping
over. And I will use these super short syntax here to take the accumulator and add
that to item dot product dot price, times, item that quantity, and then over to and
set zero as the first argument to reduce.

Yikes, we're going to need a comma there. So if you like the item, the reduced
function, you can use that, uh, I'm using this more and more of it. It still makes my
head spin a little bit. Um, the accumulator will start at zero or we'll then loop
over it every time and it'll add whatever the current number is, uh, like zero to,
uh, the whatever. And it doesn't really matter. Anyways, this is more hipster. And if
you look over and refresh, it works fine, but of course, hipster code is not always
better, but it's fun to use here. So next let's finish each row here. Let's render
the product color, the quantity, the quantity, input, the price, and even a remove
button. The quantity input will be especially interesting because we're going to
almost accidentally fall into a small anti-pattern.

