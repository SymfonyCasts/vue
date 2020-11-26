# Current Product Id

So here's the plan: make our top-level Vue component - `products.vue` - able to
render either the product list page *or* the product show page. Why are we making
*one* component able to render two different pages? One reason is that this is
basically how Vue router works: one top-level file leverages the Router to render
one of many different components based on the URL. *And*, in this situation, I
*also* want both pages to have the same *sidebar*. So we'll be re-using the
layout from `products.vue`.

[[[ code('75923d22f5') ]]]

## Passing a currentProductId Global Variable

So... how can this component determine what the current page is? We could parse the
URL... *or* we could pass that info *into* Vue.

Look at the Twig template. When we're on a specific category page, for example,
if I click "Office Supplies", we set a `currentCategoryId` global variable, which
our Vue component reads to load that category. Now we're going to do the
*same* thing again: add a `currentProductId` if we're on a product page.

In the controller... in the `showCategory()` action, the `currentCategoryId` is
not the *database* id, it's the category IRI - like `/api/category/5`. We generate
that by autowiring the `IriConverterInterface` service.

[[[ code('8a761b494b') ]]]

Down in `showProduct()`, do the same thing: add
`IriConverterInterface $iriConverter` and then pass a new variable:
`currentProductId` set to `$iriConverter->getIriFromItem()` and pass it `$product`,
which is the entity object that Symfony automatically queried for.

[[[ code('3da73d79fb') ]]]

By the way, we *could* pass the *entire* `Product` object into the template and
then serialize it to JSON - similar to what we did with the `categories`. That
would help us avoid an AJAX call for the product data *and* let Vue render a bit
faster. I'm going to avoid that here... mostly to make our life a bit harder. Again,
yay learning!

In the template, copy the `currentCategoryId` code... then change everything to
`currentProductId`. So if that variable is defined, set a new global JavaScript
variable and escape it for JavaScript, just in case.

[[[ code('3da73d79fb') ]]]

Cool! So in theory, at the browser, if we click into a product, we should have that
global variable. I'll try it in the console: `window.currentProductId`. Nice!

## Reading the currentProductId in Vue

So how could we read this in a Vue component? Well... it's a global variable... so
we could put `window.currentProductId` *anywhere*. But in the last tutorial, we
started centralizing these global variables into a `services/page-context.js` file.
As a reminder, `services/` is a directory that - for the most part - holds files
that make AJAX calls. But in the case of `page-context`, instead of reading data
from AJAX calls, it reads global variables.

Add a new method here, `export function getCurrentProductId()` and make it return
`window.currentProductId`. We can even impress of friends by adding some documentation.

[[[ code('b7af29965a') ]]]

Beautiful!

To make sure this all works, let's render this value in our Vue component. To
do that, we need to make it available in the template... because we can't just call
random functions from up here. The easiest - and nicest - way to do that is via
a computed prop. In the component, add a new one called `currentProductId()`.
Inside, return `getCurrentProductId()` and hit tab to auto-complete that.

[[[ code('fcab87d1b8') ]]]

When it auto-completed, PhpStorm automatically added the new import *for* me...
though I don't love that it put this on multiple lines... I'll fix that.

*Anyways*, now that we have a `currentProductId` computed prop, we can use it up
in the template right before the `catalog` component, which lists all the products:
`{{ currentProductId }}`.

[[[ code('52fa745d7c') ]]]

I love it! Go check the browser. We don't even need to reload! It's already there.

I can feel the power! Now, how can we render something different
in the component *based* on this value? There are a few options, including
the tried and true `v-if`. But instead, we're going to use something fancier called
a dynamic component. That's next.
