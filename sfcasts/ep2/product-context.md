# Current Product Id

So here's the plan: ,ake our top-level Vue component - `products.vue` - able to
render either the product list page *or* the product show page. Why are we making
*one* component able to render two different pages? Well, in reality, this is
basically how Vue router normally works: one top-level file leverages the
Router to render one of many different components based on the URL. And, in this
case, I *also* want both pages to have the same *sidebar*. So we'll be re-using
the layout from `products.vue`.

## Passing a currentProductId Global Variable

So... how will this component determine which page it's on? We could parse the
URL... *or* we could pass some info *into* Vue to help it.

Look at the Twig template. When we're on a specific category page, for example,
if I click "Office Supplies", we set a `currentCategoryId` global variable, which
our Vue component reads to load the correct category. Now, we're going to do the
*same* again: add a `currentProductId` if we're on a product page.

In the controller... in the `showCategory()` action, the `currentCategoryId` is
not the *database* id, it's the category IRI - like `/api/category/5`. We generated
that by autowiring the `IriConverterInterface` thing.

Down in `showProduct()`, let's do the same thing: add
`IriConverterInterface $iriConverter` and then pass a new variable:
`currentProductId` set to `$iriConverter->getIriFromItem()` and pass it `$product`,
which is the entity object that Symfony automatically queried for.

By the way, we *could* pass the *entire* `Product` object into the template and
then serialize it to JSON - similar to what we did with the `categories`. That
would help us avoid an AJAX call for the product data *and* let Vue render a bit
faster. I'm going to avoid that here... mostly to make our life a bit harder. Again,
yay learning!

In the template, copy the `currentCategoryId` code... then change everything to
`currentProductId`. So if that variable is defined, set a new global JavaScript
variable and escape it for JavaScript, just in case.

Cool! So in theory, at the browser, if we click into a product, we should have a
global variable. I'll try it in the console: `window.currentProductId`. Cool!

## Reading the currentProductId in Vue

So how could we read this in a Vue component? Well... it's a global variable... so
we could put `window.currentPrroductId` *anywhere*. But in the last tutorial, we
started centralizing these global variables into a `services/page-context.js` file.
As a reminder, `services/` is a directory that - for the most part - holds files
that make AJAX calls. But in the case of `page-context`, instead of reading data
from AJAX calls, it reads global variables.

Add a new method here, `export function  getCurrentProductId()` and make it return
`window.currentProductId`. We can even impress of friends by adding some documentation
to this.

Beautiful!

To make sure this is all working, let's render this value in our Vue component. To
do that, we need to make it available in the template... because we can't just call
random functions from up here. The easiest - and nicest - way to do that is via
a computed prop. In the component, add a new one called `currentProductId()`.
Inside, return `getCurrentProductId()` and hit tab to auto-complete that.

Now, when it auto-completed, PhpStorm automatically added the new import *for* me...
though I don't love that it put this on multiple lines... I'll fix that.

*Anyways*, we now have a `currentProductId` computed prop, so we can use it up
in the template right before the `catalog` component, which lists all the products:
`{{ currentProductId }}`.

I love it! Go check the browser. We don't even need to reload! It's already there.

Now that we have this, I feel the power. But how can we render something different
in the component *based* on this? Well, there are a couple of options, including
the tried-and-true `v-if`. But instead we're going to use something fancier called
a dynamic component. That's next.
