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
        if(window[loopMark].rafMark) {
            window.cancelAnimationFrame(window[loopMark].rafMark)
            window[loopMark].rafMark = null
        } else {
            window[loopMark].loop_func(...window[loopMark].arguments)
        }
    })
}

export {
    go_and_stop,
    rafLoop
}