// JS 中最初是没有类这个东西，都是哦通过构造函数这样一种形式，来生成构造函数，然后由构造函数产生对象。
// ES6中提供了更加接近传统语言的写法，引入了class这个概念，作为对象的模板，通过class关键词1，可以定义类。对比如下

function Point(x, y) {
    this.x = x
    this.y = y
}
Point.prototype.toString = function () {
    return `(${this.x},${this.y})`
}
let p = new Point(1, 2)

console.log(p.toString())

class Point1 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return `(${this.x},${this.y})`
    }
}

console.log(typeof Point1)  //function

// 实际上所有的class中定义的方法都在原型上。可以通过 Object.assign 的方法来给对象添加方法。

// __proto__并不是语言本身的特性，这是各个厂商具体实现的时候添加的私有的属性。但是不建议在生产环境中去使用，Object.getPrototypeOf 的方法来给原型添加方法/属性。

// 存取值函数 getter 和 setter 与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值和取值函数，拦截该属性的存取值的行为。
class MyClass {
    constructor() {

    }
    element = 0
    get prop() {
        return "getter"
    }
    set prop(value) {
        this.element = value
        console.log(this.prop)
    }
}
let some = new MyClass()
some.prop = 2

// 属性表达式 类的属性名可以采用表达式的形式来表示
let methodName = "getArea"
class Square {
    constructor(length) {
        this.length = length
    }
    [methodName]() {
        console.log(this.length)
    }
}
let square = new Square(1)
square.getArea()

// class 的继承
class newPoint {

}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
        // 在子类的constructor函数中必须要去调用 super 函数。否则就会报错。
        // 在子类的构造函数中，只有调用了super之后才能使用 this 关键字，否则就会报错。
    }
}

let p11 = new ColorPoint(1, 2, "red")

console.log(p11 instanceof ColorPoint) //true
console.log(p11 instanceof Point) //ture

// Object.getPrototypeOf
console.log(Object.getPrototypeOf(ColorPoint))
console.log(ColorPoint.__proto__.__proto__ === Function.prototype)

class A {

}
class B {

}
Object.setPrototypeOf(B.prototype, A.prototype)
console.log(B.prototype.__proto__ === A.prototype) //true
Object.setPrototypeOf(B, A)
console.log(B.__proto__ === A) //true

// Mixin 模式 Mixin 指的是多个独享合成一个新的对象，新对象具有各个组成成员的接口，他的最原始实现如下。
const obja = {
    a: "a",
    b: "b"
}
const objb = {
    c: "c"
}
let res = { ...obja, ...objb }
console.log(res)

function Mixin(...minxins) {
    class Mix {
        constructor() {
            for (let mixin of minxins) {
                copyProperties(this, new mixin())
            }
        }
    }
    for (let mixin of minxins) {
        copyProperties(Mix, mixin)
        copyProperties(MIx.prototype, mixin.prototype)
    }
    return Mix
}
function copyProperties(target, resource) {
    for (let key of Reflect.ownKeys(resource)) {
        if (key !== "constructor"
            && key !== "prototype"
            && key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptors(source, key)
            Object.defineProperties(target, key, desc)
        }
    }
}
