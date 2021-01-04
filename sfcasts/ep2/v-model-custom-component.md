# V Model Custom Component

Coming soon...

Okay.

Our new form input mostly works and we'll be able to easily reuse it to render all of
our fields. The only missing piece is that one we type into the field. It's not
updating the data on the checkout form.

Okay.

Normally we would fix this by emitting any event from the child components so that we
can listen to that event in the parent component and update the data which lives
there. So let's do that inform and, but On the input element, add, add input equals,
and then I'll use the inline format to emit and event from this component. What's
call it input to match the event. Name that's used for a normal form element for the
data, for the data. Let's just pass the new value event.target dot value.

Cool.

Now in the pair of component, we can listen to that

At input = and then we'll immediately update the data with form dot customer name =
dollar sign event, which will contain the new value. All right, let's try it. Move
over, go to checkout type in my name and let's check the data and perfect. It is
updating, but I do wish we could do something cooler. If this were a normal form
element and not a custom component, then we could simply use the model instead of
having value = and add input. That's because for a normal form element, when you say
V dash model = customer name, it's equivalent to this colon value = customer name and
add input = a function that sets customer name equal to event that target dot value.
Well, it turns out that you can also use the model on a custom component, but it
means something slightly different. Using the model on a custom components still
causes a value prop to be passed, but the ad input function is a bit different. It
expects the custom component to emit the input event and pass the New data as the
event object itself. So wait a second. That's exactly that exactly matches our setup.
We have colon value = the piece of data that we're passing in and input = that data
being set to the event object. So yes, we can simply remove these two lines and
replace them with the model or move at input

And change the call-in value to V dash model = form dot customer name. Let's try it.
I'll go over hit checkout. I'll go directly to my checkout form right here, open up
my data and type here in a full, how cool is that? Oh, but one quick note for view
three, this changes slightly in two different ways. First the model causes The model
now passes a prop called model value instead of value. So in the form income form
input component, we would need to change this to model value and then use that model
value up here inside of our component. Second, the name of the event have changed.
Your custom component will now need to emit an event called update colon, and then
the name of that prop. So model value, that's it just a change to the prop that V
model,

Okay.

Uh, sends you and the event you need to admit. So since this project is on view too,
I will undo those changes, but it's that simple. Next let's use our custom input to
render all six of the form fields that we need. We use a fruit few tricks to make
that easier and more flexible.

