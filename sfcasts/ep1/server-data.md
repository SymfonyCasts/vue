# Skipping AJAX: Sending JSON Straight to Vue

With *both* the categories and products loading dynamically, our app is starting
to get really exciting! But there's a part of the user experience that I'm *not*
happy about: there are a lot of things loading!

## The "too much loading" Problem

When we get to a page, it's probably okay for some things to load.
But right now, the page basically looks empty at first. The categories form part
of the page layout... and it's a bit jarring when the sidebar is empty.

And... it could get worse! What if we wanted to include the current category
name in the page title... or as the h1 on the page! In that case, *both* of those
would be missing on load! And if we started to render info about the authenticated
user in Vue - like a user menu, if we loaded that data via AJAX, then we would
need to hide that menu at first and *then* show it.

The point is: too much loading can be a big problem.

What's the solution? Well, we're already making a request to the server each time
we visit a category. When we do that, our server is *already* primed to make
fast database queries. So, in theory, we should be able to fetch data - like for
the categories or user information - *during* that page load and avoid the slow
AJAX request.

In general, there are two solutions to this problem of "too much loading". The
first is called server-side rendering where you render the Vue app on your *server*,
get the HTML and deliver that on the initial page load.

That's a great solution. But it's also a bit complex because you need to install
and execute Node on your server.

## Passing the Categories from the Server to Vue

The second option, which is a lot simpler and almost as fast, is to pass the *data*
from our server into Vue. Literally, in the controller, we're going to load all the
categories, pass them into Twig and set them on a variable that we can read in
JavaScript. That will make the data *instantly* available: no AJAX call needed!

Ok, let's do this! Remember: the controller for this page is
`src/Controller/ProductController.php`. And actually, there are *two*
controllers:  `index()` - which is the homepage - and `showCategory()` for an
individual category.

So if we're going to pass the categories to Vue, we'll need to pass it into the
template for *both* pages.

Start in `index()`: autowire a service called `CategoryRepository $categoryRepository`.
Now, add a second argument to Twig so that we can pass in a new variable called
`categories` set to `$categoryRepository->findAll()`.

[[[ code('a7ed01bb3c') ]]]

That will query for *all* the categories.

Do the same thing down in `showCategory()`: add the
`CategoryRepository $categoryRepository` argument, go steal the `categories`
variable... and paste it here.

[[[ code('37d3d70951') ]]]

Woo! We now have a `categories` variable available in the Twig template.

## Serializing to JSON in the Template

Open it up: `templates/product/index.html.twig`. We're already setting a
`window.currentCategoryId` global variable to an IRI *string*. But this situation
is more interesting: the `categories` variable is an array of `Category`
*objects*. And what we *really* want to do is transform those into JSON.

Go to `/api/categories.jsonld`: that's a quick way to see what
the API response for categories looks like. So if we're going to send categories
data from the server instead of making an AJAX call, that data should, ideally,
look *exactly* like this.

This means that, in our Symfony app, we somehow need to serialize these `Category`
objects into the JSON-LD format.

Open the `src/Twig/` directory to find a shiny class called `SerializerExtension`.
I created this file, which adds a filter to Twig called `jsonld`. By using it,
we can serialize *anything* into that format.

[[[ code('3b86db141a') ]]]

Awesome! Back in the template, add `window.categories` set to
`{{ categories|jsonld }}`.

[[[ code('073e762c57') ]]]

Let's go see what that look like! Find your browser, refresh and view the page
source. Near the bottom... there it is! It's has the *same* JSON-LD format as the
API! In the console, try to access it: `window.categories`. Yes! Here are the four
categories with the normal `@context`, `@id` and `@type`.

Well, *technically* this is a *little* bit different than what the API returns.
Go back to `/api/categories.jsonld`. In the true API response, the array is
*actually* under a key called `hydra:member`. And if this were a long collection
with pagination, the JSON would have extra keys with information about how to get
the rest of the results.

The JSON we're printing is *really* just the stuff inside `hydra:member`. But most
of the time, this is all you really need.

But if you *did* need *all* of the data, you could pass a 3rd argument to
`serialize()` - an array - with a `resource_class` option set to whatever class
you're serializing, like `Category::class`. *That* would give you more structure.
If you need pagination info, that's also possible. Let us know in the comments if
you need that.

But for us this data is going to be *perfect*, because all we need are the
categories. Next, let's use this data in our Vue app to avoid the AJAX call!
When we do, suddenly, our AJAX service function will *change* to be synchronous.
But by leveraging a Promise directly, we can *hide* that fact from the rest of
our code.
