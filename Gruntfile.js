module.exports = function( grunt ) {

    // Load NPM tasks
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-pixrem' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-modernizr' );
    grunt.loadNpmTasks( 'grunt-imageoptim' );
    grunt.loadNpmTasks( 'grunt-svgmin' );
    grunt.loadNpmTasks( 'grunt-grunticon' );


    // Keep directories in variable for easy changes and CMS integration
    var dirs = {
        assets: 'assets',
        components: 'components'
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        dirs: dirs,

        // Uglify [and Minify] Javascript
        uglify: {
            scripts: {
                files: {
                    '<%= dirs.assets %>/js/min/main.min.js': [
                        '<%= dirs.components %>/jquery/dist/jquery.min.js',
                        '<%= dirs.assets %>/grunticon/grunticon.loader.txt',
                        '<%= dirs.assets %>/js/main.js'
                    ],
                    '<%= dirs.assets %>/js/min/head.min.js': [
                        '<%= dirs.assets %>/js/vendor/modernizr.js',
                        '<%= dirs.assets %>/js/head.js'
                    ]
                }
            }
        },

        // Compile Sass/Scss
        sass: {
            options: {
                bundleExec: true,
                style: 'compressed'
            },
            dev: {
                files: {
                    '<%= dirs.assets %>/css/styles.css': '<%= dirs.assets %>/scss/styles.scss'
                }
            },
            dist: {
                files: [{
                  expand: true,
                  cwd: '<%= dirs.assets %>/scss/',
                  src: ['*.scss'],
                  dest: '<%= dirs.assets %>/css/',
                  ext: '.css'
                }]
            }
        },

        // Fallback for rem's
        pixrem: {
            options: {
                rootvalue: '1em'
            },
            dist: {
                files: {
                    '<%= dirs.assets %>/css/styles.css': ['<%= dirs.assets %>/css/styles.css'],
                    '<%= dirs.assets %>/css/ie.css': ['<%= dirs.assets %>/css/ie.css'],
                }
            }
        },

        // Autoprefix .css files
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1' ]
            },
            files: {
                expand: true,
                flatten: true,
                src: '<%= dirs.assets %>/css/*.css',
                dest: '<%= dirs.assets %>/css'
            }
        },

        // Optimise Images
        imageoptim: {
            src: '<%= dirs.assets %>/img',
            options: {
                quitAfter: true
            }
        },

        // Minify .svg files
        svgmin: {
            options: {
                plugins:[
                    {
                        removeViewBox: false
                    },
                    {
                        removeUselessStrokeAndFill: false
                    },
                    {
                        convertPathData: {
                            straightCurves: false
                        }
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.assets %>/img',
                    src: [ '**/*.svg' ],
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
                    src: [ '*.svg', '*.png' ],
                    dest: "<%= dirs.assets %>/grunticon"
                }],
                options: {
                    cssprefix: ".icon--"
                }
            }
        },

        // Generate custom Modernizr build
        modernizr: {
            dist: {
                "devFile": "<%= dirs.components %>/modernizr/modernizr.js",
                "outputFile": "<%= dirs.assets %>/js/vendor/modernizr.js",
                "extensibility": {
                    "teststyles": true,
                    "testprops": true,
                    "prefixes": true,
                    "domprefixes": true
                },
                "files": {
                    "src": [ '<%= dirs.assets %>/scss/*.scss' ]
                },
                "uglify": false
            }
        },

        // Watch Task
        watch: {
            scripts: {
                files: [ '<%= dirs.assets %>/js/*.js' ],
                tasks: [ 'uglify' ],
                options: {
                    spawn: false
                }
            },
            css: {
                files: '<%= dirs.assets %>/scss/**/*.scss',
                tasks: [ 'sass:dev' ],
                options: {
                    livereload: true
                }
            },
            svg: {
                files: '<%= dirs.assets %>/img/icons/*.svg',
                tasks: [ 'svgmin', 'grunticon', 'sass:dev' ],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Register above tasks
    grunt.registerTask(
        'default',
        [
            'svgmin',
            'grunticon',
            'imageoptim',
            'sass:dist',
            'pixrem:dist',
            'autoprefixer',
            'modernizr',
            'uglify'
        ]
    );
}
