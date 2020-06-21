# v-if, v-show and Conditional Classes

Our collapsing sidebar works, but *yikes*, it looks terrible! We *need* to fix this!
Let's hide the text and links *entirely* when the sidebar is in its collapsed state.

## v-if directive

Look at `sidebar.vue`. In the template, we want to hide the `<h5>`, the `<ul>` and the
`<hr />`: basically everything except the button.

In Vue, there are two ways to do this and both of them come in the form of
*directives*. To make this work, I'm going to add a new `<div>` to wrap all the
elements that we need to hide.

The first directive is `v-if`. We can write `v-if=""` and, inside, use a JavaScript
expression. We'll say `!collapsed`. So: show this if we are *not* collapsed. If we
go over to our browser, we don't even need to refresh because we're using hot
module replacement. And... it works! Much better!

## inspecting v-if and the v-show directive

The key thing here, if you inspect the HTML, is that with `v-if`, the elements
are removed *entirely*. So if we click the button again, the elements come back,
and if we collapse, they're gone!

The other way to hide things is by using `v-show`. With `v-show` things will
*look* the same. The difference is that, when we click `collapse`, the HTML
is still there. `v-show` just adds `display: none` to the element when it needs to.
*Sneaky*!

So `v-show` and `v-if` accomplish the same thing. Which you should use just depends
on the situation. `v-show` is usually better if you're hiding and showing a lot,
like a drop-down menu. That's because `v-show` is *super* fast.

But if what you're hiding isn't shown often or is complex - like a modal - `v-if`
might be better because Vue won't spend any time even rendering the element
until you need it.

## .component style

Ok! While we're here, I also want to clean things up. Let's refactor our
`width` away from `style` to a proper class. But before we do that,
there's one thing I wanted to do earlier that I forgot about. Notice that down
here in our styles, we have a single class called `sidebar`... and we're
applying that to the *root* element of our template. This is great! But sometimes,
as a convention, when you have a class that is applied to the root element of a
component, you'll use the generic name `.component`

Down in `style`, update the class name to match.

This won't make any difference, it's just a nice standard when you need a class
on your outer element.

To remove this `width` style, go back down to the style block and, inside
`.component` add a new class called `&.collapsed` with `width: 70px`.

If you're not familiar with this syntax, it means that if an element has both the
`component` *and* the `collapsed` classes, then it will get this width.

Back in the template, delete the `style` attribute.

The tricky part here is that we need to conditionally add the `collapsed`
class to our root element. But... there's not really a good way to do that.

## Conditional :class

Luckily `Vue` is here again to rescue us! It turns out, `:class` has *another*
superhero syntax.

Instead of an array, pass an object where every *key* in the object will be the
class name that you want to add, and the *value* will be true or false for whether
or not you *want* this class. Since we always want these three classes, we'll say
`$style.component: true`, `'p-3': true` and `'mb-5': true`.

And... Webpack is furious with me! The reason is that, in an object, you can't
use variable names as keys. The problem is that JavaScript thinks that all keys
are *strings*, even if you don't have quotes around them. If you want tell
JavaScript that your key is some sort of variable, you need to put square brackets
around it. That's a bit ugly, but *now* JavaScript understands it.

To add the `collapsed` class conditionally. I'll use that funny syntax again
to say `$style.collapsed`, because every time we reference a class within modular CSS,
we need to use `$style.`. And since we want the `collapsed` class to show if the
collapsed state is `true`, we'll just set it to `collapsed`.

Back in the browser, click on `>> Collapse` and... perfect! You can see our class
hiding and showing in the DOM.

But... there's a slightly *better* way to accomplish all of this... and it will
use one of my *favorite* features of Vue: computed properties. Let's talk about
them next.
