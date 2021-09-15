// ES6 诞生以来,异步的方法大概有以下四种
// --- 回调函数
// --- 事件监听
// --- 发布/订阅
// --- Promise对象
// Generator 函数将 JS 异步编程带入了一个全新的阶段

// 对于上述四种情况而言,其实对于回调函数和事件监听而言都是一个内容,事件监听也是回调函数,对于Promise,底层还是发布订阅模式.

// Generator 函数
// 协程
// 协程有点像是函数,又有点像是线程.
// 第一步,携程A开始运行.
// 第二步,携程A运行到一半,进入暂停阶段,执行权转移到协程B.
// 第三步,携程B交还执行权.
// 第四步,协程A回复执行

// 举例来说:
// function* asyncJob(){
//     var f = yield readFile(fileA)
// }
// 在上述代码中, asyncjob 函数是一个协程,它的奥妙之处在于其中的yield命令,他表示执行到此处之后,执行权将交给其他协程.也就是说,yield命令是异步两个阶段的分界线.
// 协程遇到yield命令就是暂停,等到执行权返回,再从暂停的地方继续往后执行.它的最大有点就是可以想同步函数一样去操作. 

// 协程的 Generator 函数实现.
// 整个 Generator 函数就是一个封装的异步任务,或者说就是一个异步任务的容器.异步操作需要暂停的地方,都用 yield 语言注明.
// function* gen(x){
//     var y = yield x + 2
//     return y
// }
// var g = gen(1)
// console.log(g.next()) //{ value: 3, done: false }
// console.log(g.next()) //{ value: undefined, done: true }
// 由于 yield 表达式本身是不返回任何内容的,所以说第二个 next 本身返回的结果就是 undefined.

// Generator 函数内部还可以部署错误处理代码,捕获函数体外抛出的错误.
// function* gen1(x){
//     try{
//         var y = yield x + 2
//     }catch(e){
//         console.log(e)
//     }
//     return y
// }

// var g1 = gen1(1)
// g.next()
// g.throw("Something get wrong!")

// 异步任务的封装, 
import fetch from "node-fetch"
import thunkify from "thunkify"
function* gen2(){
    let url =  "http://localhost:3000/post"
    let res = yield fetch(url)
    console.log(res)
}
let g2 = gen2()
var result = g2.next()
console.log(result)
// gen2() 函数的问题,虽然可以很简洁的执行异步操作,但是流程管理起来不是很方便,需要我们去调用 Generator函数去生成一个迭代器对象,然后再去执行 next 方法.

// 下面有很多方法,去帮助我们自动的完成上面的一些事情.
// Co 模块