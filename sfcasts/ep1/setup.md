# Encore, Symfony & API Platform

Hey friends! Welcome to the Delightful world of Vue.js. I know I say that *everything*
we talk about at SymfonyCasts is fun - and *totally* mean that - but this tutorial
is going to be a *blast* as we build a *rich* and realistic JavaScript frontend
for a store.

## React vs Vue

These days, the two leaders in the frontend-framework world are React and Vue.js.
And just like with PHP frameworks, they're *fundamentally* the same: if you learn
Vue.js, it'll be much easier to learn React or the other way around. If you're not
sure which one to use, just pick one and run! React tends to feel a bit more like
pure JavaScript while Vue is a bit more magic, which, honestly, can make it easier
to learn if you're not a full-time JavaScript developer.

## Vue 2 vs Vue 3

In this tutorial, we'll be use Vue version 2. But even as I'm saying that, Vue
version 3 is coming soon and might be released by the time you watch this. But
don't worry: there are actually very few differences between Vue 2 and 3 and whenever
something *is* different, we'll highlight it in the video. So feel free to code
along using Vue 2 or Vue 3.

## Project Setup

Oh, and speaking of that, to best view the Vue goodness, you *should* totally
code along with me: you can download the course code from this page. After unzipping
it, you'll find a `start/` directory with the same code that you see here. Follow
the `README.md` file for all details on how to get your project setup. The code
*does* contain a Symfony app as our API backend, but we'll spend almost all of
our time in Vue.

One of the last steps in the README will be to find a terminal, move into the
project and use Symfony's binary to start a local web server. You can download
this at https://symfony.com/download. I'll say: `symfony serve -d` - the `-d`
tells it to start in the background - and then also `--allow-http`:

```terminal-silent
symfony serve -d --allow-http
```

This starts a new web server at localhost:8000 and we can go to it using `https`
or `http` - we'll talk about why I used the `--allow-http` flag later.

Ok: copy the URL, find your browser, paste it in the address bar and... say hello
to a giant error!

> Yarn & Webpack Encore Setup

Let's... back up. There are two things you need to know about the project. First,
to help process JavaScript and CSS, we're using Webpack Encore: a simple tool
for helping configure Webpack. We have an entire
[free tutorial](https://symfonycasts.com/screencast/webpack-encore) about it.
You'll probably want to at least know the basics of Webpack or Encore before you
keep going.

To start, our Encore config is pretty basic. We have a single entry - called `app`.
It lives in the `assets/` directory - that's where all of our frontend files will
live. The `app.js` file doesn't actually have any JavaScript, but it *does* load
an `app.scss` file that holds some basic CSS for our site, including Bootstrap.
Our base layout already has a `link` tag to the built CSS version of this file...
which exploded because we haven't executed Encore and *built* those assets yet.

Back at your terminal, start by installing the Encore and its other dependencies
by running:

```terminal
yarn install
```

If you don't have `node` or `yarn` installed, head to https://nodejs.org and
https://yarnpkg.io to get them. Once this is done populating our `node_modules/`
directory, we can run Encore with:

```terminal
yarn watch
```

This builds the assets into the `public/build` directory and then waits and watches
for more changes: any time we modify a CSS or JS file, it will automatically
re-build things. The `watch` command works thanks to a section in my `package.json`
file: `watch` is a shortcut for `encore dev --watch`.

Ok! Let's try the site again - refresh! Ha! Welcome to MVP Office Supplies: our
newest lean startup idea here at SymfonyCasts. Ya see, most startups take a
lot of shortcuts when creating their first minimum viable product. We thought:
why not take that *same* approach to office furniture and supplies? Yep, MVP
Office Supplies is all about delivering low-quality - "kind of" functional - products
to startups that *truly* value the minimum-viable approach to products.

## Traditional Symfony App Mixed with Vue

Everything you see here is a traditional Symfony app: there is *no* JavaScript
running on this page at all. The controller for this page is
`src/Controller/ProductController.php`, `index()` is the homepage, and it renders
a Twig template: `templates/product/index.html.twig`. Here's the text we're seeing.

The point is: right now, this is a good, traditional, boring server-side-generated
page.

## API Platform API

The second important thing about our app is that it already has a really nice API.
You can see it if you go to https://localhost:8000/api. We built this with my
*favorite* API tool: API Platform - we have several tutorials on SymfonyCasts
about it.

Inside our app - let me close a few files - we have 6 entities, or database tables:
`Product`, `Category` and a few other things related to checkout. Each of these
is has a series of API endpoints that we'll call from Vue.

For example, back on the browser, scroll down to the `Product` section: we can
use these interactive docs to *try* an endpoint: let's test that if you make a
request to `/api/products`, that will return a JSON collection of products. Hit
Execute and... there it is! This funny-looking JSON format is called JSON-LD, it's
not important for Vue - it's basically JSON with extra metadata. Under this
`hydra:member` property, we see the products: a useful Floppy disk, some blank
CD's - all kinds of useful things for a startup in the 21st century.

We'll be using this API throughout the tutorial.


Ok, click back to the homepage. Next, let's get Vue installed, bootstrap our first
Vue instance and see what that puppy can do!
