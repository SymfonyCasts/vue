# V Bind

Coming soon...

We added a `title` prop to legend so that we could pass this property into the legend
component that allows us to reuse the legend opponent in multiple places and pass
different texts each time that we use it by passing this `title` prop here. But in this
situation, I want to go a little bit further. I want to pretend that this text here
is actually something that we want to change while our app is running. What this is
ultimately gonna be set to is our shipping message down here. Shipping takes 10 to 12
weeks and we'll pretend that if the user maybe uses the site for longer than a
minute, that we're actually going to change that shipping tax dynamically. The point
is, we want this text here to change while our app is running and values that need to
change why your app are running need to be data. Now we of course already have a
legend at data down here. We're just temporarily not using it. So what we really want
to do is we want to take this `data` that we already have on our products components
and we want to pass that `data` as the `title` prop instead of having this hard coded
text here.

Okay? Easy enough. We know that anything that is set as `data` or `props` is available
in our template. So let's go up here for title and we'll say `{{ legend }}`
And it says to do that, you can see Webpack Encore up here is freaking out. If I go
over and look, you can see it does not like that at all. It says interpolation inside
attributes has been removed. Use V bind or the colon, uh, syntax and so forth and
even gives you an example instead of `{{ val }}` use. `:id="val"`. Okay,
so here's what's going on here. Basically the `{{ }}` syntax that we can
absolutely use outside of the components can't, can't be used inside of an attribute.
If you want to print something inside of an attribute, you need to do something
slightly different for the attribute. You need to say `v-bind:`. And then
inside the attribute, just the variable name.

Let me do that.

It builds successfully before we talk about that lesson, move over, refresh and yes
it works so you can see that our data here is set to the string. That data's passed
into our `legend` prop so you can see that that matches there. Now the cool thing is we
can actually modify that data

it updates, updates the prop value. The new prop was passed and it renders, so that
is wonderful. All right, so let's go back and talk about this `v-bind` thing. There's
was actually going to be several of these `v-` things that are special to view that
we're going to talk about. `v-bind` is actually probably the most important one. Very
simply. If you want an attribute to be set to a dynamic value, then you need to
prefix it with `v-bind`. As soon as you do that, the attribute is no longer
just HTML, like PB dash two up here. This is now JavaScript inside of here.

[inaudible]

in fact, check this out. We can say plus open quote and say, this is really
JavaScript. We'll go over and refresh now. Yeah, so you can see you have, this is
really a JavaScript is on the bottom. It's got our data and then it's got that
dynamic part. So basically `v-bind` is what you're supposed to use when you need to
set a dynamic, usually dynamic data or dynamic prop to a `title` attribute. For me, I
honestly think of it like this. If I want to, if I want to use JavaScript inside of
an attribute, it needs, I need to use `v-bind`. That's what transforms this year into
allowing JavaScript. Now we're going to be doing this all the time. We're going to be
constantly setting attributes to dynamic values. For that reason, view has a
shortcut. Instead of `v-bind`, you can just say `:title`. That means the exact
same thing that is still `v-bind`. So the way I think about it is basically if I
have title it goes legend. That means that this is just going to be a legend string.
As soon as I need this to be JavaScript, then I prefix it with `:`. The `:`
basically allows my attributes to hold JavaScript from mover now and try it. It works
perfectly.

Now speaking of props, there's one little tweak that I want to do inside of my legend
component here. So remember in order for a `title` prop to be, in order for it to be
allowed to pass to us, we had to add this props option here and basically say we have
a `title` prop that we want to allow to be passed to us. Now if you'll hover over this,
you can see the eslint says prop title should define at least its type. So in reality,
in addition to saying we have a protocol type title, we can actually say this prop
title is a string or a number and we can all say if it's required or not. So instead
of using the erase index here, I'm going to use the objects in tax and set a `title`
key and I'll set that to an object. And I'm going to put two keys here. I'm going to
put `type` set to string. And then the other thing I can have here is `required` set to
true. Oh he is Linda's mad cause I messed up my indentation. Thank you. Excellent.

Yeah.

Now part of this is this does not change how my app works in any way. It's just to
help with my documentation. If we passed a number for the title, we would get an air
thanks to the type. If we forgot to pass anything at all, which we can try over here
temporarily, then we're going to get a better air. Cause it says missing required
prop title. Remember these prompts are basically arguments, but since they're so
dynamic, this is the actually the way that we allows us to serve type the arguments
and say what type they are and whether they're required. All right, next, let's talk
about something else. I'm not sure what it is.

