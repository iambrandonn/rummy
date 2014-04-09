var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var myth = require('gulp-myth');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
  return gulp.src('build', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('styles', function() {
  return gulp.src('styles/*.css')
    .pipe(myth())
    .pipe(cssmin())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
  return gulp.src([
            'scripts/fastclick.js',
            'scripts/modernizr.js',
            'scripts/resizeend.js',
            'scripts/states.js',
            'scripts/domMap.js',
            'scripts/card.js',
            'scripts/deck.js',
            'scripts/player.js',
            'scripts/hand.js',
            'scripts/game.js',
            'scripts/app.js'
          ])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
  return gulp.src('fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.watch('scripts/*', ['scripts']);
gulp.watch('styles/*', ['styles']);
gulp.watch('fonts/*', ['fonts']);

gulp.task('default', ['clean', 'styles', 'scripts', 'fonts']);