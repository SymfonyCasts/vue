# Hmr

Coming soon...

Before we keep going further into Vue, I want to show you a really awesome feature
of Webpack. Well, it's technically a feature of Webpack, but view does something that
makes it possible and really awesome. Let me show you right now. If you go back to
your terminal, we are running yarn watch. I'll hit Control + C to stop it. 

```terminal
yarn watch
```

What this does is it actually reads all of our files and the `assets/` director here and
then physically builds them into a `public/build/` directory. So this has a bunch of
CSS and JS files that we're loading on our page and you could see that if you view
the page source, so we have a build process, but it's building physical files and
we're loading those physical files here. There's one other main way to run Webpack
and something called the dev server, and this may or may not work with you depending
on your setup. If you have a Docker set up, you might need to do extra configuration.
But let me show you what you can do here. Instead of `yarn watch` Run 

```terminal
yarn dev-server
```

Now just like with `yarn watch`,

this, we can use this uh, command because of our `package.json` has a little
script section in here that has a bunch of shortcuts that was added when we first
installed Encore. So `dev-server` is just short for `encore dev-server`. Now what this
does, I'll go back to my terminal is you can see, so it says something about project
is running at `localhost:8080` and web PACS is out served by `localhost:8080/build`, ADHD.
/build. These are all things that are configurable and if you have a more complex
setup like Docker, you will need to configure to get this set up. What this is
basically saying is that the physical files are no longer being output into this
`build/` directory. You can see there's these two Dasani metadata files, but there's no
JavaScript and CSS files at all. Instead, if you want to access those files, you can
go to `localhost:8080/` and they'll be there.

So I actually put that in my browser and if I go to `/build/app.js` for example,
I can actually get that JavaScript file. Now, if we actually go back to our site, you
might be wondering why. Why is this important? If we went back to a site and refresh
right now, it still works. What's really interesting is that if you view the page
source, check this out simply has automatically changed all of our links to look at
that `localhost:8080/` thing. So on a high level, the difference is that instead of
Webpack writing physical files, it starts a little web server and when we relearn our
Symfony app, it actually loads these files dynamically from that web server. For
those parts. You don't notice this when you're coding, it works just as well, but if
you get the dev server working, then there's some interesting possibilities.

Before I show you those possibilities, you might notice that the web view by two of
right down here has a bunch of Ajax requests that are failing. I forgot my network
tools here. You'll see them. One of the powers of the dev server is that can
automatically reload your content for you without you needing to refresh. To do that,
it makes us a little, uh, makes a little Ajax call back to here and you can see that
it's failing cause it's trying to go to HTTP S local host 80 80. You can get that
little dev server to get to work on HTTPS. It just requires more work. The reason
it's using HTTPS is that our site is running on HTTPS. So the simplest way to get
this work is that when we originally started our Symfony web server, we started it
with `symfony serve -d` and then `--allowed-http`, which meant that our
built in web server is using HTTPS, but we're allowed to use HTTP locally. Let me
see, this works just fine and now you can see that that little Ajax call is working.
So I'm going towards the simplest setup where I use HTTP in my browser and then I'm
using HTTP on my dev server. Um, in more complex setups, you can absolutely get the
SSL certificate to work. If you're interested in having problems, you can always ask
us in the comments, but for the most part at the dev server is too much work to set
up then don't bother use `yarn watch` It works. Great.

Now why is this so awesome? Well, I'll check out. I spend my go over here and go to
my `products.vue`. Let's see. Let's go up here and for categories. Let's add a
couple exclamation points I had saved. 

I'll hit save. I'll go back over here and yep, you can actually see it just
refreshed. I'll get rid of those. Go back over here and it automatically refreshed
for me. So that's cool, right? As soon as it detects changes, it automatically
refreshes the page and uh, and it just makes life a little bit easier but it gets
cooler. You can't do this with all JavaScript, but because of the way view is
written, you can rerun the dev server with `--hot`. 

```terminal-silen
yarn dev-server --hot
```

That stands for a hot
module reload. Once that finishes our initial build. I'm going to go over here and
because I just restarted Webpack, um, just to be safe, I'm going to reload the page
now check this out. I'll go back over here and do the same trick. Move over. Look,
it's there, but there was no refresh this time. I can hear it again.

Same thing. No refresh. It's actually able to update our app without actually
refreshing it. So I'll just get changed some texts there. It's automatically updated.
Change it back. It's automatically updated. How cool is that? Now there's just one
problem with this in Encore and that's styles. So let's go down to the bottom here
and this let's mess with our hover styling here. I'm going to, uh, I got a change
request from a designer says we should change this to pink. Now as soon as I go here,
you'll notice it's not updating automatically. If I refresh the page, it does update.
But the hot module reloading is not actually working. The reason is because of the
way that Encore is, um, is built. If you want the hot module reloading to work with
styles, you need to actually disable a little feature that it does a little feature
of it.

So go back to your Webpack. I can pick that JS file and actually we need to do this
all the way. At the bottom here I'm going to lift statement that says if not
`Encore.isProduction()` as a little flag to see for doing your production bill of the
Encore, not then `Encore.disableCssExtraction()`. Some of that
Encore has on by default, but that means is that whenever you reference, you know,
CSS inside of your JavaScript files, it extracts them to their own CSS files and
we've seen that. That's why we have a `products.css` that's being out. But when
you disable CSS drag extraction, what that means, it tells Webpack not to output a
CSS file anymore. Instead it takes that CSS and it puts it in the JavaScript file and
then the JavaScript file when it loads actually writes that out onto your page. So
the end result is still the same. The reason that CSS extraction exists is that is
you'll see it over here. I refresh the page right now. Oh, of course. The reason CSS
extraction exists, you can see when you try it. Since I just made a change to my
Webpack config file, I'm gonna go over and restart my restart Encore.

```terminal-silent
yarn dev-server --hot
```

Let me go over now and refresh. You'll see it looks ugly for a second for refreshing
it. It looks ugly for a second. Now that JavaScript is actually adding the CSS to my
page. Your page, it looks ugly for a moment until the JavaScript can load and then
the CSS is added. So this mode is never used on production and actually see if I view
the source of the page, there are no CSS files up here at all anymore. This is a mode
that own should only be used during development, which is why add the if statement
over here to only disable the CSS extraction in development. Now, the reason I did
that is that the CSS extraction where it actually creates separate CSS files, that is
doesn't work with hot module reloading right now. You have to disable that for that
to work to have to jump through a couple hoops here.

But if you really want this hot module reloading, you can get it to work. So now
check this out. I'll just back over here. You can see my hover is still pink. Let's
change this. Hovered to green, and you actually saw it. You could see it instantly.
Update over here. Now go back and take that off and it's back. So I'm gonna do the
rest of the tutorial using the dev server using the HTTP, uh, version of my setup
here, not the HTTPS version. If you have any problems at all with the dev server, let
us know. But if it's too much trouble, don't use it. Use `yarn watch`. It's going to
make your life a lot easier. But this is a great feature of a Webpack and Vue.

