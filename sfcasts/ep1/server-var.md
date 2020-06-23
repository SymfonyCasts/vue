# Server Var

Coming soon...

Let me be dynamically loaded the categories in our sidebar. We looped over the
categories and we're actually creating a link to `/category/...` the `id` of a category.
And I said that that was going to be a future page that we would create. Well, guess
what, if you click office supplies that actually works. It's not four Oh four. You
can see the URL changed up here and it looks like it just completely reloaded the
same page. So let me show you, what's going on here. I've done a little bit of work
behind the scenes,

any `src/Controller/ProductController.php` You remember that we have this `homepage()`
here. This is what we've been using. And just references this in re renders this
`index.html.twig` template. I'm an open `templates/product/index.html.twig`.
You can see that. So nothing special here. We have our target and we're reference
rendering are our JavaScript and CSS tags, um, for our products. But to all of us in
be below this, we have another one called `showCategory()`. That's why that page works.
I already created a route and controller that re that for `/category/{id}`. And
you'll notice that it actually does the same thing. It renders the same template. So
here's the idea. We're purposely not building a single-pay page application.
Multipage applications are in a lot of ways trickier to think at working with vue.
But our, my reality, our Vue applications going to run on several pages. We're going
to have the homepage, which is going to render all, which is basically the all
products category. And then you can click into any in any of the individual
categories. And even later, we're going to allow you to click, to view a product. And
that's also going to be rendered by our same one view applications. Our same one view
application is going to behave differently based on what page you're on.

So here's the trick right now, when we're on an actual category page, we need to do
two things. First. We're probably going to want to highlight which category we're on
over here in some ways. So that user actually knows that we're on the office supplies
category. The second thing we're going to do is we're going to need to filter the
product list because right now, no matter what category I click on, I am always
getting the same list of products. So we need to see how intelligently realize they
were on a category page and then read that information and then filter make a
different API request for a different set of categories. So basically we want to use
our same Vue app, but sort of pass it different configuration. So it does slightly
different things. So here's what we're gonna do. The one piece of information we need
to know right now in our vue application is what category `id` we are currently on.

Are we on no category `id`, meaning show all products, or are we, or are we on category
`id` 23? So to do that effective, what we need to do is we need to communicate
information from server because the server knows what category we're currently
working with into our vue application. And there are multiple ways to do this the
way we're going to do it. It's very simply by setting a global JavaScript variable.
And then we're going to read that inside of our application. So first I'm actually
going to add a second argument to my category. Now don't worry. We're not going to go
too much into Symfony. I'll explain what I'm doing along the way. I'm going to type
on a wire and `IriConverterinterface` argument called `$iriConverter`. You'll
remember from, remember if you click on the catalog and look at our products data,
um, every single thing we get back from the, every single item we get back from our
API has an `@id`.

That's known as the IRI. So when I communicate and I always like to use this IRI
string instead of like the integer ID, uh, just because it's more useful than an
integer ID. So what we're actually going to do inside of on the categories pages
instead of setting a JavaScript variable that says we're on category 23, I'm actually
gonna use the IRI have a category. And this IRI converter thing helps me get that.
It's a lot of second argument to our template here, and I'm going to pass in a new
variable called `currentCategoryId`. It's really current category IRI 
`= $iriConverter->getIriFromItem()`, and then we can pass it, the `$category` entity
object. Now, next we're going to use inside the template to do when we do that, we
need to be careful because you can see there's two pages that are rendering the same
template. So there's only going to be a `currentCategoryId` in one case, not in both
cases. So an `index.html.twig` above where I'm rendering my products, JavaScript, I'll
add a `<script>` tag. I'll say

`{% if currentCategoryId is defined %}`, I'm not going to put it. I'll put an `{% else %}`. And
then, `{% endif %}`, or about a second, then we're going to set a global variable. So 
`window.currentCategoryId =`, and then I'm going to use my, uh, I'm actually just
going to print that out inside of JavaScript. So curly quotes, then curly, curly,
`currentCategoryId` now to make sure, like, you know, it's not really going to be a
problem here, but technically if this current category ID were a string with a quote
in it, it would actually break cause we're inside quotes. So to fix that, we're going
to `|` it to escape. `e('js')` what that basically says is tell us to wait to escape this
variable as for JavaScript so that no matter what it will work inside the string.
Now, if we are, if the current category is set, that means we're on the homepage. I'm
going to say `window.currentCategoryId = null`

So a long way of showing. So basically the end result of this is when we refresh the
page and I'll just view the source. If you scroll down where JavaScript is, you can
see, we now have `window.currentCategoryId = '\/api\/categories\/23'`. And these city
slashes are just, uh, uh, escaping the, uh, the other slashes. Alright, so how can we
use this inside of our Vue application? There are a couple of different ways we're
going to kind of build up and complexity. The first thing I want to accomplish is I
want to highlight which one of these categories is currently selected. So that means
that in sidebar dot view, we need to know, uh, what are, what the current, uh,
category ideas. Now, the simplest way to do this is just to reference the global
variable. We created a global variable in the template. Let's just reference that
global variable inside of here, but we can't just reference global variables inside
of our template. Like, what I really want to do is probably add like an extra class
to the link. If the global `currentCategoryId` is equal to `this.category['@id']`, and of
course we can't do that. Anytime we reference a variable inside of here, view tries
to call that on the inside the Vue instance. So this is actually a perfect situation
for a `computed` property. So I'm gonna go down below data, I'll add `computed`,

and I'm going to create a new computed property called `currentCategoryId`.

And we're going to return

`window.currentCategoryId`, just that simple. Now, before I go up and actually
use that on inside of my template, let's create an, add a new style down here that we
can use. So inside of the `ul`, I'm going to create a new style called `li a.selected`
So the selected classes, what we're going to need to dynamically add up
there, and I'll say `background:`, it's that `$light-component-border` of
I'm just reusing, I'm an hold command or control and click this. Um, you can
see I'm just reusing things from this mix in here.

Oh my bad to have this mix in here. And it's actually loads colors where we actually
have some of those things defined as variable. So basically just using a variable, if
you follow that, all right, so now let's use this selected thing. Let's go up here.
Let's start with the all categories here. This is based. This should have that
selected thing. If the `currentCategoryId` is null. So now we need basically, uh, our,
we need our class to be dynamic. So remember when we, when we need to have a class,
sometimes show up and sometimes not show up. The best thing to do is to

at our call and of course, to make a dynamic and then pass an object to the class.
And here we can have a key one key called nav link. We'll set that to true. True
means, always show up. And the other one, it's a little bit ugly, but we'll say
`$style.selected` to reference our new select the property. And that
should show up if `currentCategoryId === null` remember we had to do this kind
of less square bracket, right? Square back a thing here. That's the only way we can
have a dynamic, a value here with a dot. So kind of unfortunate, but we're actually
going to fix that in a second. I'm gonna copy that class down here and then go down
to the actual inside my loop. And in this case, it's going to be slightly different.

Or we're going to compare here is we're going to compare the `category['@id']`
is `===` to `currentCategoryId` to leveraging that computed property in
both cases. All right. So if I didn't mess anything up, that should work and yes, you
can to share, to see I'm on the office supplies. Basically this little light blue
border here, let's click the all products. It works beautifully. So you have to
remember, even though we don't have access to, we can't just use the global variables
inside of our template. It's very simple just to create a computer property that does
that for you and boom, it is available. Now there's one thing I want to change here
before we talk about a better, maybe a better way to do that is, um, it does bother
me a little bit that I have to use this `$style.selected` here. Not
because I don't want to use the `$style` exactly. But if you look down here
at my CSS, I'm already inside of it of a modular component. So if where you go all
the way up here, we're using `$style.component` on the outside element.
And then in SASS, because I've put this inside of that.

Yeah.

The style is only going to be applied to things that are inside of that component.
That component style. Let me just show you what I mean, if you view source on the
page and then no, that's not gonna work. If you inspect element

on the selected link, you can see here that it's of course, `sidebar_selected_` the
dynamic thing. But if you look the way that that CSS actually looks, it's actually
`.sidebar_component`, and then the hash space, `ul` space, `li` space `a.sidebar_`
that dynamic thing. We don't actually need that. The modular CSS and the
second spot we already we're already sandbox because of the first spot. So what I
would like to do is basically be able to write CSS like this, but not have to, but
not have it a render with the extra modular CSS. Because up here, what I want to do
is I want to just be able to say very simply `selected` here and `selected` there.

I need to explain this a little better. Of course, that's not going to work because
the real class that's going to CSS has that module, uh, the extra modular stuff on
it. So the way you can get this to work. And I actually really like this is that down
here, you can basically tell modular CSS, look, I'm using a selected class here, but
I don't need you to add the modular to convert this to a modular CSS class for me,
the way you do that is you add this kind of pseudo selector called `:global` in
front of it.

As soon as you do that, can you go over and refresh? Actually, I don't even need to
refresh. You can see it's already back in this time. If I inspect elements on that
and look over here, you can see how it renders. It has the modular class on the
sidebar, but then it just has `a.selected`, which is totally safe because that's
only gonna apply when you're inside of this component. And actually we can go step
further if you think about it, because this is a modular class right here, we don't
need anything inside of here to use, to have an extra modular class. So I can
actually move that `:global` up here after the component. Now, everything inside of here
is not going to get extra classes. And the only time I should have to actually use
the `$style` is on the outside components. So `$style.component`
than any other classes inside, I can just let those be normal classes. So I like that
a lot better. Next, we have successfully via a computer property referenced this
global window variable, but this is a global very one. I don't love having global
variables just hidden inside of my code. We can actually do, uh, organize this a
little bit better by refactoring it into a service that we use to fetch that global
variable. Let's do that next.

