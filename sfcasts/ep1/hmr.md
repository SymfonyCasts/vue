# HMR: See Changes without Reloading

If you use Webpack's `dev-server`, then as soon as it detects a change, our page
automatically reloads. Cool... but not cool enough! Find your terminal, hit
Control + C to stop Encore, then re-run the dev server with a `--hot` option.

```terminal-silent
yarn dev-server --hot
```

That stands for hot module replacement. Once that finishes... I'll move over and
reload the page one time just to be safe.

Let's do the same trick: add two exclamation points, then quick! Go back to the
browser! Woh! It's there... but I didn't even see it reload! And no matter *how*
fast you are, you'll see the update but you'll *never* see a page refresh: it's
just not happening anymore! How cool is that? Webpack is able to *dynamically*
update the JavaScript without reloading. It even keeps any Vue *data* the same.

This hot module replacement thing doesn't work with *all* JavaScript, but it
*does* work well with Vue and React.

## Disabling CSS Extraction

But... there's one *tiny* problem. Don't worry it's not a big deal. Back in our
editor, at the bottom, let's make a CSS change: I'm pretty sure a designer just
told me that the hover background should be pink.

This time, back on the browser, hmm: the style did *not* update. But if we refresh,
it *is* there. HMR isn't working for styles.

This is easy to fix by disabling a feature in Encore. Let me show you. Open up
`webpack.config.js` and go all the way to the bottom so we can use an `if` statement.
Here, say if not `Encore.isProduction()` - a nice flag to see if we're building
our assets for production or not - then `Encore.disableCssExtraction()`.

CSS extraction means that any CSS that Webpack finds should be *extracted* into
an external CSS file. That's why a `products.css` file is being output. When you
*disable* CSS extraction, it tells Webpack *not* to do this anymore. Instead, it
embeds the CSS *into* the JavaScript. Then, when the JavaScript loads, it *adds*
the CSS as `style` tags on the page.

I'll explain that a bit more in a minute... but let's see how our page changes first.
Because we updated our Webpack config, at your terminal, stop Encore and restart it:

```terminal-silent
yarn dev-server --hot
```

Now, refresh the page. Did you see that? It looks the same, but it was unstyled for
*just* a second. If you view the HTML source, there are *no* CSS link tags anymore.
The CSS is being added by our JavaScript files. And because it takes a moment for
those to load, our page looks ugly for an instant.

Two important things about this. First, disabling CSS extraction should *only*
ever be done in dev mode: you *always* want *real* CSS files on production. And
second, the *only* reason we're going to all the trouble of disabling CSS extraction
at *all*, is because hot module replacement *only* works when it's disabled. Hopefully,
someday, that won't be the case... and we won't need to do this.

The end result is pretty sweet though. Our hover links are still pink but now
let's change them to green. And... yes! You could see it change from pink to
green *almost* instantly. If we remove the extra background entirely... that time
it was faster than me!

I'm going to do the rest of the tutorial using the dev-server with hot module
replacement because I love it! But it *did* require some work - like using `http://`
or getting the ssl certificate setup and disabling CSS extraction.

Your situation may require even *more* work. If it does, consider using
`yarn watch` instead. The `dev-server` is supposed to make your life easier. If
it doesn't leave it behind.

Next, let's *really* start organizing our app - and making it more realistic -
by splitting our code into several new components.
