# Emit

Coming soon...

The sidebar collapsed data now lives inside of products because in a minute, we're
going to use it to dynamically change these classes on these elements. And then we
pass it as a collapsed prop into sidebar where we can happily reference that instead
of our template to do various things.

Yay.

The problem is that when we click this button here, what we really want to do is
change the data on the parent components. I'm going to change this sidebar collapsed
on products dot view, but you can't do that. You can only change the data that is on
your own component. So here's the deal. We already know how to communicate
information down the component tree. We do that via props so we can communicate the
cyber collapsed state down into sidebar via a prop, easy enough, but how do we
compute? How do we communicate up the tree?

Whenever a child component needs to change the data, have a parent component or more
abstractly. Whenever a child component needs to communicate that something happened
to a parent component, like the collapsed button was clicked. It does that by
emitting an event. So check this out inside of you, let's go down to the toggle
collapsed method. That's being called on click. And of course we don't want to modify
the prop directly. That's a problem, instead of going to say this.emit, which is a
function there, aren't a ton of functions on the, uh, view instance, but, but there
is one called the mint and it's one of the most important ones. Instead of here, I'm
going to admit an event called toggle collapsed, which I totally just made up. It's a
completely custom event that we're admitting now without doing anything else. If we
go back over here and I'll refresh, don't really need to refresh. And I go down here
and click on sidebar and you see over here so far, we've been paying a lot of
attention to the prompts, data and commute and computed, but there's also a spot here
called events. This will show you the events that that component is emitting. So now
when we hit the collapsed thing, of course it doesn't collapse anymore, but you can
see that it's emitting, that toggle collapsed, um, uh, event, which is pretty cool.

We're going to be able to listen to that event from our parent component.

Now, before we do that, I'm calling this.dollar sign emit is completely fine here,
but we can actually simplify this. I'm going to call it, copy the dollar sign, admit
code. I'm going to delete the method entirely. Yeah. And then up here on the app
click, which is V on click I'll use Donna's emit toggle collapsed because remember,
whenever you reference a variable or a function set up instead of a template, it's
really this.dollar. Sign them up behind the scenes, which is exactly what we were
just calling. So this just shortens it here. This amidst that same event, every time
we click

[inaudible]

alright. So the second step is we needed to go into the products component and listen
to that event. So I'm going to make the sidebar component on the sidebar on multiple
lines here. And we're going to use is V on really? This is no different than what we
did in sidebar here. We wanted to listen to the button click. So we used V on click
or at click for short, and then on click, we wanted to execute some code. This was a
native Dom event, but it works no different than a custom event that's being
dispatched from your component. So I'm going to do the long way. First, I'm going to
say V dash on, and then here, I'll say toggle collapsed equals, and then also call a
new method called toggle. Sidebar collapsed a copy of that because that method
doesn't exist yet. Now down here on our component, we don't have any methods yet. So
let's add a methods key. And inside here, we'll credit one called toggle sidebar
collapsed. And very simply, just like we used to have in our sidebar. It's just going
to be this, that side bar collapsed = not this.sidebar collapsed.

I love that. Now our components are communicating when I had this collapsed down here
that is not working. Let me refresh in case we lost connection here. There we go. It
works. So you can see the hot module replacement is not perfect. It works. You can
see it's submitting our events and back over here. We're of course seeing the
products, data change. That is the proper way to do things. Now that we have that
working. Uh, I wanted to show V on. So you're thinking that this is what's going to
happen on the top of collapsed events, but really we're going to use the shortcut
syntax everywhere. So at toggle collapsed and that was fun. All right, so we've done
it. We moved

the data up to the parent components and we're communicating back and forth
perfectly. This is a pattern you're going to file many times passing data down the
component tree is props, and then communicating back up the tree by emitting at
event. So let's finally use our new sidebar class inside of this class. Now, right
now, the way it works is it just basically makes this a sidebar. It just gets really
skinny, uses 70 pixels. We're actually going to go and [inaudible]

sweating on the sidebar, the styles and sidebar. We're adding this collapse them, or
I'm going to remove this collapsed class entirely. And we're just going to completely
simplify. I want a copy of the three classes out of my classes and delete my computed
method entirely. If this is confusing, you don't worry. Basically all we're doing
here is we're just going to go back to using the normal three classes, nothing
conditional at all, because we're going to move all of the, um, all the changes up to
the parent component. So over here in products that view the classes on the aside and
on the Dave are now going to need to be dynamic based on the sidebar collapsed data.
So this is a perfect situation for a compute for some, for some computed methods. So
let's go down here and I'll add computed and we will create two of them. I'll create
a first one. I'll call it a side class to determine the, uh, classes for the aside.
And for this, we can say return this.sidebar collapsed.

Okay.

If it is collapsed, I'm going to use a class called a side collapsed. That actually
doesn't exist yet. I'll talk about that in a second. And then if we are not
collapsed, we'll use the normal call X S 12 and call dash three. I can see that's
almost perfect to have a WebEx mat maybe because this is a function, Ryan, not a key.
There we go. WebEx found my back. All right, I'm going to copy this and call it
content class for the second one. And for this one, we'll just use slightly different
classes. Call X S 12, call dash 11 so that it takes up almost all of the space, um,
when it's collapsed. And then when it's not collapsed, we'll use the normal call X S
12, call dash three so that it shares this space or nine, I mean,

alright, so now that

we have these two computer classes, well, I've actually look over here. You can see
the old East Lindt Warren. He says the computer property should be above the method's
property. That makes no difference at all. But Eastland does have some, there are
some recommendations on the order of these things. So I'll move this above methods
just to keep it happy and follow the standard. All right. So now maybe these two keys
inside of a computed, it means we have these two new variables inside of our
template. So up here, very nice. We can say class on the side, we can say class =
aside class or S but of course, since we want that to be dynamic, we need to say
colon class. And then the same thing down here, we'll use content class. Be auditive
make sure we do the colon, the V bind so that it reads that as a dynamic variable.
Phew. Okay. So now let me move over. I'll refresh just to be safe. And ah, it works,
of course, we could maybe do some animations to make this a little bit smoother, but
on a view level, like this is working perfectly, although I could use a little bit
more padding right here when it's in that collapsed state kind of push things over.
So it's not so tight up against that.

And also, so that it's not against the corner of the page.

So the way that we could do this, we can do this in a very simple way. This is
actually the class here we could. Uh, we could basically, maybe instead of this, this
is a side class is something I invented. We, um, to make this work, I would normally
have done something like this.style that some class like a side collapsed, which in
this case you'd actually need to do like this. And then we could run down to the
bottom of this, uh, class and add a new aside collapsed class to the styles on this.
But I actually did the side collapsed like this on purpose. The idea is let's pretend
that this whole, this whole, this extra padding that we're going to add for the
collapsed state is actually a class that we want to use in various components across
our application. So I actually don't want to put it as a style in this component
because it's actually something I want to share.

So I'm trying to reuse my code as much as possible. So instead I've decided to just
say aside /collapsed and then inside of my SCSS apps, the SCSS at the bottom here.
I'm just going to add the styles right there. So that sidebar collapsed. And what I
want is padding zero 15 pixels. And that's it. If I go over now, you can already see
that looks a little bit better. So this was just a little reminder that while it's
very convenient to add styles at the bottom of your components like this, if you do
have something that's reusable, continue to file CSS best practices and put them in
reusable, CSS files, um, and that'll make life awesome. Our next it's finally time to
make some Ajax calls.

