// QA specific gulpfile

var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    csslint = require('gulp-csslint')
    notify = require('gulp-notify');

gulp.task('wildstyle', function() {
  gulp.src('build/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(notify("All right, all right, all right! CSS busted"));
});
