# V For

Coming soon...

Let's start to fix our hard coded Catterick categories over here. Right now, these
are literally just hard-coded right into our sidebar template. So to start, we're
going to add a new data to sidebar, which is going to be the collection of
categories. And then we're going to loop over them in here to print those out. For
right now, I'm just going to hardcode that data. So let's say data open parentheses,
it will say return and they'll add a category is key and we'll set this tune right.
Eventually this is going to come from an API, but right now hard coding is going to
work just fine. So let's see here. Um, we'll make this an array and inside of the
array we'll have some objects. And for now let's just have a name key and we'll just
put some realistic products in here. Dot matrix printers. I'm also pretend that there
is a link key, which right now we'll will set two upon pound sign and let's put one
more

dot matrix.

Can't get that important detail wrong. And I Omega zip drives. If you don't know what
that is, you were probably younger than me. You can Google it. Alright, great. So now
I have a data on our sidebar called categories. A peer. It's of course not as easy as
just printing categories like this. That's not going to work. We need to loop over
this. So we actually need a for loop. Like twig view has a number of custom syntaxes,
they're called directives and we're throughout the tutorial we're going to see the
most important directives. They do work a little bit different than twig. Instead of
a custom syntax, you actually put the directives, you actually put the V, the
directive, it's called [inaudible]. You actually put the V for director of right on
the element. You want to loop over. So I'm actually gonna put this a L I on a
multiple lines and inside of here we can say V dash four = and treat it like an
attribute. Now with before, once you're inside the attribute you are writing
JavaScript, he says V4 and you can say category in categories. So these are
categories, data that we have and we can use any variable available. And now the
local variable is going to be called category.

Okay, so let's see down here we have a,

okay

no for the HRF

the HF. Remember this category here is actually an object with a name kina Linky. So
we really want to link use here as the link key. So for the ATF we're not basically
say is category dot ATRA but we can't just do this cause it's literally print cat,
the horde category that ADF on there. We want this to be dynamics. We do use the V
bind a directive or as you've seen the shortcut colon HRF. So we've got as soon as
you say colon HRF view recognizes that this is JavaScript and this is us saying
category that HRF to fill in that JavaScript.

Finally down here, I'll break this into multiple lines. For the name we can say
category, curly, curly category.name and that's it. So we can remove the other ally
down here. So it looks a little funnier, but this is going to cause us to have two
allies down here for each of those two categories. When we go over, you can see, I
don't even need to refresh. You're going to see the all products yourself hard coded.
And then our two links down here, Oh sorry, I meant to say category, that link. That
makes better now. Perfect. Now you can see that when I hover over these, I have the
little pound sign.

Now you'll notice that view, uh, Eastland is a little angry up here at me. And the
reason is that it says elements and iteration expect to have a V bind to keep. It's a
fancy way of saying that whenever you use the, before you were supposed to have a key
attribute, which is something that's unique to each of the things in the loop. The
reason is just, it's just without that, you can't, if you update the categories, view
has a hard time figuring out which to update. So whenever you have before, you always
have to have a key. And normally you're going to use something like category.id maybe
forgetting things from these things from the database. In this case, we don't have a
cat, an ID on our thing, so we can just use the index on the loop. So we can, I
should change our loop here a little bit. A little syntax here. Overprints these
category comment index. So that's the syntax for getting the index. And then down
here we can say he = index. But again, we don't want to just say key = index because
that will literally make the key attribute set to the word index. We want that to be
dynamics. We'll say colon key = index and see if every type is. Now I'll actually get
auto complete on that.

So over here we won't see any difference. But now if we actually updated those of you
have an easier time doing that.

I'm going to Google for it. And view API. They have a uh, S page, a site called view
dot component API, which I absolutely love. And it basically talks about everything
that exists in view. So I'm gonna come back to this several times. What I'm gonna do
now is actually skip past tons of things here and click on the directives. So want
just see is that there's not that many of these directives in here. There's probably
about 15 of them. We've already seen the bind down here, and now we've also seen the
four. So there's not a ton of these special syntaxes. We're gonna talk about most of
these. If you need to see how they work, you can click it and actually see how they
worked on here. So obviously this is going to show you, uh, the two different
syntaxes for the four.

The other thing I want to mention, and maybe you weren't even thinking about this,
but if you go over here and inspect element on really things you can see on the LOI
there is class = nav item. You don't actually have a key attribute on that element.
Normally, if you add something here, like Ooh, = bar, you're going to have, so you go
back here, you're going to have a food = bar class. Now in right below this
directives here, you're going to see a special section called special attributes. And
you see the key is one of the special attributes. So this doesn't happen very often,
but with just a couple of attributes and you really will not see these very often.
There's a couple of attributes that when you add them to elements and view, they
don't actually come out as attributes. They have special meanings. Key is one of the
very few attributes that have this quality. So you're wondering why we don't have a
key attribute on the ally. That's because view treats this key special, which is what
we want. We don't actually want a key attribute. We just wanted to communicate to
view what the key was for this element so that it can update it if we want to later,

I'll close that up. All right, next, let's actually start adding some behavior to our
sidebar. We're gonna make it collapsible. We're gonna add a little link where we can
actually click it and have it open and close. That's next.

