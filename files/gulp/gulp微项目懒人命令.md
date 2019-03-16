# 一条命令创建一个简单的gulp 文件部署

## less
``` bash
# 创建必须的文件和目录
touch gulpfile.js && touch index.html && mkdir less && mkdir js && cd less && touch index.less && cd ../js && touch index.js && cd ../ && npm init
# 安装基础包
npm i -D gulp gulp-babel @babel/core @babel/preset-env gulp-less gulp-rename gulp-uglify gulp-clean browser-sync 

# 启动
gulp
```

#### gulpfile.js 配置

``` js
var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var less = require('gulp-less')
var babel = require('gulp-babel')
// var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

gulp.task('less', function() {
    return gulp.src('./less/*.less')
            .pipe(less())
            .pipe(gulp.dest('./dist/css'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('sjs', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./*.html', gulp.series('serve'), reload)
    gulp.watch('./js/*.js', gulp.series('sjs'), reload)
    gulp.watch('./less/*.less', gulp.series('less'), reload)
})

gulp.task('default', gulp.series('less', 'sjs', 'serve'))
```

## sass

``` bash
# 创建文件
touch gulpfile.js && touch index.html && mkdir sass && mkdir js && cd sass && touch index.scss && cd ../js && touch index.js && cd ../ && npm init

# 安装 包
npm i -D gulp gulp-babel @babel/core @babel/preset-env gulp-rename gulp-uglify gulp-clean browser-sync gulp-ruby-sass

# 启动
gulp
```

#### 目录及gulpfile.js文件配置

``` md
./
│  index.html
│  
├─dist
│  ├─css
│  │      index.css
│  │      
│  └─js
│          index.js
│          
├─js
│      index.js
│      
└─sass
        index.scss

```

``` js
var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var sass = require('gulp-ruby-sass')
var babel = require('gulp-babel')
// var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

gulp.task("sass", function(){
    return sass('./sass/*.scss')
    .on('error', function(err) {
        console.error("Error!", err.message)
    })
    .pipe(gulp.dest("./dist/css"))
    .pipe(reload({
        stream: true
    }))
})

gulp.task('sjs', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
            .pipe(reload({
                stream: true
            }))
})

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./*.html', gulp.series('serve'), reload)
    gulp.watch('./js/*.js', gulp.series('sjs'), reload)
    gulp.watch('./sass/*.scss', gulp.series('sass'), reload)
})

gulp.task('default', gulp.series('sass', 'sjs', 'serve'))
```

### 附加 => 给gulp任务 添加图片处理

#### 对应的 创建文件命令也跟着变化

``` bash
# 创建文件及目录 ---基于 sass
touch gulpfile.js && touch index.html && mkdir sass && mkdir js && mkdir img && cd sass && touch index.scss && cd ../js && touch index.js && cd ../ && npm init

## 安装必须包
npm i -D gulp gulp-babel @babel/core @babel/preset-env gulp-rename gulp-uglify gulp-clean browser-sync gulp-ruby-sass gulp-imagemin
```

``` js
var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var sass = require('gulp-ruby-sass')
var babel = require('gulp-babel')
// var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

/// 添加图片压缩 插件
var imagemin = require("gulp-imagemin") // https://github.com/sindresorhus/gulp-imagemin

gulp.task("sass", function(){
    return sass('./sass/*.scss')
    .on('error', function(err) {
        console.error("Error!", err.message)
    })
    .pipe(gulp.dest("./dist/css"))
    .pipe(reload({
        stream: true
    }))
})

gulp.task('sjs', function() {
    return gulp.src('./js/*.js')
            .pipe(babel({
                presets: ["@babel/preset-env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
            .pipe(reload({
                stream: true
            }))
})

// 建立 图片压缩任务
gulp.task('img', function() {
    return gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({
            stream: true
        }))
})


gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./*.html', gulp.series('serve'), reload)
    gulp.watch('./js/*.js', gulp.series('sjs'), reload)
    gulp.watch('./img/*', gulp.series('img'), reload)
    gulp.watch('./sass/*.scss', gulp.series('sass'), reload)
})

gulp.task('default', gulp.series('sass', 'sjs', 'img', 'serve'))
```