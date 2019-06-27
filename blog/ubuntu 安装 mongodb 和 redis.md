---
title: ubuntu 双系统踩坑 之二
date: 2019-05-29 16:10:23
tags: ubuntu 数据库 mongodb redis mysql phpmyadmin
---

# ubuntu 数据库 mongodb redis mysql
## mongodb

``` bash
# 卸载已有
sudo apt-get purge mongodb-org*

# 安装
sudo apt-get install mongodb

# 更新
sudo apt-get update

# 检测安装 
mongo --version

```

### 有时候 出现依赖关系的报错信息 可能是内核版本过多

``` bash
# 查看当前 已安装的 内核版本

dpkg --get-selections |grep linux-image

## linux-image-4.4.0-148-generic			install  我的内核版本

# 查看正在使用 的 内核版本

uname -a

# 卸载不需要的内核版本

## sudo dpkg -P 内核名
sudo dpkg -P linux-image-4.4.0-71-generic linux-image-extra-4.4.0-71-generic  linux-image-4.4.0-72-generic linux-image-extra-4.4.0-72-generic

## sudo apt-get autoremove 内核名
sudo apt-get autoremove linux-image-4.4.0-31-generic linux-image-4.4.0-34-generic 

```
## 安装redis

> [rdm 客户端](https://redisdesktop.com/)
> [配置使用](http://rubyer.me/blog/638/)
``` bash
# 安装
sudo apt-get install redis-server

# 设置开机自起
sudo update-rc.d redis-server defaults
# 启动
sudo /etc/init.d/redis-server start

```

## 安装 mysql [参考(https://www.howtoing.com/how-to-install-mysql-on-ubuntu-18-04/)

``` bash
sudo apt update
sudo apt install mysql-server

sudo mysql_secure_installation
## name: root pw: ahui1234


# 启动mysql
sudo systemctl start mysql
# 查看状态
ststemctl status mysql.service
```


## 安装 phpmyadmin [参考](https://www.howtoing.com/install-lamp-with-phpmyadmin-in-ubuntu-18-04)

``` bash
# 安装之前 需安装完成 mysql
sudo apt update
sudo apt install phpmyadmin

# 出现安装报错  选择 abort
# 接着执行
sudo cp /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf 
sudo a2enconf phpmyadmin
sudo systemctl restart apache2

# 打开 127.0.0.1/phpmyadmin
## name: root
## pw: ahui1234
```