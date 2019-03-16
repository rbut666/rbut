# gulp 使用及踩坑

## 概念了解

> [中文官网](https://www.gulpjs.com.cn/)
> 现在有一个名为 test 的目录 目录文件如下

```  bash
/test
/test/js/index.js
```

> 在index.js 文件中 是由es6语法 写的 逻辑 使用babel 来将 es6 转为 es5
> 在test目录下 打开命令行

```bash
# 初始 一路回车 
# 此处有个坑 新建npm中的name 不能为 gulp 假如创建的目录名不是test 而是 gulp 在 npm init 会默认选择你的文件夹名 作为name
npm init
# 安装babel所需插件包
npm i --save-dev gulp
npm i --save-dev gulp-babel
## 此处有坑 等后面完成 gulpfile.js 再来继续
```

> 在test目录下 新建 .babelrc 文件

``` json
{
    "presets": ["@babel/preset-env"]
}
```

>> 注意 此处 在网上的一些博客 的写法 不是这样 而是 主要原因是因为 babel的版本不同 下面的是babel 6.x 上面的是7.x 在 我们npm install 包一般是下的最新版本 从而导致 以下配置无法使用 会产生 下面的那个错误

```json
{
    "presets": ["es2015"]
}
```

> 因版本不同 配置错误 而产生的错误 （复制于 命令行工具 cmder
> 详情请看 github上 babel的 [issure](https://github.com/babel/gulp-babel/issues/165) 的 loganfsmyth 的最后一条回答

``` bash
[11:10:23] 'default' errored after 701 ms
[11:10:23] Error in plugin "gulp-babel"
Message:
    Plugin/Preset files are not allowed to export objects, only functions. In F:\gulp\test\node_modules\babel-preset-es2015\lib\index.js
```

> 在test目录下 新建 gulpfile.js 文件
> gulpfile.js

```js
// 引入需要的插件
var gulp = require('gulp')
var uglify = require('gulp-babel')
var gutil = require('gulp-util')
// 创建gulp 任务

gulp.task('default', function() {
    // 如果想将js目录下 所有的js文件都进行处理 可以 将 gulp.src 处 改为 gulp.src('js/*.js')
    return gulp.src('js/index.js')
        .pipe(babel())
        // on error 检测错误 输出错误详情
        .on('error', function(err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString())
        })
        // gulp自带api 将处理的文件导出到build目录下
        .pipe(gulp.dest('build'))
})
```

> 配置好gulpfile.js .babelrc 后 在命令行 运行 gulp 结束后即可在build目录下看到处理后的文件
> 在gulp 运行后 有时 会报错 缺少 @babel/core 或者 @babel/preset-env 或者 babel-preset-es2015 之类 安装即可
> gulp 扩展 [Gulp安装及使用](https://xiaogliu.github.io/2017/05/10/install-and-use-gulp/)
> [技巧](https://www.gulpjs.com.cn/docs/recipes/)