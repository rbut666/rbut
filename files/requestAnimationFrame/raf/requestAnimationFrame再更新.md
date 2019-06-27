---
title: requestAnimationFrame.js 再更新
date: 2019-06-07 12:00:13
tags: requestAnimationFrame raf
---

# requestAnimationFrame.js 再更新
>本博客还有其他 raf的文章

## 修改后的raf.js

> 一个页面可以共存多个 使用raf的滚动 互相之间各不干扰
> 重要说明：滚动元素务必使用 class命名 且唯一

### 使用方式

> 此时 结构为
``` html
<div class="wrap">
    <ul class="box">
        <li> box2 </li>
        ....
        <li> box2 </li>
    </ul>
</div>
```

> 在想要 使用的页面 引用 raf.js后
> 启动 raf 格式 => rafLoop(滚动元素，滚动元素的包裹元素， 方向， （可选值 速率： 默认为 1px）)
``` js
rafLoop(document.getElementsByClassName('box')[0], document.getElementsByClassName('wrap')[0], 'left')
```
> 给raf 加入 事件控制 格式 => go_and_stop(事件控制元素, 已滚动的raf元素, 事件名)
``` js
go_and_stop(document.getElementsByClassName('box')[0], document.getElementsByClassName('box')[0], 'click')
// 亦或
go_and_stop(document.getElementsByClassName('wrap')[0], document.getElementsByClassName('box')[0], 'click')
```

### 内容如下

> raf.js
``` js

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/**
@param {elem} => 需要滚动的元素 element
@param {wrap} => 滚动元素的包裹元素
@param {direction} => 需要滚动的方向 可选值 { 'top' 'left' 'bottom' 'right' }
@param {speed} => 移动距离 参数可选 默认为1
*  */


function rafLoop(elem, wrap, direction, speed) {
    const loopMark = elem.className
    window[loopMark] = {
        arguments: [...arguments],
        rafMark: 0,
        tops: '',
        loop_func: 0
    }
    var speed = ~~speed ? speed : 1;
    let range, elem_length;
    if(direction == 'top' || direction == 'left' || direction == 'bottom' || direction == 'right') {
        let str = direction == 'top' || direction == 'bottom' ? 'clientHeight' : 'clientWidth'
        range = parseFloat(wrap[str])
        elem_length = parseFloat(elem[str])

        window[loopMark].tops = window[loopMark].tops ? window[loopMark].tops : range
        window[loopMark].loop_func = function() {
            if(parseInt(elem.style[direction])< -elem_length) {
                elem.style[direction] = parseInt(range) + 'px'
                window[loopMark].tops = range
            }
            elem.style[direction] = (window[loopMark].tops -= speed) + 'px'
            window[loopMark].rafMark = window.requestAnimationFrame(window[loopMark].loop_func)
        }
        window[loopMark].loop_func()
    }else {
        console.log('direction 设置错误')
        return
    }
}

/**
 * @param {事件对象} target => 任意元素
 * @param {操作对象} element => document.getElementsByClassName('class')
 * @param {事件名} event click mouseover mousemove mouseup ...
 */

function go_and_stop(target ,element = target, event) {
    var loopMark = element.className
    target.addEventListener(event, function() {
        console.log(event)
        if(window[loopMark].rafMark) {
            window.cancelAnimationFrame(window[loopMark].rafMark)
            window[loopMark].rafMark = null
        } else {
            window[loopMark].loop_func(...window[loopMark].arguments)
        }
    })
}
```