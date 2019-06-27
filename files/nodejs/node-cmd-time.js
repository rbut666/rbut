/// nodejs 执行 命令行命令 
// 参考 https://juejin.im/post/5b07eb1c5188254e28710d80
// https://blog.csdn.net/hao930826/article/details/70049660
var exec = require('child_process').exec
// 执行php 脚本
var cmdStr = "php TimeTask.php"
//  每30s执行一次 更新
setInterval(function(){
    exec(cmdStr, function(err, stdout, srderr) {
        if(err) {
            console.log(srderr)
        }
        console.log(stdout)
    })
}, 30*1000) // 时间设置为每30s一次