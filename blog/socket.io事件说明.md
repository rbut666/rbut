---
title: socket.io 事件说明
date: 2018-07-07 12:01:53
tags: js javascript socket
---

# socket.io 事件说明

包括原生事件与自定义事件

## 自定义事件

### initialize

- 说明： 在客户端与服务端连接成功之后，服务端会发送该事件给客户端。
- 内容： 与服务端连接的客户端列表。
- 响应方式： on

```js
socket.on('initialize', data => {
  console.log(data)
})
```

### notice

- 说明： 通知
- 内容： 通知内容
- 响应方式： on

```js
socket.on('notice', msg => {
     // ...
})
```

`msg` 对象字段不定，但会有个基础字段 `type` 用于判断通知类型，可能的值为：

- user/connect
- user/login
- user/disconnect

### chat

- 说明： 聊天收/发
- 内容： 消息体
- 响应方式： on / emit

```js
// 发送消息
socket.emit('chat', msg, (status, res) => {
    /* 发送消息到服务端
    三个参数分别为类型、消息体、服务端回应
    服务端回应当中， status 表示发送状态，0：发送中， 1：发送成功， 2：发送失败
    可以参考我写过的代码 */
})

// 接收消息
socket.on('chat', msg => {
    // 显示消息到消息窗口中
})
```

## 原生事件

> 如果没有特殊说明，下列原生事件都是只能用 `on` 被动响应。

### connect

- 说明： 客户端与服务端连接成功。
- 使用

```js
socket.on('connect', () => {
  // 可以做一些初始化的事情
})
```