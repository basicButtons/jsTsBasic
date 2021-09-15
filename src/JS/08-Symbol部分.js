// Symbol.for()
let s1 = Symbol.for("foo")
let s2 = Symbol.for("foo")
console.log(s1 === s2)
console.log(s1)

// Symbol.for 不同于一般的Symbol，这个是对于一个字符串生成一个Symbol，如果该字符串已经有了Symbol值，那么我们就再生成一个。
// Symbol.for() 与 Symbol() 两种写法都会生成新的Symbol。他们的区别是，前者会被登记在全局环境中以供搜索，但是后者则不会去被搜索。
// Symbol.for()不会每次调用都会去返回一个新的Symbol类型的值，二十会先去检查给定的 key 是否存在，如果不存在才会新建一个值。
// 比如 执行30次 Symbol.for("cat") 都只会只有一个Symbol值, 但是执行30次 Symbol("cat") 则只会返回30个完全不同的 Symbol 值

// 这个地方就有用到单例模式。

// 单例模式等待有后续实现。
let SingleItem = (function () {
    let instance
    let getObject = function (name, age) {
        this.name = name
        this.age = age
    }
    return function (name, age) {
        return instance || (instance = new getObject(name, age))
    }
})()
let obj1 = SingleItem("mx", 20)
let obj2 = SingleItem("mx", 21)
console.log(obj1 === obj2)

// 对其进行解耦,将单例写成一个装饰器. 芜湖,我好像想把一切东西都解构出来,然后弄成装饰器然后调用哦哦哦.

class single{
    constructor(func){
        let instance
        return function(...args){
            return instance || (instance = new func(...args))
        }
    }
}

class GetObject {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

let singleObject = new single(GetObject)
let objs1 = new singleObject("mx",20)
let objs2 = new singleObject("mx",21)
console.log(objs1 === objs2)


const myIterable = {}
Number.prototype[Symbol.iterator] = function* (){
    let num =  this.valueOf()
    let i = 0
    while(i < num){
        yield i
    }
}
let five = new Number(5)
let iter = five[Symbol.iterator]()
console.log(iter.next())