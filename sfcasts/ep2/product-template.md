# Product Template & Color Selector

Coming soon...

easy and it shows up perfectly, okay, we've come this far. Let's actually finish
rendering this component, which is mostly just a bunch of HTML that we need to print
out. That's going to render various properties from our product object. Now, if you
download the course code, you should have a `tutorial/` directory. Let me find mine
here. It is with a couple of files inside of it that we're going to use in this
tutorial. First, I want you to copy this `colors-service.js` into our `assets/service/`
directory. I'll Talk about this in a second.

Then I also want you to call it, copy the `color-selector.vue` and put that into the
`components/` directory. Okay. We haven't talked about out about it, uh, much yet, but
some products come in several colors and the user will need to choose which color
they want when they add to the cart. So this is a simple component that loads all of
the colors inside of created from an Ajax call. So there's actually an end point that
returns all of the different colors that are available in our entire system. So in
our API, there's not different.

Okay?

So there's returns to the full collection of colors in the entire database. So not
specific to one product, it then presents each color via V4 in three different
swatches. When a user clicks on them, the component emits via this `selectColor()`, a
`color-selected` event that we can listen to. Also when it loops them, it uses a
dynamic selected class. So it gets slightly different styling. When this one is
selected, you're going to see that in a second. So it's pretty straight forward, but
that's a pretty cool reusable component. I paste it in here just because as cool as
it is, there's nothing really new about it For the rest of the products show
template. I'm actually going to go to the bottom here after my VF product in paste, a
bunch of HTML that you can get from the code block on this page. And let's see, you
got a little extra white space right there. That looks good. We'll talk about this in
a second

And all the way at the bottom. I'm also going to, after my script, pass a small style
tag. Now, if you go back up to the template code that has pasted, there's nothing too
special here. We're just printing out a, we have a new div here that only renters via
V if product, instead of here, we're just printing out the image and other data like
the brand, the description is different fields on the product. We also at the bottom
have an input for the quantity, but this is non-functional meaning it's not bound to
any data or anything. It's just an input. And there's also a button that doesn't do
anything yet. So a bunch of HTML, we are also rendering the `<color-selector>`. If this
specific product call it product has color. So I mentioned already some products have
colors and some don't. So there's a color is property on the product, which tells us
whether or not this product accepts colors. So if it does accept colors, we're going
to run to that `<color-selector>`. And let's actually make sure that we import that. So
down here, I will import `ColorSelector` from `@/components/color-selector`. And then
down here, we can put that inside of our `components`.

And now it should be re it should be usable up here. Uh, this is one of the things we
do here is we print out price. That's actually a computed property. Uh, we can
actually steal this from `ProductCard`. Uh, if you remember in product card, we have a
computed price thing here. And what that does is it actually, um, formats the price
before it prints it out. So I'm actually going to copy this, move this over into our
`ProductShow` down here as a `computed` property.

So I'll say computed paste that there, and then this references, when I pasted that
in one thing it did, I want to notice is it automatically imported that format price
for me? So you do need to import that now, and that should be it button. My build is
super mad. For some reason, export get colors was not found in at services, colors,
dash service. That's actually checked that out. Ah, this is my bad. This is called
fetch colors inside of here. I will fix that in the code download, but we actually
needed to import fetched colors here and then use `fetchColors` down there meant to
change that in the tutorial directory I will. So your should be called `fetchColors`.
Now the build is happy. That's also one of the benefits of and Encore. I made a
mistake there and, um, I build didn't even work.

All right. So now with any luck when you're refresh, when we go over, yes, it's
already there. I'll refresh to be sure, but we have the image, the title, the
description, the formatted price. Beautiful. When you see an example of the color
selector, go to furniture and click this big cool inflatable sofa, boom. There is our
cool color selector and you can see the different, uh, styling you get when you
select one. And even though we're not listening to it yet, if you go to the view dev
tools and go to events, you can see every time I click one of those, it's dispatching
another event down here, which is pretty cool. We are going to take advantage of that
soon so that we configure out which one is clicked when we hook up this, add to cart
functionality. So next we are ready to start adding things to our cart. So let's do
that.
