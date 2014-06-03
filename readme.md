Mixd Frontend Framework
=======================

A front-end boilerplate for new projects at Mixd.

# General

The Mixd Frontend Framework...

- Is mobile-first
- Uses Sass and Compass for stylesheet pre-processing
- Follows OOCSS principles
- Uses [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) style naming conventions
- Uses Grunt to concat/compile/uglify/build etc.
- Uses Bower to handle front end dependencies

# Getting started

### Install dependencies

```
$ bundle install
$ npm install
$ bower install
```

### Configuration

Open both `package.json` and `bower.json` and change the name of the project.

## Sass usage

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
- **`interface/`:** Starts empty. This is where your project-specific stylesheets should go.
- **`helpers/`:** Overrides, debugging, clearfixes and other specific-purpose helper classes.

A sensible place to start would be `styles.scss`, where you can see what partials are included and what purpose they serve. Spend some time familarising yourself with this structure.

Get started by importing your project-specific partials under the "Project" comment flag.


# JavaScript usage

Where possible, all Javascript should be concatenated and uglified into `all.min.js`. Your Grunt build will automatically concatenate in the following order:

- jQuery (third party Bower component)
- Grunticon stylesheet loader
- Any third party scripts in `/assets/js/vendor`
- Any scripts in `/assets/js` prefixed with an underscore.

Scripts that need to run on init or when the DOM is loaded, should be written into `_main.js`.

If you need to add new third party components, they should be added via Bower and added to the file stack in the `uglify` task within `Gruntfile.js`. This ensures they all get concatented into a single HTTP request.

**Note:** Modernizr is a bit of a special case in that it *is* a third party component, but *isn't* included via Bower. That's because Grunt creates a custom modernizr build on the fly – more on that later.

## Bower usage

Front-end dependencies should be handled via Bower, where possible. To add a new dependency:

```
$ bower install --save <dependency>
```

`<dependency>` Is usually a registered name of the component. If you're not sure what it is, you can use `bower search` to find it.

The `--save` parameter is important here, as this saves the component to your `bower.json` so other developers can easily run `bower install` to fetch the correct versions of every component.

## Grunt tasks

The Grunt `watch` task concats/uglifies your scripts when you Javascript files change, and compiles your stylesheets when your Sass files change. There are also a number of other important tasks which can either be ran directly or by running the default `grunt` task.

**Note:** By default, `watch` will only compile your `styles.css` not your `ie.css` to speed things up during production. be sure to run the default `grunt` task or `grunt compass:prod` before IE testing.

### Autoprefixer

This searches through your compiled CSS, finds any CSS rules which require vendor prefixes and adds them for you. That means you never have to write a single vendor prefix (or use Compass mixins) for browser support.

Autoprefixer uses data from [caniuse.com](http://caniuse.com) to decide which rules require prefixing based on a set of predefined supported browsers. By default, these browsers are the current supported version and 1 previous, plus IE8, IE9 Firefox ESR, and Opera 12.1. You can change these in the `Gruntfile.js`

### ImageOptim

This requires [ImageOptim](http://imageoptim.com/) to work. It compresses and optimises all images in `assets/img`.

### svgmin

Compresses all SVGs in `assets/img`. Usefull for getting rid of all the extra guff that Illustrator adds when exporting SVG files.

### Grunticon

Takes all SVG files within `assets/img/icons` and creates an icon system from them. Icons are encoded as data URIs and set as background images in a stylesheet which you'll find in `assets/grunticon/icons.data.svg.css`. Icon classes are generated from the name of the original SVG prefixed with `icon--`. 

PNG fallbacks are automatically generated for incompatible browsers, and JavaScript loader (which is already compiled into your `all.min.js`) will load the relevent stylesheet based on browser support.

### Modernizr

Checks all your scripts and stylesheets for any Modernizr checks and automatically generates a Modernizr build with only the bits you actually use.


# Documentation

Here's an ongoing section of documentation on how to use the various components and quirks of the Framework.

## Tabs

The Front-end framework comes with a fully responsive accordion-to-tabs system which will alternate depending on screen size. For example, you'll have an accordion on mobile, whereas a tabbed system on desktop.

As the tabs system won't be used on all projects, its not enabled by default.

To enable the styling for the tabs, uncomment the following line within the `style.scss`

```
// @import "modules/tabs";             // tabs
```

Next, we need to initiate the function. Go into the `_main.js` file within the **assets/js** folder and add the following to the `DOMready = function () {};` function:

```
tabs();
```

Now that you've setup the plugin, you'll need to add the markup. Heres the basic structure:

```
<ul class="tabs">
	<li class="tab__item tab__item--current">
		<a href="#" class="tab__head">Item 1</a>
		<div class="tab__content">
			Content for Tab 1
		</div>
	</li>
	<li class="tab__item">
		<a href="#" class="tab__head">Item 2</a>
		<div class="tab__content">
			Content for Tab 2
		</div>
	</li>
	<li class="tab__item">
		<a href="#" class="tab__head">Item 3</a>
		<div class="tab__content">
			Content for Tab 3
		</div>
	</li>
	<li class="tab__item">
		<a href="#" class="tab__head">Item 4</a>
		<div class="tab__content">
			Content for Tab 4
		</div>
	</li>
</ul> <!-- .tabs -->
```

Aslong as you keep this structure, and keep these classes, it'll work.

Its also worth mentioning that whichever tab you put the `tab__item--current` class on in the markup will be the tab which will be displayed when you load the page.

# TODO

- Fully document Sass coding practices and conventions
- Abstract Sass modules into separate custom bower component