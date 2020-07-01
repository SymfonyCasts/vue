# Skipping AJAX: Sending data Straight to Vue

With *both* the categories and products loading dynamically, our app is starting
to get really exciting! But there's a part of the user experience that I'm *not*
super happy about: there are a lot of things loading!

## The "too much loading" Problem

When we get to a page, it's probably okay for some things to load a moment later.
But right now, the page basically looks empty at first. The categories form part
of the page layout - and it's a bit jarring when those aren't there.

And... it could get worse! What if we wanted to include the current category
name in the page title... or as the h1 on the page! In that case, *both* of those
would be missing on load! And if we started to render info about the authenticated
user in Vue - like a user bar, if we load that data via AJAX, then we would need
to hide that bar at first and *then* show it.

The point is: too much loading can be a big problem. *Some* loading is probably
ok, but when parts of your layout aren't there immediately, it starts to look
funny.

We're already making a request to the server each time we visit a category. And
when we do that, our server is *already* primed to make fast database queries.
So, in theory, we should be able to fetch data - like for the categories or user
information - *during* that page load and avoid the slow AJAX request.

In general, there are two solutions to this problem of "too much loading". The
first is called server-side rendering where you render the Vue app on your *server*,
get the HTML, and deliver that on the initial page load.

That's a great solution. But it's also a bit complex because you need to install
and execute Node on your server.

## Passing the Categories from the Server to Vue

The second option, which is a lot simpler and almost as fast, is to pass the *data*
from our server into Vue. Literally, in the controller, we're going to load all the
categories, pass them into Twig and set them on a variable that we can read in
JavaScript. That will make the data *instantly* available: no AJAX call needed!

Ok, let's do this! Remember: the controller for this page is
`src/Controller/ProductController.php`. And actually, there are *two*
controllers:  `index()` - which is the homepage - `showCategory()`  for an
individual category.

So if we're going to pass the categories to Vue, we'll need to pass it into the
template for *both* pages.

Start in `index()`: autowire a service called `CategoryRepository $categoryRepository`.
Now, add a second argument to Twig so that we can pass in a new variable called
`categories` set to `$categoryRepository->findAll()` to query for *all* the
categories.

Do the same thing down in `showCategory()`: add the
`CategoryRepository $categoryRepository` argument, go steal the `categories`
variable... and paste it here.

Woo! We now have a `categories` variable available in the Twig template.

## Serializing to JSON in the Template

Open it up: `templates/product/index.html.twig`. We're already setting a
`window.currentCategoryId` global variable to an IRI string. But this situation
is a bit more interesting: the `categories` variable is an array of `Category`
*objects*. And what we *really* want to do is transform those into JSON.

Check it out: go to `/api/categories.jsonld`. That's an quick way to see what
the API response for categories looks like. So. if we're going to send categories
data from the server instead of making an AJAX call, that data should, ideally,
look *exactly* like this.

This means that, in our Symfony app, we somehow need to serialize these `Category`
objects into the JSON-LD format.

Open the `src/Twig` directory to find a shiny file called `SerializerExtension`.
I created this file, which adds a filter to Twig called `jsonld`. By using this,
we can serialize *anything* into that format.

Awesome! Back in the template, add `window.categories` set to
`{{ categories|jsonld }}`.

Let's go see what this look like! Find your browser, refresh and view the page
source. Near the bottom... there it is! It's has the *same* JSON-LD format as the
API! In the console, try to access it: `window.categories`. Yes! Here are the four
categories with the normal `@context`, `@id` and `@type`.

Well, *technically* this is a *little* bit different than the format that's returned
by the API. Go back to `/api/categories.jsonld`. In the true API response, the
array is *actually* under a key called `hydra:member`. And if this were a long
collection with pagination, it would have extra keys to help navigate the pages.

The JSON we're printing is *really* just the stuff inside `hdyra:member`. Most
of the time, you won't need the other data, so this will work fine.

But if you *did* need *all* of the data, you can pass a 3rd argument to
`serialize()` - an array - with a `resource_class` class set to whatever class
you're serializing, like `Category::class`. *That* would give you more structure.
If you need pagination info, that's also possible. Let us know in the comments if
you need that.

But for us this data is going to be *perfect*, because all we need are the
categories. Next, let's use this data in our Vue app! When we do, suddenly,
our service function will *change* to be synchronous. But we can hide that
fact from the rest of our code by leveraging a Promise directly.
