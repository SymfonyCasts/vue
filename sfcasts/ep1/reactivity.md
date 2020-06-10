# Reactivity

We now understand that we pass Vue a set of options and it takes our `data` keys,
`props` and `methods` and adds those onto the Vue instance. We can see this in
our console thanks to the `console.log(this)` that we added: this has
`categories`, `collapsed` and `testProp` properties plus  `toggleCollapses` method.
Vue effectively *copies* these onto the instance so that we can say things like
`this.collapsed`.

But there's still a mystery: when we *change* a data key - like
`this.collapsed = !this.collapsed` - Vue instantly re-renders the template. How
does that happen? Think about it: if `collapsed` is just a simple property, then
how is Vue aware that we changed it?

## Data & Props are Getter Properties

The answer is... magic! Ok, not magic: just really clever JavaScript. Look back
at the `categories` and `collapsed` properties on the console. Notice that, instead
of showing the value, it shows `(...)` and says "invoke property getter" when I
hover. If you click that, *then* it shows the value.

It turns out that `categories`, `collapsed` and also `testProp` are *not* real
properties on the object! They're "getter" properties. If you scroll near the bottom
of the logic, you see `get categories` and `get collapsed`. What you're seeing is
a special feature of JavaScript where you can make an object *look* like it has
a property, even if it really doesn't. There is *no* property called `categories`,
but we *are* allowed to reference `this.categories` thanks to this `get categories`
function. When we say `this.categories` or `this.collapsed`, it actually calls
this `proxyGetter` function. And when we *set* that property - like
`this.collapsed =` something, it will call this `proxySetter` function.

The point is: Vue makes our data accessible, but *indirectly* via these getter and
setter functions. It does that so that it can hook into our calls and re-render.
When we say `this.collapsed =`, that calls `proxySetter`, which updates the data
*and* tell Vue that it needs to re-render any affected components.

And... this is great! We get to run around just saying `this.collapsed =` not
even realizing that Vue is intercepting that call and intelligently re-rending.

## Proxy Objects

By the way, in Vue 3, this magic is done by something called a Proxy. A Proxy is
a native JavaScript object - it's a feature built into the language itself, not
something that Vue invented. With a Proxy, you can *wrap* another object and
intercept all method calls, property gets and property sets. The result is the
same... it's just a bit of a cleaner way to get the job done. By the way, this
*whole* idea of hooking into us changing data and re-rendering any affected
templates has a cool name: reactivity. Oooo.

## Deep Reactive

Reactivity gets even a *more* amazing when you look at the `categories` data. Back
in `created`, let's also log `this.categories` for simplicity. Back on the console...
find that log - it's on the right - and expand it.

Check this out: it's a normal Array with 0 and 1 keys. So... if we dynamically
added a *third* item to this array, how would Vue know to re-render?

In Vue 3, instead of an array, this would be a Proxy *around* an array, which
would let Vue hook into the new item being added. How is it done in Vue 2? Check
out this `__proto__` key. This is a fancy place where we can see all the methods
that exist in `Array`, which is an object in JavaScript. S, you can call `.pop`,
`.push()` or any of these. But check it out: each is set to a function called
`mutator()`. That is *not* a native JavaScript function: it comes from Vue!

Yea, Vue has *replaced* all of the `Array` functions with their *own* functions!
If we `push()` a new item onto the array, it will call this `mutator()` function,
which will push the item on the array *and* trigger any re-rendering. It's... pretty
crazy. And actually, because of how this is done in Vue 2, there *are* a *few*
edge case ways that you can update an Array that Vue *cannot* detect, like setting
an item directly to a specific index. That's not a problem in Vue 3 thanks to the
Proxy object.

But wait, there's more! Check out one of the individual category objects. Remember,
in `data`, each category has `name` and `link` properties. Guess what? Once Vue
loads the data, these are *not* real properties anymore: it says "invoke getter".
Vue creates an object that *looks* like the data we created, but instead of having
*real* `name` and `link` properties, it adds getters and setters for them - the
same `reactiveGetter` and `reactiveSetter` functions we saw earlier. So if we
changed the `name` property of the `0` index category, that will update that
property *and* trigger any re-rendering needed.

Phew! So this is the *real* magic of Vue, and one of the things that sets it apart
from React where you handle data - or state - a bit more manually, but with less
magic. But if you can understand how Vue's magic works on a high level, it will
serve you well!

Before we keep going - remove the `created` and `props` options we added to debug.
Next, we know that `props`, `data` and `methods` are copied onto the Vue instance
and made available in the template. Let's talk about the fourth and last thing
that is added to the instance: computed properties.
