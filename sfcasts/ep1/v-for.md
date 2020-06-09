# Looping with v-for

Let's start to make our app a bit more dynamic. See these categories on the sidebar?
They are 100% hardcoded in the template. Boring!

Eventually, when the page loads, we'll make an AJAX request to dynamically load
the *real* categories from our API. This means that the categories will be empty
at first and then will *change* to be the *real* categories as soon as that AJAX
call finishes. And so technically, the categories are something that will
*change* during the lifetime of our Vue app. And anything that changes must live
as a key on `data`.

## Creating categories Data

Cool! Let's add our first piece of `data` to sidebar: `data()`, then `return`
an object with `categories:` set to an array. We're going to worry about the AJAX
call in a few minutes. For now, let's set the initial data to some hardcoded
categories. Each category can look however we want - how about an object with
a `name` property set to our top-selling category - "Dot matrix printers" and a
`link` property set to `#` for now.

Copy this and create a second category. Oh! But I can't misspell the cool
"Dot Matrix" category! Shame on me! Set the second category to something just
as modern: "Iomega Zip Drives". If you don't know what that is... you're
definitely younger than I am.

## Using v-for

Now that our component has a data called `categories`, we have a variable called
`categories` in the template! But... we can't just render it with
`{{ categories }}`. Nope, we need to loop *over* the categories.

Like Twig and its `{% for` or `{% if` tags, Vue has a number of custom syntaxes,
which are called *directives*. We'll see the most important ones in this tutorial.

And while some of the Vue directives *work* a lot like Twig tags, they *look* a
bit different. The directive for looping is called `v-for`, but instead of being
a standalone tag, we put it right *on* the element that we want to loop.

Check it out: I'll split the `<li>` onto multiple lines for readability, and then
say `v-for="category in categories"`.

That *totally* custom syntax will loop over the `categories` data and make a new
variable called `category` available inside the `li`.

Now... life is easy! For the `href=""`, remember: each `category` is an object
with `name` and `link` properties. So we basically want to say `category.href`.
I mean, `category.link`! I'll catch that mistake in a minute!

But... this won't work yet because it would *literally* print that string.
To make it *dynamic*, use `:href`.

Now the contents of the attribute are JavaScript, and `category.link` is perfectly
*valid* JavaScript.

Below, we can print the name with `{{ category.name }}`.

That's it! I'll remove the other hardcoded `li`.

Let's go check it out! When we move over, thanks to our dev-server in hot mode,
we don't even need to refresh! The "All Products" is hardcoded, but the two categories
below this are dynamic! Oh, but let me fix my mistake from earlier: use `category.link`
because the data has a `link` property. That looks better.

## The Purpose of the key Attribute

Back in my editor, ESLint is, once again, mad at me! And that's *usually* a good
hint that I'm doing something silly! It says:

> Elements in iteration expected to have `v-bind:key`.

That's a fancy way of saying that whenever you use `v-for` you're *supposed* to
give that element a `key` attribute, which is any unique identifier for each item
in the loop.

Obviously... our code *works* without it. The *problem* comes if we *updated*
the `categories` data. Without a `key` attribute, Vue has a hard time figuring
out *which* category updated... and which element to re-render.

To help Vue out, after `v-for`, always add a `key=""`. Normally you'll set this to
something like `category.id` - some unique key for each item. In this case,
because we're looping over an array we invented, we can use the Array *index*.

To get access to the array index, change the `v-for` to `category, index`. Now say `key="index"`. But... *once* again... this isn't *quite* what we want: this would
set the `key` attribute to the *string* `index`. To make it dynamic, change it
to `:key="index"`.

Hey! Now we even get autocomplete!

Back on the browser, we won't see any difference, but if we updated the categories,
Vue would re-render perfectly.

## The Directives API Docs

We've now seen *two* Vue directives. Google for "Vue API" to find a page called
[Vue.component - API](https://vuejs.org/v2/api/). I *love* this page! It... well...
talks about pretty much *everything* that exists in Vue.

On the left, I'm going to scroll past *tons* of things to a section called
"Directives". Notice that there aren't *that* many directives in Vue - about 15
or so. And we've already seen both `v-bind` *and* `v-for`. We'll talk about the
other important directives later. For each one, you can get info about how it works.

## The custom key Attribute

Oh, and there's one *tiny* detail I want to mention before we keep going.
Back on the site, inspect element on the `li`. It has `class="nav-item"`, but it
does *not* have a `key` attribute?

There's some magic going on. Normally, if you add `foo="bar"` to an element,
that element - of course - *will* have a `foo` attribute! *We* know that the *true*
purpose of the `key` attribute was to help Vue internally... but shouldn't that also
cause our element to have a `key` attribute?

Back on the docs, right below the Directives section is another one called
"Special Attributes" and you see that `key` is one of them. Basically, if you
add an attribute in Vue, it *will* render as an attribute... unless it's one
of these *special* attributes. It's not really an important detail, but if you
were wondering *why* everything *other* than `key` is rendered as an attribute,
this is your answer. Vue is hiding it, because it knows it's internal.

Next: Vue is more than data and re-rendering: it's also about responding to user
interaction. Let's add our first *behavior*: a link that will collapse and expand
the sidebar.
