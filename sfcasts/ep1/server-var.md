# Server Vars

When we dynamically loaded the categories in our sidebar, we looped over them
and created a link to `/category/` and the `id` of each item. I said back then
that those were going to be in a future page that we would create. Well...
Guess what: if you click on `office supplies`, that actually *works*! We can see
the URL changed up here and it looks like it just completely reloaded the same page.

So let me show you what's going on here. I've done a little bit of work behind the
scenes. In `src/controller/ProductController.php`, remember we have this 
`app_homepage` route in here that just references this twig template that is in
`product/index.html.twig`. This is what we've been using. I'm gonna open `templates`,
`products` `index.html.twig` so you can see it. Nothing special here, we have our
target `div` for the `vue` app, and the `JavaScript` and `css` tags for our products
page.

Going back to the controller, below this, we have another route called `app_category`.
That's why that page works! I've already created a route and controller for
`/category/{id}` that loads just the *same* twig template as our previous route!

## About Multiple Page Applications

So here's the idea. We're purposely not building a single page application in part
because multiple page applications are in a lot of ways trickier to work with
in `Vue`. We're also in a Symfony App, which leverages the use of multiple routes
to different pages. In this context our `Vue` application is going to run on
several URLs.

We're going to have a homepage, which is basically the `All Products` category and
then you can click on any of the individual categories to get to that particular
list of products. Even later, we're going to allow you to click here to visit a 
specific product and that is *also* going to be handled by our same `Vue`
application. Our *same one* `Vue` application is going to behave differently based
on what page we're on.

In order to achieve that, when we're on an actual category page, we need to do
two things:
 
1) We're probably going to want to highlight which category we're on over here
in the sidebar menu so that the user actually knows that we're on the
`office supplies` category and not in teh `All Products` for example.

2) We are going to need to filter the product list because right now, no matter what
category I click on, I am *always* getting the same list of products. So we need to
realize that we are on a category page and then read that information to make a
proper API request for the correct set of products.

Basically we want to use the *same* view app and have it show something different
depending on some configuration that we pass to it.

## Server Variables

Here's what we're gonna do: The one piece of information we need to know right now
in our `Vue` application is what category ID we are currently on. Are we on *no*
category ID, meaning show all products, or are we on category ID 23?

To do that effectively, we need to communicate this information from the server,
since the server knows what category we're currently working with.

While there are multiple ways to do this, we're going for a very simple but
optimized approach. We're simply going to be setting a global JavaScript variable
right in the template and then read that inside of our application.

## Adding the Category @id to our controller
 
First, I'm going to add a second argument to my `showCategory` action. Now, don't
worry, we're not going to go *too much* into `Symfony`, I'll explain what I'm doing
along the way. Let's add an auto-wired service of the type
`IriConverterInterface` and call it `$iriConverter`.

Remember when you clicked on the catalog and look at our products data, every
single item we get back from our API had an `@id` property. That is known as the
`IRI`. I always like to use this `IRI` string instead of just the integer `ID`
from the database because it's more useful. So inside of the category pages,
instead of setting a JavaScript variable that says we're on category `23`, I'm
actually gonna use the `IRI` of that category. It's this `IRI` converter
that helps me get that.

Next, I'm going to add a second argument to our template and I'm going to
pass in a new variable called `currentCategoryId`. In reality, this is "current
category `IRI`" `=$iriConverter->getIriFromItem()` and then we can pass it the
`$category` entity object. We're going to use this inside of the template!

## Printing JavaScript values directly in our template

We need to be careful here because there are two pages that are rendering the same
template and there's only going to be a `currentCategoryId` in *one* case, not in both
cases. In `index.html.twig` above where I'm rendering my products' JavaScript, I'll
add a `script` tag and say `{% if currentCategoryId is defined %}`. I'll add an
`{% else %}` and `{% endif %}` that we'll worry about in a second.

In here we're going to set a global variable: `window.currentCategoryId=` and then
just print `currentCategoryId` inside of JavaScript. So `{{ currentCategoryId }}`.
This isn't going to be a problem here, but technically if this `currentCategoryId`
were a string with a quote in it, it would actually break because we're inside quotes.
So to fix that, we're going to pipe it to `e('js')` which will escape that string
*within* the JavaScript context so that no matter what it says, it will work inside
the string.

In our `else` block, if no current category is set, that means we're on the homepage
so I'm going to say `window.currentCategoryId=null;`

The end result of this long journey is that when we refresh the page and we view
the source, if you scroll down where JavaScript is, you can see 
`window.currentCategoryId='/API/categories/23'`. The back slashes are just escaping
these forward slashes in here.

## Use it inside Vue

So how will we use this inside of our `Vue` application? The first thing I want to
accomplish is I want to highlight which one of these categories is currently selected.

Go to `sidebar.vue`. We need to know what the current category Id is. The simplest
way to do this is just to reference the global variable. We created a global variable
in twig so we can just reference that global variable inside of here,
but we can't just reference global variables inside of our template because `Vue`
will treat those as members of its instance.

What I *really* want to do is add an extra class to the link if the global
`currentCategoryId` is equal to this category's ID. This is actually a *perfect*
situation for a computed property. So below `data`, we're going to add `computed`
and I'm going to create a new computed property called `currentCategoryId`. We'll
return `window.currentCategoryId`. Just that simple!

***TIP
Another way to do this would be from within our `data` property
***

## Adding the .selected style

Before we go up and use that inside of our template, let's add a new style down here
that we can use. Inside of the `ul`, create a new style called `li a.selected`. This
is what we need to dynamically update in the template. Let's say
`background: $light-dash-component-border;`. We have this mixin here that we already
imported which in turn loads `colors.scss`. We're actually using a variable that is
defined in here.

Alright, so let's use this `selected` class up here in the template... Let's see...
Let's start with the `all categories` here. This *should* have that `selected` class 
*if* the `currentCategoryId` is `null`. For that, we need our class to be dynamic.
How can we have a class here to some times show and some times *not* show? I
remember! The best thing to do is, of course, make it dynamic, and then pass an
*object* to the class.

Here we can have a key called `nav-link` and set that to true so it *always* shows up.
The next one is a *little bit* ugly, but we'll say `[$style.selected]` to reference our
new select property. That should show up if `currentCategoryId===null`. Remember that
we have to do this less square bracket syntax here so that JavaScript could interpret
our complex `.` syntax as a string. Kind of unfortunate, but we're actually
going to fix that in a second!

We'll copy this `:class` in here and then go down inside our loop and in this case,
it's going to be slightly different. Here we need to compare 
`category['@id'] === currentCategoryId` leveraging that computed property in
both cases.

## Let's see it in the browser

All right, so if I didn't mess anything up, that should work... And yes! You
can actually already see I'm on the Office Supplies page and the correct category
is highlighted! Let's click on "All Products"... It works *beautifully*!

So to summarize, even though we don't have access to `window` or global variables
inside of our template, it is very simple just to create a computed property or
data that grabs that for you and make it available!

## SCSS Globals
 
There's one thing I want to change here before we talk about an even *better* way
to manage global variables!

It does bother me a *little bit* that I have to use this `$style.selected` here
because, in this particular context, I'm forced to use this ugly `[]` syntax! If you
look down here at my CSS, I'm already inside of a modular `.component` class.
Go all the way up here in the template and you'll see we're using `$style.component`
on the root element. Then in SAS, because I've put this inside of that `.component`,
the style is only going to be applied to things that are inside of the root element.
If you inspect the element on the selected link, you can see here that it's of
course `sidebar_selected_` and then a dynamic hash. But if you look to the
way that CSS selector is actually constructed it shows `.sidebar_component` and then
the hash string, ` ul li.sidebar_selected` and another dynamic hash! We don't actually
need that. The modular CSS that we need in order to single out our component is
*already* at the root element called `sidebar_component`. What I *would* like to do
is basically be able to write CSS like this, but not have it rendered with the extra
modular hash string because, up in the template, I want to just be able to type
`.selected` and have it just work...

Of course, that's not gonna work out of the box because the real class that's
going to be compiled has that extra modular stuff on it. Bummer! But there's a way
you can get this to work! I actually really like this! Let me show you:

## Make our child style classes into globals

Down in the style section, you can basically tell SCSS "look, I'm using a selected
class here, but I *don't* need you to add the modular stuff to convert this to 
a hashed CSS class for me". The way you do that is you add this kind of pseudo
selector called `:global` in front of it.

As soon as you do that, if I inspect element on that `li` and look over its classes,
you can see how it renders. It has the modular class on the sidebar, but then it
just has a `.selected` class, which is totally safe because that's only going to apply
when you're inside of this component.

Actually we can go one step further if you think about it, because this is a modular
class right here, we don't need anything inside of here to have the extra modular
hashes. I can actually move that `:global` up here after the `.component` class.

Now, everything inside of the main modular class is not going to get extra hashes.
The *only* time I should have to actually use the `$style` is on the root elements!
Now I can just let the rest be normal classes. This already looks much better!

## Next...

Next, we have successfully referenced a global variable via a computer property,
we don't *really* like having global variables just hidden inside of our code.
We can do this in a better, more organized way by refactoring it into a service..!
