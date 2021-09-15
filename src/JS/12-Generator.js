// 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
// 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())

//  yield 表达式 对于一个生成器函数而言，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
let arr1 = [1, [[2, 3], 4], [5, 6]];
const flat = function* (arr1) {
  let len = arr1.length
  for (let index = 0; index < len; index++) {
    let item = arr1[index]
    if (typeof arr1[index] !== "number") {
      yield* flat(item)
    } else {
      yield item
    }
  }
}
let iter = flat(arr1)
let res = iter.next()
while (res.value) {
  console.log(res)
  res = iter.next()
}
// 其中 yield * 是用来对于一个可迭代对象生成一个迭代过程。


// 当 yield 出现在表达式中的时候，就应该加上一个小括号，否则就会报错。

function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  // console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}

// 当 yield 作为函数参数和 赋值表达式的右侧的时候，就不会去报错。
// 1. iterator 与 symbol 的关系，在原则上，对于一个对象，它没有 symbol.iterator 属性，但是我们如果将其赋值为一个 generator 函数那么就会有变成一个可迭代对象，其迭代值就是一个 yield 之后的值。

// 2. yield本身没有任何返回值，但是如果我们之后，使用next函数传入了一个参数，那么它就是yield表达式的返回值。

// 

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


// for of 与 Symbol.iterator 之间的关系  如果因为我们给一个对象的 Symbol.iterator 属性进行复制的时候，我们就可以对其进行迭代了，同时如果说我们给它赋值为一个Generator函数的时候，我们就可以直接对其进行迭代了，每次迭代产生的结果就是一个个产生的状态。

// 下面是那个斐波那契的比较经典的问题。

function fib(n) {
  let prev = 1, cur = 2
  let count = 1
  while (count++ < n) {
    [prev, cur] = [cur, prev + cur]
    console.log(prev, " : ", cur)
  }
  return prev
}
console.log(fib(3))

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (; ;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 10) break;
  console.log(n);
}
// 这里面的思路都是一样的，只不过后面的使用了迭代器来控制流程的运转情况。

function* objectEntries(obj) {
  let keys = Object.keys(obj)
  for (let key of keys) {
    yield [key, obj[key]]
  }
}

function* objectEntriesThis() {
  let keys = Object.keys(this)
  for (let key of keys) {
    yield [key, this[key]]
  }
}
let jane = { first: 'Jane', last: 'Doe' };

// 这是其中一种方式 将其变为一个生成器函数的结果
// for(let [key,value] of objectEntries(jane)){
//   console.log(`${key} == ${value}`)
// }

// 另外一种方式是 给该对象赋值 Symbol.iterator 为一个 Generator 函数。

jane[Symbol.iterator] = objectEntriesThis

for (let [key, value] of jane) {
  console.log(`${key} ${value}`)
}

// 这两种方式都可以实现 for of 的迭代。

// yield * 可以在一个生成器函数中可以直接去调用一个可迭代对象，不用再去手动写一个个的迭代。比如下面的例子
function* foo() {
  yield "some1"
  yield "some2"
}
function* bar() {
  yield "some0"

  // for(let res of foo()){
  //   yield res
  // }
  yield* foo()
  // 上面这两种方式都是可以的，因此说yield 可以提供很多帮助。
  yield "some3"
}
let temp = bar()
for (let v of temp) {
  console.log(v)
}

// 对于 yield* 表达式，任何数据解构只要有 Iterator 接口，就可以被 yield *遍历。
// 如果被代理的 Generator 函数有 return 语句，那么就可以向代理它的Generator 函数返回数据。
function* foo() {
  yield 2
  yield 3
  return "foo"
}
function* bar() {
  yield 1
  var v = yield* foo()
  console.log("v: " + v)
  yield 4
}
var it = bar()
it.next()
it.next()
it.next()
it.next()
// 这个地方的输出真的好奇怪呀，我也搞不清楚，但是单独拿出测试的时候就是没任何问题的。

function* genFunWithReturn() {
  yield "a"
  yield "b"
  return "The result"
}
function* logReturn(genObj) {
  yield 0
  let result = yield* genObj()
  console.log(result)
  yield 1
  return 2
}
console.log([...logReturn(genFunWithReturn)])

// 这让我想起了数组打平的一些事情，对于之前，我似乎有处理过数组打平的一些事情。下面就来复习一下吧，顺便再利用一下 Generator 来跟进一下。

var arr = [1, 2, [3, 4, 5, [6, 7, 8], 9], 10, [11, 12]]

// 递归实现
function fn1(arr) {
  let arr1 = []
  arr.forEach((val) => {
    if (val instanceof Array) {
      arr1 = arra.concat(fn1(val))
    } else {
      arr1.push(val)
    }
  })
}

function fn2(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? fn2(cue) : cur)
  },[])
}

function fn3(arr1){
  return arr1.flat(Infinity)
}

function fn4(arr1){
  let arr = []
  arr1.forEach(val=>{
    if(Array.isArray(val)){
      arr1.push(...fn4(val))
    }else{
      arr1.push(val)
    }
  })
  return arr
}

function fn5(arr1){
  let arr = arr1.toString().split(",").map(val=>{
    return parent(val)
  })
  return arr
}

function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

// 作为对象属性的 Generator 函数，如果一个对象的属性是 Generator 函数，可以简化为下面的形式。
let obj = {
  *myGeneratorMethod(){

  }
  // myGeneratorMethod :function*(){

  // }
  // 以上两种方式是等效的
}

// Generator 函数中的 this
// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的 prototype 对象上的方法。
function* g(){}

g.prototype.hello =  function(){
  console.log("hi")
}
let newObj = g()
console.log(newObj instanceof g)
newObj.hello()

// 上面的例子可以看出，这个 Generator 函数 g 返回的遍历器 newObj 是 g 的实例，而且继承了g.protoType. 但是我们不能把 g 当作一个简单的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this。

function* newG(){
  this.a = 11
}
let newObj1 = newG()
newObj1.next()
console.log(obj.a) //undefined newG函数没有返回this

// 同样的 Generator 函数是不能使用 new 来调用的，

// Generator 和协程
// 异步操作的同步化表达
// step1(function(value1){
//   step2(function(value2){
//     step3(function(value3){
//       step4(function(value4){
//         // do something
//       })
//     })
//   })
// })

// 上述代码用 Promise 去实现,
// Promise.resolve(step1)
// .then(step2)
// .then(step3)
// .then(step4)
// .catch()

// 上述代码可以用通过 Generator 函数的方法来实现.
// function* longRunningTask(value1) {
//   try {
//     var value2 = yield step1(value1);
//     var value3 = yield step2(value2);
//     var value4 = yield step3(value3);
//     var value5 = yield step4(value4);
//     // Do something with value4
//   } catch (e) {
//     // Handle any error from step1 through step4
//   }
// }

