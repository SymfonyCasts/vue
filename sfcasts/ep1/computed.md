# Computed Properties

Our collapsing sidebar works, but *yikes*, it looks terrible! We *need* to fix this!
Let's hide the text and links entirely when the sidebar
is in its collapsed state.

## v-if directive

Look at `sidebar.vue`. In the template, we want to hide the `<h5>`, the `<ul>` and the
`<hr />`: basically everything except for the button.

In `Vue`, there are two ways to do this and both of them come in the form of
*directives*.

To make this work, I'm going to add a new `<div>` to wrap all the elements that we
need hide.

The first directive is `v-if`. We can write `v-if=""` and,
inside, use a JavaScript expression. We'll say `!collapsed`. So: show this if we
are *not* collapsed. If we go over to our browser, we don't even
need to refresh because we're using hot module replacement. And... it works!
Much better!

## inspecting v-if and the v-show directive

The key thing here, if you inspect the HTML, is that with `v-if`
the contents are removed *entirely*. So if we click the button again, the contents
come back, and if we collapse, they're gone!

The other way to hide things is by using `v-show`. With `v-show` things will
*look* the same, but the difference is that, when we click `>> collapse`, the HTML
is still there. `v-show` just adds `display: none` to the element when it needs to.
*Sneaky*!

So `v-show` and `v-if` accomplish the same thing.
Which you should use just depends on the
situation. `v-show` is better if you're hiding and showing a lot - it's *super*
fast. But if what you're hiding isn't shown often, like a modal or a different
screen, `v-if` is better because Vue won't
spend any time even rendering the element until you need it.

## .component style

All right! While we're here, I also want to clean things up. Let's refactor our
`width` away from `style` and do this properly in a class. But before we do that,
there's one thing I wanted to do earlier that I forgot about. Notice that down
here in our styles, we have a single class called `sidebar`... and we're actually
applying that to the outside element of our template. This is great! But sometimes,
as a convention, when you have a class that is applied to the root element of a
component, you'll use the generic name `.component`

Down in `style`, update the class name to match.

This won't make any difference, it's just a nice standard when you need a class
on your outer element.

To remove this `width` style in the root element, let's go back down to our
style block and, inside `.component` add a new class called `&.collapsed` with
`width: 70px`.

If you're not familiar with this syntax, it means that if this element has both the
`component` *and* the `collapsed` class, then it will get this width.

Back in the template, delete the `style` attribute.

Now the tricky part here is that we need to conditionally add the `collapsed`
class to our root element. But there's not really a good way to do that.

## Conditional :class

Luckily `Vue` is here again to rescue us! As it turns out, `:class` has another
superhero syntax.

It looks like this: instead of an array, pass an object where every
key in the object will be the class name that you want to add, and the value will be
true or false for whether or not you want this class. Since we always want these three
classes, we'll say `$style.component: true`, `'p-3': true` and `'mb-5': true`.

And Webpack is furious with me! And the reason is that in an object,
you can't reference an property with the `.` syntax:
you can't say `$style.component` - it just confuses JavaScript.

So when you have this situation, you need to put square brackets around it. That's
a bit ugly, but *now* JavaScript understands it.

Now we want to add the `collapsed` class conditionally. I'll use that funny syntax again
to say `$style.collapsed`, because every time we reference a class within modular CSS,
we need to use the `$style`. We want the `collapsed` class to
show if the collapsed state is `true`, so we'll just set it to `collapsed`.

Back in the browser, click on `>> Collapse`
and... Perfect! You can see our class hiding and showing in the DOM.

## The computed Option

But there's a better way to do this! That's right! Things can get even cooler!

What we did is't too bad, but this is kind of a lot of logic to have
inside our template. A better solution might be to
calculate which classes this component should have using JavaScript and then pass
that value into our template as a variable.

Whenever you need to calculate a value, like an array of classes, based off some
`props` or `data`, the way to do that is with a *computed property*. Here's how it
works: Down inside our JavaScript code, right below `data`, add a
new option called `computed` and set it to an object.

Just like `methods` down here, we'll populate this with functions.
Add our first computed property called `componentClass()`. You can
name that *anything*. This will return the array of classes that this component
should have. Don't worry about how we're going to *use* it yet: let's
just start by filling in the logic. First we'll say `const classes =` and set that
to an array with the three classes that we always need. `this.$style.component` (we'll
talk about that in a second), `p-3`, and `mb-5`. Perfect!

At the bottom, return `classes`. We'll worry about that conditional class
in a second.

## .this magic

But let's talk about `$this.style.component` real quick:

We know that as soon as we add `module` to our style tag, `Vue` makes a new `$style`
object available in our template. We use that to say things like `$style.component`.

A few minutes ago, we learned that anytime you reference a variable inside of
a template, internally, what that actually does is call `this.$style`. We don't
*have* to say `this.` in the template because Vue adds this for us automatically.

So even if we knew nothing else, the very fact that we can reference the `$style`
variable in a template means that the `vue` instance has a `$style` property in it.
In other words, it means that we are allowed to say `this.$style` inside of
JavaScript. That's why this works down in our computed property method.

Now for our actual custom logic, let's say if `this.collapsed`, to reference our
collapsed state, then `classes.push(this.$style.collapsed)`.

That's it! And of course, with *any* methods, adding some documentation is always
nice.

Here, PHPStorm *tries* to guess the return type... but gets a little confused
since `vue` is *so* dynamic. Let's help it out: this returns an array of strings.

Excellent!

## How computed works

So here's the deal. As soon as you have a key under the `computed` option, it
becomes available in the template as a *variable*.

Copy `componentClass` and, up in the template, very simply, we'll say
`:class="componentClass"`.

So up until now, we know that Vue adds any `data`, `props` or `methods` to the Vue
instance, which means that we can reference those inside our template.
Well, `computed` is the fourth and *final* thing that gets added to the instance.
`Vue` adds each key under `computed` as a *property*.

This means that, up in the template, we can just reference `componentClass`,
which is really `this.componentClass`. But behind the scenes, when we access that
property, Vue will *actually* call the `componentClass` method to get it. It's able
to do that thanks to the fake getter properties we saw earlier.

And really, the only difference between `methods` and `computed` is the syntax: we
use methods like methods and computed like properties. Oh, and Vue caches computed
properties so that it only needs to call our function when something actually
*changes*.

Anyways, because computed keys are added to the Vue instance, just like `methods`, `data` or
`props`, it means that we can reference them with the `this` variable.
To prove it, inside of our `toggleCollapsed` method, let's say
`console.log(this.componentClass)`.

Notice that PhpStorm tries to autocomplete that with parentheses, but that's not
right! We need to reference it like a property, even though we know that Vue will
call our method.

## Check it out!

So if we go over to the browser now... check this out! You can see the log and
shows the component classes correctly every time we change it!

You can also see this over in the `Vue` dev tools! Click down on the `Sidebar`.
Under `data`, you now have a `computed` section with `componentClasses`. That
changes as you hide and show the sidebar!

Back at your editor, remove the `console.log()`. We just
mastered one of the most *powerful* tools in Vue: computed properties!

Next, what happens when we need to access a piece of data - like `collapsed` - in
a different component? If that component is a *child*, we can pass it down as a
prop. But what if it's not?
