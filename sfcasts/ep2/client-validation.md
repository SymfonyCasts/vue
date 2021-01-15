# Client Validation

Coming soon...

Head back to you to the now empty cart and let's add a sofa to it. Perfect.
Server-side validation is a must. We can't have API end points that allow any data
and we've handled that nicely. Yay. Client side validation in JavaScript is optional.
It requires extra work to get done, but can make your form even nicer. So let's add
some, we'll keep it simple on blur of a field. So when we leave a field, if that
field is empty, we'll immediately add a validation. Start by a new method. Start
inside of our start inside of our checkout form components down and methods. Let's
add a new method. So this is `methods` right here. Let's add a new method called
[inaudible] `validateField()` I'll paste in the start of it.

This simply has a little object here containing the validation messages that will be
used for each field. If that field is blank, before we add the real logic to this
method, let's call this on a blur of each field. So I'll head to the top and I will
add, `@blur="validateField"`, but wait, won't work. This is a custom component, not
a normal input. Okay. No problem. Go in to `form-input`. And on the actual `<input>`
itself, let's add `@blur=""` and then we'll just emit that same `blur` event from here
and pass it the same event data for basically propagating that event up to, uh, ops
so that we can listen to it. All right now, back in the next view, I'll copy that
`@blur` and we will have to repeat this just on each of our six fields.

All right. That should work back in the method. Here we go. Here's the plans. Okay.
We're going to read the `id` attribute of whatever input was just blur and use that to
see if the form and data for that field is empty, which is basically a way for us to
check to see if that field is empty. If it is, we'll add a new item to the
`validationErrors`, uh, data. So first thing we're gonna need is the event object.
That's going to help us get the `id` of the input that was just blurred. And then down
here, we can say `const validationField = event.target.id`. So that's
gonna be something like `customerName` or `customerEmail`, very simply, if not
`this.form[validationField]`, then we know that that field is empty
because remember this is going to hold the data for that field.

So if there's nothing there and we know the field is empty and we want to add a
validation error to do that, we'll say 
`this.validationErrors[validationField] =`. And we'll use our little map up here to get the correct one.
So `validationMessages[validationField]`, make sense. And then I'm
also going to add an here in case the user just went back and filled something in and
then blurred, if there was already an error before and now there shouldn't be one
we'll remove it, which we're actually going to delete it. So we'll say 
`delete this.validationErrors[validationField]`. The reason I'm using
`delete` and not equals null is that's just the way that our `validationErrors` object works
right now. You actually, it starts as an empty object and we only put things into it
when they have errors, you can see at the beginning of on submit, we reset it back to
an empty object.

So down here, if it's not there anymore, we will delete that, uh, property from the
object altogether. By the way, there are some view libraries to help with validation,
like view the date. You can totally check these out. They make adding a lot of
complex validation rules, a lot easier and cleaner right now. We're just checking to
see if the field is blank, but you're still basically doing the same thing. You're
storing the errors for a field somewhere like `validationErrors`. Then using that when
you render to display the heirs anyways, let's try it head over. Click checkout to go
the field, click in the name, field and hit tap. Oh, uh Hmm. Nothing happened. Uh,
let's go check out the view dev tools of the `CheckoutForm`. Go down to my `validationErrors`
And yeah, look, it actually says I have two validation errors for name and
email, the two fields that I've blurred.

So the data is right, but it's not rendering on the form. I want to see something
even weirder, go into one of the other boxes and type something. Boom. As soon as we
do the error messages show up. So this is super weird. You don't actually see any
errors, any changes unless you modify a field. So what the heck is going on the short
answer is that we accidentally removed reactivity on the `validationErrors` data.
That's a fancy way of saying that when we change a value on validation, errors view,
doesn't realize that it needs to rerender. So the data is being stored correctly, but
it doesn't actually reflect on here until view re runners for a different reason,
like us changing the data on one of the fields. So let's talk more about this next
and how to fix it.

