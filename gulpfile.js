var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserify = require('browserify');

var source = require('vinyl-source-stream');


gulp.task('webserver', function() {
  connect.server({
    port:20000
  });
});

//浏览器端包装
gulp.task('browserify', function() {
    return browserify('./src/index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('talkingCases.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/'));
});

//压缩
gulp.task('compress', function() {
    return gulp.src('./dist/talkingCases.js')                
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./dist/'));  //输出
});

//监控js源代码变化, 发生变化后, 则自动编译并发布talkingTests.js
gulp.task('watch', function () {
   gulp.watch('src/*.js', ['browserify','compress']);
});

gulp.task('default', ['browserify','compress','watch','webserver']);