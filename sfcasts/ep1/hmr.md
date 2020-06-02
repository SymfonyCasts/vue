# HMR: See Changes without Reloading

If you use Webpack's `dev-server`, then as soon as it detects a change, our page
automatically reloads. Cool... but not cool enough. Find your terminal, hit
Control + C to stop Encore, then re-run the dev server with a `--hot` option.

```terminal-silent
yarn dev-server --hot
```

That stands for a hot module replacement. Once that finishes... I'll move over and
reload the page one time just to be safe.

Let's do the same trick: add two exclamation points, then quick! Go back to the
browser! Woh! It's there... but I didn't see a refresh. And no matter *how* fast
you are, you'll see the update but you'll *never* see a page refresh: it's just
not happening anymore! How cool is that?

This hot module replacement thing doesn't work with *all* JavaScript, but it
*does* work well with Vue and React.

## Disabling CSS Extraction

But... there's one *tiny* problem. Don't worry - we'll fix it - HMR *is* as cool
as it looks. Back in our editor, at the bottom, let's make a CSS change: I'm pretty
sure a designer just told me that the hover background should be pink.

This time, back on the browser, hmm: the style did *not* update. But if we refresh,
it *is* there. HRM is not working for styles.

This is easy to fix by disabling a feature in Encore. Let me show you. Open up
`webpack.config.js` and go all the way to the bottom so we can use an `if` statement.
Here, say if not `Encore.isProduction()` - a nice flag to see if we're building
our assets for production or not - then `Encore.disableCssExtraction()`.

CSS extraction means that any CSS that Webpack finds should be *extracted* into
an external CSS file. That's why a `products.css` is being output. When you
*disable* CSS extraction, it tells Webpack *not* to do this anymore. Instead, it
embeds the CSS *into* the JavaScript and when the JavaScript loads, it *embeds*
the CSS as `style` tags on your page.

I'll explain that a bit more... but let's see how our page changes. Because we
updated our Webpack config, at your terminal, stop Encore and restart it:

```terminal-silent
yarn dev-server --hot
```

Now, refresh page. Did you see that? It looks the same, but it was unstyled for
*just* a second. If you view the HTML source, there are *no* CSS link tags anymore.
The CSS is being added by our JavaScript files. And because it takes a moment for
those to load, our page looks ugly for an instant.

Two important things about this. First, disabling CSS extraction should *only*
ever be done in dev mode: you *always* want *real* CSS files on production. And
second, the *only* reason we're going to all the trouble if disabling CSS extraction
at *all*, is because hot module replacement *only* works when it's disabled. Hopefully,
someday, that won't be the case.

The end result is pretty sweet though. Our hover links are still pink - love it!
But let's change them to green. And... yes! You could see it change from pink to
green *almost* instantly. If we remove the extra background entirely... that time
it was faster than me!

I'm going to do the rest of the tutorial using the dev-server with hot module
replacement because I love it! But it *did* require some work - like using `http://`
for my site and disabling CSS extraction. And your situation may require even
*more* work. If it does, consider using `yarn watch` instead. The `dev-server`
is supposed to make your life easier. If it doesn't leave it behind.

Next, let's *really* start organizing our app & making it realistic by splitting
our code into several new components.
