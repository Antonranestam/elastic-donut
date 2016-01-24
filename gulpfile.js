const gulp = require('gulp')
const browserify = require('browserify')
const watchify = require('watchify')
const shim = require('browserify-shim')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const file = require('gulp-file')

// Browserify
const b = browserify({
  basedir: './public',
  entries: './index.js',
  cache: {},
  packageCache: {},
  debug: false
})

b.transform(babelify)
b.transform(shim, { global: true })

// Bundle browserify
function bundle() {
  // Generate environment file
  var contents = '{ \"env\": \"' + process.env.NODE_ENV + '\" }'
  file('.env.json', contents)
  .pipe(gulp.dest('./public'))

  return b.bundle()
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Browserify build error:\n') + err.message)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/dist/js'))
}

// Browserify task
gulp.task('browserify', function () {
  return bundle()
})

// Watch .scss and .js
gulp.task('watch', function () {
  b.plugin(watchify);
  b.on('update', bundle);
  b.on('log', function (msg) {
    gutil.log('Browserify build - ' + msg)
  })
  bundle()
});

// Set default task
gulp.task('default', ['watch'])
