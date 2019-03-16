# requireAnimationFrame

## window自带api 了解方式

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
> [zhangxinxu](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
> [microsoft](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/dev-guides/hh920765(v=vs.85))

## 定义不多说 以下记录踩坑

### 需求：利用 requireAnimationFrame 替代 @keyframes 创建滚动列表

> 列表有2个 一个向上 一个向左
> list列表 数据条数 50

#### 向左移动的列表

> 准备
> html

``` html
<div class='wrap'>
    <ul id='ScrollLeft'>
        <li>text1</li>
        <li>text2</li>
        <li>text3</li>
        ... 
        <!-- 余下47条 -->
    </ul>
</div>
```

> less

``` less
.wrap {
    position: relative;
    #SrollLeft {
        position: absolute;
        li {
            float: left;
        }
    }
}
```

> js

``` js
// 兼容性
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            window.oRequestAnimationFrame || 
            window.msRequestAnimationFrame || 
            function(callback,element){
            window.setTimeout(callback, 1000 / 60)
            }
  })()
```

> 此时 数据加载完后  可知 li 浮动后的 ul 长度 （此处暂定为 400px 再更改 less

``` less
.wrap {
    position: relative;
    #SrollLeft {
        position: absolute;
        width: 400px;
        right: -400px;
        li {
            float: left;
        }
    }
}
```

> 接下来 重点
> js

``` js
var scrollLeft = document.getElementById('ScrollLeft')
// 设定 初始值 值随ul 列表长度
var left = -400
function renderLoop() {
    // 此处的 x 为 当列表滚动到消失不见 的 ul 的 right 值 即 显示框的宽度
    if(left === x) {
        // 当列表滚动到看不见 再继续 从最右边 开始滚动 重置 left的值
        left = -400
    }
    // 数字+1 表示每次执行 right的变化量 数值越高 速度越快 至于 += 可以自己换成 -= 去看看效果
    scrollLeft.style.right = ((left += 1) % 400) + 'px'
    window.requestAnimFrame(renderLoop)
}
renderLoop()
```

#### 对于 向上滚动 的列表 与上面的向左的区别 在于 一个是宽度 一个是高度 以及 x 的值（向上 则为显示框的高度