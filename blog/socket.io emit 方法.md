---
title: socket io
date: 2018-07-07 12:01:53
tags: js javascript socket
---

# socket io 方法

``` js
    const app = require('express')()
    const http = require('http').Server(app)
    const io = require('socket.io')(http)

    ...
    io.on('connect', function(socket){
        // 给除了本次连接者之外的所有房间的人发消息
        socket.broadcast.emit('broadcast', 'hello')

        // 给本次连接的客户端发消息
        socket.emit('hello', 'can you hear me ?')

        // 给除了本次连接者之外的所有房间发消息msg
        socket.to('room').emit('nice game', 'msg')

        // 给除了本次连接者之外的 所有 room1  room2 发消息
        socket.to('room1').to('room2').emit('nice game', 'all room are received msg now !')

        // 给所有room中的人发消息
        io.in('room').emit('deine event', 'all people must be know')

        // 给命名空间namespace中的所有人发消息
        io.of('namespace').emit('new event', 'the msg to all of namespace')

        // 给特定的socketid 发消息(私信)
        socket.to(<socketid+'>').emit('hey', 'I just met you')

        // 发送需要回执的消息
        socket.emit('question', 'msg', function(answer){ 
            // detail  answer
         })

        // 发送无需压缩的消息
        socket.compress(false).emit('uncompressed', 'some msg')

        // 如果客户端 尚未准备好接收消息  则发送可能被丢弃的消息
        socket.volatile.emit('maybe', 'do you really need it ?')

        // 发送给所有链接的客户端
        io.emit('an event sent to all connected clients')
    })
```