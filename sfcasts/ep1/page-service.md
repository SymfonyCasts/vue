# Page Service

Setting a global variable in JavaScript and then reading it from inside our `Vue`
app is honestly a great way to communicate information from our server
into our front-end app, but global variables are still global variables and we
should *try* to isolate and organize them as much as possible. Because, for example,
what if we changed our app to use the `Vue` router? Instead of full page
refreshes, the information would just load via Ajax. And If we did that, then
suddenly the `currentCategoryId` *wouldn't* be stored on this global variable
anymore. It's something that we would probably get from Ajax calls. The point is
that the way we get our `currentCategoryId` could change, and if we have this
sprinkled around our code everywhere, it's not ideal. How can we overcome this
issue? The best way in our scenario is to isolate our window variables and
organize them into a central spot. Enter JavaScript services!

## JavaScript Services

You are *really* going to like this. Inside my `js/` directory, I'm going to create
a new directory called it `services/`. So far, everything we've worked on has been
`Vue` components, but there's a lot more to our application.

There's going to be code that makes our Ajax calls, which we'll eventually centralize,
and then we're also just going to have other helper functions that just do JavaScript
related stuff.

In our application, the `services/` directory is going to hold files that help us
fetch data. So it's a little bit different than services in Symfony, which are just
any classes that do work for you. By services here, I mean API services. A way
that you can fetch data, be it from the server, from Local Storage or any other means,
like our template! In this case, even getting the `currentCategoryId` from our
template, calls for us to get it from a service. 
 
## Creating the page-context service
 
So inside of here, I'm going to add a new file called `page-context.js`. That's a
name I just made up and its purpose is to get any information that is printed into
the template by the server. 

Inside of here, instead of exporting a default, like we've been doing so far with
`Vue`, we're actually going to export named functions. As we start adding more
functions to this file, you'll see how we can use just whichever one function or
two we need. So I'm going to do `export function` and call it `getCurrentCategoryId`.
And *very* simply, it's going to hold that global variable
`return window.currentCategoryId`! *Just* like that we have centralized our global
variable! I'll put some JSDoc above this as well. We'll say `returns the current
category ID that's set by a server`
 
If we start getting this information some other way in the future, we're going to
*only* have to come to this one spot to update it. That's great!

Now in `sidebar.vue`, we're going to use this like a normal JavaScript module.
I'm going to `import` -I'm actually going to type this a little backwards-
`import from '@/services/page-context'` and as I left this part blank here, which is
not valid JavaScript, I can now put my `{}` here and I get autocomplete so I can 
just import the one function I need! In the computed property, very simply just say 
`return getCurrentCategoryId()`. That is lovely! 

If we go over and refresh, it works!

## Future Proofing

I'm really happy that we've centralized this global variable into a nice new module
that we can reuse, but I want to do just a little bit of future proofing in our
application. In a real app, I may or may not do this, but this is gonna be a nice
exercise for us to go through right now.

The `currentCategoryId` is not something that changes while our our app is
running. Because when we click on a different category the page refreshes and the
entire view app restarts. This means that for the duration of our page view, the
server variables *never* change. Basically this isn't something that needs to live
in `data`, cause it's not something that ever changes, which is why it's totally
okay for us to just grab that value from inside of `sidebar.vue` in a computed
property.

But I want to *kind of* future proof my app to a time when the `currentCategoryId`
will change dynamically, maybe because we refactor our application to use a `Vue`
router. So as we're changing categories instead of a full page refresh we can just
*dynamically* load all the data.

So if you think about it: If `currentCategoryId` were data, where would that data
need to live? Remember the answer to that is to always find the deepest component
that needs it. So if I look at `products.vue`, we know that the `Sidebar` needs
to know the `currentCategoryId`, because it's going to use it to highlight the
category that is selected in this list. And the `Catalog` is also going to need it
in a little while because we're gonna use it there to print the right thing in 
the title, as well as bring the correct list of products filtered by category.

This means that the `currentCategoryId` data would need to live on the `Products`
components so that it can be passed down into both of these as props.

## Pass currentCategoryId as prop

Now, I don't actually want to turn the `currentCategoryId` into `data` right now
because I don't actually *need* to, but I'm going to structure my app with this
in mind a little bit. So for starts, I'm going to copy this computed property from
`sidebar.vue`, and in `products.vue`, I'm going to add it there.

Now one cool thing, as soon as I pasted that, check it out! It actually did
the import automatically for me. It only messed up the code style a little bit!
I sure *can* configure my editor to be a little smarter.

There we go.

So instead of having it as data in here, I'm going to have it just as a computed
property. It will be very easy to change it *later* to a data, if I needed to.
Now I can pass this into the sidebar here -keeping my attributes together-, we'll
say `:current-category-id="currentCategoryId"`. It's just that simple!

In `sidebar.vue`, instead of a computed property, we're just going to add this as a
prop. Add `currentCategoryId`, and here we're going to say this is going to be of
type `String`, as this is the IRI string. Then I'm going to say `default: null`.
The reason I'm doing default to `null` here is to say that this is a String, but it
*also* can be `null`. You can't really add more custom validation rules to these
props, but this is good enough for me.

Now if you scroll down, our `currentCategoryId` computed property is very angry.
It says duplicate key `currentCategoryId` because we can't have it as a prop and
*also* as a computed. I'll delete the computed property down there and now we can
delete the import above here. Our code is now happy!

## Check it in the browser!

So if we go over, it looks like it's *still* working! Yay for not breaking things!

Basically, by moving it up to `products.vue`, we're planning ahead a little bit,
because now it's going to be very easy for us to change the `currentCategoryId`
here from a computed property into `data` the rest of our application will
just automatically re-render if it needs to.

Next, let's start working a bit more on the `Catalog`. It needs another
`currentCategoryId` prop so that we can filter the list of products that it's
showing!
