# Checkout Submit

Coming soon...

To finish checkout. We need to submit this form via Ajax to some API end point, copy
the URL and open up a new tab to go to /API, which holds our API documentation. One
API resource in here is called purchase. This is what we'll be using specifically. We
will send a post request to /API /purchases to create a new purchase. The fields it
needs are pretty familiar. The six fields that we have in our form, plus a purchase
items, array, purchase items, array field. This will contain the data for each item
in the cart, the product IRI, the color IRI and the quantity. We have access to that
data via our cart object. To help us talk to this end point in the assets services
directory create a new file called checkout service that J S inside of here, I'm
going to paste a function. It's only about one line long. We import Axios when new
functions called create order, it takes in that data structure we Dessau and just
makes a post request to that end point. So almost not even worth putting inside of a
separate function, but now we have this next up in the checkout form components.
After the last field,

I'm going to paste in a submit button. There's nothing special about this at all.
It's button type = summits or not. It just has some structure set up, just some
styling setup. We're also going to need a loading animation while this is saving. So
down here, let's add a loading data, say loading all, and then we'll import our
loading component. So import loading from at /ad /components /loading. And then we'll
add that to our components then up in the templates, right inside that new dev that's
where I'll add that new loading. So we'll say loading with a V dash show = loading.

Okay.

Our next step is pretty straightforward. We need to add a method that when the form
submits sends an Ajax request to the purchases, end point, let's start with that
method. So down in the method, ski, I'll add a new one called async on submit. I'm
immediately making this async because I know I'm going to need to wait for that Ajax
call to finish. Before I do some stuff, we'll start by saying this.loading = true.
Does that our loading state and then, because this is a checkout form, it's very
sensitive. I'm going to do a little more air handling than I've done before. So I'm
going to add a tribe

Catch. And also a finally,

And before I fell on the try and catch for the final, I'm gonna say this, that
loading = false. So the idea here is whether we are successful or unsuccessful, the
finally will be called and we'll set the loading state back to false inside the try.
This is one we're going to use that new, uh, create order function. So I'm going to
say constant response = and we will await for that happen or wait to create order.
Make sure you hit tab that added the import on top for me.

And then for the data

Then for the data, as a reminder, we need to pass our individual form fields. Those
are stored on here as a form of data. So what we can do down here is we can actually
say.dot, dot this.form. So that will expand those out in their individual fields. The
other thing we need is purchase items for now. Let's just set that to an empty array
because we're going to need the cart data in order to fill that in. All right, then
finally, for the catch for now, I'm just going to use a console that log, but
actually it, since it was an ALS who's console, that air that will make it a little
bit more obvious. And I'm gonna say error dot response. If a Axios Ajax call fails,
it's going to give you an air object that has the response on air dot response. Oh,
that's also a console that log the success response that might be handy,

Actually response.data.

Perfect. So that's the flow. We're eventually going to do something on success. We'll
eventually do something on air, but this is a good start now for the purchase items.
As I mentioned, what we really need that to be. If you go back to our view dev tools
and click on the shopping cart components is this should really be set to the cart.
That items data, it should be this array right here where each item has color product
and quantity on it. So we just need access to the cart object inside of our checkout
form so that we can access that. So over in our checkout form components after
components, I'll add a new props key,

And we'll

Add a cart prop, we'll say type object and required. Then before we use that, let's
go up into the shopping card dot view component. Remember, this is what actually
renders that component down here, checkout form. And we will pass cart = notice. We
don't need to, in this case, it's actually the space I'm purposely. No, I'm not going
to say that. Then finally, back over in index, that view we can use that. So the
purchase items is going to be set to this.cart dot items. That's the exact rate or
array

We want.

Okay, this now that our method has done, let's hook this up. When our button is
clicked, we want to call that new method or really it would be better than on click.
It would be better to add this on submit of the form that way, even if we hit enter
on, uh, on one of our fields, it would call that would submit our form and it would
still call our method. So up on the form tag, there

It is.

We'll add, add, submit = on, submit.

All right,

Let's try it. Move over, click the checkout form and submit an empty order. Oh, and
actually, before we do, I've got my button in the wrong spot. Come on, Ryan. We want
to move this div outside of our column. There we go. That's just a superficial
change, but that looks better. Or when I hit submit it, it, okay. It looked like it
worked a sort of loading animation, but then it did it full refresh. Probably a lot
of, you know, why

We forgot

To prevent the form some from submitting. So this is a classic thing. We on submit.
We want our JavaScript to prevent the default. So the easiest way to do this is down
on our async on submit. This is going to receive an event argument, and we can say
event

Prevent the fault. That's it.

Or that will fix the issue. We can do it a different way using some view of magic.
And that is to go back up to the form element where we use that. And we can say At
submit dot prevent, which is one of a very small number of special things you can put
there. It says, I want you to submit this book, prevent the default behavior. All
right, let's try. Now. I'll go to checkout and awesome. You could see the loading
icon there for just a second. And then it went away, go check our console suite. You
can see 400 bad request and here it's dumping out the response from that. So next
let's handle the AJAXfailure to both render a message in case there is an unexpected
error. Oh, so why did the Ajax call fail? Because our API already has built in
validation rules. So next let's handle the Ajax failure to both render a message in
case there is some sort of unexpected air and render real air messages next to each
field that fails validation.

