var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var _if = require('gulp-if');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var args = require('yargs').argv;
var isProduction = !!args.production;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var watchify = require('watchify');
var assign = require('lodash').assign;
var join = require("path").resolve;
var stringify = require('stringify');
var reactify = require('reactify');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var rename = require('gulp-rename');

var jsSource = './app/app.js';
var lessSource = './styles/style.less';
var output = "www/"
var customOpts = {
  debug: !isProduction
};

gulp.task('js', buildOnce());
gulp.task('less', buildLess);
gulp.task('watch-js', watchJs());
gulp.task('watch-less', ['less'], watchLess);
gulp.task('watch', ['watch-js', 'watch-less']);
gulp.task('dev', ['watch'], serve);
gulp.task('default', ['less', 'js']);

function serve() {
    browserSync.init({
      server: {
          baseDir: output
      }
    });
}

function buildOnce() {
  var bundle = browserify(jsSource, customOpts);
  return bootstrapBundle(bundle);
}

function watchJs() {
  var opts = assign({}, watchify.args, customOpts);
  var w = watchify(browserify(jsSource, opts));
  var bundle = bootstrapBundle(w);
  w.on('update', bundle);
  return bundle
}

function bootstrapBundle(bundle) {
  bundle.transform(stringify(['.md', '.html']))
  bundle.transform('reactify')
  return function () {
    return bundle.bundle()
      .on('log', notify)
      .on('error', notify.onError({
          message: "<%= error %>",
          title: "Error: <%= error.message %>"
      }))
      .pipe(source('app.bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(output))
      .pipe(_if(!isProduction, notify('Compiled javascript')))
      .pipe(_if(!isProduction, reload({stream: true})))
  }
}


function buildLess() {
    gulp.src(lessSource)
        .on('error', notify.onError({
            message: "<%= error %>",
            title: "Error: <%= error.message %>"
        }))
        .pipe(less())
        .pipe(rename({
            suffix: ".bundle",
        }))
        .pipe(gulp.dest(output))
        .pipe(_if(!isProduction, notify('Compiled less')))
        .pipe(_if(!isProduction, reload({stream: true})));
}

function watchLess() {
    gulp.watch('./styles/**/*.less', buildLess);
}
