/*
 * @Author: ntnyq<qq: 1210485244 email: lssham@qq.com>
 * @Date:   2017-10-20
 * @Last Modified by:   M S I
 * @Last Modified time: 2018-1-25
 */

/* Modules import */

// Main tool
var gulp = require('gulp')

// sourceMap
var sourcemaps = require('gulp-sourcemaps')

// Create localhost and hot reload
var browserSync = require('browser-sync').create()

// Rename file, add suffix or prefix
var rename = require('gulp-rename')

// Transpile less => css
var less = require('gulp-less')

// Transpile scss => css
var sass = require('gulp-sass')

// Minify css file
var cleanCss = require('gulp-clean-css')

// Transform small images to base64
var base64 = require('gulp-base64')

// Add CSS rules private prefix
var autoprefixer = require('gulp-autoprefixer')

// Minify css file
var uglify = require('gulp-uglify')

// Transpile ES6 to ES5
var babel = require('gulp-babel')

// Delete files or directory
var clean = require('gulp-clean')

// Run tasks in sequence
var sequence = require('gulp-sequence')


/* Gulp tasks */

// Delete directory
gulp.task('clean', function() {
    gulp.src('dist')
        .pipe(clean())
})

// Transpile less and add prefix
gulp.task('less', function() {

    gulp.src('src/less/*.less')

    .pipe(sourcemaps.init())

    .pipe(less())

    .pipe(sourcemaps.write())

    .pipe(autoprefixer({
        browsers: ['last 5 version', 'Android >= 4.0'],
        cascade: true, // Beatify css rules with prefix, Default value: true
        remove: true // Remove rules not neccessary, Default value: true
    }))

    .pipe(gulp.dest('src/css'))
})

gulp.task('sass', function() {

    gulp.src('./src/sass/*.scss')

    .pipe(sourcemaps.init())
        // 配置sass属性，格式化输出格式
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))

    .pipe(sourcemaps.write())

    .pipe(autoprefixer({
        browsers: ["last 2 version", "> 0.1%", "> 5% in US", "ie 6-8", "Firefox < 20"],
        cascade: true, // Beatify css rules with prefix, Default value: true
        remove: true // Remove rules not neccessary, Default value: true
    }))

    .pipe(gulp.dest('./src/css'));

});

// Minify css file, transform small png to base64, add min suffix
gulp.task('cssmin', function() {

    gulp.src('src/css/*.css')

    .pipe(cleanCss())

    .pipe(base64({
        extensions: ['png'],
        maxImageSize: 8 * 1024, // bytes
    }))

    .pipe(rename({
        suffix: '.min'
    }))

    .pipe(gulp.dest('dist/css'))
})

// Minify js file, transfrom ES6 => ES5, add min suffix
gulp.task('jsmin', function() {

    gulp.src('src/js/*.js')

    .pipe(babel({
        presets: ['env']
    }))

    .pipe(uglify().on('error', function(e) {
        console.log(e)
    }))

    .pipe(rename({
        suffix: '.min'
    }))

    .pipe(gulp.dest('dist/js'))
})

// Watch files in baseDir, and reload browser
gulp.task('server', function() {

    var files = ['**/*.html', 'src/css/*.css', 'src/js/*.js']

    browserSync.init(files, { // Init server
        server: {
            baseDir: './'
        }
    })

    gulp.watch('src/less/*.less', ['less']) // Watch CSS file and run task

    gulp.watch('src/sass/*.scss', ['sass']); //Watch CSS file and run task

    gulp.watch('src/**', function() {
        browserSync.reload()
    })
})

// Build project, run tasts in sequence
gulp.task('build', sequence('clean', 'cssmin', 'jsmin'))

// Default task, create server and watch
gulp.task('default', ['server'])