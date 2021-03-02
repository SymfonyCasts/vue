# Checkout Form

The goal of this page is to hold a checkout form. When the user submits that form,
we will send an AJAX request to our API to create a "purchase" in the database,
which will contain the customer's info from the form plus the list of the items in
the user's cart.

To *truly* live our low-budget, minimum viable product hip startup mentality,
instead of having a credit card form, after success, we'll redirect the user to
a page with information about where to mail a check to. Very cutting edge.

## Setting up the Data

Open `assets/components/checkout/index.vue`:

[[[ code('9a9d8f2f6d') ]]]

This component will hold a bunch of form fields like customer name, email address, 
etc. And it's going to need to store those field values as data. Add a `data` function 
and return an object with a `form` key set to another object. Add a key for every field:
`customerName` initialized to an empty string, `customerEmail`, `customerAddress`,
`customerZip`, `customerCity` and `customerPhone`.

[[[ code('5a7803d28f') ]]]

Next, because we are *definitely* going to add form validation, add a
`validationErrors` data set to an empty object:

[[[ code('3b3efad0e9') ]]]

This will eventually hold a map of which fields are currently *invalid* with their 
error message.

## Adding the First Field

Nice! Up in the template, add the first field. Replace the text with a
`form` tag, no `action` needed, then some Bootstrap markup: a div,
the label - with "Name:" and a `for` attribute set to `customerName`. It's not
necessary, but I've made this consistent with the data key... so I can keep my
sanity. Add `class="col-form-label"`:

[[[ code('13171d9754') ]]]

then add the `<input` and make sure its `id` matches the `for` label attribute. 
Also add `v-model="form.customerName"`.

[[[ code('9b1721acdb') ]]]

Thanks to this, whenever the user updates this input, `v-model` will *also* make
sure that the `form.customerName` data is *also* updated. Finish with `type="text"`
and `class="form-control"`.

[[[ code('ffd15d5bbb') ]]]

Good start! And if we check it in the browser... it's there! Inspect element,
open the Vue dev tools and find the `CheckoutForm` component. We can watch the
`form.customerName` data stay in sync thanks to `v-model`.

Oh, but to be *extra* cool, we can use `v-model.trim`, which is a shortcut to trim
off any extra whitespace:

[[[ code('a05ef9fe95') ]]]

Now if I go back... and put a bunch of spaces at the start, the data does *not* have those.

## Rendering Validation Errors

We don't have any form validation logic yet, but let's prepare our field
to be able to *render* the validation message based on the `validationErrors` data.
To help, add a new `methods` section at the bottom of the component with one
function: `isFieldValid()` with a `fieldName` argument. Inside, return
*not* `fieldName in this.validationErrors`.

[[[ code('0ca3c66983') ]]]

Use this above. First, on the input, if validation fails, this needs an
extra class. Change to use `:class` and set `form-control` to `true` so that it
*always* renders. We also want an `is-invalid` class if *not*
`isFieldValid('customerName')`.

[[[ code('af02cf1f0b') ]]]

Then, after the input, add a `span` with `v-show` set to that same thing: *not*
`isFieldValid('customerName')` so that this *only* shows when the field is
*invalid*. Give this `class="invalid-feedback"` and print the validation error
inside: `validationErrors.customerName`.

[[[ code('676fd2e749') ]]]

And... hmm... ah! ESLint is mad because I messed up my indentation. Good work
ESLint!

## Vue Router?

Let's try this! Back at the browser, the page already refreshed... which highlights
one annoying thing about our setup: when we refresh, it takes us *back* to the
cart page! This is because we are *not* changing the URL when we go back and
forth between the cart and checkout. And so, our component can't remember that
we're on a different page.

Depending on your situation, this might be ok... or it might totally *not* be ok!
This is something that could be improved by using the Vue Router: a topic
we'll talk about in a future tutorial.

Anyways, click back to the checkout form, find the Vue dev tools, locate the
`CheckoutForm` component, edit the `validationErrors` data and set it to an object
with a `customerName` key and some message. Hit save. That looks lovely!

So... our `customerName` field is ready! There's just one problem: do we *really*
want to copy and paste all of this 5 more times for the other 5 fields? Um...
no. We can do better. Next, let's create a new form input component that
we can re-use for every field.
