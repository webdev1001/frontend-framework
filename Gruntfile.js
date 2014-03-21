module.exports = function(grunt) {

	//Load NPM tasks

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks('grunt-svg2png');
 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//Uglify JS

		uglify: {
			prod: {
				files: {
					'assets/js/all.min.js': ['bower_components/modernizr/modernizr.js', 'bower_components/jquery/dist/jquery.min.js', 'assets/js/_*.js']
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
				tasks: ['compass'],
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
			'uglify:prod'
		]);
 
}