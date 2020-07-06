# Reading Server Data & :global Classes

We just set a global `currentCategoryId` variable in JavaScript. Let's use this
in our Vue app to highlight which category we're currently viewing.

Open up `sidebar.vue`. How can we get the current category info here? The simplest
way is... to reference the global variable! We *will* talk soon about ways
to organize this, but since we created a global variable in Twig, we can
absolutely use that here!

Well... we can't use it *immediately* in our Vue template. If we tried to
use `currentCategoryId` to add a dynamic class, Vue would think that we were
trying to reference `this.currentCategoryId`.

We have two options. First, we could add a `currentCategoryId` *data* and initialize
it to `window.currentCategoryId`. That would be *fine*. But because I don't
intend for this value to *change* while my Vue app is running - at least not yet -
it doesn't *really* need to live as data, though it wouldn't hurt anything,

Instead, let's leverage a computed property... which is a *great* way to expose
any extra variables you need in a template.

Below `data`, add `computed` and create a new computed property called
`currentCategoryId`. Inside, `return window.currentCategoryId`.

It's just that simple!

## Adding the .selected Style

Before we use this in the template, let's add a new class that we can use for the
"selected" category. Inside the `ul`, create a new style called `li a.selected`.
This is the class that we will need to dynamically add in the template. Inside,
say `background: $light-dash-component-border;`.

This comes indirectly from the `light-component` mixin we're using - it's actually
a variable set in `colors.scss`.

Ok! Let's use this `selected` class up in the template. Start with the
"all products" item: this should have the `selected` class *if* the
`currentCategoryId` is `null`. And it should *always* have the `nav-link` class.

To do that, change this to `:class` and set it to an *object*. Inside, add a key
called `nav-link` set true so that it *always* shows up. For the dynamic class,
add `[$style.selected]` - to reference our new `selected` class - and make that
render if `currentCategoryId === null`.

Remember: the ugly square bracket syntax is needed so that JavaScript knows that
our key is a dynamic expression. That's... unfortunate, but we're  going to fix
that in a minute anyways!

Now copy the `:class` attribute and, down inside the loop, paste over the existing
`class`. In this case, we want to show the class if
`category['@id'] === currentCategoryId`.

Testing time! Back on the browser... yes! It already works! I'm on the
"Office Supplies" page and that category *is* highlighted! Let's click on
"All Products" and... it works *beautifully*!

So even though we don't have access to the global variable directly in our
template, it's very simple to create a computed property that grabs that *for*
us and makes it available!

## SASS Globals

There's *one* thing I want to improve before we talk about a *better* way
to manage global variables.

It bothers me a *little bit* that I have to use `$style.selected`... especially
because I'm forced to use the ugly `[]` syntax! If you look down at our CSS,
we're already inside of a modular `.component` class. On the top of our
template: yep! We're using `$style.component` on the root element.

In SASS, because I put the `.selected` class *inside* of `.component`,
the style will only apply to elements that are *inside* the root element.

Move over to your browser and "inspect element" on the selected link. Not surprisingly,
this has a modular `selected` class: `sidebar_selected_` and then a dynamic
hash. But check out how the CSS is generated for this: it's `.sidebar_component_`
a hash and then `ul li.sidebar_selected_` and *another* hash! We don't actually
need that second hash! The first `.sidebar_component_` hash selector is *already*
enough to make sure that our `selected` class doesn't affect anything else on the
page.

So here's what I would *love* to be able to do: I want to be able to write CSS
like we're doing now - but *not* have any classes inside `.component` render
in a modular way. Up in the template, I want to be able to just type `selected`
and have it work.

## Make our child style classes into globals

And here's how: down in the style tag, you can tell SCSS:

> Hey! I'm using a `selected` class, but I *don't* want you to treat
> this like a modular class: I *don't* want you to add the prefix and hash.

The way you do that is by adding `:global` in front of it.

As *soon* as we do that, if I inspect element on the selected link and look at
the generated CSS selector on the right... yes! It has the modular `sidebar` class
but *then* it only says `.selected`. We're not worried about that affecting any
*other* parts of the page because it's *still* inside the modular sidebar class.

And... we can go one step further! If you think about it, because `.component` will
be converted into a modular class, we don't need *any* classes inside of it to be
modular. We can move the `:global` up and after the `.component` class.

Now *everything* inside will *not* be modular. This means that the *only* time
I should have to use the `$style` variable is on the root element! The rest can
be normal classes. This already looks much better!

Next, we have successfully referenced a global variable via a computed property.
But I don't *love* having global variables hidden inside my code. We can do this
in a better, more organized way, by refactoring it into a service!
