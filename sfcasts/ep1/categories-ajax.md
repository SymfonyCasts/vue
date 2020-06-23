# Categories Ajax

I've gotta say, now that we have all of these dynamic products, these hard coded
categories over here are starting to *stress me out*! So let's make these dynamic as
well!

If you look at our `/api`, just like how we have a `/api/products` end point for the
collection of products, we have one for `/api/categories`. Perfect! We can use that!
And now that we know the correct way to make the Ajax calls and load data, this is
going to be super simple!
 
## Add an Ajax call to Sidebar  
 
Open `sidebar.vue`. We did create earlier a data property called `categories`, but
it's just hard coded! Now we need to load this with real data. I'll set this to an
empty array to start, and then we'll get *really* sneaky! We can actually go over to
`catalog.vue` and steal a bit of code that will *almost* work for our sidebar!
Copying and pasting is always good!

Copy that entire function and paste it over here under `data`. Almost nothing needs to
change! We're changing the URL to `/api/categories` and the data down here from
`products` to `this.categories`. Awesome!

Let's just see what happens! Refresh... Whoa! It looks like it works! Look in the
console here... Yeah, everything looks happy! So if you look at the sidebar here in
the DevTools, we can see our categories. The category data actually is pretty simple.
It has the normal `@id` and `@type` that comes from the JSON-LD and then it has `id`
and `name`.

Oh, and actually one thing I forgot to mention is that, when we pasted this code 
down here, `PHPStorm` saw that and *automatically* added the Axios import for us.
It only did it in a boring double quotes way and ESLink does *not* like that!
Let's fix this... Much better!

## v-for index and :key

Anyways, if you go back up to our `v-for`, we learned earlier that every `v-for`
element has to have a key. Up until now, since our categories data was hard coded,
we just used the `index` to pass on to our `:key`. But now we can be *smarter* because
we know that we can actually use the `@id` property instead from each of these
categories.

So we'll simplify our `v-for` and then we'll say `:key="category['@id']"`. Now we have
real ids as keys for our items!

## Linking properly

The last thing that doesn't work is our links! In our data before, we had a hardcoded
`category.link`, but now there is no `link` property in here! Our category pages are
*nowhere* to be found!

But let's not panic! Eventually, we will have a real page that will display all of the
products for a specific category and the URL to that page is going to look something
like `/categories/` and then the `id` of the category. We don't actually have that
page exactly working yet, but I'm going to get *a bit* ahead of myself and update the
URL here to do that.

Because we're Symfony users, we're used to generating URLs to routes, but this time,
I'm going to keep things simple! I think it's actually okay to hardcode your URLs to
different pages inside of your JavaScript. You just have to make the concession that
if you ever change those URLs in your site, you know that you might be breaking
those pages, so you might need to update your code.

What we want to do here is to say `/category/` and then we want the dynamic
`category.id`. But of course, since I have the colon in front of the `href` to make
this dynamic, I would need to have a single quotes around here. Then we can add a
plus sign and say `category.id`, like that. That *would* actually work.
If you look over here, you can see when I hover over categories, I see the right
kind of URL showing at the bottom of my browser!

## Javascript dynamic strings

But my eyes are *hurting* from looking at this ugly code! Can we make this look a 
little bit nicer? Thanks to modern JavaScript, we can! Let's replace the quotes with
`ticks` instead! Let's remove the quotes and add a tick in the end...

As soon as you use the tick symbol you can add dynamic expressions as part of the
string, just like with `PHP`'s double quoted strings! We can just do `${category.id}`
and JavaScript will interpret this dynamically.

This now looks so much nicer! Becuase, remember, as soon as we make this `:href`,
it means that what's inside the attribute is JavaScript and *this* is valid
JavaScript. 

Look over now, yes, all of those links look *perfect*!

## Too much dynamic data!

This is actually looking really good. We have dynamic products and dynamic categories.
The *only* thing that bothers me is all the loading! Notice that when I load the page
each time, I see the products loading *and* the categories loading as well!

When we only loaded the products, that was okay because the products loaded pretty
fast. Having the categories waiting to load on the other hand is now starting to look
a little bit jarring. Think of the amount of time users will have to wait until they
can click on another category! This *ought* to be stalling our sales!

So next, let's load our categories in a *different* way, a way where we can actually
get them to render on the screen *immediately* so that we're not waiting for them to
load over an Ajax call!
