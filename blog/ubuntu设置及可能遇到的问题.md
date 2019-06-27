---
title: ubuntu 双系统踩坑 之一
date: 2019-05-29 13:00:23
tags: ubuntu 
---

# ubuntu 常用 ， 设置 及 可能遇到的问题

## 安装ubuntu后 启动出现 grub错误 如下
``` bash
error:unknown filesystem
grub rescue>
```
>解决方法：
> 使用启动盘进入试用 Ubuntu 系统
> 打开命令行--> sudo apt-get update --> add-apt-repository ppa:yannubuntu/boot-repair && apt-get update  --> apt-get install -y boot-repair && boot-repair
> 按顺序执行完以上命令后 会出现一个框 选中第一行的Recommended repair 确定(根据提示执行)
> 结束之后 重启 在进入到Ubuntu 后 执行 sudo update-grub 
> over

##[Ubuntu Apache2 配置文件理解](https://www.jianshu.com/p/a25f68da9c0a)
> 重启 apache2命令
``` bash
sudo /etc/init.d/apache2 restart
```

## [phpmyadmin](localhost/phpmyadmin)
> mysql name: root
> password: root


## Ubuntu 下 启动Apache对 .htaccess 文件对支持
``` bash
sudo a2enmod
# 输入
rewrite
```
> 接着修改 /etc/apache2/sites-enabled/000-default文件
> 在需要修改对站点目录下 的 AllowOverride 属性值 改为 All 
> 重启 apache

> 在ubuntu 18.04下 只需 修改 apache2.conf 文件里 对应站点下的 AllowOverride 属性值 改为 All 
> 详细说明
``` md
a2xx系列的命令共有a2dismod、a2enmod、a2dissite、a2ensite，作用分别是禁用模块、启用模块、停用站点、启用站点，这些命令简单得连--help选项都没有，只能运行看提示。其作用也很简单，就是在/etc/apache2/mods-enabled和/etc/apache2/sites-enabled里面建立或删除相对应的x-available目录里面的模块的链接。
```

## 解决 ubuntu chrome无法打开外部链接 只显示空白页
> 找到 .local/share/applications目录下的 google-chrome.desktop 文件 
> 编辑器打开  找到 Exec=/opt/google/chrome/chrome 在这行 末尾添加 %U
> 即
```
Exec=/opt/google/chrome/chrome %U
```
>> 可能碰到的问题 => 拖到编辑器 无法打开
>> 解决方法： 右键-> 属性 -> 权限 -> 执行 选中即可


## ubuntu 安装软件  使用 .deb包 dpkg命令 dpkg命令常用格式：
> sudo dpkg -I iptux.deb#查看iptux.deb软件包的详细信息，包括软件名称、版本以及大小等（其中-I等价于--info）
> sudo dpkg -c iptux.deb#查看iptux.deb软件包中包含的文件结构（其中-c等价于--contents）
> sudo dpkg -i iptux.deb#安装iptux.deb软件包（其中-i等价于--install）
> sudo dpkg -l iptux#查看iptux软件包的信息（软件名称可通过dpkg -I命令查看，其中-l等价于--list）
> sudo dpkg -L iptux#查看iptux软件包安装的所有文件（软件名称可通过dpkg -I命令查看，其中-L等价于--listfiles）
> sudo dpkg -s iptux#查看iptux软件包的详细信息（软件名称可通过dpkg -I命令查看，其中-s等价于--status）
> sudo dpkg -r iptux#卸载iptux软件包（软件名称可通过dpkg -I命令查看，其中-r等价于--remove


## 查看系统版本
``` bash
cat /etc/issue
# 或者
sudo lsb_release -a
```

## 查看内核版本
``` bash
uname -a
```

## 安装QQ
> [2019](https://www.lulinux.com/archives/1319)

## 更新ubuntu 到最新发行版 [参考](https://www.bingyublog.com/2018/04/27/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E4%BB%8EUbuntu16-04LTS%E5%8D%87%E7%BA%A7%E5%88%B018-04/)

``` bash

sudo apt-get update

sudo apt-get upgrade --yes

sudo apt-get dist-upgrade --yes

sudo do-release-upgrade

# 中途需要手动确认部分 设置

```