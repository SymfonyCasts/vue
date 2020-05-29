# Creating a Child Component

The `products.vue` file is known as a component. And, as we can see, a component
represents a set of HTML, complete with CSS for that HTML and even *behavior*
for those elements, which we'll learn about soon.

In the same way that *HTML* elements can be placed inside of each other, Vue components
can *also* be nested inside of each other. For example, we could move an entire
section of HTML into another `.vue` file and then *include* that component in
the same spot.

And... this is often a *great* idea! Because, if we built our *entire* app
in this one file, it would become *huge* and complex!

## When & Why to Extract to a Component

We have this same problem in PHP: if you have a large or complex function,
you might decide to extract part of it into a *different* function. You might
do this because you want to re-use the extracted code *or* just because
separating things keeps your code more readable and better organized.

As a general rule, if an area of your DOM has (1) special functionality, (2) needs
to be reused *or* (3) would just make the original template easier to read, you
should consider extracting it into its own component.

## Creating the Second Component

It's not *really* very complex, but let's pretend that we want to reuse the
"legend" functionality in other places and pass different text each time we use
it.

Let's go! Inside the `js/` directory, create a new sub-directory called `components/`.
I'm not going to put this new component in `pages/`: `pages/` is sort of meant to
hold "top-level" components, while `components/` will hold everything else: Vue
components that contain little bits and pieces of HTML and that, in theory, could
be re-used.

Inside `components/`, create a new file called `legend.vue`. Start the exact same
way as before: add `<template>` and, inside, copy the `<span>` from `products.vue`
and paste. To keep things simple, I'm going to temporarily copy the old shipping
message and hardcode it: the component will *start off* completely static.

The other tag we need is `<script>` with `export default {}`. The *only* option
that we should *always* have is `name`. Set it to `Legend`.

## Rendering a Component inside a Template

Component... done! Using this in the `Products` component is a three step process.
First: inside the `<script>` tag - just like we normally do in JavaScript - import
it: `import LegendComponent...` - we could call that anything -
`from '../components/legend'`.

Second, to make this *available* inside the template, add a new option called
`components`. As I've mentioned, there are a number of options that you can add
here to configure Vue, like  `name`, `data()` and `components`. There aren't a
*tons* of them - so don't worry - and we'll learn the most important ones
little-by-little.

If we stopped now, *nothing* would change: this makes `LegendComponent` *available*
to our template, but we're not using it. In fact, that's why ESLint is so mad at
me:

> The "LegendComponent" has been registered but not used.

The last step is to go to our template, remove the old code, and *use* the
`LegendComponent` as if it were an HTML tag. Type `<`. You might be expecting me
to say `<LegendComponent/>`... after all, PhpStorm *is* recommending that.
Instead, use the kebab-case option: `<legend-component />`.

Using `LegendComponent` *would* have worked, but when we add a key to `components`,
like `LegendComponent`, Vue *also* makes it available in its kebab-case version:
so `legend-component`. It does that so our template can look cool by using the
HTML standard of lowercase and dashes everywhere.

Anyways, let's try it! Move over, refresh and... it works! But the *real* prize
is over on the Vue dev tools. Nice! Our component hierarchy is growing! We now
have a `<Legend>` component *inside* of `<Products>`.

Of course... its text is now *static*... so we *also* kinda took a step backwards.
Next, let's learn how to pass info from one component into another with `props`.
