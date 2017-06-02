/*
 * 
 * Определяем переменные 
 *
 */

var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    imagemin = require('gulp-imagemin'), // Минификация изображений
    csso = require('gulp-csso'), // Минификация CSS
    less = require('gulp-less'), // Конверстация LESS  в CSS
    path = require('path'),
    gutil = require('gutil'),
    rename = require("gulp-rename");

/*
 * 
 * Создаем задачи (таски) 
 *
 */

// Задача "LESS". Запускается командой "gulp less"

gulp.task('css', function () {
    return gulp.src('source/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('public/css'))
        .on('error', gutil.log);
});


// Задача "js". Запускается командой "gulp js"
gulp.task('js', function () {
    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './source/js/main.js'
    ]) // файлы, которые обрабатываем
        .pipe(concat('min.js')) // склеиваем все JS
        .pipe(uglify()) // получившуюся "портянку" минифицируем 
        .pipe(gulp.dest('./public/js/')) // результат пишем по указанному адресу
});

// Задача "images". Запускается командой "gulp images"
gulp.task('img', function () {
    gulp.src('./source/img/**/*') // берем любые файлы в папке и ее подпапках
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('./public/img/')) // результат пишем по указанному адресу

});

// Задача "watch". Запускается командой "gulp watch"
// Она следит за изменениями файлов и автоматически запускает другие задачи
gulp.task('watch', function () {
    // При изменение файлов *.less в папке "styles" и подпапках запускаем задачу less
    gulp.watch('./source/less/**/*.less', ['css']);
    // При изменение файлов *.js папке "javascripts" и подпапках запускаем задачу js
    gulp.watch('./source/js/**/*.js', ['js']);
    // При изменение любых файлов в папке "images" и подпапках запускаем задачу images
    gulp.watch('./source/img/**/*', ['images']);
});
