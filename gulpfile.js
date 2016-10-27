/* File: gulpfile.js */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    css: './public/stylesheets'
  },
  src: { //Пути откуда брать исходники
    style: './public/stylesheets/style.scss'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    style: './public/stylesheets/style.scss'
  }
};

gulp.task('style:build', function () {
    gulp.src(path.src.style)
      .pipe(sass()) //Скомпилируем
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('build', [
  'style:build'
]);

gulp.task('watch', function(){
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
});

gulp.task('default', ['build', 'watch']);
