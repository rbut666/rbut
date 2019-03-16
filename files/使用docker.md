# docker 使用

## 安装

###[Docker — 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/)

### 安装过程中的问题

#### 错误a
> 安装完成后 无法使用 提示 docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
> 解决 [stackoverflow](https://stackoverflow.com/questions/44678725/cannot-connect-to-the-docker-daemon-at-unix-var-run-docker-sock-is-the-docker)
>> 命令行输入 systemctl start docker 或者 如果有没有sudo你不能做的命令 ：gpasswd -a $USER docker

#### 错误b
> 使用docker安装新镜像 (docker pull nginx) 提示：Error response from daemon: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io: no such host

> 解决 [sf-mac](https://github.com/docker/for-mac/issues/1317)
>>　修改 /etc/resolv.conf 文件 添加 nameserver 8.8.8.8
``` bash
vi /etc/resolv.conf
```

### 安装容器镜像以及使用(以安装一个ubuntu为例)

> docker pull ubuntu:18.04
> 使用docker image ls 可以查看已安装镜像列表
> 运行以下命令 即可进入ubuntu 的 bash
``` bash
docker run -it --rm \
ubuntu:18.04 \
bash
```

### 查看当前运行中的镜像
``` bash
docker ps -aq
```

### 停止镜像 [link](https://colobu.com/2018/05/15/Stop-and-remove-all-docker-containers-and-images/)
``` bash
docker stop $(docker ps -aq)
```

### 删除镜像 命令格式为 docker image rm <镜像名或ID> <例 ubuntu18.04 当前image id 47b开头 47b19964fb50>
```bash
docker image rm 47b
```

### 外网访问  --- 创建一个简单的nginx 服务器 并开放端口到外网 [link](https://segmentfault.com/a/1190000015758373)

> 步骤
``` bash
# 拉取最新nginx 镜像
docker pull nginx

# 将web服务部署在 /srv/web 目录
cd /srv && mkdir web && cd web

# 创建容器
docker run -d --name nginx nginx
## 获取容器ID 
docker container ls # 记住此ID

# 当前目录下创建目录 /conf
mkdir conf

# 将容器内的nginx 配置文件复制到conf  当前容器ID 为 a89b2c5f3dd1
# 命令格式 docker cp <id>:/etc/nginx/nginx.conf $PWD/conf
docker cp a89b2c5f3dd1:/etc/nginx/nginx.conf $PWD/conf

## 停止容器 docker container stop <容器ID>
docker container stop a89b2c5f3dd1

## 删除容器 docker container rm <容器ID>
docker container rm a89b2c5f3dd1

# 正式部署
docker run -d -p 8081:80 --name nginx-web-6666 -v $PWD/html:/usr/share/nginx/html -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf -v $PWD/logs:/var/log/nginx nginx

## 此时可以在localhost:8081访问 nginx

# web服务器文件 目录 /srv/web/html 进入目录 创建index.html 并 编辑
cd /srv/web/html && vi index.html
```

### 在ubuntu18.04中安装 python3 [csdn](https://blog.csdn.net/weixin_42056625/article/details/82970358)
``` bash
# 下载python .tgz文件
wget <python3的安装>

# 解压 
tar -xzvf python-3.7.0.tgz

# 进入到解压目录 运行 configure 文件
cd Python-3.7.0 && ./configure
### 此处 若报错 则为 c编译器错误 解决=> 安装gcc
apt-get update && apt-get install gcc

#开始编译
./configure && make && make install
```

### 安装vsftp 并设置
``` bash
yum -y install vsftpd
# 添加ftp用户
useradd ftpuser
# 添加密码
passwd ftpuser (当前密码 ahui1234R)

# 修改selinux
getsebool -a | grep ftp
## 若 返回 getsebool: SELinux is disabled 则表示 selinux 关闭
## 打开selinux 
vi /etc/selinux/config # 修改SELINUX=1
```