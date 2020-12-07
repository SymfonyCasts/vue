# Loading Animations & Quantity Input

Our add to cart button works... though it's not very obvious. We click "Add to Cart"
and... nothing happens! Sure, we can refresh and see that the shopping cart header
is increasing... but come on! We need some fireworks for when an item is added!

Find the `data()` section of the component. The first goal is to add a loading
animation *while* the item is being added. To track that "state", create a new
`addToCartLoading` data set to `false` by default.

Then, inside of the method, put `this.addToCartLoading = true` on the top, and
`this.addToCartLoading = false` on the bottom.

Oh, but *now* we will need to make the AJAX call *wait* until it finishes. Add
`await` and then, of course, we need to make the function `async`.

I love it! Copy the new `addToCartLoading` and head up to the template. Let's see..
right after the button, add an `<i />` tag that's self-closing with
`v-show="addToCartLoading"`. Our project uses FontAwesome, so we an turn this into
a loading animation with `class="fas fa-spinner fa-spin"`.

Yes, we *do* have a `Loading` component, but this will look nicer in this spot.
Back at the browser, we shouldn't event need to refresh. Yep! It *instantly*
works and looks better.

But, hmm. I *also* want users to get a happy feeling once the "add to cart"
finishes. Back in the component, go find `data` again: I want to be able to track
whether or not an "add to cart" has finished successfully. Create a new piece o
data for this called `addToCartSuccess` set to `false`.

Now, in the method, after the AJAX call finishes, say `this.addToCartSuccess = true`.
Oh, and in case we add multiple things in the cart, when the method *starts*,
make sure this is is `false`. So it starts `false`, then goes to `true` once
we're done.

Back up in the template, we're going to use this in a very similar way. Copy the
`<i>` tag, use `addToCartSuccess` and, for the `class`, use `fas fa-check` for
a cool, not-spinning, check mark.

Let's try it! Back on the page, click and... oh. That felt good. I think I should
keep shopping.

## Hooking up the Quantity Input

Ok: when we call `addItemToCart`, in addition to `product`, there are two other
pieces of data: `color` - for products that come in multiple colors - and
`quantity`. Right now, both are hardcoded to boring values.

Let's fix `quantity` first. What we need to do is basically bind this `input` to
a piece of data so that when the input changes, the data changes! And... we know
how to do that!

Start by adding the new data key: `quantity` with a default value of 1.

Next, up in the template, Vue makes it beautifully simple: `v-model="quantity"`.

Thanks Vue! Now, when the input changes, the `quantity` data will change. And
actually, to be a bit fancier, I'll say `v-model.number`.

That cool trick will convert the string input into a `Number` type. *Now* we can
use this below: instead of `quantity: 1`, we want `quantity: this.quantity`.

Head back to the browser. Nice! A moment ago, the `input` was *blank*. *Now*,
it starts at 1. Increase this to 3. We currently have 12 items in the cart, hit
"Add to Cart", refresh and... woo! 15!

Ok: the last missing piece is the product color. Well, *this* product doesn't come
in multiple colors, so it's finished. But if you click "Furniture" and then the
inflatable sofa, this *does* come in multiple colors. Next: we need to grab the
selected color and send *that* in the Ajax call. And you know what else? Whenever
we hit "Add to Cart", I'm tried of the header not updating until we refresh.
Let's *also* fix that... which is a bit interesting because that is *outside* of
our Vue component.
