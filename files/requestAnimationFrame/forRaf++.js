(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
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

var rafMark = 0;
var raf_arguments = [];
var tops;

function rafLoop(elem, wrap, direction, speed) {
    raf_arguments = [...arguments]
    var speed = ~~speed ? speed : 1;
    let range, elem_length;
    if(direction == 'top' || direction == 'left' || direction == 'bottom' || direction == 'right') {
        let str = direction == 'top' || direction == 'bottom' ? 'clientHeight' : 'clientWidth'
        range = parseFloat(wrap[str])
        elem_length = parseFloat(elem[str])
        tops = tops ? tops : range
        function looptop() {
            if(parseInt(elem.style[direction])< -elem_length) {
                elem.style[direction] = parseInt(range) + 'px'
                tops = range
            }
            elem.style[direction] = (tops -= speed) + 'px'
            rafMark = window.requestAnimationFrame(looptop)
        }
        looptop()
    }else {
        console.log('direction 设置错误')
        return
    }
}

/**
 * 
 * @param {操作对象} element => document.getElementById('id') document.getElementsByClassName('class')
 * @param {事件名} event click mouseover mousemove mouseup ...
 */

function go_and_stop(element, event) {
    element.addEventListener(event, function() {
        console.log(event)
        if(rafMark) {
            window.cancelAnimationFrame(rafMark)
            rafMark = null
        } else {
            rafLoop(...raf_arguments)
        }
    })
}

// go_and_stop(document.getElementById('id'), 'click')