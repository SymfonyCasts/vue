# Cart Structure

Coming soon...

All right.

Time to start rendering some products properly. Now, instead of just adding more
logic right here to actually print out more cart details, you know, each card detail
is actually going to contain quite a few things, including a quantity box and also a
remove from cart button. So I'm actually going to stay going to create a component so
that renters, each individual cart item to do that in the assets components
directory, let's create a new new directory called shopping cart. I'll actually put a
few components in here over the next few minutes. And then for this one, I'm going to
do something different here. I'm actually going to go to new and then search for
viewed, create a new view components. Let's call this one cart dash

Item. So cool.

That generates a basic view structure for me though. It does look a little bit
different than our component Norma does. So let's clean it up. I'm going to start by
adding a div and then inside of here a class, but I'm going to set the class to colon
class and set this to an array

For two reasons.

First, I know that I'm going to need some costume styles. So I'm going to use a style
that component right now, so I can send it, have some, a component class down here.
And then I also know that this is going to need to be a row, and I'm going to give it
a little extra padding before I finished the template down here in our component.
Let's get us a better name, first

Shopping cart item. And then,

And because this is going to be rendering an individual cart item, we are going to
need a add props with an item prop. This will be typed object,

Correct and required. True. Perfect.

So we're going to pass into here is the complete cart item. The thing that we're
looping over inside of our shopping cart. So we know that this is a product key and a
color key, and also a quantity heat. So I'm going to print out in here just to see if
it's working. We can print out item.product.name,

Finally at the bottom instead of style scope, we're using module styles. So I'll say
style module. And also we've been using Lang SCSS as the language I'll paste in some
basic styling down here to give our component a border bottom. Okay, perfect. Now we
could go ahead and use this directly inside of shopping cart dot view. We could
actually do a V4 right here and render these cart items, but instead I'm actually
going to create another component. That's kind of between shopping cart, that view in
cart item dot view, and this is going to contain the act in the entire item list
itself. So there's going to be kind of one component around all of these items. Now
creating this middle component is not necessary. It's up to you. I'm doing it for two
reasons. First, eventually on our shopping cart page, we're going to add the ability
to hide the entire cart item list and instead show a shop, uh, a checkout form.

So having the entire list inside one component, it's going to make it easier and, uh,
to hide and show. The other reason is it's just going to keep our shopping cart, uh,
cleaner, um, because we were able to isolate all this looping and cart item logic
into another component. So anyways, in the shopping cart directory, let's create a
new index dot view and then I'll paste in a basic template. So you can see this takes
in an items array, and I've already had the little VF here to see if the item items
are empty, that we can have. The, your part is empty message.

All we need to

Now is do a V4 that renders the cart item. So let's start by importing that in import
shopping cart item from ATT /components /shopping cart /cart dot dash item, and then
add the components key down here with that shopping cart item inside. So now up here,
we're actually going to do before, directly on the shopping cart item. So we can say
shopping cart items

And then V dash four equals.

And I'm gonna use that same long syntax we usually for, which is item, comma index in
items. And the reason we're doing that remember is because our cart, each item
doesn't really have a unique key yet. So for the key down here right now, we're
saying colon key = index. That's not an ideal solution, but I'll talk about that
soon. Then finally, each shopping, our item needs an item prop. So we'll pass colon
item equals

Item. Okay,

This component is ready. Let's go use it in shopping cart down. And the imports let's
import

Shopping cart list

From at /components /shopping cart. Then I will add shopping cart list to the
components.

Bye-bye

We can simplify a bunch. We don't need any of this div here, but we do need to be
careful because remember the complete cart variable is not available instantly. So we
can say shopping cart list then inside of that, we need a V if, so this only renders,
if we actually have a complete cart, One prop that this needs is items set to
complete card, that items.

Yeah, let's try it move over and

Perfect. It doesn't look a lot better yet, but you can already see it has some
structure. And we now have a really clean place to render a lot of things, uh, and
its own component while keeping things clean. But first in our index component, it
does kind of bother me that we're still using just the index from the array as the
key. And this could cause rendering problems when updating items in the list. So
let's fix that next and we'll finally make this page look really good.

