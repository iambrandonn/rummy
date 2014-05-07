var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var myth = require('gulp-myth');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var minifyHTML = require('gulp-minify-html');
var gzip = require('gulp-gzip');

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('myth', function() {
  return gulp.src(['styles/*.css', '!styles/all.css'])
    .pipe(myth())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('styles'))
    .pipe(cssmin())
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('html', function () {
    var jsFilter = filter('**/*.js');

    return gulp.src('index.html')
        .pipe(useref.assets())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(gzip({append: false}))
        .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  return gulp.src('fonts/*')
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('build/images'));
});

gulp.task('default', ['myth'], function() {
    gulp.watch('styles/*', ['myth']);
    gulp.watch('fonts/*', ['fonts']);
});

gulp.task('build', ['clean', 'myth', 'fonts', 'images', 'html']);