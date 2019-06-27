/// node js 事件处理

// var events = require('events')
// var util = require('util')
// class Person {
//     constructor(name) {
//         this.name = name
//     }
// }
// util.inherits(Person, events.EventEmitter)

// var xiaoming = new Person('xiaoming')
// var lili = new Person('lili')
// var lucy = new Person('lucy')

// var person = [xiaoming, lili, lucy]

// person.forEach(function(person) {
//     // on 监听事件 事件名 ’speak' "dosomething"
//     person.on('speak', (msg)=> {
//         console.log(person.name + "said: "+ msg)
//     })
//     person.on('dosomething', (msg)=> {
//         console.log(person.name + ' is '+ msg)
//     })
// })

// // 提交事件 执行
// xiaoming.emit('speak', "hello")
// lucy.emit('speak', "I want coffee")
// lili.emit('dosomething', 'working')

// nodejs 文件处理

var fs = require('fs')
// 读文件
// var readfile = fs.readFileSync("read.txt", 'utf8')
// // console.log(readfile)
// // 写文件 将上面读取到内容写入新txt文件
// fs.writeFileSync("writefile.txt", readfile)

// var newfile = fs.readFileSync('writefile.txt', 'utf8')
// if(newfile) {
//     console.log(newfile)
// }
// console.log(fs.createReadStream('read.txt')) // 读取文件

var arr = []
// https://github.com/nickewing/line-reader
var lineReader = require('./line_reader')

lineReader.eachLine('read.txt', function(line, last) {
    // console.log(line)
    arr.push(line)
    if(last) {
        console.log(arr)
    }
})



