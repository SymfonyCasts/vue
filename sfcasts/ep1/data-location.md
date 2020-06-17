# Data Location

Coming soon...

All right. This collapsed thing looks good. Except you'll notice that the layout
doesn't change, probably collapse the sidebar. I'd probably want the main part of my
page to move over and take up a bit more space. The problem is if I inspect element
on this, when we collapse the sidebar, we really want to have happen.

Okay.

Is we want this? We need to actually change the classes on this aside. And this dip
probably needed to change.

We need to make this a size smaller, and then we need to allow this div to expand and
bigger. Okay. So no problem. That's just dynamic classes on those two elements.
Right? Well, the issue is that the collapsed data lives inside of sidebar, but those
classes, those elements we need to change. Don't live inside sidebar. They actually
live inside products that view some products that view, this is the aside, and this
is the div that whose classes need to change based on that collapsed state. So very
important thing I want to say right now, a piece of data, like the collapsed data

should never be duplicated. It must always live in exactly one spot. So what we're
not going to do is create another collapsed data inside of products so that we can
use it. And then somehow try to keep the collapse, that data and products in sync
with the class data in sidebar, never duplicate data. It must always live in exactly
one spot. Now, if you use something like view X, then there's actually a central data
store outside of your components where all of your data live inside of, but if you're
not using Vue X, like we're not using view X, then your data lives directly in the
components. And so one natural question, whenever you have a piece of data, is which
components should this piece of data live in? Like, why did we put cleft instead of
sidebar instead of, instead of maybe instead of products that view the answer to that
question is that you should always put a piece of data on the deepest component that
needs it.

And by deepest, I'm referring to the component hierarchy over here. So sidebar is
actually a deep component. Products would be a higher component. Now until this
moment, the only component that needed access to the collapsed data was the sidebar
component. So it made perfect sense to put it inside the sidebar component. But now
that we realize that we, but now we realize that we need to be collapsed. We need to
know what the collapsed data is inside of the products components. And so what we're
going to need to do is actually move the collapsed data from sidebar up into the
products components, because it will now be the, and then we'll pass that data down
into the sidebar component as a prop. And you'll see that. So inside of products of
you first I'm going to do is add that new data. So I'll make the data function and
here I'll return and let's call it sidebar collapsed. So we know what works what's
glassed, and we'll initialize it to false. And then I'll put lots of ending
characters.

All right, simple enough. We now have access to a sidebar, collapsed data inside of
products. That view, of course, our sidebars also going to need to know what this
value is. So we're now going to pass this as a prop. So I'll just invent a new prop
called collapsed. So I'll say colon collapsed because we want to set this to a
dynamic value = sidebar collapsed. Perfect. So now, now that we're passing a
collapsed prop and a sidebar to actually make it possible to receive that we need to
add it as a prop down here. So I will say props set to an object and then we'll have
one called collapsed and we'll put our normal,

it's our normal type Boolean. And I'll say required to always make sure that that's
passed into us. And I know temporarily I have a collapsed prop and a collapsed data,
and you can see that PHP storm is trying to tell me that's not going to work. And
it's right when we don't want a collapsed date anymore. We just want to have the
collapsed prop. Now, the cool thing about this, because I called the new prop,
collapsed most of our codes, just going to work up here instead of our template,
referencing collapsed a second ago. That was data. Now it's just going to be a prop
that's passed from our products component, but it should work just fine. So in fact,
if we go over and I don't need to refresh, I'll click on the product component here,
you can see my new sidebar collapse and I'm going to change that to true.

Oh, okay.

So I'm going to move over and refresh just to be safe. And if we click on the
products thing, you can see my sidebar collapsed here, and I want to change that to
true. And the sidebar collapses. If you go up on sidebar, you can see that the prop
true. Uh, whenever we change the sidebar collapsed,

okay.

Data. It changes the prop on the sidebar, the class data prop on the sidebar of
course, and everything still works fine. In fact, if you click this button that still
works too, but with a caveat, check out your console, ah, giant horrible error. It
says avoid mutating a prop directly since the value will be overwritten whenever the
parent component re renders. So here's, what's happening here. We are able to
reference the collapsed prop inside of our sidebar components, but down on our
button, when we click it, this call's toggle collapsed. I'll jump to that. And here
we are actually changing the value of a prop. And I told you, changing the value prop
is something you should never ever, ever do. Props are something that you should only
read.

Now you might be thinking, yeah, but it works. I changed this prop and it totally
changed everything. Totally rerender and you're right. Except you can actually see
the problem. If you look at the view dev tools. So when we change the sidebar prop
directly, so you can see the collapsed false right there as I hit this, that changes
perfectly false. True. But if you look at the products, data, sidebar, collapse is
false. When I hit that, that is not changing. So we've basically taken our two
collateral. We're our collapsed States. And we're actually, uh, we can't set a
profit. It's not the source of truth. What we really need to do is somehow have the
sidebar, tell the product's component, Hey, this collapsed state should change. And
then have the products component change its own data. Once I got how to do that next
to the answer is emit.

