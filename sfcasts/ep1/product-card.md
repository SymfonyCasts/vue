# Product Card

Coming soon...

Let's really make these product cards come to life. This will be really fun now that
we have a product card  component, which who only has one job.

Make that one little product card area. So I'm actually going to paste in some HTML
content. You can get this from the code block on this page. There's nothing too
interesting. Yet. Couple things I'm going to point out here are we are referencing a
couple new styles. So `$style['product-box']` and `$style.image`
We don't have any a style attribute down at the bottom yet, but we'll add one
in a second. And if you're wondering why I use the less square bracket syntax here,
that's because if you have a class with a dash in it, you can't say `$style.product-box`
which is super annoying, but that's why I'm using the two different style.
Two different ways. Uh, here, down here, um, we did start using the product data. As
a reminder, if you look at view and you look at Catalog, each product has quite a lot
of fields on it. We have a `brand`, we have an `image` which is actually showing an
image, `name`, `price`, uh, even `stockQuantity`. So we're here for this image. We can
actually use `src="product.image"`. But of course we want that to be dynamic.
So where you put the colon in front of it, same thing with the alt alt after year
`:alt=""`, because we want this to be set to the a, it's a dynamic
`product.name` down here, putting `product.name` again, and then down here, 
`product.price`.

Then we have a button for viewing the product, which is not actually working at, and
then we print `product.brand`. So hopefully that feels fairly straightforward to
this point. That's actually kind of a boring, fun work with Vue. Now, if we go back
over and look right now in the console, you're going to see the error is, cannot read
property, `product-box` of undefined coming from our product card. So what it's
talking about is it can't read `product-box` of undefined style is actually undefined,
which sort of makes sense. We don't have a style actor down here. So you don't
actually have a style variable available to you at all until you have a `<style>` tag
down here and not actually just any style tag, let me add, my `lang="scss"`. You
actually need to make sure it has the `module`. So it's actually the module that you
put on there. That is actually what makes the style at you suddenly available. So we
go over here right now. Oh, I should go over there. Yeah. So right now I'm actually
going to refresh, Hmm. That doesn't actually work. Let's not do that. Nobody going to
style. One of the things that I'm going to need to use to actually add those styles
is if you look in our `scss/` components directory, I'm actually going to bring in this
`light-component.scss`, this is a mixing. So I'm actually going to import that.
Now as reminder,

right?

When you guys were in CSS, we can use the normal `@import`. That's just a CSS thing.
But to reference our styles, alias, we created earlier, we can use `~styles/`. And
now we're basically pointing at the `scss/` directory. So we can say 
`components/light-component`

no, no, no. Here I'll actually paste in the rest of our styles. Again, you can get
those from the Kobach in this page, nothing too impressive. Um, the product is a
`.product-box` and an `.image` class that correspond with our style, that `$style['product-box']`
and the `$style.image` up there. So now that we have all that, we move over

and I don't see any products. Let's actually refresh the page. Boom. There they are.
The hot module replacement. Wasn't perfect. There, we have images, titles, prices,
the button. Now we are in business.

Whereas if you look closer, kind of one of the problems is that the prices I would
love to sell blank CDs for 13, $1,300, but actually that's not the intention. Um,
it's pretty common when you work with, uh, prices to store the prices in the lowest
unit of that currency. So this is actually meant to be 2300 cents. So $23. So really
the problem is that we actually need to, we have a formatting problem on this. We
actually need to take these dollar amounts and divide them by a hundred. But even
though this page has all nice even numbers, um, you know, if we add something that
was like 24,50 here, that would need to be formatted as `24.55` or maybe `24,55`
depending in your, on the, um, the locale. The point is then we have a
problem. We have a situation where we want to print the price data, but we need to
change it first. So the real value that we need is based off of that, but it's
something slightly different whenever you need to do print something inside of your
template, that is, that uses data or props, but is somehow slightly different. That
is when you use computed properties in computer properties, or one of my absolute
favorite things inside of Vue, plus that a new `computed` key down here

and we'll create a one called `price()`.

Now, remember computer properties actually inside of them, you actually create
functions. But then inside of our template, we're just going to reference this like
a, um, property, like a variable. So inside of here, I'll say return, and I'll say
`this.product.price`, uh, to reference a reference in the dynamic data, the
price property, I'm going to say divided by a hundred. So that's a good start. And
then we need to convert that into like a nice decimal with two figures. So I'll say
dot, and we can use a, a fun little method here called `.toLocaleString()`. So
basically `this.products.price` is a number. And then the number has a method on
it called to locale stream. And what you can do here is you can pass the locale. So
I'll use `en-US` for me, and then he get past some options over here. So one of
the option is `minimumFractionDigits: 2` So that's a little funny thing.
That's a kind of a nice little built in thing that JavaScript has and you going to be
super cool. You can even put some documentation above this returns, a formatted price
for the product.

Perfect. Alright, so now that we have a price computer property, we can now just go
up here and say curly, curly `price` as if that were a prop or a data. If you want to
get super nerdy behind the scenes, computer properties are added.

Computer properties are actually added. Almost a computer computed properties are
actually added as properties to the actual V instance. And you can reference them
even inside of your component with `this.price`. Um, but behind the scenes view is
smart enough not to make that a real property. It actually calls our method every
time we've referenced that a price property. All right. So go over and I don't even
need to refresh. You can already see beautiful dollar sign, 30 three.zero, zero.
Awesome. Next let's do something else. Let's improve. Let's improve how our page
loads, because right now you can see that there's no products for just a moment until
we get away from the load. We can actually load them a little bit earlier and we need
to put up a loading screen. That's next.

So one thing I want to point out with the sort of architecture you've created here is
that if you look at `catalog.vue`, it has logic related to, I'm actually making
the Ajax call and later it's actually going to have a search fire up here, and it's
going to kind of handling what the current search is, but it doesn't render a lot of
markup. I mean, yeah, it has an `<h1>` up here and a `<div>` down here, but it's basically
its main job is just kind of contained data and logic. Now, if you look at something
like `index.vue` or this doesn't have any logic in it, all it does is just
receive prompts and render stuff. This is kind of a design pattern in Vue and also
react that I want you to have in the back of your mind. It's a smart components
versus dumb components type of thing.

And it said, DIA, that as best as you possibly can, you want to organize some
components to be smart components that basically just handle complex data
manipulation, Ajax calls, things like that, but don't render any markup or maybe
render very little markup. And then you have other components that don't do any Ajax
calls or anything very complex. They just render stuff, product cars, another
example, but dumb component. Sure. It has a computed property to do some basic data
manipulation, but this is just a component that sits here receives a prop and renders
it. It's a nice dumb component in Symfony. You can almost kind of think of this as
the catalog. The smart component is like your controller is the thing that gets all
of the data. Then it passes that data into the template, which is sort of our dumb
components. And all they do is just kind of receive that data and render it. It's one
of those rules that you don't have to follow, of course, but if you kind of keep this
in the back of your mind, it's going to help you create components that are a little
bit more well organized.

