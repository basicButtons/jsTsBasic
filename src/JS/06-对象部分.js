// 1.扩展运算符
let array1 = []
array1.push(...[0,1,2,3,4])
console.log(array1)

let ob1 = {
    a:1,
    b:1
}

let res = {
    ...ob1,
    c:1    
}
console.log(res)
let array2 = [...array1,0]
console.log(array2)

// Number.prototype[Symbol.iterator] = function*(){
//     let i = 0
//     let num = this.valueOf()
//     while(i<num){
//         yield i++
//     }
// }
// let number = new Number(5)
// console.log(number.next())
// 如何通过 Symbol.iterator 来实现迭代器，同时扩展运算符就是坐拥在这个属性之上的。

// Array.from 是将一个类数组元素和一个具有 Symbol.iterator 元素变为一个真正的数组，

// Array.of 是将一组元素，组合为数组。

// 数组的填充方法 fill 数组的 entries()，keys() 和 values()  includes

// 链判断运算符需要读取某一属性的时候，往往需要判断一下，属性的上层对象是否存在。比如，读取message.body.user.firstName这个属性，安全的写法是写成下面这样。

// 错误的写法
const  firstName = message.body.user.firstName || 'default';

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
//   对于上面这种写法，太过于麻烦。我们最好还是进行一个简单工作。

const fName = message?.body?.user?.firstName || 'default';
// 上面这两种方式是等效的

// 如果firstname 是函数的话，也可以通过如下方式去执行
let res = message?.body?.user?.firstName?.()
// ?.()