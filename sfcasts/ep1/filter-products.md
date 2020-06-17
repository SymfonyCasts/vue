# Filter Products

Coming soon...

All right. So we've got the current category ID. We're using it to highlight which
page we're on, on the left. Awesome. But this thing on the actual products on the
right don't filter it all yet. Fortunately in our API platform set up, I'll go to
/API. I've already done a little bit of work behind the scenes with API platform
itself. That allows me when we fetch the products to fetch from a specific category.
So for example, let's see /category ID 24. I can put /API /category /24. That's the,
I R I have a category. And when I execute, or this looks like it's very simply, if we
have a question, Mark category = /API /category /24.

Mmm.

Then it's only going to return to me those items that are actually in there. So you
can see this returns, 12 items like normal. Yeah. It looks like a total of only five
products in this case. So our APS are a, our API is already set up to do this
filtering for us. So our life's going to be pretty easy.

So let's look at our application here. Uh, this is our top level product stuff, view,
and then catalog I'll hold command or control to jump into component /catalog. This
is actually what's responsible for on created. It makes the request to /API
/products. So basically if we had access to the current category ID right here, we
could just use it to change the URL. So let's do that in products, that view, we will
now pass colon. Current category ID = current category ID, just like we did with the
sidebar, and then the catalog as usual. We need to add that as a prop. So I will add
props here, and I'm actually going to go steal that prop from sidebar. Cause we
already had it set up perfectly a string and a default Knoll, which makes it
nullable.

Okay,

perfect. So now receiving that current category ID now down here, it actually changed
that you were all I could add, like the question Mark category = here, but with a
Axios, there's gonna be a slightly nicer way. We can actually set up a parameter
object, which is going to be all the query parameters we want. And we say, if this,
that current category ID then programs dot that category = this, that current
category ID. And the way you pass that in here is there's a second options argument.
And one of the options you can pass is called Paramus all set grams, two grams. And
that should be all we need. Now you'll notice that Paramus here is angry. It says
expected properties, shorthand. This is something we've actually done already many
times. I just wanted to point it out here and JavaScript. If you have a key, that's
the same name as your variable here, then you don't actually need to include it. So
that's equivalent there. That's setting up Rams key to our value, which is this
parameter object. It's going to go over now. You can already see it. It reloaded.
Yes. Break room furniture,

office supplies. Perfect. And if we go to snacks, Oh, we see a problem. What's going
on here. It turns out our snacks category is currently empty. And instead of actually
telling us it's empty, we just get the loading screen forever. And that's because
when our catalog renders our product list, a whole command to open up that the
loading is showing based on whether the products that length is zero or not. So we
need to improve this. Actually know whether or not the Ajax call has finished. So
let's make a smarter local loading mechanism next.

