# Transitioning a Prop Change

When we click the button, I want to *also* transition the title. Right now, it
changes instantly, which is not that big of a deal... but we can do better. Back
at your editor, find the `<title` component and wrap it in a `transition`. Copy
the `name` and `mode` from earlier and use those here too.

So the big question is: does this work? Are we allowed to transition a prop change?
In this case, we're not hiding and showing a component, we're just changing the
value passed to the `text` prop.

The answer is... sort of. If you try it right now - I'll close my dev tools so we
can see things - it does *not* work. Well, the title *did* change, but it *still*
change instantly: there's no transition.

The truth is that there is *no* built-in way for Vue to transition a prop change.
And... that makes sense! All Vue knows how to do is add some classes when an entire
element or component is being hidden or shown. A prop change is *much* more complex
than that - who knows how we might be using it!

Vue *does* have documentation about how you can add transitions for a prop change,
but mostly, you're doing it manually on a case-by-case basis.

## Transitions and the key Prop

However, it *is* possible to, *sort of*, make this transition work. Over on the
`title` component, add a new `key` prop. Yea, that's the prop we normally use
in loops. Set this to something that will be unique for each title, like
`currentState`, because we know the page title is based on the `currentState`.

Move over and try it now. Ah! It works! The title fades out and fades in *just*
like the rest of the page!

So how and why did that work... right after I explained to you that you *can't*
transition prop changes?

When we click the button, our top-level component re-renders and the `title`
component *now* has a new value for its `key` prop. That actually tells Vue that
this the `title` component should be a totally different *instance* than the one
it was using before.

In other words, instead of re-rendering the *same* component instance, but passing
in a new `text` prop, Vue completely *destroys* the old `title` component and
creates a brand *new* one. This allows Vue to transition between the old and new
title because the old component is being hidden and then the new component is being
shown.

This works *great* in our case... but it's kind of a "nuclear" option. If our
`title` component had some data inside of it, that data would be completely lost
each time we switched because we're destroying and recreating the component. So
it might work in some cases... and not in other cases.

For us, I'm super happy with this. So next: let's add a form to the checkout page!
