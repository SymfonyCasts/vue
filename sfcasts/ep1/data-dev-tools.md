# data() and Vue Dev Tools

The template I pasted in is 100% hardcoded. Boring!

See this little "shipping" message down here? Let's pretend that sometimes we need
this message to change - like maybe if the user is on the page for longer than 60
seconds, we want our app to get desperate and change the shipping time to be faster.

The point is: we want this message to be dynamic, which means that it needs to
to be a `data`. Copy the message. Then, in `data()`, remove `firstName`: we're
not using that anymore. Call the new data key `legend` and set it to the shipping
message.

Now that we have a `data` called legend, back up on the template, we're allowed
to say `{{ legend }}`.

Beautiful! And if we move over to our browser and refresh... it even works!

## Vue Dev Tools

The *first* time we played with data, we set our entire Vue application onto a
global variable so we could change the `firstName` data from our browser's console
and watch the HTML update. Being able to see and play with the data on your
components is a *pretty* handy way to debug. And fortunately, there's a much easier
way to do this than manually setting a global variable.

It's called the "Vue.js Dev Tools": a browser extension for Chrome or Firefox that
gives you tons of Vue information. If you don't already have it, install it - it's
amazing.

Once you have the dev tools... and once you're on a page that contains a Vue app
running in dev mode, you can open your browser's debugging tools - I actually need
to close and re-open mine so that it sees my Vue app - and... boom! New Vue tab.
Click it!

I *love* this. On the left, it shows the component "hierarchy" of my app. In a few
minutes, we're going to create *more* components and start nesting them inside of each
other, just like HTML. If you click on `<Products>`, ah: on the right, you can see
the `data` for this component. *And* we can change its value! Add quotes and replace
this with whatever message is in your heart. When you hit the save icon... the
HTML updates! Vue calls this "reactivity": the idea that Vue *watches* your data
for changes and re-renders a component when necessary.

Anyways, the Vue dev tools will be a *powerful* way to visualize our app, see its
data and even change data to see how things update.

## The `data()` Function versus `data: () => {` Function

Before we create our *second* component, I need to point out a small detail. We
configure Vue by passing it options. Some of these options are set directly to
values, while others - like `data()` - are functions.

And because the `data()` function is always just a `return` statement, you'll
often see it written with the shortcut, arrow syntax: `data: ()`, arrow, `({`,
remove the `return` and fix the ending.

Just like with the `render` shortcut we used in `products.js`, this is *effectively*
the same: it says that the `data` property is set to a function that returns this
object. The return is implied.

You can use this if you want... but I'm going to go back to the original way. It's
a bit longer, but I'll use this syntax consistently for *all* Vue options that are
set to functions. The shorter syntax also has a limitation where you can't use
the `this` variable: something that we *will* need later.

Next: let's extract part of our product listing markup into a *second* component
and include it from `Products`. This will start to show off one of Vue's key
concepts: having multiple components that communicate to each other.
