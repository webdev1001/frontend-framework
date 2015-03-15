// Require Node Packages
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

// Create asset variables
var paths = {
    assets: 'assets/',
    css: 'assets/css/',
    scss: 'assets/scss/',
    js: 'assets/js/',
    img: 'assets/img/',
    bower: 'components/'
}

gulp.task('sass', function () {
    gulp.src( [paths.scss] + '*.scss' )
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(sourcemaps.write( './maps' ))
        .pipe(gulp.dest( [paths.css] + '' ));
});

gulp.task('default', function() {
    
});
