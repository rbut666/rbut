---
title: ubuntu 双系统踩坑 之三
date: 2019-05-29 20:10:23
tags: ubuntu 下载 uGet axel
---

# ubuntu 下载设置

## 安装 uGet
``` bash

sudo add-apt-repository ppa:plushuang-tw/uget-stable
sudo add-apt-repository ppa:t-tujikawa/ppa
# 这里是uGet的客户端
sudo apt-get install uget 
# 这里是待会要用的下载方式
sudo apt-get install aria2

```

## 安装chrome 插件

``` bash
# 安装谷歌浏览器默认[下载插件](https://chrome.google.com/webstore/detail/uget-integration/efjgjleilhflffpbnkaofpmdnajdpepi?hl=zh-CN )

sudo add-apt-repository ppa:slgobinath/uget-chrome-wrapper
sudo apt update
sudo apt install uget-chrome-wrapper

```

## 安装 axel 

``` bash
sudo apt-get install axel
# 使用
# axel url
# 限速 axel url -s 10240  # 每秒下载 字节数 10240 => 10kb
# 限制链接数 axel -n 5 # 5个进程同时下载
```


## 下载 [Transmission](https://transmissionbt.com/)

> 获取到磁力后
``` bash
# 打开终端
xdg-open magnet:?xt=urn:btih:<hash码>
# 自动 调用 transmission 点击确认即可下载
```

## wget

``` bash
# wget url
```