# Computed

Coming soon...

So our collapsing thing works, but it looks terrible. What we really need to do in
collapse is probably hide all of these texts and links entirely. So if you look at
CyberKnife view up on the template, we effectively want to hide the H five, the UL
pretty much everything except for the button when we're in a collapsed state. So in
view, there are two ways to do this. First. I'm going to add a new div and wrap all
the stuff that I'm going to hide inside that dif because the way we're going to hide
them show in view is we're actually going to hide or show this element entirely. Now
the first one to hide things is via a new directive. And we've at this point, seen
almost all of the important directives called V if so, V if = then in here, we can
use a JavaScript expression. So we'll say not collapsed. So show this. If we are not
in the collapsed state.

Now, if I go over, I don't even need to refresh because we have the hot module
replacement on and it works much better. Now the key thing here, if you inspect
element on that button is you can see that with V if the contents are removed
entirely. So if I show it back, you can see the contents show and if I hide it, they
are gone entirely. The other way to hide things is with the show. Now, with the show
we're going to have, it's going to look the same, but the difference is that when we
hide in collapsed, the content is always there. It's just hiding and showing it. So
be show and be if really accomplish the same task, they just do it in slightly
different ways. Which one is more appropriate? Just depends on the situation. We show
us a little bit better when you're hiding and showing things a lot, I guess, hiding
and showing is really fast. If you have something that really won't be shown at all,
or only be shown in very rare cases, VF is a little bit better because if you use VF,
if here then I won't spend any of the time even rendering this stuff until you
actually need it, which is especially useful. If you had several different layers of
components here, it can make your whole application load faster instead of loading
all of these things, just to hide them.

[inaudible]

all right, while we're here. I also want to, just to clean things up, I want to
refactor our width away from a style and do this properly in a class. Now, before we
do that, there was one thing I wanted to do earlier that I forgot about. You notice
that down here in our styles, we have a single class called sidebar, and we're
actually applying that to the outside element on our, um, component. That's great. So
sometimes as a convention, when you have a class that is on the outside of the
components, you'll use the generic name components as basically a way to say this is
the, and then down here, update the class

name to opponent. So with this, it doesn't make any difference. It's just that if we
need styles, then we can always add a class on the outside element. We always call a
component and we'll always have a style that component, no big deal. You can use that
if you want or not now to remove this style here, let's go back down to our style
here and inside my back component, I'm going to add a new class at dot collapsed and
set this to with 70 pixels. So if you're not familiar with this syntax, it basically
means that, um, uh, if an element has both the component and the collapse class, then
it will get this with 70 pixels. Now, the tricky part here is that we need to
conditionally add this collapsed class, but there's not really a good way to do that.
Uh, I'll delete my style attribute. So there's not really a good way to conditionally
add something to this rate. For that reason view offer has a, a, another syntax when
you need to conditionally add some classes and it looks like this, instead of at a
rate, we're going to pass it in object. And then the key of every object will be the
class that you want to add. And the value will be true or false about whether or not
you want to add it. So since we always want these three classes, we'll say things
like [inaudible] true and [inaudible] true

so that they always show up. Now, you notice that Webpack is furious with me. And the
reason is that when in an object syntax like this, you can't reference a property. I
can't say style dot component as a property to an object. It just confuses
JavaScript. So when you have this situation, you need to put square brackets around
it. That's just kind of an ugly thing because of our style, that component that you
have to have here. But now with this index, that makes our job very simple. We want
to add the collapsed class conditionally. So I'll use that funny syntax again to say
style dot collapsed. Because every time we reference a class with module CSS, we need
to use these style dots. We need to get it dynamically off of the style variable.
Then here we want the collapsed variable to show if the class state is true. So we'll
just set it to collapsed. All right? So we can go over now and hit it. Perfect. You
can see our class here hiding and showing. Now there's one other way to do this.
That's a little bit cleaner. This is not too bad, but this is kind of a lot of logic
to have inside of our template in a more perfect world. A better solution might be to
calculate which classes this component should have in JavaScript using normal. And
then pass that into our template as a variable.

In fact, when you need to calculate a, any, whenever you need to calculate a value,
like in a way of classes, based off some props or data, the way to do that is with a
computed value. Here's how it works down inside of our JavaScript code. It doesn't
matter where of course I'm going to add a new option called computed, and this is
going to be set to an object. It's going to look a little bit like the methods inside
of here. Cause we're going to add methods. Some of that, a new one called components
class. We could call that anything. This is going to return the array of classes that
this component should happen. Don't worry about how we're going to use it yet. Let's
just start by filling in the logic. So first I'll say constant classes = and set that
to an array with the three classes that we always need. this.style dot components.
We'll talk about that in a second. And [inaudible], and [inaudible] perfect. And then
at the bottom I'll return classes, and I'll worry about that conditional class in a
second, but real quick, I'm going to talk about this.style that components.

We know that as soon as we add module to our style tag view makes a new dollar sign
style available, variable available in our template. And we use that to say things
like dollar signs, style dot component. Well, a few minutes ago, we learned that
anytime you referenced a variable inside of a template internally, what that really
does is it calls this.style actually calls style as a property on the view instance.

[inaudible].

So even if we knew nothing else, the very fact that we can, we can say we can
reference a dollar sign style variable in a template means that it, the view instance
has a dollar sign style property. In other words, it means that we are allowed to say
this.dollar sign style inside of JavaScript. So that's why that works now for our
actual custom logic. I'll say if this.collapsed to reference our collapsed state,
then classes that push this.style. Once again, that collapsed. Perfect. And that's
it. And of course, with any methods, if you want to, you can add some documentation
above it

and Peter's arm tries to guess the return type on here. It gets a little confused
view is very dynamic, so let's help it out. This is a, an array of strings.
Excellent. So here's the deal. As soon as you have a key under computed class, this
becomes available in the template as a variable. So I'm going to copy component class
and up here, very simply we'll say colon class = component class. And I can even just
simply move our div on a one line. That's it. So up until now, we know that view adds
any data prompts or methods to the view instance as to the view instance, which means
that we can reference those inside of our template. Well, computed as the fourth and
final thing that gets added to compute to that instance view also adds any of the
keys under computed to the view instance, but it doesn't have them as methods. It
actually adds them as properties. So in up here, we can just reference component
class, which is really this.component class. And behind the scenes view is going to
call this method component classes to get that.

So, because this is being added to the view instance, just like methods or data or
props, it means that we can actually reference it, uh, with the, this variable. So
just to prove it inside of my toggle collapsed, I'll say console.log(, this.component
components class. Now those features Durham tries to auto complete that with
parentheses. That's not correct. We need to reference it like a property, even though
behind the scenes, we know view is going to call this method. So for go over now,
check that out. You can see the log and it is logging the component class. Every time
we change it, we can see a new log. You can also see this over in the view developer
tools, click down on the sidebar. Um, we have data, but now you can also see the
computer classes as you hide and show that that's going to change dynamically. All
right. So let's go back over here and remove our console.log(. Next. Let's talk about
something else.

