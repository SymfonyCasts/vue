# Props: Passing Info into a Child Component

The text inside the `Legend` component is static. That won't work!
Remember: our goal is to be able to re-use the `Legend` component from other places
in our app and *pass* it the text that it should render. Somehow, we need to
pass a value from the `Products` component down *into* the `Legend` component.

In PHP, if we created a function and needed some info to be passed *into* it,
we would add an argument to the function. Simple! In Vue, components have a
*similar* concept called "props".

Here's how it works. As soon as I need something to be passed *into* a component,
that component needs a `props` option. Set this to an array with one key for each
prop that an outside component should be able to pass. Call the one prop we need,
how about, `title`.

Thanks to this, any component that includes this component is now *allowed* to
pass a `title` prop to it. We'll see what that looks like in a minute.

To use these, Vue makes all `props` available as variables in the template. Replace
the hardcoded text with `{{ title }}`.

This component is now perfect: it says that it accepts a prop called `title` and
then we use its value in the template. Lovely!

Back in `products.vue`, how can we *pass* that prop to `legend-component`? By
adding an *attribute*: `title=""` and then whatever value you want, like
`TODO PUT LEGEND HERE`.

## props are Read-Only

That should do it! When we refresh the page... it works! And the Vue dev tools
are even *more* interesting! If you click on `<Products>`, you can still see the
`legend` data, though, we're not using this anywhere at the moment. And when you
click on `<Legend>`, nice! You can see its `props`!

We've just seen two of the *most* important things in Vue: `data` and `props`.
`data` are values that will *change* while your app is running, which is why the
Vue dev tools gives us the little pencil icon to modify them. But `props` are
different: when a component receives a `prop`, it *can't* change it: the Vue dev
tools doesn't give us a cute pencil icon for a prop. Props are just a way for a
component to *receive* data.

I like to think of "props to a component" like "arguments to a function" in PHP.
Think about it: in PHP, if we add an argument to a function, its main purpose is to
allow whoever calls us to *pass* us data. Once we receive an argument, we don't
usually *change* the argument's value. I mean, we *could*, but the main purpose of
an argument is to *read* data, not modify it. Props are *just* like that.

Items in `data` are almost more like variables that you create *inside* the function
to hold some new dynamic data: you create them for your own purposes and can set
and change them as much as you want. Of course, if you were to call *another* function
that needed one of these variables, you would pass it *to* that function as an
argument. The same is true in Vue: in a few minutes, we're going to pass the
`legend` data in the `Products` component into the `Legend` component as a prop.

## Props and Data are Available in Templates

Oh, and one other things about `props` and `data`. In a template, all props are
available as variables, which means we can say `{{ title }}`.

But you might remember that earlier, when we used the `legend` *data* in a template,
we did the same thing: we said `{{ legend }}`. It turns out that Vue makes *both*
`props` *and* `data` available as variables in your template. Which, again,
is a lot like a function in PHP: you have access to any arguments that were passed
to you *and* any local variables that you create.

Next: it's cool that we can pass a prop from `Products` into `<legend-component>`.
But what we *really* want to do is pass this dynamic `legend` data as the `title`
prop so that when that `legend` changes, the text updates. We'll do this with an
important concept called `v-bind`?
