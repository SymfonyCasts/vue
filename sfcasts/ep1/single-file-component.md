# Single File Component

As we've seen, it's *totally* possible to configure the Vue instance and put the
template in the same file. But... this is going to get *crazy* as our app grows:
can you imagine writing 100 lines of HTML inside this string... or more? Fortunately,
Vue solves in a unique, and gorgeous way: with single file components.

Inside the `js/` directory create a new folder called `pages/`, and then a file
called `products.vue`. We'll talk more about the directory structure we're creating
as we go along.

Notice the `.vue` extension: these are files aren't really JavaScript, they're a
completely custom format that Vue invented.

## Creating the Single File Component

On top, add a `<template>` tag. Then, copy the `h1` HTML from the original file,
delete the `template` variable, and paste it here.

Next, add a `<script>` tag. Anything in here *is* JavaScript and we'll
`export default` an object that will hold our Vue options. Copy the `data()` function,
delete it, and move it here.

That's it! I know, the format is a bit strange, but it's *super* nice to work with.
On top, the `<template>` section allows us to write HTML just like if we were in
a Twig template. And below, the `<scripts>` tag allows us to set up our data, as
well as a bunch of other options we'll learn. This is a fully-functional Vue
component.

## Using the Single File Component

Back in `products.js`, to use this, first, import it: `import App` - we could call
that variable anything - `from './pages/products`. Thanks to Encore, we don't need
to include the `.vue` extension.

Now, inside of render, instead worrying about compiling the template, this `App`
variable already has everything we need. Render it with `return h(App)`.

That feels good! Let's try it: move over, refresh and... it looks *exactly* the
same!

## Adding a Component Name

From here on out, we're going to do pretty much *all* our work inside of these
`.vue` files - called single file components. One option that we're going to add
to *every* component is `name`: set it to `Products`. We could use *any* name here:
the purpose of this option is to help debugging: if we have an error, Vue will
tell us that it came from the `Products` component. So, always include it, but it
doesn't change how our app works.

## $mount() the Component

Before we keep working, there are two small changes I want to make to `products.js`.
Firs, the `el` option tells Vue that it should render into the `id="app"` element
on the page. This works, but you *usually* see this done in a different ways. Remove
`el` and, after the `Vue` object is created, call `.$mount()` and pass it `#app`.

I also like this better: we first create this `Vue` object - which is a template
and set of data that's ready to go - and *then* choose where to mount it on the page.

## Shorthand render() Method

And second, because the `render()` method only contains a `return` line, we can
shorten it: `render` set to `h => h(App)`.

That's effectively the same: it uses the arrow function to say that render is
a function that accepts an `h` argument and will return `h(App)`. I'm *mostly*
making this change because this is how you'll see Vue apps instantiated on the web.

Next, let's get to work inside our single file component: we'll add the HTML markup
needed for our product list page and then learn how we can add styles.
