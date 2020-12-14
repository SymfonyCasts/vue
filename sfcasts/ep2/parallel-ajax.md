# Parallel Ajax

Coming soon...

And the last missing piece of data on the cart page is the item
color. I'd like to show the actual color here, but we need the hex value. All we have
right now, if we look down in the Vue, dev tools is the color IRI, of course, with
another ajax call, we could use that to get the color data, to do this. We'll
follow exactly what we did with the product data. First, add a color data `colors` is
set to `null` then below in the watcher, let's fetch all the colors and then set them
on the data. So I'll say `const colorsResponse = await`, and we'll use a functional
use before a `fetchColors()` and I'll hit tab. So that, that auto completes and adds the
import way up here for me.

Now down below, I'll kind of do the same thing as the products, 
`this.colors = colorsResponse.data['hydra:member']`. We could also do something like we did with
products where we only fetch the colors, the color data we need for the items in the
cart, but on our site, there are, there are very few total colors, so I'm dispatching
them all every time. Now let's update our `completeCart()`. First. If the colors are
also first, we need to check if the colors, if not `this.colors`, then we should also
return `null` from `completeCart()`. It means that the colors aren't loaded yet, then down
here, I'm actually going to copy the trick we use for finding the matching product,
paste that and change it to `this.colors`, `color`, `color`, and a `cartItem.color`. You
okay to see if this is working up above and our template on a new line here, and
we'll just print out the cart, the hex color, but first we need to check to see if
there actually is a color. So I'll say `cartItem.color ? cartItem.color.hexColor`
that `hexColor` is one of the properties that we get back
from the Ajax call Ellis. I'll just print out an empty string.

All right, let's try it. Move over in. I don't even need to refresh. You can see my
two inflatable sofas have their color. Not all products have a color, but these that
do are printing out the hex. Let's look back at the watcher function though. I bet a
lot of you spotted something wrong here. It's in efficient. We're making the first
Ajax call waiting and then making the second Ajax call. Sometimes you do need to wait
for one Ajax call to finish before you start another one, because the second one
depends on the first, but that's not the case here. We should start both of these
Ajax calls at the same time. So they run in parallel. Now we could do that by
refactoring these, to use the dot, then syntax like this.

And then in a callback, we would basically use this response argument here to go and
set the products data. And we could do the same thing for colors, but I'm going to
undo that because as a challenge, let's pretend that we need both of these Ajax calls
to finish before we can run either of these lines of code. Like the example would be
that you need to get an AGS call from two different sources so that you can then
combine them in some way.

I think we wait for it to promises, to finish running. The answer is with a cool
promise dot all function. Check this out. Wouldn't say `const` and then set these to an
array. So I'll say `const [productResponse, colorResponse]`. This is actually
aray de-structuring `= await`. And then here, when I say `Promise.all()` and
pass that in a Ray of all the promises that we want to wait for, which for us is
`fetchProductsbyId()` then I'll do some reorganizing `fetchColors()`. So basically this is
going to wait for both of these promises to finish. It doesn't matter which one
finishes first. And then the resolve value of `fetchProductsById()` will be set to
`productsResponse`, and `fetchColors()`, or was that the `colorsResponse`? So that's it,
it's a kind of a really cool thing. And if we move over here and refresh, it works
perfectly, but as cool as this is, and I purposely showed it because this `Promise.all()`
thing is really cool. We don't need, we don't need it in this case. why since
we're queering for all of the colors and not just the colors that are for the items
in this, this cart, we don't need to wait for the cart Ajax call finish. Before we
start fetching the colors. Nope. This color AGS call. It can start immediately. When
the component is created,

Checking this out, down at the bottom, let's add an `async created()` Inside of here. I'm
going to say `this.colors = await`. And then I will move my `fetchColors()` down here,

But with

Also with my `data[hydra:member']` on it. Oh, and make sure this is called async created
not create. So this HS call will start immediately. And then up here after the cart
changes. So after the cart HS call finishes, then we only need to make the, uh, ajax
call for the products. So I'll simplify this again. `const productResponse = await`
and then we only need to execute our `fetchProductsById()`. Then once that's finished,
then we will set the products data. Oh, don't forget your equal sign.

All right, let's make sure this didn't break anything and move over. I'm gonna do a
full refresh and got it behind the scenes. The cart end colors, API calls start
immediately in parallel. Then when the cart API call Ajax call finishes, the products
AGS call starts. We can kind of see this a little bit down on our network tools on
under the Ajax thing here, you can see that the order that they finishes, this is the
cart one that happens to been at first. And the colors though, that might be in a
different order. If the colors end point is ever a little faster, and then a little
bit later, you can see where it actually finishes our products call right here. Oh.
And before we keep going, I'm going to make one other small change At a `methods` key
on the bottom of our component And great one in here called `async loadProducts()`.

And

What I'm gonna do is actually move all of these three lines of code from our cart
watcher, into `async loadProducts()`, and then just call `this.loadProducts()` from up
there. There's no specific reason for this change. For me, it's just more readable to
give these three lines of code, a name, like load products. So now I can see that I'm
watching cart. And when cart changes, I reload my products. I do this line PHP by
creating private methods. Anyways, now that we have all the data we need, let's bring
this page truly to life. That's next.

