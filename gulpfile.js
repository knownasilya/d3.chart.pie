var RELOAD_PORT = 35731,
  SERVER_PORT = 5000,
  DIST_DIR = './dist/',
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  open = require('gulp-open'),
  lr = require('tiny-lr'),
  express = require('express'),
  liveReload = require('connect-livereload'),
  refresh = require('gulp-livereload'),
  path = require('path'),
  less = require('gulp-less'),
  lrServer = lr(),
  server = express();

// Setup Express server middleware
server.use(liveReload({
  port: RELOAD_PORT
}));
server.use(express.static('./dist'));
server.use(express.static('./examples'));
server.use(express.static('./bower_components'));

// Gulp tasks
gulp.task('less', function () {
  gulp.src('./lib/styles/*.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'lib', 'styles')
      ]
    }))
    .pipe(gulp.dest(DIST_DIR))
    .pipe(refresh(lrServer));
});

gulp.task('copy', function () {
  gulp.src('./lib/*.js')
    .pipe(gulp.dest('./dist'))
    .pipe(refresh(lrServer));
});

gulp.task('watch', function () {
  server.listen(35730, function (err) {
    if (err) {
      return console.log(err);
    }

    gulp.watch('./lib/styles/*.less', function () {
      gulp.run('less');
    });

    gulp.watch('./lib/*.js', function () {
      gulp.run('copy');
    });
  });
});

gulp.task('serve', function () {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(SERVER_PORT);
  //Set up your livereload server
  lrServer.listen(RELOAD_PORT);
});

gulp.task('openUrl', function(){
  gulp.src('./examples/index.html')
    .pipe(open('', { url: 'http://localhost:5000' }));
});

gulp.task('dev', function () {
  gulp.start('less', 'copy', 'serve', 'openUrl', 'watch');
});

gulp.task('default', function () {
  gulp.start('less', 'copy');
});
