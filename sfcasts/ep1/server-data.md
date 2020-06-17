# Server Data

Coming soon...

Now with the categories, loading dynamically and the products loading dynamically,
our app is starting to get really exciting and we can use view to make a really nice
user interface, but there's something that I'm not super happy about already with the
user experience, not happy about the categories not loading. When I originally load
the page, it's okay for some things to load right now, the page basically looks empty
when it first loads, cause the categories aren't even there

and it could get worse. What if we wanted to include what category we were on in the
page title that would mean the page title would have to actually wait, have to be
something different and then wait, and then change. Or what if we wanted to start
showing some authenticated user information in view like a eventually maybe like some
sort of log and bar here. That again would be something where the user interface, the
actual layout of the page would look one way and then a second later would look
different and that's kind of a jarring experience. Overall. We expect some things to
load, but having things in the layout, I mean the same information and the layout
load on every single page, no matter where we go to is pretty wasteful and not a
great experience. And this is how a lot of JavaScript apps work.

But since we're already making a request to our server, when we click to go to a new
page, our server is already very primed to make very fast database queries. And so it
in theory should be able to return some basic information to us on page load, like
the categories or user authentication information without us needing to make another
slow Ajax request. So generally there are two solutions to this. The first one is
called server side rendering, where you actually have your server render your view, a
application on the server, and then you get HTML back. And that's a very great
solution. Uh, it's going to be a little bit more complicated to set up because you
actually need to execute node on your server, but it is something that you can do,
but there's another option and it's actually a lot simpler and almost as fast and
it's passing data from the server into view.

So literally what we're going to do is in our controller, we're going to load all the
categories, pass that into twig and set that on a variable that our JavaScript can
read. That means that the data is going to be instantly available when our
application loads, without having to make that Ajax call. So let's start that.
Remember the controller for this page and we won't get too much into the Symfony
stuff is source controller, product controller. And actually there are two
controllers. There's the index controller, the homepage, and then there's the a page
for an individual category. So if we're going to pass the categories and we need to
pass them into the, uh, into that temple from both pages. So to do that, I'm going to
auto wire, a service up here called category repository, [inaudible] category
repository. This is a way for me to query the category database and I'm at a second
argument over here and call it categories, set to category repository, five dolls. So
very simply I'm querying the database for all the categories and passing that into
the template. And I'll do the same thing down here for our show category

I'll type category, repository, category repository, and then I'll copy that new
categories variable and pass that in this way. Cool. So we now have a categories of
variable available in the tweet template. So let's open that up. It's in templates,
product index studies, 12 twig, and we're already sending a window dot category or a
current category ID, um, global variable from before. So to turn this in product
controller, what we're actually passing into the template is an array of category
objects. And so we want to do is transform that into a JSON. And really, if you think
about it, what we want to do is we want to transform. I go to /API /category /that
JSON LD. This is a really easy way for me to get this is what the API response
actually looks like when it comes back from the API. So if we're going to send some
data from the server, the interview app, ideally it will look exactly like this. We
don't want it to have a different format and that's a change, a bunch of our view
code.

So in Symfony, what we can do to do that, we can see realize these category objects
into, into the JSON LD format and have, are actually already live. If you look in the
source twig directory, I've already created a tweak extension called JSON tweak
filter called JSON L D. This is gonna allow us to pass any object or anything really
into this JSON LD filter. And then it will serialize it to the JSON LD format, a long
way of saying that inside of our template, we can say window, that categories = curly
curly categories to use that new variable pipe based on L D. And it's just that
simple

[inaudible]

all right. So now we spin over, I'm going to refresh the page and then I'm gonna go
and view the page source. We can see what that looks like. So yeah, there it is. Look
at windows that category = and then you can see that same format that we had before
and easier way to see this would be good to go to the console. And we can actually
type window that categories here, partially, sorry, console.log(. When did I,
categories would be a better way to do it. [inaudible]

when you long, when you put windows dot categories in the console, there they are
four categories. You can see the normal act context at ID at type. Now this is
technically a little bit different than the format that's returned by the API.
Actually let me go back to /API /categories that JSON LD you'll see this because of
the JSON LD format has this act context at ID at type and then at, and then it has
hydro colon member, and then it has our items. And if this were a really long
collection, you'd actually see some page nation information on there. What we have
here is just kind of the inside. This is basically the data that's inside of
hydrocodone member. So I just wanna point out this difference. Most of the time,
you're not going to care about the difference, but we will, we will need to handle
the data a little bit different.

If you do want your dumped, JSON LD to actually have the full format here, and you
can do a little bit more work inside of your serializer extension. There is a third
option here, which has a context. And the key thing that you need to pass here is a
context called resource_class set to the class that you want to see realize as soon
as you do that, you're going to see the structure. Look a little bit more like this.
You can also, um, do pagination inside there. If you need to. Do you have any
questions about that? Let us know the comments, but this data here is going to be
just fine because what we really need are these categories. All right? So we have
categories now available inside of as global variables, uh, a new window, a new
categories window, uh, global variable available. Now, if you remember from sidebar,

when we actually fetch the categories, we're calling this fetch categories, helper,
which is coming from our fancy new categories service. So I'm going to go to our
category service here, assets JS services, category services, and very simply,
instead of doing an Ajax call, we can say, now say return window. That categories.
This is what I like about centralizing that fetch categories method. Cause we don't
need to run around and change this a lot of places in our application. We just need
to go change this one central spot. Now I can remove the import of Axios above and
it's actually not returning a promise anymore. It's now returning an array and I'm
going to talk more about that a second, because we technically just changed what this
application would, this method returned.

So if we go over and refresh, you can see it's actually broken. And it says something
like hydro member. Uh, can I read property hydro member of undefined? And the real
thing we broke here is not exactly that. We changed it from returning a promise to an
array that can break some parts of our application. But really the problem is down in
ACE and created is that fetch category is no longer returns, a response object with a
data key and a hydro remember, keep, it just returns the categories. So there are two
ways that fix this and it's really up to you. One way is I'll come up with
this.category spot. We can say this.categories = because this is the categories. We
don't need the await anymore. You can delete that if you want to. Um, because we're
not returning a promise. If you return a promise, then awake, waits for that. If you
return to this data, then await does nothing. So you can delete that. If you want to
have figuring out, you can see that it's already reloaded the categories on the left.
This is awesome. Now I want to reload the page. Look at that. The categories are
there instantly. And of course the styles aren't loading immediately, but that's only
because of, uh, how we've done the styles and in dev mode, that won't happen in
production as soon as the page loads, those categories are there.

Yeah.

Now one of the cool things about isolating our Ajax calls into a service like this is
that technically when we call that service, we don't know or care if it's talking to
an API or which API, or if we're just loading the data locally, we don't care at all.
Except that's not really true in this application because when we changed this from
using the API to our, our, uh, the global variable, we changed what this method
returned. We changed it in two ways. We change it from returning a promise to an
array. And we also changed the actual data that's returned before returned a, uh, uh,
an object with a data key on it, and then a hydro member key on it. So this is fine.
If you know that you're going to be loading your categories via this winter dot
categories, variable, then you can just do this and update your code. And it's fine.
But if you want to actually make your code work, but if you want, you can be a little
bit smarter and you can make this fetch categories still return. The same thing it
did before.

In other words, we're going to have this return a promise. So check this out. We can
say return new promise. And the promise takes a callback with that has two arguments
resolve and reject. I've never seen a promise before you can check out our ESX
tutorial about it. They're fascinating things. And then here, we're going to call
resolve, and then what we're gonna do is pass it, the data that we want this promise
to return. Now, we're, we're not really making the Ajax requests. So we don't can't
exactly return what was returned before, which is a, but we know what we really care
about is that there was a object with a data key and a hydro member key on it. So we
can at least fake that here. We can say data, let me say hydraulic on member. We can
set that window dot categories.

I'll remove this return down here. And then up here, I'll say return promise once
again. So now back in our CyberKnife here, I'm actually going to revert and do
exactly what we were doing before, which was constant response = await categories. So
this is kind of a funny promise because it's going to be resolved immediately. It's
not going to take any time to run, but it's technically your response. And when it
resolves, this is the data that's going to be passed, which is not exactly the same
as a response, but it's very, very close. Like we couldn't read headers off of the
response and we can absolutely re read the data. So we go run up. You can see it
already works. I'll refresh just to make sure. And now it works. So that's a cool way
that you can refactor from, uh, Ajax calls to some server-side data. That's a lot
faster and do in a way that doesn't actually affect your application. Cause we
isolated the change inside of this function. Pretty cool. All right, next, let's talk
about something else.

