# vue 结合 animate.css --备忘

> animate.css [官网](https://daneden.github.io/animate.css/)

## 根据单独页面 和 项目 分为2种 方式使用

### 在独立页面使用

> 引用方式 可以是

``` html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
```

> 也可以是 将下载好的animate.css 放入本地文件

### 在vue-cli生成的项目中使用 (本例cli 版本是 3.0 )

> 安装

``` bath
npm install animate.css --save

```

> 添加到全局
>> 在 main.js 中

``` js
import '../node_modules/animate.css'
```

>　接着在 .vue 组件中

``` html
    <div :style="{width:'100px',height:'100px',background:'red'}" class="animated ounceInLeft"></div>
```