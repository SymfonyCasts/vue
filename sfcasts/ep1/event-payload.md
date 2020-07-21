# Pass Data in a Custom Event & Internal Data

Our search bar is working really well! We can type in it and it keeps things
synchronized with the `searchTerm` data. We now need to
communicate when the `searchTerm` changed *up* to catalog so that it can
know to filter the product list.

We might think that, since `Catalog` *needs* to know the `searchTerm` data, we
should move it up to `Catalog` then pass it back into `search-bar` as
a prop. We did this in a few cases already: we moved a piece of data
*up* the tree to make it accessible to more components.

We *could* do that... but I won't. Trust me for now - I'll explain why soon.

But regardless of where the data lives, what we need to do in `Catalog` is update
the product list *when* the search term *changes*. In other words, we need to
perform an action when an *event* happens. So for our first order of business,
whenever we update the search box, we need the `search-bar` component to say
"Yo! I changed!" and for it to *pass* us the new search term.

## $emit a Search Event

In `search-bar`, this *specifically* means that on the `input` event of the
search box, we need to emit a custom event. To do that, add `@input=""` and this time,
set it to a method name: `onInput`.

[[[ code('e9cfc42bf3') ]]]

As we talked about earlier, when you have `v-model`, one of the things it does
behind the scenes is add its *own* `@input` which sets the `searchTerm` data
to the input's value. In this situation, because we need to do something *else*
on input, we're adding a *second* `@input`. The original one that's set by
`v-model` is *still* going to update the `searchTerm` data. Then, after it
finishes, our custom code will run, which is pretty cool!

Below, add `methods` and `onInput()`. Inside, emit a custom event with
`this.$emit()`. Let's call it `search-products`. If we intended to re-use this
component as a generic search box around the site, we could call it just `search`.

And it turns out that `$emit` has an optional *second* argument, which can hold
*any* data that we want to *include* on the event object. That's good news! Because,
in addition to just saying that the `search-products` event has
happened, we *also* need to pass what the `searchTerm` *is*. Do that with
`term: this.searchTerm`.

[[[ code('54e92509d9') ]]]

## Check the Event in Vue DevTools

Before we touch anything else, move over to the browser. On the Vue
Dev Tools, click on `SearchBar`. Actually, click on the Events tab.

Now... type! Yes! We see one event for *each change* that we made to the text!
Check the last event: it has a `payload` property that, if we explore, has
the *term* on it. Awesome! We'll see how to use that in a few minutes.

## Products Filtering Strategies

Back to `Catalog`! There are two ways to filter the products. The first and
*easiest* is to just take the `products` array and filter it using JavaScript.
The second is to do a server-side search. That's *much* more powerful and we *will*
try that next. But to start, let's keep things simple.

When the `searchTerm` changes, we don't *actually* want to *change* the `products`
array because we don't want to lose that information: if the user cleared out
the search box, we will need to show the *original* list. What we *really* need to
do is keep track of the `searchTerm` and use it to *compute* a new array of
filtered products.

## Duplicating the searchTerm Data???

Add a new `searchTerm` data set to empty quotes.

[[[ code('fa1ae37c8d') ]]]

Now you might be yelling:

> Ryan! You dummy! You just duplicated the `searchTerm` data! You have
> `searchTerm` in `search-bar` and you *also* have `searchTerm` in `Catalog`!
> You said never to do that!!!

That is an *excellent* point - even the dummy part, a lot of the time. But, I'm
doing this on *purpose*. The `searchTerm` inside of
`search-bar` is really an *internal* piece of data. It exists *just* to help that
component do its job. Anyone who *uses* this component doesn't really need to
know or care that it exists. All *they* care about is that this component
emits an event when the search changes and passes us the new `term`.

Then, in `Catalog`, in order to do our work here, it just so happens that we
*also* need to store the search term as data.

Now, we *could* *just* put the `searchTerm` data in `Catalog` and pass it to
`search-bar` as a prop. But there are two reasons why I *won't* do that. First,
because I don't have to: `Catalog` will never need to *change* the `searchTerm`.
So because the *only* place it will *ever* change is `search-bar`, the two pieces
of data won't get out-of-sync. The *second* reason is that,
in a few minutes, we're going to add *debouncing*, which basically means that
the `searchTerm` inside `search-bar` will update *immediately*, but that component
will *wait* before it emits the event. It's subtle, but in that situation, the
two search terms will *not* always match each other.

If this is confusing... don't worry. There's not a wrong way to do things:
if you *just* put `searchTerm` in `Catalog` and passed it as a prop to
`search-bar`, that might be a bit unnecessary, but it would work great! If you
added debouncing later, you might *then* realize that you need two *separate*
pieces of data. I'm planning ahead, but it's *always* ok to choose a path, move
forward, and let the design figure itself out naturally.

Anyways, we're sort of half way done. Next, we need to *listen* to the
custom `search-products` event, *update* the `searchTerm` data in `Catalog` and
use that to print a *filtered* list of products.
