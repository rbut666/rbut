function initliaze() {
    let header = document.getElementsByClassName('header')[0]
    header.innerHTML = 'this is header from js'
    let banner = document.getElementsByClassName('banner')[0]
    banner.innerHTML = 'this is banner from js'
}
let a = 'string'
const b = 1243

function add(x, y) {
    console.log(x+y)
}
initliaze()
add(a, b)