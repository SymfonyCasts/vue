# Cart Loading Quantity

Coming soon...

Our add to cart button works though. It's not very obvious. Like can click this
button. Nothing happens though. When I refresh, I can see the shopping cart header is
increasing.

I probably need something to show that this is working. Okay. Let's up our level of
fancy over in our components of any `data()` section, let's add a new `addToCartLoading`
data set to `false` by default, Then down inside of our function, we can start by
saying `this.addToCartLoading = true`
 
And then at the bottom of this, we'll say `this.addToCartLoading = false;`
But the only thing is that we need to actually add an awake here. So I will
say a `await`. And as soon as I make that away, I need to make my function. `async` love
it opens out our template. We can now use this new `addToCartLoading`. So I'll copy
that head up to my template. And how about this right after the add to cart, I'll add
an `<i />` tag It's self-closing and inside of this, I'll say `v-show="addToCartLoading"`
and we'll make this some using font. Awesome on this. So I can say `class="fas fa-spinner fa-spin"`
So that should give me a nice little
loading icon. When I go over here, I shouldn't need to refresh. Yep. It instantly
works. So that's already better.

What's
Also as an show that it worked, I want this happy feeling like you added something to
your cart, so let's go back over here, go back down to data. And we'll also add
something. That's a piece of data that says adding the thing that the cart was
successful. So `addToCartSuccess: false`.

And then down here, after we add it to our cart successfully, we'll say 
`this.addToCartSuccess = true;` And actually in case we add multiple things in the cart up
here. When we first do this, we'll set it back to fall. So we'll start at `false` and
then set it to `true` once we've added it to the cart.

now Up inside of our template, we're gonna use that in a very similar way. So let's copy
our `<i>` tag and we'll say, `addToCartSuccess`. And this time let's do `fas` and we'll do
an `fa-check` for a little check, Mark. That's not spinning. All right, let's try this
over here. And boom, I love the way that that is feeling

So when we add an item to the cart down here for checkout our AJAXcall, and in
addition to the product, there are two other imparts. There's the color, which some
products have a color, and there's also the quantity right now. We're just hard to go
to in both of these

Let's fix the quantity. First, what we need to do is basically bind to this color
data. When you need to do is basically bind our input here to a piece of colored data
so that when the input changes, it updates a piece of data. So let's start by adding
a new piece of quantity data down here. So I will say `quantity` or default that to a
one to start. And this is beautifully simple to some of the best parts of view right
here. We can do a `v-model` here. `v-model="quantity"`. It's that simple.
When the input changes that will change the quantity data and actually to be a little
fancier, I'll say `v-model.number`. But that number is cool because it converts
the string and the input into a number of type. Now we should be able to use this
down in our Ajax call. So instead of `quantity: 1`, we say `quantity: this.quantity`

Cool. Now, if we look over this input was actually blank. Is that going to go? Now?
It says one. If we click this up to three instead of 12 in our cart now, and add a
cart and refresh 15 items in our cart. Awesome. The last piece we're missing is the
product color. Well, this product doesn't come in. Any other colors, only this
beautiful yellow, but if you click furniture and click into the inflatable sofa, this
does come in multiple colors. We need to grab the selected color and send that in the
Ajax call. Let's do that next and update the car shopping cart number in the header
automatically. Whenever we add a new item of car, that's a little bit interesting
because that is outside of our view component.

