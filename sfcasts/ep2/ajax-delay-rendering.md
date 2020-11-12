# Ajax Delay Rendering

Coming soon...

Okay, let's start grading our product page in the funnel. We have the product ID, but
not the product data. We'll need an Ajax call to get that in services, products that
service dot JS. This is where we've been centralizing our Ajax logic for products.
Let's add a new method to fetch just one product. We'll say export function, fetch
one product within I R I argument. And the cool thing about those IRAs is they are
strings, so they are URL. So we can say return, Axios dot, get in, literally pass it.
The IRI. Pretty awesome. And we can even add some documentation on this to be extra
cool. This is going to be a string. This will return a promise, uh, which will
resolve to an axial response. You can keep that if you want. Um, I'll just say that
it's going to return a promise. I'll say gets a product from the API, according to
the IRI.

Cool.

Over in product show, we're definitely going to need a product data to store the
object that we're going to get back to the Ajax call. So let's start there. I'll add
a data key inside. We're going to return product and we're going to initialize it to
Nope. Now to make the AGS call, we're going to want to do that as early as possible.
So what right when this component is instantiated. Oh, and you know what? ESPN is mad
here because data should be after props, not for functionality, just as a coding
standard. Anyways, after this, let's add a created function. Okay.

And inside of here, uh, what I'm actually gonna do is also add a loading data to
false, or kind of keep track of whether or not we're loading. Actually let's default
that to true because we will be loading at first and then down here, just to be a
little bit extra safe. I'll wrap this in a try catch block inside the tri we'll say
this dock products equals, and we can use that new fetch one product. So I'll say
fetch one product hit tab. And when I did that, it added the import for me up here,
as soon as we'll say fetch product, and we will pass that this, that product ID now
we're really going to do is actually a weight that, so I'm going to say a weight on
that so we can wait for it. And of course, when we use a weight, it means that we
needed to make the function

Async.

And really, if you look at whatever eight, what our API end point and really because
what fetch one product returns is actually the response object from Axios. We need to
fetch the data key off of that. So I'll add that data on the end of it.

Cool.

Now, inside the trial, I'm not going to do a catch. Exactly. I'm just going to put a
finally on it and say, Vista loading = false. So if we thought that this endpoint
might fail, for some reason, we could actually do a try-catch and maybe set some
error, error message and display that. But at least in this case, if it fails, it's
going to set our loading to false.

The on top, let's use one of the properties from that product object. Now, as a
reminder, our API has a full page of documentation at local host at /API, where you
can actually see what all of the different, uh, things are that you're gonna get back
from these end points. So for example, you can see all the different properties that
we're expecting to get back from our products. End point. So in this case, there's a
name key. So over here, I'm going to actually add an H one tag and we'll say curly,
curly product, that name, all right. So easy enough, we make an AGS call. We set it
on a product data. We even have any loading data. We're not using that yet, but we
will in a second. So when we move over, we have an air, okay. Let's just try to
refresh that these same air cannot read property name of no coming from product show.
So you can pretty easily assume that that is coming from right here. Now, this is a
very common thing in view, what's happening is that the template renders product,
that name immediately book product is no. When we first render the component, one way
to avoid this is to initialize your product to an object with a name, key, something
like this. But I prefer to do a different solution because that looks kind of hacky
to me.

Yeah.

Simply don't run to the product until it's loaded. And this is really easy to do up
here. I'm going to wrap our H one in another div, and I'm doing that simply because
we're eventually going to have more product stuff here that we're going to want to
render conditionally. And on that diff, I'm going to say V dash yeah,

Product. Now the VF is

Important here. If we use the V show, it would still try to execute the code inside.
It would just be hidden with VF. The code inside here is not executed at all. So to
move over now and refresh

[inaudible]

Wow, it's actually empty. Let's check our view dev tools here, go down on the
products, go on a product show and okay. You consider that the product data is
actually no

[inaudible].

And that's because of the error that you decide to make a second ago, which is down
here and it should be this.product = that it's now I don't even need to refresh. We
can instantly see it. And the point now is when we refresh you, don't see an air. If
somebody doesn't render that until the product is actually done, uh, loading from
Ajax.

Okay?

So that's much better. Well, but we are missing one thing and that's kind of loading
animation. You can see this is empty for just a second, which is not ideal. So that's
simple enough over inside of here. We'll import gloating from, and we'll use the
loading component that we created in the last tutorial, which is awesome. We're able
to reuse this everywhere for a consistent loading feel down here. We'll add the
normal components, key loading inside, and then up here, okay.

We can say loading with a V dash if = loading. Now there's two things about that. We
might not even really even need a loading data in here because either the product is
no, if we're loading or it's not, no, it's not in all of them. We're downloading, but
that's fine. The second thing is notice I'm using VF until now. I've always been
using V show with our loading animation. And actually it doesn't really matter much.
If this loading animation we're going to show and hide the multiple times. I
definitely choose V show so that because that's a faster and hiding and showing, but
since it will only load once and then disappear forever, VF allows the components be
completely destroyed once it's hidden, but really these are micro optimizations.
Anyways, when we move over now and refresh, there we go. We see the loading
animation. Once it's done loading and conditional loads title, except this title
actually looks a little bit different than our categories page. See, it's kind of a
smaller font over here. And the reason for that is if you look at the catalog
components, it uses a title component. Yeah. We actually centralized our title into
its own component in the last tutorial, but in product show, we're not actually using
that yet. So next let's do that.

Okay.

