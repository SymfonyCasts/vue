# Product Listing Components

We're only printing the *name* of each product, but we could *easily* start
adding more content right here: the product image, price and a button to the view
the product. But if we did that, this template we start to get pretty big. And
later, we're going to add a search bar... which will make this component even
busier!

Exactly *when* you should split a component into *smaller* components is not a
science. It's a subjective decision and there's no wrong answer. But I *am*
going to refactor this `<div class="row">` into a `product-list` component: a
component whose *entire* job will be to just... list products! At the end of
the next chapter, I'll give you *another* reason why I did this.

## Creating a Component Sub-Directory

You might expect me to go into the `components/` directory and create a new file
called  `product-list.vue`. But... I won't. That's not wrong, but instead, I'm
going to create a new *directory* called `product-list/`. Because, in a few minutes,
we're going to have *two* components that help us build this product-list area.

Now create a new file called `index.vue`. I'll talk about that name soon.

Start the same way as always: add a `<template>` tag and, inside, since we are
going move this entire area here, use the `<div class="row">` as the outer element.

Next, add the `<script>` tag with `export default` the options object. Give this
a `name` set to, how about, `ProductList`.

## Move the products Data?

Poetry! I already know that we're *definitely* going to need access to the array
of `products` so that we can loop over them. To get this, we have two options.
First, we could *move* the `products` data from `catalog` into here. After all,
I said that a piece of data should live in the *deepest* component that needs it.
And when we're done, that would be *this* component!

But... I *won't* do that. I'll talk about why in the next chapter. Moving the
`products` data into here wouldn't be *wrong*, but *leaving* it in `catalog` will
help us follow a "smart component, dumb component" design pattern. More on that
soon.

## The Imprecise products Prop

The second option - and the one we'll choose - is to have the `products` passed
to us as props. Add a `props` option with a `products` key. The type will be
`Array` - because this will be an array of product objects - and I'll also add
`required: true`.

This is one of the downsides of `props`... or kind of JavaScript in general: I can
say that this should be an `Array`, but I can't really enforce that it's an array
of product objects: an array of objects that all have certain keys. Well, you
*can* do this with custom prop validator logic, but I think it's more work than
it's worth. So, I'll just use `Array` and say "Good enough for JavaScript!"

In the template, since we already have the outer div, copy the `div` with the
`v-for` and paste it here. In theory, we shouldn't need to change *anything*:
we're going to pass that *same* array of product objects into this component.

## Importing and index Component

So... let's use this! Back in `catalog`, start by importing the component:
`import ProductList` - that seems like a pretty good name - from
`@/components/product-list`.

And I can stop right there. Because we have an `index.vue` inside of
`product-list/`, we can import the *directory* and Webpack will know to use
that `index.vue` file. That's a nice trick for organizing bigger components:
create a sub-directory for the component with an `index.vue` file and add
other sub-components inside that directory. We'll do that in a minute.

Anyways, add `ProductList` to components so that we can reference it in the template.
Here, our job is pretty simple: delete the entire `<div>` and say a
`<product-list />`. PhpStorm is already suggesting the one `prop` that we need
to pass: `products="products"`. But we know that's wrong: we don't want to pass
the *string* products, we want to pass the variable.

It's kind of fun to see what it looks like if you forget the colon. In the console
of our browser, if we refresh, yikes!

> Invalid prop: type check failed for prop "products": expected Array got String
> with value "products".

Add the `:` before `products` to make that attribute dynamic. And back over on the
browser... yea! All the products are printing just like before.

## Creating a product-card Component

And once again, we could stop now and start adding more product info right here.
But I'm going to go one step further and refactor each *individual* product into
its own component.

Inside the `product-list/` directory, create a second component called, how about,
`product-card.vue`. Start like we always do: with the `<template>`. Each product
will use use this div with the `col` classes on it. Copy the classes but *keep*
the `v-for` here. In `product-card`, add a `div` and paste those classes.

Let's also go steal the `{{ product.name }}` and put that here.

That's a good enough start. Next add the `<script>` tag with `export default`
and `name` set to `ProductCard`. And once again, we know that we're going to need
a product passed to us. So I'll jump straight to saying `props` with `product` inside.
The product will be an *object*... and like with the Array, there's not an easy
way to enforce *exactly* what that object looks like. But we can at least say
`type: Object` and also `required: true` in case I do something silly and forget
to pass the prop entirely.

Ok! This is ready! Back in `index.vue`, we'll follow the *same* process to use
the new component. This starts to feel a bit repetitive.. and I *love* that! It
means we're getting comfortable.

Start with `import ProductCard from` and you can either say `./product-card`,
which is shorter, or `@/components/product-list/product-card`, which is more
portable.

To make this component available in the template, add the `components` key with
`ProductCard` inside.

Finally, in the template, this is pretty cool: we now want to loop over the products
and render the `ProductCard` *itself* each time. And putting a `v-for` on a custom
component is *totally* legal. Replace the `<div>` with `<product-card>`, remove
the `class` attribute and replace it with `:product="product"`. And since this
element no longer has any content, it can be self-closing.

That's *really* nice: we loop over `products` and render an individual `ProductCard`
for each one. When we check the browser, it looks like it's working! I'll refresh
just to be sure... I don't *always* trust hot module replacement. And... yep!
It *does* work.

What I *really* like about the `product-card` component is that it's focused
on rendering just *one* thing: a single product. Next, let's *really* bring the
product to life by adding more data, styles and a `computed` property.
