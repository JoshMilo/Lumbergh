// QA specific gulpfile

var gulp = require('gulp'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    notify = require('gulp-notify'),
    gulputil = require('gulp-util');

gulp.task('wildstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(notify("All right, all right, all right! CSS busted"));
});

gulp.task('markymark', function() {
  gulp.src('build/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(notify("The Funky Bunch has hinted."));
});
