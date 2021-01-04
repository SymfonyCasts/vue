# Transition Mode

Coming soon...

As we just learn view ads, these V dash classes to our element when it's being hidden
or shown, we actually have partial control over how these classes are named web and
the template on the transition ad name = fate. What does this do? Go watch your
browser. Watch the element itself as we click.

No, that's not gonna work.

What does this do? Very simply it changes that prefix. Now down the element, instead
of V dash, we can add everything is going to be called fade dash. So we could have
named that said that name to anything. Fade is a good name because the CSS classes
fade in and out Now to move over and try it. Yep. It works just like before, except
you can see the classes are different. The advantage of this is that you could have,
you could have CSS in your project for several different types of transitions, like
fade, and then you can use whichever one you need in your room

Opponents. Okay.

Now that we are viewed transition pros up in the template, I'm going to remove that
temporary element. Our real goal is to transition between the shopping cart and
checkout components so that it's not so abrupt. So cool. Let's just wrap each of
these components in their own transition component. And we couldn't do that, but
we're also allowed to wrap them both inside these same transition component templates
out let's add transition name = fade so that we use the same CSS classes and we all
wrap both elements, both components, and then I will indent them.

Okay.

Wrapping multiple elements or components inside a single transition only works when
you're using V if not V show. And it only works when there's exactly one element or
component being displayed at a time. So there's only works because we're either going
to be, uh, rendering the shopping cart list or the checkout form. Thanks to these V
ifs. I'm going to talk a little bit more about that later anyways, when we try it.
Yeah. It can even say it faded in quick checkout fades out.

Beautiful. Wow.

A little bit weird. The weirdest thing is that that three second transition is way
too long. So over in my component, down at the bottom, let's change that from three
seconds. 2.2 seconds

Back over that is better,

But it's still not perfect. It's kind of jumpy. The problem is that the new component
is already being shown and fading in while the old component is still there and
fading out. So it kind of jumps a little bit, fortunately, because we wrapped a, both
of these components inside the same transition.

We can

Leverage a cool mode option on the transition itself, say mode = out dash in this
says, fade out

And

Then fade in the new one instead of doing them at the same time. So now over here,

They're awesome.

Let's see it fades out all the way before the new one fades in. So it doesn't jump.

Okay.

So there is one problem with this approach of wrapping two elements or components
inside the same transition though. It's not very obvious right now because we're
using V if on these two components, whenever we click the button, the old component
is completely destroyed. And when we click back, it's completely recreated. That can
be a slight performance issue. But the bigger problem is that all of the old date,
all the old data is destroyed. This will be more obvious in a few minutes when we add
a true checkout form, if we fill out a fee, if we filled out a few fields on here,
then click back and then back, and then to check out those fields that we have filled
in would now be blank because the component would have been recreated with new dates.

The solution

Would be to make these components smarter. Basically we would rely on the F for
complete cart because we can't run there until we have that variable and then use V
show for the things life, current state.

Perfect. Right. Okay.

Then I'm going to changing state. It's not actually destroying our component.

The problem is,

Is that this doesn't work transition can only be used on a single element use
transition group for lists, which is not exactly a solution for us. So basically we
can't wrap unless things are using V if exclusively, we can't wrap two components
inside a single transition tag. So what is the solution? It would be to wrap each of
these in its own transition tag. So we'd have a transition tag on the shopping cart
and then another Jensen tag around the checkout form. The only problem is that when
we do this, we can no longer use the mode option, which is what helped us with that.
Jumping this one common work around that is to absolutely position each of these two
components on top of each other, so that as they fade out and fade in, they do it in
the same spot instead of jumping up and down anyways, I'm actually going to undo this
back to VF and leave our setup alone. If I go over here, I'll refresh to be sure. And
yes, things are working again, though. There is one more thing that we need to
transition. It's actually the title on the page. If you watch it just changes
abruptly, not that big of a deal, but it would be cool if that faded out and faded
back in as well. And this one is kind of interesting because in this case, we will be
transitioning over a prop change. Let's talk about how to do that next.

