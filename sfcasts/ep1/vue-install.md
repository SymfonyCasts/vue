# Installing Vue, Webpack & Eslint

To use Vue, we, of course, need to install it in our app. And, because we're
using modern JavaScript practices, we're not going to include a `script` tag
to a CDN or manually download Vue. We're going to install it with yarn.

But first, in addition to downloading Vue into our project, we *also* need to
*teach* Webpack how to parse `.vue` files. Like React, Vue uses some special -
not-actually-JavaScript - syntaxes, which Webpack needs to transform into *real*
JavaScript.

To tell Webpack to parse vue files, open `webpack.config.js`. Near the bottom,
though it doesn't matter where, add `.enableVueLoader()`.

Yep! That's all you need. If you want to use Vue 3, you can pass an extra argument
with a `version` key set to 3. Eventually, 3 will be the *default* version that
Encore uses.

And, even though Encore is watching for changes, whenever you update
`webpack.config.js`, you need to stop and restart Encore. I'll hit Control+C and
then re-run:

```terminal
yarn watch
```

When we do this... *awesome*! Encore is screaming at us! To use Vue, we need to
install a few packages. Copy the `yarn add` line, paste and run it:

```terminal-silent
yarn add vue@^2.5 vue-loader@^15 vue-template-compiler --dev
```

Once these are done downloading, restart Encore again with:

```terminal
yarn watch
```

It works! Nothing has really *changed* yet, but Encore is ready for Vue.

## What is Vue?

In the simplest sense, Vue is a templating engine written in JavaScript. That
*over*-simplifies it... but it's more or less true. In Symfony, if you go back to
`ProductController`, we're accustomed to using Twig. It's easy: we
tell it what template to render and we can pass variables *into* that template.

The Twig file itself is just HTML where we have access to a few Twig syntaxes,
like `{{ variableName }}` to print something.

Vue works in much the same way: instead of Twig rendering a template with some
variables, *Vue* will render a template with some variables. And the end-result
will be the same: HTML. Of course, the one extra super power of Vue is that you
can *change* the variables in JavaScript, and the template will automatically
re-render.

## Creating a Target Element for Vue

So instead of rendering this markup in Twig, delete all of it and just add
`<div id="app">`. That `id` could be anything: we're creating an empty element
that Vue will render *into*.

## Our Non-Single Page Application

Now, what *we're* building will *not* be a single page application, and that's
on purpose. Using Vue or React inside of a *traditional* web app is actually
*trickier* than building a single page application. On our site, the homepage
will soon contain a Vue app... but the layout - as you can see - is still rendered
in Twig. We also have a login page which is rendered completely with Twig and
a registration page that's the same. We'll purposely use Vue for part of our
site, but not for everything... at least not in this tutorial.

## Creating a Second Webpack Entry

Go back and open `webpack.config.js` again. This has one entry called `app`.
The purpose of `app` is to hold any JavaScript or CSS that's used across our entire
site, like to power the layout. We actually don't have any JavaScript,
but the `app.scss` contains the CSS for the body, header and other things. The
`app` script and link tags are included on *every* page.

But, our Vue app isn't going to be used on every page. So instead of adding our
code to `app.js`, let's create a *second* entry and include it *only* on the pages
that need our Vue app.

Copy the first `addEntry()` line, paste, and rename it to `products` - because
the Vue app will eventually render an entire product section: listing products,
viewing one product and even a cart and checkout in the next tutorial.

Now, in `assets/js`, create that file: `products.js`. Let's start with something
*exciting*: a `console.log()`:

> Boring JavaScript file: make me cooler!

## eslint

Oh, we will. But before we do, I'm going to open my PhpStorm settings and
search for `ESLint`. Make sure "Automatic ESLint configuration" is selected.
Because... I've already added a `.eslintrc` config file to the app. ESLint enforces
JavaScript coding standards and PhpStorm can automatically read this and highlight
our code when we mess something up. I *love* it! We're using a few basic rule sets
including one specifically for Vue. You definitely don't need to use this exact
setup, but I *do* recommend having this file.

Back in `products.js`, ha! *Now* PhpStorm is highlighting `console`:

> Unexpected console statement (`no-console`)

One of our rules says that we should *not* use `console` because that's debugging code.
Of course, we *are* debugging right now, so it's safe to ignore.

Ok: we added a new entry and created the new file. The last step is to include
the `script` tag on our page. Open up `templates/product/index.html.twig`. Here,
override a block called `javascripts`, call `parent()` and then I'll use an
Encore function - `encore_entry_script_tags()` - to render all the script tags
needed for the `products` entry.

If you look in the base template - `base.html.twig` - it's quite traditional:
we have a `block stylesheets` on top and a block `javascripts` at the bottom.

Back in our template, also override the `stylesheets` block and call
`encore_entry_link_tags`. Eventually, we'll start using CSS in our `products`
entry. When we do, this will render the link tags to the CSS files that Encore
outputs.

Before we try this - because we just updated the `webpack.config.js` file - we
need to restart Encore *one* more time:

```terminal-silent
yarn watch
```

When that finishes, move back over, refresh... then open your browser's debug
tools. Got it! Our boring JavaScript file is alive!

## Our First Vue Instance

Let's... make it cooler with Vue! Back in `products.js`, start by importing Vue:
`import vue from 'vue'`. This is one of the *few* parts that will look different
in Vue 3 - but the ideas are the same.

If you imagine that Vue is a templating engine - like Twig - then all we should need
to do is pass Vue some template code to render. And... that's *exactly* what we're
going to do. Add `const app = new Vue()` and pass this some options. The first
is `el` set to `#app`. That tells Vue to render inside of the `id="app"` element.
Then, pass one more option: `template`. This is the HTML template - just like a
Twig template - except that, for now, we're going to literally add the HTML right
here, instead of in a separate file:

> `<h1>Hello Vue! Is this cooler?</h1>`

That's... all we need! Moment of truth: find your browser and refresh. There it
is! We just built our first Vue app in about 5 lines of code.

Next, let's make it more interesting by passing *variables* to the template
and witnessing Vue's awesomeness first hand.
