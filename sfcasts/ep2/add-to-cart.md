# Add To Cart

Coming soon...

All right. So first when we click it,

And one thing that we want to prevent is that cart object is being loaded.
Asynchronously is we don't want someone to hit add to cart before we have the cart
object. So we can fix that really easily. By going up to the add to cart button, and
here we can say, `:disabled` set to `cart === null`. We don't have a cart, it
should be disabled.
And Now we can hook up the real functionality we want, which is that `@click=""`, let's call
it a new `addToCart()` method down here. Let's add that method. I'll go down to the
bottom `methods: {}`, `addToCart()` This one

Won't take, don't need any arguments here. And what we're gonna do here now is
actually call that add to cart method from inside of our `cart-service`. So I'll say

`addItemToCart()` I'll hit tab to auto, complete that again, it's a little redundant, but I just
want to show you that that did add the import

Or up here.

I'm the cart and what we need to pass. This is going to be the cart object, which we
know is going to be `this.cart`. And we know that it's safe to reference that because
we know that in practice, this `addToCart` method is not going to be callable. Um,
until the cart is loaded because the button will be disabled.

So `this.cart`, and then we need a pass the item
Yeah. And what would, this actually is each item in the cart is actually three
things. It is the product IRI, which we can set to `this.product['@id']` The `color`,

Which for right now, I'm going to set to null or about that in a second and a
`quantity`, which I will set to one. Now, if you look confused, why I know fields to
put there again, this is just how my API is designed. So if I go back and look at the
cart API and look at the put end point here, and the put end point allows us to, uh,
add a product color and quantity and array of those objects inside of here. So that's
what we are passing

All right. So that should be it. Let's actually see if this works. So let me refresh
one more time. Fresh. I'm going to add a cart and I think it worked. I don't see any
areas here. You can actually see the Ajax call was successful down here for post
`/api/carts`. Since we don't have a cart yet to refresh

And check the cart data and Oh, you can see it's actually still empty. This is
actually a little bug I've been seeing on my computer. I wanted to show you in case
any of you hit it. You actually look at the source code right now. You see the
`window.cartIri` is still null. The problem is that I use `localhost:8000` for tons
of projects. And since I'm using on HTTP, which means I already have cookies from
other projects. And since I'm using this on HTTP, it's actually rejecting my cookie
in favor of those existing secure cookies. Long way of saying, if you get this, you
can actually go into application and clear your storage completely. So this is
basically clearing my session storage. Now I'm going to refresh, I'll go back to the
view data tools. I'm going to add a cart one more time.

This time when I refresh. Yeah. So you can see actually up in the header, it says
shopping cart one. And if we look at the view tools down here, yes, our cart has one
item in it with quantity one. So that kind of, we had that quantity thing going, I'm
going to hit add a cart two more times and you actually see that this header doesn't
update yet. We're going to fix that soon. But when we refresh now, it says three and
our cart here still has one item in it. But now that one item has quantity three. So
yes, we are adding things to our cart.

So next, let's make this fancier with some animations, hook up the quantity and color
selectors for products that need a color and somehow update this cart header
immediately, whenever we click add to cart. So we don't have to wait for it to
refresh.
