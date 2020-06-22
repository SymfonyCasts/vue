# Helpers

Coming soon...

We've already been organizing our code in several ways. Obviously the biggest way is
that we can break our components down into smaller pieces, which is awesome. But
we've also been creating these services, which are primarily for, are for fetching
data, primarily they're for making Ajax calls. But, you know, in some cases we've
actually grabbed global variables. Uh, and in other cases, we actually have made AGS
calls, but these aren't the only ways that we can organize our code. I just want you
to remember, like we're in JavaScript. So if you have a chunk of code that does some
logic, you can totally isolate that into its own JavaScript file. The same way that
we isolate logic into services instead of Symfony. So for example, look at product
card dot view down here, we created a computed property that takes the product's
price, divides it by a hundred and then converts it to decimal digits for display.

And then we're using that up here in our template. Um, let's suppose that we want to
isolate this into its own file. And we might do that for a number of different
reasons. One, we might need to reuse this from another components. Having logic
inside of your components is a bit like having logic inside of controllers and
Symfony. It's not the worst thing ever, but it makes your controllers harder to read.
And it also means that you can't reuse it from other controllers. So if we needed to
reuse this logic from another component that needs to live in its own file, or we
might just organizing it into its own file just to keep things organized, or we might
do it because we want to unit test this stuff. The point is we're going to isolate
this logic of for many prices into its own file. Now I'm not going to put it in
services because as I mentioned, at least in my project services is meant for things
that are using that are fetching data

[inaudible]

and said, it was, you can really do whatever you want, but I'm going to create a new
directory called helpers inside of there. Let's create a new file called format
Christ that JS, and here I'm an export default. And I'm actually going to use the, a
hipster->syntax here to save them export default, a function

[inaudible].

And for the body of that function, I'll go to my product card. I'm actually going to
copy this line here and paste that, and then we'll change to use the price argument.
Brilliant. Now you notice it looks like he is angry. It says unexpected block
statements surrounding Aero body move the return value immediately after the arrow.
So you don't have to do this, but the way I have my S S Lynch rule set up is that if
I have an->function that literally only has one a return statement and it's, and then
we can actually change this a little bit too. We can use parentheses around the
outside, and then inside we can remove the return and the semi-colon there in the
end. So that's now an implied return. And if you don't like that, you can just use a
normal function as well. And like all good programming. Now we can actually add some
JS doc to this. So say that the price is a number, and we'll even add a little bit of
a description to this.

And now we have a nice little reusable file. Uh, by the way, there are two ways to
organize your helpers. You can either have a file, like format price, which exports
default, a single function, or if you had like a number of different like number
utilities or price utilities, you could create a file called something like number
dot, JS, and then you can export named functions. That's a little bit more similar to
what we're doing inside of our services. So it's up to you, which one you like
better. All right. So let's go use this inside of product card view. Now, obviously
the first thing we're gonna need to do is actually import that into this component.
So I'm going to say import

format price from at /helpers /format price. Now, when I first started using view,
the way I wanted to use this was I wanted to take this format price and say, Hey, I
have a local variable inside of here. So let's go right up to our thing here. And we
can say format price, and then we'll pass it. This that we'll pass it, product, that
price, because you have a product object here and it has a price variable in it. Now
this point that Israel, hopefully a lot of your thinking, that's not going to work
and you can see down here, it says property or method, format price is not defined on
the instance, but referenced during render, because we know in reality, whenever you
reference something like a variable or function inside of a template behind the
scenes, what it really does is call this.format price.

And we do not have a format price method on our object. You know, we don't, all we
have is this one computer property called price. There's no methods down here. So the
point is we can just import format, price, variable here and expect it to magically
be available there. Instead, I'm going to go back to my computed property. I'll go
back to just printing price that will print this computer property down here. And in
here we can use our new helper. So we'll say return format price, and they'll pass
it. The same thing we did before, which was this.product,

that price

now to go over. Yep. It works perfectly. Let me get rid of my search term here.

Nice.

And there are no heirs next. Let's make a search for a little bit fancier by adding a
little X icon over here to clear the search. Um, yeah, that's what I do.

