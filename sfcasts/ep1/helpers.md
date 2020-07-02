# Helpers

We've already been organizing our code in several ways. Obviously, the biggest way
is that we can break our components down into smaller pieces, which is *awesome*!
But we've also been creating these services which are for fetching data, most of
the time by making Ajax calls, and in some cases by grabbing global variables.

These aren't the only ways in which we can organize our code. Remember that in
JavaScript, like with *many* other languages, if you have a chunk of code that
does some logic, you can *totally* isolate that into its own file, the same way
that we isolate logic into services inside of Symfony.

For example, look at `product-card.vue`. We created a computed property that
takes the product's price, divides it by a hundred and then converts it to
decimal digits for display in the template. Suppose that we want to isolate
this into its own file. We might do that for a number of different reasons.
 
One, we might need to reuse this in another component. Having logic inside of
your components is a bit like having logic inside of controllers in Symfony.
It's not the *worst* thing ever, but it makes your controllers harder to read.
It also means that you can't reuse it from other controllers, so if we needed to
reuse this logic, this needs to live in its own file. On the other hand, we might
be *just* extracting it just to keep things organized... or we might do it
because we want to *unit test* this stuff. The point is, we're going to isolate
this logic of formatting prices into its own file.

I'm not going to put it in services because, as I mentioned, at least in my
project, services is meant for things that are fetching data in some way. Also, in
functional programming, a `helper` is a term often used for functions that
process some input information and returns something else with it. And *this* is
the concept we're going for now.

## Create a Helper Function

It's up to you to decide your ultimate application structure. In my case, I'm
going to create a new directory called `helpers` inside of `js`. Create a new
file called `format-price.js`. In here, I'm going to `export default` and actually
use the more *hipster* `->` syntax to say that I `export default` a function.

For the body of that function, I'll go to my `product-card` and copy this line
here and paste it. Then we'll change it to use the `price` argument.

Brilliant! Now, you might notice ESLint is *angry* here. Does it NOT like
hipster code? How *dare* you, ESLint? Oh, no! Phew...! It says "unexpected
block statement surrounding arrow body. Move the return value immediately after
the arrow." You don't have to do this, but the way I have my ESLint rule set up,
is that if I have an arrow function that literally only has one a return
statement, we can use parentheses around that statement. Then inside, we can
remove the return and the semi-colon there in the end. That's now an *implied*
return.

If you don't like that, you can just use a normal function as well, and like all
good programmers, now we can actually add some JS doc to this. We'll say that
the price is a number, and we'll even add a little bit of a description to this.

Now we have a *nice* little reusable file! Uh, by the way, there are two ways to
organize your helpers. You can either have a file, like format price, which
exports `default` a single function, or if you had like a *number* of different
price utilities, you could create a file called something like `number.js` and
then you can export named functions. That's a little bit more similar to what
we're doing inside of our services. It's up to you to decide which method you
like better.

## Using the Helper Function

All right, so let's go and use this inside of `product-card.vue`. Obviously,
the first thing we're gonna need to do is, actually import that into this
component. So I'm going to say `import formatPrice from '@/helpers/format-price'`

When I first started using Vue, the way I wanted to use this was to take this
`formatPice` and say: "Hey, I have a local variable inside of here! So let's go
right up to our template and say `formatPrice`, and then we'll pass it,
`product.price`!". Because you have a `product` object here and it has a `price`
variable in it.

I really wish it were *that* simple! But if you go over here in the console...
our dreams are crushed! It says `property or method, formatPrice is not
defined on the instance, but referenced during render`. In reality, whenever you
reference something like a variable or function inside of a template, behind the
scenes, what it *really* does is call `this.format price` on the Vue instance.

But we *do not* have a `formatPrice` method on our object. All we have is this
one computed property called `price` and there are no methods down here. So the
point is, we can't just import `formatPrice` and expect it to magically be
available in our template. Instead, I'm going to go back to my computed
property, change this back to just `price`. *Now* in the computed method we can
use our new helper. We'll say `return formatPrice`, and we'll pass the same
thing we did before, which was `this.product.price`.

## Try it in the Browser

When we go over. Yep! It works perfectly! Let me get rid of my search term here.
Nice! There are no errors in the console.
 
Next: Let's make a search bar a *little bit* fancier by adding a little X icon
over here to clear the search!

