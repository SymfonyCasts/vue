# Unexpected Server Errors

Our `/api/purchases` API endpoint already has validation rules on it. Yay! Look at
the interactive docs and hit "Try it out". I'll empty a couple of fields... and set
`purchaseItems` to an empty array. Hit Execute.

Yea! A 400 error with a *really* nice structure for the validation error messages.
We'll *definitely* be able to use that in Vue.

If you're a Symfony user, these validation rules are set as normal constraints
inside of the `Purchase` class, like `@Assert\NotBlank`.

Thinking about how to handle this in Vue, one nice thing is that if the status
code is 400, then we know we have some sort of *validation* error response. If the
AJAX call fails with some *other* status code, *that* would be an unexpected error.
And because this is a super-sensitive checkout form, I want to handle both cases:
normal validation errors and unexpected errors.

## Handling an Unexpected Error

Let's start by printing a message up here if something *weird* happens on submit.
In the `CheckoutForm` component, find `data` and add a new key: `serverError` set
to false.

[[[ code('1198c25e6e') ]]]

Then, head down to `onSubmit` and add `this.serverError = false` at the beginning.
If the form is submitted multiple times, this will re-set this back to false each
time.

[[[ code('e578bc60cd') ]]]

Down in `catch`, let's get to work. First, grab the response with some fancy
de-structuring: `const { response } = error`. Then if `response.status` - that's
the property that holds the integer status code - does not equal 400, we know
something weird happened. So let's say `this.serverError = true`. Else, we have
a normal validation error situation... which we'll handle in a few minutes. For
now, `console.error(response.data)`.

[[[ code('d73e9e336c') ]]]

Up in the template, let's use this new `serverError` to render a message right
inside the form. Add a `<div>` with `v-show="serverError"`, some classes for
styling and a message.

[[[ code('2933972287') ]]]

So how can we test this... when our API is *so* awesome that nothing unexpected
*ever* happens? Great question! We'll just... break the URL! In
`checkout-service.js`, change the URL to something that will 404.

Let's do this! Go to the checkout form and submit. Perfecto! The error message
even disappears momentarily each time we submit.

Let's go back and fix that URL... so I don't forget and deploy this to production.

## Disabling the Submit Button

Before we handle validation failures, I think we should *also* disable the submit
button so the user can't accidentally hit it multiple times. Our products are
*so* exciting that we've had this problem in the past.

Thanks to our `loading` data... it's pretty easy. Down on the button, add
`:disabled="loading"`.

[[[ code('7c22283b15') ]]]

We can immediately see the results: Bootstrap even has some styling to make it
*look* disabled.

Next: let's handle the *most* important part: validation errors.
