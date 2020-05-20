# Vue Instance & Dynamic Data

We've just seen the most basic thing you can do with Vue. And if you think of Vue
as a templating engine like Twig, it makes a lot of sense: we instantiated a new
Vue instance, told it *where* on the page to render and passed it a template.
And that *totally* worked. Booya!

## The data Option

When you instantiate Vue, you control it by passing a number of different *options*...
and a lot of this tutorial will be about learning what options are possible.
One of the *most* important ones is `data`. Unlike `el` and `template`, `data`
is a *function*. It returns an array - or, really, this is an "object" in JavaScript -
of variables that you want to pass into the template.

Notice that ESLint is *angry* - it's because this line is empty. Sometimes you need
to ignore it until you finish: it's a bit overeager. Let's create one new "data" -
one new "variable" - to pass into the template: `firstName` set to `Ryan`. That's
me!

And now that we're passing a `firstName` variable into the template, we can say
"Hello" and `{{ firstName }}`. Yes, by *complete* coincidence, Vue uses the same
syntax as Twig to render things.

Before we try this, ESLint is *still* mad at me. Sheesh! It says:

> Expected method shorthand

As I mentioned, some of the options you pass to Vue are set to values - like
`el` and `template`, while others are *functions*. When you have a method in an
object like this, you can use a shorthand: `data() {`... which is just a lot more
attractive.

Oh, and at the bottom, temporarily add `window.app = app`. That will set our Vue
`app` as a global variable, which will let us play with it in our console. Ready?

Refresh! It rendered! But it gets better! In your browser's console, type
`app.firstName`. You can *already* see that this equals Ryan! Any `data` key
becomes accessible as a property on our instance. Set this to `Beckett` - my son's
name... who is hopefully napping right now. Boom! The template *immediately* updates
for the new data. And we can change this over and over again.

So Vue is a lot like Twig - it renders templates and can pass variables into the
templates - but with this crazy-cool extra power that when we *change* a piece of
data, it automatically re-renders... which, of course, is exactly what we want.

## How the Vue Instance Rendering Really Works

And... at a high level... that's Vue! Yes, we're going to talk about *so* much
more, but you already understand its *main* purpose. Remove the global variable
and the `app =` code - we don't need that. ESLint will temporarily get mad because
it thinks it's weird that we're instantiating an object and not setting to a
variable, but that's fine... and it'll go away in a little while.

Behind the scenes, when Vue renders, it actually calls a `render()` method on
the object, which you don't normally need to worry or care about. But to help
this all make more sense, I want you to *see* what this method *looks* like one
time. Stick with me, we're going to do some temporary experimentation.

I'm going to add a new `render()` function. As soon as I add this, when Vue renders
it will call *our* function instead of rendering it internally for us. But inside,
I'm going to put the *exact* code that Vue normally runs:
`return Vue.compile(this.$options.template)` - that's a special way to reference
the `template` option here - `.render.call(this, h)`.

I know, that's *totally* crazy, and you will *never* need to type this in a real
project. What this shows us is that Vue has a `compile()` function where you can
"compile" a template string and then call `render()` on it. The `.render.call` thing
is a fancy way of *basically* calling `.render()` and passing it the `h` variable,
which is another object that's good at dealing with DOM elements... and that you
don't need to worry about.

If we refresh now, it works *exactly* like before because our `render()` method
does exactly what Vue normally does. If you look at this, you might start to wonder:
why do we need a `template` option at all? We're just *reading* it in `render()`...
so it could live anywhere. Let's try that! Remove the option, and, at the top,
add `const template = ` the template string. In render, reference that local variable.

That should work, right? Let's find out. It totally does!

Ok, so let me tell you the big important point I'm trying to make. Vue... is
simple: it's a system where you can take a template string, render it, and pass
this `data` into the template... just like Twig.

Of course, as we start adding more to our app, this `template` variable is going
to get *huge* and ugly. To help with that, Vue has a very special organizational
concept called single file components. Let's create one next.
