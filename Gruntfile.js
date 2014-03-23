module.exports = function(grunt) {

	//Load NPM tasks

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-svg2png');
	grunt.loadNpmTasks("grunt-modernizr");
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Uglify JS

		uglify: {
			prod: {
				files: {
					'assets/js/all.min.js': ['bower_components/jquery/dist/jquery.min.js', 'assets/js/vendor/*.js', 'assets/js/_*.js']
				}
			}
		},

		// Compile Sass

		compass: {
			prod: {
				options: {
					config: 'config.rb',
					bundleExec: true
				}
			}
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
			prod: {
				src: ['assets/img'],
				options: {
						quitAfter: true
				}
			}
		},

		// Rasterise SVGs

		svg2png: {
			prod: {
				files: [
					{ src: ['assets/img/**/*.svg'] }
				]
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
				tasks: ['compass', 'autoprefixer'],
				options: {
					livereload: true
				}

			}
		}
	
	});
 
	// Build

	grunt.registerTask('default',
		[
			'svg2png:prod',
			'imageoptim:prod',
			'compass:prod',
			'autoprefixer',
			'modernizr',
			'uglify:prod'
		]);
 
}