# Instance Properties

Coming soon...

The best and worst part of vue is that it is magic. We already know that if you have
some data and you update that data, the template is going to rerender. That's why we
can play with things in us, our vue console and they will automatically update.

We even know that if we update a data and one component that's passed to a prop as
the other, look at this in catalog we have this `legend` data. We pass that as the
title prop into our legend components. If we update that,

it's going to update the catalog component and also update the legend component since
we passed that into it so it handles all of this passing around the data and updating
the templates for us, but actually the real magic of vue is not this re rendering
stuff. I love that. That's great. The real magic of view is on the view instance, the
`this` variable. When you're inside of a object, I want to take a few minutes to
demystify and show you how have you worked behind the scenes. It's going to make
everything else. We do make a lot more sense to start in sidebar, I'm going to add a
new function here called `created()`. Now we're gonna talk more about this created
function. This created function later, but basically if you have a function in your
object called created, then view, we'll call this as soon as there. Your component is
created so it's a way for you to run some code right when your instance is being
created by vue. Inside here, I'm actually going to say `console.log(this)`.

We're doing this purely so that we can see what it looks like, what the this object
looks like. All right, so we go over a lot of my console and there it is right there.
You can actually see the `VueComponent`. All this refresh just to, oops, I'm going to
refresh anyways just to kind of clear things out. There we go. It's a `VueComponent`
with, it's an object with odd ton of properties on it. Now in view, if you're using
Vue 3 instead of a `VueComponent` here, you're going to see something called a
proxy. I want to talk about what a proxy is in a few minutes, but if you see that,
click on the `target` sub property to see the real object. Now, as you can see, this
object is just a bunch of properties,

Because going to go goes full of properties and methods and the vast majority of this
stuff, you're never going to need to worry about view prefixes, things with dollar
sign that you can technically use, but you probably won't need to. And it prefixes,
things with_that are internal and that you shouldn't use in view three. Those are all
under a single property called underscore. But if you look here, check this out.
There is actually a property called `categories` in a property called `collapsed` that
corresponds to our data. So that has, that explains why we can call while we can
reference `this.collapsed` because the, `this` variable really does have a `collapsed`
property on it. And actually if you look back here, there's also a method called
`toggleCollapsed`. This is on the instance because under our methods here, we created
a method called `toggleCollapsed`. Before I talk, I'm gonna. I'm gonna explain a
little bit about how that happens. Before we do, I'm going to add one more thing
here. Right now the sidebar doesn't have any `props`. I'm going to temporarily invent
one. So I'm going to say `props:` and I'm going to create a new prop called `testProp`.
And I'll set it's `type: String`. This is a matter and one of the things you can do
with the profits and give it a `default` value. So I'm gonna say defaults. Let's say I
am the default value

Perfect. Now if we go over here and look, now I'm going to scroll down all the way
down here. There's my new `VueComponent` right there. And look down here, there. Now
our `testProp` is also a property. So here's the big picture. We configure view by
passing it to options. So you have an option here with a `name` key and `data()`. He
created props and methods. So all we do is tell you what options we want. Behind the
scenes view takes these options and creates a Vue object. If `VueComponent` object
when it does that, it takes all of your keys and data, all of your keys and all of
your props and all of your methods, and it adds those to the instance. So that when
we're actually using the instance the `this` variable, we can say `this.collapsed`
because that's the data. Or we can say `this.testProp`. That would work
because we, and that would be referencing this property here. Or we could even say
`this.toggleCollapse()`. We could call one of those methods directly because this is
actually a method that was added to the instance.

so the first thing I understand is that vue does, this takes, there's options and
sort of crease this final object for you with those with `data` `props` and `methods` set
onto the actual object. And actually later, this will be one other thing that's added
to the object called `computed` properties and they're added in the same way. Now that
we understand this, we can demystify how the template works a little bit. So I'll put
our tempo. We know that we can just magically reference `categories` because categories
is a data or we can just magically referenced `toggleCollapse` because that is a
method because we added that some methods in reality, whenever you reference a
variable up inside your template, ultimately vue actually calls actually renders
this, uh, executes as, as `this.` So this is really `this.toggleCollapse` and it's down
here. It's really `this.collapsed`. Now you can't actually use the, `this` key word
there, I'm just kind of showing you what happens behind the scenes. So let me show
you this.

Did you go back and look at our vue object here? If you scroll down to the
underscores, there's an internal property called `_uid`. This is internal. You shouldn't
use it. It's just a little unique identifier for the component. But technically this
means there's a, there's a property on this call `_uid`, which means that
technically where we could go up in the center of template and say `{{ _uid }}`
That should call `this._uid` in our object. And in fact it does
categories seven. It was already six here. But if you look at the updated module down
here, UID seven, and if you put a pro, I think property here, definitely not a real
property.

the error you get is really instructive. So I'll scroll down here. You can see view
warning, property or method, definitely not a real property is not defined on the
instance but was referenced during render. So it's telling you, Hey, this is not a
property on the instance. The way you get a, the way you have a property on instance
is by defining it either as `data` `props` `methods` or the `computed` properties that we'll
talk about later. So now it makes sense. Those are all added to an instance and the
template, we're actually effectively calling properties on that instance. That was
one of the piece of magic that that this vue object gives us and it's called
reactivity. And it's all about how view is smart enough to know that when we change
data that it should automatically update. I want to talk about that next.

