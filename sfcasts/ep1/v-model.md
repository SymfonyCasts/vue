# V Model

Coming soon...

One of the other things we haven't really talked about yet are form inputs. And
that's perfect because what I want to talk about now is adding a search bar. So no
matter what category or all categories, we're on, we're going to a search bar here so
we can filter this product list. Now the search bar is of course going to contain
some HTML. It's also going to be managing kind of like the value of the search bar so
we can do things with it. So I'm going to go ahead and, and start by creating a new
component for our search bar. So over in our components, directory, awkward, a new
file called search bar dot view. Yeah, we'll start at the normal way. Are they
templates? I'll add a div and then I'm going to add an input inside of that dif by
the reason I'm creating a div around here is in a little while. We're actually going
to add a couple other elements besides just the input. It's totally okay. Just to
have an element with, uh, the input as the outer element inside here, I'll give it a
couple things like a foreign control class, a placeholder search products

and a type = search. So nothing special there at the bottom here, we had our script
tag and we just need the basic export default with name search bar.

[inaudible]

perfect. Simple, but that is enough. So over in catalog, that view, let's see. What I
want to do is actually change this title component to call three, and then down here,
I'll do classicals call nine. And then inside of that, I'll do search bar. Now notice
I haven't imported it yet or added to the components yet. I'm kind of cheating here.
I'm just going to let this, I'm just going to start using search right here. I'm
going to hit tab to auto complete that, and then I'll close it up for now. Now when I
did that, because PhpStorm is awesome. It actually did the import for me and added it
down to the components down here. So that is pretty awesome.

And over here, boom, there you go. We have a nice search bar next to the category
name. All right. So let's get to business on the search bar because what we need,
what we're going to need to know is what the value of the input is for typing things
here. We're going to somehow need to get this value so that we can use it. There are
a couple of ways to do this, but the simplest way is to add a data to this element
that holds that, and then kind of plus add data. Is that a function that will return
let's call the new data

search term

set to a empty array or a set to an empty string by default, it's not, we're going to
do is we're just going to basically make the input, uh, update that search term. And
actually I'm gonna start right here by here by adding a colon value = search term.

[inaudible].

So now with just that, if we go over it and look at our view developer tools, if we
hop into the search bar here, we can at least, you know, if something updates that
search term, it's going to update the value element inside the, uh, search. But what
we can't do yet is actually type in this box and have it update the data. So how do
we do that?

Well, very simply we need to listen to an a, to a, an event on input. Remember the
way we, we listen to things is V dash on colon, and then the name of the event that
we want to listen to, or what we're actually going to use as the shortcut syntax. So
at, and then the name of one of listen to her. Now you might expect me to use
something like add change or at blur or something like that. Those are totally valid,
but the one I'm going to use as an input, which is something that will, it's a native
input, is a native, a JavaScript event that is kind of similar to key down. It's
going to trigger any time that there's a change to the input box. Now, inside of
here, what we've done so far as we've done some method name, we've actually put a
method name down here, and then down here have gone to like methods and added a
method called some method. But something else you can actually do is right just in
expression inside of here. So what we ultimately want to do inside of this input is
we want to take the value of the input and change the search term data. So we can
literally say inside of here

search term,

because of course that's really going to be this, that search term = and then dollar
sign event that target that value. And that does, that takes a little bit of
explanation. Normally, if we just set this to a method name, then the method down
here will receive an event argument. And that's the normal Dom event argument. And so
you can say things like event that target that value to get this input value. When
you write an inline function, like this view gives you the event object via a dollar
sign event, variable. So it's just a little helper so we can get what we want here.

Now, if your whole borrowing CES lends a little bit angry, it doesn't actually like
my ordering things, sorry, clean up all that. I'm just going to delete this. Doesn't
actually like my ordering of things. This is just an ESPN thing. It likes to have
that at input there at the bottom. Wouldn't make any functional difference though.
All right. So move on now and let's go find our search bar here. There's our term.
And as we type into that, boom, now it's updating. That is perfect. So what we've
effectively done is we've taken a piece of data search term and we bound it to this
input. If the data changes, the input changes, if the input changes, the data
changes, this is a very common thing to do in view. And it's so common that view has
added a mechanism to do this for us automatically.

So what I'm going to do here is I'm going to actually going to delete these two lines
and replace it with something that's identical. So I'm gonna delete that input. I'm
going to delete the colon value and I'm gonna replace it with V dash model = search
term. So this is one of the last, uh, very important, uh, directives that we haven't
talked about. The model equal search term literally means set the value algebra to
search term and on inputs update the search term with this input value. It's
identical. Now V model does act a little bit different with things like checkboxes or
select elements, but it acts the way that you want with check boxes with select
select boxes it listens to on change. And then it sets your a in this case, your
search term or whatever your V model is to whatever the value is of the option that
was selected.

So this is what you're actually gonna use almost all the time with inputs. Cause it
just handles everything for you. So you can see over here once again, check out this
and you can see it's working the exact same way. So you're going to see the model all
the time. Just remember it's very simple. It's basically binding the value to the
search term and it's updating the search term automatically for you. One that
changes. So it's perfect. All right, next, let's actually use this search term to
change the list of products that's shown when we type in it. That's next. Okay.

