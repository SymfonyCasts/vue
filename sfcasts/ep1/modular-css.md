# Modular Css

Coming soon...

I love that I can put my styles right inside my component. I love that. In this
component here we have created a `sidebar` class and then immediately without going
anywhere else down here, we are able to put the CSS for that. I love that, but
there's something that you need to be careful with. The `sidebar` class is a pretty
generic class name, so if I happen to put a sidebar, you have a `sidebar` class and a
different component. This CSS might affect it. He's bent over and refresh your page.
I'm going to view the page source and on top of you can see that here's our style
sheet for `/build/products.css` and when you open it up it looks exactly like we
expect. You can see the `sidebar` class. It's exactly the CSS that we have down here
inside of our component. So yeah, if anything else has a `sidebar` class, this is going
to conflict with it to solve this problem view or really the CSS world, because this
is kind of a CSS problem, has two main solutions, scoped CSS or modular CSS. They're
kind of two slightly different ways to solve the same problem. We are going to use
modular CSS. What does that mean? It means that whenever we have a style type like
this, we're going to add a little attribute here called `module`, and that's it.

If you go back over, now I'm going to leave this CSS file open. I'll close the source
growing out and refresh. You can see that I actually lost the styling on my sidebar.
And the reason is if I go back over to the CSS file and refresh that, check this out.
Those class names are now weird at `.sidebar_` and then kind of this like random
little string. But if we look, if we inspect element on our kind of like here, we
still have a normal `sidebar` class here. So here's what happens when you add a modular
to the CSS file here, it generates a random string that's specific to this module and
then it adds it to the end of all the classes. So the great thing now is you can have
this `sidebar` class, which is super generic, but in reality in the CSS file it's going
to have this very specific thing. If we had a `sidebar` class in some other element CSS,
it would have a different random string.

The only trick is that now that this is happening, we can't just use the class
sidebar up here. We need to find out what the actual dynamic name is of a sidebar.

So as soon as you use modular CSS view makes a `style` variable available in your
template, which is a map from the original class name like `sidebar` to the new dynamic
class name. So temporarily I'm going to delete this `p-3 mb-5`. I'll put those back
in a second and we basically want to do is we don't want to set the class now to just
a string. We want to make it a dynamic value. And remember when we need an attribute
to be dynamic value, we prefix it with `:`, which, which is actually a `v-bind`. Now
inside of here we can use any variables that we have available. And as I mentioned,
we have a new one called a `$style` and that here, because I `$style.sidebar`, so
quite literally, and you'll notice that PHPStorm is, doesn't actually understand
this, the modular CSS style variable, but this will work.

So because we have a sidebar class down here, we are able to say style, that sidebar
here, that doesn't affect how the CSS generates. But now when we refresh, our styling
is back, because check this out, our DM gets that dynamic sidebar class. Of course,
the other problem is that we remember we had two other classes here at `p-3 mb-5`.
So it's kind of like how do I add those inside of here? You could do something like
plus and then some space here, but you can see that's going to get pretty ugly. So
instead the class syntax, it gives us another way class in addition to a string, you
can actually pass it and array. So now we'll say `$style.sidebar` And then here we
can just say `p-3` and `mb-5`.

So now we use all those three classes. One of them is dynamic. I go over and refresh
now. Perfect. It looks better so that's it. That's modular CSS. It's something that
we're going to be using throughout the project and we'll learn a couple other tricks
with it along the way. Now, one thing is you'll notice as you look at your Dom, it's
not really clear like what element this is coming from cause it. Since that just has
this random string in development mode like we are now, we can actually change this
to include the component name just helps make it a little more obvious what elements
are coming from what components to do that. Just totally optional. I'm going to go
into `webpack.config.js` and it doesn't matter where down here after 
`enableVueLoader()`, I'm going to paste in some code. You can get this code from this page.
This is a little bit of a low level thing. Instead of Webpack, we configure something
called the cssLoader, which is responsible for this CSS and this local identity name
that has to do with modular CSS. This actually tells it to use basically the
component name. Uh, and then there's the actual local sidebar value, and then still a
random hash to give this to work when you did to spin over, hit control C, restart
Encore.

```terminal-silent
yarn watch
```

And once that finishes, I'll move back over to my browser. And first I'm gonna
refresh the CSS on here so you can see what it looks like. There we go. That
`product_sidebar_`. Then under this horse, something random. And of course if we
refresh, refresh over here, it still uses that new class name. So in production it's
going to use something shorter because we don't really care. But in development we
nice have this nice new value. Next, let's start creating some more components and
maybe also talk about the dev server.

