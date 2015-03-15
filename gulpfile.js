var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

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
        .pipe(sourcemaps.write( './maps' ))
        .pipe(gulp.dest( [paths.css] + '' ));
});

gulp.task('default', function() {
    
});
