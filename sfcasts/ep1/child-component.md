# Child Component

Coming soon...

Our products. That view file is known as a component in the entire system of view is
component based. A component represents as you can see, a set of HTML and just like
how HTML elements can be placed inside of each other. We can actually place
components inside of components. So for example, we could replace entire, we could
move entire sections of this, of this component into another component and then
include that component inside of here. And it's actually a great idea because if we
didn't, if we put everything inside of this one components, this would eventually be
a very giant, very complex file.

Being able to extract parts of this into other components is going to help us
organize things better and it's also going to make those other parts reusable a lot.
Like how in PHP, if you have a large function, you might take parts of that function
and organize them into other classes either because you need to reuse them or maybe
just because it makes your code more readable and better organized. So in general, if
an area of your Dom has special functionality needs to be reused or we'll just make
this template easier to read, that's a great reason to extract it into its own
component. So let's do that now with our legend components, not particularly complex,
but let's pretend that we want to reuse this, this markup here so that we can include
a legend in different parts of our application and pass in different texts every time
that we include that component.

So inside of the JS directory, I'm printing a new sub directory called components.
Notice I'm not putting this in pages. Pages is sort of meant for our top level
components. Components has meant for a little bits and pieces, uh, components that
can be that, that can be reused even if they won't be reused. So inside of here,
we'll create a new file called legend that view. And we're gonna start the exact same
way. So I'll say template and inside of here, let me go grab my span. I'll paste
that. And just to keep things simple. I'm actually going to temporarily copy my old
legend text and hard coded inside of here, so nothing dynamic at all yet. The other
thing that we have to have is a script tag with export. Export the fault, our object
inside of here, we're going to give it a name. We always want to have at least that
name. Cool. Now to use this inside of our products template, it's a three step
process. The first thing is inside of our script tag, just like any normal
JavaScript, we need to import it. So I'm gonna say import legend components. I could
call that anything from.dot/components/legend second. Now that we've imported that,
we need to add a new key down here called components.

So as I keep saying, there's a number of options that we can pass down here to our
view object. There's not a thousand of them but this. But obviously we have named
data and now we have components. Instead of here, we can list any components that we
need to become available inside of our application. Now if I stopped right here, it
would make no difference. This just makes the legend component available to our
template, but we're not using it. In fact, that's why view is unhappy. It says the
legend component has been registered but not used.

Okay.

Because the last step is to go up into our template here and let's take out our old
code and here we're going to treat it like an HTML element. We're going to say less
grit, less than, and you're probably expecting me to say legend component like you
see here. That would work. But instead I'm going to use the kebab case diversion and
then close that tack. So the legend component, I could have to have legend component
just like I had here and that would have been legal, but view also makes any of the
components you registered down here available as kebab case with dashes and they do
that just so that you can write code up here. That kind of follows the HTML standard
of lowercase and dashes, but it doesn't really matter.

All right, so we move over now refresh and it still works just fine. And check this
out over my view. Developer tools. Ha. We can see our component structure growing
I've products and now I now have a legend inside of products. Awesome. Of course, the
only problem is that this text isn't dynamic anymore. We hard-coded it inside of
legend because what I really want to have happen is I want whatever component, like
products that view is using this, I want to somehow pass the value into it. So we
need some way to pass values into this components, and then we need a way to receive
those values and then use them dynamic. And you hear the answer to that is one of the
most fundamentally important concepts to view or any front end framework props. Let's
talk about them next.

Okay.

