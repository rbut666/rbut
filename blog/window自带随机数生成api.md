---
title: window中自带的随机数生成器
date: 2020-12-10 11:55:00
tags: window BOM js
---

# title: window中自带的随机数生成器

## 接口 window.crypto.getRandomValues()

## 基本使用

``` js
function random_str(len) {
    const lens = len && len > 0 ? len : 1;
    let random_arr = new Uint32Array(lens);
    window.crypto.getRandomValues(random_arr);
    return random_arr;
}
// 生成一个长度为10的随机数数组
random_str(10) 

```
