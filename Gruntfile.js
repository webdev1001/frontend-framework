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


	// Keep directories in variable for easy changes and CMS integration

	var dirs = {
    assets: 'assets',
    compassConfig: 'config.rb',
    components: 'components'
  }
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,

		//Uglify JS

		uglify: {
			files: {
				'<%= dirs.assets %>/js/all.min.js': ['<%= dirs.components %>/jquery/dist/jquery.min.js', '<%= dirs.assets %>/grunticon/grunticon.loader.txt', '<%= dirs.assets %>/js/vendor/*.js', '<%= dirs.assets %>/js/_*.js']
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
					specify: '<%= dirs.assets %>/scss/styles.scss',
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
	      src: '<%= dirs.assets %>/css/*.css',
	      dest: '<%= dirs.assets %>/css'
	    },
  	},

		// Optimise images

		imageoptim: {
			src: ['<%= dirs.assets %>/img'],
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
	        cwd: '<%= dirs.assets %>/img',
	        src: ['**/*.svg'],
	        dest: '<%= dirs.assets %>/img',
	        ext: '.svg'
	      }]
	    }
	  },

		// Generate SVG/PNG icons + fallback

		grunticon: {
	    icons: {
	      files: [{
	        expand: true,
	        cwd: '<%= dirs.assets %>/img/icons',
	        src: ['*.svg', '*.png'],
	        dest: "<%= dirs.assets %>/grunticon"
	      }],
	      options: {
	      	cssprefix: ".icon--",
	      	template: "<%= dirs.assets %>/grunticon/css-template.hbs"
	      }
	    }
    },

		// Generate custom Modernizr build

		modernizr: {
			dist: {
		    "devFile" : "<%= dirs.components %>/modernizr/modernizr.js",
		    "outputFile" : "<%= dirs.assets %>/js/vendor/modernizr.js",

		    "extensibility" : {
		        "teststyles" : true,
		        "testprops" : true,
		        "prefixes" : true,
		        "domprefixes" : true
		    },
		    "files" : {
        	"src": ['<%= dirs.assets %>/scss/*.scss']
        },
		    "uglify" : false
			}
		},

		// Watch
 
		watch: {
			scripts: {
				files: ['<%= dirs.assets %>/js/*.js'],
				tasks: ['uglify'],
				options: {
						spawn: false,
				},
			},

			css: {
				files: '<%= dirs.assets %>/scss/**/*.scss',
				tasks: ['compass:dev'],
				options: {
					livereload: true
				},
				svg: {
					files: '<%= dirs.assets %>/img/icons/*.svg',
					tasks: [ 'svgmin', 'grunticon', 'compass:dev'],
					options: {
						livereload: true
					}
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