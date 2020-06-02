# Webpack dev-server: Faster Updating

Before we keep going further into Vue, I want to show you a really fun feature
of Webpack that Vue works *perfectly* with. Using this feature is *totally* optional,
and if you have a more complex setup, it may not even be worth using. But, if
you *can* get it working, it's *amazing*.

Ok, right now, if you find your terminal, we are running `yarn watch`. Hit
Control + C to stop it.

When you run `yarn watch` or `yarn dev` or `yarn build` - which will build your
assets for production - Webpack reads the files in the `assets/` directory,
processes them, and dumps *real* files into the `public/build/` directory. If
you look at the HTML source of the page, our `script` and `link` tags are pointing
to these physical files. So we have a build process, but it builds real files
and our browser us ultimately downloading normal, static CSS and JS content.

This is great, but there's one *other* way to run Webpack while developing. It's
called the `dev-server`. It *should* be easy to use but, as you'll see, if you
have a more complex setup or use Docker, you might need some extra config.

## Running the dev-server

Anyways, let's try it. Instead of `yarn watch`, run:

```terminal
yarn dev-server
```

Now, just like with `yarn watch`, this `dev-server` command works thanks to
the `scripts` section of our `package.json` file, which Encore gives you when
you install it.`dev-server` is a shortcut for `encore dev-server`.

Back at the terminal, interesting: it says "Project running at http://localhost:8080"
and "webpack output is served from http://localhost:8080/build".

When you run the `dev-server`, Webpack does *not* output physical files into the
`public/build` directory. Well, there are two JSON files that Symfony needs, but
notice: the JavaScript and CSS files do *not* exist.

Instead, if you want to access these files, you need to go to
http://localhost:8080 - which hits a web server that the command just launched.
Well, this "homepage" doesn't work - but we don't care. Try going to `/build/app.js`.

There's our built `app.js` JavaScript file! Here's the idea: instead of outputting
physical files, Webpack makes everything available via this `localhost:8080` server.
If we, on *our* site, can change or script and link tags to *point* to this server,
it will load them.

And... actually, when we refresh the homepage... woh! The site still works!
Check the HTML source. Nice! All the `link` and `script` tags *automatically*
point to `localhost:8080/`.

So, on a *high* level, this is cool, but not *that* interesting yet. Instead of
Webpack creating physical files, it launches a web server that hosts them... and
our Symfony app is smart enough to automatically point all of our script and link
tags at this server. But the end result seems the same: when we update some Vue
code, we can immediately refresh the page to see the changes.

## dev-server & HTTPS

But... the dev-server opens up some interesting possibilities. First, you might
notice that a bunch of AJAX requests are failing on this page. It's some
`sockjs-node` thing from on that dev server. One of the super powers of the dev
server is that it can automatically update your JavaScript and CSS *without* you
needing to reload the page. To do that, it makes a connection back to the dev-server
to look for changes.

This if failing because it's trying to use https for the AJAX call and, unless
you configure it, the dev-server only works for http. So why is it trying to use
https? Because *our* page is running on https.

So there are 2 ways to fix this. First, you could configure the Webpack dev server
to allow https. The Encore dev-server docs talk about this. Or second, which is
easier right now, visit your site with http.

When we originally started the Symfony web server, we started it
with `symfony serve -d` and then `--allow-http`. This means that the web server
supports https, but we're *allowed* to use http if we want. Once we change to
use http... the AJAX call starts working.

If you *do* want to get https setup properly, check the Encore docs and let us
know if you have questions. But ultimately, if the dev-server is giving you
problems, don't use it! It's just a nice thing to have.

## Automatic Reloading

Why? Head over to your terminal, open `products.vue` and... let's see... I'll
make my favorite change: adding a few exclamation. I'll save then move back to
my browser.

Nice! The page refreshed *for* me. If I remove those exclamation points and come
back, it did it again! Ok, that's cool, right? As soon as it detects a change,
it automatically refreshes the page.

But... we can get cooler! We can avoid the site from refreshing at *all* with one
simple flag. Let's see that next.
