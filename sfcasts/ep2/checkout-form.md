# Checkout Form

The goal of this page is to have a checkout form. When the user submits the form,
we will send an AJAX request to our API to create a "purchase" in the database,
which will contain the customer's information from the form plus a list of the
items in the user's cart.

To *truly* love our low-budget, minimum viable product hip startup mentality,
instead of having a credit card form, after success, we'll redirect the user to
a page with information about where to mail a check to. Very cutting edge.

## Setting up the Data

Open `assets/components/checkout/index.vue`. This component will hold a bunch
of form fields like customer name, email address, etc. And so, it's going to need
to store those fields as data. Add a `data` function and return an object with a
`form` key set to another object. Add a key for every field: `customerName` initialized
to an empty string, `customerEmail`, `customerAddress`, `customerZip`,
`customerCity` and `customerPhone`.

Next, because we are *definitely* going to add form validation, add a
`validationErrors` data set to an empty object. This will eventually hold a map
of which fields are currently invalid with an error message.

## Adding the First Field

Nice! Up in the template, let's add the first field. Replace the text with a
`form` tag, no `action` needed, then some Bootstrap markup for the field: a div,
the label - with "Name:" and a `for` attribute set to `customerName`. It's not
necessary, but I've made this consistent with the data key so I can keep my
sanity. Add `class=col-form-label`... then add the `<input` and make sure its
`id` matches the `for` label attribute. Also add `v-model="form.customerName"`.

Thanks to this, whenever the user updates this input, `v-model` will *also* make
sure that the `form.customerName` data is *also* updated. Finish with `type="text"`
and `class="form-control"`.

Good start! And if we check it in the browser... it's there! Inspect element,
open the Vue dev tools and find the `CheckoutForm` component. We can watch the
`form.customerName` data stay in sync thanks to the `v-model`.

Oh, but to be *extra* cool, we can use `v-mode.trim`, which is a shortcut to trim
off any extra whitespace. Now if I go back... and put a bunch of spaces at the start,
the data does *not* have those.

## Rendering Validation Errors

Next, we don't have any form validation logic yet, but let's prepare our field
to be able to *render* the validation message based on the `validationErrors` data.
To help, start by adding a new `methods` section down at the bottom of the component
with one function: `isFieldValid()` with a `fieldName` argument. Inside, return
*not* `fieldName in this.validationErrors`.

We can use this above. First, on the input, if validation fails, this needs an
extra class. Change to use `:class` and set `form-control` to `true` so that it
*always* shows up. We also want an `is-invalid` class if *not*
`isFieldValid('customerName')`.

Next, after the input, add a `span` with `v-show` set to that same thing: *not*
`isFieldValid('customerName')` so that this *only* shows when the field is
*invalid*. Give this `class="invalid-feedback"` and print the validation error
inside: `validationErrors.customerName`.

And... hmm... ah! ESLint is mad because I messed up my indentation. Good work
ESLint!

## Vue Router?

Let's try this. Back at the browser, the page already refreshed... which highlights
one annoying thing about our setup: when we refresh, it takes us *back* to the
cart page. This is because we are *not* changing the URL whenever we go back and
forth. And so, our component can't remember that we're on a different page.

Depending on your situation, this might be ok... or it might totally *not* be ok!
This is something that could be improved by using the Vue Router, which is something
we'll talk about in a future tutorial.

Anyways, click back to the checkout form, find the Vue dev tools, locate the
`CheckoutForm` component and change the `validationErrors` data to an object
with a `customerName` key set to some message. Hit save. Nice! That's perfect!

So, our `customerName` field is ready! There's just one problem: do we *really*
want to copy and paste all of this 5 more times for the other 5 fields? Um...
*I* don't. We can do better. Next, let's create a new form input component that
we can re-use for every field.
