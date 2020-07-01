# Ajax Services

Head over to `sidebar.view`, where we're making our Ajax call. In Symfony, we
often isolate complex logic, or logic that we need to reuse, into services. One
of the *most* common places that we do that are in database queries. In Symfony,
we almost *always* have a repository class which holds all the database queries
for a specific table. I'd like to do the same thing with my front end code!
In this case, I'd like to isolate all of my Ajax requests for a specific resource
like `categories` or `products` into its own reusable JavaScript module, so
instead of making an Ajax call here, I'm going to move this into a central spot.

## Adding a Service!

"Services" in Symfony is really just a generic word for any class that does some
work for us, but in this context, I'm using it to mean something slightly
different. These services are typically API services, or anything that needs to
connect to some end point to get data. Anytime we have a new kind of API resource,
we want to create a new file inside of `/js/services`. Let's do this!

Create one called `categories-service.js`. The `-service` on the end is totally
redundant. I could just call it `categories.js`, it can be either way. In the
`services` directory we already had one file called `page-context`. This has
nothing to do with Ajax calls or APIs but it is something that returns data, so
that's why I put this there. In this case, this service just relays a global
variable that was printed in the template, but imagine if it were to collect this
data, say, from the database. Suddenly, it would become a proper Ajax service. So
even if there is no Ajax there, it is *still* a service.

In `categories-service.js` export a function called `fetchCategories()`. Inside
that function, simply copy that Axios line over at `sidebar` and paste it there
-notice that PHPStorm imported `axios` for me, I'm just going to change that to
single quotes. Here, I'm just going to return `axios.get()`.

This is a really, *really* simple one, but at least it's centralizing that URL so
we don't have it all over the place. I'm going to add a little documentation
above this, this does return a Promise, but I won't put any description in there
because it's already pretty obvious. There we go!

***TIP
Actually this bit of info is not necessary since PHPStorm can already tell that
we are returning a Promise
***

## Use it from `sidebar.vue`

Now in `sidebar.vue` we can use this! First, we need to import that service. 
`import {} from '@/services/categories-service'`. Then inside of the curly braces
we can grab `fetchCategories`. Okay! Now in `created`, life gets *much*
easier! It's `const response =`, I'll keep that `await` there because I just
want to wait for this to finish, `getCategories()`. That's it!

Up here, just to clean up, we're not using axios directly in this component at
all anymore. Sweet!

## Create the Products Service

The *other* place where we're making Ajax calls right now is in `catalog.vue`.
In there, where we're making our API requests for products. This one is a
*little bit* more complicated because if we have a category, we need to pass a
category query parameter. Since this is a different API resource, let's go
over here to `services` and create a new file called `products-service.js`.

Start the same way: `export function fetchProducts()`. Some times we *will* have
a category requirement, so we'll add a `categoryIri` parameter here. I've been
calling it `categoryId`, but in reality, this *is* the IRI, so I'll call it
`categoryIri` in the service to keep it real.

Go to `catalog.vue`, copy the params code and paste it in the service function.
Let's also copy the response line and paste these into here... let's see... we're
going to return `axios.get()`. Finally, for the prams, it's not
`this.currentCategoryId` but `categoryIri`. `if (categoryIri)` then
`prams.category = categoryIri`, and I need to fix my import code to use single
quotes on axios.

We can also do a little bit of documentation in here. So the `categoryIri` is
going to be a string or `null`. Then I'll just say that this is returning a
promise. This is looking *good* and we've isolated some nice logic in here!

## Use the Service in `catalog.vue`

Go back to `catalog.vue`, just like in `sidebar`, we're going to use service! 
`import {} from '@/services/product-service'`, and we'll import the
`fetchProducts` function. Down here in `created`, we don't need *any* of this
params stuff anymore, and in the axios call we can simply say
`response = await fetchProducts()`, and then pass `this.currentCategoryId` to
the service. That is *really* nice, cause that's exactly how I want my component
logic to look on `created()`! I set the `loading` state, I call `fetchProducts()`,
passing it any options I have and that's it! I *don't* have to talk about
anything more complicated than that.
 
To clean this up again, let's go and remove that `axios` import. Phew!

## Try it out!

Okay, let's just make sure that *everything* works! Do a full page refresh to
make sure... Yay! Everything loads over here at products, the sidebar, and the
different category pages also work! That is *very* nice.

## Return Types for Services

Just as a side note: in services like `product-services`, when we returned this
Promise here, we are returning a Promise that resolves to the full response of the
Ajax call. When we use it an `await` or with a normal `.then()` hook, what that
ultimately means is that down here we have to say things like `response.data`,
and then get the `hydro:member` key off that.

But if you want to, you can actually go a little bit further here in the service
and add `.then((response) => response.data)`. That *might* look a little funny
to you, but what happened here is that this *still* returns a Promise, but instead
of returning the full Ajax response it's actually returning `data`. For example,
*this* would actually work now -of course, I would need to change this `data`
up here.

I'm actually going to completely undo all of that. My point is simply that right
now, we are returning a promise that resolves to the actual full response, but you
can make yours resolve to something smaller. It makes it a *little bit* easier to
use, but the problem is that if we ever needed to call this function and read
like a header off of the response, then we can't do that! That's why I typically
keep it very simple. By returning a promise that actually resolves to the whole
response, I have more work to do before I can use it, but I also have more options.

Let's refresh one more time, make sure it didn't break anything! It looks good!

Next, hmm... I don't mind some of the loading on this page, but the categories
over here in the sidebar are starting to *get on my nerves*! It really makes the
page look incomplete while it loads because the categories *should* be part of
the *initial* page structure. We can fix that! We're actually going to start
passing the categories from the server *directly* into Vue!
