# Single File Component

Coming soon...

you to organize all of your markup like this into little components. So I'm going to
create, because I'm going to go into my `js/` directory here and create a new directory
called `pages/`. Inside of there, I'm gonna create a new file called `products.vue`. 

now that's `.vue` extension. These are very special files that have a very special
format to them. On top, I'm actually going to create a `<template>` tag. It's a very
special thing inside of view. And then we'll go over here and copy my `<h1>` and
delete my template variable.

And then paste it here. And then down here I'm actually going to have a `<script>` tag.
And inside the script tag I can write JavaScript. I'm gonna say `export default`. And
we're going to export, `export default`, and we're going to export the options array
that we have here. What a specifically I'm going to do is I'm gonna take this `data()`
function and it's deleted out of our main components and move it over here. Now a
high level, the syntax is a bit strange because it's specific to view, but it's
really cool because we actually have a nice area up here where we can create our
template in a nice area here where we can create our data and there's gonna be other
things that we're gonna add there as well.

And this is a file that I could actually work with instead of our `products.js` to
use this, we can import it. `import App`, we'll say `App`. That's a pretty, it doesn't
matter what that's called `from './pages/products`. And I don't need the `.vue`
on the end of it because that's going to find that instantly. And then instead of
view dot compile template that render we actually, to simplify this with `render()`
`return h()` and then it's `App`.

So this `h()` functions hypermedia has the ability where you can just pass it one of
these single file components and it's just going to render it. So let's try that move
over. Refresh ad we see absolutely no difference. So now things are starting to get
organized,

which means we can start to focus on doing real work instead of this products that
you file. Before we do, one thing I'm always going to put on these files is another
option called `name` and it doesn't matter what it's called, I'm going to say `Products`
here, something that helps you represent the file. The biggest reason you have his
name, he here is that when you have an error, it's going to be easier to read because
you're going to see that the error is coming from the products components. So always
make sure you put a `name` key here to help you debug.

The other thing I'm gonna do is that you say this `el` option here, this tells VUE that
it should attach itself to the `id="app"`, uh, element on a page. This, oops, this `el`
option is totally legal, but a more common thing to see is instead of having an `el`
option is to initialize, is to initialize the `Vue` object and then call a `.$mount()`
method on it and then say Mount that to `#app` and it kind of makes more
sense to me. So it's kind of create this, this, uh, this Vue object and now actually
mounted into my DOM and when we refresh that make that works as well. And the last
thing I'm going to do, and this is going to take us to fully the place where the way
that you actually see Vue applications rendered is that because this `render()` function
just returns a value, we can actually change, shorten the syntax here we can say
`render:`  and that `h => h(App)`. So this is a short syntax for arrow function
that's going to take an age argument and is going to return `h(App)`. So if we see
that at first it might seem like that looks like a crazy function, but now we
understand what that means and this time we move over, refresh. It works. All right,
so next, let's get to work inside of our `products.vue` and really start to bring
this thing to life.

