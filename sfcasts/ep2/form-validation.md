# Form Validation

Coming soon...

Okay. So let's handle validation errors. How can we do that? Well, if
you look at the data in the response down here in our log response, the data has this
really nice violations key on there. And then each violation has a property path
which tells us exactly which field it should be attached to inside of our checkout
form components. We also already have this validation errors object, which is being
used by our individual fields to figure out whether they have a validation method
while they have, whether they have a validation error. So basically all we need to do
is read these areas off of violations and map each one to our validation errors data,
and it should just work.

So

Head down to `onSubmit`. And the first thing I'm going to do is at the beginning of on
summit, say `this.validationErrors = ` an empty object. Now this is actually going
to cause a reactivity problem, but don't worry about that yet. We're going to talk
about that in a few minutes. When we talk about client side validation next, down in
the ELLs, this is where we know we have a validation error.
We can say `response.data.violations`

which is going to be that array that `forEach` and pass this, they call
back with a `violation` argument. And inside what we're going to do is very simple.
We're going to say `this.validationError` is left square bracket, and then read off
the `violation.propertyPath` number each violation has a nice `propertyPath` key.
You can actually see this easier inside of the interactive docs. That's going to be
equal to the sort of ID that we've been using for each field. So this, that
validation error is left square bracket, `violation.propertyPath` equals `violation.message`
message with only one a and that should be it. Let's try it. However, do our form hit
checkout, submit the form empty and Oh, beautiful. How gorgeous is that?

Okay. Before we talk about client side validation, I think we should actually finish
this and do the six handle the success case. What happens when we actually
successfully create an order for this instead of `src/Controller/CheckoutController`
I've already created a really simple order confirmation page. All we need
to do is get the ID of the new purchase that was just created by the API, and then
redirect the page, do `/confirmation/{id}` that ID. And there's nothing really fancy about
this inside of the response side of things. I'm going to say `window.location =`
and then I'll use ticks here to say `/confirmation/` and then I'll use a
variable. And we can say `response.data.id`, I don't always return a data,
an ID field, uh, on my, on my resources. But I do in this case, this is not `@ID`

I'll show you. If you look over in our interactive docs, you can see that this will
actually return to normal ad ID, but I've actually also included the nice database ID
in the expected response. So we can use that here. Um, there's one other function
that I'm going to call. It's not that important, but there's actually a method inside
of our `cart-services.js`. I'll search in here for `clearCart`. This is actually something
that goes and tells the API that the cart should now be deleted and reset. That could
happen automatically when we create a purchase, but we have them as two separate
things. The point is I'm actually going to say a `await clearCart()` and hit tabs. So
that, that autocompletes and adds the import for me. So clear the cart, and then we
will redirect to the confirmation page. All right, let's try this thing. Hit
checkout. I'll pop in some real data here

And ordered. Yes, we got it.

User now sees a very cutting edge message about how they can mail us a check or money
order to receive their products in a short three to six months. Well, we're not quite
done with that checkout form yet. Next let's explore how we can also add a client
side validation if we want, Oh, before this I mentioned. And if you look at the
shopping cart is back to zero. It's been deleted.
