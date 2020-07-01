# AJAX Services

Head over to `sidebar.view` where we're making the categories AJAX call. In
Symfony, we often isolate complex logic - or logic that we need to reuse - into
services. One of the *most* common places that we do that are for database queries:
we almost *always* have a *repository* class that holds all the database queries
for a specific table.

It's optional, but I'd like to do the same thing with my frontend code! I'd like
to isolate all of my AJAX requests for a specific *resource* -  like categories
or products - into its own, reusable JavaScript module. Then, instead of having
AJAX calls inside my components, all that logic will be centralized.

## Adding a Service!

In Symfony, "Services" is kind of a generic word for any class that does work.
But in this context, I'm using "services" to mean something slightly
different. These "services" are typically *API* services... or, really, any
code that loads data - whether that's via an AJAX call, local storage or reading
global variables we set in Twig.

Inside of `js/services/`, create a new file called `categories-service.js`.
The `-service` on the end is *totally* redundant, since we're in a `services`
directory, but it keeps my filename more descriptive.

The `services/` directory already holds one file called `page-context`. This has
*nothing* to do with AJAX calls or APIs but it *is* something that returns data,
which is why I put it there. Right now it reads a global variable, but if we
later decided to load this via AJAX, it would *still* be a service.

In `categories-service.js` export a function called `fetchCategories()`. For
the logic, copy the `axios` line from `sidebar`... and paste it here. PhpStorm
helpfully imported `axios` *for* me... but I'll tweak the quotes. Back in the
function, return `axios.get()`.

This is a really, *really* simple AJAX call, but at *least* we're centralizing the
URL so that we don't have it all over the place. Let's be good programmers and
add some documentation above this: it returns a `Promise`... which, actually,
PhpStorm already knew without us saying anything.

But I won't add a description because the function name already describes this
pretty well.

## Use it from `sidebar.vue`

Now in `sidebar.vue`, let's use this! First, import the service:
`import {} from '@/services/categories-service'`. Then, inside the curly braces,
grab `fetchCategories`.

Next, in `created`, life gets *much* simpler: `const response =` - keep the `await`
because we *still* want to wait for the function to finish - then `fetchCategories()`.

I *love* this! And to clean up, since we're not using `axios` directly in this
component, we can remove the import.

## Create the Products Service

The *other* place where we're making an AJAX call is in `catalog.vue` to fetch
the products. This one is a *little bit* more complex because *if* we have a
category, we need to pass a `category` query parameter.

Since this AJAX call is for a different API resource, inside the `services/`
directory, let's create a new file called `products-service.js`.

Start the same way: `export function fetchProducts()`. Sometimes we *will* have
a category, so add a `categoryIri` parameter.

I've been calling it `categoryId`, but in reality, this *is* the IRI, so I'll
give it the proper name here.

For the logic, go back to `catalog.vue`, copy the `params` code... and paste it
here. Let's also copy the response line, paste these here too and return
`axios.get()`.

Finally, for the `params`, it's not `this.currentCategoryId` but `categoryIri`.
So `if (categoryIri)` then `params.category = categoryIri`.

And... I need to fix my import code to use single quotes on `axios`.

Before we use this, let's add some docs: the `categoryIri` will be a `string` or
`null` and this will return a Promise.

This looks great!

## Use the Service in `catalog.vue`

Let's put this to use in `catalog.vue`. Like before, start by importing it:
`import {} from '@/services/product-service'` and then bring in the
`fetchProducts` function.

Now, down in `created()`, we don't need *any* of the `params` logic anymore.
And the `response` line now can just be
`response = await fetchProducts(this.currentCategoryId)`.

That is *super* nice: the `created()` function reads like a story: set the
`loading` to true, call `fetchProducts()`, then set the loading state to false.

To finish the cleanup, go remove the unused `axios` import.

Phew! We just made a lot of changes so... let's make sure we didn't break
anything. Do a full page refresh to be sure and... yea! Everything loads.
The products and sidebar are working on every page.

## Return Types for Services

Before we keep going, I want to mention a design decision that I made. In a
service like `product-services`, we are returning the `Promise` from Axios.
That means that when we use `await` or chain a normal `.then()`, what we will
ultimately receive is the response... which we can then use to say things like
`response.data`.

But if you want, you *coulld* go a bit further in the service and add
`.then((response) => response.data)`.

By doing this, our function *still* returns a Promise. But instead of the
payload of the promise being the full AJAX response, it will be the JSON data.
To make the code work in `catalog`, we would set the function directly to the
`data` variable.

That makes the function a *bit* nicer to use. But... I'm going to completely undo
all of that. Why? Changing the function to directly give you the JSON data
is nice. The *problem* would be if you ever needed any data directly from the
response, like a header. If we only returned the data, reading a header wouldn't
be possible.

That's why I typically keep my functions simple and return the Promise that
resolves to the entire Response. I need to do more work in my component, but
it's also more flexible.

Refresh one more time to make sure nothing broke! It looks good!

Next, hmm... I don't mind some of the loading on this page, but the categories
in the sidebar are starting to get on my nerves! It makes the
page look incomplete while it loads because the categories *feel* like part of
the *initial* page structure. We can fix that by passing the categories from the
server *directly* into Vue!
