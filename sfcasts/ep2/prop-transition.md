# Prop Transition

Coming soon...

When we click our button here, I want to also transition the title right now. It just
kind of jumps instantly, which is not that big of a deal, but we can do better. So
cool. Over here, there's our title components. Let's wrap this in a transition. I'll
actually

Transition. Okay. Rabbits out component. And then I'm actually going to give it the
same name and mode as we used before. So the big question is, does this work, are we
allowed to transition a prop change? It's not like we're hiding and showing this
component. We're just changing the value that's passed into the text. Prop answer is
sort of, if you try it right now, you actually get rid of my tools. It doesn't work.
I mean, it changes the title, but the title changes instantly. There's no transition.
The truth is that there is no built in way for view to transition a prop changes. And
it makes sense. All of you knows how to do is add some classes when an entire element
or component is being hidden or shown a prop change is much more complex than that.
In reality, the title component isn't being hidden and shown. There's just something
changing inside of it. View does have documentation of how you can add transitions to
a prop change, but mostly you're doing it on your own manually. However, it is
possible to do, to do this at least sort of over in the components on the title
components, add a new key prop. Yeah. The same one that we normally use in, um, loops
and set this to something that will be unique for each title like current state,
because we know the page title is based on the current state.

We could also probably just use the page title. Anyways, we move over, try. Now it
works. The title fades out and fades in just like the rest of our forum. So how, why
did that work what's going on? Okay, well, when the component re renders, when our
component renders, the title component will have a new key value will not have a new
value for its key prop. This actually tells view that this new title components is a
totally different title component than the one it was using before. So instead of
just re rendering the same component, but passing in a new text prop view completely
destroys the old title components and completely and creates a brand new title
component. And that means that view can transition the old component out and then the
new components in. So yeah, it works great in this case, but it's kind of a nuclear
option. If our title component had some data inside of it, that data would be
completely lost every time we switched because we're destroying and then recreating
the component. So it might work in some cases might not work in other cases. Anyways,
I'm super happy with this. So next let's add a form to our checkout page.

