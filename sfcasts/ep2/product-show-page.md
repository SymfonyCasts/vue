# Product Show Page

Coming soon...

Let's build a product page. We'll get there by clicking on this link or the image or
any of this. Now we could use the view routers that when we click any of these links,
there's no refresh. We'll save that for another tutorial in part, because I want to
prove that view can be used just as well in a traditional app. This means that we
will make these nice traditional links, the template for this lives, add assets,
components, product list, product card, that view Let's separate wrapping the image
and an anchor tag. So I'll say, Hey

In Dandenong and do the closing a Hey, do the closing and then indent.

And for the H ref, let's actually use a computed property. So I'll say colon a draft
and we'll use a computer property called product URL. So we don't have to repeat
ourselves over and over again.

Do the

Same thing down here for this product name. I'll say a H ref I'll change that to
colon H ref product URL, and then we can wrap the product name actually to be extra
fancy. Ooh, we can even instead use the fancy, The text and put product that name
inside of there. Totally do not need to do that. Just kind of a little more hipster.
Now I can have the anchor tag be self-closing.

Okay.

And finally, down here for the actual view product button, we should really change
this to a normal, a tag that's semantically, correct? Because this is just going to
be a normal get request link, but to be extra complicated, let's activate this with a
click listener. So I'm going to say, add click = go to product. We will call a new
method that we haven't created yet. I would not do this in a real app. I'm just
trying to make our life harder for the tutorial. Yay learning. So if we go over right
now and I will open my browser tools, thanks to the dev server, I don't even need to
refresh. It's already freaking out because the property or method, product URL is not
defined on the instance. So let's add that first down here, we already have a
computed section. So I'll add a new product URL computed and inside of here

Let's return. And I'll use the look cool little ticks. So we can say /products /and,
and dollar sign, open, curly, close curly, and inside of there, we'll say this
product, that ID, which is one of the properties that we have, uh, on the product.
Yes, I am hard coding the URL. We talked about this in the last tutorial, doing this
makes life a lot easier, but if you really hate this, you can use FOS JS, routing
bundle. If you want to generate them dynamically, that's all supposed to finish this
by adding the, uh, method that we need for the Ana quick listener, the go-to product
method. So at the bottom, I'll add a methods section Go-to product. And inside of
here, we can use a window dot location = and then this.product URL To use our
computed property. How nice is that? All right. Let's try it. If I move over it
automatically refresh for me, I'll click any of these spots and we'd go do a big
error page. Okay. Let me show you something. Before I started recording this tutorial
in the source controller product controller directory, This is the controller that
actually renders the pages we've seen so far, the homepage, which renders the
category list, the individual category page. And before I started recording the
destroyer, I already added a route and a controller and a template for our new
product show page. So this is actually what's being executed right here. Now notice
all of these, uh, control rented the same template, actually rent, which is
templates, product index dot HTML, that twig.

Yeah.

Before I talk about that, just in general, now that we're on this product page,

We can really

Render anything. So if we wanted to, we could decide that this is just going to be a
normal twig rendered HTML page. And maybe we render a new product /show to HTML twig,
and it's a totally normal page. And I guess our view application is just responsible
for the kind of a product list page, but then the product show page is a traditional
app. Or if we wanted to, we could run it the same. We could render a completely new
view application. We could render a dif different template that renders a different
view application that does something totally different, or we could render the same
view. Application

Happened,

Detect that we're now on a product show page and make it render in a different way.
We're still doing full page refreshes, but this is the idea behind a single page
application, or even a mini single page application that powers a section of your
site. You have one app,

Okay.

So which page you're on and then renders differently based on that.

Yeah.

So instead of our index, that age toy, you can see that we're rendering this
product's entry, which is this, uh, assets, products that JS file. And you can see
what it does. It just grabs this pages /products view application, which is this
products that view here and render

That

What we're going to do is actually make this component smart enough to either run to
the product list page or the product show page. Normally that kind of toggling is
done with a view router, which also helps avoid full page refreshes. We won't use
view router, which will actually be a bit trickier in some ways. Anyways, this page
is already set up to use the same template as the other pages, which as I mentioned,
renders this products entry point and ultimately renders this product status view
component. But in order to get this work inside of our template, we're actually
passing. One of the things we need to pass here is the, uh, list, uh, the categories
data, cause that's actually used inside the applications. So that's why we're getting
this air.

So

To do that, we'll use the same thing that we did before. And we can see in all of our
controllers are passing this categories information. It's actually copying the
categories variable from the, uh, one of the other end points. And we need to auto
wire category repository. So no problem, we'll say category Repository, category
repository, and I'll add a second argument to the render and pass in category.

Now when we refresh

It's alive. But of course, since we're executing the exact same view app is before it
renders the product list page. So next let's pass some info to view, to say, Hey, we
are on the product show page. We'll then use that information inside of our products,
that view components to render different things inside of it.

