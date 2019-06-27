---
title: 更新 gulp 配置
date: 2019-06-1 10:04:00
tags: gulp 配置  图片压缩
---

# 更新 gulp 配置
> 微项目的常规配置 包含 js less html image
> 项目基于 less (使用 sass的 可以参考 本博客 其他的文章

## 一条命令生成项目
> 首先创建一个空文件夹

``` bash
# 创建目录及文件
touch index.html && touch gulpfile.js  && mkdir less && cd less && touch index.less && cd ../ && mkdir images && mkdir js && cd js && touch index.js && cd ../ && npm init -y

# 安装必要的gulp 包
npm i -D gulp gulp-babel @babel/core @babel/preset-env gulp-less gulp-rename gulp-uglify gulp-clean browser-sync

```

## 写在前面 在ubuntu上 使用 gulp 的 图片处理 遇到的坑
``` bash
# 安装 gulp-image 或者 gulp-imagemin  都出现了 权限错误 => spawn /home/<file path> ENOENT
## 在安装的过程中也会提示  EACCESS 的错误

# 解决方法：
# [参考](https://github.com/Microsoft/WSL/issues/14)
sudo npm config set unsafe-perm=true

## 有时候 使用了上述方法后 任然出现错误  可能只需要 卸载 再重新安装 即可
sudo npm uninstall gulp-imagemin && sudo npm i -S -D gulp-imagemin
```

> gulpfile.js
``` javascript


var gulp = require('gulp')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var babel = require('gulp-babel')
var less = require('gulp-less')
var uglify = require('gulp-uglify')

gulp.task('less', function(){
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
})
// 图片处理 使用 gulp-imagemin
var imgmin = require('gulp-imagemin')
var pngquant =  require('imagemin-pngquant')

// 图片处理的几种写法
// 1. 普通的压缩图片 每次改动某一张图片压缩所有图片
gulp.task('image', function() {
    return gulp.src('./images/*')
        .pipe(imgmin())
        .pipe(gulp.dest('./dist/img'))
})
// 2.配置参数
gulp.task('image', function() {
    return gulp.src('./images/*')
        .pipe(imgmin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./dist/img'))
})
// 3.深度压缩
gulp.task('image', function() {
    return gulp.src('./images/*')
        .pipe(imgmin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./dist/img'))
})

// 4.只压缩修改的图片
var cache = require('gulp-cache')
gulp.task('image', function() {
    return gulp.src('./images/*')
        .pipe(cache(imgmin({
            progressive:true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    })
    gulp.watch("./less/*.less", gulp.series('less')).on('change', reload)
    gulp.watch('./*.html').on("change", reload)
    gulp.watch('./js/*.js', gulp.series('js')).on('change', reload)
})

gulp.task('default', gulp.series('serve', 'js', 'less'));

```

## 一个安装在全局的 命令行压缩图片的工具

> imagemin-cli [npm 地址](https://www.npmjs.com/package/imagemin-cli)
``` bash
# 安装
sudo npm install -g imagemin-cli --unsafe-perm=true --allow-root

# 使用
## 命令说明：将当前目录下的 image文件夹的 所有图片文件 压缩 到 当前目录下的 build 文件夹中
## * 匹配所有  也可指定后缀 *.png
imagemin ./image/* --out-dir=build

## 命令说明： 对单个图片处理 并重命名 原图片不变
## 也可压缩到指定文件夹 imagemin a.png > ../build/a.deal.png
imagemin a.png > a.deal.png

## 命令说明： 使用插件 如上 pngquant
imagemin --plugin=pngquant a.png > a.deal.png
```

### 用到的参考
> [cnblog](https://www.cnblogs.com/HendSame-JMZ/articles/6183050.html)



### 附：在某项 使用的命令及配置

> 创建目录后：
``` bash
# 创建项目和文件
touch index.html && touch gulpfile.js  && mkdir less && cd less && touch index.less && cd ../ && mkdir images && mkdir js && cd js && touch index.js && cd ../ && npm init -y

# 安装 包
npm i -S -D gulp gulp-babel @babel/core @babel/preset-env gulp-less gulp-rename gulp-uglify gulp-clean browser-sync gulp-imagemin gulp-cache imagemin-pngquant
```

> gulpfile.js
``` js
var gulp = require('gulp')
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var babel = require('gulp-babel')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var minimg = require('gulp-imagemin')
var cache = require('gulp-cache')
var pngquant = require('imagemin-pngquant')

gulp.task('less', function(){
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
})

gulp.task('image', function() {
    return gulp.src('./img/*')
        .pipe(cache(minimg({
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    })
    gulp.watch("./less/*.less", gulp.series('less')).on('change', reload)
    gulp.watch('./*.html').on("change", reload)
    gulp.watch('./js/*.js', gulp.series('js')).on('change', reload)
    gulp.watch('./img/*', gulp.series('image')).on('change', reload)
})


gulp.task('default', gulp.series('serve', 'js', 'less', 'image'));

```