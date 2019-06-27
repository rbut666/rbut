---
title: 初试 telegram 的机器人
date: 2019-06-4 12:04:00
tags: telegram 机器人 robot 短网址
---


# 使用 telegram 的机器人做一个短网址生成
> 常用api 以及 返回信息


## 获取机器人信息
> token: 881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV
> 这个token 当然是被我修改过了 请替换成自己申请的
>> https://api.telegram.org/bot<token>/getme
> https://api.telegram.org/bot881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV/getme

> 返回信息
``` json
{
    "ok": true,
    "result": {
        "id": 881076986,
        "is_bot": true,
        "first_name": "一个短网址生成工具",
        "username": "this_is_a_link_creater_bot"
    }
}
```

## 获取 机器人 的消息 2种方式  webhook getUpdates
> webhook: telegram 主动将用户的消息转发给 webhook 设置的地址
> getUpdates: 自己的机器人服务器主动通过getUpdates查询是否有消息更新

## 设置 webhook
> https://api.telegram.org/bot<token>)/setWebhook?url=<hook site> // 必须为  https
> https://api.telegram.org/bot881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV/setWebhook?url=https://rbut.cc/tg_robet.php

> 返回成功信息
``` json
{
"ok": true,
"result": true,
"description": "Webhook was set"
}

```

## 获取 webhook 信息
> https://api.telegram.org/bot<token>/getWebhookInfo
> https://api.telegram.org/bot881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV/getWebhookInfo

> 返回成功信息
``` json
{
"ok": true,
"result": {
"url": "https://rbut.cc/tg_robet.php",
"has_custom_certificate": false,
"pending_update_count": 0,
"max_connections": 40
}
}
```

## 设置 getUpdates
> https://api.telegram.org/bot881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV/getUpdates

> 返回的消息
```json

```

## 给某用户发送消息
> https://api.telegram.org/bot<token>/sendMessage?chat_id=< chat的id>&text=<发送的内容>
> https://api.telegram.org/bot881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV/sendMessage?chat_id=540076629&text=sendContent

> 返回的消息
``` json
{
    "ok": true,
    "result": {
        "message_id": 4,
        "from": {
            "id": 881076986,
            "is_bot": true,
            "first_name": "一个短网址生成工具",
            "username": "this_is_a_link_creater_bot"
        },
        "chat": {
            "id": 540076629,
            "first_name": "xxxxxxxxxxxxx",
            "username": "xxxxxxxxxxxxxx",
            "type": "private"
        },
        "date": 1556981990,
        "text": "sendContent"
    }
}
```



### Test [https://jeffhughlee.blogspot.com/2017/02/php-webhooktelegram-bot.html](https://jeffhughlee.blogspot.com/2017/02/php-webhooktelegram-bot.html)
```php
<?php
$token = "881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV";
define('BOT_TOKEN', $token);
define('API_URL', 'https://api.telegram.org/bot'.BOT_TOKEN.'/');
 
// read incoming info and grab the chatID
$content = file_get_contents("php://input");
$update = json_decode($content, true);
$chatID = $update["message"]["chat"]["id"];
$got_message = $update["message"]["text"];

// compose reply
$reply =  $got_message;

// send reply
$sendto =API_URL."sendmessage?chat_id=".$chatID."&text=".$reply;
file_get_contents($sendto);
```

### 以下是我设置的一个短网址机器人

> tg_robet.php
``` php

header('Access-Control-Allow-Origin:*'); // 允许所有域名访问

$token = "881076986:AAG6pF4FhcakZBCMIWjt0i9Si5iPgGAkVGV";
define('BOT_TOKEN', $token);
define('API_URL', 'https://api.telegram.org/bot'.BOT_TOKEN.'/');

// read incoming info and grab the chatID
$content = file_get_contents("php://input");
$update = json_decode($content, true);
$chatID = $update["message"]["chat"]["id"];
$got_message = $update["message"]["text"];

// compose reply
// 消息内容
$regex = '@(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))@';

if(!preg_match($regex, $got_message)) {
    send_msg($chatID, "地址错误哦！");
}else {
    $shortUrl = send("https://rbut.cc/api_plus.php", array("url"=> $got_message));
    $code = $shortUrl['code'];
    send_msg($chatID, 'https://rbut.cc/'.$code);
    // if($result['result']) {
    //     $shortCode = $result['code'];
    //     send_msg($chatID, $shortCode);
    // }else {
    //     send_msg($chatID, $result['result']);
    // }
    // send_msg($chatID, "https://rbut.cc/".$shortCode);
}

function send_msg($id, $reply) {
    send(API_URL."sendmessage?chat_id=".$id."&text=".$reply);
}

function send($url, array $data = null)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url );
    if(!empty($data)) {
        curl_setopt($ch, CURLOPT_POST, 1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    }
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        print curl_error($ch);
    }
    curl_close($ch);
    return json_decode($result, true);
}
```