// QA specific gulpfile

var gulp = require('gulp'),
    csscss = require('gulp-csscss'),
    csslint = require('gulp-csslint'),
    htmlhint = require('gulp-htmlhint'),
    notify = require('gulp-notify'),
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

gulp.task('dstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(csscss())
    .pipe(gulp.dest('doubles.css'));
});
