# Client-Side Validation

Click to go back to view the shopping cart... which is now empty. We're not done
shopping! Add another inflatable sofa. Awesome!

Server-side validation is a *must*: we can't have API endpoints that allow *any*
data. And we've handled that nicely. Go us!

*Client-side* validation in JavaScript is optional. It requires extra work, but it
can make your form *even* nicer to use. So let's add some! We'll keep it simple:
on "blur" of a field - so when we *leave* a field - if that field is empty, we'll
immediately show a validation error.

Start inside of our checkout form component... down in `methods`. Add a new one
called `validateField()`. I'll paste in the start: an object that contains the
validation messages that should be used for each field if that field is blank.

[[[ code('37f26a4387') ]]]

# Listening to blur on a Custom Component

Before we add the real logic to this method, let's call this "on blur" of each
field. Easy! Head up to the template and add `@blur="validateField"`.

[[[ code('aa565a1d45') ]]]

Except... bah! That won't work! This is a custom *component*, not a normal form
element.

Okay, don't panic. Go into `form-input.vue`. And on the actual `<input>` element,
add `@blur=""`... and then we'll just emit that same `blur` event from here... and
pass it the same event data.

[[[ code('f8dc7529f1') ]]]

We're basically propagating that event up so that our parent component can listen
to it.

Back in `index.vue`, now that this *should* work, copy the `@blur` and repeat this
on all six fields... super fast!

[[[ code('8bcfb7af7c') ]]]

## Filling in the Validation Logic

Ok! Head back down to `validateField()`... here it is. The plan is: read the
`id` attribute of whatever input was just blurred, use that to see if the form
data for that field is empty and, if it is, add a new item to the
`validationErrors` data.

To read the `id` attribute, we need the `event` argument:

[[[ code('6d18d830b7') ]]]

Then, down here, we can say `const validationField = event.target.id`: 

[[[ code('52f0467de6') ]]]

so that will be something like `customerName` or `customerEmail`. Then, if not 
`this.form[validationField]`, then we know that field is empty. Add a validation error with
`this.validationErrors[validationField] =` `validationMessages[validationField]`.

[[[ code('7940b86d5d') ]]]

Oh, and don't forget an `else`: in case the user just went *back*... filled
something in... and then blurred. If there was already an error before, now we
need to *remove* it. Do that with `delete this.validationErrors[validationField]`.

[[[ code('7fafd042e7') ]]]

The reason I'm using `delete` and not equals null is... well... that's just the way
that our `validationErrors` object works right now. It starts as an empty object
and we only put things onto it *when* they have an error. We even reset it *back*
to an empty object on submit. This *will* actually cause a "reactivity" problem...
which we'll explore in a few minutes.

By the way, there *are* some Vue libraries to help with validation, like Vuelidate.
You can *totally* check these out. They make adding a lot of complex validation
rules a lot easier and cleaner. Right now, we're just checking to see if the
field is blank. But even with something like Vuelidate, you're still *basically*
doing the same thing: you're storing the errors for a field somewhere like
`validationErrors` and then using that when you render to display the error.

*Anyways*, let's test this thing! Find your browser, click "Check Out", click into
the name field... and hit tab. Huh. Nothing happened. Go check out the Vue dev
tools, find `CheckoutForm`... then down to `validationErrors`. Yea, it says that
we *do* have two validation errors for `name` and `email`: the two fields we
blurred.

So the *data* is right.... but they're not rendering on the form. Want to see something
even weirder? Go into one of the other boxes and type something. Boom! As soon as
we do, both error messages show up! We don't see any errors until we modify a field.

What the heck is going on? The short answer is that we accidentally removed
*reactivity* from the `validationErrors` data. That's a fancy way of saying that
when we change a value on `validationErrors`, Vue does *not* realize that it needs
to re-render. So the data *is* being stored correctly... but it doesn't reflect
on the page until Vue re-renders for some *other* reason, like us changing some
of the form data.

Next: let's explore this deeper... and fix it!
