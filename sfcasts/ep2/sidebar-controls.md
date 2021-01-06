# Add to Cart Controls on the Sidebar

Coming soon...

So to make this actual actually
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
