/**
 * Created by nikiforov-as on 09.09.2016.
 */
/* File: gulpfile.js */

// собираем все наши плагины
var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  cssmin = require('gulp-minify-css');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: '../build/',
    js: '../build/js/',
    css: '../build/styles/',
    vendor: '../build/'
  },
  src: { //Пути откуда брать исходники
    html: '../src/*.html',
    js: '../src/js/*.js',
    style: '../src/styles/styles.sass',
    vendor: '../src/*.js'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: '../src/*.html',
    js: '../src/js/*.js',
    style: '../src/styles/*.sass',
    vendor: '../src/*.js'
  }
};

gulp.task('html:build', function () {
  gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
      .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concat('main.js'))
      .pipe(uglify()) //Сожмем наш js
      ///.pipe(sourcemaps.write()) //Пропишем карты
      .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
      .pipe(sourcemaps.init()) //То же самое что и с js
      .pipe(sass()) //Скомпилируем
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(cssmin()) //Сожмем
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('vendor:build', function () {
  gulp.src(path.src.vendor)
      .pipe(gulp.dest(path.build.vendor));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'vendor:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.vendor], function (event, cb) {
    gulp.start('vendor:build');
  });
  watch([path.watch.html]).on('change', livereload.changed);
  watch([path.watch.style]).on('change', livereload.changed);
  watch([path.watch.js]).on('change', livereload.changed);
  watch([path.watch.vendor]).on('change', livereload.changed);
  livereload.listen();
});


gulp.task('default', ['build', 'watch']);
