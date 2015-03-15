/**
 ***************************************************************************
 * Mixd Front-end Framework - Gulp Setup
 ***************************************************************************
 *
 * This file sets up all the Gulp Tasks that are used for this framework.
 *
 * 
 * Sections
 * 
 * $. Require node packages
 * $. Create asset variables
 * $. Task: Compile Stylesheets
 * $. Task: Watch files for changes
 * $. Task: Default
 * 
 *
 */



/* $. Require node packages
\*----------------------------------------------------------------*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    pixrem = require('gulp-pixrem'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify");



/* $. Create asset variables
\*----------------------------------------------------------------*/

var paths = {
    assets: 'assets/',
    css: 'assets/css/',
    scss: 'assets/scss/',
    js: 'assets/js/',
    img: 'assets/img/',
    bower: 'components/'
}



/* $. Task: Compile Stylesheets
\*----------------------------------------------------------------*/

gulp.task('sass', function () {
    gulp.src( [paths.scss] + '*.scss' )
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(pixrem('1em'))
        .pipe(sourcemaps.write( './maps' ))
        .pipe(gulp.dest( [paths.css] + '' ))
        .pipe(livereload())
        .pipe(notify({
            message: 'Compiled Styles: assets/css/*.css',
            onLast: true
        }));
});



/* $. Task: Watch files for changes
\*----------------------------------------------------------------*/

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch( [paths.scss] + '**/*.scss', ['sass']);
});



/* $. Task: Default
\*----------------------------------------------------------------*/

gulp.task('default', function() {
    gulp.start('sass');
});
