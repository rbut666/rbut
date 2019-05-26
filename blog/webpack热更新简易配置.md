---
title: 本地配置 webpack 热更新的 简易配置
date: 2018-07-08 12:04:53
tags: js javascript webpack
---

# 本地配置 webpack 热更新的 简易配置

## 某项目的目录结构 [参考](https://github.com/kingvid-chan/webpack2-lessons/tree/master/lesson2)

> items --- ./src
> --------------- ./css
> --------------- ./css/index.css
> --------------- ./images
> --------------- ./js
> --------------- ./js/index.js
> --------- webpack.config.js
> --------- webpack.entry.js

### webpack.config.js

```js
var path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
webpack = require('webpack'); //这里引入webpack是为了使用webpack的热更新功能以及其他自带插件，见 module.exports.plugins
module.exports = {
  entry: [
    // 给webpack-dev-server启动一个本地服务，并连接到8080端口
    'webpack-dev-server/client?http://localhost:8080',

    // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
    'webpack/hot/only-dev-server',

    // webpack的入口文件，注意这个声明必须写在上面两个后面，webpack-dev-server才有效
    './webpack.entry.js'
  ],
  output: {
    filename: 'webpack.bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: ''
  },
  context: __dirname,
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader?sourceMap']
    },
    {
      test: /\.(jpg|png)$/,
      use: ['url-loader?limit=10000&name=img/[name].[ext]']
    },
    {
      test: /\.html$/,
      use: ['html-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    // 开启webpack全局热更新
    new webpack.HotModuleReplacementPlugin(),

    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new webpack.NamedModulesPlugin()
  ],
  
  // 定义webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
    hot: true,
    // 模块热更新。依赖于HotModuleReplacementPlugin
    noInfo: false,
    // 在命令行窗口显示打包信息
  }
};
```

### webpack.entry.js

``` js
require('./src/css/index.css')
require('./src/js/index.js')
require('./src/index.html')
```

### package.json

``` json
{
  "name": "item",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node_modules/.bin/webpack-dev-server",
    "build": "node_modules/.bin/webpack"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^0.27.3",
    "extract-text-webpack-plugin": "^2.1.0",
    "file-loader": "^0.10.1",
    "html-loader": "^0.4.5",
    "html-webpack-plugin": "^2.28.0",
    "style-loader": "^0.14.0",
    "url-loader": "^0.5.8",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.4.2"
  }
}

```

#### 接着 npm start 即可