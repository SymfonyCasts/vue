# Categories Ajax

Coming soon...

I got to say, now that we have all of these dynamic products, these hard coded
categories over here are starting to stress me out. So let's make these dynamic as
well.

As a reminder, if you look at our `/api`, just like how we have a `/api/products`, end
point for the collection of products, we have one for `/api/categories`. So perfect.
We can use that. And actually now that we know how to make the correct word and the
Ajax calls and load data, this is going to be super simple back products. That view
is our top level component. We're going to be working inside of sidebar. So I'll open
`sidebar.vue` and let's see here we did earlier create a `categories` data, but it's
just hard coded. So now let's actually load that with real data. So I'll set this to
an empty array to start, and then we'll cheat. I'm gonna go over to `catalog.vue`
copying and pasting is always good.

Copy that

tire function and paste it over here. And almost nothing needs to change. We're going
to change the URL `/api/categories` and the data down here from, to `this.categories`.
And yeah, let's just see what happens,

refresh it. Whoa. And actually most looks like it works. Look in the console here.
Yeah, everything looks happy. So instantly loaded. You have a sidebar here. We can
see our categories. Then the category data actually is pretty simple. It has the
normal `@id` `@type` that comes from the JSON-LD, then it has `id` and `name`. Now
we're not quite done yet here. Cause if you Oh, which we're going to we're in, we're
gonna use those and we're not quite done yet. Oh. And actually one thing I forgot to
mention, which is really cool is when we pasted this code in down here, uh, Peter
from saw that and automatically added the import Axios for us. You know, the trick is
that with double quotes of single quote saw update that now. All right. Anyways, if
you go back up to our `v-for` up here, you remember earlier, we learned that every `v-for`
has to have a key while before, since we just created the categories data, uh, we
just use the index to update that now that we have, now we can be smarter because we
know that,

now I can even be smarter because we can actually instead use the `@id` from each of
those categories. So I'll simplify our before, which is really nice. And then we'll
say `:key=""` and we'll say `category['@id']`

And then the last thing doesn't work is I kind of, before we had a `category.link`
there is no link property on here. Um, what we're eventually going to have is
we're gonna eventually have an actual page that you can go to that will display all
of the products for a specific category. And it's going to look like this. It's going
to look like `/categories/` and then like the `id` of the category. So we don't actually
have that page functional exactly yet, but I'm going to go ahead and change and
update the URL here to do that. Now what's the best way to do that now because we're
Symfony users, we're used to generating URLs to routes, but instead I'm going to keep
things simple here. I think it's actually okay to hardcode you, where else to
different pages inside of your JavaScript, have you ever changed those URLs in your
site?

You just seem to know that you might be breaking some, um, breaking those pages. So
you might need to update your JavaScript. So in fact, we want to do here is we want
to say `/category/`and then we want the dynamic `category.id`. And of course,
since I have the colon in front of the HF to make this dynamic, I would need to have
a single quotes around here. And then we can do the plus sign and say `category.id`
be like that, that actually would work. If you look over here, you can see when I
hover over that, that kind of gives the right basic idea. But instead we're make us
to clean this up a little bit more. We're going to use a JavaScript feature, which is
that instead of the quotes, I can actually use the tick symbol and I'll get rid of
the quarter over here.

As soon as you use the tick symbol and I'll do a closing tick on the end, then you
are, you are writing just a normal string, but as soon as you need somebody dynamic,
you can just do dollar sign, less than sign. And then another lesson, sign, dollar
sign, curly brace, and then whatever thing you want to be dynamic. So this is just a
nicer way, because remember, as soon as we make this `:href`, it means that
what's inside the attribute is JavaScript and this is valid JavaScript. Right? So to
look over now, yes, all of those links look perfect. So next let's, so this is
actually looking really good. We have dynamic products, we have dynamic categories.
Now the only thing that bothers me is all the loading, the loading of

When we only loaded the products that was okay because the products sold pretty fast,
but even the categories waiting to load now is starting to look a little bit jarring.
So next let's load our categories in a different way, a way where we can actually get
them to render on the screen immediately so that we're not waiting for them. So the
users aren't waiting for them to load.

