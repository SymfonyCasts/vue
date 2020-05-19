# The Delightful World of Vue.js

Well hi there! This repository holds the code and script
for the [The Delightful World of Vue.js](https://symfonycasts.com/screencast/vue) course on SymfonyCasts.

## Setup

If you've just downloaded the code, congratulations!!

To get it working, pour some coffee or tea, and
follow these steps:

**Download Composer dependencies**

Make sure you have [Composer installed](https://getcomposer.org/download/)
and then run:

```
composer install
```

You may alternatively need to run `php composer.phar install`, depending
on how you installed Composer.

**Install node dependencies**

Make sure you have [Yarn installed](https://yarnpkg.com/en/docs/install) and then run:

```
yarn install
yarn watch
```

Alternatively, you can run `yarn dev-server --hot` to enable HMR
(hot module reloading) where changes show up before you run refresh!
For this to work, you will need to visit your site via `http` instead
of `https`.

**Configure the .env (or .env.local) File**

Open the `.env` file and make any adjustments you need - specifically
`DATABASE_URL`. Or, if you want, you can create a `.env.local` file
and *override* any configuration you need there (instead of changing
`.env` directly).

**Set up the Database**

Again, make sure `.env` is set up for your computer. Then, create
the database & tables!

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

If you get an error that the database exists, that should
be ok. But if you have problems, completely drop the
database (`doctrine:database:drop --force`) and try again.

**Start the development web server**

You can use Nginx or Apache, but Symfony's local web server
works even better.

To install the Symfony local web server, follow
"Downloading the Symfony client" instructions found
here: https://symfony.com/download - you only need to do this
once on your system.

Then, to start the web server, open a terminal, move into the
project, and run:

```
symfony serve --allow-http
```

(If this is your first time using this command, you may see an
error that you need to run `symfony server:ca:install` first).

Now check out the site at `https://localhost:8000`

Have fun!

## Have Ideas, Feedback or an Issue?

If you have suggestions or questions, please feel free to
open an issue on this repository or comment on the course
itself. We're watching both :).

## Thanks!

And as always, thanks so much for your support and letting
us do what we love!

<3 Your friends at SymfonyCasts
