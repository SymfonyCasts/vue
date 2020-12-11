# Cart Basics

Coming soon...

Thanks to the mix in our shopping cart component has the cart data, which is being
loaded via Ajax on created. So let's use that to build this page. We'll start with a
V if so that we don't try to use the cart data before it's loaded. So div V dash if =
cart and I'll have to be extra, extra careful as a card does not equal. No, then
let's leave. If you check the view. Well, what just happened here? Did that happen?
What the hell happened? If you check the view dev tools down here in shopping cart,
you can see that the cart contains an items key, and we can loop over those items.
But each item does not have an ID, which is a bit of an odd setup in our API, but
it's fine. It's really the product and color combination that are sort of a composite
key. Anyways, let's loop, I'll say div, but that's on the multiple lines with V dash
four and for the V4, I'm going to use the longer syntax. So I can say cart item.
That's the thing we're going to loop over and comment index. So I can get the index
of each item in cart dot items.

And I'm doing this because right now we don't have a key to use. I'm gonna use colon
key = index. So I'm just gonna use the index for now and later we'll use something,
we'll fix it up and make you something better. Perfect. Then inside, we can just say
for now cart item that product, and let's say also card item quantity. All right,
let's see how this looks. When I move over. It works and, but it's not very pretty or
useful yet, but it is a start before I forget, let's also handle the situation where
the cart is empty. Want to encourage people to start shopping. So down here, still
inside the V if car will say div V if = cart, the items that cart, that items length
= zero, then we know that the, your cart is empty. Get the shopping.

We can test it over here by messing with the view dev tools. I'll go to shopping cart
and go to item. And I will modify this just to be an empty array. And there we go. As
a final touch, since the cart doesn't render until the cart Ajax call has finished,
let's add a loading animation. So down on the phone, and we'll start by importing
that import loading from at, at /components /loading to use our reusable loading
components. I'll add loading down to our components. Then up top, just above the VF,
we can add loading with Videsh show = art = equals. No, and we can also use V if
there, as we talked about earlier, since this loading will probably just be shown
once and then hidden forever, it doesn't really matter. And later we might need a
smarter loading mechanism that actually tracks some loading data.

But for right now, if the cart is no, we know things are still loading seven, move
over now. Yep. I can see the loading animation just there for a second before it
loads. So this is working, but obviously we will want to render more stuff like the
product name and price. The problem is, if you look at the view dev tools, we just
don't have that data. Each car item is just these three pieces of data in a more
perfect world. The cart API call would return more data. So we would just have
everything. But since it doesn't, what we really need to do is make an Ajax call for
the cart. And then when it finishes on another Ajax call to fetch the data for each
product in the cart, start by opening assets, services, product service dot JS, and
at the bottom, I'm going to paste in a new function, fetch products about by ID,
which you can copy from the code block on this page.

This is cool because we can get the product. I, our eyes for every item in our cart,
basically collect these string from each of these and call this function to make one
Ajax call to fetch all of their data at once. But how exactly can we do that in
shopping cart, we need to run some. We need to call that function to make that Ajax
call after the cart Ajax call has finished, but the cart AGS call doesn't live in
this component. It lives over here in created in the mixing. How can we run some code
after this finishes next, let's talk about how to do that. And in general, we've got
some work to do because our cart is missing details. Let's go fetch those details so
that we can fully render this page.

