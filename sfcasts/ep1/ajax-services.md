# Ajax Services

Coming soon...

Head over to sidebar dot view where we're making our Ajax call. Now in Symfony, we
often isolate complex logic or logic that we need to reuse into services. And one of
the most common places that we do that are for database queries in Symfony, we almost
always have a repository class which holds all the database queries for a specific,
uh, database table. I like to do the same thing with my friend and code, uh, and of
course in this, which means that I like to isolate all of my Ajax requests for a
specific resource like categories or products into its own reusable, JavaScript
module just helps keep things organized. So instead of making the AGS call here, I'm
going to move this into a central spot

[inaudible]

inside of the JS services, directory services, and Symfony is just a generic word for
any class that does work services. In this context I'm using to mean something
slightly different. It is typically API services or anytime that we need to get data.
That's what I mean by service here. So anytime that I have a new kind of API
resource, I want to, um, talk to, I'm going to create a new file inside of here. So
I'm gonna create one call categories, service dot JS. Now the dash service on the end
is totally redundant. I could just call it categories digest. I just get a little bit
drives me a little bit crazy. If I have lots of files called categories that JSR
products dot JS. Now there was in the services directory. We already had one file
called page context. This has nothing to do with, uh, Ajax calls or APIs, but is a
wave. It is a spot for our, but it is something that returns data. So that's why I
put this there. So you use that. I'm going to have Ajax stuff inside of here, but
occasionally I have other things that also return data. All right, inside of here,
let's export a function called how about fetch categories and inside of here,

I'm going to go grab my Cyberdyne view code. Very simply. I'll copy that Axios line
paste that and you see it, uh, put the access in there for me. I'm just going to
change that to single quotes. And actually I'm just going to return Axios dot Goetz.
This is a really, really simple one, but at least it's kind of centralizing that URL.
So we don't have that all over the place. I mean, I had a little documentation above
this. This does return a promise, clean that up.

[inaudible]

and I won't put any description on there because it's already pretty obvious. So
there we go. Categories service.

Now in cyber, I view we can use this. So first we need to import that like normal. So
I'll import, I'll do my curly braces from at /add /services /categories of service.
And then inside of here, I'm going to grab fresh categories. Okay. It's not on here.
Life gets a little bit easier. It's not just constant response = I'll keep that await
there. Cause I'm just gonna wait for wait for this finished best categories. That's
it. And up here just to clean up, we're not using Axios directly in this component at
all anymore. Sweet. So the other place that we're making AGS call right now is in
catalog. That view where we're making our API requests for products. This one's a
little bit more complicated because if we have a category, we pass a quick category
query parameter. So since this is a different API resource products, I'm gonna go
over here and create a new file called products, dash service that JS, and I'll start
the same way export function, fetch products. Now, in this case, I'm not, we can't
just, um, we already have another requirement, which is that sometimes we have a
category and sometimes we don't. So I'm actually going to add a category. I R I here,
I've been calling it category ID, but really it's the, I R I it's that URL. So I'll
call it category IRI here,

and then I'm going to go to catalog that view and let's copy the program's code. And
then I'll also copy the response line and we'll paste those into here, and let's see,
we're going to return Axios dot get, and then for the prams, it's not this, that
current category D but it's category IRI. If category IRI, then prams, that category
= category IRI. And I will fix my important use, double single quotes on Axios. And
finally do a little bit of documentation on this. So the category IRI is going to be
a string or no. And then I'll just say that this is returning a promise. You see this
funny syntax here, it's actually telling you, you can tell it, you can tell it that
you're returning a promise of a specific object. Uh,

right.

So you can say this is returning as maybe April. I promise. No, I'm not gonna say
that. So let's delete that. Okay. This is looking good. And we've isolated some nice
logic in here. So if I can catalog that view, just like before, we're going to do the
same dance I'm going to import from at /services slash

product services, import the fetch products function, and then down here, I don't
need any of this Paramus stuff at all anymore. And up here, we can simply say
response = await fetch products, and they'll pass it, this.current category ID. Now
that is really nice, cause that's exactly how I want my component logic to look on
created. I set the loading state, I call fetch products, passing it, any options I
have, that's it. I don't have to talk about anything more complicated than that. And
to clean this up, I will go and clean up the async. Phew. Okay. Let's just make sure
that all works. Let me do a full page refresh to make sure yep. Everything loads over
here and everything Lowe's over here. So that is very nice. Now, just as a comment,
some people inside of there, things like product services, when we returned this
promise here or returning a promise that resolves to the response, what that means is
that when we use it, when you use with a weight or with a normal dot then hook,
ultimately what we get back is the full response, which means down here we had today,
say things like response that data, and then get the hydro member key off that if you
want to, you can actually go a little bit further here.

You could say response dot, then a response equal->response.data. That's index might
look a little funny to you, but what happened here is now this still returns a
response, but instead of, um, it actually re terms, I promise, but instead of
returning your promise, it's actually returning data. So for example, that would
actually work. Of course, I need to change this data up here. Okay. Now I'm actually
going to completely undo all of that. My point is simply that right now, we are
returning a promise that resolves to the actual full response. You can make your
resolve to something smaller. It makes it a little bit easier to use, but the problem
is that if we ever needed to call this function and we needed to read like a header
off the response, then we can't do that. So I typically keep it very simple.

I return a promise that actually resolves the whole response, which means I have to
do a little bit more data over a little bit more work after I use it. But I'm cool
with that. Let me refresh one more time. Make sure it didn't break anything. It looks
good next. Um, you know, I don't mind some of the loading on this page, but
especially the categories over here are bothering me. It really makes the page look
incomplete. The fact that the categories, which were kind of part of the page
structure are not there first let's fix that. We're actually gonna start passing the
categories from the server directly into view.

