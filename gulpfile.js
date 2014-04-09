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
    gulputil = require('gulp-util'),
    stylestats = require('gulp-stylestats-report'),
    clean = require('gulp-clean');

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    runSequence = require('run-sequence');

var reportsDir = './reports/json'

    //Individual Tasks

gulp.task('markymark', function() {
  var jsonReporter = function (file) {
    if (file && file.htmlhint) {
      fs.writeFileSync(reportsDir + '/htmlhint-' + file.path.split('/').pop().replace(/\.[^\.]+$/, '') + '.json', JSON.stringify(file.htmlhint, null, 2));
    }
  };

  return gulp.src('build/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter(jsonReporter))
    .pipe(notify("The Funky Bunch has hinted."));
});

gulp.task('wildstyle', function() {
  mkdirp(reportsDir);

  var jsonReporter = function (file) {
    if (file && file.csslint) {
      fs.writeFileSync(reportsDir + '/csshint-' + file.path.split('/').pop().replace(/\.[^\.]+$/, '') + '.json', JSON.stringify(file.csslint, null, 2));
    }
  };

  return gulp.src('build/css/*.css')
    .pipe(plumber())
    .pipe(csslint())
    .pipe(csslint.reporter(jsonReporter))
    .pipe(notify("All right, all right, all right! CSS busted"));
});

gulp.task('stylestats', function() {
  return gulp.src('build/css/*.css')
    .pipe(stylestats({reportDir: './reports/json'}))
    .pipe(notify("stylestats report generated."));
});

gulp.task('validation', function() {
  return gulp.src('build/*.html')
    .pipe(w3cjs())
    .pipe(notify("Validation Complete!"));
});

gulp.task('uncss', function() {
  return gulp.src('build/css/*.css')
    .pipe(plumber())
    .pipe(uncss({
      html: ['build/index.html']
    }))
    .pipe(gulp.dest('build/linted/css'))
    .pipe(notify('Removed unused styles'));
});

gulp.task('cleanhtml', function() {
  return gulp.src('build/*.html')
    .pipe(plumber())
    .pipe(cleanhtml())
    .pipe(gulp.dest('build/linted'))
    .pipe(notify('Cleaned up html'));
});

gulp.task('size', function() {
  return gulp.src('build')
    .pipe(size(showFiles));
});

gulp.task('jshint', function() {
  var jsonReporter = function (results, data, s2) {
    var filename = results[0].file.split('/').pop().replace(/\.[^\.]+$/, '');
    var output = {
      results: results,
      data: data
    };

    fs.writeFileSync(reportsDir + '/jshint-' + filename + '.json', JSON.stringify(output, null, 2));
  };

  return gulp.src('build/js/*.js')
    .pipe(jshint('build/js/.jshintrc'))
    .pipe(jshint.reporter(jsonReporter))
    .pipe(notify('JS has been hinted'));
});

gulp.task('clean-reports', function () {
  return gulp.src('./reports/json')
    .pipe(clean());
});

gulp.task('reports-index', function (cb) {
  var reports = fs.readdirSync('./reports/json/');
  var output = {
    css: [],
    stylestats: [],
    html: [],
    js: []
  };

  for (var i = reports.length - 1; i >= 0; i--) {
    if (/^csshint/.test(reports[i])) output.css.push(reports[i]);
    if (/^jshint/.test(reports[i])) output.js.push(reports[i]);
    if (/^htmlhint/.test(reports[i])) output.html.push(reports[i]);
    if (/^stylestats/.test(reports[i])) output.stylestats.push(reports[i]);
  };

  fs.writeFileSync(reportsDir + '/index.json', JSON.stringify(output, null, 2));

  cb();
});

gulp.task('generate-reports', function (cb) {
  runSequence('clean-reports', ['jshint', 'wildstyle', 'markymark', 'stylestats'], 'reports-index', cb);
});
