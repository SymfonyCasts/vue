# Product Card

Coming soon...

Let's really make these product cards come to life. This will be really fun now that
we have a product card component, which who only has one job.

Okay.

Make that one little product card area. So I'm actually going to paste in some HTML
content. You can get this from the code block on this page. There's nothing too
interesting. Yet. Couple things I'm going to point out here are we are referencing a
couple new styles. So dollar send style product dash box and Dodge and styled. That
image. We don't have any a style attribute down at the bottom yet, but we'll add one
in a second. And if you're wondering why I use the less square bracket syntax here,
that's because if you have a class with a dash in it, you can't say style dot product
dash box, which is super annoying, but that's why I'm using the two different style.
Two different ways. Uh, here, down here, um, we did start using the product data. As
a reminder, if you look at view and you look at catalog, each product has quite a lot
of fields on it. We have a brand, we have an image which is actually showing an
image, name, price, uh, even stock quantity. So we're here for this image. We can
actually use source = product that image. But of course we want that to be dynamic.
So where you put the colon in front of it, same thing with the alt alt after year
colon alt equals, because we want this to be set to the a, it's a dynamic
product.name down here, putting product that name again, and then down here, product
dot price.

Yeah.

Then we have a button for viewing the product, which is not actually working at, and
then we print product that brand. So hopefully that feels fairly straightforward to
this point. That's actually kind of a boring, fun work with view. Now, if we go back
over and look right now in the console, you're going to see the error is, cannot read
property, product dash box of undefined coming from our product card. So what it's
talking about is it can't read product box of undefined style is actually undefined,
which sort of makes sense. We don't have a style actor down here. So you don't
actually have a style variable available to you at all until you have a style tag
down here and not actually just any style tag, let me add, my lane goes STSS. You
actually need to make sure it has the module. So it's actually the module that you
put on there. That is actually what makes the style at you suddenly available. So we
go over here right now. Oh, I should go over there. Yeah. So right now I'm actually
going to refresh, Hmm. That doesn't actually work. Let's not do that. Nobody going to
style. One of the things that I'm going to need to use to actually add those styles
is if you look in our SCSS components directory, I'm actually going to bring in this
light component that SCSS, this is a mixing. So I'm actually going to import that.
Now as reminder,

right?

When you guys were in CSS, we can use the normal ad import. That's just a CSS thing.
But to reference our styles, alias, we created earlier, we can use tilbay styles. And
now we're basically pointing at the SCSS directory. So we can say components /light
component.

[inaudible]

no, no, no. Here I'll actually paste in the rest of our styles. Again, you can get
those from the Kobach in this page, nothing too impressive. Um, the product is a
product box and an image class that correspond with our style, that pro style product
box and the style, the image up there. So now that we have all that, we move over

[inaudible]

and I don't see any products. Let's actually refresh the page. Boom. There they are.
The hot module replacement. Wasn't perfect. There, we have images, titles, prices,
the button. Now we are in business.

Whereas if you look closer, kind of one of the problems is that the prices I would
love to sell blank CDs for 13, $1,300, but actually that's not the intention. Um,
it's pretty common when you work with, uh, prices to store the prices in the lowest
unit of that currency. So this is actually meant to be 22300 cents. So $23. So really
the problem is that we actually need to, we have a formatting problem on this. We
actually need to take these dollar amounts and divide them by a hundred. But even
though this page has all nice even numbers, um, you know, if we add something that
was like 22,450 here, that would need to be formatted as 24 dot 55 or maybe 25, 24
comma 55, depending in your, on the, um, the locale. The point is then we have a
problem. We have a situation where we want to print the price data, but we need to
change it first. So the real value that we need is based off of that, but it's
something slightly different whenever you need to do print something inside of your
template, that is, that uses data or props, but is somehow slightly different. That
is when you use computed properties in computer properties, or one of my absolute
favorite things inside of view, plus that a new computer key down here

and we'll create a one called price.

Now, remember computer properties actually inside of them, you actually create
functions. But then inside of our template, we're just going to reference this like
a, um, property, like a variable. So inside of here, I'll say return, and I'll say
this stop product, that price, uh, to reference a reference in the dynamic data, the
price property, I'm going to say divided by a hundred. So that's a good start. And
then we need to convert that into like a nice decimal with two figures. So I'll say
dot, and we can use a, a fun little method here called two locale string. So
basically this.products, that price is a number. And then the number has a method on
it called to locale stream. And what you can do here is you can pass the locale. So
I'll use E N dash U S for me, and then he get past some options over here. So one of
the option is minimum fraction digits set to two. So that's a little funny thing.
That's a kind of a nice little built in thing that JavaScript has and you going to be
super cool. You can even put some documentation above this returns, a formatted price
for the product.

Perfect. Alright, so now that we have a price computer property, we can now just go
up here and say curly, curly price as if that were a prop or a data. If you want to
get super nerdy behind the scenes, computer properties are added.

Computer properties are actually added. Almost a computer computed properties are
actually added as properties to the actual V instance. And you can reference them
even inside of your component with this.price. Um, but behind the scenes view is
smart enough not to make that a real property. It actually calls our method every
time we've referenced that a price property. All right. So go over and I don't even
need to refresh. You can already see beautiful dollar sign, 30 three.zero, zero.
Awesome. Next let's do something else. Let's improve. Let's improve how our page
loads, because right now you can see that there's no products for just a moment until
we get away from the load. We can actually load them a little bit earlier and we need
to put up a loading screen. That's next.

