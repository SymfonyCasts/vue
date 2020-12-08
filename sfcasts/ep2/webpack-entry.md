# Webpack Entry

Coming soon...

Now that our happy customers can buy our awesome products. We're ready to proceed to
the shopping cart and checkout process. Ooh, and Hey, this shopping cart `/checkout`
page will Be a new page so

We can render this new page in twig. If we want it to completely server-side with no
view, that's a great option if we don't need the power Vue, but, you know, because
this is a Vue tutorial, I think we should use it. So step one is just a great a
`/cart` page in Symfony, and I've done that work for us in `src/Controller/CartController`
this `shoppingCart()` action renders a template in `templates/cart/cart.html.twig`
that basically just yells has a giant to do

The name Of the route for this page is `app_cart`. So as a first step, let's get this 
link up  here to go to that page. I'll open `templates/base.html.twig`. And there we
go down here. I'll find that and replace the `href=""` with `path('app_cart')`.

I'll go over and refresh quick shopping cart. And then

There is our beautiful giant `<h1>` tag. So next let's bootstrap a new component for
this page,
But wait for this new page, are we going to make our `products.vue` page even smarter
And make it and give it the

Ability to render one of three different components? Remember this dynamic component
here is already capable of rendering the catalog page or an individual product page,
and we absolutely could make this one component smarter. Another option is to create
a totally new Webpack entry that renders a new component. The benefit of that
approach is that it split the final JavaScript into two different files. The user
downloads one file for the catalog and product page

We've been working on and they will download an entirely different file when they get
to the `cart/checkout` page, instead of downloading one gigantic file that contains
all of that JavaScript. There are, there are other ways to optimize things and both
are valid ways to organize.

Let's create

A separate entry file here at the very least, so we can see how that looks so inside
of the `assets/pages/` directory, because that's where we're putting components that
render the entire main part of our page. Let's create a new file called `shopping-cart.vue`
paste in some contents, which are pretty boring
right now at a very basic layout for the page, a component that's empty and some
very, very basic CSS. Next, we need a new entry file that will be included on this
page or the catalog and individual product show page. We were using `products.js`.
The purpose of this file is to render all is to run all of the JavaScript for the new
cart page, which for us will mean rendering this one new component. So let's copy
`products.js`. We'll call it `shopping-cart.js`.

And inside of it, the only difference is that we will be loading the `shopping-cart`
component. Finally, we need to tell Encore about this new entry file. So open up the
`webpack.config.js` file, scroll down to the `addEntry` and let's copy the
products one and change this to `shopping-cart`

And then `shopping-cart`,

Because we just changed the webpack config file. We need to, it's a rare time that we
need to restart Encore. So I'll go over my browser, go to my first tab where I'm
running

Webpack and I'll hit control + C and I'll run it 

```terminal
yarn dev-server
```

Perfect. The result of this is that even though we can't see it in the `public/`
directory because of the dev server, we should have a new `shopping-cart.js`
file, which is going to contain the compiled version of this code, the code that
will execute our Vue application. So the last step is to update our new template, to
include the script and link tag for that. So this is in `cart.html.twig` this
is going to look a lot like our other template that renders our view app 
`product/index.html.twig` So I'm actually going to copy the contents of this file. I'll
close it and then paste it inside of `cart.html.twig`. Okay, let's see.
This has a `<div id="app">`, which is good because in our shopping cart entry, we are
rendering things into an app element. Um,

Uh, for the entry let's update

This to be `shopping-cart` inside both the style sheets and then all the way in
the bottom, the same thing for the JavaScript file. And so far, we don't need any
global variables. So I'm going to delete all those. And this is as simple of a
template as we get. It says, please render all the CSS and JS for the `shopping-cart`
point. All right. So let's try it.

I'll move over

Refresh and TBA. There is our view application. I'll even reopen my view dev tools
here so we can see it. So next, one of the things that this page has in common with
our product page is that both need access to the shopping cart and both will need the
ability to change items in the cart, because we're going to allow people to change
the quantity of items in this cart from the page. In fact, there are going to be a
bunch of things that those two pages share to tackle this. Let's talk about mix-ins,
which are Vue2's way of sharing code between components in Vue3 mixes
are replaced by the composition API, but both mixes and compositions

Are fundamentally have a lot in common.

