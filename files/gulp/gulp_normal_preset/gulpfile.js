var gulp = require('gulp')
var babel = require('gulp-babel')   // es6 转 es5
var less = require('gulp-less')     // less转css
var rename = require('gulp-rename')  // 重命名文件
var uglify = require('gulp-uglify')  // 压缩js
var cssnano = require('gulp-cssnano')  // 压缩css
var browserSync = require('browser-sync')  // 服务器模式
var reload = browserSync.reload

gulp.task('less', function() {
    return gulp.src('./less/*.less')
            .pipe(less())
            .pipe(cssnano())
            .pipe(gulp.dest('./build/'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('babel', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./build/'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('doing', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        port: 8000
    })
    gulp.watch('./index.html').on('change', reload)
    gulp.watch('./less/*.less', gulp.series('less'), reload)
    gulp.watch('./js/*.js', gulp.series('babel'), reload)
})

gulp.task('default', gulp.series('less', 'babel', 'doing'))