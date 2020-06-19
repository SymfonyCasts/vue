# Computed

Our collapsing sidebar works, but *yikes*, it looks terrible! We *need* to fix this!
What we need to do here is hide all of these texts and links entirely when the sidebar
is in its collapsed state. 

## v-if directive

Look at `sidebar.vue` in the template, we want to hide the `<h5>`, the `<ul>` and the
`<hr />`, basically everything except for the button, when we're in a collapsed
state.

In `Vue`, there are two ways to do this and both of them come in the form of
*directives*. At the end of this chapter we will have seen almost all of the important
directives in `Vue`. You will be a Directive Master!

To make this work, I'm going to add a new `<div>` to wrap all the elements that we
need hide and *then* apply a directive to it so that it will hide or show this element
and all of its contents.

The first way of doing this is via the `v-if` directive. We can write `v-if=""`, and
inside of it, use a JavaScript expression. We'll say `!collapsed` so as to show this
if we are *not* in the collapsed state. If we go over to our browser we don't even
need to refresh because we have the hot module replacement on... and it works!
Much better!

## inspecting v-if and the v-show directive

The key thing here, if you inspect the element on that button, is that with `v-if`
the contents are removed entirely. So if we click on the button again, we can see the
contents shown, and if we hide it, they are gone! They are effectively added and
removed from the DOM as the condition in the directive evaluates to `true` or `false`.
That is *great*!

The other way to hide things is by using `v-show`. With `v-show` things are going to
look the same, but the difference is that when we click in `>> collapse` the content
is always there. `v-show` just adds a style rule to the top element to set `display`
to `none` when it needs to. *Sneaky*!
 
So `v-show` and `v-if` really accomplish the same task, they just do it in
fundamentally different ways. So which one is more appropriate? It just depends on the
situation. `v-show` is better when you're hiding and showing things a lot. When hiding
and showing is really fast. If we have something that really won't be changing a lot,
`v-if` is the way to go, because, if you use `v-if` here, for example, you won't be
spending any time even rendering the sidebar until you actually need it. This is
especially useful if you have several different layers of components here, where it
can make your whole application load faster instead of loading all of these things
just to hide them next.

## .component style

All right! While we're here, I also want to clean things up. We should refactor our
`width` away from `style` and do this properly in a class. But before we do that,
there is one thing I wanted to do earlier that I forgot about. You notice that down
here in our styles, we have a single class called `sidebar`, and we're actually
applying that to this element here in our template. This is great! But sometimes,
as a convention, when you have a class that is applied to the root element in a
component, you'll use the generic name `.component` 


as basically a way to say this is the main `class` in the template.
Down here, update the class name to `.component`.



This won't make any difference. But it makes things so that if we need styles,
we can always add a class on the root element and have the rest of the styles
be inside this root `.component` class. You can use it if you want it or not,
it is not a big deal.
 
Now to remove this `width` style here in our root element, let's go back down to our
style block and inside `.component` let's add a new class called `&.collapsed` and
set this to `width: 70px`.

If you're not familiar with this syntax, it means that if this element has both the
`component` *and* the `collapsed` class, then it will have the `70px` width applied 
to it. Now the tricky part here is that we need to conditionally add this `collapsed`
class to our root element, but there's not really a good way to do that.

I'll delete my style attribute.

## Conditional :class

So how can we change this so that we can *conditionally* add a class to this array?
Luckily `Vue` is here again to rescue us! As it turns out, `:class` has another
superhero syntax that allows us to do just that!

It looks like this: Instead of an array we're going to pass an object where every
key in the object will be the class name that you want to add and the value will be
any expression that resolves to `true` or `false`. This will dictate if
you want that class to be present in real time! Since we always want these three
classes, we'll say `$style.component: true`, `'p-3': true` and `'mb-5': true`


so that they always show up. 

You notice that Webpack is furious with me. And the reason is that in an object
syntax like this you can't reference an object property with the `.` syntax.
You can't say `$style.component` as a property to an object. JavaScript is so confused
right now!

So when you have this situation, you need to put square brackets around it.
That's just some relatively new syntax offered by the ES6 standard that allows us to
use complex `.` syntaxes to evaluate to the value within that property dude to the
way object literals work in JavaScript, but we need not to worry about it too much!
The only thing that you need to know is that any time you have a `.` syntax as an
object key, you can wrap it around `[]` so that it works as expected! 

Now we want to add the `collapsed` class conditionally. I'll use that funny syntax again
to say `$style.collapsed`, because every time we reference a class within a modular CSS,
we need to use the `$style.` object. The final name of the class is dynamically
determined off of the style variable. Then here we want the `collapsed` class to
show if the collapsed state is `true`

So we'll just set it to `collapsed`. Back in the browser, we click on `>> Collapse`
and... Perfect! You can see our class here in the DOM hiding and showing.

## computed

But there's one better way to do this! That's right! Things can get even cooller!

What we have done here is not too bad, but this is kind of a lot of logic to have
inside of our template. In a more perfect world, a better solution might be to
calculate which classes this component should have using JavaScript and then pass
that value into our template as a variable.

Whenever you need to calculate a value, like an array of classes, based off some
`props` or `data`, the way to do that is with a `computed property`. Here's how it
works: Down inside of our JavaScript code, right below `data`, we're going to add a
new property called `computed` that is going to be set to an object.


Just like `methods` down here, we will populate this with a series of functions.
So let's add our first computed property here called `componentClass()`. You can
call that *anything*. This is going to return the array of classes that this component
should have at any given time. Don't worry about how we're going to use it yet. Let's
just start by filling in the logic. First we'll say `const classes =` and set that
to an array with the three classes that we always need. `this.$style.component` (we'll
talk about that in a second), `p-3`, and `mb-5`. Perfect!
 

At the bottom we'll return `classes`. We'll worry about that conditional class
in a second. 
 
## .this magic 

Let's talk about `$this.style.component` real quick:

We know that as soon as we add `module` to our style tag, `Vue` makes a new `$style` 
object available in our template. We use that to say things like `$style.component` 
where it resolves to the actual name of the class once it gets compiled by webpack.

A few minutes ago, we learned that anytime you referenced a variable inside of
a template internally, what that actually does is it calls `this.$style`, where
`$style` is a property on the `vue` instance.

***TIP
Notice that the template also understands the `this` keyword, be we omit it
as a shortcut.
***

So even if we knew nothing else, the very fact that we can reference the `$style`
object in a template means that the `vue` instance has a `$style` property in it.
In other words, it means that we are allowed to say `this.$style` inside of
JavaScript, and that's why that works down here in our computed property method.

Now for our actual custom logic, let's say if `this.collapsed`, to reference our
collapsed state, then `classes.push(this.$style`, once again, `.collapsed)`. Perfect!
That's it! And of course, with any methods, if you want to, you can add some
documentation above it:


Here PHPStorm *tries* to guess the return type on here but it gets a little confused
since `vue` is *so* dynamic, so let's help it out. This is just an array of strings.


Excellent!

## How computed works
 
So here's the deal. As soon as you have a key under the `computed` object, this
becomes available in the template as a variable. In fact, `vue` will create a
variable with a `getter` set to our method and assign it to its magical `this` keyword.
But most importantly, if *anything* inside that method changes, weather it be a
`data` property or a `prop`, `Vue` will automatically re-run that method for us
and recalculate the rendered DOM in a *very* optimized way. *Wow!* Your world
just changed forever!

So we'll copy `componentClass` and up here in the template, very simply we'll say
`:class="componentClass"`. I can also organize this better and move our `<div>`
on a single line. That's it, ESlint, don't be mad at me!
 
So up until now, we know that `vue` adds any `data` `props` or `methods` to the vue
instance, which means that we can reference those inside of our template.
Well, `computed` is the fourth and final thing that gets added to that instance
and as we just said, `Vue` adds any key under `computed` as a `property` with its
`getter` set to that method.

So in up here back in the template, we can just reference `componentClass`,
which is really `this.componentClass`. And behind the scenes `vue` is going to
call this method `componentClass` to get that and update it whenever necessary.

Because this is being added to the `vue` instance, just like `methods`, `data` or
`props`, it means that we can actually reference it with the `this` variable.
Just to prove it, inside of our `toggleCollapsed` method, let's say
`console.log(this.componentClass())`.
 
 
 
Notice that PHPStorm tries to auto complete that with parentheses, but that's not
correct! We need to reference it like a property, even though behind the scenes,
we know view is going to call this method.

## Check it out!

So if we go over the browser now... Check this out! You can see the log and it is
showing the component classes correctly every time we change it!
 
You can also see this over in the `Vue` developer tools! Click down on the `sidebar`.
Under `data`, you now have the `computed` section which shows `componentClasses` as
you hide and show the sidebar!


Finally, let's go back over here and remove our `console.log()`. We are now
mastering one of the most powerful tools in `Vue`, the computed properties!

Next. Let's talk about the stock market and how Bill Gates is profiting from
coronavirus!
