# Form Validation

Let's handle the *really* important case: when the POST request fails with
validation errors. Look at the data from the response down here in our console log.
The data has this really nice `violations` key... and then each violation has a
`propertyPath` that tells us exactly *which* field it should be attached to.

Love that! Inside of our checkout form component, we also already built this
`validationErrors` object, which is... already being used by each field to figure
out whether that field is invalid and what error message to show. So... basically,
all *we* need to do is read `violations` and map each one to the `validationErrors`.
We planned ahead and it *rocks*.

## Mapping the API Errors into the Form

Head down to `onSubmit()`. The first thing I'm going to do is, at the beginning,
add `this.validationErrors = ` an empty object. This is actually going to cause
a *reactivity* problem... a problem where things don't re-render at the right time.
But... don't worry about that yet: we'll talk about it deeply in a few minutes.

Down in else, say `response.data.violations` - that will be an array - `.forEach()`
and pass that a callback with a `violation` argument. The logic we need inside is
pretty simple: `this.validationError[` `violation.propertyPath` because each
violation has that key... and, as you can see in the docs, it will be equal to the,
sort of "id" we've been using for each field. Set this to `violation.message`.

That... should do it! Move over, get to the checkout form and submit it empty. Woh!
That's gorgeous!

## Finishing Checkout Success

Before we talk about client-side validation, I think we should finish `onSubmit()`
by handling the "successful" case: what happens after if the form *is* valid and
a new `Purchase` *was* created in the API.

Open `src/Controller/CheckoutController.php`. I've already created a really simple
"order confirmation" page. All we need to do is get the id of the new `Purchase`
that was just created by the API and then redirect to `/confirmation/{id}` that ID.

There's nothing really fancy about this. Back in Vue, inside of the successful
side of things - the `try` - add `window.location =` and then we can use fancy
ticks `/confirmation/`, then `${}` and `response.data.id`.

This is not `@id`, it's actually `id`. If you look at the API docs, I don't always
return an `id` field on my resource... since every resource already has an `@id`,
but I did in this case... because it made my life easier.

Oh, and there's one other function I'm going to call. In `cart-services.js`,
search for `clearCart`. This makes an AJAX call that tells the API that the cart
should now be deleted and reset. That *could* happen automatically on the server
when we create a `Purchase`, but since it doesn't in our API, we'll do it in Vue.
Add `await clearCart()` and hit tab so that adds the import for me.

So: clear the cart and *then* redirect to the confirmation page.

Let's try it! Go find the check out form, fill in some real data... this is - I kid
you not - the real address of one of my friends - then some fake data and... submit!

It worked! The user now sees a very cutting-edge message about how they can mail
us a check or money order to receive their products in a short three to six months.
Oh, and also, the shopping cart on top shows zero: the cart *was* reset.

Before we go find out checkbook and an envelope, we're not *quite* done yet. Next,
let's explore how we could *also* add client-side validation.
