var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    react = require('gulp-react'),
    $ = require('gulp-load-plugins')({

    })
;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

// sassのコンパイル
gulp.task('sass', function () {
  return sass("scss/*")
    .on("error", sass.logError)
    .pipe(gulp.dest("./public/style"));
});

// browserifyのコンパイル
gulp.task('browserify', function(){

  browserify('./src/app.jsx', {debug: true})
    .transform(babelify.configure({
      presets: ["es2015","react"]
    }))
    .bundle()
    .on("error", function(err){
      console.log("Error : "+err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));

});

// 保存されるたびにビルドしたい
gulp.task('watch', function(){
  gulp.watch('./src/*.jsx', ['browserify']);
  gulp.watch('./scss/*.scss', ['sass']);
})

// webserverを立ち上げる。
gulp.task('webserver', function(){
  gulp.src('./public')
    .pipe(webserver({host: "127.0.0.1", liverload:true}));
});

gulp.task("default", [
  "sass",
  "browserify",
  "watch",
  "webserver"
]);
