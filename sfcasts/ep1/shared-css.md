# Using Shared CSS

So let's *finally* use the new `sidebarCollapsed` data inside `products`. Right
now, when we collapse, we add a `collapsed` class... which makes the element
really small - just 70px.

Remove the `.collapsed` class entirely: we're going to simplify.

Inside the `componentClass` computed property, copy the three methods that
the sidebar *always* has. Then delete that completely. We're going to move
*all* of the size logic to the parent component. Paste the three classes onto
the outer div.

Over in `products.vue`, the classes on the `<aside>` and this `<div>` now need
to be dynamic based on the `sidebarCollapsed` data. Hey! That's a *perfect*
use-case for computed properties!

Down in our code, add a `computed` option with *two* computed properties. Call
the first `asideClass`: it will determine the classes for the `<aside>` element.
Inside, return `this.sidebarCollapsed`. If we *are* collapsed, use a class called
`aside-collapsed` - that doesn't exist yet, we'll create it in a minute. If we
are *not* collapsed, use the normal `col-xs-12` and `col-3`.

Oh, and Webpack is mad because, of course, this needs to be a *function*. That's
better.

Copy `asideClass()`, paste and call it `contentClass()`. For this one, when
we're collapsed, use `col-xs-12 col-11` so that it takes up *almost* all of the
space. And then when it's not collapsed, use the normal `col-xs-12 col-9` so
that it shares the space.

Perfect! Well... no, not perfect: ESLint isn't happy about this `computed` option:

> The `computed` property should be above the `methods` property.

This makes no difference *technically*, but there are some general best-practices
about the *order* of your options. Let's move this above `methods` to follow those.

Ok: now that we have 2 keys under computed, we have two new variables inside of our
template. Scroll up to the top. For the `<aside>` element, we can say
`class="asideClass"`. Ah, but I'm sure you're starting to spot my mistake - we need
`:class` to make that dynamic.

Do the same for the div below: `class="contentClass"` and then make it `:class`.

Sweet! Let's give it a try! I'll refresh just to be safe. And... ah! It works! It
might feel smoother with some CSS transitions, but on a Vue level, this is working
brilliantly!

## Adding a Global Class

Though, I *could* use a little more padding on the sidebar when it's collapsed...
I don't want it *all* the way against the edge.

Go back to the computed property. When the sidebar is collapsed, it has a
`aside-collapsed` class... which I *totally* made up: that does *not* exist yet.
To fix our padding issue, we *could* have said `this.$style['aside-collapsed']`
and then added a new `.aside-collapsed` class to the `styles` tag of this component.

But... to make this more interesting, let's pretend that we're going to have
multiple components across our app that will need to use this class. And so, I
don't want to add it as a modular style to this component: I'd rather put this
CSS in a *central* spot and *share* it.

*That* is why I used `.aside-collapsed` instead of using the `$style` variable.
Open up `scss/app.scss` and, at the bottom, add the style: `aside-collapsed`
with `padding: 0 15px`.

Cool! When we move over to our browser... yes! It looks better already. So this
is just a reminder that while modular styles are *cool*, if you want to re-use
something, you *can* continue to use normal CSS files.

## Importing Shared, Non-Modular CSS Files

By the way, you *could* almost use `@import` to import CSS files from inside the
`style` tag of your component... you can even do it in a way that *prevents*
the styles from getting the module prefix. To do that, add a second `style` tag,
leave off the `module` and make the language `css`. You can still *import* SASS
files, but if you make the language `scss`, for some reason, your CSS rules will
get duplicated inside Webpack.

Next, it's finally time to make some Ajax calls and bring in some *truly* dynamic
data!
