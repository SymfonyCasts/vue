# Looping with v-for

Let's start to make our app a bit more dynamic. See these categories on the sidebar?
They are 100% hardcoded in the template.

Eventually, when the page loads, we'll make an AJAX request to dynamically load
the *real* categories from our API. This means that the categories will be empty
at first and then will *change* to be the *real* categories as soon as that AJAX
call finishes. If you think about it, this means that the categories are
something that will *change* during the lifetime of our Vue app. And anything
that changes should be set as a key on `data`.

## Creating categories Data

Awesome! Let's add our first piece of `data` to sidebar: `data()`, then `return`
an object with `categories:` set to an array. We're going to worry about the AJAX
call in a few minutes. For now, let's set the initial data to some hardcoded
categories. Each category can look however we want - how about an object with
a `name` key set to our top-selling category - "Dot matrix printers" and a `link`
key that we'll just set to `#` for now.

Copy this and create a second category. Oh! But I can't misspell our top-selling
category - shame on me! Call the second category "Iomega Zip Drives". If you don't
know what that is... then you're definitely younger than I am!

## Using v-for

Now that our component has a data called `categories`, we of course now have a
`categoires` variable available in the template. But.. we can't just render it
by saying `{{ categories }}`. Nope, we need to loop *over* each category.

Like Twig and its `{% for` or `{% if` tags, Vue has a number of custom syntaxes,
which are called *directives*. We'll see the most important ones along the way.

And while some of the Vue directives work a lot like Twig tags, they *look* a
bit different. The directive for looping is called `v-for`, but instead of being
a standalone tag, we put it right *inside* the element that we want to loop.

Check it out: I'll split the `<li>` onto multiple lines for readability, and then
say `v-for="category in categories"`.

That *totally* custom syntax will loop over the `categories` data and make a new
variable called `category` available inside of this element.

Now... life is easy! For the `href=""`, remember: each `category` is an object
with `name` and `link` properties. So we basically want to say `category.href`.
Well, that should be `category.link` - I'll catch that mistake in a minute!

The point is: this wouldn't work because it would *literally* print that string.
To make this *dynamic* instead, say `:href`.

Now the contents of the attribute are JavaScript, and `category.link` is perfectly
*valid* JavaScript.

Finally, below, for the name, it's `{{ category.name }}`.

That's it! I'll remove the other hardcoded `li`.

Let's go check it out! When we move over, thanks to our dev-server in hot mode,
we don't even need to refresh: the "All Products" is hardcoded, but the two categories
below this are dynamic! But, let me fix my mistake from earlier: use `category.link`
because the data has a `link` property. That looks better.

## The Purpose of the key Attribute

Back in my editor, ESLint is, once again, mad at me! And that's *usually* a good
hint that I'm doing something silly! It says:

> Elements in iteration expected to have `v-bind:key`.

That's a fancy way of saying that, whenever you use `v-for`, you're *supposed* to
have a `key` attribute, which is some unique identifier for each item in the loop.

Obviously... or code *works* without it. The *problem* comes if we dynamically
*updated* the categories. Without a `key` attribute, Vue has a hard time figuring
out *which* category updated... and which element to re-render.

So, right after `v-for`, always add a `key=""`. Normally you'll set this to
something like `category.id` - some unique key for each item. In this case,
because we're looping over an array we invented, we can use the Array *index*.

First, change the `v-for` to `category, index`: that's the syntax to fetch the
array key for this item. Now say `key="index"`. But again, this would set the
attribute to the *string* `index`, but we want it to be set to the `index` variabler.
So we need `:key="index"`.

Now we even get autocomplete!

Back on the browser, we won't see any difference, but if we updated the categories,
Vue would re-render perfectly.

## The Directives API Docs

We've now seen *two* Vue directives. Google for "Vue API" to find a page called
[Vue.component - API](https://vuejs.org/v2/api/). I *love* this page! It... well...
talks about pretty much *everything* that exists in Vue.

On the left, I'm going to scroll past *tons* of things down to a section called
"Directives". I want you to notice that there aren't *than* many directives in
Vue - about 15 or so. And we've already seen `v-bind` and also `v-for`. We'll
talk about the other important directives later. For each, you can get info
about how it works.

## The custom key Attribute

Oh, and there's *one* more *tiny* detail I want to mention before we keep going.
Back on the site, inspect element on the `li`. It has `class="nav-item"`, but it
does *not* have a `key` attribute?

There's a *bit* of magic going on. Normally, if you add `foo="bar"` to an element,
that element - of course - *will* have a `foo` attribute! *We* know that the *true*
purpose of the `key` element was to help Vue internally... but why didn't the
attribute show up?

Back on the docs, right below the Directives section is another one called
"Special Attributes" and you see that `key` is one of them. Basically, if you
add an attribute in Vue, it *will* render as an attribute... unless it's one
of these *special* attributes. It's not really an important detail, but if you
were wondering *why* everything *other* than `key` is rendering as an attribute,
this is your answer: Vue is hiding it, because it's really internal.

Next: Vue is more than data and re-rendering: it's also about responding to user
interaction. Let's add our first *behavior*: a link that will collapse and expand
the sidebar.
