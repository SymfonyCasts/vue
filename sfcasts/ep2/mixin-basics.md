# Mixin Basics

Coming soon...

We've talked quite a bit about code reuse in view. And there are few types we know
about for data related stuff like Ajax calls. We created a nice services, directory
full of modules that return functions, probably logic like formatting, a price
string. We have a helpers directory, and most importantly, for functionality related
to markup and the behavior of that markup, we can create components. Probably one of
the nicest ones is this color selector, which is a little bit of markup, but a lot of
behavior for allowing you to click different colors. And it even emits an event when
we click that color. But there's another type of functionality that you sometimes
need to share. It's sort of view related behavior that isn't specific to any one
component. The product page inside of components, products showed up view. Currently
it makes an Ajax call for the cart. This is down here inside of created,

Hmm.

And allows us to have to add an item to the cart with a few extra benefits like
tracking if that processing is still saving and when it's successful, even updates
the header on the page with the new total items in the car, it turns out our new
shopping cart page.

Okay.

We'll also need to make an Ajax call for the cart data, and it will also need the
ability to add an item to the cart. Well, not exactly. We're going to want to allow
users to change the quantity of each item, which is similar to adding an item in both
cases. And we may want to show a little loading animation when it's saving and update
the header when it's done. So these two components need to share a bunch of behavior,
a bunch of behavior, like adding an item to the car and even pieces of data, but with
totally different HTML, which means we can't isolate this into its own component to
solve this, say hello to mix-ins very simply mix-ins allow us to extract parts of a
view components like data methods or even things like a creative function into
something that can be reused by many components. In view, three mixes are replaced by
the composition API. Something we'll talk about in a future tutorial, but
fundamentally, both mixes in composition are doing the same thing. Let's start really
simple. Let's create a mixing that allows that has a cart data and fetches that via
Ajax in a creative function and assets create a new directory called mix-ins.

And inside there a new file called get shopping cart dot JS, because that's kind of
the point of this file to get the shopping cart data in soon, the behavior Mix-ins
mostly looked like components. We're going to export default in object and inside.
Let's start with a data key, just like we can have in a component with card set to
know finally for now, we'll keep this mixing pretty simple, but I do want this mix in
to at least, uh, make an Ajax call for the card data. As soon as the component is
inside of his created slot over here, I'm going to copy the created function, Paste
it into the components. Okay. And then delete the part about the product.

Perfect.

Oh, but now this is the only AJAXcall on created. We can simplify it with a weight.
We'll say this.cart = I'll wait fetch cards and we can remove the rest.

Okay.

So that's it. That's a very simple mixing.

Okay.

Now we can use this inside any component and that component will magically have a
cart data and a creative function as if this code were literally written inside that
component. All right. So let's use this in product showed up view. I'll go up to the
important section. And first we'll import this like a normal variable import shopping
cart mixing from at /mix-ins /get shopping cart Then below after components. If
there's any special news to use, this will add a mix-ins key.

Okay.

Which is set to an array and inside we'll just say shopping cart, mixing. That's all
we need to do to get that. Now, thanks to this. We don't need the cart data down here
anymore. We're already going to have a piece of cart, data, thanks. And the mixing.
And we also don't need this fetch cart logic down and created the creative function
in the mixing, as well as this graded function, without both be called and I'll even
clean up the import on top a little bit. I don't need to import the fetch cart at

All.

And that's it with any luck this will work exactly like before. So let's try it. I
will go back to the homepage, click into a product and let's hit, add to cart. I'll
do a quantity three. Watch that 12 had added cart and perfect. It works so next.
There is a lot more Curt functionality that we can move into the mix in. Okay. Like
the logic to add an item to the cart, including the loading state and updating the
cart header that will make this a truly valuable mixing. When we need this on the
shopping cart page,

[inaudible].

