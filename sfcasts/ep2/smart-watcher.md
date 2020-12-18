# Smart Watcher

Coming soon...

The fact that we can add things to our cart like this and have everything just
magically update is pretty incredible and shows the power of view. But we have a bug
gasp sounds, remove all of the inflatable sofa items and then do a full page refresh.
Now let's try to add a red sofa and, Oh, it did not show up. It's 11 plus one = 12,
that sort of worked, but let's go on here, which I got the console. We have huge
areas, cannot read property price of undefined coming from our shopping cart list.
Yikes, here's the problem. And it's a little subtle head over to shopping cart dot
view and find our watcher function. There it is. So as a reminder, when the, after
the cart AGS call initially loads, our cart watcher right here is called it calls the
load products function gets all the product IDs that are in that cart, makes an AGS
call for all of them and sets the products data. So ultimately we have a cart object
and we have a product array that contains all the data for all the products.

The problem now is that when we add a totally new product to the cart view, re
renders and down here, oops, sorry, up here. There we go. Complete cart. When they
complete cart computed property method is called new product that was just added to
the cart is not in the Vista dot products data. So basically we fail to find when
we're looping over the new cart items, we failed to find that product and the product
ends up being no here, which is not something we expect. And eventually we try to
call a property on it.

So,

So it's a long way of saying that we end up with an item in the cart for a product
that is not in the, this.products data, but hold on a second, this doesn't make total
sense. Let's think about the whole flow. First. We add a new item to the cart that
should cause our cart watcher. There we go to be called because the cart just changed
and that should cause the load products method to make a fresh Ajax call for all of
the products in the cart at that moment, which will include the new product. And then
when we rerender and complete cart is called, we should be able to find all our new
products should be inside of the products data. So why isn't it? The answer is that
the watcher function only watches to see if an entire piece of data is changed or
replaced. Like when the cart goes from no to an object after the initial Ajax call,
if a piece of data is an array or an object like cart, the watcher does not watch for
changes to items in that array or keys on that object. In other words, when a new,
when a new item is added to the cart dot items array, our watcher is not being
called.

And so the Ajax call for the front new product is never being made. So what's the
fixed, what's the fix where you actually can make a watcher watch in deep mode, watch
for all changes on any level, actually in a copy of this download products, it's a
slightly different syntax here. We're going to say is cart colon. And then here,
we're going to say deep, true. That's the key. And then down here, we're actually
going to put the, uh, for the callback it's called async, we'll call it handler and
we'll make it async okay. It's called handler. And here I'll pack paste in this.load
products.

All right. So let's try this go over now, do a full page refresh, make sure you
remove the sofa and then refresh. Good. Uh, let's add a green one and it works. Look
at it, actually added it here, but you probably also noticed we got an air. It's
actually the same air as last time. That's because after the cart changes, but before
the products, Ajax call finishes view re renders and be computed in the complete
cart, computed property is still temporarily missing the product from the products,
the data. And so it explodes a moment later, the products AGS called finishes view re
renters again, and this works fine and we see it print it. So it eventually works,
but we have this nasty air down here to fix this inside the computer property. I'm
thinking that down here, if any of these items, after we go through our map is
missing its product. Let's just filter them out. What that would mean is that
temporarily there might be three items in the cart, but if one of them is missing
their product, then we'll only run a two of them. Once that products AGS call
finishes, it will rerender. And then we will include that third one.

So we can do that very simply by saying items, colon, complete items, dot filter with
an item argument, and then we'll set that to item that product. So basically I'll put
a little comment here, filter out missing products. They may still be loading.

Okay.

So now once again, we gotta do a full, we're gonna remove our item full page refresh.
Let's add a red sofa quantity too. And got it shows up here. No heirs. That is
awesome.

Yeah,

But this deep watcher is kind of overkill. Now, even when we change the quantity,
we're going to have new Ajax calls and check this out. Let's go over to my, uh, my
network tools over here for XHR I'll clear things out and I'm just gonna change this.
Check out. Every time I change the quantity, it calls our washer function and it
makes a fresh call for products that is total overkill. And maybe it's not that big
of a deal, but we can do better. So let's think about it. The only time that we
really need to load the products is when a new item has been added to the cart, can
we saw add a watcher to the length of the cart dot items, array, as strange as it
sounds we can. I'm going a copy of this, that load products, and then change this
back to and use a different syntax here. I'm actually gonna use a string that says
cart dot items,

Dot length,

And set that to a function. Doesn't matter what the name of that function is a I'll
call it, watch cart items, length, and then I'll paste in this, that load products.
Yep. That

Works. Let's try it out.

And once again, I'll just hit, I'll remove that item and do a full page refresh so we
can see the whole thing. And now if we've got a blue item here, let me clear my XHR
first.

Okay,

Cool. Blue shows up. You can see the AGS call. Awesome. But if we change the
quantity, the only AGS, obviously down there is saving the cart. We don't see the
extra one for the cart items. There is a fresh AGS call one, and we remove an item
which is technically not necessary, but I am happy with that.

So Watchers can be tricky

As part of the reason that I only use them when I absolutely need to. And this craze
in this case, as crazy as it looks, it solves our problem perfectly

Next.

I think I'm ready to buy these products. Let's learn about view transitions so that
we can make this cart section over here, transition into a checkout form.

