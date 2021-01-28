# v-model on a Custom Component

Our new `<form-input/>` *mostly* works and we'll be able to reuse it to render all
of our fields. The only missing piece is that when we type into the field, it
doesn't update the data in `CheckoutForm`.

Normally we would fix this by emitting an event from the child component so that we
can listen to that event in the parent component and update the data that lives
there. So let's do that! And... then do something cooler.

## Emitting and Listening to the Event

In `form-input.vue`, on the `<input/>` element, add `@input=""` and I'll use the
inline format to emit an event. Let's call it `input` to match the name of the
event that's used for a *normal* form element. For the data, let's just pass the
new value `$event.target.value`.

[[[ code('a281f3feea') ]]]

Cool! Now, in the parent component, we can listen to this: `@input=""` and then
immediately update the data with `form.customerName = $event`.

[[[ code('a281f3feea') ]]]

Alrighty! Let's try it! Move over, click to check out, type in a name... and look
at the data. Perfect! It *is* updating.

## How v-model Works

But... I do wish we could do something cooler. If this were a *normal* form
element - and not a custom component - then we could simply use `v-model` instead
of needing to pass `:value=""` and listen with `@input=""`. That's because, for a
normal form element, when you say `v-model="customerName"`, it's equivalent to
this: `:value="customerName"` and `@input=""` a function that sets `customerName`
to `$event.target.value`.

It turns out that you *can* also use `v-model` on a custom component, but it means
something *slightly* different. Using `v-model` on a custom component still
causes a `value` prop to be passed... but the `@input` function isn't quite the
same. Specifically, it expects the custom component to emit the `input` event and
pass the new *data* as the event value.

So... wait a second. That *exactly* matches our setup! We have `:value =` the
piece of data... and in `@input=""`, the event data is the new value! So yes!
We can remove these two lines and replace them with `v-model`!

Get rid of `@input` and `:value` and, instead, say `v-model="form.customerName"`.

[[[ code('efe9ceb846') ]]]

Let's try it! Move over, hit check out, find `CheckoutForm` in the Vue dev tools
and open up the data. Type in the box. How cool is that?

## v-model and Vue 3

But one quick note! In Vue 3, using `v-model` on a custom component changes in two
ways - it's actually one of the few breaking changes between Vue 2 and 3.
First, `v-model` will now cause a prop called `modelValue` to be passed instead
of `value`. So, in the `form-input` component, we would need to change the prop
to `modelValue` and then use `modelValue` up in the template. Second, the name of
the *event* changed. Your custom component will now need to emit an event called
`update:` and then the name of that prop. So `update:modelValue` instead of `input`.

That's it! The name of the prop and event change, but everything else works exactly
the same. Since our project is on Vue 2, I'll undo these changes.

Next: let's use our custom input to render all six form fields we need.
We'll also use a few tricks to make this easier and more flexible.
