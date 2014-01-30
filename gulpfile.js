var gulp = require('gulp'),
  gutil = require('gulp-util'),
  lr = require('tiny-lr'),
  livereload = require('gulp-livereload'),
  path = require('path'),
  less = require('gulp-less'),
  server = lr(),
  DIST_DIR = './dist/';

gulp.task('less', function () {
  gulp.src('./lib/styles/main.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'lib', 'styles')
      ]
    }))
    .pipe(gulp.dest(DIST_DIR))
    .pipe(livereload(server));
});

gulp.task('copy', function () {
  gulp.src('./lib/*.js')
    .pipe(gulp.dest('./dist'));
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

gulp.task('default', function () {
  gulp.start('less', 'copy');
});
