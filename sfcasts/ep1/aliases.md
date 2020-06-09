# Aliases

As our app grows, there's going to be more and more directories and paths to think
about. In `products.vue`, we go *up* one directory to get to `components`. And in
`sidebar`, we need to go up two directories to get to our CSS files. This isn't
a *huge* deal, but it's only going to get worse as we add even more directories
and sub-directories.

To help with this, the Vue world commonly uses a feature called Webpack aliases.
Open up your `webpack.config.js` file. It doesn't matter where... but I'll go after
`.enablesSingleRuntimeChunk()`, add `.addAliases()` and pass an object. Add a
key called `@` set to `path.resolve()`.

Oh, but stop right there: PhpStorm is mad! This `path` thing is a core Node module
and we need to require it first. At the top: `const path = require('path')`.

The `path.resolve()` function is the *least* important part of this whole process:
it's a fancy way in Node to create a path. Pass it `__dirname` - that's a Node
variable that means "the directory of this file" - then `assets` and finally `js`.

Before I explain this, duplicate the line and create one more alias called `styles`
that points at the `scss` directory. And... I don't need those quotes around `styles`.

So... what the heck does this do? An alias is kind of like a fake directory. Thanks
to this, when we import files in our code, we can prefix the path with `@`
and Webpack will know that we're referring to the `assets/js` directory. We can do
the same with `styles/`: that's a shortcut to the `assets/scss` directory.

Let's see this in action. First, because we just made a change to our Webpack config,
at your terminal, hit Control + C to stop Encore and then restart it:

```terminal-silent
yarn dev-server --hot
```

Once that finishes.. just to be safe, let's refresh. Everything still works. *Now*
let's use our shiny new, optional alias shortcut!

## Using the Alias

Start in `products.vue`. Instead of `../`, which gets us up to the `js/`
directory, we can say `@/components/catalog`... because `@` is an *alias* to the
same directory.

The nice thing is that if we move our code to a different directory, this path
will keep working: `@` *always* points to the `js/` folder.

We don't have to use this *everywhere*, but let's update a few other spots, like
`catalog.vue`. Same thing: `@/components/legend`.

And then in `sidebar.vue`, it's a bit different. Down in the `style` tag, we can
use the `styles` alias. But when you're inside CSS code and want to use an alias,
you need *one* extra thing: a `~` prefix. So in this case, `~styles/components`.

Oh, and I totally messed up! You can see a build error from Webpack. When I set
up the `styles` alias, the path *should* be `scss`, not `css`.

Over at the terminal, here's the fully angry error: file to import not found or
unreadable... because we gave it a bad path. I'll stop and restart Encore one more
time:

```terminal-silent
yarn dev-server --hot
```

Now... it's happy! Let's update two more files to get a feel for this. Open
`products.js`. Instead of `./pages`, we can say `@/pages`.

And one more in `app.js`. To load the CSS file, we can say `styles/` and then we
don't the `scss` directory.

But... maybe you were expecting me to say `~styles` like we did earlier?
Here's the deal: when you're inside of a JavaScript file, you can just use the
word `styles` even if you *referring* to a CSS file. The `~` thing is only needed
when you're doing the import from *inside* of CSS itself, like in the `style` tag.

So... those are Webpack aliases. If you love them, great! If you think they're some
sort of strange sorcery, don't use them. The `@` alias *is* common in the Vue
world. So at the *very* least, if you see Vue code importing `@/something`, now
you'll understand the dark magic that makes this work.

Next: let's see our *second* custom Vue syntax: the `v-for` directive for looping.
