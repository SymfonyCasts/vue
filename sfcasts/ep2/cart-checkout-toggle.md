# Cart Checkout Toggle

Coming soon...

[inaudible]

Shopping cart check. There's just one last feature we need to add to our site, the
ability to fill out a checkout form. Now we won't create a real checkout form with a
credit card field and all that payment processing. Isn't the target of this tutorial,
but we will build a real form for the customer's info with real validation, both
server side and client side. So is this checkout form a new page? We could do that,
but this time, instead, we're going to make this page right here, able to hold both
steps of a checkout process.

So step one will be kind of showing this cart and they'll have a button to move to
step two, which will be filling out the credit card form. This would be a great
opportunity to chat about view transitions. So let's get to work, start in assets
pages, shopping cart dot view, which is the component that holds all of this stuff.
Most importantly, it holds the car sidebar component and the shopping cart list
component, which is what we see right here. What we're going to do now after the
shopping cart list is add that button. That's going to allow us to move to the
checkout step. So I'll add a div and inside of here, we need to give us a couple of
classes. So we only want this button to show up if the complete cart item, uh, data
is available. And if there are actually items in the cart. So I'll add a VF for
complete cart and complete cart dot items. That length is greater than zero. And it's
out of here. A lot of button give us a class of BTN, BTN dash primary.

And inside there, we'll say check out. He is enough and we move on and you can see it
right down there. So now this, so now our shopping cart component is going to have to
sort of States that the user can toggle between the cart state that shows the
shopping cart and the checkout state that shows the checkout form and a piece of data
to keep track of this. I'll add a current state and we'll default it to cart because
that's our first state. I'll make sure I spell that correctly. Okay. Next, when the
user clicks the button up here, we're going to call a new method to between those
States. So I had at click = and then we can call it switch state, and I'll copy that
name. Finally, head down to the bottom and I'll add that new method switch state. And
instead of here, we're only going to have two States. So it's pretty simple. We can
say this.current state equals. And then if this.current state = cart, then we want to
go to the checkout state else. We are in the checkout state. Can we want to go back
to the cart state? This button will be allowed, will allow us to switch back and
forth between those two States.

So we're not using this current state in our template yet, but we can already at
least see if clicking this button changes things. So I'll go to view dev tools, find
my shopping cart and find that part of the data, current state cart, click it. And,
huh, it didn't change. Actually it did change. If you click off of that component and
back on and go find that piece of data, it did change to check out. This is a cork
with the view dev tools. If you change a piece of data, but that data doesn't cause
anything to rerender then the dev tools won't instantly update. So no big deal. Just
have to know that that might happen. So let's render something based on this state.
We'll start with two things. First. I want to change this title from shopping cart to
checkout and they'll change the button itself from checkout to go back.

Let's add two computed properties to determine these two things. Okay. So let's see
fun, our computed section. There it is. And I'll add one called page title. Again,
this is pretty simple because we just have two States here, return this.current state
= cart. So for in the cart States, then we will return the page title shop McCart,
Elsa returned the page title of checkout. I'll copy this entire method because we'll
do something very similar for a computer property called the button text. So for on
the card, then we're going to want to have some button texts, like check out. And
then if we are on the checkout form, then we'll have a little back arrows and the
word back. Perfect. And then we can use these up above. So I'll scroll up and find
the component or a passing in the text. This will not be colon text, page title, and
then down here for the button, we can say curly curly button text.

Okay,

Correct. Now let me switch over. I actually closed my browser tools here for a
second, so we can see the title, but click and we've got it. We already have the
shopping cart itself, isolated into its own component to keep things organized. Let's
also create a separate component for the checkout form so that we don't have to just
kind of inline it here, create a new checkout directory And then a index that view
file inside I'll paste in a very simple template that just prints some texts. And it
has the most basic view, uh, export

Back in shopping cart review, let's use this. So step one, import this thing. So
import checkout form from as last component /checkout, and you probably saw my
mistake there. Check out needs to live in components, not directly in assets. There
we go. Now that's happier. And then we'll put checkout form down here inside
proponents, and then we can use this up above, but before we render it, let's
actually look at the shopping cart list. So now you currently have a VF. So this only
displays once the complete card data is there. Now we want to only display it when
the complete card data is there. And if the current state is cart, so I'll add here
and current state = now go right below this and add our checkout form.

And they're actually gonna do something very similar. Actually copy that VF from
above and this time we'll change cart to checkout. All right, let's try it out, spin
over. And boom, there we go. One page able to toggle between those two States, which
is pretty cool, but this change is a little abrupt. I love to have some nice
transition between the two, like the old one fades out and the new one fades in. Can
we do that? Of course, CSS itself supports transitions and what they special view
feature. We can leverage those CSS transitions perfectly. Let's learn how

Next.

