# Hoist Data

Coming soon...

No, we have access to what category we're on and all the categories information. I
think we can do a little better with this title here. We actually change this to be
the category title. So if we look over here, Oh boy, I have this in the wrong spot.
This can be deleted. If we look over here, this in `catalog.view`, this is where
the H one actually comes from. So we could, what we basically need to do is we need
to take the, um, current category id, find the, find that in the categories data,

and then use the name from that sprint V current product. Now we couldn't do
something here. We could add actually at a computer property, right? The catalog that
does all it does all of this determining for us. And then we could actually use the,
um, computer property right here. But instead, I'm actually gonna isolate this title
area and do its own component. You don't have to do this, but it'll hide some of the
logic in that component. Since have the `components/` directory, I'm gonna create a new
`title.vue` components, and we'll start our usual way here with template. I'm
he's a `<div>` and I'm immediately gonna say `:class="$style.component"`
I'm gonna add a outer components class so I can add some styling here. And
then I'm going to say `<h1>`

and in here for now, I'm just going to say the same products thing down here. I'll do
the `<script>` tag and a little start, very simple with our `export default`, and we'll say
`name: 'Title'`, and then on the bottom, because I'm already referenced a style I'll add
`<style>` and we'll add `lang="scss"` and we'll make it `module`. And then here I'll do a
`.component {}` and then `h1 {}`, and I'm just going to add, oops, each one, then I'm
just going to add a `font-size: 1.7rem`. Perfect. So very nice simple component here
in `catalog.vue` let's use this for some importance and when to import, I'm
actually gonna call it `TitleComponent` this time, I'll say from `@/components/title`
Now, the reason for that is that when I put `TitleComponent` down here, this
is actually equivalent to just saying `TitleComponent: TitleComponent`, um,
the keys `TitleComponent`, and the value is also `TitleComponent`. When you just say
`TitleComponent`, it's the key and the value. The reason I'm doing that is because I
have `TitleComponent` down here. It allows us up here

to say `title-components`. I need to do that because if I called it `Title`, then
this would look like an HTML `<title>` tag. And it wouldn't work. That is a total little
gotcha. I can't name your components the same as real, uh, HTML elements. And then we
look over here. Yep. It looks like it's already working. Yep. It just says products.
That were great. All right. So if we think about title, what it's going to need to
figure out what the actual title should be here is the array of product information,
category information. I mean, and the `currentCategoryId` now, which means that we're
gonna need to add those both as `props` down here. So I'm going to add `props:`. We
could choose to actually just pass the, do that calculation elsewhere and then just
pass the title. And it's a component it's totally up to you. The logic for figuring
out the current title needs to live somewhere could live in here, or we could or
could live somewhere else. So it's those prompts on here and I'm going to pass. I'm
going to have one prop called `currentCategoryId`

`type: String`,

and then `default: null`  of him saying, so it's actually optional. And then I'm going to
add a `categories` prop, which is `type: Array` and `required: true`. But I want to actually
talk about this `categories` prop here for a second. Um, the reason I'm adding a
`categories` prop is because this component needs to know the categories. So we're
going to pass that from a parent component. However, in our application, we know that
categories are actually being loaded just from `windows.categories`. They're not
actually being loaded via Ajax. The categories are set once and they never change. If
we knew that that was always going to be the case. If we knew that categories were
going to be immediately available, never change. Then instead of adding a `categories`,
prop,

we can actually just use our `category-service` to fetch that stuff. We can do that
instead of a `computed` method that we're about to create. But in our example, even
though we're getting the categories from `window.categories`, I kind of wrote fetch
categories as if it might be something that changes. No, I'm going to explain that
different. But if for some reason your categories are something that will change or
you're loading them via Ajax, which means that they'll be empty at first. And a
moment later they'll change. If the category is something that does change, then we
can't dispatch it from some central service because then categories wouldn't be
reactive. What I mean is that when this page first loaded categories would be empty
in our title would render. But then a moment later when categories, the AGS called
finished and categories updated our com title component wouldn't rerender. So if
categories, if we know of categories is always going to be the one static value we
can cheat and just use a category service instead of adding as a prop. But as soon as
categories is something that needs to change, it means it needs to live in data
somewhere and be passed down to us as props.

I'm pretending that categories will change. Cause it actually makes the whole example
a little bit more complex. All right. So actually to get the name here, we can add a
`computed` property. So I'll say computed and let's add one call to `categoryName()`,
that's a function. And inside of here, we're going to say if `this.currentCategoryId`
cause we can reference the prop on the, this object that `=== null`. Then we're going
to return all products as our title. So we're going to look for the category inside.
Um, we're gonna look for which category we're currently in. So I can say constant
`category = this.categories.find()` since it will be an array and then here we'll
pass it a little function, little arrow function that compares the categories `@id`
property

to `this.currentCategoryId`. So what that's effectively going to do is it's going to
loop over the categories and find the first one who's um, who's at ID property
matches the `currentCategoryId`. So now category is either going to be the category
found or it's going to be no. So at the bottom I'll return `category`, if category
exists, let's return `category.name`, Ellis will just return an empty string. Now the
empty string shouldn't happen. But if, if we were loading our categories from an Ajax
call, then when this component first loaded, it would, their categories would be
empty and it wouldn't find one yet. And so we'd return an empty string. And as soon
as the categories load, then it would find one. So in our case, that one actually
happened when I'm coding defensively as if it would alright. Now up here, we can say
`{{ categoryName }}`.

Alright, so now here's where we get to kind of the interesting part. This component
looks good to me. Now we need to do is pass the category ID and categories into this
component. So if you look at `catalog.vue`, let me scroll down here. It has 
`currentCategoryId` already. Yay, but it doesn't have `categories`. So let's kind of look up
our componentry here. I'll look at my view. Developer tools and Z catalog is included
by products. But if you look down here, `Products` also doesn't have access to
categories. Categories are actually currently data on `Sidebar`. And we did that
because until this moment, the `Sidebar` component was the only component that needed to
know the categories, but now catalog needs another category. So can pass it down to
title. So to means is that we need to actually bump. Uh, we need to hoist. We need to
pull the categories data up higher. We need to pull up to the products component so
that it can be passed to `Sidebar` as props and they can be passed down to `Catalog` as
props. So this is something that happens fairly commonly. You start in your data
might start somewhere. Then it needs to move up as more parts of your application
need to use that this is something that can, uh, can change in Vue3. That's
actually something I should've mentioned earlier when we were talking about the fact
that if categories changes, it needs to be data. I'll add that in.

All right. So let's get to work here. I'm going to go to `products.vue` and
`sidebar.vue`. And we're just basically gonna just bump up the data a little bit.
So categories is going to copy `categories`, remove `data` entirely, and then move that
to `products.vue` find its `data` and add `categories`. The other thing we need to
get is the `async created()`, which sets that a copy of that full function. We don't have
an `async created()` yet inside of here. So I will paste in our `async created()` right
there. And when I copied that it automatically added the import for me, but the
coding standard on that, isn't quite correct. I need to fix my editor to get that
right now inside of our categories, isn't data anymore. Now it's going to be a prop.
So we're going up to `props` and we'll add our `categories`. Data `type: Array`, we'll say
`required: true`

and backup and products. We'll just pass that into our sidebar. So now we have one
more thing. We need to pass them, which just `:categories="categories"`. So that
should make our sidebar happy again. If I go over here, I'll refresh just to be sure.
Yeah. We have some errors here coming from a missing prop on the `TitleComponent`.
Cause we haven't actually passed it down there yet. Um, but our sidebar does look
good. All right. So now that we have access to the categories inside products, we can
also pass that to our catalog. So I'll do `:categories="categories"`, and then
inside of our catalog, we need to add that as a problem. I'm actually gonna steal the
from sidebar and paste it into catalog. So now catalog has access to the categories,
which means the weekend finally passed the stuff that `TitleComponent` needs it needs
to and actually needs.

The `:currentCategoryId` is that the `currentCategoryId` and `:categories` set two
`categories`. Phew. Alright, so let's try that out and move over and yes, you can
already see that it's working no errors down here. We can go to all products and it
works perfectly. So this is one of the trigger things with view or react is realizing
that. So if data needs to be shared by multiple components, sometimes you need to
move it up. It's not the biggest deal. Um, but, but it does take some work to kind of
pass those props down. The fact that we need to pass, we have the categories, data
and products, and we need to pass that down to catalog. Then Pat catalog passes it
down to sidle. This is something that you can fix it. If you use Vex view X makes
it a little bit easier cause you don't need to pass down props so many levels or in
view three with the news composition API, there are also ways to centralize data. So
you don't have to do as much prep, prop passing, but this totally works, um, and gets
the job done next. Let's add a search bar to our page.

