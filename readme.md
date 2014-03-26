Mixd Frontend Framework
=======================

A front-end boilerplate for new projects at Mixd.

General
-------

The Mixd Frontend Framework...

- Is mobile-first
- Uses Sass and Compass for stylesheet pre-processing
- Follows OOCSS principles
- Uses [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) style naming conventions
- Uses Grunt to concat/compile/uglify/build etc.
- Uses Bower to handle front end dependencies

Getting started
---------------

### Install dependencies

```
$ bundle install
$ npm install
$ bower install
```

### Configuration

Open both `package.json` and `bower.json` and change the name of the project.

Sass usage
----------

### Structure

Your `assets/scss/` directory should look something like this:

```
scss/
	base/
	config/
	helpers/
	layout/
	modules/
	ie.scss
	styles.scss
```

- **`config/`:** Sass configuration files that do not generate any styles directly (variables, mixins etc.) along with config partials for third party components (Griddle etc.).
- **`base/`:** Defaults for your project and styling for top-level, unclassed elements and typography.
- **`layout/`:** Layout and structure styles (containers, grids etc.)
- **`modules/`:** Generic objects which can be reused throughout the project and contain no project-specific styling
- **`interface/`:** Starts empty. This is where your project-specific stylesheets should go
- **`helpers/`:** Overrides, debugging, clearfixes and other specific-purpose helper classes.

A sensible place to start would be `styles.scss`, where you can see what partials are included and what purpose they serve. Spend some time familarising yourself with this structure.

Get started by importing your project-specific partials under the "Project" comment flag.

JavaScript usage
----------------

Bower usage
----------

Grunt usage
-----------

Notes
-----

- Drops support for <IE8, reflected in lesser <html> stack
- Makes use of Susy for grids
- Makes use of Autoprefixer
- Uses REMs over EMs via mixin
- Uses sensible long-form font stacks
- Uses autoprefixer
- Generates custom modernizr build
- Uses grunticon for icon generation
- Uses Griddle
- Grunt only compiles styles.scss on watch & doesn't run autoprefixer.

Todo
----
