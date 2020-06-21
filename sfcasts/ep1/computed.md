# Computed Properties

This special `class` syntax gave us the power to conditionally add the `collapsed`
class. This works nicely, but it *is* kind of a lot of logic to have
in our template. It's gettin' a bit ugly. A better solution might be to calculate
which classes this component should have using *JavaScript* and then *pass* that
value into our template as a variable.

Whenever you need to calculate a value, like an array of classes, based off some
`props` or `data`, the way to do that is with a *computed property*. Here's how it
works: Down inside our JavaScript code, right below `data`, add a new option
called `computed` and set it to an object.

Just like with `methods` down here, we'll populate this with *functions*.
Add our first computed property called `componentClass()` - you can
name that *anything*. This will return the array of classes that our component
should have. But don't worry about how we're going to *use* it yet: let's
just start by filling in the logic. First we'll say `const classes =` and set that
to an array with the three classes that we always need. `this.$style.component` (we'll
talk about that in a second), `p-3`, and `mb-5`. Perfect!

At the bottom, return `classes`. We'll worry about the conditional class
in a minute.

## .this magic

But let's talk about `this.$style.component` real quick:

We know that as soon as we add `module` to our style tag, `Vue` makes a new `$style`
variable available in our template. We use that to say things like `$style.component`.

A few minutes ago, we learned that anytime you reference a variable inside of
a template, internally, what that *actually* does is call `this.$style`. We just
don't *have* to say `this.` in the template because Vue adds it for us automatically.

So even if we knew *nothing* else, the very fact that we can reference the `$style`
variable in a template means that the `vue` instance must have a `$style` property
on it. In other words, we are allowed to say `this.$style` inside of
JavaScript. That's why this works in our computed property method.

For the conditional class logic, let's say if `this.collapsed`, to reference our
collapsed state, then `classes.push(this.$style.collapsed)`.

That's it! And of course, with *any* methods, adding some documentation is always
nice.

Here, PhpStorm *tries* to guess the return type... but gets a little confused
since Vue is so dynamic. Let's help it: this returns an array of strings.

Excellent!

## How computed works

So here's the deal. As soon as you have a key under the `computed` option, it
becomes available in the template as a *variable*.

Copy `componentClass` and, up in the template, very simply, we'll say
`:class="componentClass"`.

Up until now, we know that Vue adds all keys under `data`, `props` and `methods`
to the Vue instance, which means that we can reference those inside our template.
Well, `computed` is the fourth and *final* thing that gets added to the instance.
`Vue` adds each key under `computed` as a *property*.

This means that, up in the template, we can just reference `componentClass`,
which is really `this.componentClass`. But behind the scenes, when we access that
property, Vue will *actually* call the `componentClass` function to get it. It's able
to do that thanks to the fake getter property trick that we saw earlier when we
console.logged the `this` variable.

And really, the only difference between `methods` and `computed` is the syntax: we
use methods like methods and computed like properties. Oh, and also, Vue caches
computed properties so that it only needs to call our function when something
actually *changes*.

Anyways, because computed keys are added to the Vue instance, just like `methods`,
`data` or `props`, it means that we can reference them with the `this` variable.
To prove it, inside of our `toggleCollapsed` method, let's say
`console.log(this.componentClass)`.

Notice that PhpStorm tries to autocomplete that with parentheses, but that's not
right! We need to reference it like a property, even though we know that Vue will
call our method.

## Check it out!

So if we go over to the browser now... check this out! You can see the log and
it shows the component classes correctly every time we change it!

You can also see this over in the `Vue` dev tools! Click down on `Sidebar`.
Under `data`, you now have a `computed` section with `componentClasses`. This
changes when you hide and show the sidebar!

Back at our editor, remove the `console.log()`. We just mastered one of the most
*powerful* tools in Vue: computed properties! Nice work!

Next, what happens when we need to access a piece of data - like `collapsed` - in
a *different* component? If that component is a *child*, we can pass it down as a
prop. But... what if it's not?
