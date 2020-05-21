# Child Component

Coming soon...

Our `products.vue` file is known as a component in the entire system of Vue is
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
an area of your DOM has special functionality needs to be reused or we'll just make
this template easier to read, that's a great reason to extract it into its own
component. So let's do that now with our legend components, not particularly complex,
but let's pretend that we want to reuse this, this markup here so that we can include
a legend in different parts of our application and pass in different texts every time
that we include that component.

So inside of the `js/` directory, I'm printing a new sub directory called `components/`.
Notice I'm not putting this in `pages/`. Pages is sort of meant for our top level
components. components has meant for a little bits and pieces, uh, components that
can be that, that can be reused even if they won't be reused. So inside of here,
we'll create a new file called `legend.vue`. And we're gonna start the exact same
way. So I'll say `<template>` and inside of here, let me go grab my `<span>`. I'll paste
that. And just to keep things simple. I'm actually going to temporarily copy my old
legend text and hard coded inside of here, so nothing dynamic at all yet. The other
thing that we have to have is a `<script>` tag with `export default`, our object
inside of here, we're going to give it a `name`. We always want to have at least that
`name`. Cool. Now to use this inside of our products template, it's a three step
process. The first thing is inside of our `<script>` tag, just like any normal
JavaScript, we need to import it. So I'm gonna say `import LegendComponent...`. I could
call that anything `from '../components/legend'` second. Now that we've imported that,
we need to add a new key down here called `components`.

So as I keep saying, there's a number of options that we can pass down here to our
view object. There's not a thousand of them but this. But obviously we have `name`
`data()` and now we have `components`. Instead of here, we can list any components that we
need to become available inside of our application. Now if I stopped right here, it
would make no difference. This just makes the `LegendComponent` available to our
template, but we're not using it. In fact, that's why Vue is unhappy. It says 

> The "LegendComponent" has been registered but not used.

Because the last step is to go up into our template here and let's take out our old
code and here we're going to treat it like an HTML element. We're going to say less
grit, `<` and you're probably expecting me to say `LegendComponent` like you
see here. That would work. But instead I'm going to use the kebab case diversion and
then close that tack. So the `<legend-component />`, I could have to have `LegendComponent`
just like I had here and that would have been legal, but view also makes any of the
components you registered down here available as kebab case with dashes and they do
that just so that you can write code up here. That kind of follows the HTML standard
of lowercase and dashes, but it doesn't really matter.

All right, so we move over now refresh and it still works just fine. And check this
out over my Vue. Developer tools. Ha. We can see our component structure growing
I've `<Products>` and now I now have a `<legend>` inside of products. Awesome. Of course, the
only problem is that this text isn't dynamic anymore. We hard-coded it inside of
legend because what I really want to have happen is I want whatever component, like
products that view is using this, I want to somehow pass the value into it. So we
need some way to pass values into this components, and then we need a way to receive
those values and then use them dynamic. And you hear the answer to that is one of the
most fundamentally important concepts to Vue or any front end framework props. Let's
talk about them next.

So in PHP, if we wanted to call a function but have that function behave differently
every time we called it, we would give that function in argument. In Vue. The way
we're going to pass data into a component is we're going to give that component a
prop. So here's how it works. I'm going to introduce a new key to our options here
called `props` and initially we're going to set this to a simple array inside of our
essay `title`. What this says is that any, any component that uses the `LegendComponent`
can pass us a `title` prop

and then
to use that `title` prop up here out the we are hardcore text and we can say `{{ title }}`
and that's it.

So now this component is perfect. It says we accept a prop called `title` and we use
that title up here over `products.vue`, how do we pass that into the components?
The answer is that since we made a prop called `title`, we pass it as an attribute, so
`title=""`. Then here we can just put whatever we want. So I'll say to do put
legend here and that's it.

Whoever it refresh and we got it and one of the cool things is is that in addition to
data, so I I like click on the `<Products>` here you can see I have my `data` called
`legend`. When you click on the `<Legend>` component, you can also see the `props` inside
of here. Now one important thing to understand is that data is something that you can
change. You can see there's a little pencil icon over here and we're gonna talk more
about that as we make our Vue application dynamic. We're going to be changing data
all the time, but prompts. Once you pass a prop into a component, it's read only you
can those. There's no like little edit icon. It's not, we're not intended to ever
modify this prop. You'll never see me put code inside of legend that would change
this prop. It's just something that we receive and then use again a lot like
arguments to a function. In PHP. We don't usually change the arguments to function.
We just receive them and then we use them. Now, one thing quick thing I do want to
point out here is that to use a proper use `{{ title }}`. Now you'll notice,

you may remember earlier that when we used a data like our legend data, we did the
same thing we did. We said `{{ legend }}`. You're going to see this a lot more.
But when you're inside a view here and you print a variable, the variables that
you're allowed to print are your `data` and `props`. So this here could be a data or it
could be a prop. They're rendered in the same way. So data plus profs ended up being
the full, uh, thing that you use. I'll explain that better than the real thing, but
of course, just passing a hard-coded value here to do put legend here is not actually
what we want. We have this dynamic `legend` data down here. What I really want to do is
pass whatever this dynamic `legend` data is into the `title`. How can we do that by
leveraging a massively important concept called `v-bind`? That's next.

