---
title: ubuntu 双系统踩坑 之四
date: 2019-05-30 11:00:02
tags: ubuntu 安装 php mysql
---

# ubuntu 一些应用配置

> [参考](https://segmentfault.com/a/1190000010258086)
> [apache](https://www.howtoing.com/how-to-install-the-apache-web-server-on-ubuntu-18-04/)
> [phpmyadmin](https://www.howtoing.com/install-lamp-with-phpmyadmin-in-ubuntu-18-04)
> [apache2](https://www.linuxidc.com/Linux/2018-11/155507.htm)


## 安装 mysql
``` bash
sudo apt-get install mysql-server
```

## 安装 php
``` bash
sudo apt-get install php
```

## 按照 apache
``` bash
sudo apt-get install apache2
```

## 安装 php 与 apache 的 连接插件
``` bash
sudo apt-get install libapache2-mod-php
```

## 安装 phpmyadmin
``` bash
sudo apt-get install phpmyadmin

```
> username: phpmyadmin
> password: root


## 安装 mysql-client
``` bash
sudo apt-get install mysql-client
```

## 安装 redis 
> [参考](https://wangxin1248.github.io/linux/2018/07/ubuntu18.04-install-redis.html)
``` bash
sudo apt install redis-server

# 配置 redis 远程连接
sudo vi /etc/redis/redis.conf
## bind 127.0.0.1 ::1 => bind 0.0.0.0

# 设置密码
sudo vi /etc/redis/redis.conf
## #requirepass footbared => requirepass password 
```



## 常用操作命令

``` bash
# 重启 apache2
sudo systemctl restart apache2

# 启动 redis 服务
sudo service redis start
# 关闭 redis 
sudo service redis stop
# 重启 redis 服务
sudo service redis restart

# 查看 mysql 状态
service mysql status
```


## ubuntu npm 的权限问题

> 问题描述： 在使用 npm install 安装包的时候 有的会出现 Error: EACCES: permission denied, mkdir <some file>
> 本人遇见的是 使用 npm install --save-dev gulp-image 和 gulp-imagemin 都碰到了
> [参考](https://github.com/Microsoft/WSL/issues/14)
> 解决方法
``` bash
# 必要的时候 使用 sudo
npm config set unsafe-perm=true
```

