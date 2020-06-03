# V On

Coming soon...

Let's make our sidebar more interesting. I want to give it some behavior. I want to
give it a little link down here that the user can actually click to collapse or
expand it. This is going to be truly the first time that we're going to have
something change on our element, a change while we're coding. So if you think about
this, the first thing that the side of our component is going to need to know. It's
going to need to know whether or not it's in the collapsed state or not. The clap
state, because probably there's going to be, the sidebars is going to have some
different styles or classes that make it collapsed or not collapsed. So I'm gonna
start down here by in `data()`, I'm gonna add a new data called `collapsed` and will
default at the `false` so that it starts, uh, expanded. And of course right now, that
makes no difference. We have a new `collapsed` data over here, but we're not using it
yet.

Do you? Is it will start very simple. This will be actually a little bit ugly. I'm
gonna go up to my top here and I'm going to add a style attribute first. I'll put
this on a multiple lines to make it a little bit more readable. I'll say `style=""`
Now basically what I want to do is if that `collapsed` the data as a certain
style, if, if collapsed data is true, we're going to set the width to be really
small. But of course we can't just start referencing the `collapsed` variable right now
because we need to add the `:` in front of this. So `:style=""` and now I can reference
that `collapsed` variable. Now we could do something here where I say like `width:`
and then I start using some logic, but because wits style, the style attribute is so
complex with multiple elements vue lets you use a lot like with the class up here, a
view a lot lets you do some special things with these style attributes.

What you can do here is you can actually pass it in array or really an object and now
you can use a key value pair of all the different things you want. So like for
example, you could say `width: '500px'` `margin: 10px`, whatever you want, it's
just a nice array and it's going to take care of four men in that for you. And in our
case, what I want to say is, I do want to say width, but I'm going to use that data.
So I'm use the Turner's index homes `width: collapsed`. And if we are collapsed then
I'm going to say `70px`  else. We'll use `auto` perfect. Just wanna to go over here
and we're not going to see any difference yet. But I can go down to the sidebar
element here and let's try this collapsed true. Boom. Oh that looks awful. Don't
worry. We will fix that a little bit. We need to make it a little bit smarter by
actually hiding some of this text as the point is, we now have a working `collapsed`
data.

Alright, so I'll change this back to false. All right, so of course we're not going
to expect our users to change the data inside the view state. We want a button down
here that's going to change that state for us. So back in our elements. Let's see
after the UL, I'm going to add an `<hr>` and then the new element down here, I actually
`<div>` first, I'll give it some classes for styling. Inside of here, I'm going to add a
`<button>` and I'll give you some classes as well. So `class="btn btn-secondary"`. It's
all very straightforward. Now the only part of this that needs to be dynamic is that
what I'm going to do is when it's expanded, I'll have the word collapse and when it's
collapsed I'll have a smaller button with just some arrows. So down here I'll say
`{{`, and once again we use this Turner's syntax will say `collapsed` and if it
is collapsed then we'll just say `>>` else, `<< Collapse`
Perfect. Now you're going to notice that he has, Linda is going to
highlight this. It's angry. It says he Eastland parsing air invalid first character
of tag name. It actually thinks that what we're doing here is opening an HTML tag

and that's actually a false failure from IES lint. And you might also be thinking,
Hey, shouldn't we do something like at less than, isn't that technically more
semantic? And it is, but we're not going to need to actually do that cause we, let me
go over here. There's a button you can see collapsed that looks perfect. And just to
show you, if I inspect element on this and I'm going to right click and say edit is
HTML and you can actually do the Vue, did the auto escaping for us? That's one of
the nice things about Vue. When you print something it automatically escapes it and
you have to use some special code if you want it to print in on escape away. So it
did actually print correctly. And this is awesome. Can I can go over here, play with
this. A set collapse in the sidebar to true and it gets small and you can see our
text changed as well.

Alright, so this is looking good. Now it's not really that important but there is one
other way to print the text here. If you have an element where the only thing inside
that is some dynamic text, instead of actually printing it inside the HTML, the
element which you can do is I'm gonna delete that. You can add a special, uh,
attribute called `v-text` and text as soon as `v-text` always has JavaScript inside. So I
can just paste that, oops. But I don't want the curly braces anymore. So  `v-text="collapsed..`
Uh, and then those two things and then down here and then technically that
works. But now that my element is empty view actually allows us to just have a
self-closing element. So if I go over and look over here, it makes absolutely no
difference at all. Um, and you can see it prints out the exact same way. So `v-text` is
one of the, one of those other directives, a small number of directives that you have
inside of you. You do not need to use this app at all. Um, it's technically a little
bit faster, but it's not really that important. I mostly wanted to just see that you
will see `v-text` sometimes.

So the last thing we need to do is we actually need to hook up this button. We need a
button to have some behavior on the specifically on click. We're going to change the
want to change the collapsed state. So so far inside of our template, the variables
that we had access to are either `data` or `props` and we don't have any `props` in this
case, but anything that's data and in him that's props we're allowed to reference as
a variable in our template. Turns out that there's a couple more things that you can
add and one of them is called a `method`. So I'm actually going to go down here and it
doesn't matter where, but after `data()` I'm going to add a `methods:` key and set this to
an object. And here I'm going to create a new method called `toggleCollapsed()`. And to
start I'm going to say a `console.log('CLICKED!')`. So the idea is that on click we're
going to have, we're going to tell view to call this method down here

now to add event to add a listener to an event. You're actually gonna go on the
element itself. And we're gonna use one other very, very important directive. It's
called `v-on`. So the way it used to be that John, did you actually say `v-on`
and then `:` and then the name of the event we want. So we just want to do
something on click this. So we'll say `click=""` and then inside of here it wants to
know what method to call when that's uh, when that event happens. So we'll say 
`toggleCollapsed`. So notice here, I'm actually referencing this as a variable which is
allowed down here because I added this method down under our `methods` key.

I mean, these are unfortunately not even smart enough to kind of realize that. So
`methods` is a new key that we're going to have. There's not going to be a lot more of
these keys, but this is one that you'll commonly have when you add a event stuff or
so if I go over here now and I click this, it's going to console, scroll down. These
are all, these are all old errors up here from while we were working. And yes, we see
it clicked. That is awesome. So this `v-on` thing is so important that it actually has a
shortcut syntax. And actually I'm going to go back to um, and we've already seen one
shortcuts index instead of view and it was actually the `v-bind`. Remember when you
have something like `:href` that's actually short for `v-bind:href`, which
basically says allow, uh, allow whatever is in the attribute to be dynamic.

So you do `v-bind` so much that instead they just let you say `:href`, which I like
a lot better. The same thing is true for V on. It's going to happen so often that has
a shortcut syntax, which is `@`, so when you want to listen to an event on an element,
you say `@click` or `@mouseover` or any of the events that you want to listen to and
it works the exact same way. Alright, finally we have a button. When we click it, it
calls our method down here. The last thing we'd actually deemed to do our method is
that if you change the collapsed state, and if you remember from a long time ago when
we first started working with

Sturtz first started working with data, how do you do that? You say `this.` couldn't
be easier, `collapsed=` in this sale, say not `this.collapsed`. And that's it. So the
data are actually accessible as a property on the this object inside of any methods
that you have inside of your element. So what you'll do is you literally just change
the value of collapsed. All right? So go over here now. It works perfectly. And if
you click on the view tools over here or go over to sidebar, you can actually see
that collapsed state changing and that's it. And right there, that is sort of
rounding out some of the most critical, um, components of view to get this to work.
We added a collapsed state, `collapsed` data, we even used that to print different
texts. And then on click, we added a custom method called `toggleCollapsed` to our
`methods` key on top of collapsed. We changed that data and view instantly updated.
This is going to be kind of a flow. You're going to see a lot for having dynamic
dynamic data and then having behavior that changes that dynamic data. Next, I want to
talk a little bit more about how the `this` variable works behind the scenes and
uncover some of the magic behind vue.

