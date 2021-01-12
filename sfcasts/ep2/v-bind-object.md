# V Bind Object

Coming soon...

All right.

Let's leverage our new `<form-input>` custom component. The checkout form will have six
fields on it. So let's copy this form input and paste it five times. One, two, three,
four, five.

I love, copy. And paste. Then I'll quickly update each components to have the
correct, uh, ID and other fields. So `customerEmail`.

Cool. So each field references, this specific piece of data it needs to, and also
it's key on the validation errors. Let me go.

Why don't we go over and hit checkout. Okay, nice. Doesn't look very good yet, but
we'll fix that before we do. It still felt like a lot of repetition. When I did that.
I mean, each field I'm repeating, you're putting customer city three different times.

We can

Clean this up with a clever use of `v-bind` here's idea at the bottom. Let's add a
methods key and create a new `methods` called `getFieldProps()`,

No return and array, or really object of the props needed for a specific form input
component. Give it an `id` and `label` argument.

Very simply inside here, we will return an object of the three different props that
field needs, which as a reminder, our `id` `label` an `error-message`. So here we can just
use `id: id`. Of course, we don't need to do that. We're going to say `id` that
does the same thing and then `label`. And then the last one is going to be `errorMessage`,
which often the component was `error-message` down here. We use the Campbell case
version. So `errorMessage:`, and then `this.validationErrors[id]`
to get the correct one out of there. We can use this above to replace `id` `label` and
`error-message`.

Remember, `:error-message` is short for `v-bind:error-message`, which binds a
single prop, but we can also use `v-bind` to bind a bunch of props at once. So I'll
remove `error-message`, `label` and `id`.

And instead of just say `v-bind` with no colon equals `getFieldProps()` and then I'll pass in 
the `id`

And then the `label`. So there's still a little bit of repetition here between `v-model`
and the `v-bind`, but it removes some of that repetition. So I'm going to repeat that
real quick for the other fields. Okay, man, unless I messed something up that should
work, go over and hit checkout and awesome. Everything seems to be working. Okay. Now
let's make this look a bit nicer. This is not really anything to do with you. We're
just going to organize our form into some columns.

So about the first field, I'll say `<div class="form-row">`
and I'm going to wrap the first two fields in that, and then
indent them, and then each of those elements inside of there need to have a class.
So I will pass a `class="col"` on each of those two things. Now, as a reminder, one of
the interesting and useful things about custom components is that we don't have a
class prop inside a `<form-input>`. So what's going to happen is that's automatically
going to add this attribute to the top level element, uh, of form input. So we can
actually immediately see this over here, these being organized. And if we inspect the
element, you can see that each of these `form-group`, which is the outer element on

That,

Adam have a call new `col` class. So that's kind of magically added on this outer form
element, which is perfect for us. All right, we'll do the same thing. One more time.
I'm going to leave the customer address on its own row. And then we'll wrap the last
three fields inside of a device.

Yeah,

None of those. And then same thing we need to have `class="col"` All three of those
elements. And then I think we have a little extra white space that my editor is mad
about

Now over here, much better.

So let's make one last improvement right now. These are all `<input type="text">` fields
to handle other field types like select elements or check boxes. We need to do more
work in `<form-input>` to make it more flexible. I'm not going to do that now, but I at
least want to allow us to render different input types like `<input type="email">` and
`<input type="tel">` for the phone number. Okay, easy peasy. Our `<form-input>` now needs to
be more flexible. So let's add a new prop. I'll copy the `value` prop. We'll call this
one `type`.

It will be a `string`. And this time I'm going to default it to `text` so that you don't
have to pass in that prop. And then we can use it above our move `type="text"`,

And I'll do `:type="type"`.

Thanks to the default value we've given that we only need to override that on the, to
set that on the two fields that we need to override. What's cool is that we can mix
the `v-bind`. He goes object with specific, with other specific

Prompts. No problem.

I mean, as we can tag `type="email"` here to pass and I `type` prof, and that's just
going to merge really nicely with whatever props, the `getFieldProps()` ads. So let's
do that on email and also down here on of not city. Okay.

Phone `type="tel"`,

And we move over and try it. You probably won't notice any difference on a computer,
but if you inspect the element, yes, we have type `<input type="email">`. Okay. We are
ready to set up this form to submit via Ajax. When we do this, we're going to make
error handling form validation, a first class citizen. We want to help our users in any
way to successfully complete checkout.

