# Form Input Component

Coming soon...

New goal to avoid duplication of all of this markup for every single form field.
Let's isolate this into a nice reusable component inside the checkout directory,
create a new form dash input. That view file for the template part. Let's copy the
entire field, including the div around it. Delete that, and then paste it here next
for the script export default. And give us a nice name like form input. Finally, go
grab the methods key from the other component. Delete that and add that here. Okay.
It's not at all dynamic yet, but it's a start. So now let's use this inside of index.
That view here we can import form input from app /components /checkout /form input at
a components key

And put

And put the form input inside. Okay. Use that up top inside of our form form input,
but that is not going to work yet. Some it's empty. So no. When we move over and
click checkout, we get a huge air. A bunch of things are hard coded in the new
components. And most importantly, we're referencing the form inside of a V model.
It's a review model referencing a form piece of data that doesn't exist. Okay, so
let's make this component truly reusable. So in order to allow it to be reused, we're
going to need to pass a bunch of different pieces, uh, of things into this component,
um, as props.

So let's head down here and add a new props key and start adding the things we need.
First we're gonna need is the ID of the field that we need. That will be a type
string. And we'll say required to then I'll copy this second thing we're going to
need is the label, which will also be a type string. And then the next will be the
error message. Because remember, like this component, isn't going to know whether or
not its data is valid or not. It's just a dumb component that renders an input. The
parent will need to tell it we'll need to run validation and tell this component
whether or not it's valid. So this will be type string, but instead of required,
true, I'll say default empty quotes. And finally, the last thing we're gonna need is
a value. This would be the, whatever the value should be of that field. And I will
say once again, I'll say I'll, I'll default that to empty quotes. We could actually
have the value as a piece of data instead, but we would still need to have a prop
here that is whatever the initial value should be in. Cause the parent components can
need to be able to control what our initial value is.

And it turns out we don't really need a value data. All we're going to do in this
component is just notify our parent whenever something changes.

Okay,

Now we can use those up in the template. So the four all change to colon for ID,

The name will change to label.

Then down here, the same things, the ID will just change to colon ID = ID, and then
we won't be able to use V model anymore because the data will actually be stored in
our parent component. All we want to do in here is just render whatever the value
should be. So colon value = value. Now for this is field valid. We don't really need
a method anymore where we pass ourselves the name, um, we'll know whether or not this
field is valid, based on the Error message, uh, data. So, um, instead of a method
here, I'll, I'll, let's still use a computer prop cause it'll make it a little bit
clear. So I'm gonna go down here to our methods and actually change this to computed.
And then we'll just call. This is valid. And of course now it will take no arguments
and simply we can return not this.error message.

So

Up here, we can use that to simplify things a little bit, if not, is valid and then
same thing down here for the V show, if not is valid and then for the error, it's
just going to be printing out our air message. All right, cool. Um, Oh, and I'm also,
I don't really need to do this one. I'm actually going to also add a colon name,
name, attribute, set to ID. We don't really need a name because this form has only
given me submitted by view, but it kind of bothered me that it didn't, it wasn't
there. Okay. So this is good. This is now should be reusable. All we need to do now
is pass these prompts in from our parent component. So up here, I'll drop my form
input onto multiple lines and we can say ID = customer name, colon value = form. That
customer name label = just name, colon. And then for the error message, we'll say
colon air message equals, and we'll make this dynamic. It's going to be validation
errors, that customer name, all right, let's check this out. When we move over and
should go to checkout beautiful. We have our field.

And if one of the nice things is that if you look at the view dev tools and go to
checkout form and form input, you'll notice here that the data for error message is
actually set to empty quotes. Um, in reality, we're passing validation, errors dot
customer name, which is undefined, because if you remember validation, errors is just
an empty object, but when you pass an undefined value into a, as a prop and that prop
has a default value, it uses that default value. So it's just a nice thing in here
that we end up with a nice empty quotes instead of an undefined value. Now, the only
thing that doesn't work of course is that when we type our name into this, this is
not updating that data on our parent component. It's still empty quotes, but no
problem. We know how to fix this. We will emit any event from our new component.
Whenever the input changes, then we can listen to that event inside of our parent
components and update the data there. But hold on a second, because if you think
about it, if this weren't a custom component, if this were just a normal, boring
input, then we could use V dash model to update the data and be done with it. Okay.

My question is, could we still use V model here, even though this is a custom
components? The answer is totally. Let's see how next.

