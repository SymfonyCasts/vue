# Project Setup

Welcome back you beautiful front-end JavaScript people! In part 1 of our Vue
series, we learned a ton of Vue basics and lots more. Now it's time to go further: to
get into the nitty-gritty details of building a real app with products, a shopping
cart, and a simple checkout form. Whoa. So let's get right down to business.

To *truly* embrace the Vue goodness, you should definitely download the course code
from this page and code along with me. After you unzip the file, you'll find a
`start/` directory with the same code that you see here. Check out this `README.md`
file for all of the setup instructions.

## Starting the symfony Web Server

One of the *last* steps will be to find a terminal, move into the project and use
the [symfony binary](https://symfony.com/download) as an easy way to start a local
web server. Do it with:

```terminal
symfony serve --allow-http -d
```

The `-d` is so that it runs as a daemon in the background. It starts a web
server at `127.0.0.1:8000` that supports HTTPS *or* HTTP. I added the `--allow-http`
flag because using HTTP makes it a bit easier to work with the webpack dev-server,
which we'll use in a second. We talked about that in the
[previous tutorial](https://symfonycasts.com/screencast/vue/dev-server) including
details on how to use the web server with https.

Anyways, let's go check out the site! Go to `http://127.0.0.1:8000`

## Executing the Encore dev-server

And say hello to... a giant error! Ok, good start! Our site uses Webpack Encore
to build its assets... and I have *not* executed Encore yet.

No problem: back at the terminal, run:

```terminal
yarn dev-server
```

This starts another server that will host our compiled CSS and JS files. I like
using this because parts of our page will automatically update without us
needing to reload. Again, we talked more about this in part 1. If the dev-server
gives you any trouble, just use `yarn watch` instead.

## Hello MVP Office Supplies

*Now* when we refresh... woohoo! Welcome to MVP Office Supplies: our site to sell
"mostly functional" office supplies to startups that truly embrace the minimum
viable product mentality. All of these products are... barely viable.

Our app is *not* a single page application: it's designed to use normal
server-side-rendered pages for most of the site. We're using Vue just to build a
*section* of our app: this product listing page and, soon, a product show page,
shopping cart and checkout.

In the section that's powered by the Vue app, you can already click a category to
go to another page. This loads the *same* Vue app, but filtered to that specific
category. We're not using something like Vue Router to avoid full page refreshes,
but we will in a future tutorial. It's totally optional.

In our code, all of the logic lives in the `assets/` directory and it's organized
there into more folders, including one that holds the top-level component for our one
page and `components/` to hold different small - and sometimes re-usable - pieces.
We also have `helpers/` and services, which mostly holds AJAX logic. I *did*
reorganize this slightly after part 1 to match the latest standards for organizing
JavaScript in a Symfony app.

Ok: for our *first* mission, it's time to allow a user to click this link and view
an individual product page. Will that page by a traditional server-side rendered
page? Another Vue app? The same Vue app? Something written in ColdFusion? 3 of those
are valid options! Let's talk about them and choose one next.
