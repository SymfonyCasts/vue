# V Model Custom Component

Coming soon...

Our new `<form-input/>` mostly works and we'll be able to easily reuse it to render all of
our fields. The only missing piece is that one we type into the field. It's not
updating the data on the checkout form.

Normally we would fix this by emitting any event from the child components so that we
can listen to that event in the parent component and update the data which lives
there. So let's do that in `form-input.vue` On the `<input/>` element, add, `@input=""`,
and then I'll use the inline format to emit and event from this component. What's
call it `input` to match the event. Name that's used for a normal form element for the
data, for the data. Let's just pass the new value `$event.target.value`.

Cool.

Now in the pair of component, we can listen to that

`@input=""` and then we'll immediately update the data with `form.customerName = $event`.
which will contain the new value. All right, let's try it. Move
over, go to checkout type in my name and let's check the data and perfect. It is
updating, but I do wish we could do something cooler. If this were a normal form
element and not a custom component, then we could simply use `v-model` instead of
having `:value=""` and `@input=""`. That's because for a normal form element, when you say
`v-model="customerName"`, it's equivalent to this `:value="customerName"` and
`@input=""` a function that sets customer name equals to `$event.target.value`.
Well, it turns out that you can also use `v-model` on a custom component, but it
means something slightly different. Using `v-model` on a custom components still
causes a `value` prop to be passed, but the `@input` function is a bit different. It
expects the custom component to emit the `input` event and pass the New data as the
event object itself. So wait a second. That's exactly that exactly matches our setup.
We have `:value` = the piece of data that we're passing in `@input=""` that data
being set to the event object. So yes, we can simply remove these two lines and
replace them with `v-model` or move `@input`

And change the `:value` to `v-model="form.customerName"`. Let's try it.
I'll go over hit checkout. I'll go directly to my checkout form right here, open up
my data and type here in a full, how cool is that? Oh, but one quick note for Vue3
this changes slightly in two different ways. First `v-model` causes The model
now passes a prop called `modelValue` instead of `value`. So in the form income form
input component, we would need to change this to `modelValue` and then use that `modelValue`
up here inside of our component. Second, the name of the event have changed.
Your custom component will now need to emit an event called `update:`, and then
the name of that prop. So `modelValue`, that's it just a change to the prop that 
`v-model`

Uh, sends you and the event you need to admit. So since this project is on view too,
I will undo those changes, but it's that simple. Next let's use our custom input to
render all six of the form fields that we need. We use a fruit few tricks to make
that easier and more flexible.

