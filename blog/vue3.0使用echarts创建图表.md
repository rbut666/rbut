---
title: 使用echarts在vue项目中创建图表
date: 2018-07-09 12:21:53
tags: js javascript echart vue
---

# 使用echarts在vue项目中创建图表

> 安装echarts包

``` bash
npm install echats --save
```

## 使用方式

> 1.在单文件中 (.vue文件） 使用

``` js
import echarts from 'echarts'
```

> 2.将echarts添加到Vue的原型链
> 在main.js文件中 添加如下

``` js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

### 单独使用echart中的某一个或几个图表 可以按需加载

> 在main.js文件中修改如下

``` js
let echarts = require('echarts/lib/echarts') // 引用基本库
require('echarts/lib/chart/pie') // 引用饼图
require('echarts/lib/chart/line') // 引用折线图
require('echarts/lib/component/tooltip') // 引用提示框
require('echarts/lib/component/legend') //引用图例组件
```

## 创建图表

> 在html中

```html
<div class="charts">
  <div id="chart" :style="{width:'400px', height: '400px'}"></div>
</div>
```

> 在js

```js
export default {
  data(){
    return {
      option : {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20],
                radius:['40%', '60%']
            }]
        }
    }
  },
  mounted(){
    let chart = this.$echarts.init(document.getElementById('chart'))
    chart.setOption(this.option)
  }
}
```

### 详细图表配置见[echats官方文档](http://www.echartsjs.com/option.html#title)