// let const 会有tdz的存在，在块级作用域内会有一定的问题，在let和const之前使用该变量都是错误的。
// 
//  块级作用域
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

// 这个最具有传奇色彩的代码了，如果for循环中使用的是var那么，在输出的时候就会是10了，因为var变量就不会具有块级作用域，因此说，不会说在调用的时候，引用的是外面的i，但是使用了let就产生了块级作用域
// 因此说let就是块级作用内的那个i了，因此a[6]输出的i就是6了


// 不存在变量提升
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
// console.log(bar); // ReferenceError: Cannot access 'bar' before initialization
// let bar = 2;


// 不允许重复声明变量


// const相关问题
// const 是可以修改的，只是指向的地址不可以修改

// 顶层对象，在浏览器环境中，顶层对象就是windows，在Node中就是global对象。ES5之前的时候，顶层对象的属性就是全局变量。但是let和const在全局声明的变量不属于window。

