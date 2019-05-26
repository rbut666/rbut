# 修复Ubuntu双系统 安装完之后 出现
``` bash
error:unknown filesystem
grub rescue>
```

## 在已有windows10的情况下 安装Ubuntu 18.04双系统

## 解决方法

``` bash

# 使用 Boot-repair 修复双系统引导，具体步骤如下：

# 1.准备一个Ubuntu U盘启动盘，或者Ubuntu装机CD；

# 2.流程与装系统一样，进入启动盘，但是不要安装Ubuntu，点击try Ubuntu，进入Ubuntu系统；

# 3.ctrl+alt+t打开命令行；

# 4.输入：sudo apt-get update （更新一下）；
sudo apt-get update

# 5.输入：add-apt-repository ppa:yannubuntu/boot-repair && apt-get update
add-apt-repository ppa:yannubuntu/boot-repair && apt-get update

# 6.输入：apt-get install -y boot-repair && boot-repair
apt-get install -y boot-repair && boot-repair

# 出现：一个选择框

# 7：点击第一个选项Recommended repair，根据提示选择相应的文件敲几行命令即可

# 8：接着重启

# 进入到ubuntu的桌面，打开命令行输入：sudo update-grub
sudo update-grub

```