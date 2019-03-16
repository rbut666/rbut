# VUE 3.0 配置文件 vue.config.js

## 改变默认配置 在项目根目录下新建 vue.config.js 自定义vue配置

> vue.config.js 常用配置项说明

### [官网详细文档说明](https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config)

``` js

module.exports = {
    // 基本路径
    baseUrl: '/',
    // build 输出文件目录
    outputDir: 'dist',
    // webapck 配置
    // https://github.com/vuejs/vue-cli/blob/dev/docs/zh/guide/webpack.md
    chainWebpack: ()=> {},
    configureWebpack: ()=> {},

    // css 相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {},
        // 启用CSS modules for all css / pre-processor files..
        modules: false
    },

    // PWA插件相关配置
    // https://github.com/vuejs/vue-cli/tree/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 代理设置
        before: app => {}
    },

    // 是否关闭 source map 默认true 开启
    ///// 将编译后的代码映射回原始源代码
    productionSourceMap: false //  关闭 [官网参考](https://cli.vuejs.org/zh/config/#productionsourcemap)

    // 第三方插件配置
    pluginOptions: {
        //
    }

}
```

> 在某项目使用的如下配置

``` js
// 判断当前环境 是否是生产环境
const production = process.env.NODE_ENV === 'production'

let options = {}

// 设置代理
options['devServer'] = {
    proxy: 'http://your-proxy-site.com'
}

// 根据环境 设置 build 文件输出目录

if(production) {
    // 将要导出到的目录 ../
    options['outputDir'] = '../'
    // 在 ../ 目录下 的 assets/m 保存 css js 的包文件
    options['assetsDir'] = 'assets/m'
    //在 ../ 目录下的 app文件夹内保存 入口index.html 文件
    options['indexPath'] = 'app/index.html'
    // 关闭 source map
    options['productionSourceMap'] = false
}

module.exports = options
```