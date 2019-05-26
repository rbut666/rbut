---
title: gulp的版本问题
date: 2018-06-29 12:04:53
tags: gulp
---


# gulp的版本问题

## gulp -v 查看gulp版本

> gulp 版本

``` bash
CLI version 2.0.1
Local version 4.0.1
```

### 当前版本为4.0.1 属于 gulp4

> gulp 版本

``` bash
CLI version 2.0.1
Local version 3.9.1
```

### 当前版本为3.9.1 属于 gulp3

## gulp3 和 gulp4 的区别

> 更改了 依赖任务 的方式
> [详情](https://www.jianshu.com/p/40b99bed3127)

### 在版本属于 gulp3的情况下

> gulp 多任务写法
> gulpfile.js

``` js
var gulp = require('gulp')

gulp.task('one', function() {
    console.log('task one is working')
    return
})

gulp.task('two', function() {
    console.log('task two is working')
    return
})

gulp.task('default', ['one', 'two'])
```

### 在版本属于 gulp4的情况下

> gulp 多任务写法
> gulpfile.js

``` js
var gulp = require('gulp')
gulp.task('one', function(done) {
    console.log('task one is working')
    done()
})

gulp.task('two', function(done){
    console.log('task two is working')
    done()
})
// gulp.series 顺序执行
// gulp.paralle 并行

// gulp.task('default', gulp.series('one', 'two'))
gulp.task('default', gulp.paralle('one', 'two') )
```