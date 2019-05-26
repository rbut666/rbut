---
title: webpack 基本使用
date: 2018-07-07 12:04:53
tags: js javascript webpack
---

# webpack 基本使用 整理常用部分 [来自](https://webpack.docschina.org)

> 2个配置文件  package.json  webpack.config.js

## 配置

### 加载css

``` bash
npm install --save-dev style-loader css-loader
```

> webpack.config.js

``` js
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
```

### 加载图片

``` bash
npm install --save-dev file-loader
```

> webpack.config.js

``` js
const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // img
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}
```

### 加载字体

> webpack.config.js

``` js
const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // img
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // font file
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}
```

### 加载数据  --> 导入CSV TSV XML

``` bash
npm install --save-dev csv-loader xml-loader
```

> webpack.config.js

``` js
const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // img
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // font file
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // add data
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    }
}
```

## 使用

### webpack 输出

> 配置 HtmlWebpackPlugin 插件

``` bash
npm install --save-dev html-webpack-plugin
```

>> webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry: {
        app: './src/index.js',
        print: './src/print/js'
    },
    // 输出
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```

> 清理 /dist 文件夹

``` bash
npm install clean-webpack-plugin --save-dev
```

>> webpack.config.js

``` js
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    // clean
    const CleanWebpackPlugin = require('clean-webpack-plugin')
    module.exports = {
        entry: {
            app: './src/index.js',
            print: './src/print.js'
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Output Management'
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
```

## 令开发变的更智能

> 关于source map [配置及选择](https://webpack.docschina.org/configuration/devtool)

### 自动编译

> webpack's Watch Mode
> webpack-dev-server
> webpack-dev-middleware

#### 使用观察者模式

> package.json

```js
{
    ...
    "scripts": {
        // add
        "watch": "webpack --watch",
    }
}
```

>> 每次改动后 需刷新浏览器 查看效果

#### 添加web服务器 实时加载

``` bash
npm install --save-dev webpack-dev-server
```

> webpack.config.js

```js
    ...
    module.exports = {
        ...
        // add
        devServer: {
            contentBase: './dist'
        },
        ...
    }
```

> package.json

```js
    {
        ...
        "script": {
            // add
            "start": "webpack-dev-server --open",
        }
    }
```

#### 使用 webpack-dev-middleware

>> 配合 express server 打开经webpack处理后的文件

``` bash
npm install --save-dev express webpack-dev-middleware
```

> webpack.config.js

```js
    ...
    module.exports = {
        ...
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            // add
            publicPath: '/'
        }
    }
```

> 在当前目录下 新建 server.js
>> server.js

```js
    const express = require('express')
    const webpack = require('webpack')
    const webpackDevMiddleware = require("webpack-dev-middleware")

    const app = express()
    const config = require('./webpack.config.js')
    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }))

    app.listen(3000, function() {
        console.log('app is running on port 3000 !')
    })
```

> package.json

```js
    {
        ...
        "scripts": {
            ...
            "server": "node server.js"
        }
    }
```