# Hoisting Data Up

We just discussed that, because the `categories` in our app are static - we
don't load them with AJAX and they never change - they don't *really* need to live
as data on a component and it would be *totally* ok to fetch them directly - wherever
we need them - from `categories-service`.

But... we're going to take the more complex path by pretending that our categories
*are* still loading via AJAX... which means they *do* change during the lifecycle
of our app... which means that they *do* need to live as data on a component.

## Computed property for Category Name

But... let's ignore that for a moment and finish *this* component. We know that
the `title` component will receive `currentCategoryId` and `categories` props.
To find the *current* category name, we'll need to write some logic. And... hey!
That's a *perfect* case for a computed property.

Add `computed` with one key inside, how about, `categoryName()`.
For the logic, if `this.currentCategoryId` - to reference that prop - `=== null`,
then return "All Products".

[[[ code('980f3195d6') ]]]

If we *are* on a category page, find the correct one with
`const category = this.categories.find()`. Pass this an arrow function with
a `cat` argument. We want to find the category whose `@id` property - which is
the IRI string - matches `this.currentCategoryId`.

[[[ code('0aa48da778') ]]]

The `find()` function *effectively* loops over all the categories, calls this
function for each one, and returns the first that makes this expression true.

At the bottom, add `return` and use the ternary syntax: if a category was found,
which... it should be unless the `categories` data is loading via AJAX and is
empty at first - then return `category.name`. Else, use an empty string...
or you could say "Loading...".

[[[ code('f78c0d8d06') ]]]

Perfect! Up in the template, use this: `{{ categoryName }}`.

[[[ code('79d2167bd5') ]]]

## Hoisting the categories Data

And... this component is done! Let's get to the interesting part. We need to pass
`currentCategoryId` and `categories` into this component. Open the parent
component - `catalog.vue` - and let's scroll down a little. It already has access
to `currentCategoryId` - yay! - but it does *not* have access to `categories`.

Where *does* the `categories` data live? Head over to the Vue dev tools. The
`Catalog` component is rendered by `Products`... but it doesn't have access to
`categories` either. Ah yes, that's because `categories` *currently* live as data
in `Sidebar`.

And that makes sense! Until this moment, the `Sidebar` component was the *only*
one that needed the categories. But now that `catalog` *also* needs that info -
so it can pass it to the `Title` component - we need to *hoist* - or "pull up" -
the `categories` data to a higher component: we need to move it into the `Products`
component so that we can pass it to both `Sidebar` and `Catalog` as `props`.

This is a fairly common situation: you start by putting your data in one component,
then later you need to move it *higher* so that more parts of your app can use it.
We did this once earlier: we moved the `collapsed` boolean data from `Sidebar`
*up* to `Products` so that we could use it in more places.

So let's get to work! Open up `products.vue` and then `sidebar.vue`. Copy the
`categories` data and then remove the `data` option entirely. In `products`,
find `data` and paste `categories`.

[[[ code('c6557e323d') ]]]

The other thing we need move is the `created()` function. Copy that full function
and delete it. In `products`.... it looks like we don't have a `created()` function
yet, so we can paste this one.

[[[ code('6325a7851e') ]]]

When we did that, PhpStorm automatically added the import... but I *do* need to 
fix how that code looks.

[[[ code('cad4edb94c') ]]]

So far so good. Now in `sidebar`, because we don't have `categories` as data
anymore, we will need it as a prop. Inside `props`, add `categories`, `type: Array`
and `required: true`.

[[[ code('c2a5a32fff') ]]]

Finally, back over in `products`, pass this to sidebar: `:categories="categories"`.

[[[ code('fab6237b84') ]]]

Unless I tripped over my keyboard somewhere, that *should* make the sidebar happy
again! Back at the browser... I'll refresh just to be sure and... it works! We have
some errors due to a missing prop in `TitleComponent` - but that's ok: we're
working on passing that!

## Passing categories down to Title

Now that we have access to `categories` inside `products`, we can *also* pass
that to `catalog`: `:categories="categories"`.

[[[ code('e2781a175f') ]]]

To add that prop, let's steal the prop code from `sidebar`... and paste it into
`catalog`. 

[[[ code('33fd8adb38') ]]]

Use this shiny new prop to pass the `categories` *again* to their final location. 
The `TitleComponent` needs *two* things actually: `:currentCategoryId="currentCategoryId"` 
and `:categories="categories"`.

[[[ code('df6e5dfeab') ]]]

Phew! I think we've got all the wires connected. When we move over... yes! It's
working... and there are *no* errors. We can go to "all products" and that title
works too.

But that *was* a *lot* of prop passing. We moved the `categories` data to
`products`... so we could pass it to `catalog`... so we could pass it to `title`.
This one of the common ugly parts of a traditional Vue or React app: a lot of
prop passing. It's not the end of the world, but as I've mentioned a few times,
it *is* something that can be solved by centralizing your data, which is
possible in Vuex or in Vue3. I'm particularly excited about the possibilities
in Vue 3.

Next: this product listing page is *really* looking good. But since we're going
to have a *ton* of these... um... "useful" products in our store, let's add a
search bar. This will be a *perfect* opportunity to talk about the *last*, *super*
important directive: `v-model`.
