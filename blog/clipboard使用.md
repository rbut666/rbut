# clipboard.js 剪切板插件的使用

[clipboard.js](https://clipboardjs.com/)

## 在独立html页面使用

``` html
<script src='./dist/clipboard.min.js'></script>
···
<input type='text' id='inp'>
<button class='btn' data-clipboard-target='#inp'> copy <button>
...
<script>
    var clipboard = new ClipboardJS('.btn')
    clipboard.on('success', function(e) {
            console.info('Action: ', e.action)
            console.info('Text: ', e.text)
            console.info('Trigger: ', e.trigger)
            e.clearSelection()
        })
        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
</script>
```

## 在vue-cli中使用

> 安装clipboard

``` bash
npm install clipboard --save
```

> 在需要使用clipboard的组件中引用 (test.vue)

``` js
import Clipboard from 'clipboard'
```

> test.vue
``` html
<input type='text' id='inp'>
<button @click='copy' class='btn' data-clipboard-action='copy' data-clipboard-target='#inp'></button>
<div> {{ msg }} </div>
···
<script>
    import Clipboard from 'clipboard'
    ···
    export default {
        data() {
            return {
                msg: 'hello'
            }
        },
        methods: {
            copy() {
                var clipboard = new Clipboard('.btn')
                var that = this
                clipboard.on('success', function(e) {
                    // do something
                    // that.msg = e.text
                })
            }
        }
    }
</script>
```

### 部分 data-clipboard 说明

> data-clipboard-action : 表示 行为 ； 默认为copy ==> 复制  可设置为 cut ==> 剪切 (data-clipboard-action='cut')
> data-clipboard-target : 表示 被复制目标
> data-clipboard-text: 复制 当前选择器的文本
>> eg:
    ``` html
    <button class='btn' data-clipboard-text='click this button copy this text'> copy </button>
    <script>
        var clipboard = new ClipboardJS('.btn')
        clipboard.on('success', function(e) {
            // do something
        })
    </script>
    <!-- vue 同理 -->
    ```