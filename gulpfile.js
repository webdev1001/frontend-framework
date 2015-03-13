var gulp = require('gulp'),
    sass = require('gulp-sass');

var paths = {
    assets: 'assets/',
    css: 'assets/css/',
    scss: 'assets/scss/',
    js: 'assets/js/',
    img: 'assets/img/',
    bower: 'components/'
}

gulp.task('sass', function () {
    gulp.src([paths.scss] + 'styles.scss')
        .pipe(sass())
        .pipe(gulp.dest([paths.css] + ''));
});

gulp.task('default', function() {
    
});
