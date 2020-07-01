# Event Payload

Coming soon...

Our search bar is working really well. Cause we type in it, it keeps synchronized
with the `searchTerm` data here. Now we need to do those. We need to communicate when
the `searchTerm` changed up to catalog. So we have a search bar right here when the
search changes, catalog needs to know about that so that it can somehow change the
products data, so that we actually filter the less below. Now, one way to think about
this

one way to think about this is that the search term that's currently data on search
bar is something that catalog needs to know about that it needs to know about. So
we've seen this in a couple of cases where we've actually had some data on a specific
element and ends up, Oh, this is needed in other elements. So let's move it up the
tree to the element so that it's accessible to all the elements. So we could move
this search term up to catalog and then pass it back down to search bar as a prop.
But I'm not going to do that. And there's one main reason why I'm not going to do
that. And it's sort of semantic. It's all about the meaning. If you really think of
search bars, its own standalone component, then what we want to do in catalog is
update the product list when the search changes. So as I said, when we want to do we
want it to perform an action when an event happens. So instead of having search bar
kind of like change something in catalog. So I really want to have as one search bar
just to notify us just to say, Hey, I changed. And when it notifies us, when it emits
that event, it will pass us the new search term.

It's not really that different than moving the data up to catalog. In both cases,
search bar would need to emit an event up to notify it. My point is that the search
term data really only, the only thing that needs to know about that is really search
bar because it's going to communicate the value of the search that changed via the
event itself. Another reason I'm not going to move it up. The `searchTerm` up to
catalog is that in a few minutes, we're going to add deep bouncing, which basically
means that as the search bar changes here, okay, the search term will update, but
we'll actually wait for a second before we update the catalog. So I want to kind of
decouple the actual data here from when we dispatch the event that says that the
search bar has changed.

All right. So what we need to do in search bar then is we need to decide we're going
to going to emit a custom event when the search term changes. So do that. I'm
actually going to add an `@input=""` and here I'm going to say `onInput` that'd be a new
method. Now, as you mentioned earlier, when you had `v-model`, what that, one of the
things that does behind the scenes is it adds an `@input` which, uh, sets the `searchTerm`
to this inputs value. In this case, we're actually adding a second `@input`. So
the input behind `v-model` is still going to update the `searchTerm` data, but then we
can also run our own custom code after it's update the data, which is pretty cool. So
down here, I'm gonna add a `methods` and what a new ethic called `onInput()`. And inside
of here, we're going to dispatch, we're going to emit an event which we do via
`this.$emit`. And let's call this `search_products`. If we want it to,
we can actually design this component to be reused in other cases. And then we can
maybe just emit a more generic search, whatever makes sense to you.

Now, the cool thing is that when you admit and vent, there's actually an optional
second argument, which is data that you want to pass on the event object. So we
actually need to not just say that the search that the search products event has
happened, we need to also pass the, what the `searchTerm` is. So we'll say 
`term: this.searchTerm`.

perfect. Alright. Let's before we touch anything else, let's actually move over here.
I'm going to click on the search bar and we can click on events and we can actually
see this happening. So there's four events there and he said the last event here, it
has a little `payload` thing and you actually see the `term` on there. So this is
perfect. Now in catalog, let's actually use this. Now we're going to filter the
products in two ways. The first thing I'm gonna do is I'm actually going to take this
product array we have. And we're simply going to filter that in JavaScript, like
literally loop over the products and just filter it down smaller. That's going to be
the first word and do it later. We're going to do a server side search, which is a
much more powerful way to do things than just searching whatever products you have in
memory here, but let's keep things simple for now. So if we just want to, when the
search changes, if we want to just show a, if we don't have filtered this product
data, then what we don't want to do is actually change the products. We don't want to
have it. So we don't want to, when the `searchTerm` changes, we don't want to actually
change `products`. Cause we don't want to lose the products. We just want to loop over
them and filter out the ones that we want.

The point is we can't just add an event that, uh, that changes products. What we
really need to do is keep track of the full list of `products` and also keep track of
the `searchTerm`. And then we'll use these two pieces of data to actually figure out
what subset of products to show. Now you might be yelling, Hey Ryan, you have just
duplicated the `searchTerm` data. You have `searchTerm` in the Search bar and you
have `searchTerm` inside of the catalog. You said never to do that. You said that you
should have a `searchTerm` up here and probably pass this as a proper down to search
bar. That does very good point. However, I'm doing it on purpose. It's a sick with me
with this. The `searchTerm`, instead of search bar is really internal state just to
help this component do its job. The real end result of this component is that a
dispatching of events with the new `searchTerm`. If we're using search bar, we don't
really care that it has this `searchTerm` data. We only care that it emits this event.
And then in catalog, we're going to listen to that event and kind of the same thing
catalog also needs to have also is going to have a `searchTerm` just so that it can
get its job done. Now, this doesn't really make sense if you, if you still think that
this is kind of weird, um, in a few minutes, as I mentioned, we're going to add deep
bouncing. And what that's gonna mean is that actually, as we type in the search bar
right here,

we're going to delay that event being admitted. So what's gonna happen in that case
is that

the `searchTerm` on search bar will update instantly, but there'll be a slight delay
before we even hit the event. And then, so there'll be a slight delay before the
search term is updated inside of the catalog. So they are two slightly different sets
of data that are related, but they're not actually identical. All right. So we have
products. We have search term, let's update the `searchTerm` when that changes. So as
a reminder, we just, this pageant event called search products. So what I'm going to
do is go up to my search bar up here. There we go. And we'll say `@search-products=""`
and we'll say `onSearchProducts`, which is a method that we now need to
create. So down here,

at the bottom, I'll add `methods: {}` and then `onSearchProducts()` now, because this is
method's going to be called when an event is dispatch, it is going to get an `event`
argument to kind of just like normal JavaScript. And because when we dispatch the
event, we added a `term` key. We can use that. So we can say `this.searchTerm = event.term`
, and that should be enough to do it. So let's just check our work
over here. If I type in disc there, of course the search bar search term updates. But
if we look on catalog,

the search term has also updated there. So that is perfect. So the last thing we need
to do is actually filter the products list. Now, if you think about it, if we scroll
up little bit to render the products, we actually pass them into the `<product-list>`
component. So right now we're always passing in all of the products. What we really
want this to be now is just a subset of the products. And this is one of those
situations where the value on a pass here is not exactly identical to a piece of
data, but it's based on the products. And it's also based on the search bar. It's
slightly different. So this is a perfect situation for using a computed property. So
I'm going to change this to `filteredProducts`. I'll copy that name. And now I go down
and do a `computed` property above created, I'll say, `computed: {}` `filteredProducts()`. And
that function, I'll say, if not `this.searchTerm`, then we're going to return
`this.products`. So just the normal array of products. If there is a search term, then
what we can do is return `this.products.filter()` and pass that a call back. I
use the arrow function that will take the individual product as we're looping over it. And
I'm going to do the kind of shortcut syntax here. So because I didn't do a curly
brace, I just did parentheses here. There's an implied return. So here, I'm going to
say `product.name.toLowerCase().includes(this.searchTerm.toLowerCase())`
there we go. So basically it's
gonna loop over all the products and get rid of that stomach colon.

It's going to loop over all the products and for each product, if `product.name.toLowerCase()`, that
to lowercase includes `this.searchTerm.toLowerCase()`. Then it's going to be
included in the new array that gets returned from here. So just some JavaScript magic
there. So let me go over. Now. You can see right now we have the full list of office
supplies. If I type in disk as it just gives one. So there dis disappearing ink pens,
it works perfectly. The only problem with this has fast and cool as this is, is this,
this won't work well, is that this? It means that we can't do any fancy, like,

wow,

let's just say next, let's make this more powerful. And I'll talk about the reasons
why it's better, um, by performing this search server side via an Ajax call, instead
of doing it right inside JavaScript.

