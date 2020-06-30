# Passing data From the Server to Vue

In our sidebar, we're looping over the categories and creating a link for each
one to `/category/` plus the category `id`. When we did this,
I said that this would link to a *future* page that we would create. Well...
guess what! If you click on `office supplies`, this... actually *works*! Well,
sort of: the URL changed but... it looks like it just loaded the same page.

Let me show you what's going on: I've done a little bit of work behind the
scenes. In `src/Controller/ProductController.php`, we have an `app_homepage` route
that renders a `product/index.html.twig` template. This is the page that we've
been using so far. Open `templates/product/index.html.twig` so we can see it.
Nothing special here: we have our target `div` for the Vue app, and the
`script` and `link` tags for our `products` Webpack entry.

Head back to the controller. Below this, we have *another* route called `app_category`.
That's why this page works! I've already created a route and controller for
`/category/{id}` that loads the *same* Twig template as our other page!

## About Multiple Page Applications

So here's the idea: we're purposely *not* building a single page application. Part
of the reason is that multi page applications are, in a lot of ways, *trickier*
to work with in Vue than single page apps. And also, it's *totally* legal to have
a traditional multi page application with Vue mixed in only where you need it.

In this app, we're going to have a homepage - which is basically the `All Products`
category - where you can click on any category to go to a *totally* different
page. That page will render the *same* Vue app, but only show products for *that*
category. And in a future tutorial, we're also going to create a "product page"
that will do the same thing: be a separate URL that's handled by the same Vue app.

So yes: our *one* Vue app will behave *differently* based on which page we're on.

To achieve that, when we're on a specific category page, our Vue code needs to
do two special things.

One: we're probably going to want to highlight *which* category we're on in
the sidebar so that the user knows that we're on the `office supplies` category
and not in `All Products`, for example.

And two: we're going to need to filter the product list because, right now, no
matter what category I click, I am *always* getting the same list of products.
We need to somehow *realize* that we are on a *category* page and then use that
information to make an API request for *only* products from that category.

## Server Variables

How can we do that? I have no idea! I'm kidding! In some ways, it's a simple
problem: the one piece of information that we need to know in our Vue code is
what category ID we are currently on. Are we on *no* category ID? Meaning: show
all products? Or are we on category ID 23?

To do that, we need to communicate this information from the server *to* Vue.
There are multiple ways to do this, but my favorite approach is to set a
global JavaScript variable in the template and then *read* that from inside of
our Vue app.

## Adding the Category @id to our Controller

Start by adding a second argument to the `showCategory()` action. Don't
worry, we're not going to go *too much* into Symfony and I'll explain what I'm doing
along the way. Add `IriConverterInterface $iriConverter` to get a service from
API Platform.

Remember: when you click on the `Catalog` component in the Vue Dev tools and look
at the `products` data, each item that we get back from our API - whether it's a
product, category or something else - has an `@id` property. That is known as the
IRI. I like to use this IRI string instead of the integer ID from the database
because it's more useful: it's a real, functional URL!

So on the category page, instead of setting a JavaScript variable that says we're
on category `23`, I'm going to use the IRI of that category. This `$iriConverter`
will help me get that.

Add a second argument to the template called `currentCategoryId` - in reality,
this is the "current category IRI" - set to `$iriConverter->getIriFromItem()` and
then pass the `$category` object.

## Printing JavaScript Values Directly in our Template

Obviously, we're going to use `currentCategoryId` in the template. But when we do
that, we need to be careful: there are *two* pages that render the *same*
template... and the `currentCategoryId` variable will only be available on *one*
of those pages, not both.

In `index.html.twig`, above where I'm rendering my `products` JavaScript, add a
`script` tag and say `{% if currentCategoryId is defined %}` with `{% else %}`
and `{% endif %}`. When the variable *is* defined, use it to set a global
JavaScript variable: `window.currentCategoryId =`, a set of quotes, and then
`{{ currentCategoryId }}`.

That's it! Oh, but in theory, if `currentCategoryId` contained a single quote, this
would break. To be *extra* safe, pipe this to `e('js')`.

That will escape the string so that it's always safe for JavaScript. In the `else`,
if no current category is set, that means we're on the homepage. Let's say
`window.currentCategoryId = null;`

The end result of this *long* journey is that when we refresh the page, view
the source and scroll down to where the JavaScript is... yes! We have
`window.currentCategoryId = '/api/categories/23'`. The back slashes are just escaping
the forward slashes.

Next, let's use this global variable in our Vue code to highlight which category
we're on in the sidebar.
