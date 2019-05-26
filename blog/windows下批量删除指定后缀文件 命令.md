---
title: windows mac下批量删除指定后缀文件 命令
date: 2019-05-27 17:00:13
tags: windows mac
---

# windows 下批量删除指定后缀文件 命令

> cmd 进入文件夹

```bash
del /a /f /s /q "*.xxx" # 示例 del /a /f /s /q "*.txt"  => 删除目录下 所有txt后缀文件
```

> MAC 下批量删除指定后缀文件 命令
> cd 到目录下

```bash
find . -name ".xxx" -print -exec rm -rf {} \ # 示例 find . -name ".txt" -print -exec rm -rf {} \ 删除目录下 所有txt后缀文件
```
