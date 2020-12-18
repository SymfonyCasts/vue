# Featured Sidebar

Coming soon...

Here's our mission

To render a featured product on the cart, sidebar with fully functional, add to cart
controls. Ooh,

Start by going

To the asset services, directory and opening it products, dash service,

Which

Wow. That was included in the starting code for this tutorial. It already has a
function called fetch featured products that returns a collection of products using
whatever, a whatever

Logic.

I think some service add logic to determine which products are featured,

Go into it.

Shopping cart, that view the component that renders this page right here.

Here's what I'm thinking. When this

Component is created, we can make an Ajax request to fetch the featured products.
We'll then find the first feature product in this collection. Set that onto a new
piece of data on this component. Then render it up here in the sidebar. That's fairly
straight forward. So let's do it. I'll start with the data featured product.

No, and then to the

Ajax work, just to keep things organized, I'm actually going to put the logic in a
new method and call that method from created. So I'll make this an async load
featured.

I'll make

This call load featured products.

And then

Inside of here, I'll say constant featured

Products = and I'll call that a fetch featured products method. I'll hit tab right
there. And that will add the import for me now, fetch featured products returns a pro
a promise that re whose data resolves to be collection of products. So what I really
want to do here is I can't say constant featured products = this is actually a
promise, but I can, if I say a weight and then this will be an Axios response. So I
will put that in parentheses. Actually I want the parentheses around the await also.
So I'll get back to the response. I will wait for the response from Axios, and then I
can call that data left her bracket, hydraulic horn member. So that's the typical way
that you get the data from the, uh, Hydra response. And then hydrocodone memory is
the key on, on our API end points that actually holds the data. And of course, now
that I have this as a weight, this needs to be an asynchronous. Now, after this, we
only will really want us to, uh, set a single featured product. So I'll first do a
little sanity check here. If feature products that length = = zero, then we'll just
return. We're not really going to code too much for this case, but in theory, maybe
you don't have a feature product. So, uh, nothing is there. And then at the bottom, I
will say this.feature featured product = this

Featured

Featured products left go bracket zero seven.

Cool. Oh,

But he has lent wants is complaining here. Use a Ray de-structuring wants me to use a
slightly cooler syntax where I put the, this feature products in an array and set
that to feature products. That will be the same thing. And we'll set the, this stop
feature products to the first item in this array. Okay. So now I'm going to copy this
method name and then just go up here and call it and created, make sure that you put
this above the, this.colors line, because this has an, a weight on it. So we don't
want to want both of these to basically start at the exact same time.

Okay.

To make sure this works I've over here. And it refreshes go to view dev tools. I'm
sure I'm on components, click on shopping cart and let's see there. We got featured
product and perfect. We have a featured product. The sidebar itself is going to be
complex enough that I'm going to put it into its own components. If you download the
course code, you should have a tutorial directory with a cart sidebar that view
inside.

Copy this file into

Assets components, shopping cart,

Cart sidebar.

And there's nothing too fancy here. We have a featured product required prop, and
then we just render some data on it.

So let's

Use this inside of our shopping cart components using the usual drill. So I'll go to
the top of component for my import statements.

I'll say

Important card sidebar from at /components /shopping cart /cart dash sidebar.

Put

That cart sidebar into my components down here Top, we can use this. It's actually
going to be used in this aside. I'm not going to make this self-closing anymore. I'll
put a proper closing tab.

And then

We'll say cart, dash sidebar Code a little bit defensive here, because I'll say V if
a featured product. So just in case there is no feature product for some reason. And
the one, a piece of data we need to pass in as the feature product set to our
featured product data. Cool. Let's try it move over. And there it is. Our feature
product is our bowl. Love it, inflatable sofa. So to make this actual actually
functional, We can import our car to control components, components, and cart add
controls we've been working on.

Okay.

So in cart, sorry by sorry. Environ. Let's import that

Import

Cart add controls from add /components /product show /cart. Add controls, put that
into a new components key.

And then up here, right after the H six, we will add cart, add controls. Now this
needs a number of different properties that can kind of get it to show me, add a cart
loading, add a cart. Success, allow at a cart. All three of those are booleans and
then the product that's being added to the cart. So I'll pass the product versus
colon product = featured product for the other three. I'm going to hard-code them for
now. So I'll say, add to cart, add a cart. Loading = false. Add to cart. Success =
false and allow, add to cart also equal to false, just so we can see if we can get
this thing rendering. All right, let's go check it out and awesome. Well, not that
awesome. This looks terrible here. Things aren't quite fitting in the same spots,
which makes sense really this button needs to be smaller. So this is a great example
of the life cycle of a reusable components until now, if we open our cart, add
controls and find the template, the add to cart text here did not need to be dynamic,
but suddenly we do need it to be dynamic because we want it to be shorter in this one
spot. So now we will make this more flexible. Let's go down here and add a new prop
that needs to be passed to us called add button text.

And this time this is going to be a type string. And actually instead of making this
required, we can just give it a default value of add to cart, which is what the
current language is. Uh, up here. We can replace the, hard-coded add a cart with
Colin curly curly, add button text. So this is nice because now in our cart sidebar,
we can change that to something different. Add button text. I don't need the colon
here because this isn't going to be a dynamic value. It's just going to literally be
the string plus.

Now

When I refresh, yes, that looks much better.

Okay.

Now that this renders correctly and we can even, even the color selector works, we're
super close. Let's make it work. And we're super close. Step one is to pass real
values for add to cart loading, add a cart, sex success, and allow, add to cart. All
of this data really lives up in our parent shopping cart component. Specifically,
remember we're using the shopping cart, mixing in this shopping cart. Mixon is what
holds all of the, uh, hold a number of pieces of daylight cart. Add a cart loading
and add a cart. Success. The point is that we're going to need to do a little bit of
proper passing. We're going to need to pass those prompts from shopping cart into
cart sidebar. So that cart sidebar can then pass them into cart. Add controls. Let's
start by stealing these three props from cart, add controls. So I will copy, add a
cart, success, add a cart, loading and allow, add a cart and paste those into cart.
Sidebar. Since we are also going to need those same props here, then we can use them
up above,

Add a cart, loading, add a cart, success, and allow, add to cart, and finally pass
those into our new, our cart sidebar from shopping cart. So if I scroll to the
template, now our cart sidebar is mad because we need those three prompts to be
passed in. Plus do allow, add to cart. And if you remember allow, add to cart it, we
should be allowed to add a cart as long as the cart is loaded. So we can say if cart,
the cart data does not equal. No. And we can allow things to add things to the cart.
And all that said, add to cart. Success = add to cart, success, data, and add to cart
loading = the add to cart loading data. By the way, I've repeated. This cart does not
equal equal. No for allow, add to cart a few times. If we wanted to, we could add a
computed property to our mix and called is allowed, allow, add to cart, and then we
can simplify our template. Here is your call.

Okay.

So the final step to make this work is to actually make this button do something as a
reminder in cart, add controls when we click that button,

Okay,

It's add a cart method, emits an add to cart event so we can listen to that to
properly handle things. First listened to it in cart sidebar, where we run to this
components. So at add to cart equals, and I'm going to do an, and what we need to do
here is just, uh, emit it again so we can listen to it on the parent component. So a
dollar sign it emits. I'll give you the same name at a cart and we'll just give it
the same event object. Then in shopping cart, we can listen to this again. So
shopping cart on our car sidebar, we'll add, add, add to cart. And here we can call
the mix and method directly. Remember in our get shopping cart mixing, we have an add
product to cart method in here. We did that on purpose because we knew we're going to
re need to reuse this from the shopping cart page. So now we can call this.

Hmm.

So add product to cart. That's the method and the mixing and the mixing. And then the
two arguments we need here. The three acronyms we need here are the product which we
know is going to be the featured product.

Yeah.

And then we needed the select selected color ID and the quantity. Those are both
properties on our event objects. So I can say event that selected color ID and event
dot quantity. So that's it. Whew. That was a lot of work. Let's see if we have this
working, I'm gonna move over. Do a full page refresh here. Here are my controls.
Let's see what happens. I already have a three blue in here. Let's add two more at a
cart. Yes. Look at that. This is so cool. It updates instantly. Let's add a couple of
red here. Boom. Green's not on the list yet. Let's add one green. Oh, that is
gorgeous. The cart hitters updating our totals, updating the items are updating
instantly here. Even if I remove blue and add another blue, it pops back up quantity
one. That's pretty impressive. But there is a subtle bug in our logic. If this
featured product weren't already in the cart on page load, then clicking the plus
button here would make things go bananas. Let's have fun. Let's find out why next and
solve it with a deeper understanding of watcher functions.

