# Setup

Coming soon...

Welcome back you beautiful front end JavaScript people. Okay. In part one of our view
tutorial, we learned all of, all of the view basics and more. Now it's time to go a
step further and get into the nitty gritty details of building a real app with
products, a shopping cart, and a simple checkout form. Whoa. So let's get right down
to business to really have fun. You should definitely download the course code from
this page and code along with me after you unzip, you'll find a start directory with
the same code that you see here.

Check out this,

Read me.md file for all of the setup instructions. One of the last steps will be to
find a terminal move into the project and use the Symfony. Binary is an easy way to
start a local web server, do it with Symfony serve dash dash allow HTTP dash D

The dash

D is so that it runs as a Damon in the background. This will start a web
server@onetosevendotzero.zero.one that supports HTTPS or HTTP. I added the allow HTTP
flag because we're because using HTTP makes it a bit easier to work with web PACS dev
server option. Something that that's something that we talked about in the last
tutorial that you can absolutely use HTTPS if you want. And the details of how to
make that play nicely with Encore are in the Encore doc.

Anyways, let's go check out the site

HTTP colon //and then one, two seven-zero.zero.one, colon 8,000

To see Hey, giant air.

Oh, of course. Our site is looking for our Webpack Encore built assets and we haven't
executed Encore. So they're not there yet. Back in the terminal, The terminal, we can
do that with yarn dev server. This starts another server that will host our compiled
CSS and JS files. I like it because parts of our page will,

Hmm.

That starts another server that will host our compiled CSS and JS files. I like it
because parts of our page will automatically update without us needing to reload the
page. Something else that we talked about in the last tutorial, but if it gives you
any problems, just run yarn watch instead. Now when we refresh, okay,

Yay.

It's MVP office supplies, our site to sell mostly functional office supplies to
startups that truly embrace the minimum viable product mentality. All of these
products are barely viable. I assure you it's average. This app is not a single page
application it's designed to have normal server-side render pages on most of the site

We're using Vue just to build out a section of our site, this product listing page
and soon a product show, page, a cart and a checkout. You can already click a
category to go to another page, which loads the same view app, but filtered for that
specific category. We're not using something like view router yet to avoid the full
page refreshes, but we will in a future tutorial that is totally optional in our
code, in the assets directory. All this is broken down into some directories, like
our one page and a bunch of components for the different parts. We also have helpers
and services, which are mostly for Ajax calls. I did reorganize this directory
slightly by moving from, uh, since part one. So what's next it's time to allow a user
to actually click this link, to view an individual product. Let's do that.

