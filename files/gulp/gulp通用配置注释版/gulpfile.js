// 引入 gulp
var gulp = require('gulp')
// 引入 browser-sync 来实时重载 文件 进行页面更新
var browserSync = require('browser-sync')
var reload = browserSync.reload
// 引入 gulp-less 处理less转css
var less = require('gulp-less')
// 引入 gulp-babel es6转es5 插件
var babel = require('gulp-babel')
// 引入 gulp-rename 修改输出文件名
var rename = require('gulp-rename')
// 引入 gulp-uglify 压缩输出文件
var uglify = require('gulp-uglify')
// 引入 gulp-clean 清空文件
var clean = require('gulp-clean')

// 创建任务 处理 less 任务名 自定义
gulp.task('less', function() {
    // ./app/styles/*.less 表示 在app/styles目录下 所有less文件 进行转换
    return gulp.src('./app/styles/*.less')
            // 执行转换
            .pipe(less())
            // 转换完成后 输出 路径 若文件夹不存在 则新建 默认输出的文件名为转换之前的文件名
            .pipe(gulp.dest('./app/dist/css'))
            // 输出结束后  重载浏览器
            .pipe(reload({
                stream: true
            }))
})

// 创建任务 处理js
gulp.task('sjs', function() {
    return gulp.src('./app/scripts/*.js')
            // 执行babel转换 presets: ["@babel/preset-env"] 表示 处理规则 与babel版本有关 当前版本 8.0 
            // 需同时 安装 gulp-babel  @babel/core   @babel/preset-env
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            // 将转换完成的文件 压缩
            .pipe(uglify())
            // 转换完成后 输出到 ./app/dist/js 目录下
            // 此处可 添加 或 不添加 重命名 输出文件名  重命名方式有2种
            // .pipe(rename({extname: 'min.js'}))   // 输出结果为 原文件名.min.js
            .pipe(rename('bundle.js'))   // 输出结果为 bundle.js
            // 重命名完成后 输出
            .pipe(gulp.dest('./app/dist/js'))
            // 输出完成  重载浏览器
            .pipe(reload({
                stream: true
            }))
})

// 创建任务 启动服务 [browserSync详情-中文](http://www.browsersync.cn)
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
        // 默认端口3000
    })
    // gulp.series 是 gulp的版本到达4.0后 创建任务流的 方法 意为 顺序执行  另外一个代表并行的方法是 gulp.parallel()
    // ./app/*.html  监听 app目录下的html 文件变化 触发 serve 任务后 重载浏览器
    gulp.watch('./app/*.html', gulp.series('serve'), reload)
    // 监听 app/script目录下的所有js文件 的文件内容变化 触发 sjs 任务 再重载浏览器
    gulp.watch('./app/scripts/*.js', gulp.series('sjs'), reload)
    // 监听 app/styles目录下的 所有.less文件 内容变化 触发 less 任务  重载浏览器
    gulp.watch('./app/styles/*.less', gulp.series('less'), reload)
})

// 创建一个清除文件的任务 命令行单独使用 只需执行 gulp clean 即可 删除dist目录及内容
gulp.task('clean', function() {
    return gulp.src('./app/dist/', {read: false})
                .pipe(clean())
})

gulp.task('default', gulp.series('less', 'sjs', 'serve'))