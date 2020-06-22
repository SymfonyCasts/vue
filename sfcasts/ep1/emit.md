# Communication UP with $emit

The `sidebarCollapsed` data now lives inside of `Products` because, in a minute,
we're going to use it to dynamically change the classes on the sidebar and content
elements. We're also already passing this data as a `collapsed` prop into `Sidebar`
so we can happily reference it inside the template.

The problem is that, when we click the Collapse button, what we *really* want to
do is change the data on the *parent* component: we want to change `sidebarCollapsed`
on `products.vue`. But... you *can't* do that. A component can *only* change data
on itself.

Here's the deal: we already know how to communicate information *down* the
component tree. We do that via props: we communicate the `sidebarCollapsed` state
down into `sidebar` with a prop. Cool! But how can we communicate *up* the tree?

## Communicating to a Parent Component with $emit()

Whenever a child component needs to change data on a parent component... or, more
abstractly: whenever a child component needs to *communicate* that something
happened to a parent component - like "the collapsed button was clicked" - it
does that by emitting an event.

Check this out: inside of `sidebar`, go down to the `toggleCollapsed()`
method that's being called on click. Instead of modifying the prop, say
`this.$emit()`. Yes, in addition to props, data, methods and computed props,
the `Vue` instance - the `this` variable - *also* has a few built-in methods
and properties. There aren't a *ton* of methods, but there *is* one called `$emit`
and it's one of the *most* important.

Inside of `$emit()`, let's emit a custom event called `toggle-collapsed`, which
I totally just made up.

This won't work yet, but we can *already* see it in action. Back on your browser,
over in the Vue dev tools, select the `Sidebar` component. So far, we've been
paying a lot of attention to the `props`, `data` and `computed` info. But there
is *also* a section called *events*. This will show any *events* that our Vue
components are emitting. So now, when we hit the Collapse button, nothing *happens*
yet, but we can see the `toggle-collapsed` event being emitted! That's pretty cool.
The next step will be to *listen* to this event from the parent component.

## Emitting Directly in `v-on`

Before we do that, calling `this.$emit()` is *totally* fine from inside a method.
But we can simplify. Copy the `$emit()` code then delete the method entirely.
Up in the template, find the `@click`, which we know is really `v-on:click`.
Set it to `$emit('toggle-collapsed')`.

Because... remember! Whenever you reference a variable or function inside a template,
Vue will really call `this.$emit()` behind the scenes... which is *exactly* what
we were doing a moment ago. This is just shorter... and it emits the event just
like before.

## Listening to the Event on the Parent Component

The second step to this process is to go into the `products` component and *listen*
to that event. I'll move the `<sidebar` onto multiple lines.

To listen to the `toggle-collapsed` event, we're going to use `v-on`. Because,
really, listening to a custom event is *no* different than what we're doing
in `sidebar`. To listen to the `click` event of a button, we use `v-on:click`,
or `@click` for short. Then, on click, we run some code!

`click` is a native DOM event, but things work *exactly* the same for an event
that we're emitting manually.

Let's do this the long way first: say `v-on:toggle-collapsed=` and set this to
call a new `toggleSidebarCollapsed` method when that event happens.

Copy that name and go down to the `script` section. We don't have any methods yet
so first add `methods`, then create the `toggleSidebarCollapsed()` function inside.
Very simply - just like we did before in `sidebar` - set `this.sidebarCollapsed`
to `!this.sidebarCollapsed`.

I *love* that. Back on the browser, I'll refresh to be safe... and then click
Collapse. It works! You can see the events and, back on the `Products` component,
we can watch the `sidebarCollapsed` data change. *That* is a nice setup.

## Using Shortcut v-on Everywhere

Now that we have this working, go back and find the `v-on:` attribute. What I
*love* about this directive is how clear it is:

> on toggle-collapsed, run this code

But in practice, we're going to use the shortcut syntax everywhere. So:
`@toggle-collapsed`.

Just remember that the `@` symbol means "on" - so "on toggle collapsed".

Our communication between the `Products` component and `Sidebar` - using props
to communicate down and events to communicate up - is a pattern that you'll see
*many* times in Vue. It keeps a single source of data, but *effectively* allows
anyone to read *or* change it.

Next, let's *use* the new `sidebarCollapsed` data in `products.vue`. When we do
that, we're going to add some custom styles but decide to *not* make them modular.
