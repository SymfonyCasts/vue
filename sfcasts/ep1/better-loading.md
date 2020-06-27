# Better Loading

*We* have a problem, people... The snacks are *empty*! Yeah, there are no snacks in
our store right now, apparently. That's a *huge* problem on its own! To make it
worse, you can't even tell! It just looks like it's loading *forever*! The reason
is, in our product list, we're just basically looking at the products length, and
if zero, we show the loading.

Using the length of something to figure out whether it's loaded or not, doesn't
really work if it's *possible* that the thing to be empty. And in our case,
sometimes we might have categories with no products, so using the length of the
products *isn't* going to work here.

What we need instead is a special specific flag that tracks whether or not the
products are being loaded.

## Add `loading` to Catalog

We know that Catalog is the smart component that actually takes care of making the
Ajax request. This is the component that knows whether or not we are loading our
products! To take advantage of this, we're going to add a new data property to this
element. Let's call it `loading` and set it to `false`.

Now, very simply down here, we can say `this.loading = true`, right before the Ajax
call and then, right after the call, `this.loading = false`. Just like that, we have
a flag we can use to render things differently based on loading!

## Try...catch

While we're here, we can *also* add some very simple error catching mechanism
*just* in case this Ajax call fails for some reason. To do that, we can wrap all of
this in a `try...catch` block, and then on the `catch` we will set
`this.loading = false`. If we wanted to go even further, we could add some data
called `error` and change the `error` value down here to something else, but at
least now we are gracefully failing if there is an error. Our loader now doesn't
spin forever!

As easy as that was, this also could be a little dangerous. If I do decide to do
my try catch, I may do things slightly differently. The problem with this is that
if any of these lines fail -for example, if our response doesn't even have a `data`
key on it- any of these things will trigger the catch and could *actually* be
hiding a bug in your code. I *hate* bugs! I think pizza is much better...

So instead, above the try, I'm going to add a `let response`. That is me just
creating a new variable outside of the `try...catch` scope so that it's available
in the entire `created` function. We remove the `const` from the `response` and then
I'm going to actually `return` from the catch, so if we hit the catch, we just
exit. Finally, I can move the `this.products = response.data` code outside of the
catch, so if *that* line has a problem, it's not actually going to be ignored by us.
We will have to deal with it!

Whether or not you use the `try...catch`, it's just depends on your situation. I
probably wouldn't do this because if my API end point is failing, I have bigger
problems than just giving the user a gracefull fallback. But if you *do* have
some valid situations where something might fail, then you actually can use a
`try...catch` like this to deal with the issue.
 
## Pass `loading` down to `product-list`
 
Okay, so we now have the `loading` data on our smart catalog component. We *need*
to pass that into our `product-list` component so that it can use it to hide or
show the loading spinner. That's simple enough! I'll split the `product-list`
onto multiple lines and here it will say `:loading="loading"`.

We're now passing a loading prop into `index`, so in here let's go update our
props so we can receive that. Add a new `loading` prop, `type: Boolean` and
`required: true`.
 
Our template has just become *much* simpler! We want to show the loading animation
*if* we are `loading`. We also wanna show these product cards down here, if
we are `!loading`. That's not *super* important, but it doesn't hurt to have it!

## Try it in the browser

All right, so let's check it out! Yep! You can *already* see that the snacks page no
longer has the loading spinner. My other pages work *just* fine and this next page
doesn't load forever!

Now that we're a *little* more organized, we can actually give this a "no products
found" type of message! So after our loading, I'll put an `h5` with another
`v-show` directive. Basically we want this to show if we are *not* `loading`, but
`products.length` is equal to zero.

If we have that situation, then we know that we have no products, so we can put a
very nice message here to help out the user. There it is! You can see that showing
up on our snacks page. Perfect!

## Adding loading to sidebar

This is something new you're always going to want to think about anytime you have
dynamic data being loaded. What's the other place we we're loading stuff? That's
right! It's our categories! You *can* see that, when it first loads, our categories
aren't actually there yet.

We're *actually* going to fix that in a second to make the categories load instantly,
but right now, since they are still loading, let's add a little loading animation
there as well. This is going to be over in our `sidebar.view`. This is the component
that makes the Ajax request for the categories and then renders them up here.

By the way, if you see this is getting a little bit complicated, we could choose to
actually isolate these into a different component if we wanted to now. So should we
add another loading data like we just did for catalog? We *totally* could! And
that's probably a great option, but I'm going to cheat in this case, because I know
in my application that I will never have no categories. If I had no categories, that
means something is *totally* broken on my database. So in this case, I actually *am* 
going to allow myself to use the `categories.length` to figure out whether or not
we are in the loading state.

To keep things organized, let's add a computed property for it. Add a computed key
here called `loading`. The nice thing about this is that `loading` isn't actually
data, but it's going to look the same inside of my template: I'm *just* going to be
able to reference a loading variable. Then, I can use my logic down here and say
`return this.categories.length === 0`.
 
If there are no categories, then we are loading! And if we *did* need to change this
today, later, or the next year, it's *super* easy, we just remove this computed
property and add a `data`! We wouldn't have to update *anything* in our template.

All right! So to use this in our template, we need to use our loading component here.
Let's import it. I'll say `import Loading from @/components/loading` and then
down here under `name`, let's add the `components` key with the `Loading` component
in it. That makes it available to my template.

Finally, up here, right after the `h5`, we'll say `<loading`, and we'll do our
normal `v-show` for it! I love it!

## Check it out!

Let's give it a try! So we move over... What we're looking for over here is for
that loading animation right before those categories load. That was super quick!
Now we have proper loading on both sides!

Next, I want to start organizing our Ajax calls a little bit better. We make Ajax
calls inside of `sidebar.vue` and `catalog.view` and there's *definitely* a better
way that we can start organizing those calls so that we can keep our application
a *little bit* more sane. Let's talk about that next!
