# Page Context "Service"

Setting a global variable in JavaScript and then reading it from inside our Vue
app is, really, a nice way to communicate information from our server
to our front-end app. But global variables are still global variables and we
should *try* to *at least* isolate and organize them as much as possible. Because,
for example, what if we changed our app to use the Vue router? Instead of full
page refreshes where we set the `currentCategoryId` as a global variable in Twig,
*now* that data would be returned in a *different* way: via an AJAX call.

The point is: the way we get `currentCategoryId` could change. And if we have
`window.currentCategoryId` sprinkled around our code everywhere, it's... not ideal.
No problem! Let's isolate our our global variable into a central spot. Enter
JavaScript services!

## JavaScript Services

I think you're *really* going to like this. Inside my `js/` directory, create
a new folder called `services/`. So far, everything we've worked on has been
Vue components... but there's a lot more to our app. We have code for making
AJAX calls - which we will eventually centralize - and we're also going to have
generic logic that we want to reuse from multiple places.

In our app, the `services/` directory is going to hold files that help us
fetch data. So, it's a bit different than services in Symfony, which are
any classes that do work. By services here, I mean API services... though you
could also fetch data from local storage... or even by reading a global variable
that we set in the template! Those are *all* sources of data.

## Creating the page-context service

So inside `services/`, create a new file called `page-context.js`. I *totally*
invented that name: the purpose of this file will be to help read data related
to what "page" we're on - like the current category id.

Inside, instead of exporting a default, like we've been doing so far with
Vue, we're going to export *named* functions. As we start adding more
functions to this file, you'll see how we can use whichever one or two functions
we need. Say `export function`, call it `getCurrentCategoryId` and, inside,
*very* simply, `return window.currentCategoryId`!

[[[ code('4e607e0a0b') ]]]

*Just* like that! We have a central place to read our global variable! I'll celebrate
by adding some JSDoc above this.

Thanks to this, if we get this information some *other* way in the future, we will
*only* need to update code in this one spot. I love that!

Now, in `sidebar.vue`, we can use this like any normal JavaScript module.
But I'm going to type this import a little backwards:
`import from '@/services/page-context'`. I left the part after `import`
blank, which is totally *not* valid JavaScript. But now, I can add `{}` and
autocomplete the `getCurrentCategoryId` function.

[[[ code('752cbbe29d') ]]]

Nice! Down in the computed property, use this: `return getCurrentCategoryId()`.

[[[ code('59162436d7') ]]]

That is lovely! When we move over and refresh... it works!

## Loading currentCategoryId in the Correct Component

I'm really happy that we've centralized this global variable into a shiny new module.
But I want to do just a *little* bit of future proofing. In a real app, you may
or may not choose to do this - but it'll be a good exercise and it will help us later.

Here we go: `currentCategoryId` is *not* something that will change while our app
is running. Because, when we click on a different category, the page refreshes and
the entire Vue app restarts. For the duration of our page view, `currentCategoryId`
*never* changes!

This means that it *isn't* something that *needs* to live in `data`: we don't
need anything to re-render when it changes. That's why it's *totally* legal
to grab this value in `sidebar.vue` or anywhere else that needs it.

But I want to *kind of* future proof our app... and plan ahead for a future
where `currentCategoryId` *will* change while my Vue app is running. If you
pretend that `currentCategoryId` *did* need to be in `data`, what component
would that `data` live in?

Remember: the answer to this question is always find the *deepest* component
that needs the data. If I look in `products.vue`, we know that `sidebar` needs
to know the `currentCategoryId` so that it can highlight that category. And
`catalog` is *also* going to need to know the current category soon so that
we can print the category title *and* filter the product list to show only
those in that category.

This means that if `currentCategoryId` were data, it would need to live on the
`products` components so that we could passed it down into `sidebar` and `catalog`
as a prop.

## Replace currentCategoryId Computed with a Prop

Now, I don't *actually* want to turn the `currentCategoryId` into `data` right now
because... I don't *need* to. But I *do* want to structure my app with this in
mind. To start, copy the computed property from `sidebar.vue`, and, in
`products.vue` add it there.

[[[ code('d5d0b5b4e1') ]]]

Oh, and this is cool! When I pasted, check it out! It added the import for
me automagically! It *did* mess up the code style, but you can fix that in
PhpStorm if you want. That's better.

So, instead of having `currentCategoryId` as data, we will have it as a computed
property... but *inside* the component where it *would*, in theory, need to live
as data. That will make it *super* easy to *change* to data later if we need to.

Now, pass this to sidebar with `:current-category-id="currentCategoryId"`.

[[[ code('2acc97bf3c') ]]]

And in `sidebar.vue`, instead of a computed property, we'll set this as a prop.
Add `currentCategoryId` with type `String` - this is the IRI string - and
also `default: null`.

[[[ code('25ed0f08da') ]]]

The reason I'm using default `null` is that this will allow the prop to be a
String *or* `null`, which is what it will be on the homepage. You can add more
customized prop validation if you want... but this is good enough for me!

If you scroll down, our `currentCategoryId` computed property is angry! It says
duplicate key `currentCategoryId` because we don't want to have this as a prop
and *also* as a computed prop. Delete the computed property... and we can also
delete the import to celebrate. Our code is happy!

## Check it in the browser!

Moment of truth! When we move over... yes! It's *still* working. Yay for not
breaking things!

If you're not sure *why* we did this, here's what's going on. By moving
`currentCategoryId` up to `products.vue` and passing it as a prop to `sidebar`,
it would now be *very* easy for us to change the `currentCategoryId`
computed prop into `data`. In fact, if we did that, everything else would...
well... magically not break!

Next, let's get to work on the `catalog` component. Let's pass
`currentCategoryId` as a prop so we can filter the list of products
to *only* those for that category.
