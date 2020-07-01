# Faking AJAX calls: Reading Synchronously

Coming soon...

So we have
categories now available inside of as global variables, uh, a new window, a new
categories window, uh, global variable available. Now, if you remember from sidebar,

when we actually fetch the categories, we're calling this `fetchCategories`, helper,
which is coming from our fancy new `categories-service`. So I'm going to go to our
`category-service` here, `assets/js/services/category-service`, and very simply,
instead of doing an Ajax call, we can say, now say return `window.categories`.
This is what I like about centralizing that `fetchCategories` method. Cause we don't
need to run around and change this a lot of places in our application. We just need
to go change this one central spot. Now I can remove the import of Axios above and
it's actually not returning a promise anymore. It's now returning an array and I'm
going to talk more about that a second, because we technically just changed what this
application would, this method returned.

So if we go over and refresh, you can see it's actually broken. And it says something
like hydro member. Uh, can I read property hydro member of undefined? And the real
thing we broke here is not exactly that. We changed it from returning a promise to an
array that can break some parts of our application. But really the problem is down in
ACE and created is that `fetchCategories` is no longer returns, a response object with a
`data` key and a `hydra:member`, keep, it just returns the categories. So there are two
ways that fix this and it's really up to you. One way is I'll come up with
`this.categories` spot. We can say `this.categories =` because this is the categories. We
don't need the `await` anymore. You can delete that if you want to. Um, because we're
not returning a promise. If you return a promise, then awake, waits for that. If you
return to this data, then await does nothing. So you can delete that. If you want to
have figuring out, you can see that it's already reloaded the categories on the left.
This is awesome. Now I want to reload the page. Look at that. The categories are
there instantly. And of course the styles aren't loading immediately, but that's only
because of, uh, how we've done the styles and in dev mode, that won't happen in
production as soon as the page loads, those categories are there.

Now one of the cool things about isolating our Ajax calls into a service like this is
that technically when we call that service, we don't know or care if it's talking to
an API or which API, or if we're just loading the data locally, we don't care at all.
Except that's not really true in this application because when we changed this from
using the API to our, our, uh, the global variable, we changed what this method
returned. We changed it in two ways. We change it from returning a promise to an
array. And we also changed the actual data that's returned before returned a, uh, uh,
an object with a `data` key on it, and then a `hydra:member` key on it. So this is fine.
If you know that you're going to be loading your categories via this winter dot
categories, variable, then you can just do this and update your code. And it's fine.
But if you want to actually make your code work, but if you want, you can be a little
bit smarter and you can make this `fetchCategories` still return. The same thing it
did before.

In other words, we're going to have this return a promise. So check this out. We can
say return new `Promise`. And the promise takes a callback with that has two arguments
`resolve` and `reject`. I've never seen a promise before you can check out our ES6
tutorial about it. They're fascinating things. And then here, we're going to call
`resolve()`, and then what we're gonna do is pass it, the data that we want this promise
to return. Now, we're, we're not really making the Ajax requests. So we don't can't
exactly return what was returned before, which is a, but we know what we really care
about is that there was a object with a `data` key and a `hydra:member` key on it. So we
can at least fake that here. We can say `data`, let me say `hydra:member`. We can
set that `window.categories`.

I'll remove this return down here. And then up here, I'll say return `Promise` once
again. So now back in our `sidebar.vue` here, I'm actually going to revert and do
exactly what we were doing before, which was constant `response = await fetchCategories()`. So
this is kind of a funny promise because it's going to be resolved immediately. It's
not going to take any time to run, but it's technically your response. And when it
resolves, this is the data that's going to be passed, which is not exactly the same
as a response, but it's very, very close. Like we couldn't read headers off of the
response and we can absolutely re read the data. So we go run up. You can see it
already works. I'll refresh just to make sure. And now it works. So that's a cool way
that you can refactor from, uh, Ajax calls to some server-side data. That's a lot
faster and do in a way that doesn't actually affect your application. Cause we
isolated the change inside of this function. Pretty cool. All right, next, let's talk
about something else.

