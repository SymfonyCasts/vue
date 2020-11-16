# Making the Title Component Less Smart

In the last tutorial, we created a `title` component, which we're reusing so that
we can have a consistent look thanks ti some styles on the bottom.

Cool! In `product-show.vue`, let's use this! Import  `TitleComponent` from
`@/components/title`. Add this into the `components` key, then up here, instead
of our manual `<h1>`, say `<title-component />`.

I'm purposely *not* passing a prop to this yet... and yes, I know it looks
strange - like "how will it know what title to render?". Ya see... there's a
*problem*.

Back at the browser, we're on a product page and it... seems to... kind of work.
It says "All Products". But more importantly, there's an error!

> Missing required prop `categories`.

We're apparently supposed to pass a `categories` `prop` to title... which is weird,
because I'm not sure what `categories` have to do with printing a title. We better
go check out that component. Ah... this component is *way* too smart: it
expects us to pass it the array of all `categories` and the `currentCategoryId`.
And then *it* does the logic to figure out if we're on a specific category page
and either prints that category name or "All Products". There's no way for us to
just pass in the *exact* text we want to render.

## Converting to a Dumb Component

What we need to do is convert `title` into a *dumb* component that does nothing
more than *receive* props and use them. This is really a mistake that I made in
the original tutorial. We've talked a few times about having dumb components that
just render markup and then smart components that do calculations & load data,
but *don't* render much markup. This is *not* an absolute rule... and I don't
always follow it - but it's a nice guide to keep things organized and reusable.

Ok: let's make this component less smart! Under `props`, we're only going to need
one: call it `text`. It will be a `String` and also required.

Then, in the template, instead of `categoryName`, just render `text`.

What about all the logic inside the `categoryName` computed prop? Copy this and
delete the entire `computed` section. Now open `assets/components/catalog.vue`.
This is the *one* place that currently renders the `title` component and *it*
is what should be responsible for determining its title text. Down in the component,
this doesn't have a `computed` section yet, so add one after `data` - `computed` -
and paste `categoryName`. Both `this.currentCategoryId` and `this.categories` are
available on this template, so this "should" just work.

Back up top, we can shorten `<title-component>` significantly: we only need to pass
`text` set to `categoryName`.

Let's make sure this still works. Back at the browser, click "All Products". The
title looks good! Try "Office Supplies" and... perfect!

Thanks to this, in `product-show`, we're free to pass *whatever* we want to the
title, like `:text="product.name"`.

I *love* that. And, of course, it works.

Next: let's bring this page to life with a *full* template and a cool, standalone
color selector.
