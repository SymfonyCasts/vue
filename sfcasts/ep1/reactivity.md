# Reactivity

Coming soon...

We now understand that we pass vue a set of options and then it takes our `data` keys,
our `props` and our `methods` and actually puts those onto the vue instance themselves
so that we can actually see on the vue object that we're printing here. The view
instance `categories` `collapsed` `testProp` and `toggleCollapse`. They physically are
copied and moved onto the this object, which is why we can reference it referenced
things like `this.collapsed` because there really is a `collapsed` property on the vue
instance, but there's still kind of one missing piece here. When we change the
`collapsed` the data, like we say, `this.collapsed = !this.collapsed`.

That causes vue to rerender. So when the data changes vue renders, how is that
happening? If you think about it, if this is just a simple property that how is view
even aware that we change that property, somehow view needs to watch and monitor our
data so that when we change the data, it knows to trigger a rerender of the template
the way it does that is fascinating. So if you look over in your console, you can see
our `categories` and `collapsed`, uh, uh, properties here. And you notice that their
values are kind of `(...)` and it says invoke property getter. And if you click that,
then it actually shows you what's inside of there. You see, here's all the `categories`
and `collapsed`. And even `testProp` are not real properties on this object,

They are getter properties. If you scroll down to the bottom here, check this out,
see this, `get categories` and `get collapsed`. These are called, this is a
JavaScript feature where you can have where even if you don't have a property called
`categories`, you can make your object look like it has a property, not categories.
There is no property called `categories`, but we're allowed to reference
`this.categories` thanks to this little function here. That's a view ads. And when we
say this.categories or this.claps, it actually calls this function called `proxyGetter`
And when we say `this.collapsed =` equals, so when we actually assign `this.collapsed`
variable, it's going to call this `proxySetter`

So view makes our data accessible, but indirectly via these getter and setter
functions. Why it does that so that it can hook in and trigger a rerender. So when we
say `this.collapsed =` it's going to call this `proxySetter`. And what that's going to
do is it's going to update the data. They `collapsed` the data and trigger a rerender
if we need to. So we get to run around, not even thinking about that, just saying
`this.collapsed =` but behind the scenes view is intercepting that and rerunning the
tablet if we need to. In Vue 3. This kind of magic is done by something called a
proxy. A proxy is a beautiful thing. Proxy is a native JavaScript object, so it's not
something you invented. It's something that exists in JavaScript and it allows you to
wrap another object. But intercept calls, property access as property setting, really
anything.

So it gives you the same exact result of this. It's just a lot of, on a low level,
it's a cleaner implementation and it's actually more performance. It wasn't used in
YouTube because it's a newer features. They had to wait for browser support. The
point is whether you are doing the Vue 2 way where they have these little getter
and setter functions or using that proxy object to wrap the vue instance the
results. At the same, we can reference properties and set properties, but ultimately
view as intercepting that so that it can rerun to the template. Now this gets even a
little bit more amazing when you look at the `categories` data. So I'm actually going
to go over here and in addition to this, let's also log `this.categories` just for
simplicity. I'm going to go over here. I'll scroll down and let's open up over here.

Does over here, all the way over here. Here's our object here. So check this out. So
here's our race. So you can see it's a normal array as a zero kina one key, that's
totally fine, but there's some magic mixed into this. And Vue 3. This would
actually be a proxy object in Vue 2. If you look at `__proto__`
the protal here is a fancy as a fancy place to see what methods you can call on the
array so that you can call it radar `pop` right out. `push` right out `reverse`. These are
all at methods that live on a an array, but if you look at it, look at this `mutator()`
here. This is actually not the native functionality.

You can see down here function, location. Now this is super technical, but you can
see this is actually coming from Vue. Vue has replaced all of the array functions on
this array with their own function so that if we push a new item onto the array, it's
actually going to push, it's going to call this `mutator()` function, which will put the
new item on the array, but it will also trigger a rerender. That's why we can add new
things to our categories and view is going to notice it. If you look at one of the
individual objects, it gets even crazier. Check this out. You'll remember that our
categories here, each category has a `name` and a `link` property. Well, once it becomes
data, they're not real properties anymore. Notice once again, it says invoke
property. Gitter. So what Vue does is it creates a new object that looks like our
data over here, but instead of having a real name and link properties, it adds
getters and setters for them.

And check this out. It's once again, reactive Gitter and reactive setter so that if
we change the name of our zero index category, that's going to trigger the `reactiveSetter`
which is going to update that data but also trigger a rerender. So this is
really the magic behind view and this is something that really sets it apart from
react. React is a bit more pure and how it handles the data, which means it makes you
do more of the work, whereas Vue decides to give you more magic, makes your life
easier, but does. So by adding all this magic, if you can understand this magic, it
really goes a long way to helping you out. All right, next let's get back to work
with all our new knowledge here. Let's get back to work. I'm going to go back into
my, um, my, uh, `sidebar.vue`, and let's remove the new creative and the new `props`.
I'll go over and refresh, just get a new clean render. Perfect. And next, let's do
something else.

