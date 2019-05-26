---
title: 监控 文件变化 令hexo 自动部署
date: 2019-05-26 23:04:53
tags: hexo nodejs
---

# 监控 文件变化 令hexo 自动部署
> 使用nodejs

> task.js
``` js
// 此文件放置在 source 文件夹中

var chokidar = require('chokidar');
// path 设置 为 目录下的 _posts 匹配所有 .md 后缀的文件
var watcher = chokidar.watch('./_posts/*.md', {
 ignored: /[\/\\]\./, persistent: true 
}); 

var exec = require('child_process').exec
var cmdStr = "hexo d -g"


var log = console.log.bind(console); 
watcher.on('add', function(path) {
        log('File', path, 'has been added');
    }).on('addDir', function(path) {
        log('Directory', path, 'has been added'); 
    }) .on('change', function(path) {
        log('File', path, 'has been changed');
    }) .on('unlink', function(path) {
        log('File', path, 'has been removed');
    }) .on('unlinkDir', function(path) {
        log('Directory', path, 'has been removed'); 
    }) .on('error', function(error) {
        log('Error happened', error); 
    }).on('ready', function() {
        log('Initial scan complete. Ready for changes.'); 
    }).on('raw', function(event, path, details) {
        log('Raw event info:',event, path, details); 
        // 监听 文件变动 执行 cmdstr
        exec(cmdStr, function(err, stdout, srderr) {
            if(err) {
                console.log(srderr)
            }
            console.log(stdout)
        })
    })

```

## 之后 因为是在服务器上 需要 后台运行  本站使用的是 pm2
> pm2 的常用命令 本站有相关 文章

``` bash
# 使用ssh登录后 cd到 task.js所在的目录 
pm2 start task.js
```