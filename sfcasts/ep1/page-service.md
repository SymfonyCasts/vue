# Page Service

Coming soon...

Setting a global variable in JavaScript like this, and then reading it from inside.
Our JavaScript is honestly a great way to communicate information from your server
into your JavaScript or Vue app. But global variables are still global variables are
something that we should try to use that if we do use them, we should try to isolate
and organize them as much as possible. Because for example, what if we changed our
app to use the Vue router? So instead of full page refreshes, um, these are actually
just all loading via Ajax. If we did that, then suddenly the `currentCategoryId`
wouldn't be stored on this global variable anymore. It's something that we would
actually probably get from Ajax calls. The point is like this could actually change.
And if we have this sprinkled around our code everywhere, it's not ideal. So I want
to isolate my window calls and organize them into a central spot.

I think you're really gonna like it. So inside my `components/` directory inside my `js/`
directory, I'm going to create a new directory called it `services/` so far, everything
we've worked on has been Vue components, but there's a lot more to your application.
The view components there's going to be code that makes we're going to eventually
centralize our code, that mace Ajax calls. And then we're also just going to have
other helper functions that just do JavaScript related stuff. In our application, the
`services/` directory is going to hold files that help us fetch data. So it's a little
bit different than services in Symfony, which just are, are any class or classes that
just do work for you by services here. I mean, almost like API services, a ways that
you fetch data. Most of the time, it's, we're going to be actually making Ajax calls
from files inside of here. Um, when this case even getting the `currentCategoryId`,
that's some data that we need. And so we're going to get it from a service. It's just
a service. That's not going to have to make an Ajax call. So I gonna create inside of
here, a new file called `page-context.js`. That's a name I just made up and it's
kind of a file that's going to help us get any information that is kind of set by the
server. It's set on the page

now inside of here, instead of exporting a default like we've been doing inside of
view, we're actually going to export named functions. And you'll see, as we build
this, as we start adding more functions to this file, you'll see how we can kind of
use just whichever one function or two functions we need. So I'm on an `export function` 
called `getCurrentCategoryId`. And very simply, it's going to hold that
global variable return `window.currentCategoryId`. And just like that we have
centralized our, uh, global variable. Uh, I'll put some piece JSDoc above this as
well. We'll say returns.

The current category ID that's set by a server. Can we start getting this information
some other way in the future, we're going to only have to come to this one spot to
update it. So that's great. Now in `sidebar.vue`, we're just going to use this
like a normal JavaScript module. So I'm going to import, I'm actually going to type
this a little backwards `import from '@/services/page-context'`. And as I left this
part blank here, that's not valid JavaScript that's because now I can put my curly
braces here and I can just import the one function I need. And because I did it sort
of backwards, I'll get auto complete now. So `getCurrentCategoryId` so I just fetch
that one function from that import and down here, very simply it's just 
`return getCurrentCategoryId()` that is lovely. And I'll go over here and refresh, make sure it
works and it does love it. Now this is fine. I'm really happy that we've centralized
this, uh, global variable into a nice new module that we can reuse, but we're going
to do just a little bit of future proofing in our app and in a real app, I may or may
not do this, but it's gonna be a nice kind of thought process for us to go through

right now. The `currentCategoryId` is not something that changes while our BW app is
running. You know, it changes when we click on a different category, but when I click
on a different category, um, the entire view app restarts. So basically this isn't
something that needs to live in data, cause it's not something that ever changes,
which is why it's totally okay for us to, um, just grab that value from inside of
`sidebar.vue`. But I want to kind of future proof to a time when the current
category ID will change dynamically, maybe because we refactor application to use a
Vue router. So as we're changing categories instead of a full page refresh, um,
we're just dynamically loading all the data. So if you think about it, if currently
`currentCategoryId` were data, where would that data need to live? And remember the
answer to that is always find the deepest component that needs it. So if I look at
products that view, we know that the `Sidebar` needs to know the `currentCategoryId`,
because it's going to use that cause, cause it uses that information to, um,
highlight which one is selected, but the `Catalog` is also going to need it in a little
while because we're gonna use it there to actually like print the print, the name of
the category on top, you need to explain that a little bit better. So that means
that's if

the `currentCategoryId` word data, that data would need to live on the products
components that can be passed down into both of these as prompts.

Now, I don't actually want to turn the `currentCategoryId` into data right now
because I don't actually need to, but I'm going to kind of structure my app with this
in mind a little bit. So what I'm going to do is I'm going to copy this computed
property from `sidebar.vue` and in `products.vue`, I'm going to add it there.
Now one cool thing. As soon as I pasted that you check it out. Um, it actually did
the import automatically for me, it messed up the syntax a little bit. I sure I can
configure my editor to be a little smarter.

There we go.

But it did the import format, which is really cool.

So instead of having it as data on here, I'm going to have it just as a computed
property can be very easy. Then later to change it to a data, if I needed to, and now
I can pass this into the sidebar here, I'll keep my, uh, attributes together. We'll
say `:current-category-id="currentCategoryId"`. And it's just that simple. Now inside
of our top view, instead of a computed property, we're just going to add this as a
prop. So `currentCategoryId`, and here, we're going to say this is going to be the
type string cause remember it's the, the, um, the IRI string and then I'm going to
say `default: null`. And the reason I'm doing default, no here is, um, that's basically
the ease. It's basically the easiest way to say that this is a string, but it can
also be null. So string or Knoll, you can add more custom validation rules to these
properties, but this is good enough for me.

And now if you scroll down or `currentCategoryId` is very angry. It says duplicate
key `currentCategoryId` because we can't have it as a prop. And also as a computer we
don't need and we don't need it as a computed to anymore. So I'll delete the `computed`
property down there and now we can delete the import above here. So if we go over, it
looks like it's still working just fine. So basically by moving it up to 
`products.vue` we're planning ahead a little bit because now it's going to be very easy
for us to change the `currentCategoryId` here from a computd property, into a prop.
And then the rest of our application will just automatically rerender it didn't have
to do this, but that was kind of the idea behind why I did next. Let's start working
a little bit more on the `Catalog`. It needs another `currentCategoryId` so that we can
filter the list of products that it's showing. Let's do that next.

