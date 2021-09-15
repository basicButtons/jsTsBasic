// 字符串的遍历方法
let str = "foo"
for (let code of str) {
    console.log(code)
}

// 在阮一峰大佬的string部分讲到了 JSON.stringify 让我想起了这个地方用到的深浅copy问题.其实前面在解构赋值的使用,也有这个问题,对于解构而言,它使用的也是浅拷贝

// var test = {
//     name: 'a',
//     date: [new Date(1536627600000), new Date(1540047600000)],
// };

// let b;
// b = JSON.parse(JSON.stringify(test))
// console.log(b)
// {
//   name: 'a',
//   date: [ '2018-09-11T01:00:00.000Z', '2018-10-20T15:00:00.000Z' ]
// }
// 对于很多中情况下,都会失去原来的对象

const test = {
    name: 'a',
    date: new RegExp('\\w+'),
};
// debugger
const copyed = JSON.parse(JSON.stringify(test));
console.log(copyed)
// 对于正则和Error而言,就是变为一个空对象.

// 更致命的问题在于如果该处为空的话，就会导致序列化的结果会把函数和undefined丢失。

// 还有循环引用的问题。这个时候stringify直接炸裂。下面来写一个deepclone

function deepclone(data){
    const type = judgeType(data)
    let obj;
    let set = new Set()
    if(type === 'array'){
        obj = []
    }else if(type === 'object'){
        obj = {}
    }else{
        return data
    }
    for( let key in data){
        if(data.hasOwnProperty(key)){
            if(data[key] in set){
                obj[key] = data[key]
            }else{
                set.add(obj[key])
                obj[key] = deepclone(data[key])
            }
        }
    }
    return obj
}
function judgeType(obj){
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]' : 'boolean',
        '[object Number]' : 'number',
        '[object String]' : 'string',
        '[object Function]' : 'function',
        '[object Array]' : 'array',
        '[object Date]' : 'date',
        '[object RegExp]' : 'regExp',
        '[object Undefined]' : 'undefined',
        '[object null]' : 'null',
        '[object Object]' : 'object'
    }
    return map[toString.call(obj)]
}

let ori = {
    a:{b:1},
    b:2
}
let res = deepclone(ori)
ori.a.b =1000
console.log(res)

// 模板字符串

// 字符串的方法
// 1.字符串的字符方法
let message = "123123"
console.log(message.charAt(0))

// 2.字符串的编译方法，这个就不去讲了，我单纯觉得用不到

// 3.字符串的操作方法：
message = message.concat("world","!")
console.log(message)
console.log(message.slice(0,message.length))
// 这个地方应该使用 message.length 不应该使用 -1 因为 slice 结束位置是不保留的
// 这些函数的第二个参数 substring 和 slice 表示结束的位置，但是 substr 而言却是表示截取的子字符串的长度。

// 4.字符串的位置方法 indexOf lastIndexOf

// 5.包含方法includes

// 6.trim方法

