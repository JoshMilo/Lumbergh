// QA specific gulpfile. Had problems with csscss so haven't put that in yet.

var gulp = require('gulp'),
    cleanhtml = require('gulp-cleanhtml'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    size = require('gulp-size'),
    uncss = require('gulp-uncss'),
    w3cjs = require('gulp-w3cjs'),
    gulputil = require('gulp-util');

    //Individual Tasks

gulp.task('markymark', function() {
  gulp.src('build/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(notify("The Funky Bunch has hinted."));
});

gulp.task('wildstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(plumber())
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(notify("All right, all right, all right! CSS busted"));
});

gulp.task('validation', function() {
  gulp.src('build/*.html')
    .pipe(w3cjs())
    .pipe(notify("Validation Complete!"));
});

gulp.task('uncss', function() {
  gulp.src('build/css/*.css')
    .pipe(plumber())
    .pipe(uncss({
      html: ['build/index.html']
    }))
    .pipe(gulp.dest('build/linted/css'))
    pipe(notify('Removed unused styles'));
});

gulp.task('cleanhtml', function() {
  gulp.src('build/*.html')
    .pipe(plumber())
    .pipe(cleanhtml())
    .pipe(gulp.dest('build/linted'))
    .pipe(notify('Cleaned up html'));
});

gulp.task('size', function() {
  gulp.src('build')
    .pipe(size(showFiles));
});

gulp.task('jshint', function() {
  gulp.src('build/js/*.js')
    .pipe(jshint('build/js/.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify('JS has been hinted'));
});
