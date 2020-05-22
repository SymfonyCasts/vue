# data() and Vue Dev Tools

Coming soon...

Now back up to our template. As I mentioned, it's 100% hard coded. So let's make it a
little bit more realistic. Let's pretend that this little shipping message down here
is something that sometimes changes to a different message. So I'm going to copy that
shipping message here. And then for `data()`, we'll get rid of our `firstname` data. We're
not using that anymore. And we'll call this `legend` and then I'll paste it inside of
there. It's not, I have one, a data called legend. And up here we already know how to
use this. We can say `{{ legend }}`

Beautiful. So when I go over and refresh, now you can see the exact same messages
there on the bottom. It's working. Now, unlike last time when we first played with
data, I set my entire view application onto a global variable so that we could play
with it down here. Well that's not going to work now because this is, we're not
setting any global variables anymore. Um, so at first it doesn't seem like there's a
really easy way for me to play with this legend data to see if this is working. But
actually

there is, there's something called the Vue developer tools. It's a Chrome extension
that I already have installed

and as soon as you have a view application running you actually, because we just got
to start, you need to close this and reopen it. Boom. This time whenever reopen it,
it notices a view application that adds this view tab. And this is beautiful because
they can see my `<Root>`, kind of the root of application. I can see my `<Products>`. When
I click on this, you can see the `data`. This is an awesome way cause I can see all the
data and we're going to see other parts of our application and we can even mess with
it. Sexy. We have little plus icon. Put this in double quotes, put a little message
there, hit the save icon and boom. This will be a powerful way to see our new
application play with the data inside of it. Now before we move on to creating child
components, there's one more thing I want to show you quickly related to data.

Now notice that inside of our view options here, some of the keys are some of the
properties here are just values and some of them like `data()` or functions. Now for data
in particular because data returns a value, you're commonly gonna see a different
syntax. I just want you to see it and you can choose whichever one you want and it
looks like this `data: () => ` and `({` and then we're going to get rid of the `return`.
Let's go with block. Funny until I finished and then `})`

Well this is it. This is just a shortcut syntax. This says that the data property is
set to arrow function and because I've used this parentheses here, it means that it
returns this value. The value is implied. So because is a function, but data always
just returns data. A lot of times you're going to see this shorter syntax. You can
use whichever you want. There are some edge cases where you can't use the shorter
syntax. Um, it's a little bit longer, but I actually prefer to use the consistent
data, open parentheses, syntax. So I'm going to put that back, get rid of a couple of
things. And of course now I need to add the extra return curly brace around legend.
So we use it every nuance. And that's one of the tricky thing sometimes with modern
JavaScript is you see a lot of fancy syntaxes just stop and think about what is this
actually doing? It's probably not anything that impressive. All right, so we'll move
on. Now things are still good. Let's next create a child component.
