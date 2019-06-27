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
@elem => 需要滚动的元素
@wrap => 滚动元素的包裹元素
@direction => 需要滚动的方向 可选值 { 'top' 'left' 'bottom' 'right' }
@speed => 移动距离 参数可选 默认为1
*  */ 
function forRaf(elem, wrap, direction, speed) {
    var speed = ~~speed ? speed : 1
    console.log(`speed: ${speed}`)
    switch (direction)
    {
        case 'top':
            let range = parseFloat(wrap.clientHeight)
            let elem_height = parseFloat(elem.clientHeight)
            let tpos = range
            function looptop() {
                if(parseInt(elem.style.top)< -elem_height) {
                    elem.style.top = parseInt(range) + 'px'
                    tpos = range
                }
                elem.style.top = (tpos -= speed) + 'px'
                window.requestAnimationFrame(looptop)
            }
            looptop();
            break;
        case 'left':
            let left_range = parseFloat(wrap.clientWidth)
            let elem_width = parseFloat(elem.clientWidth)
            let left_pos = left_range
            function loopleft() {
                if(parseInt(elem.style.left)< -elem_width) {
                    elem.style.left = parseInt(left_range) + 'px'
                    left_pos = left_range
                }
                elem.style.left = (left_pos -= speed) + 'px'
                window.requestAnimationFrame(loopleft)
            }
            loopleft();
            break;
        case 'bottom':
            let bottom_range = parseFloat(wrap.clientHeight)
            let elem_height_bottom = parseFloat(elem.clientHeight)
            let bottom_pos = bottom_range
            function loopbottom() {
                if(parseInt(elem.style.bottom)< -elem_height_bottom) {
                    elem.style.bottom = parseInt(bottom_range) + 'px'
                    bottom_pos = bottom_range
                }
                elem.style.bottom = (bottom_pos -= speed) + 'px'
                window.requestAnimationFrame(loopbottom)
            }
            loopbottom();
            break;
        case 'right':
            let right_range = parseFloat(wrap.clientWidth)
            let elem_width_right = parseFloat(elem.clientWidth)
            let right_pos = right_range
            function loopright() {
                if(parseInt(elem.style.right)< -elem_width_right) {
                    elem.style.right = parseInt(right_range) + 'px'
                    right_pos = right_range
                }
                elem.style.right = (right_pos -= speed) + 'px'
                window.requestAnimationFrame(loopright)
            }
            loopright();
            break;
    }
}