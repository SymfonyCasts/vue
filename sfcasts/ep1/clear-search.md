# Adding an [x] to our Search Bar

When we type inside the search bar, it actually already has a little X icon on
the right. That's because we're using an `<input type="search"/>` for the search
bar. And in *my* browser adds X icon to search inputs by default. But I want to
ignore that for a second because I want to see if we can add our *own* little X icon
that, on click, will clear the search term. This will be a *grea* opportunity
to practice our new dangerous skills!

## Add the [x] Button to our Search Bar

Inside of `search-bar.vue`, add a class to the outer div called `input-group`.
That will allow us to add a new `<div>` element at the bottom with
`class="input-group-append"` and add a `v-show`. This will hold the "X" button
and the idea is hat we only want to show it if the search term is *not* empty.
Do that with `v-show="searchTerm"` - to reference that `data` - `!=""`.

Inside the div, add a `<button>`, - I'll talk about that ESLint error soon -
with an X as the text and `class="btn btn-outline-secondary"`.

Ok ESLint: what's up? Hmm: `v-show should go before class`. Ah, we've seen this
a few times before: attributes can go in *any* order, but there are some best-practices.
Let's swap these two attributes and... ESLint is happy.

## Check that it Works in the Browser

Over in the browser... there we go! It looks *a little* silly because of the
double X, but let's ignore that - I just want to see if we can get this working.
Specifically, when we click this, we want to clear the search bar.

## Add Behavior to the [x]

And... I know how to do this! I'll just ask Siri to do it for me! *Or*, we can
listen to the click event! So we want to `v-on`, but of course we'll use the
shortcut. Say: `@click=""` set to a new method we'll create called `eraseSearchTerm`.
Vopy that method name and, below, we *already* have a `methods` section.
Add this as a second method. Woo!

Inside, just `this.searchTerm = ''`.

We're crushing it!

## Back to Testing in the Browser

Time to test! Let's refresh... do a quick search... and click the X button.
Boom! The search cleared. Oh, but the *products* did *not* update! Siri, can you
update those for me?

## Emmit on Clear Search

When we think about the `search-bar` component, the `searchTerm` data is *entirely*
internal. The only reason we have a `searchTerm` data at *all* is just to make
our life easier... *inside* the component. For example, it helps us up here
to know whether or not we should hide or show the X button.

But for people that *use* this component, all *they* know and care about is that
`search-bar` *emits* a `search-products` event. And *that* is what we're missing
down in `eraseSearchTerm`: we correctly updated internal data, but we *forgot*
the most important part: emitting the event.

Copy the `$emit()` statement and use it here. Of course we know `searchTerm` will
always be empty in this case, but this will work fine.

## Check that it all Works!

Now when we go over... search for something cool... and clear it... yea! We got it!
Making this work was nothing new, but it *was* a good opportunity to think about
the internal and external parts of our `search-input` component.

Next let's do something I'm *really* excited about right now! The
`currentCategoryId` is something that we set on page load and then never change.
But we've organized our app in *such* a good way that with a little bit of
logic and a new concept called a watcher, we're going to be able to
dynamically change the category and have the whole page reload. Woh. Let's do this!
