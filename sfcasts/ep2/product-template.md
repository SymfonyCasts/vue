# Product Template & Color Selector

Time to build out this product show page and *really* make it shine. This is...
mostly just a bunch of HTML that prints out product details... so let's cheat!
If you downloaded the course code, you should have a `tutorial/` directory. Let me
find mine. This holds a few files that we're going to use. Start by copying this
`colors-service.js` into `assets/service/`. We'll check that out in a minute.

Also copy `color-selector.vue` and put that into `assets/components/`.

Okay: we haven't talked about it yet, but *some* products come in *several* colors.
This means that the user will need to choose which color they want when they add
it their cart. This is simple component loads all of the colors inside its
`created` function. Yep, there is literally an endpoint that returns information -
like hex colors - for *every* possible color in the system.

It then renders each color via different color swatches. When a user clicks on one,
the component emits - via this `selectColor()` method - a `color-selected` event.
That's going to be *super* handy later. Also, when it loops over the colors, it
uses a dynamic `selected` class so we can see which color is currently selected.

So, it's pretty straightforward, but this is also a *pretty* cool, reusable component!
Though, it doesn't contain anything really *new* for us.

For the rest of the `product-show` template, go into the template and, after the,
`v-if` I'll paste a *bunch* of HTML! You can copy this from the code
block on this page. Oh, I've got some extra whitespace.

And... *all* the way at the bottom, after the `script`, I'll also paste a small
`style` tag.

Scroll back up to the template code that we just pasted. There's nothing too
special here: there's a new `div` that only renders `v-if` there is a `product`.
Inside, we render the image and other data like the `brand` and `description`.

Near the bottom, there is also an `input` for the quantity... but this is
non-functional. What I mean is: it's not bound to a piece of data and it doesn't
have any listeners on it. It's just... an input. Below this is a button that *also*
doesn't do anything yet.

## The Color Selector

The most interesting part might be that we're rendering the `<color-selector>`
component. Remember: some - but not *all* - products have some colors to choose
from. If there *are* colors, we render the color selector.

Oh, but we haven't imported this yet. Down here, import `ColorSelector` from
`@/components/color-selector`... and put that inside `components`.

One other special thing we do in the template is print a `price` computed property...
which we don't have yet. Open `product-cart`. This *already* has a computed `price`
property which formats the price before rendering it. Copy that, go back to
`product-show`, find `computed` and paste.

Thanks to PhpStorm, when I pasted that, *it* added the `formatPrice` import *for*
me. Awesome!

But... I've been noticing that my Encore build is *super* mad! What's up?

> export `getColors` was not found in `@services/colors-service`.

Ah, I bet that's my fault! Open the `color-service.js` file. Yep! The export is
called `fetchColors`, but in `color-selector.vue`, I'm using `getColors()`. I'll
change that *and* fix the file in the `tutorial/` directory so you don't have
this issue.

*Now* the build is happy. It's pretty awesome that Webpack won't let me get away
with mistakes like this.

Ok: with any luck, the page *should* work. When we move over... yes! I'll refresh
to be sure... but we have an image, title, description, formatted price! Beautiful!

To see an example of the color selector, go to Furniture and click this big cool
Inflatable Sofa that's *great* for office productivity. Boom! A neat color select
with a border on the active element. And even though we're not listening to it yet,
if you go to the Vue dev tools and click "Events"... each time I click a color,
it dispatches a `color-selected` event. We're going to take advantage of that
soon.

Ok! I think we're ready to start adding stuff to our cart! Let's do that next!
