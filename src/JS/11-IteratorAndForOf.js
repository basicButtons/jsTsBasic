// 原生具有 iterator 的对象 Symbol.iterator 
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

// 调用 Symbol.iterator 的方法

// 1. 结构赋值
let set = new Set().add('a').add('b').add('c');

let [x, y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];

// 2.扩展运算符号

// 3.yield *后跟可迭代对象

// 4.字符串 的迭代接口
let someString = "Hello"
console.log(typeof someString[Symbol.iterator])
// "function"
var iterator = someString[Symbol.iterator]();
let iter = iterator.next()
while (!iter.done) {
    console.log(iter)
    iter = iterator.next()
}

// 5. Iterator 接口与 Generator 函数
// Symbol.iterator() 方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
// yield 方法在这个地方就非常的方便。
// 这个地方可以在去看看红宝书。（嘿嘿，我觉得对于红宝书的理解又多了好多）

let myIterable = {
    [Symbol.iterator]: function* () {
        yield 1
        yield 2
        yield 3
    }
}
let res = [...myIterable]
console.log(res)

let obj = {
    *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};
for (let x of obj) {
    console.log(x);
}

// 接下来是该部分的重点，for of 它其实就是调用的 Symbol.iterator
let arr = ["green", "blue", "red"]
for (let v of arr) {
    console.log(v); // red green blue
}

const obj1 = {};
obj1[Symbol.iterator] = arr[Symbol.iterator]

for (let v of obj1) {
    console.log(v); // red green blue
}

// for 可以用来替换 forEach方法
// JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。 其实for of也可以用来获取健名，可以通过借助keys entries 方法

// Map 和 Set 与 for of
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
    console.log(e);
}

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
    console.log(name + ": " + value);
}


// 对象元素没有办法直接使用 for of 因为他没有 symbol.iterator 属性， 但是可以通过 keys 和 value 

// for in 和 for of 的对比
// for in 有如下三个问题 第一 对于数组而言，返回的 key 都是字符串， 第二 返回的 key 不仅仅是该对象本身的 key ，而且包含了从原型中继承过来的一些key。 第三：有些时候他会按照任意顺序来输出 key

// for of 的优点： 第一：首先解决了 for in 里面的种种问题  第二：可以在循环中使用 break continue return 这样的操作在 forEach 中是无法实现的。 第三：它为所有的对象提供了统一的接口方法。