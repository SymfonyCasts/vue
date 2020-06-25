# Filter Products

All right! So we've got the `currentCategoryId` and we're using it on the sidebar to
highlight which page we're on. That is *awesome*! But our products on the right
don't filter it all yet, yikes! Fortunately, in our API platform set up -I'll go to
`/api`- I've already done a little bit of work behind the scenes with API platform
itself that allows me to fetch the products from a specific category. For example,
if we look at this URL, I can search for the `products` API endpoint and add
`/api/categories/24` here (Remember, that's the IRI of the category) and when I
execute, it's only going to return to me those items that are actually in there.
So you can see this returns 5 items this time. Our life is going to be *pretty* easy!

## Pass on currentCategoryId to Catalog

Let's look at our application here. From our top level `products.vue` I'll 
command+click in `<catalog />` to jump into the component `/catalog`, this is
actually what's responsible for loading our products on `created` by making the
request to `/api/products`. I *whish* we had access to the `currentCategoryId`
right here! We could just use it to change the URL! So let's do that!

In `products.vue`, type `:current-categoryId="currentCategoryId"` to pass it as a
prop, just like we did with the Sidebar.

Then, in `catalog.vue` we'll add that as a prop. I'm actually going to go steal
that prop from sidebar because we already had it set up perfectly as a string and
default to `null`, which makes it `nullable`.

## Using currentCategoryId

Okay, Perfect! So we are now receiving that `currentCategoryId`. Now, down here in
`created` I *could* actually add the question mark and `category=` here in the
url string, but with Axios, there is a *better* way. We can actually set up a
`params` object, which is going to hold all the query parameters that we want, and
we say, `if (this.currentCategoryId) {`, then
`params.currentCategoryId = this.currentCategoryId`.

To pass that into axios, add a second parameter, which is an options object. One of
the options you can pass is called `params`. Type `params: params,`. That should be
*all* we need! Yay! But wait! ESLint is *angry* at us again! It says expected
property shorthand. This is something we've actually done already many times,
I *just* wanted to point it out here. In JavaScript, if you have a key that's the
same name as the variable used for its value, you can use a shorthand syntax and
omit it! This is equivalent to say that `params` here is equal to the `params`
object defined earlier!

## Check it out!

If we go over now, you can already see it! It reloaded! Yes! Breakroom, Furniture,
office supplies. Perfect! And if we go to Snacks, Oh! We see a *problem*.
What's going on here? It turns out our snacks category is currently empty! And
instead of actually telling us it's empty, we just get the loading screen forever.

That's because when our catalog renders our `productlist` -I'll hold `command` to
open that up- the loading is showing based on whether the products' length is zero
or not. We *need* to improve this! We should actually *know* whether or not the Ajax
call has finished!
 
Let's make a *smarter* loading mechanism next..!
