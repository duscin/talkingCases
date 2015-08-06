var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    port:20000
  });
});

gulp.task('default', ['webserver']);