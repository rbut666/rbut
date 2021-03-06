---
title: Vue-cli 3.0 + Socket.io 配置记录
date: 2018-07-14 12:21:53
tags: js javascript vue socket
---

# Vue-cli 3.0 + Socket.io 配置记录

## 创建

创建项目使用如下命令

```bash
vue create project-name
```

手动安装了下列依赖：

- Babel
- Router
- Vuex
- CSS Pre-processors

开发环境

```bash
npm run serve --open
```

添加 `--open` 意思是直接打开浏览器

构建模式

```bash
npm run build
```

后面可以指定跟上 `--dest` 指定输出目录 (默认值：`dist`)

## axios

同样的先另外下载 `axios`

```bash
npm install --save-dev axios
```

接着在 `main.js` 中配置，引入 `axios` 并添加到 `Vue` 的原型上

```js
import axios from 'axios'

Object.assign(Vue.prototype, {
  axios
})
```

然后就可以用这样的形式来请求数据

```js
this.axios.get('/user/list/?r=1').then()
```

### 跨域问题

> 通过设置开发环境代理来解决
> 修改 vue-cli 根目录下的 vue.config.js（没有这个文件就新建一个），写入以下内容

```js
module.exports = {
  devServer: {
    proxy: 'http://www.xxx.com'
  }
}
```

`proxy` 里面的内容改成自己后端运行环境的地址

## Router

> PC端页面为了开发方便，并未使用路由功能。

1. 因为页面首次渲染需要由PHP获取路由当中的房间号 `/?r=xxx` 信息，从而判断房间号是否真实有效
2. 使用了路由功能导致地址栏变为 `/#/?r=xxx` 会使得PHP无法获取该参数。

> 登录、注册等页面均是以组件模式嵌入主页模板中，因此不用路由并无影响。
> 移动端若是不方便改为这种形式，那么可以在加载完成之后，手动向服务端发送房间号，根据返回结果决定是否继续显示后续逻辑。

## Vuex

> Vuex是本项目的核心功能。
> 配置方式基本没有变化，不需要写入 `Vue` 的原型中，就可以直接在项目中使用 `this.$store` 来访问
> 为了直观清晰，最好是分成若干小模块来写这部分内容。例如

```js
const user = {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {
    // ...
  }
}

const login = {
  namespaced: true,
  state: {
    show: false
  },
  mutations: {
    // ...
  },
  actions: {
    // ...
  }
}

const store = new Vuex.Store({
  modules: {
    user,
    login
  }
})

export default store
```

上文添加了 `namespaced` 属性来方便地引用各个模块的内容。

为了方便跟踪 `socket.io` 事件，需要将通讯相关功能写在状态管理当中，下文详细说明。

## Socket.io

> 首先安装依赖

```bash
npm install --save-dev socket.io-client
```

在状态管理的配置文件 `src/store.js` 中引入

```js
import io from 'socket.io-client'
```

Socket.io 与 Vuex 该如何联动，如何在各个模块外部也能读取/调用模块内的内容，下面是一个例子：

```js
// 定义一个 socks 模块
const socks = {
  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    sayHello(context) {
      console.log('hello world')
    }
  }
}

// 实例化
const store = new Vuex.Store({
  modules: {
    user,
    login,
    socks
  }
})

// 通过 store 来访问模块内的内容
store.dispatch('socks/sayHello')

export default store
```

查看控制台，看到显示了 `hello world`

既然可以在外部调用，那么就可以放在 socket.io 的各个事件中执行了，例如

```js
const socket = io('your-server-site')

socket.on('connect', () => {
  store.dispatch('socks/sayHello')
})
```

## 公共函数

在 `src/assets/js` 目录下建立个 `utils.js`（或其他命名） 写入以下内容

```js
const charCode = (str) => {
  return str.charCodeAt() % 10
}
const nameFix = (name) => {
  if (!name || name === '') {
    return 'Hi'
  } else {
    let [n] = [...name]
      return n.toUpperCase()
  }
}

export {
  charCode,
  nameFix
}
```

> 在需要使用的地方引入，例如

```js
import {nameFix} from '@/assets/js/utils'

```

表示只引入 `nameFix` 函数，多个函数则以逗号 `,` 分隔

若是作为 `filters` 使用

```js
import {nameFix} from '@/assets/js/utils'
export default {
 // ...
  filters: {
   nameFix
  },
  // ...
}
```

> 然后就可以在 `HTML` 片段中以过滤器的方式使用

```html
{{ user.username | nameFix }}
```

> 其他公共函数的使用方式以此类推。