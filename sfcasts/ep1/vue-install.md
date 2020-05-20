# Vue Install

Coming soon...

To use view, we need to get it installed in our application. And we also need to
teach Webpack how to parse the view files. We're going to do that inside of Webpack
dot config dot. JS. It doesn't matter where in here, but let's go down to the bottom.
I'm going to add a new function on here called that enable view loader. That's all
you need to tell. Encore to process view files. If you want to force view three,
there's an extra option you can pass here to do that. Eventually view three will
become the default option inside of Encore. Now whenever you make a change to Webpack
config file, you need to move over and actually stop and restart Webpack. So I'll hit
control C and then rerun yarn watch. And when we do this really cool, it's Encore is
going to yell at us and say, yes you can use view, but you need to install a couple
more packages. So we'll copy this long yarn add line here to install these three
packages and I'll paste those.

And then one this has done, we will restart Encore with yarn watch. Perfect. So
nothing's really changed except that it is now ready to parse a view files. So in the
simplest sense, what view is is it's a front end templating language that's that
oversimplifies it, but it's really pretty true. And Symfony, if you go to open your
product controller, we're used to using twig. It's very simple. We basically, we tell
it what template to render and then we can pass an array of variables over here if we
want to. And so that we can use those variables inside of our twig template. We open
up that template.

Okay.

It's just HTML. And then we usually can print variable names inside of your using a
curly curly it's index. So with view basically instead of rendering this H T instead
of rendering H instead of rendering, instead of twig rendering the templates in
variables, we're just going to have view render templates and variables. The end
result is going to be pretty much the same thing. Of course, the one extra super of
view is that when those variables change, the template is going to rerender. So
instead of rendering all this stuff on the inside twig instead, I'm just gonna say
div ID = app. This could be anything. But what I'm basically doing is creating an
empty element and we're going to tell you to render into this.

Now real quick, what we're building here is not a single page application and that's
on purpose. It turns out using Vue or react of a traditional web application is
actually even trickier. So for example, um, home page, we have this homepage which is
eventually going to have a view app. We also have a log in page. This is a completely
traditional HTML page. We have a registered page, a completely traditional HTML page.
And I want you to pretend like there are other parts of this site that have
traditional twig based, uh, that has traditional twig based rendering. It's only the
product section, which is what we're going to have right here. The only place that we
want to run your view app is in a product section. So we're going to embed a view app
inside of our traditional web app.

So if you go back and open the productivity Webpack that can think that JS file right
now, if you scroll up a little bit, we have one entry called app. The purpose of the
app entry in my application is to be JavaScript and CSS that is specific, that is
specific to the entire layout of the site. I actually don't have any JavaScript right
now, but this app, that CSS file that is loading contains for example, bootstrap and
whole bunch of other things that deal with the header, so anything an app that JS or
app that SCSS is meant to be for the layout of my site, our view application isn't
going to live on every single page, so I don't want to put my view application into
app dot JS instead, I'm going to create a second entry that we're going a second
entry in Webpack and then I'm only going to include on pages that need to boot our,
our view application, which is going to be a product listing section. I should
probably describe that. So I'm going to copy the app, the app add entry. We'll call
this one products because there'll be kind of a product section and they'll pointed
to a new products dot JS file.

Now you may notice if you kind of look down on this file here,

I know

now let's go create that file. So assets, JS, I'll create a new file called the
products that JS and just to see if things are working while console.log( boring
JavaScript vile make me cooler.

Perfect. Hmm,

why don't you go into your settings. Um, this is the part where I think that I say,
uh, that this should be enabled and shouldn't be disabled. It shouldn't have to do
this, but I'm going to do it because our project came with a dot. ESGR lamp, our C
file. And this is a something that's going to enforce some Cody standards, features,
terms that automatically read this. Then you can see we have a couple of base
recommendations and we're also using views. This is going to, you'll notice that
Peachtree storm is going to have lots of different recommendations for us along the
way. Thanks to this file, you don't have to use this exact file, but I highly
recommend having one of these. Now back in our products at JS, you can see that it's
highlighted console and it says unexpected console statement, no console.

Because I have a rule that says I shouldn't be running console in my code because
console is a debugging statement. Of course we're debugging right now, so it's no big
deal. Alright, so we have a new entry. We have a new file. The last thing we need to
do is actually include the JavaScript file on that page. So I'm gonna go to
templates, products index to HTML twig, and I'm going to override the block called
JavaScripts and block call parents. And then use the Encore industries script tags to
load any script tags I need for my products entry. If you look in the base that each
little twig, this is a pretty traditional application where I have a block style,
she's on top and down here I have a blocked JavaScripts and then right now I'm
loading the app, uh, entry files. So I'll do the same thing for the block style
sheets. We're not having any style sheets right now, but eventually our intro
bringing some style sheets. So overriding the block style sheets, and then we'll go
say on Encore, Encore entry link tags.

Okay,

perfect. Now we move over. Now before try this. Remember, because we just modified
our Webpack config file again, we do need to go over and restart Encore so that it
sees it. We're not going to do this too many more times, usually on the need to touch
your Webpack file when you're first setting up. Now if I go over and refresh, let's
go down to inspect, open up our console. And yes we've got a boring JavaScript file.
Make me cooler, let's make this cooler. So as I mentioned, I want you to kind of
think of his view as a front end templating engine templating engine in JavaScript.
So instead of having a twin tablet, we're just gonna have a template inside of
JavaScript. So first I'm going to say import view from view. That's going to give us
the main view object. And this is going to be one of the very few steps that looks a
little bit in different in view three, but it's, but the differences are minor and
I'll show them then I want to say constant app = new view. And I'm gonna pass this
some options. First option is going to be in L option pass too. Pass the pound sign
app. This is actually telling it that it that it should render inside of our app
element. And then we're gonna pass another thing called template. And here we can put
any, anything. This is an HTML template. Let's put each one

hello, have you? Okay. Is this cooler? And we'll close that up and that's it. So now
I move over and refresh. It's alive. Okay. If you can get much cooler than this, but
we have a working as a company engine. Next, let's add some dynamic data, see how our
re renders, and then refactor this into what's called a single file components.

Okay.

