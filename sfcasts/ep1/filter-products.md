# Filtering the Products

Ok team! We have the `currentCategoryId` and we're using it on the sidebar to
highlight which page we're on. That is *awesome*! But our products on the right
aren't filtering at all yet! Yikes!

Go to `/api` to check out our API docs and scroll down to the `GET /api/products`
endpoint. I've already done a bit of work behind the scenes in API platform to
allow us to fetch the products for a specific category.

For example, to find the products for a specific category, we can enter that
category's IRI into this box: so, `/api/categories/` - and then 24 to get the
Furniture category. When we hit Execute... yes! It only returned 5 items!
And if I scroll up, you can see the URL that returned this result: if you
ignore the url-encoded parts, this is `/api/products?category=/api/categories/24`.

All *we* need to do is make that same request from inside of Vue!

## Passing currentCategoryId as a Prop

Head back to our app. From the top level `products.vue`, hold Cmd or Ctrl and
click `<catalog />` to jump into that component. This component is responsible
for loading our products on `created` by making a request to `/api/products`. Hmm...
I *wish* we had access to the `currentCategoryId` right here...  we could use
it to change the AJAX call. Let's go pass it in!

Back in `products.vue`, add `:current-category-id="currentCategoryId"` to pass it
as a prop,... *just* like we did with the sidebar.

Now, in `catalog.vue`, add that as a prop. Actually, let's go steal that prop from
sidebar - it's perfect there - and paste it here.

## Using currentCategoryId to Filter on the AJAX call

Perfecto! We are *now* receiving `currentCategoryId`. To use this, down in
`created` we *could* add `?category=` and then the currentCategoryId. But with
Axios, there's a *better* way. Create a new `params` variable set to an object:
this will all the query parameters that we need to send. Now,
`if (this.currentCategoryId) {`, then
`params.currentCategoryId = this.currentCategoryId`.

To pass that to axios, add a second parameter, which is an options object. One of
the options you can pass is called `params`. So: `params: params,`.

## Object Shorthand: Keys without the Key

That *should* work... but yikes! ESLint is *angry*! It says:

> expected property shorthand.

This is talking about something that we've actually already done many times, but
I wanted to highlight it in case you haven't noticed. In JavaScript, if you are
trying to add a property to an object and that property's name is the same as the
variable being used for its value, you can use a shorthand syntax: just `params`.
This sets a property named `params` to the `params` variable.

## Check it out!

If we go over now, you can already see it! It reloaded! Yes! Furniture show furniture!
Breakroom shows breakroom products! Office supplies shows office supplies! And
Snacks shows... uh... did this just break? What's going on here?

It turns out that our snacks category is currently empty! Gasp! If that's not
bad enough, instead of saying "No snacks!", we see the loading screen forever.

That's my fault. When `catalog` renders `product-list` - hold Command or Ctrl and
click to jump to that - the loading is showing based on whether the `products`
length is zero or not. An empty category looks like it's still loading!

We *need* to improve this: we need to *truly* know whether or not the AJAX call
has finished! Let's make a *smarter* loading mechanism next!
