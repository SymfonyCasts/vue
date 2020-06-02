# Aliases

Coming soon...

One of the huge benefits of view is being able to organize your Dom and all your
logic into smaller pieces. Our application isn't really very complicated yet. We
argued in loading products, and yet you can already see that our template is about 15
lines long. It's getting a little bit difficult to look at. So right now I'm going to
start organizing this a little bit, and there are too many pieces here. I can see
that there is a sidebar, and then there's something I'm going to call the catalog
because this is going to list a catalog of products. So I'm gonna take this existing
component and we're going to break it down into two sub-components purely for
organization. So let's start with the catalog. So that's going to be kind of this
section down here over in my `components/`, because this is technically going to be a
reusable component. I'm gonna create a new file called `catalog.vue`

of course, in here, while at the same `<template>` tag, I'll just put an empty `<div></div>` for now.
Down here in the `<script>` tag, say `export default` to export, default and object.

So expert defaults to expert default and object and the only thing we need is to have
that `name` key to help us debug. Perfect. Now let's go grab the part we want to bring
over here. Now basically I want to bring in this kind of product title, this product
area and the legend down here. So basically I want to bring in all this stuff here
and I could grab this, did that, has the `col-xs-12` on it. That's up to you. That
is kind of something that helps shape where this goes on the page. So I'm actually
going to leave that in this outer template. So in my outer template I can despite
decide how much space I want this to take up. So I'm going to copy, I'm going to copy
just the insides here and then a catalog that view. I'm going to paste it. Now I am
going to keep this dip here. One of the things in view too is that you have to have
in one single outer element. So if I deleted this div here, I would actually have
three outer elements and you'll get an air from view. There is a way to fix this in
Vue 3 and a Vue 2. Unless you bring in an outside plugin, you need to have
always a single top level the button. So an extra `<div>` there, but no huge deal.

Now what else do we need? Here we are bringing this `<legend-component />`. So let's go
ahead and import that just like we did before. I'll say 
`import LegendComponent from ./legend`  and then we could copy and paste. But just to practice here or
we'll register this by saying `components`. And then here we'll say `LegendComponent`.
And because we called this `LegendComponent` up here, we can call it `legend-component`
So that works perfectly.

The last thing we need is our data. So this actually the, the part of our application
that's going to decide what to pass to our uh, `LegendComponent`. So I'm going to
move on a copy the `data()` for our products and move it into our catalog. Now we could
have kept this data in set of products and passed it into catalog as a prop. We're
going to talk more later about where data should be placed because it's not always
clear. Sometimes if a data that needs to change should be in one component like
catalog or its parent component. So for now don't worry about that. We're going to
choose to have the legend to data right inside of the catalog component.

All right, so this components I think is ready to go. So let's get another one here
called `sidebar.vue`. We'll start the same way. I'll start with the `<template>` and
I'm going to go immediately over to my products that view file and let's grab the
template. Same thing. I'm going to leave the `col-xs-12` in this component so that
it can determine the size and I'll copy this `<div>` here and then paste that into my
`sidebar.vue`. Perfect. Down here I'll add the `<script>` tag, `export default` `name: 'Sidebar'`
and in this case that's actually all we need. So far there are cyber is still
completely hard-coded. The one other thing we do need is the style to go back to
products, not view all of the down at the bottom. This entire area, this entire style
type here is really meant to style the sidebar. So I'm going to copy that, but that
into my sidebar on the bottom. Okay, now I think that this is ready to go. It's
American products have view. Let's refactor to use this. This is actually going to be
really satisfying. So the first thing is we're gonna need to import both of those
components. We don't need the legend opponent anymore directly.

So I'm actually going to replace this and say `import Catalog from`, and then we'll
have to go up one level of `../components/catalog`. And then I'll talk to
that. Or Pia below. Say `import Sidebar from '../components/sidebar'`. Then down here we'll
use the two components `Catalog` and `Sidebar`. Now the other thing about this is we can
guilt tons of code inside of here. So I'll take out this entire `<div>` sidebar, and
that gets replaced with `<sidebar />`. Okay? And then same thing down here. We'll kill all
this code here that represents our catalog and we'll say the `<catalog />`.

Perfect. Now that is much, much easier to read. Um, down here, if we look at the
`data()`, this legend data is no longer used directly in this components. So I can now
delete the data. And same thing down here. We don't need any of these files anymore
cause these are entirely taken care of inside of the sidebar. Wow. Look at that. All
the way down to 25 lines of code basically inside of our `products.vue`. Okay,
so that was, that felt really good. Let's move over and actually try this thing. I
shouldn't have to refresh, but just to be safe. I did. And it works.

Now, one thing you might notice is that there's a lot of paths to keep up. We have to
go down `../components/` here and in `sidebar` with the styles has to go to that, that
`../scss/`. And as we have more sub-directories, cause we're in great
sub-directories and inside the opponents, this can get to be an even bigger problem.
I mean it's not a huge deal, but keeping track of the paths is something you need to
worry about. For that reason, that commonly in the view world, they'll use a feature
called Webpack aliases and it works like this. Open up your `webpack.config.js`
file. Now like always, it doesn't matter where this goes. I'm going to put it so
let's see. Right up here after `.enablesSingleRuntimeChunk()`. I'm going to say that
`addAliases()` and pass this and object. I'm going to pass this to aliases. You don't
have to follow this convention. Exactly. This is a common practice, but you can
always organize your aliases and your directory structure however you want. It's the
first earliest I'm going to do is called `@` and I'm gonna set that to something
called `path.resolve()`, and here I'm not actually going to stop. You can say it's
under an underline. This path is not fine. This is actually a node, a dependency. We
need to bring in someone to say at the top and say if our `path = require('path')`

and what this path thing is. It's super not important. This is a a fancy little a way
to create directory paths in node. So here I'm actually going to pass it `__dirname`
that will get the current directory and then `assets` as another argument and
then `js` has another argument before I explain that on the copy, that whole thing and
create another one. Oops, print another one called `styles` and this is going to point

at the `css` directory. I don't need those quotes around styles. Okay, what the heck
does this do this? That will allow us inside of any of our JavaScript files to prefix
a pathway `@` and it will automatically know that we're referring to the `assets/js`
directory. Same thing with styles. We can prefix it with `styles` and it's going to
automatically pull to the `assets/css` directory. That doesn't make sense yet. Don't
worry because we're going to see that in action. But first before, because we just
made a change to our Webpack file, we need to go over here and Control + C Encore and
then restart it.

```terminal-silent
yarn dev-server --hot
```

Now, once that finishes, I'll go over just to be safe and refresh. Everything still
works well. We add it as a new kind of optional shortcut that we can use set of her
files. So let's see. Let's start with `products.vue` here. So instead of that
thought components `../` basically gets us up to this `js/` directory. We just
added an alias. That means that the `@` symbol points to the `js/` directory. So instead
here we can say `@/components/catalog`. That's what a Webpack alias
gives you. The nice thing about it is if we move this code to a different file in a
different directory, that's going to keep working because the `@` is always going to
point to the `js/` directory. All right, so let's use this in a couple other places.
Let's go to `catalog.vue` here. Same thing we can say `@/components/legend`.
You can see it actually gets a little bit longer in that case.

And then in `Sidebar` to view, it's a little bit different. Down here you can see I'm
inside of my style sheets here. I can use that style sheet shortcut, but when you're
inside of CSS in with Webpack and you want to use one of those aliases, you need to
prefix it with `~`. So in this case, it's `~styles/components`. And you
know what? I just made a mistake. I can see it in my build script over here. You
probably caught it. One of myself. The `styles` here at my path has called the `scss`, so
I should have called this `scss`

You can see the Encore is super unhappy about it. File to import, not found or
unreadable. So I'm going to stop Encore and restart it one more time. Perfect. Now
it's happy. All right, so let's update just a couple of other spots here to give you
a feel for this. Then you don't have to do this in `products.js` instead of that
`./pages`, we can say `@/pages`. And I'll do one more over an `app.js` where
we load the CSS file here we can say `styles/` and then oops, don't need the `scss`. Now
notice this is a little bit confusing. When you're inside of JavaScript file, you can
just use the word styles. Even if you referring to a CSS file, it's only when you're
inside of CSS itself. You can see down here, I'm actually physically inside CSS. Do
you need to have this `~` thing in front? So has, we're gonna use these Webpack
aliases. If you love them, great. If you don't like them, don't use them. But it is
something you're commonly going to see in the view world. So if you run around and
start saying something like `@/` don't freak out. Just figure out what that, what
path that re refers to, cause that's a Webpack alias. Action. Alright, next let's do
something else.

