# Styles

Coming soon...

In other words, inside of our single file component, we can really get to work. I'm
going to start by pasting in some real, some more realistic markups. So I'm gonna
replace the HTML completely with a whole bunch of new markup. You can copy this from
the code block on this page, but I want you to see is that there's nothing special
here. I'm not rendering any variables. This is 100% static HTML, but this is the HTML
that's going to start to build out this product page. So if I refresh over here,
there we go. So you have a cyber over here, products over here and to do low in some
products. So it's a decent start.

Of course it's not very pretty. I mean there's some structure here. If you look back
over in the HTML, I am using bootstrap classes and this works because in my app that
STSS, this is a CSS file that's included in the layout. I'm including bootstrap. So I
do have access to the global bootstrap classes. Um, so I've had some basic bootcamp
classes and that is giving me some styling, but I want to put a little extra styling
here on this sidebar that's specific to the sidebar. The question is how can I do
that? We could of course go into app that SDSs and add some extra code here and that
would be used some class here and that would be usable, um, inside of my view
component. But since I'm adding, since I need to style things specifically in this
component, we can actually embed the styles right here, check it out. I'm gonna add a
sidebar class on this div right here

and then it

technically matter where. But down on the bottom, there's a third special thing you
can have in, in, uh, in these view files. You can have a template tag, a script tag,
and you can also have a style tag. Sauna. Put a sidebar right there.

Oops,

what's that? A sidebar. I'll give it a little border. One pixel solid. You can delete
this. And then I'll put in a couple other things like a Bach shadow. I'll put it in a
couple of other things like a Bach shadow and a border radius without doing anything
else. And I do want you to remember we are winning a yarn watch in the background, so
it's constantly recompiling things. Suddenly when we go over to refresh that works
and the reason it works is that when Webpack sees this, uh, file and sees the stock
opponent it, it grabs the CSS and exports it into the product that CSS. So if I go to
view page source, you can see we have a /build /product SCSS and whenever we add more
styles to our components, it's going to pick them up and put them in that file for
us. So it's not something that we even need to think about or worry about. It's
awesome.

Okay, so this is awesome, but I do like using SAS. Have you noticed, and I already
have SAS configured my project, if you look at Webpack dot config that JS I already
have, let's see down here, there we go. Enable sass loader but should be able to use
Sassons on my project. And the reason I really, really don't want to use acid is
honestly a little lazy. If you look at my STSS components directory, I have a light
component, which is a mix in which actually contains this same code already. So I can
just use this, mix it, then I wouldn't have to repeat it down here in the sidebar.
I've already created something for this. All right, so to do that, surprise, it is
going to be laying = S C S, S and it's that simple. Now I can do a normal at include,
let's do dye. That slip that does /SCF

task

/components. Oh my bad. That import that, that //SDSs components like components. And
then down here I can just say

include light component.

Now move over to refresh. Hey, welcome. We have cess. I'm going to use that.

Okay,

and now that I have this, I'm actually going to use the nested syntax and SAS and
paste in a little extra little hover status on those links. Go back and refresh and
there it is. So being able to kind of put your styles right in here, where the
component is. One of my favorite features and a little while we're gonna make this
even fancy or something called modular CSS. But this works great.

Now back up to our template. As I mentioned, it's 100% hard coded. So let's make it a
little bit more realistic. Let's pretend that this little shipping message down here
is something that sometimes changes to a different message. So I'm going to copy that
shipping message here. And then for data, we'll get rid of our first name data. We're
not using that anymore. And we'll call this legend and then I'll paste it inside of
there. It's not, I have one, a data called legend. And up here we already know how to
use this. We can say curly, curly

legend.

Beautiful. So when I go over and refresh, now you can see the exact same messages
there on the bottom. It's working. Now, unlike last time when we first played with
data, I set my entire view application onto a global variable so that we could play
with it down here. Well that's not going to work now because this is, we're not
setting any global variables anymore. Um, so at first it doesn't seem like there's a
really easy way for me to play with this legend data to see if this is working. But
actually

okay

there is, there's something called the view developer tools. It's a Chrome extension
that I already have installed

and as soon as you have a view application running you actually, because we just got
to start, you need to close this and reopen it. Boom. This time whenever reopen it,
it notices a view application that adds this view tab. And this is beautiful because
they can see my route, kind of the route of application. I can see my products. When
I click on this, you can see the data. This is an awesome way cause I can see all the
data and we're going to see other parts of our application and we can even mess with
it. Sexy. We have little plus icon. Put this in double quotes, put a little message
there, hit the save icon and boom. This will be a powerful way to see our new
application play with the data inside of it. Now before we move on to creating child
components, there's one more thing I want to show you quickly related to data.

Now notice that inside of our view options here, some of the keys are some of the
properties here are just values and some of them like data or functions. Now for data
in particular because data returns a value, you're commonly gonna see a different
syntax. I just want you to see it and you can choose whichever one you want and it
looks like this data, colon, open parentheses, close parentheses, equal arrow, and
then open parentheses, open curly, and then we're going to get rid of the return.
Let's go with block. Funny until I finished and then curly parentheses.

Well this is it. This is just a shortcut syntax. This says that the data property is
set to a an->function and because I've used this parentheses here, it means that it
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

