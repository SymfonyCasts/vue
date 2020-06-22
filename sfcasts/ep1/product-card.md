# Adding all the Product Details

Let's *really* make these product come to life! Now that we have a component whose
*only* job is to render a *single* product, this is going to be fun & clean.

## The Product Card Template

I'm going to start by pasting some HTML into the template: you can copy this from
the code block on this page. But there's nothing too interesting yet. We *are*
referencing a few styles - `$style['product-box']` and `$style.image` and we'll
add a `style` tag soon for this. If you're wondering why I'm using the square
bracket syntax, that's because JavaScript hates dashes with the object property
syntax: you can't say `$style.product-box`... which, yes, is annoying.

A little below this, we *are* using the product data. If you go back to the Vue
dev tools and click on Catalog, each product has several fields on it, like
`brand`, `image` - which is the URL to an image - `name`, `price`, and even a
`stockQuantity`.

So, for the image, we're using `src="product.image"` with the `:` that makes this
attribute dynamic, and we're rendering more data for the `alt` attribute, the
product name and then `product.price`. We also have a button to *view* the product
page... which isn't actually working yet.. then we print `product.name`.

*Hopefully* this all feels fairly simple.

## When you Forget the style Tag

If we move over now and check the console, ooooo:

> Cannot read property `product-box` of undefined

Coming from `product-card`. Vue is telling us that the `$style` variable is
undefined... which actually makes sense: we don't have a `style` tag yet. No problem:
add the `<style>` with `lang="scss"`. In fact, `$style` will be undefined until
you have a `style` tag *and* that tag has the `module` attribute.

For the styles itself, I'm going to import this `scss/components/light-component.scss`
file, which is a Sass mixing. To do that, use `@import`. Then, to use the Webpack
alias that we create earlier, use `~` and then the name of the alias. So
`~styles/` to point to the `scss` directory - then `components/light-component`.

Excellent! Now that we've done the hard work, I'll paste in a few more styles.
This adds the `.product-box` and `.image` classes that correspond with the style
code in the template.

Ok, I think we're ready! When we move over... hmm... I don't see any products.
Let's refresh to be sure. And... yes! There they are! Each has an image, title,
price and button.

## Computed price Property

But, hmm: these prices are not right. I would *love* to be able to sell blank
CDs for $1,300... but that's not the *real* price. When you deal with prices,
it's pretty common to store the prices in "cents", or whatever the lowest
denomination of that currency is. The point is, this is 2,300 cents, so $23.

In other words: we have a formatting problem: we need to take this number, divide
it by 100 and put the decimal place in the right spot. Yes, we have a situation
where we need to render something that's *based* on a prop, but is needs some
*slight* processing first. Does that ring a bell? That's the *perfect* case
for one of my absolute *favorite* features of Vue: a computed property.

Let's do this! Add a `computed` option with one new computed property called
`price()`. Inside, return `this.product.price` - to reference the price of the
`product` `prop` and divide this by 100. Good start! To convert this into a
string that always has two decimal points, we can use a fun JavaScript function
that exists on any Number: `.toLocaleString()`. Pass this the locale - `en-US` or
anything else - and then an options array with `minimumFractionDigits: 2`.

Pretty cool, right? I'll even add some docs to our function.

Now that we have a computed property called `price`, we can use it with
`{{ price }}`, as *if* `price` were a prop or data.

We know that computed properties - like `props` and `data` are added as *properties*
to the Vue instance, which is why we can say things like `this.price`. But behind
the scenes, when we access this property, it will all our method. and as a bonus,
it even *caches* that property in case we refer to it multiple times.

## Computed Properties with Arguments?

Oh, and by the way: this is *one* of the reasons why I created a specific component
for rendering each product. If we did *not* have this component... and we were
rendering this data inside the `ProductList` component, we wouldn't be able to
use a computed property... because we would need to pass an *argument*: the product
price. Instead, we would have needed to create a *method*... which isn't the end
of the world, but is less efficient. Any time that you're creating a method to
*return* data, it's a signal that you should considering refactoring into a smaller
component that could use a computed property.

Anyways, now when we move over... we don't even need to refresh: there is our
*beautiful* 30.00 price. What a bargain!

## Smart and Dumb Components

Before we keep going, I want to circle back on a controversial decision I made
earlier... the fact that we kept the `products` data inside `catalog.vue` even
though the `product-list` component is *technically* the deepest component that
needs it.

If you look at `catalog.vue`, it holds the AJAX call and pretty soon it's going
hold logic for a search bar. But... it doesn't render a lot of markup. I mean,
yeah, it has an `<h1>` up here and a `<div>` down here, but its *main* job is
to contain data and logic.

Compare this to the product-list component - `index.vue`. This doesn't have any
logic at all! It receives props and renders.

It turns out that this separation was *not* an accident: it's a design pattern
that's often followed in Vue and React. It's called smart versus dumb components,
or container versus presentational components.

This pattern says that you should try to organize some components to be smart -
components that make AJAX calls and changing state - and other components to be
dumb - that receive props, render data and maybe emit an event when the user does
something.

`product-card` is another example of a dumb, or "presentational" component. Sure,
it has a computed property to do some basic data manipulation, but this is just
a component receives a prop and renders them.

In Symfony, one way to think about this that a smart component is like a controller:
it does *all* the work of getting the data ready, which might involve calling other
services or not - that's not important. Once it has all the data, it passes it
into a template, which is like a dumb component. The template simply receives
the data and renders it.

Like all design patterns, keep this in the back of your mind as a guide, but don't
obsess over it. We're doing a good job of making this separation in some places,
but we're not perfect either, and I think that's great. But if you can *generally*
follow it, you'll be happier with your components.

Next, now that we're loading data via AJAX, we're going to need a way to tell the
user that things are loading. Let's create a Loading component that we can re-use
anywhere.
