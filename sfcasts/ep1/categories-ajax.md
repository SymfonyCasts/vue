# Dynamic Categories via AJAX

I've gotta say, now that we have dynamic products, these hardcoded categories
are starting to *stress me out*! So let's make those dynamic too!

If you look at `/api`, just like how we have a `/api/products` endpoint for the
collection of products, we also have one for `/api/categories`. We can use that!
And now that we know the correct way to make Ajax calls to load data, this
"should" be simple! Famous last words!

## Add an Ajax Call to Sidebar  

Open `sidebar.vue`. We created a `data` property earlier called `categories`, but...
it's just hardcoded. Set this to an empty array to start. 

[[[ code('2dd59a3202') ]]]

To make the AJAX call, head over to `catalog.vue` to celebrate one of programming's 
oldest arts: stealing code. Copy the entire `created()` function and paste it in 
`sidebar.vue` under `data`. We just need to change the URL to `/api/categories` and 
the data from `this.products` to `this.categories`.

[[[ code('6536938ca6') ]]]

Awesome! Let's... just see what happens! Refresh... whoa! I think it worked!
No errors in the console... and in the dev tools, if you click on `Sidebar`, we
have real `categories` data!

The data for each category is pretty simple: it has the normal `@id` and `@type`
that comes from JSON-LD and it also has `id` and `name`.

Oh, and one thing I forgot to mention: when we pasted the `created()` function,
PhpStorm *automatically* added the `axios` import for us. Sweet! Oh, but it
used double quotes... which ESLint does *not* like. Let's fix this. Much better!
If you want, you can tweak your PhpStorm settings to use single quotes automatically.

## v-for index and :key

Anyways, head up to the `v-for` directive. We learned earlier that every `v-for`
element must have a `key` attribute. Until now, since our categories were
hardcoded, we used the array `index` for the `:key`. But now we can be *smarter*
because we know that each category has a unique `@id` property.

Let's simplify the `v-for` - we don't need `index` anymore - and then say
`:key="category['@id']"`.

[[[ code('02d04b0a22') ]]]

## Linking Properly

The last thing that doesn't work is... our links! We originally set the `href` to
`category.link`... but there is *no* `link` property on the real category data.

Here's the plan: we will eventually create a separate page that will display
all of the products for a specific category - the URL will be `/categories/` and
then the `id` of the category. We'll worry about making sure that page exists later,
but let's get the links working now.

If you're a Symfony user, then you're used to *generating* a URL to a route. But
from JavaScript, I'm going to keep it simple and hardcode the URL to this new page.
I think it's *totally* ok to do this: it keeps your JavaScript simpler. The tradeoff,
of course, is that if you ever changed a URL, you would need to update your JavaScript.

Ok: what we want to do here is say `/category/` and then print
`category.id`. But since we have the colon in front of `href` to make this dynamic,
we would need to have single quotes around the string, a plus sign and then
`category.id`.

That *would* work: in the browser, when I hover over categories, the right URL
*is* display at the bottom of my browser.

## JavaScript Dynamic Strings

But yikes! This code *hurts* to look at! Can we make it nicer? Of course!
Replace the quotes with `ticks`. *Now*, if we need dynamic code, write
`${}` - so `${category.id}`.

[[[ code('cd6fedcd2a') ]]]

This is a superpower of modern JavaScript, not Vue. Look over now and... yes! All
of the links look *perfect*!

## Too much Dynamic Data!

This is working nicely! We have dynamic products and dynamic categories. The
*only* thing that bothers me is all the loading! Notice that each time we refresh,
I see the products *and* categories loading!

When we only loaded the products, that was probably okay: it was just one spot that
loaded pretty fast. But *also* having the categories waiting to load is starting to
look a bit jarring. Plus, we're eventually going to have multiple pages that will
use the same categories sidebar. This means that on *every* page, the user will wait
for the *same* list of categories to be fetched via AJAX. We can do better!

So next, let's investigate how we can get data from the server in a way that
*avoids* an AJAX call. We'll use this at *first* to highlight the current category
on the sidebar. Then later, we'll replace the AJAX call completely.
