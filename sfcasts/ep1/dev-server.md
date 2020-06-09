# Webpack dev-server: Faster Updating

Before we keep going further with Vue, I want to show you a really fun feature
of Webpack that Vue works *perfectly* with. It *does* require some setup, but
I think you're going to love it!

Find your terminal. Right now, we're running `yarn watch`. Hit Control + C to
stop it.

When you run `yarn watch` or `yarn dev` or `yarn build` - which builds your
assets for production - Webpack reads the files in the `assets/` directory,
processes them, and dumps *real* files into `public/build/`. If you look at the
HTML source of the page, our `script` and `link` tags point to these physical
files. So we have a build process, but it builds real files and our browser
ultimately downloads static CSS and JS content.

This is great, but there's *another* way to run Webpack while developing. It's
called the `dev-server`. It *should* be easy to use but, as you'll see, if you
have a more complex setup or use Docker, it might require extra messing around.

## Running the dev-server

Anyways, let's try this fancy `dev-server`. Instead of `yarn watch`, run, you
guessed it, `yarn dino-server`:

```terminal-silent
yarn 🦖-server
```

Nope, that won't work. But dang! I wish we had added that to Encore! Missed
opportunity. Run:

```terminal
yarn dev-server
```

Just like with `yarn watch`, this `dev-server` command works thanks to a
`scripts` section in our `package.json` file, which Encore gives you when
you install it. `dev-server` is a shortcut for `encore dev-server`.

Back at the terminal, interesting. It says "Project running at http://localhost:8080"
and "webpack output is served from http://localhost:8080/build".

When you run the `dev-server`, Webpack does *not* output physical files into the
`public/build` directory. Well, there are two JSON files that Symfony needs, but
no JavaScript, CSS or anything else. These do *not* exist.

Instead, if you want to access these, you need to go to
http://localhost:8080 - which hits a web server that the command just launched.
Well, this "homepage" doesn't work - but we don't care. Try going to `/build/app.js`.

*This* is our built `app.js` JavaScript file! Here's the idea: instead of outputting
physical files, Webpack makes everything available via this `localhost:8080` server.
If we, on *our* site, can change our script and link tags to *point* to this server,
it will load them.

And... I've got a surprise! When we refresh the homepage... woh! The site still
works! Check the HTML source. Nice! All the `link` and `script` tags *automagically*
point to `localhost:8080/`.

So, on a *high* level, this is cool, but not *that* interesting yet. Instead of
Webpack creating physical files, it launches a web server that hosts them... and
our Symfony app is smart enough to point all of our script and link tags at this
server. But the end result is more of less the same as `yarn watch`: when we
update some JavaScript or CSS code, we can immediately refresh the page to see
the changes.

## dev-server & HTTPS

But... the dev-server opens up some interesting possibilities. First, you might
notice that a bunch of AJAX requests are failing on this page. It's some
`sockjs-node` thing from that dev server. One of the super powers of the dev
server is that it can automatically update the JavaScript and CSS in your browser
*without* you needing to reload the page. To do that, it makes a connection back
to the dev-server to look for changes.

This if failing because it's trying to use https for the AJAX call and, unless
you configure it, the dev-server only works for http. And it's trying to use https
because *our* page is running on https.

So there are 2 ways to fix this. First, you could configure the Webpack dev server
to allow https. If you're using the Symfony web server like we are, this is
actually pretty easy - the `yarn dev-server` command just gets longer:

```terminal-silent
yarn dev-server --https --pfx=$HOME/.symfony/certs/default.p12
```

That tells the dev-server to allow https and to use the same SSL certificate
as the Symfony dev server.

The other option, which is not quite as cool, but will *definitely* work, is to
access your site with http so that this request *also* uses http.

When we originally started the Symfony web server, we started it
with `symfony serve -d` and then `--allow-http`. This means that the web server
supports https, but we're *allowed* to use http. Once we change to http in the
URL... the AJAX call starts working!

If you have a more complex setup, like you need to change the host name or have
CORS issues, check out the Encore dev-server docs or drop us a question in the
comments. But ultimately, if the dev-server is giving you problems, don't use it!
It's just a nice thing to have.

## Automatic Reloading

Why? Head over to your terminal, open `products.vue` and... let's see... I'll
make my favorite change: adding some exclamation points! I'll save then move back
to my browser.

Nice! The page refreshed *for* me. If I remove those exclamation points and come
back, it did it again! Ok, that's kinda cool: as soon as it detects a change,
it automatically reloads.

But... we can get cooler! We can avoid the site from refreshing at *all* with one
simple flag. Let's see that next.
