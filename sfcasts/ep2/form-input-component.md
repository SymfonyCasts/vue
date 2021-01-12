# Reusable "Form Input" Component

Our new goal to avoid duplicating all of this markup for every single form field
by creating a nice, reusable component. Woo!

## Creating the new Component

Inside the `checkout/` directory, create a new `form-input.vue` file. For the
`template`, let's copy the *entire* field - including the div around it - delete
that, and paste.

For the `script`, `export default` and give us a nice `name`, like `FormInput`.
Finally, go grab the `methods` key from the other component, delete that and add
it to the new component.

Okay: nothing is *dynamic* yet, but it's a start. Let's immediately try to use
this inside of `index.vue`. Import `FormInput` from
`@/components/checkout/form-input`, add a `components` key, and put this inside.

Use that up in the template: `<form-input />`.

If you move back to your browser and click to check out... we get a huge error.
A bunch of things are still hardcoded in the new component and, most importantly,
we're `v-model` is referencing a `form` data that doesn't exist. Time to make this
component *truly* reusable.

## Setting up the Props

To do that, we're going to need to pass several pieces of info *into* this component
as props to replace the hardcoded parts.

Down in the component, add a `props` key. First, we need an `id` prop. This will
be `type: string` and and `required: true`. Copy this. Another prop we need is
`label`, which will also be a string... and then `errorMessage`. Remember, this
component isn't going to know whether or not its data is valid: it's just a dumb
component that renders an input. Its *parent* component will be responsible for
executing validation and then *telling* this component whether or not it's valid.
This will be also be a `String`, but instead of `required: true`, say `default`
empty string. *Finally*, the last thing we need is a `value` - the value of the
input. We could *technically* skip this... since the field will always *start*
blank, but let's add it. Once again, set `default` to empty quotes.

Ok! Up in the template, let's make things dynamic! `for` becomes `:for="id"`,
replace "Name" with `{{ label }}`,and `:id="id"`. We won't be able to use `v-model`
anymore because the data will be stored in our *parent* component. All *we* need
to do, for now, is set the value attribute: `:value="value"`.

For this `isFieldValid()` method... hmm. We don't really need this anymore: we are
*directly* passed an `errorMessage` prop. Down in the component, change `methods`
to `computed` and rename this to `isValid()` with no argument. Inside, return
*not* `this.errorMessage`.

Back up, this will simplify things: use *not* `isValid` in both places... then
print `{{ errorMessage }}`.

Oh, and I don't really need to do this, but I'm going to also add a `:name="id"`
attribute. We don't need a `name` because the form won't *actually* submit: we're
going to intercept that and send an AJAX call.

*Anyways*, this is good! This component should now be re-usable. Back in `index.vue`,
let's pass in some props! I'll drop the `form-input` onto multiple lines and pass
`id="customerName"`, `:value="form.customerName"`, `label="Name:"` and
`:errorMessage="validationErrors.customerName"`.

Ok! Let's check it out! Back at the checkout form... beautiful! We have the *exact*
same thing as before.

## Undefined Props and Default Values

Over on the Vue dev tools, on the `FormInput` component, notice that the
`errorMessage` prop is set to empty quotes. In reality, we're passing
`validationErrors.customerName`, which is *undefined*, because `validationErrors`
is currently a empty object. When you pass an undefined value as a prop... and that
prop has a default value, it uses that default, which is nice.

The only thing that *doesn't* work is that when we type in the input, the `data`
on `CheckoutForm` is *not* being updated: it's still empty quotes. No problem! We
know how to fix this: we will emit an event from `FormInput` whenever the input
changes, listen to that from `CheckoutForm` and update the data *there*.

But... hold on a second. If this were *not* a custom component - if this were just
a normal, boring `input` - then we could use `v-model` to update the data when the
input changes and be done with it.

My question is: could we *still* use `v-model` here... even though this is a custom
component? The answer is... totally! Let's see how next.
