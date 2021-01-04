# Checkout Form

Coming soon...

The goal of this page is to have a checkout form. And when the user submits that form
to send an Ajax request to our API, to create a purchase in the database, which will
contain that information, plus the stuff that we have in our shopping

Cart because

Of our low budget NVP startup mentality, instead of having a credit card form after
success, we'll redirect the user to a page with information about where to mail their
payment. Very cutting it, Open assets components, check out in next dot view.

Let's do some prep work. Yeah.

This component is going to render a bunch of form fields like customer name, email
address, et cetera. And so it's going to need a, some data to, to store those values
at a data function, Returns an object with a form key set to another object. I don't
know if you've all of my form fields kind of under this here. Oh, I need a semicolon

Inside the,

The form. I'll add the customer name. I'm one key for every field customers,

Name, customer, email, customer address, customer zip customer city, and customer
phone. Cool. Next,

Because we're definitely going to be adding a form validation, add a validation
errors data set to an empty object. This will basically hold a map of which fields
are currently invalid with their corresponding validation. Yeah.

Message. Okay.

Let's add a form with the first field. So I'll replace my tax tier with a form tag. I
don't even need an action on it.

And then some

Basic markup here to create our, our field

Dave classical form dash group, then a label for the label. I'll say name,

Of course, the label also needs to have a four = and we'll call this customer name. I
use this for the ID to kind of match up with my field down here, and then also class
= call form label.

And then below this, I'll add the input.

This lab ID = customer name,

And then very importantly, V dash model equals. And here we can say form that
customer name. So we can actually target that. We want this customer name inside the
form to be updated. So thanks to this, the value of the input is going to match
whatever this is. So an empty string to start. And whenever we update the input, it's
going to send that value back to our data. So a perfect use case for V model and then
typical is taxed and class = form dash control. And over here, I'll go to check out
and all right, good start. And if we inspect element and go to the view dev tools for
our checkout form, we can watch our data stay in sync, thanks to the V model.

Oh,

But to be extra cool, we can actually do a V model dot trim, which is just going to
trim extra white space off of it. If I add that.

So that's nice.

Okay. Next, we don't have any form validation logic yet, but let's prepare our field
to be able to render the validation message based on our validation errors, a piece
of data to make this easy. I'm first going to add a new method section down here and
add a new method called is field valid, they field name argument. So we can call this
from our template. This is pretty simple. I feel as valid if not field name is in
this.and validation errors.

Perfect.

We can use this above first, the form control class here, we're now going to need a
second conditional class. Saul changes do colon class = and then Oakland curly close
curly. Then we have form controls set to true. And then I'll also have another called
is dash invalid. This is going to be set to not is feel valid and pass that customer.

Okay.

And then after the input, there's going to be an a T I span. That's actually gonna
render that air. So we'll say span And inside there, I'll say V show. Cause we only
want to show this. If it's, if not, is field valid passing that customer name And
then a class set to in valid feedback Then inside of the span, very simply we can do
curly, curly validation, errors, that customer name, which we know will be, will be
populated because the fields and Val Nope, and Eastland is mad. Cause I have messed
up my indentation. There we go. All right. So we move over. Uh, one annoying thing
you're going to notice is that whenever we moved back over to refresh back to the
shopping cart page, this is because we haven't changed the URL whenever we're going
back and forth. And so our component can't remember that we're on a different page.
So that is something that you could make better and probably should make better with
the, um, for example, like the view dev tools, The topic we'll talk about in a future
tutorial. Anyways, when we go to check out here to try this, we go to the view dev
tools, go to our checkout form and let's change the validation errors here to
customer name is that too. You got to enter a name and make sure that this is valid
JSON, which I know is kind of weird

There.

Make sure this is valid, JSON, which here we go. I have two quotes on mine. That's
why it's mad.

Let's just do that all over again.

Is that to customer name and then put something like you forgot to enter a name. It
saved and beautiful. It turns red and we get the error below. So this looks beautiful
and this field is ready. Go. There's just one problem. Do we really want to copy and
paste all of this five more times for the other five fields? Yikes. Nope. We can do
better. Let's create a new form input component that we can reuse for every field.
That's next.

