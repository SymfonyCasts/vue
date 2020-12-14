# No Data Duplication! Fancy Computed Prop

Coming soon...

I want to be able to access this complete
items from our templates so we can leap over it. So what's the best way to do that?
Well, a simple thing would be to add this as data, we could add a new, complete
items, data up here, set it in this cart function, and then reference it in the
template,

Easy but There's something about that. That bothers me.  What is it, duplicated data.

If we set this complete items onto data, then the kind of cart items itself, their
product IRI color IRI and quantity would be duplicated in two places. They would be
reflected in the complaint items, but they would also be on the cart to data itself.
And remember, even though these one of these lives in lives in a mixin and one lives
in a component they're effectively inside the same component. So duplicated that data
in two places, and we never want to store a piece of data in multiple places, because
if we later change a piece of that data, it will change in one spot, but not the
other. So it's really no different than a database, right? You would never want to
start two pieces of data, uh, a piece of data, two places of database, because they
could get out of sync. So let's be smarter. The only new piece of data here is
actually the products data that we get back from the Ajax. If we store that as data,
we could still get access to this nice, complete items, array in the template via a
computed property. Let me show you, let's start by adding a new products data. So
I'll add a new `data()` key here, which is a function,

And I'm going to return an array with

Products and we'll initialize it to know. Now down below, we will set that. So
instead of `const products`, I will say `this.products` equals, and then we can
reference `this.products` below, inside of our loop. And that should do it. Now,
check this out. We can move

The goods,

Middle chunk of this logic into a computed prop called complete cart. So I'll add a
new `computed` key

Inside of there a new

Method called `completeCart()`. And the first thing I'm actually going to do inside of
here is if anybody calls this before the car is actually loaded, I don't want to do
anything. So I'm going to say, if not `this.cart`, so if the cart isn't there, or if
not `this.products`, if we also haven't finished loading the products, then I'm
going to return. `null`. So if the complete car returns, no, it basically means that, uh,

Um, we're not done loading yet now

To copy all this complete item stuff from watch,

Hey, sit up here. But instead of logging, let's return a new object. We'll make this
look like the cart. Remember the cart has an items key on here. So I'll say `items` set
to `completeItems`. All right. So that should do it. So to follow the flow here, once
our cart has initially loaded the Watcher's going to call our function, we will then
make an Ajax request for the products. And then finally, in our template, we are
going to reference this `completeCart`, which we'll use that data once it's available.
Remember one of the magic things about, uh, computed properties is that it view will
automatically rerender once any of the things inside of it, like `this.cart` of
`this.products` changes, let's go to our template. And we just need to basically update
a bunch of stuff from `cart` to `completeCart` And actually get a copy of that changed
on the `v-if`

Inside the `v-for`

Down here to prove it's working cart, item cart ended up product is now going to be
an object. So I'll print `cartItem.product.name`, and
then one more spot down here for the empty shop McCart. All right, let's try it move
over and didn't even need to refresh it is already printing correctly. I know it
doesn't look that impressive yet. We just put together a lot of data. If we look at
the view dev tools, as you can see that we have the cart and we have the product
stuff done here and with his beautiful completed cart, our computer property, that
allows us to get what we need in our template without actually duplicating anything.
So next, we're still missing one piece of data inside of our complete cart. And that
is the color. This is still a color IRI, what we needed the color data, because
that's going to contain the hex color so we can print that a little bit nicer on the
screen. So let's fix that next and learn how we can send both the color Ajax call and
this product's Ajax call in parallel instead of one waiting for the other.
