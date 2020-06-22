# Ajax

Coming soon...

Okay.

I think our app is starting to come together. So let's actually make some of this
data dynamic. The categories over here are hard coded and the products aren't even
loading. So let's start making some Ajax calls. Now it's making just calls. We're
gonna use a library called Axios. So I'm going to open a new terminal tab over here
inside 

```terminal
yarn add axios --dev
```

`--dev` part is not really important. Now
another alternative to Axios is you could use `fetch()`. `fetch()` is actually a built in
JavaScript function that allows you to make Ajax calls, which means you don't need
any outside library. You made any polyfill to use it. If you need to sort older
browsers, but `fetch()` is also a really great option.

either way federal Axios. They're both very easy to use. So we're going to start
using them, um, and you can refer to their docs.

So the first thing I would have look at here is actually loading some products on the
page. So as a reminder, we can go to `/api` and see a bunch of really nice API
documentation for our site. We have, uh, categories, end points, uh, several end
points. We'll talk about later. And what we're going to look at here is the product
end point. So `/api/products`. And let me scroll up, we can quick try it out. Let me
get rid of my editor down there, execute, and you can see, we already have some data
loaded in the database. We have a bunch of products. Now you notice this structure
here does `@id`, `@context`, `hydra:member` thing. This is coming back in JSON,
but it's a special format called JSON-LD, which is basically JSON with extra
metadata. That's the simplest way to think about it. So it's just that extra fields
in it to help out.

now one thing I want you guys to notice if you've never used API Platform, is that
you could see the URL `/api/products`. If I go to `/api/products` up here, you're not
actually going to see the JSON, you're just going to see another HTML page. That's
just because API Platform realizes that we're requesting this from the browser and
returns HTML. When we request this from Axios, it's going to, uh, API platform will
detect that. And it's going to give us back JSON and easy way to see the JSON in a
browser is to do `.jsonld`. So this is ultimately what we're going to see. All
right, so let's go all the way back to our homepage and I will refresh and let me
open back up our browser tools here.

okay. So we want to load product data. So which component is going to need that data?
So right here, I have our main kind of `products.vue` template. It loads the
sidebar, and it also loves the catalog. So we could load products into here, but
we're not using the products directly. It's actually this catalog, I'm an old Command
or Control. And I can actually click to pop into the components, catalog that view.
And this is actually where we're going to load in our products. So this is the, the,
uh, the deepest component that needs to know about products.

So basically the goal is going to be, as soon as Vue loads, this component at that
moment, we're going to start the Ajax call so that we can load the products as
quickly as possible. Now during Vue life cycle of creating components, mounting
them into the Dom and then maybe even removing them later. Um, that's called the
lifecycle of Vue. And during that lifecycle Vue gives you different hook points. So
you can run code right when your, uh, your component is created or right when your
component is mounted into the actual page mounted into the DOM.

The two most important hook points are probably get mounted and created. Thought
about creating in a second for now. Mounted is actually when your component is put
onto the page. So if you remember back in our main `products.js`, we kind of
create our Vue instance, and then we actually Mount it. So it would sort of happen
right here. So to run code on one of those, all I need to do is create a function
called `mounted()`, but, uh, inside of here, we're going to make our Ajax call. So in
order to do that, I need to import Axios. That's all, I'll say 
`import axios from 'axios'`.

And then as I mentioned earlier, Axios is pretty easy to use. We can say 
`axios.get('/api/products')` Okay. And what Axios, like all JavaScript libraries is going to
return as JavaScript promise. So we'll say `.then()`, and we'll give it a function
here. That's going to be called when that finished on the agent's call finishes. So I
use the shortcut arrow function here, and let's just `console.log(response)` so we can
see what that looks like. Perfect. All right. So we look over here, I'll go to my
console and you can actually already see because of the hot module replacement that
it ran our, uh, catalog, but to make a little more realistic, let me refresh the page
here. So you can see that right when the page refreshes, it actually loads, and this
is an object and it has `headers` on it, `status` a number on it, or we're really
interested in here is the `data`.

It took our JSON response and actually automatically decoded it. And when you're
working with JSON-LD, the actual data itself on a collection is stored on `hydra:member`
So the `hydra:member` got 12 arrays for all of our 12 products and each of
those have data. Perfect. So we have our products data now, before we actually use
that, there's one alternative way to working with promises and JavaScript. And it's
the `await` syntax. So natively, when you make an Ajax call you, uh, this returns a
promise, and then you call it that then on it. And if you want to learn more about
promises, you can check out our JavaScript tutorial about that. But you can also, but
if you want to, you can simplify this a little bit, but you can actually say, here is
`const response =`, and then I'm going to remove the call back. Now, if I
stopped right here, response would actually be a promise that would not actually be
the response. But if we put await in front of it,

then what that's gonna do is it's actually gonna wait for that promise to finish. And
then whatever data was passed to that function is actually going to return, which is
the response. Now notice, this is a little bit angry. We'll talk about the why that
in a second, but let's actually go over here and I'll go back to our console, scroll
the bottom. And yeah, actually you can see everything is super unhappy. It says
cannot use keyword await outside an async function. So I hope that this general idea
makes sense to you. If you have something that is asynchronous, you basically put 
`await`. It says, wait for that to finish, then return the value to me, dead simple. Now
one of the rules is whenever you want to use the `await` keyword, whatever function
you're inside of. So in this case, we're inside of a mountain needs to have an `async`
keyword in front of it. And for us, it's not really that important I should down here
and put my `console.log(response)`  back. What that basically means is that
technically right now mounted and mounted function, because we made an async, it's
going to return a promise.

So it's a little bit confusing, but, but when our one mountain is called, it will
freeze on this line right here and wait for this to finish. But actually the mounted
function will finish immediately in return, a promise. And then that promise will
actually resolve. Once this line is finished to say this a different way. If we were
calling `mounted()` directly from our code `mounted()` would now return a response. And if
we wanted to, we could use that to do something after this response actually, uh,
comes back, but we are not calling mountain directly view as calling mounts of
directly and Vue doesn't use the return value of mounted. It doesn't care. We don't
return anything. It doesn't care that we return anything. So basically the fact that
we changed this to async and are now returning a promise Vue, doesn't care about it.
Doesn't change anything at all.

The key thing to know about `async` and `await` is that even though our code is gonna
wait on this line, really the mountain function is going to finish instantly. So it's
not like we're going to load the page and it's going to wait for this call to finish.
It's going to load the page. `mounted()` is going to finish immediately. And then once
the AGS call finishes the rest of our code inside of mounted, we'll run might take a
little bit getting used to, but we're going to mostly use a weight inside of the
tutorial. Um, cause it, it typically simplifies things a bit, right? So if we go over
here, I'm going to do a fresh refresh. Perfect. And see if I refresh again, you can
see it actually loads before his call finishes and now it gives us back that same
data. All right.

So we're almost done here. Now, if you think about the products inside of the catalog
components, they are something that will change during the life cycle of our catalog
components. At the very least when the catalog component first loads, the products
are going to be empty. And then as soon as the Ajax call finishes, they're going to be
set to our real products. So that's something that changes through the life cycle.
Also later, we're going to add a search bar to the page. And when we do that, when as
soon as we type something into the search, that's going to be another situation where
the products will need to change during the life cycle. So that's a long way of
saying that products need to be data. So I'm gonna go up here and add a new `products`.
Key is that to an empty array. That will be its default data down here. Instead of
logging it, we're going to say `this.products = response.data`. And as reminder,
`response.data` gives us this. And then we want `hydra:member`. That's where the
actual data is stored. So we can't say `.hydra:member` because of the `:`. That's
going to confuse everything. So actually you need to, you need to use the left square
brackets and text here.

Perfect.

Now, if I go back, I'm not even going to refresh. I'll just go down to my console.
You can see actually we'll go down. I will refresh just to be safe. And if we go over
to view and go down to our catalog component, look at that our products data is, has
12 items in it for a moment. You can see it,

everybody can't say that.

So the last thing we'll do is just to celebrate a little bit. Let's use this,

so let's go up and actually use these. So we don't want these to do loads and
products anymore. What we're going to want to do is loop over this dip. This is the
div that I've designed to hold one product each. So I'll delete that data there.
Let's actually knock this on a multiple lines for re readability and we know how to
loop it's `v-for=""`, and it's going to be a `product in products` there. We, and
remember whenever you used before, would you a `v-bind:key` or `:key`? And in this
case, when you want some unique ID for the product, if you actually go back and look
at the products, you'll notice that I do have an `id` property that I'm exposing here.
It's not really that important when I'm actually gonna use this `@id`. This is
something that's, it's called the IRI it's, the, this is something that's a API
Platform puts on every single resource that were returned.

And it's actually really handy instead of just being an auto increment ID or a UUID,
it's actually the URL that you could use to go get that product. So it's just more
useful than an ID and it's always going to be there. So I'm going to use the `@id`.
The trick with that is that we can't say `product.@id`. Cause again, that `@` is kind
of a special syntax. So we gotta use product left square bracket `@id` so we can get
that key. All right. Now, inside of this, we'll just say `product.name`, name, being
one of the keys down here inside of our product. And actually, I don't even need to
show you that because you can already see up here, we are listing products. So next
let's do something else related to this, but I can't remember what.

