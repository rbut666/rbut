# nodejs post 请求 接收 与 发送

## 参考地址
> [关于axios在node中post的使用](https://cnodejs.org/topic/57e17beac4ae8ff239776de5)
> [request-promise](https://github.com/request/request-promise)
> [superagent](http://visionmedia.github.io/superagent/)
> [express接收post请求参数-jianshu](https://www.jianshu.com/p/34ca30e71494)

### php 发送 post 请求
> [使用 file_get_contents](https://stackoverflow.com/questions/2445276/how-to-post-data-in-php-using-file-get-contents)
> [用PHP发送HTTP请求（POST请求、GET请求）](https://www.cnblogs.com/52php/p/5657927.html)

### webhook
> [使用webhook 自动部署 nodejs项目](https://segmentfault.com/a/1190000005644039)
> [WebHooks PHP 代码自动化部署](https://www.yexueduxing.com/posts/1)
> [使用 GitHub / GitLab 的 Webhooks 进行网站自动化部署](https://www.lovelucy.info/auto-deploy-website-by-webhooks-of-github-and-gitlab.html)
> [使用 Node.js 实现简单的 Webhook](https://blog.coding.net/blog/nodejs-webhook)
> [Webhook 实践 —— 自动部署](https://jerryzou.com/posts/webhook-practice/)

### hawk  hapijs
> [hapi js](https://hapijs.com/tutorials/auth?lang=zh_CN)

``` js
var key = '4NLyP1QPhS'
var express = require("express")
// body-parser 处理 post 参数
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
var url = require('url')
var querystring = require('querystring')

var http = require('http')
var request = require('request')
var rp = require('request-promise')


app.get('/', function(req, res){
    res.sendFile(__dirname+ '/public/hello.html')
})


// 接收post请求
app.post('/hawk', function(req, res){
    // res.send(JSON.stringify(req.body))
    // console.log(req.body.name)
    // console.log(req.body.password)
    // res.end()
    var post_data = {
        "name": req.body.name,
        "password": req.body.password,
        "app_key": key
    }
    // sent_post(post_data)
    // res.send(sent_post(post_data))
    var post_data = querystring.stringify(post_data)
    var options = {
        method: "POST",
        uri: 'http://cp.com/hawk',
        form: post_data,
        headers: {
            // 自动填充
        }
    }
    rp(options)
        .then((body)=> {
            console.log(body)
            res.send(body)
        })
        .catch((err)=> {
            console.log(err)
            res.send(err)
        })
})

function sent_post(post_data) {
    // 发送post 请求
    var post_data = querystring.stringify(post_data)
    var options = {
        method: "POST",
        uri: 'http://cp.com/hawk',
        form: post_data,
        headers: {
            // 自动填充
        }
    }
    rp(options)
        .then((body)=> {
            console.log(body)
        })
        .catch((err)=> {
            console.log(err)
        })
}


app.listen(3000, function(){
    console.log('post is work on 3000!')
})

```

