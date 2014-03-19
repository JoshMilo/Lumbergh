// QA specific gulpfile

var gulp = require('gulp'),
    //csscss = require('gulp-csscss'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    notify = require('gulp-notify'),
    uncss = require('gulp-uncss'),
    w3cjs = require('gulp-w3cjs'),
    gulputil = require('gulp-util');


gulp.task('markymark', function() {
  gulp.src('build/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(notify("The Funky Bunch has hinted."));
});

gulp.task('wildstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(notify("All right, all right, all right! CSS busted"));
});
/*
gulp.task('dstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(csscss())
    .pipe(gulp.dest('doubles.css'));
});
*/
gulp.task('validation', function() {
  gulp.src('build/*.html')
    .pipe(w3cjs())
    .pipe(notify("Validation Complete!"));
});

gulp.task('uncss', function() {
  gulp.src('build/css/*.css')
    .pipe(uncss({
      html: ['build/index.html']
    }))
    .pipe(gulp.dest('build/css/out'));
});
