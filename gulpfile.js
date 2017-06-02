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
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    rename = require("gulp-rename");

/*
 * 
 * Создаем задачи (таски) 
 *
 */


gulp.task('html', function(){
    return gulp.src('source/pages/**/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(reload({stream:true}));
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./public"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

// Задача "LESS". Запускается командой "gulp less"

gulp.task('css', function () {
    return gulp.src('source/less/style.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'))
        .on('error', gutil.log)
        .pipe(reload({stream:true}));

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
    gulp.watch('./source/pages/**/*.html', ['html']);
    // При изменение файлов *.less в папке "styles" и подпапках запускаем задачу less
    gulp.watch('./source/less/**/*.less', ['css']);
    // При изменение файлов *.js папке "javascripts" и подпапках запускаем задачу js
    gulp.watch('./source/js/**/*.js', ['js']);
    // При изменение любых файлов в папке "images" и подпапках запускаем задачу images
    gulp.watch('./source/img/**/*', ['images']);
});

gulp.task('start', ['watch', 'browserSync']);
