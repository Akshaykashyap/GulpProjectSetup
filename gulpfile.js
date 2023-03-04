const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var uglifycss = require('gulp-uglifycss');
const minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin')
var browserSync = require('browser-sync').create();

// var changed = require('gulp-changed');
// const minifyImg = require('gulp-imagemin');
// var imagemin = require('gulp-imagemin');
// const imagemin =    import ('gulp-imagemin');

/* ES6 Modude we can import package through import keyboard and in the package.json file we should add the  "type": "module", when we use the import keyboard to import package */
//import gulp from 'gulp';
// import uglifycss from 'gulp-uglifycss';
// import minify from 'gulp-minify';
// import uglify from 'gulp-uglify';
// import autoprefix from 'gulp-autoprefixer';
// import minifyCSS from 'gulp-minify-css';
// import concat from 'gulp-concat';
// import minifyImage from 'gulp-imagemin'
// import htmlmin from 'gulp-htmlmin'

/* Require is not defined (If we need to use require keyboard to import package then in the package.json file You should REMOVE the line if you want to use require()  "type": "module", )

/* Way to define tasks */
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('erro', sass.logError))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream())
});


/* css minify */
gulp.task('css', function() {
    gulp.src('./css/*.css')
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dest/css'));
});


/* Image minify */
gulp.task('minifyImg', function() {
    return gulp.src('./images/*')
        .pipe(minifyImage())
        .pipe(gulp.dest('./dest/images'));
});

/*Html minify */
gulp.task('minifyhtml', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dest/html'));
});

/*js minify */
gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('custom.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dest/js'))
        .pipe(browserSync.stream())
});


/* css minify and cancate */
// gulp.task('css', function() {
//     gulp.src('./css/*.css')
//         .pipe(concat('style.css'))
//         .pipe(minify())
//         .pipe(gulp.dest('build/styles/'));
// });

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    });
    gulp.watch('./sass/*.scss', gulp.series('sass'));
    gulp.watch('./js/*.js', gulp.series('js'));
    gulp.watch('./src/*.html', gulp.series('minifyhtml'));
    gulp.watch('./css/*.css', gulp.series('css'));
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('watch', gulp.series('browserSync', 'sass', 'js', 'css', 'minifyhtml', 'minifyImg'));

/* watch task */
// gulp.task('watch', function() {
//     return gulp.watch('./sass/*.scss', (done) => {
//         gulp.series(['sass'])(done)
//     });
// });


/* letest way to define tasks */
// function buildStyles() {
//     return gulp.src('./sass/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// };
// exports.buildStyles = buildStyles;

// gulp.task('js', function() {
//     return gulp.src('./js/*.js')
//         .pipe(minify())
//         .pipe(gulp.dest('./js'))
// })