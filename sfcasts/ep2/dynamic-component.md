# Dynamic Component

Coming soon...


And our top level component `products.vue` we can now read the `currentProductId`
which will either be set if we're on a product page or we'll be no, if we're just
on a category page, that's listing the products.

Here's the plan,

Both the product list and the category page are going to use this same sidebar. So
we'll have this sidebar on both pages, But both, but each will render something
different in this central body part. So for the, for the product list or under
catalog for the product page, we'll render a different component. Let's bootstrap, a
new component to hold the content for the product show page. So an `assets/components/`,
I'm going to create a new file called `product-show.vue` right Inside here. We'll
start with our normal `<template>`.

I'll put a `<div>`

Paste in someplace, all their content for now down here, we'll have the `<script>` tag
with `export default`, our empty object, except we'll do a name of `ProductShow`.

Cool.

Before I worry about rendering the catalog or this new product show, let's just
render that inside of here. So down at the bottom, I'm going to import,
`import ProductShow from '@/components/products-show'`

Down to our `components`. So `ProductShow`, And now up here after our current product
identity, I can say `<product-show>` Easy enough when I move over,

Thanks to the view dev server, it's already reloaded and we can see the new component
right there. Awesome. But of course, we don't want to render both components. We want
to render either product show or catalog based on the `currentProductId` so how can
we do that? Well, one really simple option is just to use `v-if` on each component. So
we could say `v-if` down here as a `v-if="currentProductId"`, and then that component
would only even render if current productivity is, and we can do the opposite down
here. And that is a fine option. In fact, very likely the option I would normally use
in this case, but there is one other way to do this, which is a basically identical,
but is a little bit nicer to work with. Especially if you are toggling between more
than two components, it's called a dynamic component. So here's how it works. Let's
start by adding a new computed property. And this computer property is gonna be a
little bit strange. It's actually going to return the component that we want to
render. So I'll call it `currentComponent()`.

And down here, we'll use a little Turner syntax, uh, to check we'll check. If 
`currentProductId` does not equal `null`, then we want to render `ProductShow`. I'm actually
referencing that variable that we imported else we're going to render. So this will
very easy. Allow us to get the actual component that we need from inside our template
to use this. We're going to use a special component called a dynamic specific
component called actually `<component>`. I'm gonna clear out the product stuff and I'll
change catalog here to component literally component. This special tag can render any
components. Can you tell which components are rendered via a special `:is` prop.
So I'll say `:is` equals, and then we can say `currentComponent`, That's

It. So let's try it. I'm gonna go over here. And first I'm actually going to click
all products and yeah, you can see that works perfectly. That's rendering the catalog
component. Of course, clicking a specific category is going to run to the same thing.
And I click into a product that works too. We say I'd love to see a product here. Now
thinking about this product show component, uh, right now it's not being passed any
props. So obviously it's going to need to know the `currentProductId` so that I can
eventually make an ajax call for the full product info and render it. So then here,
let's add the props for that.

A lot of `props`

Here, we'll call it `productId`, and this is going to be a `type: String`. Cause remember
it's the IRI string, and then we'll say required. True. And then over in product
style view, it's a little bit weird, but now this component is actually either
rendering the catalog or the product show. So we're passing in the two props that are
needed by the `Catalog` component, but now we also need to pass in the profits needed
by the `ProductShow` component, which for a second year is going to look a little
weird. So I'll say `product-id` equals, and then we'll say `currentProductId` and
over in product show, just so we can see if this is working,

We'll change the text up here to print that product ID prop, all right, back over.
Yeah. Immediately without refreshing, you can see that this is working. So you notice
though, that it means that technically no matter which component we're rendering,
we're actually passing extra props to each of them. These first two prompts are
needed by catalog. And this last one is needed by product. And while that's
technically fine, it is kind of weird. And also those extra props are going to show
up as attributes. So you can actually see, this is a div category equal than a bunch
of objects. So that's not a great situation. We really want to pass an only the
prompts and we need to do this. And we actually can do this. I'm gonna create
another, uh, computer property on here called `currentProps()`. And what we're going
to do is actually return the props needed in both situations. So I'll return 
`this.currentComponents`. So we use our other computer property. If = `ProductShow`,

Then

We'll return a certain set else. We will return a different set. And specifically
what we're going to need here is `productId` set to `this.currentProductId`. And then
down here for the other one, the two props were `currentCategoryId` actually scroll
up as a reminder. So `currentCategoryId` and `categories`. Now notice down here, we're
actually going to put them, uh, once again, not, we're not going to use the, uh, the
kebab casing. We're just going to use the kind of like normal casing, uh, because
view is going to convert that for us. So I'll say `currentCategoryId` said to 
`this.currentCategoryId` and then `categories` set to `this.categories`. Perfect. So no way
have a, but now what, I mean only have a new current props variable, but usually when
we, uh, bind, we usually use `v-bind` or, or just the short hand
`:categories` to bind one prop to that component. But this guys, we want to bind a bunch
of props at once. How can we do that? The answer was with just the bind. So `v-bind=""`
venous fine, but not colon a prop name, just beat us mind equals, and then the
object that you want to set. So in our case, it's going to be called current
property.

All right, let's try it go over. I'll refresh just to be safe. It works, no errors,
no extra weird properties on there, there, and the products page, the product list
page works as well. So back on the product page, this is awesome. We now have two
separate pages and we have a blank slate to really start creating this product show
page. Let's do that next.

