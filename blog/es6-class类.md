---
title: 记录es6 class类方法
date: 2018-06-27 12:04:53
tags: javascript es6
---

# 记录es6 class类方法

> class常用关键字 ：constructor get set static super

## class 一般写法

``` js
    class rectangle {
        // constructor => 一个class类里只能存在一个的方法
        constructor(height, width) {
            this.height = height
            this.width = width
        }
        // set get 关键字 描述 被定义的函数的行为
        // 同名函数 可以被分别使用 set 和 get 描述
        // set 存值函数 (setter)
        // get 取值函数 (getter)
        set setValue(a) {
            return a + 'from set'
        }
        get area() {
            return this.calcArea()
        }
        calcArea() {
            return this.height * this.width
        }
    }
    let p = new rectangle(22, 11)
    console.log(p.area) // 242
    console.log(p.setValue='set some value')
```

## static 在class里面设置静态类

> 被static描述的 函数 不会被继承  除非使用 extends 关键字 让子类继承父类

``` js
    class Point {
        constructor (x, y) {
            this.x = x
            this.y = y
        }
        static distance(a, b) {
            const dx = a.x - b.x
            const dy = a.y -b.y
            // Math.hypot 求平方根
            return Math.hypot(dx, dy)
        }
    }

    const p1 = new Point(5, 5)
    const p2 = new Point(10, 10)

    console.log(Point.distance(p1, p2))
```

## extends 使用extends关键字 创建子类

```js
    // 父类
    class Animal {
        constructor (name) {
            this.name = name
        }
        speak() {
            console.log(this.name + ' makes a noise.')
        }
    }

    // 子类
    class Dog extends Animal {
        // 改写父类方法
        speak() {
            console.log(this.name + ' barks.')
        }
    }

    var d = new Dog('Mittzie')

    d.speak() // Mittzie barks
```

### 扩展传统基于函数的“类”

```js
    function Animal1 (name) {
        this.name = name
    }
    // 利用原型扩展 Animal1方法
    Animal1.prototype.speak = function() {
        console.log(this.name + ' makes a noise from Animal1')
    }

    // 使用 extends 扩展子类 Dog1
    class Dog1 extends Animal1 {
        speak() {
            // 使用 super 关键字 调用 父对象 里面的方法
            super.speak()
            console.log(this.name + ' barks from Dog1')
        }
    }

    var d1 = new Dog1('Dog1')
    d1.speak() // Dog1 makes a noise from Animal1
               // Dog1 barks from Dog1
```

### 类不能直接继承常规对象  非要继承 使用 Object.setPrototypeOf()

``` js
    // 常规对象
    var Animal2 = {
        speak() {
            console.log(this.name + ' makes a noise from Animal2')
        }
    }
    // 一个类
    class Dog2 {
        constructor(name) {
            this.name = name
        }
    }

    Object.setPrototypeOf(Dog2.prototype, Animal2)

    var d2 = new Dog2('Dog2')
    d2.speak() // Dog2 makes a noise from Animal2
```

## 更多关于 es6-class 类的特性 语法 详见 [ruanyifeng的es6入门](http://es6.ruanyifeng.com/#docs/class) || [MDN-class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)


#### 附：例

``` js

class rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width
    }
    get area() {
        return this.calcArea()
    }
    get length() {
        return this.calcLength()
    }
    calcArea() {
        return this.height * this.width
    }
    calcLength() {
        return (this.height + this.width)*2
    }
    static getheoght(a) {
        console.log(a)
        console.log('this is static function')
    }
}

let p = new rectangle(222,312)

// console.log(p.area)
// console.log(p.length)


/// eg: 2
/**
 * static 静态类 不会被继承的方法  只能通过类调用  除非 使用 extends 让子类继承父类
 */

class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    static distance(a, b) {
        const dx = a.x -b.x
        const dy = a.y -b.y
        return Math.hypot(dx, dy)
    }
}

const p1 = new Point(5, 5)
const p2 = new Point(10, 11)

// console.log(Point.distance(p1, p2))

// eg: 3
/**
 * 使用 extends 创建子类
 */

// 父类 Animal
class Animal {
     constructor(name) {
         this.name = name
     }
     speak() {
         console.log(this.name +" " + 'makes a noise.')
     }
 }

// 子类 Dog
class Dog extends Animal {
    // 改写现有父类方法
    speak() {
        console.log(this.name +" "+ 'barks.')
    }
}

var d = new Dog('Mitzie')

d.speak()



// 扩展传统 基于函数的 “类”

function Animal1 (name){
    this.name = name
}
// 原型扩展
Animal1.prototype.speak = function (){
    console.log(this.name + ' makes a noise from Animal1')
}

// extends 子类
 class Dog1 extends Animal1 {
     speak() {
         // 使用 super 关键字 调用 父对象里面的函数
         super.speak()
         console.log(this.name + ' barks from Dog1')
     }
 }

 var d1 = new Dog1('Dog1')
//  d1.speak()


 /** 
  * 类不能直接继承常规对象  非要继承  使用 Object.setPrototypeOf()
 */

 // 常规对象
 var Animal2 = {
     speak() {
         console.log(this.name + ' makes a noise from Animal2')
     }
 }
 // 一个类
 class Dog2 {
     constructor(name) {
         this.name = name
     }
 }

 Object.setPrototypeOf(Dog2.prototype, Animal2)

 var d2 = new Dog2('Dog2')
//  d2.speak()
```