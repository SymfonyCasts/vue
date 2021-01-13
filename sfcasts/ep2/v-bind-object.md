# v-bind Many Props

The checkout form will have six fields... and *now*, thanks to our shiny `form-input`
component, we can add those with very little duplication. Copy the `form-input`
element and paste it five times: One, two, three, four, five.

Now... I'll super quickly update each component to pass in the right props.
Zoom! Each input will point to a different key on our `form` data and will use a
different key on `validationErrors`.

Let's go see how it looks! Click to check out and... nice! I mean, it's doesn't
look *great*, but we'll improve that soon.

## Using v-bind with an Object

Before we do, that *still* felt like a lot of repetition. Like, on this field,
we're repeating `customerCity` 3 different times.

Fortunately, we can clean this up with a clever use of `v-bind`. At the bottom,
add a `methods` key and create a new method called `getFieldProps()`. This will
return a map of *all* the props needed for a specific input. To generate that,
this needs `id` and `label` arguments.

Inside, return an object with the props the field needs... which as a reminder,
are `id`, `label` and `error-message`. So, set `id: id`... or better, shorten to
just `id`, `label` and `error-message`. But, this needs to be `errorMessage` in
camel-case: Vue will handle normalizing that to `error-message`. Anyways,
`errorMessage` set to `this.validationErrors[id]`.

Up in the template, we can use this to shorten things.
Remember, `:error-message` is short for `v-bind:error-message` which binds a
*single* prop. But we can *also* use `v-bind` to bind a *bunch* of props at once.
Remove `error-message`, `label` and `id` and instead say `v-bind` - with no colon -
then `getFieldProps()` passing the id and label.

There *is* still some repetition between `v-model` and `v-bind`, but it's an
improvement. I'll type as fast as Fabien normally types to quickly repeat this
for the other 5 fields.

Phew! Unless I messed something up (very possible), that *should*... not break
anything. Move over, hit checkout and... awesome! Everything seems to be working!

## Adding Markup to make the Form Look nicer

*Now* let's make this look a bit nicer by organizing the fields into a few columns.
This doesn't have much to do with Vue... I just don't like ugly forms.

Above the first field, add `<div class="form-row">`, wrap the first *two* fields
inside and indent them. Both elements now need an extra class. Pass `class="col"`
two times.

But I want to point something out. We do *not* have a class prop inside our
`<form-input>` custom component. And so, when we pass `class` to this, Vue will
automatically add this as an attribute to the top level element of `form-input`.
We can see this in the browser. If we inspect the element, yep! Both outer
elements - which have a `form-group` - now *also* have a `col` class. That's
*exactly* what we want.

Back in `index.vue`, leave the `customerAddress` on its own row, but wrap the last
3 fields inside of another `<div class="form-row">`. Add the ending div, indent,
and give all 3 of these `class="col"`. And... I think I have some extra
whitespace my editor is mad about. *Much* better.

Go check it out. That looks great!

## Customizing the input type Attribute

Let's make *one* last improvement. All of these fields are `<input type="text">`.
If we wanted to handle other field types like `select` elements or checkboxes, we
would need to do more work in `<form-input>` to make it more flexible or even
create some new components.

I'm not going to do that now, but I at *least* want to be able to render
different input *types*, like `<input type="email">` and `<input type="tel">`
for the phone number.

No problem!. Our `<form-input>` now needs to be more flexible. So let's add a new
prop. Copy the `value` prop, call this one `type`... and change the default
to `text` so that we don't *have* to pass this in.

Use this up in the template: replace `type="text"` with `:type="type"`.

Thanks to the default value, we only need to pass this for two fields. Find
`customerEmail`. What's cool is that we can mix the `v-bind` that's set to an
entire object with other, *specific* props without any issues. What I mean is,
when we pass in the type prop with `type="email"`, that will *merge* nicely
with whatever props `getFieldProps()` adds.

Repeat this on `customerPhone`: `type="tel"`.

Go check it! You probably won't notice any difference on a computer, but if you
inspect the element... yep! It's `<input type="email">`.

Okay! We are ready to set up this form to submit via Ajax. When we do that, we're
going to make handling and rendering form validation a *main* concern.
