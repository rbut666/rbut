---
title: css grid
date: 2019-05-30 12:04:53
tags: css 布局 grid
---

# css grid 

## [基础-MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
## [张鑫旭的grid教程](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/#grid-auto-columns-rows)
## [图解CSS Grid](https://www.html.cn/archives/8510)

## 踩坑之一
> 使用 less 时 给 grid items 设置 grid-column: 1/4; 无效  控制台查看  Invalid property value
> 原因：
> less 在转换为css的时候  会将 1/4 的值计算出来 则： 1/4 => ~"1/4"
> 解决方法
> index.less
``` less

.box { // grid Container
    max-width: 940px;
    margin: 0 auto;
    display: grid;
    list-style: none;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    grid-auto-rows: minmax(100px, auto);
    li { // grid items
        border: 2px solid rgb(233,171,88);
        border-radius: 5px;
        background-color: rgba(233,171,88,.5);
        color: #d9480f;
        &.one {
            grid-column: 1 ;
            grid-row: 1 ;
            font-size: 22px;
        }
        &.two { // 只需 将 2/4 改写为 ~"2/4" 即可
            grid-column: ~"2 / 4";
            grid-row: ~"1 / 3";
            color: #0f9;
        }
        &.three {
            grid-column: 1;
            grid-row: ~"2 / 5";
        }
        &.four {
            grid-column: 3;
            grid-row: 3;
        }
        &.five {
            grid-column: 2;
            grid-row: 4;
        }
        &.six {
            grid-column: 3;
            grid-row: 4;
        }
        &.seven {
            grid-column: 2;
            grid-row: 3;
        }
    }
}

```

> index.html
``` html

<ul class="box">
    <li class="one"> one </li>
    <li class="two"> two </li>
    <li class="three"> three </li>
    <li class="four"> four </li>
    <li class="five"> five </li>
    <li class="six"> six </li>
    <li class="seven"> seven </li>
</ul>

```