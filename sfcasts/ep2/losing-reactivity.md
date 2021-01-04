# Losing Reactivity

Coming soon...

View reactivity is magic. What I mean by reactivity is how view is smart enough to
rerender whenever a piece of data changes, but not just an entire piece of data. If a
data, if some piece of data is an object and you change just one property on that
object view will still intercept that. And rerender any parts that depend on that
data, but there are a few limitations to view reactivity, a few edge cases where view
can't work its magic and does not realize it needs to rerender Google for view
reactivity, to find a page on their docks and scroll down to change detection
caveats. There aren't many situations like this, but this first one talks about
what's happening to us view cannot detect property, addition or deletion, and a
property must be present in the data object in order for view to convert it and make
it reactive.

We talked about how reactivity works under the hood. In part one of this tutorial,
the short explanation is that when a piece of data is an object view, replaces each
property on that object with a getter and setter method, this is invisible to us, but
it allows view to be notified via the setter method. Whenever we change that
property, the problem comes when you create an empty object in the data function like
we're doing inside of our checkout form with validation errors, and then add a new
property to it, which we're doing down inside of our new validate field function.
We're adding a new property to validation errors, uh, that wasn't there before. When
we do that view, doesn't have any way to detect that the new property was added. And
so it can't make that property reactive. In other words, when we add that property,
or even if we change a change, the value of that property, new property later view
has no idea we're doing it. This is a long way of saying that if you have a piece of
data, that is an object like validation errors. When you set that entire piece of
data, be sure to include all of its properties, even if some are not. So basically up
here in data, I'm going to add a new property or all those things. I'll set them to
no this time.

Now the moment that the validation errors data is initialized, it will have all of
these properties. Then we're not creating properties down here inside

Of our

Function. We're just changing the value on a property that already exists. Well, this
also means that we're not going to delete a property. We're just going to say
this.validation errors

= no.

Now let's try our client side validation. I go to checkout and perfect. It instantly
updates. Yes, But if you submit the form,

Funny things start to happen.

No validation error on Ryan. Right? That makes sense. But if I clear it out, hit tab,
Hey, why didn't I get my validation error? This is actually the same problem, but
this time I want to show it to you in more

Detail, back in the component

At the top of validate field let's console that log, this.validation error. All
right, back over my page already refreshed. Let's go to checkout and I'll go to my
console. Now notice when I first blur the entire object is, has a dot.dot that's
actually because this, uh, the validation error

There's data is wrapped in a Gitter,

Which is views way of adding reactivity to it. And if we click to open this, it calls
that getter and you can see each property also has ... next to it. That's basically
an easy way for us to see that each property is reactive view did have the
opportunity to wrap this in a Gitter and setter method. So if we set that to
property, it would trigger a rerender now submit the form and I'll go back to this
and hit tab again. And I'll scroll to the bottom to see the new, uh, log and
immediately you can see it's not that, that dot anymore. And more importantly, each
individual property under there is not, not that that The fact that those are gone
means that each of these properties lost reactivity. If we set customers city
directly, there's no setter. That view has been able to add to intercept that.

And so it

Has no idea that it needs to rerender, it's just a normal object. The reason this is
happening is up here on submit at the top. We're resetting validation errors back to
an empty object. And when we set the validation errors later, we are once again,
creating new properties and those new properties are not reactive to see this some
more detail let's reinitialize, just one field to start, I'll say customer name. So
that's a Knoll. Now go back, go to the checkout form. And let's recent at the form.
I'll go into my name, field and blur that. So we get the lock. Now, check this out.
If you look at the things now, customer name is wrapped in a good or function, all
the other ones that's because when we reset the validation errors object, we included
the customer name, property that allowed view to add reactivity to it. So the full
solution is this. Whenever you set a key on data, Whenever you set or replace a key
on data, that is an object, whether it's in the initial data or it's later, when you
submit a form, be sure that that object has every property that it needs. So to do
this without repeating ourselves, I'm going to add a new method called get empty
validation errors,

And this is going to return an object. And then I will go up to our initial data and
I'm just going to steal all these fields here, go down and paste them. Perfect. Then
we can use this up inside of our data function, validation errors = this dot, get
empty validation errors, and then same thing down here on, on summit. We'll say
this.get empty validation errors. All right, now, move back over, go to the checkout
form. I'll hit. I'll hit submit the form right now. That should mess up. But now

[inaudible]

Now head over, got to check out. I'll hit submit. We see all the errors, but now
typing a name hit tab, and it goes away. Our reactivity is back. I'll celebrate by
removing my console. That team we're done. You did it. Wow. You are now massively
dangerous in view. So go build something really cool. And tell me about it. I would
love to know in a future tutorial, we'll cover the view three composition API. That's
the really big change in view three that can make sharing data and other
functionality between components a lot nicer. There was something else that you want
to know about. You let us know down in the comments. All right, friends. See you next
time.

