# Better Loading

Coming soon...

Okay.

We have a problem. People, the snacks are empty. Yeah. There are no snacks in our
store right now. Apparently that's a huge problem on its own to make it worse. You
can't even tell, it just looks like it's loading forever. And the reason is in our
product list, we're showing the loading just basically by looking at the products
length of zero, we show the loading.

So using the product's length, using the length of something to figure out whether
it's loaded or not doesn't work, if it's possible that the thing, the products could
be empty this case. Yeah. Sometimes we might have categories with no products. So
using the products, the length is not going to work here. Well, we even said is a
legitimate data for whether or not this is loading. We need a special specific flag.
Um, that tracks whether or not the products are being loaded now in catalog, this is
the smart component that actually takes care of making the Ajax request. So this is
the component that no was whether or not we are loading or not loading. So we're
going to add a new data to this element. I'm going to call it loading and set it to
false.

Now, very simply down here, we can say this, that loading = true, right for the Ajax
call. And then right after they had just called this stop loading = false. And that
just like that we have a flag we can use to render things differently based on
loading. Now, while I'm here, we can also, we want add some very simple, uh, error
catching, like for example, this Ajax call fails for some reason. So to do that, we
can wrap all of this in a try catch block, and then we will catch on the catch. We
will set this.loading = false. And of course we wanted to go further. We could add
some data called air and, you know, change the, uh, air data down here to something
else. Um, but at least now if there's an air, it wouldn't spin forever. It'll look
like it's, uh, it'll actually stop loading.

But as easy as that was, this also could be a little dangerous. So if I do want to,
if I do decide to do my try catch, I do think it's slightly different. The problem
with this is that, um, if any of these lines fail, including maybe if our response,
for some reason, doesn't have a data key on it, any of these things will trigger the
catch and you could actually be hiding a bug in your code. So instead, I'm going to
add a above the try. I would do let response, that's me just creating a new variable
and I'm creating an outside of the tri catch scope so that it's available outside of
it, then remove the from response. So now we're changing that now we're going to do
here is I'm actually going to add a return in the catch. So if we hit the catch, we
exited the function and finally I can move the Vista products = response to that data
code outside of the catch. So if that a lion has a problem, it's not actually going
to, uh, uh, cause a problem.

So whether or not you use the try catch, it's just depends on your situation. I
probably wouldn't do this. If my API end point is failing, I have bigger problems
than just giving the user a nice user experience. But if you do have some valid
situations where something might fail, then you actually can use a tri catch like
this to do it. Okay. So we now have the loading data on our smart catalog component.
We need to pass that into our product product list components so that it can use it,
um, to hide or show that loading. So that's simple enough. I'll put my product list
on the multiple lines and here it will say colon loading = loading. So not passing a
loading prop into index. So in index, let's go update our props so we can receive
that. Add a new loading prop, tight Boolean required. True. And then up top now it's
either it actually simplifies our Tableau quite a bit. So we want to show the loading
animation if we are bloating. And we want to show these product cards down here, if
we are not loading that one's not super important, but, uh, that will be perfect.

All right, so let's check it out. Yep. And you can already see the snacks page no
longer has the loading. My other page has worked just fine. And this next page
doesn't load forever. In other we're a little more organized. We can actually give
this a proper, proper, no products found type of message. So over how it, after my
loving thing, I'll put an H five

and inside of here, we're going to do another V show. And basically we want this to
show if we are not loading, but products that length is equal to zero. If we have
that situation, then we know that we have no products, so we can put a very nice
message here to help out our user. And there it is, you can see that showing up on
our snacks. Perfect. So this is something new you're always going to want to think
about. Anytime you have dynamic data being loaded. Now the other place we have
dynamic data loaded is our categories. You can see where you very quickly have. Uh,
you know, when it first loads, this categories aren't actually there yet. We're
actually going to fix that in a second to make the categories load instantly. But
right now, since they are still loading, let's add a little loading animation there
as well. So this is going to be over in our sidebar dive view. This is the component.
This is the component that makes the Ajax request for the categories and then renders
them up here.

By the way, you can see this is getting a little bit complicated. We could choose to
actually isolate these into a different component if we want it to now. So should we
add another loading data like we just did for catalog? We totally could. And that's
probably a great option, but I'm going to cheat in this case, because I know in my
application that I will never have no categories. If I had no categories, that means
something is totally broken on my database. So in this case, I actually am going to
allow myself to use the categories of length, to figure out whether or not we're in
the loading state, but to keep things organized. What's that a computer property for
it. So I had a computer key here and I'll add a loading computed property. So the
nice thing about this is the loading. Isn't actually data, but it's going to kind of
look the same inside of my template. I'm just going to be able to reference a loading
variable, and then I can use my logic down here. And then I can say return
this.categories, but length = = zero. So if there's no categories, then we are
loading. And if we did need to change this today, later, if he's super easy, you just
remove this computer property at a data.

We wouldn't have to update anything in our template.

[inaudible]

all right. So do use this in our templates. I'm not using my loading component here
yet. So let's load that in, I'll say import loading from at /components /loading, and
then down here, add the components key with the loading component in it. That makes
it available to my template. And finally up here, right after the age five, we'll say
loading and we'll do our normal Videsh show for loading.

I love it. Let's give it a try. So move over. And we're watching over here is for
that loading animation right before those load. And there was super quick. Now we
have proper loading on both sides. BU yeah, next I want to start organizing our Ajax
calls a little bit better. We make Ajax calls inside of sidebar dot view, and also we
make an Ajax call inside of catalog that view. Um, and there's a better way that we
can start organizing our agents' calls so that we can keep our application a little
bit more sane. Let's talk about that next.

