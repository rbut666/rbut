# Vue 3.0 在移动端应用中使用 rem 布局的注意点

> 想多了解postcss的话点击[这里](https://github.com/whidy/postcss-study)

## 使用postcss px2rem插件将代码中px自动转为rem

## 安装步骤

> 在项目目录下

``` bash
npm install postcss-px2rem
```

>> 此命令将会在项目配置文件package.json中的dependencies 添加

``` js
    "postcss-px2rem": "^0.3.0"
```

> 项目目录下新增.postcssrc.js文件

```js
module.exports = {
  "plugins": {
    "autoprefixer": {},
    "postcss-px2rem": {
      remUnit: 50   // 此处设置为 1rem = 50px  （根据设计稿尺寸改变
    }
  }
}
```

### 技巧之一

> 如果有不想转换的地方 后面添加 /* no */
>
> > 例如

``` css
  border: 1px solid #ddd; /* no */
```

### 遇到的坑点之一

> 遇到错误安装 或 其他误操作 在package.json中生成如下代码 则自动转换失效

``` json
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  }
```