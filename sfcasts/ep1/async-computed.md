# Async Computed

Coming soon...

So our search is cool. It's really fast, but there's a couple of real disadvantages.
First of all, one of our product lists is paginated like down here, we have links to
go to page two, page three, page four. That means that our products right here would
only contain some of our products just to products for page one. So our search would
just be filtering one page. That's a huge problem. Or what if we want our search to
be more intelligent right now, this is a pretty simple search. We're just comparing
the, uh, name of the product, but what if we're using something on our server and our
API, like elastic search, like a much more robust search. Um, so for both of those
reasons, I want to refactor this search to not be client side and JavaScript, but
actually when we type in this to hit our API and with the search query and return a
new, uh, set of results.

And actually I'm going to add a new tab, go to /API /products that JSON LD says an
easy way to see what our /API /products look like. And I've already an API platform
set up a very basic filter. You can add question Mark name = and then some term, and
it's going to filter down to those products. So you can see there's only two here. So
this is actually only filtering on the name property, but of course you could make
your API. However, rich you want. The point is our API needs a way where we can
actually send it some sort of filter, some sort of search query, and it filters the
results for us. And this is how we do it in our API. Okay. So over inside of our
code, I'm going to go into our services, directory and open up product services. So
this is the method that's actually responsible for make that Ajax request and already
has an ability to search products for a specific category. So let's add a second
argument here.

[inaudible]

which I'm going to call search term and very simply down here, if we have a search
term

[inaudible]

then we'll say parameters, that name = search term. That's going to add that query
parameter on for us then up here, I'll add my app Ram. This is going to be string or
no, and it's called search term. Perfect. So we now have the ability to do this now.
Cool. So let's use this in catalog that view, and I'm going to do this in the
simplest way possible, and it's totally not going to work right now. We already have
this computed property, which is great because right now the filtered products that
we want to display are, um, are computed based on the search based on the search
term.

So the easiest thing to do here is say, okay, if not, if not, uh, there's no search
term, then returned dot products else down here. If there's a search term, let's just
make our aid, our API call. I'll actually copy some of our code down here. So we'll
say a w we'll keep the error reporting out for simplicity of a concert response =
await fetch products. You can see as mad because I now need to make this an async
function. And then down here, I'll go steal some code again, we'll say return
response data, hydro member. So this makes sense, right? Uh, when we use our filter
products up here, when it renders, that's going to call our function down here, we're
going to make the ATS call. We're going to wait for it to finish. And then we're
going to return our new array of, uh, products.

And you can already see that there's a couple of, uh, angry looking errors coming up
here from IES, lint. And if you try this over here, I'll actually refresh, but you
can already see that it's broken. We got a huge air check this house as invalid prop
type check, fail for proper products expected, or Ray got promise. This is coming
from product list, which has been called by catalog. So what this means is that when
we're referenced, when we're rendering our product list, this filtered products here
is no longer an array of products. It's a promise. And that makes perfect sense. And
I told you behind the scenes, when you make a method, async what happens is it calls
your function. The function finishes immediately returns a promise. And then once
your await finishes, the rest of your code runs and the promise resolves async
functions, return promises.

So this is a long way of saying that computed properties can only do synchronous
things. They must return the value immediately. If you need to do something that is
asynchronous, you can't use a computed property. So computer properties, yay, or
calculating synchronous things. No yay for calculating asynchronous things. What
you're going to need to do instead is have a piece of data instead of the computer
property, you're going to need to convert the computer property into a piece of data.
And then what you'll do is on change. Whenever that, uh, data needs to change, like
whenever these search term changes, you'll call a method that will make the Ajax call
and then update that piece of data.

[inaudible].

So the first step here is to add a piece of data that can hold our filter products.
And actually now that we're not using this product array, uh, to like filter it down
and make it smaller, we can actually, we can actually do is just change. Whenever our
AGS call finishes is just change the products array entirely. So I'm not going to add
a new, uh, like filtered products data. We can just change the products whenever the
search term changes.

[inaudible]

so up here instead of filtered products, we will now just once again, past products,
and then down here, I'm going to get rid of our computed section entirely

[inaudible].

So we're effectively going to do now is whenever the search term changes, we
basically want to reload, rerun all of this code that makes the Ajax call. So to help
with this down in my methods, I'm gonna create a new method here called load
products. Let me give it a search term arguments, and then I'm gonna go up and just
copy our entire created function. This is all responsible for making the AGS call for
products. I'll paste that. And then the one thing we can do here is now we can pass
the second argument, which is a search term. And then we need to of course make this
async. You can see a WebEx mad at me because of the await there. Perfect. So now
often created, this is just a small refactoring. We can say this, that load products
and passing Knoll, because when we originally, uh,

[inaudible],

when we originally, when the page originally loads, we don't want any search term,
you could set that to this.search term, but I'm actually going to delete that in a
second. Alright. So if we go right now, I'm going to reload the page just to make
sure. Yep. So our created is still working properly. All right. So now it's really
easy because on search products, this is one, we want our, our products to reload. So
we're going to say, here is just this, that load products and we'll pass it event
that term, the search term. So when the search products is executed, this will start
the log products. So of course make the habit asynchronously. And when it finishes,
the products, data will change and the temple will rerender. And actually, if you
think about it, we don't even need this search term anymore. We're not using that
anywhere. I'll like search this out of here. We're setting the search term data up
here, and then we're setting it right here. But then we're not even using it down
here cause we're passing an argument. So it turns out we don't actually in our
situation, need a search term data doesn't anything, but we're not using it.

[inaudible]

alright. So let's try this. I'll refresh the page just to be sure. And let's type.
Yes, you can see it is working. And the metal, one Depot, two of here shows the AGS
calls that are being made in the background. So it is perfect.

So one last little tweak I'm gonna make before we go on is totally not important, but
something you're gonna see pretty commonly is knows how we're using event at that
term. If we want to, and you'll see this pretty commonly you can use, you can use
object destructuring so I can actually say here is term like this. So it's a little
confusing it because this received an event object. We destructure that by basically
grabbing the term property and setting it to a term variable. Then down here, we can
just say term and just to be extra cool. I'll put some documentation on that. So we
can say that term is a string. And of course we want, we can put a description on
this.

[inaudible]

perfect. Let's go over here and I'm going to try that still works perfectly next.
Let's fix a couple of things. One we're actually making this Ajax call too much by
type really, really fast here. That's making four eight calls and we're going to
refactor our code a little bit into helpers. Bye.

