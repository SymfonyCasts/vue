# Products

Coming soon...

Okay,

now that we're loading all the products via Ajax and printing other name, we could
just start going into a template and really adding a lot of content here to make each
product nicer. Cause obviously we're going to have a name, image, price, a button to
click on. Um, but as you might imagine, this template is going to start getting
pretty big. Also eventually we're going to have this catalog component, have a search
bar. So we're going to have even more stuff up here. So as I mentioned earlier, when
you should split a component into smaller components is not a science. It's something
that you just need to feel out and get an instinct for. So there's no wrong answer,
but I'm actually going to refactor this DIB classical's row into a product list,
component, a component whose entire job is just to list out products. So you might
expect me to go into components here and create a new file called products, product
dash lists that view, but actually not going to do that. That's not wrong, but
instead I'm gonna create a new directory here called product dash list. Because as
you'll see in a second, I'm actually going to have a couple of components that are
going to make up this product list section. So I'm gonna create a new directory and
inside this is kind of a standard for the main kind of product list itself. We can
call it index dot view.

I'm gonna start at the same way as always. I'll make a template tag and inside of
here, since we are ultimately going to kind of be refracting this entire area out,
I'm going to use the div class = row as my outer dif

yeah,

down here. I'll do my script tag with export default are options array. And of course
we always include the name. I'll call this one product list poetry. Now the one thing
we know is that we know we're going to need these.

The one thing we know is we know that we're going to need these products actually
pass into this template so that we can loop over them. So I'm immediately going to
add a props option here with a products prop. And for this, we can set the type two
array cause me an array of product objects. And I will also say this is going to be
required. True. No, this is one of the downsides of the props is I can say that this
is going to be an array, but you know, I, unless I do a lot of work, I can't really
enforce it. It's an array of product objects with a certain set of keys. I can just
say array. So that's going to be good enough

now for the content side of here. Since I said, we were basically in a copy of this
entire div, we're actually gonna, I'm going to grab the rest of it right now. I'll
grab the inside the [inaudible] and paste it in here. In theory, we shouldn't need to
change anything. So we're going to pass that same array of product objects into this
element. Alright, so let's use this back in catalog. Of course, the first thing we
need to do is actually import the components. So I'll say import product list. It
seems like a pretty good name from, at /components from at /components /product list.
And actually I can stop right there. When you have an index that view inside of a
product list, you can actually just import the directory and it's going to know to
get that index, that view from inside of it. So that's a nice little shortcut, and
then we'll add that to our components, which now makes it available inside of our
template. So up here, our little job is pretty simple. We're going to delete this
entire div and it says a product list. Of course, the one property to pass in and
it's auto completing it for us is products = products. But of course we know not just
products, right? Because if I do this, it's going to literally pass the string of
products. In fact, we can probably see this over in our console.

Okay.

If I refresh yup. Invalid prop type check failed to prop fail for products is
selected. Array got the string of value products. We want that prop to be dynamic,
that attributes to be dynamic. So we're going to add the colon in front of it and
suddenly, boom, you can see everything is just printing just as before. Okay. So as I
mentioned, once again, we could stop now and actually start adding more details into
our spot right here, but I'm gonna go one step further and actually refactor the
individual product itself into its own components.

So we'll have one component that just actually loops over the products and it will
call another component for each individual product, which will be kind of a nice way
to have things organized. So inside the product list, this will be our second
component inside of here. I'm going to create a number called product dash card, that
view. And we'll start as always with the template. And in this case, each individual
product card is going to be this div right here. So each product card is going to
have these class call these classes here. So I'm gonna copy these classes, but I'm
not going to copy the before. That's actually actually going to stay inside of this
component right here. We're just going to put the outside Dave that we want every
single product card to have. And inside I'll go steal our curly curly product.name,
right. So right now we're going to make it cooler. But that is what an individual
product card looks like. It's a div with that class and we're printing the name
inside of it. So that's good down here. I'll have the script tag with export default
and name, call this product card. And once again, we know that we're going to need a
product pass to us. So I'm going to jump straight to saying props and then product.

And this time we can say type object and we can't enforce exactly what that object
looks like, but we can at least say type object and also say required true in case I
do something silly and forget to pass that. All right. So this looks perfect. Now
we'll go back and index that view. And it's the same process I love honestly how
repetitive this starts to feel feels good. So I'm gonna say import product card from,
and if you want, you could just say dot /product card here, or you can use the at
/components /product lists /product card. And then down here to make that available
to our template. We of course add the components key with product card inside of it.
And then finally up here, we can use this. Now this is pretty cool. Cause what we
actually want to do is we want them to the V four, but the V four, we want to loop
over now as one of the loop over the product card itself. So we can replace the div
here with product dash card

[inaudible]

and then we'll have the before on it. Well, the key on it and we won't have a class
on it. This actually doesn't really make sense anymore. This would pass a class prop,
but wouldn't do anything. Well, we do need to pass is a dynamic product, uh,
attribute set to product. And there's not any content inside right here right now. So
I'll actually remove that and to do a self closing tag. So if you look at this, we're
looping over the, for all of the products, every product is gonna have its own
product card and we're passing in this one prop. That is very nice. When we go over
here, it looks like it's working. I'll just refresh just to be sure. And it does. So
now our product card is really nice. Cause it's dead simple. We can focus on just
what a product card looked like. It looks like. So let's do that next. As you make
this look good, let's print some dynamic day. Let's add some styles and also add our
second computed property.

