# Modular CSS

I love that I can put my styles right inside the component. In `products.vue`,
we render an element with a `sidebar` class... and then immediately - without going
anywhere else - we're able to add the CSS for that. We *can* still have external
CSS files with *shared* CSS, but for any styling that's *specific* to a component,
it can live right there.

## CSS Name Conflicts

But... we need to be careful. The class `sidebar` is a pretty generic name. If we
accidentally add a `sidebar` class to *any* other component - or even to an element
in our Twig layout - this CSS will affect it!

Find your browser, refresh, and open the HTML source. On top, here's our stylesheet:
`/build/products.css`. Open that up. Yep! That's what I expected: a `.sidebar` class
with the CSS from the component. It's easy to see that these styles would affect
*any* element on the page with a `sidebar` class... whether we want it to or not.

## Hello Modular CSS

To solve this problem, Vue, well really, the CSS world - because this is a generic
CSS problem - has created two solutions: scoped CSS and modular CSS. They're...
two *slightly* different ways to solve the same problem and you can use either
inside of Vue. We're going to use modular CSS.

What does that mean? It means that whenever we have a `style` tag in a Vue component,
we're going to include a special attribute called `module`.

That's it. Back at your browser, leave the CSS file open, but close the HTML source
and refresh the homepage. Ah! We *lost* our sidebar styling! It's a modular CSS
"feature", I promise!

To see what's going on, go back to the tab with the CSS file and refresh. Woh.
The class names *changed*: they're now `.sidebar_` and then a random string.
Back on the main tab, if we inspect element... the `div` *still* has the normal
`sidebar` class.

Here's what's going on. When you add `module` to the `style` tag, Vue generates
a random string that's specific to this *component* and adds that to the end of
all class names. The *great* thing is that we can use generic class names like
`sidebar` *without* worrying about affecting other parts of the page. Because...
in the final CSS, the class name is *really* `sidebar_` then that random string.

Of course, now that this is happening, we can't just say `class="sidebar"` in
the template anymore. We need to somehow use the *dynamic* name - the one that
includes the random string.

## Rendering the Dynamic CSS Class

As soon as you add `module` to a `style` tag, Vue makes a *new* variable available
in your template called `$style`, which is a map from the original class name -
like `sidebar` - to the new dynamic name - like `sidebar_abc123`.

I'm going to delete the `p-3 mb-5` classes temporarily... just to simplify.

Ok: we no longer want to set the `class` attribute to a simple string: it needs to
be dynamic. And whenever an attribute needs to contain a dynamic value, we prefix
it with `:`, which is `v-bind` dressed up in its superhero costume.

*Now*, we're writing JavaScript. Use that new `$style` variable to say
`$style.sidebar`.

Unfortunately, at this time, the Vue plugin in PhpStorm doesn't understand the
`$style` variable, so it won't be much help here. But because we have a class
called `sidebar` inside the `style` tag, we *can* say `$style.sidebar`.

Let's try it! Move over, refresh and... we're back! Our class renders with the
dynamic name.

## The Powerful class Attribute Syntaxes

Of course, it looks a *little* weird because our element is missing the two
classes we removed. How can we add them back? We could do some ugly JavaScript,
a plus, quote, space... but... come on! Vue almost *always* has a nicer way.

In fact, Vue has special treatment for the `class` attribute: instead of setting
it to a string, you can *also* pass it an array. Now we can include `$style.sidebar`
and the two static classes inside quotes: `p-3` and `mb-5`.

That should do it! Back at the browser... much better.

So... that's modular CSS! We're going to use it throughout the project and we'll
learn a *couple* more tricks along the way.

## Controlling the "ident" (modular CSS Class Name)

You may have noticed that, when you look at the DOM, it's not super clear which
component the `sidebar` class is coming from: that random string doesn't tell
us much. That's not a *huge* deal, but with a little config, we can make this
friendlier in dev mode.

Open up `webpack.config.js`. It doesn't matter where, but down here after
`enableVueLoader()`, I'm going to paste in some code. You can get this from the
code block on this page.

I admit, this *is* a bit low-level. Inside of Webpack, the `css-loader` is what's
responsible for understanding and processing styles. This `localIdentName` is
how the random string is generated when using modular CSS. This tell it to use
the component name, then the class name - like `sidebar` - and *then* a random
hash. And we're only doing this in `dev` mode because when we build for production,
we don't care what our class names look like.

To make this take affect, at your terminal, hit Ctrl+C to stop Encore and then
restart it:

```terminal-silent
yarn watch
```

Once that finishes, I'll move back to my browser. Refresh the CSS file first. Nice!
The class name is `products_sidebar_` random string. And when we try the real page,
it works too.

Next, oh, we're going to try something that I'm *so* excited about. It's called
"hot module replacement"... which is a pretty cool-sounding name for something
even cooler: the ability to make a change to our Vue code and see it in our browser
without - wait for it - reloading the page. Woh.
