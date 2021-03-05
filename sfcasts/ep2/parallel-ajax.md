# Parallel AJAX with Promises

The last missing piece of data on the cart page is the item color. I want to show
a box with the actual color... but for that, we need the hex value. All we have
right now, if we look at the Vue Dev tools, is the color IRI. Of course, with
another AJAX call, we could use that to *get* the color data!

Cool! Let's go! We'll do exactly what we did to fetch the product data. First,
add a new `colors` data set to `null`:

[[[ code('904283cf0b') ]]]

Then, below in the watcher, we can fetch all the colors and then *set* them 
on that data. Do that with `const colorsResponse = await` and then call a function 
we saw earlier: `fetchColors()`. Hit tab to auto-complete that so PhpStorm 
adds the import way up on top:

[[[ code('33ac29736c') ]]]

Back in the watcher function, all we need is
`this.colors = colorsResponse.data['hydra:member']`:

[[[ code('095075ffc9') ]]]

We *could* make this smarter - like we did with products - where we only
fetch the color data that we need based on the items in the cart. But for our site,
there are *very* few total colors, so I've decided to fetch *all* of them.

Now update `completeCart()`. First, if the colors data is not set yet - if
not `this.colors` - then we should *also* return `null` from `completeCart()`.

[[[ code('b198bce24b') ]]]

Inside the object, use the same trick we used to find the matching product:
paste, and change the line to `this.colors`, `color`, `color`, and `cartItem.color`.

[[[ code('3427fe23bd') ]]]

To see if this is working, up in the template, on a new line, print the hex color:
if `cartItem.color`, then `cartItem.color.hexColor` - because `hexColor` is one
of the fields we get back from the AJAX call. If the product does *not* have a
color, print nothing.

[[[ code('138304b193') ]]]

Testing time! Back at the browser... woohoo! My two inflatable sofas have a
color. Those are going to look *great* in the office. Not *all* products have a
color, but those that do, *are* now printing it.

## Promise.all: Parallel Promises

But look back at the watcher function. I bet a lot of you spotted something wrong
here: it's inefficient! We're making the first AJAX call, waiting and *then* starting
the second AJAX call. Sometimes you *do* need to wait for one AJAX call to finish
before you start another one... because the second one *depends* on the first.
But that is *not* the case here: we should be able to start both of these
at the same time so they run in *parallel*.

We *could* accomplish that by refactoring these into separate methods... or
with the `.then()` syntax: using the response argument to set the products
data. We could do the same for colors.

But... I'm going to undo that. As a challenge, let's pretend that *both* of these
AJAX calls need to finish *before* we can run *either* of these lines of code.
Like, maybe because we need to combine the data from *both* endpoints in some way.

So the question is: how can we start *two* AJAX calls at the same time, but then
wait until *both* of them finish? The answer is with a cool `Promise.all()`
function.

Check it out: say `const` and then an array with `productResponse` and
`colorResponse` inside. Set that equal to `await Promise.all()`. Pass
*this* the two promises that we need to wait for: `fetchProductsbyId()` and...
after some reorganizing... `fetchColors()`.

[[[ code('0e13cfc57b') ]]]

I love this! `Promise.all()` takes an array of Promises and *returns* a Promise.
*That* Promise *resolves* once *all* of the *internal* promises resolve. The
final resolved data is an array... and so we use array destructuring to set the
`colorResponse` and `productResponse` variables. That's some fancy JavaScript!

And when we try it... hey! That fanciness even works!

## Loading Data Event Earlier

But... as cool & hipster as this is, we don't *really* need it in this case. And
we can make this even *more* performant. Think about it: because we're
querying for *all* of the colors - and not just the colors for the items in the
cart - we don't need to wait for the cart AJAX call to finish before fetching the
colors. Nope, the color AJAX call can start immediately when the component is
created.

At the bottom, add an `async created()`. Inside, say `this.colors = await`, then
move the `fetchColors()` here... but also with the `.data['hydra:member']` on it.
Oh, and make sure this is called `created` not `create`.

[[[ code('93918c7141') ]]]

Thanks to this, up here when the cart changes - so after the cart AJAX call
finishes - we only need to make the *one* AJAX call for products. I'll simplify
this again: `const productResponse = await`, then `fetchProductsById()`. Once
that's finished, set the `products` data. Oh, and don't forget your equal sign!

[[[ code('93918c7141') ]]]

Let's make sure I didn't bust anything. Do a full refresh and... got it!
Behind the scenes, the `cart` and `colors` AJAX calls both start immediately.
Then, when the cart API call finishes, the products AJAX call starts.

We can see this down in the browser network tools, filtered to the XHR calls.
The cart call starts first, then colors - though, you can see on the waterfall
on the right that they started at *almost* the same moment. Then, later, after
the `cart` call finishes, here is the products AJAX call. Pretty cool.

## Method Refactoring

Oh, but before we keep going, I want to make *one* tiny change. Add a `methods`
key at the bottom of the component with one method inside: `async loadProducts()`:

[[[ code('66c1d0c28e') ]]]

Move the three product AJAX lines from the cart watcher into this.
Then, call it from the watcher: `this.loadProducts()`.

[[[ code('4d7f65ec04') ]]]

There's no specific reason for this change. For me, it's more readable to give
these three lines of code, a name, like `loadProducts`. It's now easier
to understand that, when the `cart` changes, we load the products. I do this a lot
in PHP by creating private methods.

Next: we have all the data we need! So let's make this page *shine*.
