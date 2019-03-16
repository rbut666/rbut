var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var less = require('gulp-less')
var babel = require('gulp-babel')
// var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

gulp.task('less', function() {
    return gulp.src('./app/styles/*.less')
            .pipe(less())
            .pipe(gulp.dest('./app/dist/css'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('sjs', function() {
    return gulp.src('./app/scripts/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./app/dist/js'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
    gulp.watch('./app/*.html', gulp.series('serve'), reload)
    gulp.watch('./app/scripts/*.js', gulp.series('sjs'), reload)
    gulp.watch('./app/styles/*.less', gulp.series('less'), reload)
})

gulp.task('default', gulp.series('less', 'sjs', 'serve'))