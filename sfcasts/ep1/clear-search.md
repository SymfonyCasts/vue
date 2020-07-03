# Adding an [x] to our Search Bar

When we type inside of our search bar, I actually already have a little X icon
over here. That's because we're using an `<input type="search"/>` for our search
bar, and in my browser, it adds that little X icon by default. I want to ignore
that for a second and see if we can add our *own* little X icon over here and
set it up so that when we click it, it clears the search term. It's gonna be a
nice little exercise while we practice some dangerous skills! Plus, this is going
to work *super* well.

## Add the [x] Button to our Search Bar

Inside of `search-bar.vue`, add a class to the outer div called `input-group`.
That's going to allow me to add a new `<div>` element down here, set
`class="input-group-append"` and add a `v-show` to it. The idea is that this is
going to be a little X icon and we only want this to show if there is at least
something being typed. So we can do `v-show="searchTerm"`, we have that as the
data, `!=""`. Inside, add a `<button>`, -I'll go over that ESLint error soon-
with an X as the text and set the class to `class="btn btn-outline-secondary"`.
All right, perfect. Let's see what ESlint telling me: `v-show should go before
class`. It's basically telling us to arrange our attributes by type. Let's swap
these two attributes here. There we go!

## Check that it Works in the Browser

If we check in the browser, there we go! It looks *a little* silly because of the
double X, but let's ignore that! It does show up correctly. Now we actually want
to add some behavior to this. When I click this, I want it to clear whatever I
type in the search bar.

## Add Behavior to the [x]

I know how to do this! I'll ask siri to do it for me! Oh no, wait... I think we
need to add a click event instead! So we want to `v-on` -of course we'll use a
shortcut- and say `@click=""`. Let's add a new method called `eraseSearchTerm`.
I'll copy that method name and down here. We *already* have a methods section.
Let's just add a second method. This is going to be so great!

On this method, we'll just set `this.searchTerm = ''`. That looks good!

## Back to Testing in the Browser

So let's try it over here. Refresh... I'll do a quick search... Click on my X
button over here and... it clears! Oh, but the *products* didn't update! Of
course!

## Emmit on Clear Search

When we think about the search bar component, the `searchTerm` data is *entirely*
internal. The only reason we have a `searchTerm` data inside of here is just
so that we can use it inside of our component. For example, it helps us up here
to know whether or not we should hide or show the X button. As far as the
people that *use* our components, all they know about it is that it dispatches
or "*emits*" a `search-products` event. So what we're missing down here, after 
setting this internal data correctly, is to emit that event. 

Copy that exact statement down here. Of course, `searchTerm` now is an empty
string, so this exact same line just works for us.

## Check that it all Works!

Now we go over... add some search... clear it... it works perfectly! That's
a nice little exercise for thinking about the organization of our search bar
component, making sure that you emit the right events at the right time.

Next let's do something I'm *really* excited about right now! The
`currentCategoryId` is something that we set on page load and never change,
but we've organized our app in such a good way that with a little bit of
logic and a new concept called a watcher, we're going to be able to
dynamically change the category and have the whole page reload. Let's do that
next!
