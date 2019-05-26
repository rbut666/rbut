---
title: hexo搭建博客的几个小问题
date: 2019-05-25 22:04:53
tags: hexo 
---

# 使用hexo 碰到的东西

## 正常操作
``` bash

# npm 安装 hexo
npm install -g hexo-cli

# 创建目录 并安装
hexo init <某文件夹>

cd <某文件夹>

npm install

# 生成静态文件
hexo generate # 或者简写 使用  hexo g

# 部署 
hexo deploy # 简写 hexo d

## 在已配置好的情况下  就只需要 新建文章后 使用

hexo g -d # 即可 生成文件后 直接 部署
```

## 按需 配置  在 _config.yml 文件内

## 安装 主题 

> 找到需要使用的主题后 如 again： git地址为[github](https://github.com/lyyourc/hexo-theme-again.git)

``` bash
# 此命令将again 主题 下载到 themes的again 目录下
git clone https://github.com/DrakeLeung/hexo-theme-again.git themes/again

## 需要安装依赖
npm i -S hexo-renderer-sass hexo-renderer-markdown-it markdown-it-emoji twemoji
```

> 在hexo 的配置文件 _config.yml 中 修改 主题
>> 此处 注意 一个问题是 theme: 和 again直接必须要有空格 [hexo-generate 错误](https://github.com/hexojs/hexo/issues/1192)
``` yml
# config.yml
# theme: landscape
theme: again
```

> 主题中 的配置 可在/themes/again/ 主题目录下的 _config.yml 配置
>> 本站 主题配置
``` yml
# basic
title: rbut的日常
subtitle: 记录点滴
favicon: img/21095342.png

# avatar: images/avatar.png
# banner_small: images/banner-small.png
# banner_large: images/banner-large.png
avatar: img/21095342.png
banner_small: img/9f935318124310abec63d97cd751144e.jpg
banner_large: img/9f935318124310abec63d97cd751144e.jpg

# disqus
# disqus_shortname: drakeleung

# social
social:
  github: https://github.com/rbut666

# nav #
nav:
  home: .
  archive: archives
  # about: about
  # rss: atom.xml

# heox-renderre-sass
node_sass:
  outputStyle: nested
  precision: 5
  sourceComments: false


google_analytics: # Put tracking ID here

```

> 此处注意： 主题中 使用的 图片引用  img 目录放置在  hexo 目录下的 /source/ 即： /source/img/ 主题中使用 只需 /img/somefile 即可
> 配图 当然也可以使用 网络图片


### 文章的格式为md 上传到source的_post目录下 后 生成的文章 可能会出现 文章名为 Untitled

> 解决方法
> 在md文章中 头部 配置
``` md
---
title: 你的文章名
date: 时间 #2016-06-26 22:04:53
tags: 标签
---
```


#### 补充 待续