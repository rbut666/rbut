---
title: Vue组件 传值易错的细节
date: 2018-07-6 12:04:53
tags: js javascript vue
---

# Vue组件 传值易错的细节

## 使用vue组件的2类

> 在单独的html 引入vue.js后 在页面内 插入组件 render方式

> 在使用vue-cli构建的app里面 使用.vue 的组件

----------

## 1. 在独立页面 使用render插入 组件 值传递

> 在html中

``` html
<div id='app'>
<item-list :items='items'></item-list>
</div>
```

> js

```js
Vue.component("item-list", {
 props: ["items"],
  render: function(createElement) {
    if(this.items.length){
        return createElement("ul", this.items.map((a)=> {
           return createElement("li", a)
               }))
     } else {
          return createElement('p', "items is null or undefined")
     }
 }
})

var vm = new Vue({
 el: "#app",
  data(){
    return {
      items: ['this', 'is', 'a ', 'array']
    }
 }
})
```

>> 如上 如果想传递的子组件的是个固定字符串 则可以在 item-list 标签里面修改
> 修改前

``` html
<item-list :items= 'items'></item-list>
```

> 修改后

``` html
 <item-list items= 'items'></item-list>
```

> 如此 则插入的子组件获取到的是 items 字符串

### 添加几种 render 方式的写法

>> 写法1

``` javascript
Vue.component("item-list", {
     render: function(createElement) {
        var elef = function(){
                return {
                    template: `
                      <div> hello render 1 </div>
                    `
                   }
          }
           return createElement(elef())
    }
    })
```

>> 写法2

```js
    Vue.component("item-list", {
        render: function(createElement){
            return createElement({
               template: ` <div> hello render 2 </div> `
                })
            }
    })
```

>> 写法3

``` js
  Vue.component("item-list", {
    render: function(createElement) {
    var self = this
    return createElement('div', {
      class: {
        foo: true,
        bar: false
      },
    style: {
      color: "red",
      fontSize: "14px"
    },
    attrs: {
      id: "boo"
    },
    domProps: {
      innerHTML:"Hello render 3"
      }
    })
    }
  })
```

>> 写法4

``` js
    Vue.component("item-list", {
        render: function(createElement){
        return createElement(
            'div',
            {
                class: {
                    title: true
                },
                style: {
                    border: "1px solid #ddd",
                    padding: "10px"
                }
            },
            [
                createElement("h1", "Hello render4")
                createElement("p", "p part")
            ]
        )
    }
    })
```

>>> ### 注明： render 后面必须要有

``` js
    let app = new Vue({
        el: "#app"
    })
```

## 2. 在vue-cli构建的app

### 父传值给子组件

> 在某父组件里面

``` html
<template>
    <Child :data = 'txt'></Child>
</template>
<script>
    import Child from './child'
    export default{
        components: {
            Child
        },
        data(){
            return {
                txt: "father's data"
            }
        }
    }
</script>
```

> 子组件 child.vue

``` html
<template>
    <div class='child'>
        {{ data }}
    </div>
</template>
<script>
    export default {
        props: ['data']
        }
</script>
```

### 子组件传值给父组件

> 在 child.vue 中

``` html
<template>
    <div class='child'>
        {{ data }}
    <div class='btn' v-on:click='sendMsg'> return msg to parent </div>
    </div>
</template
<script>
    methods: {
        sendMsg(){
        this.$emit('parentListen', "this msg will be send to parent")
    }
    }
</script>
```

> 在 父组件 里面

``` html
<template>
<div class='parent'>
    <Child :data='txt' v-on:parentListen = 'showMsgfromChild'></Child>
</div>
</template>
<script>
    import Child from './Child'
    export default {
        components: {
            Child
        },
        data(){
            return {
                txt: " content from parent"
            }
        },
        methods: {
            showMsgfromChild(msg){
                console.log(msg)    
            }
        }
    }
</script>
```

## 坑点之一

> 在父组件中 监听子组件通过 this.$emit 触发的 parentListen 事件 此时的事件写法必须是

```html
    v-on:parentListen = 'doSomethinginParent'
```

> 若写成如下 则无效

``` html
    :parentListen = 'doSomethinginParent'
```

### 对于 有很多数据 在不同的组件下使用的情况 vuex 是最好的选择