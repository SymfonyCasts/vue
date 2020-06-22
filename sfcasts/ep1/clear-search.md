# Clear Search

Coming soon...

When we type inside of our search bar, I actually already have a little X icon over
here. This is added by my browser. It's because the, uh, inside of search bar, it's
because we're using an input type = search. And in my browser, it adds that little X
icon. So I want to ignore that for a second. Cause what I actually want to do is see
if we can add our own little X icon over here and get that so that when we click it,
it clears it. It's gonna be a nice little exercise, which for us, it's just going to
be kind of practicing our skills. Cause this is going to be, this is going to work
super well.

So let's start over here. And, uh, instead of a search bar, I'm gonna add a class to
the outer div called input group. That's gonna allow me to, uh, kind of add a new
element down here, class input, group append, and here we're only gonna sh and I'm
gonna add a V show to this. The idea is that this is going to be a little X icon, and
we only want this to show if there is at least something being typed so we can do V
show = search terms. We have that as the data does not equal

empty quotes. I'll close that

inside. I'll add button a little X inside of there and inside we'll say class = BTN
BTN dash outline secondary. All right, perfect. Let's see IES. Linda's telling me
that V show should go before class. Let's try to keep up with the standards here.
There we go. So we were over here that there we go. It looks a little silly because
of the double X I might actually take. Well, it's ignore that, but it does show up
correctly. So now we actually want to add some behavior to this. When I click this, I
want it to actually clear. All right, perfect. So down here, we want to do this.
Let's add a click event. So we want to V on, of course, we'll use a circle and say on
click of this, let's call a new thing, a new method called erase

search term.

I'll copy that method name. Oh, is so great. Well, we're down here. We already have a
methods section. Let's just add a second method.

Okay.

And on this method, we'll just set this dot

search term = empty quotes.

And that looks good. So let's try it over here. Refresh, I'll do a quick search click
on my X button over here and it clears. Oh, but the products didn't updates. Of
course. So to make this fancy, it really, I mean, if there were any thinking about
the search bar component, the whole, the search, the search term data is entirely
internal. The only reason we have a search term data inside of here is just that we
can use it inside of our component. For example, it's useful to know it helps us up
here, know whether or not we even render this a we should hide or show the, the X
button. But as far as the people that use our components are sort of our public API.
The thing that this component does, is it dispatches and admits a search dash
products event. So our missing down here is, yeah, sure. We're setting this internal
data correctly, but we also need to admit the event.

So I'll tell you that exact go down here. Of course, the search terms going to be
blank, but we can keep that exact code. And now we go over and hit it and clear it,
it works perfectly. So that's a nice little exercise of sort of just like thinking
about the organization of our search bar component, making sure that you emit the
right events at the right time. Next let's do something I'm really excited about
right now. The current category ID is something that we set on page load and never
change, but we've organized our app in such a good way that with a little bit of
logic and a new concept called a watcher, we can, we're going to be able to
dynamically change the category and have the whole page reload. Let's do that next.

