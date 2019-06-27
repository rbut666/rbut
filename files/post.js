// 使用nodejs 接收POST 和 发送 POST 请求 
var key = '4NLyP1QPhS'
var express = require("express")
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
