# Product Template & Color Selector

Time to build this product show page and make it shine! This will involve adding...
mostly just a bunch of HTML that prints product data... so let's cheat!
If you downloaded the course code, you should have a `tutorial/` directory. Let me
find mine. This holds a few files that we're going to use. Start by copying
`colors-service.js` into `assets/service/`. We'll check that out in a minute.

[[[ code('16e61774a4') ]]]

Also copy `color-selector.vue` and put that into `assets/components/`.

[[[ code('ada33b1b48') ]]]

Okay: we haven't talked about it yet, but *some* products come in *several* colors.
This means that the user will need to choose which color they want when they add
that product to their cart. This simple component loads all of the colors inside its
`created` function. Yep, there is literally an API endpoint that returns information -
like hex colors - for *every* possible color in the system.

It then renders each color via different color swatches - little boxes. When a user
clicks on one, the component emits - via this `selectColor()` method - a
`color-selected` event. That's going to be *super* handy later. Also, when it loops
over the colors, it uses a dynamic `selected` class so we can see which color is
currently selected.

So it's pretty straightforward, but this is also a *pretty* cool, reusable component!
Though, it doesn't contain anything *new* to us.

For the rest of the `product-show` component, go into the template and, after the
`v-if`, I'll paste a *bunch* of HTML! You can copy this from the code block on
this page. Oh, I've got some extra whitespace.

[[[ code('968ac9ec5c') ]]]

Then... *all* the way at the bottom, after the `script`, I'll also paste a small
`style` tag.

[[[ code('169459b466') ]]]

Scroll back up to the template code that we just pasted. There's nothing too
special: there's a new `div` that only renders `v-if` there is a `product`.
Inside, we render the image and other data like `brand` and `description`.

Near the bottom, there is also an `input` for the quantity... but this is
non-functional. What I mean is: it's not bound to a piece of data and it doesn't
have any listeners on it. It's just... an input. Below that is a button that *also*
doesn't do anything yet.

## The Color Selector

The most interesting part might be that we're rendering the `<color-selector>`
component. If this product comes in multiple colors, we render the color selector.

Oh, but we haven't imported this yet. Down here, import `ColorSelector` from
`@/components/color-selector`... and put that inside `components`.

[[[ code('444bea5175') ]]]

One other special thing we do in the template is print a `price` computed property...
which we don't have yet. Open `product-card`. This *already* has a computed `price`
property that formats the price before rendering it. Copy that, go to
`product-show`, find `computed` and paste.

[[[ code('688bca7b69') ]]]

Thanks to PhpStorm, when I pasted that, *it* added the `formatPrice` import *for*
me. Awesome!

But... I've been noticing that my Encore build is *super* mad! What's up?

> export `getColors` was not found in `@/services/colors-service`.

Ah, I bet that's my fault! Open the `colors-service.js` file. Yep! The export is
called `fetchColors`, but in `color-selector.vue`, I'm using `getColors()`. I'll
change that *and* fix the file in the `tutorial/` directory so you don't have
this issue.

*Now* the build is happy. It's pretty awesome that Webpack won't let you get away
with a mistake like that.

Ok: with any luck, the page *should* work. When we move over... yes! I'll refresh
to be sure. We have an image, title, description and formatted price! Beautiful!

To see an example of the color selector, go to Furniture and click this big cool
Inflatable Sofa that's *great* for office productivity. Boom! A neat lil' color
selector with a border on the active element. And even though we're not listening
to it yet, if you go to the Vue dev tools and click "Events"... each time I click
a color, it dispatches a `color-selected` event. We're going to take advantage of
that soon.

Ok! I think we're ready to start adding stuff to our cart! Let's talk about the
cart API next!
