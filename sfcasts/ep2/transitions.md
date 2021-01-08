# Vue Transitions

Coming soon...

is that view simply adds
display none to hide or show an element. But what we need is for view to change the
opacity from one to zero and then zero to one, or really more generically. What we
need is for view to add a new class when it's hidden so that we can add the opacity
zero to that class, just like we are currently doing with our hidden class, that
would make things work just like before the key to doing this is by surrounding the
element that we're hiding in showing with a special transition components. Check this
out. I'll add transition, put that on the other side of our div. And then I'll invent
things to make my editor happy. But I want to be very, very clear about what this
transition component does and does not do so first, if you move over here and click
you'll notice, there are still no transitions,

But it is a little weird because you'll see it actually waits a couple seconds before
it actually hides it. There's actually more going on. There's actually something
special that's happening. Now when we look at the inspected element, move over and
I'm actually going to do a full refresh just to be safe. Now, check this out, let me
click it. It doesn't even hide anymore. Oh, wait. It did hide what it took a few
seconds when we click it again, it's instantly back. That is a bit odd now. Inspect
element on this div here and watch it really closely when I click it. Okay.

Thanks for the transition component. When we hide the element view, temporarily adds
a few classes and then after three seconds, it then hides it with display. None. When
we show it, it temporarily adds. If you other classes, obviously those classes by
themselves, do nothing, do not add any CSS transitions. It's still hiding and showing
a, without a transition, but we can use those classes. That view is adding in our CSS
to add the transitions we need. And this whole thing is actually cooler than it looks
like over the CSS of our components. I want you to temporarily comment out the
transition opacity three seconds.

Then back to the watch this time on the div, as we click the button, boom, it
instantly hides and shows those classes that I was adding are gone. The transitioning
opponent actually looks at the element that's being hidden or shown and detects if it
has any CSS transition, if it does, it uses that to know how long to add those
temporary classes. So remove this comment and put it back. Now when we click watch
those classes are added for exactly three seconds. And then the display not as added
view does this so that our CSS transition, which is not quite working yet has T has
the time it needs to finish before view finally removes the element with display
none.

So to get these CSS transition working, all we need to do is use these transition
classes. That's view is adding instead of the hidden class that we were using before
is the hidden class two B V dash enter comma V V dash leave dash two. Okay. And also
change the main transition testing class to the B dash enter dash active and dot V
dash leave dash active I'm referencing those classes we were just seeing, but don't
worry. I'm going to explain how this all works in a second back up in our com
template. We can also remove this classical transition testing because we're just not
using that anymore.

All right, before I talk about this, let's dry it go over and beautiful. It takes
three seconds to fade out, takes three seconds to fade in, to help explain this
Google for view transitions, and find their enter, leave and list transitions page a
bit down this page. They explain what those classes do in really good detail,
including a little diagram on our page. When we first clicked this button, we're
hiding the element. So we're on the leave side of the diagram here. What view does is
cleverly add at just the right time so that we can add CSS transitions. So when we
hide an element view, first adds this V leave active class. This remains on the
element during the entire transition. So the entire three seconds, this means that
before anything else starts, if we go back down to our CSS, are the V leave active,
gives our element a three second transition, sets it as wanting a three-second
transition.

Then view ads, the V dash leave class, which doesn't actually do anything in our
case, which means that the opacity at that moment is one. Then one frame later, it
removes V leave and add V dash leave dash two at the same time. This thanks to our
CSS, changes the opacity from one to zero, the results, a three second transition
from opacity one to opacity zero after three seconds, all of these classes are
removed and the item is given display none. Now let's check out the other direction,
enter the enter direction where we're going from hidden to displayed. Once again,
before the process starts view ads, the V enter active, uh, class. And this
establishes that our element should have a transition on opacity. Okay?

Next it adds V dash enter. This is important because of this changes. This says the
opacity in the element to zero one frame later view removes the display, none from
our element. So at that moment, the item is technically displayed, but it has an
opacity of zero one frame. After that view removes the enter and adds V entered two
by removing V enter the opacity changes from zero back to the default one. And that
triggers the nice three second transition. The V enter two in our case, doesn't
actually do anything because it doesn't need to. Then finally, after three, the three
seconds is done. All of these classes are removed. Phew, pretty wild, right? You can
kind of see this. When you click the button here, you can see the elements being
added, but some of those elements are added for literally one frame. So you can't
even see them being added here. So if you transitions are a way to intelligently add
a set of classes at just the right time, when an item is shown or hidden with either
V show or VF by themselves, these classes don't actually do anything. Don't actually
add any transitions. That's our job with the CSS. Next let's use this transition.
Let's use this to transition between our two components, the checkout form, and our
shopping cart. We'll also talk about transition modes and transition the title as
well.
