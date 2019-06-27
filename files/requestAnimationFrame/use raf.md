# 使用方式

``` js
// 可以是id 或 class 只要确实的取得元素
// 需要滚动的元素 elem
var elem = document.getElementById("list")
// 该滚动元素的包裹盒子 box
var box = document.getElementsByClassName('box')[0] 
// direction  方向 { 'top' 'left' 'bottom' 'right' }

// 使用示例
forRaf(elem, box, 'top')
```

## 使用之前的CSS设置 (less)

> 宽度 高度 自定义
> elem的初始位置 为 滚动方向的设置 为 0 即可 (例：向右滚动 elem的 right:0

``` less
.box {
    position: relative;
    .list {
        position: absolute;
        right: 0;
    }
}

```