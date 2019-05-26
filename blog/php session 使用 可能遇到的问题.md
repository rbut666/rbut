---
title: php session 使用 以及 可能遇到的问题
date: 2019-05-27 21:00:13
tags: php session
---

# php session 使用 以及 可能遇到的问题
> 参考链接 [codeigniter.org.cn](http://codeigniter.org.cn/userguide2/libraries/sessions.html)

## 直接使用php自带 session

``` php
// 启动session
session_start();  // 在ci中使用 此段放在controller
// 设置 session
$_SESSION['name'] = 'ahui';

// 使用 $_SESSION 即可获得设定的值
echo $_SESSION['name']; // ahui
```

## 在ci中使用  使用ci封装的session Library

``` php
// 控制器 构造函数内
public function __construct()
{
    parent::__construct();
    // 启动 session
    $this->load->library('session');
}
public function index()
{
    // 设置session
    $array = ['name'=> 'ahui', 'age'=> 18];
    $this->session->set_userdata($array);

    $this->load->view('main');
}

// 视图内 
echo $this->session->userdata('name'); // ahui
echo '<br/>';
echo $this->session->userdata('age'); // 18
echo '<br/>';
// 获取所有 设置 的数据
$arr = $this->session->all_userdata(); // 返回一个数组
echo json_encode($this->session->userdata()); // {"__ci_last_regenerate":1554706967,"name":"ahui","age":17}

// 删除session中某个属性
$this->session->unset_userdata('name');
echo json_encode($this->session->userdata()); // {"__ci_last_regenerate":1554716132,"age":17}
```

### 可能出现的报错

> 错误信息： codeigniter Message: mkdir(): Invalid path  Filename: drivers/Session_files_driver.php

> 解决方法
``` php
// 修改 application/config/config.php
//原设置 
$config['sess_save_path'] = NULL;

// 修改后  修改方法 一：
$config['sess_save_path'] = FCPATH.'public/sess_save_path';
// 接着在跟目录下创建 public/sess_save_path 目录；需要写文件权限


// 修改方法 二： 不需要额外创建目录
$config['sess_save_path'] = sys_get_temp_dir();
```

> 自动加载session 报错

> 解决方法
``` php
$this->load->library('encryption');

$key = bin2hex($this->encryption->create_key(16));

echo $key; // 生成key,$config['encryption_key'] = 'aab3162f9de3bdd00f7dd52662fed21d';

```

#### 附 windows下批量删除指定后缀文件 命令

> cmd 进入文件夹
``` bash
del /a /f /s /q "*.xxx" # 示例 del /a /f /s /q "*.txt"  => 删除目录下 所有txt后缀文件
```

> MAC 下批量删除指定后缀文件 命令
> cd到目录下
``` bash
find . -name ".xxx" -print -exec rm -rf {} \ # 示例 find . -name ".txt" -print -exec rm -rf {} \ 删除目录下 所有txt后缀文件
```