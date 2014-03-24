module.exports = function(grunt) {

	//Load NPM tasks

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-svg2png');
	grunt.loadNpmTasks("grunt-modernizr");
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-grunticon');
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Uglify JS

		uglify: {
			files: {
				'assets/js/all.min.js': ['bower_components/jquery/dist/jquery.min.js', 'assets/grunticon/grunticon.loader.txt', 'assets/js/vendor/*.js', 'assets/js/_*.js']
			}
		},

		// Compile Sass

		compass: {
			options: {
				config: 'config.rb',	
				bundleExec: true
			},
			dev: {
				options: {
					specify: 'assets/scss/styles.scss',
				}
			},
			prod: {}
		},

		// Autoprefixer

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1']
			},
		  files: {
	      expand: true,
	      flatten: true,
	      src: 'assets/css/*.css',
	      dest: 'assets/css'
	    },
  	},

		// Optimise images

		imageoptim: {
			src: ['assets/img'],
			options: {
					quitAfter: true
			}
		},

		// Compress SVGs

		svgmin: { 
	    options: {          
	      plugins: [{
	     		removeViewBox: false
	      }, {
	      	removeUselessStrokeAndFill: false
	      }, {
	      	convertPathData: { 
	        	straightCurves: false
	        }
	      }]
	    },
	    dist: {
	      files: [{
	        expand: true,
	        cwd: 'assets/img',
	        src: ['**/*.svg'],
	        dest: 'assets/img',
	        ext: '.svg'
	      }]
	    }
	  },

		// Generate SVG/PNG icons + fallback

		grunticon: {
	    icons: {
	      files: [{
	        expand: true,
	        cwd: 'assets/img/icons',
	        src: ['*.svg', '*.png'],
	        dest: "assets/grunticon"
	      }],
	      options: {
	      	cssprefix: ".icon--",
	      	template: "assets/grunticon/css-template.hbs"
	      }
	    }
    },

		// Generate custom Modernizr build

		modernizr: {
			dist: {
		    "devFile" : "bower_components/modernizr/modernizr.js",
		    "outputFile" : "assets/js/vendor/modernizr.js",

		    "extensibility" : {
		        "teststyles" : true,
		        "testprops" : true,
		        "prefixes" : true,
		        "domprefixes" : true
		    },
		    "files" : {
        	"src": ['assets/scss/*.scss']
        },
		    "uglify" : false
			}
		},

		// Watch
 
		watch: {
			scripts: {
				files: ['assets/js/*.js'],
				tasks: ['uglify'],
				options: {
						spawn: false,
				},
			},

			css: {
				files: 'assets/scss/**/*.scss',
				tasks: ['compass:dev'],
				options: {
					livereload: true
				}

			}
		}
	
	});
 
	// Build

	grunt.registerTask('default',
		[
			'svgmin',
			'grunticon',
			'imageoptim',
			'compass:prod',
			'autoprefixer',
			'modernizr',
			'uglify'
		]);
 
}