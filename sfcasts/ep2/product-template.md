# Product Template

Coming soon...

We have this title component, which we're using, which we're reusing so that we can
have a consistent look with some styles that we have here on the bottom, uh, across
our components. So in product show, let's use this down here. I will import 
`TitleComponent`, calling that tall component and not title from `@/component/title`. 
Then we'll put that into our components spot down here, the `TitleComponent`

And up here instead of my manual, `<h1>`, it will say `<title-component />`. And for now I'm
purposely not passing a prop in there. So I realized that looks kind of strange
because there's a problem can move over and try this. We are in a product page and it
seems to kind of work. It says all products show where that's coming from. And more
importantly, there's an air down here missing required props `categories`. We are
apparently supposed to pass a `categories`, prop to our title. Oh, okay. Let's see.
What's going on here. The problem is, if you look at a title component, it's way too
smart, it wants to do everything for us. It's expecting us to pass it, the
`categories`, the `currentCategoryId`. And then it does a bunch of logic to figure out
if we're on a specific category page or if we're not, but now we need to do something
different when you're on it.

And this logic isn't able to handle it. What we need to do is actually turn this into
a dumb components that receives just whatever text we want as a prop in Prince that
here. So this is really a mistake that I originally made. We made this title
component kind of hold this logic here, which seemed like a good idea at the time.
But now we can see that it would have been a better if it was just a dumb component.
And we did all the work of passing it, the text from the outside. So we've talked a
few times about having dumb components that just render markup versus smart
components that do calculations, but don't run a markup. It's not a complete rule,
but this is kind of why dumb components are very easy to reuse. All right? So let's
turn this into a dump component. What we're going to do down here is we only need one
property. We're going to call it `text`. It's going to be string. It's going to

Be required true.

Then up here instead of `categoryName`, it's just going to be `text`. Now, all this
logic for computing, the `categoryName`, I'm going to copy this, then delete the
entire computed section. And then if you go into the catalog components, so 
`assets/components/catalog.vue` This is actually where we're using the title component right now
are passing those two things in here. So I'm going to put the new computer property
into this class. I currently do not have a computer property yet.

So let's add one after data `computed()`,

Then we will pass in the category name and this as the same, uh, uh, current category
ID and categories. Uh, those are both pieces of props on this component. And then up
here, it's very simple. Now let me have the `<title-components>`. I'm actually just going
to shorten this to a single line because now it's as simple as passing that `text`, um,
prop set to `categoryName`

And before we go to the next page, let's actually go back here and click all
products. It says all products, office supplies. It says office supplies. And on the
product show page, we are now free to do whatever we want to do. So on product show,
we are going to pass it. The tech `:text="product.name"`. Love that that is super
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

