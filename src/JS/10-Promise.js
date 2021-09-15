let axios = require("axios")
// Promise 实现图片懒加载的函数
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        const image = new Image();

        image.onload = function () {
            resolve(image);
        };

        image.onerror = function () {
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}

<<<<<<< HEAD
=======
// 其实一直不太清楚的一点就是 async 和 await之间的关系是怎么样子的。对于这个问题其实还是挺简单的。下面是知乎上抄来的一段大佬讲话。

// 首先，你得知道，async|await实际上是promise的语法糖，promise则是回调函数的语法糖。换句话说，无论promise还是async|await，都不是什么新东西，只不过是已有封装而已。不过有些封装单纯在语言层面无法实现，必须借助一些更底层的机制。

// 下面这个是 MDN 上的一个例子吧。
resolveAfter2Seconds = ()=>{
    console.log("111")
    return axios.get("http://localhost:3000/post")
}
async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(2);
    // expected output: "resolved"
}
asyncCall()
console.log("12312312")

// (new Promise( (resolutionFunc,rejectionFunc) => {
//     console.log('calling');
//     new Promise(resolveAfter2Seconds).then(
//     result => {
        //   console.log(result)
        // }
//      )
// }))
// 对于 await 而言就是需要把每一个 放到下一个 then 里面来保证同步执行的。




>>>>>>> d4b4ba228e43e8adf63957c60e520b3400333809
// 对于 Promise 而言，我对它的基本方法认知已经很清楚了，这里主要讲解一下不太清楚的防范。

// Promise.prototype.finally
// let promise = new Promise(()=>{

// })

// promise
// .then(result => {})
// .catch(error => {})
// .finally(() => {});
// // 上面代码中，不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。
// // finially 中的回调函数是不接受任何参数的，所以说它无法知道前面的promise的运行状态，这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

// // 手写 Promise

class MyPromise{
    constructor(fn){
        this.reason = undefined
        this.result = undefined
        this.status = "pending"
        this.onResolveCallBackes = []
        this.onRejectedCallBackes = []
        const onresolve = (value)=>{
            if(this.status === "pending"){
                this.status = "resolved"
                this.result = value
                this.onResolveCallBackes.forEach((fn)=>fn(value))
            }
        }
        const onreject = (value) => {
            if(this.status === "pending"){
                this.status = "rejected"
                this.reason = value
                this.onRejectedCallBackes.forEach((fn)=>fn(value))
            }
        }
        fn(onresolve,onreject)
    }
}
MyPromise.prototype.then= function(resolveFn,rejectFn){
    if(this.status === "resolved"){
        resolveFn(this.result)
    }else if(this.status === "rejected"){
        rejectFn(this.reason)
    }else{
        this.onResolveCallBackes.push(resolveFn)
        this.onRejectedCallBackes.push(rejectFn)
    }
}
MyPromise.prototype.all = function(promiseList){
    return new Promise((resolve,reject)=>{
        let result = []
        promiseList.forEach((promise,index)=>{
            promise.then(val  =>{
                result.push(result)
            },
                err=>reject(err)
            )
        })
        resolve(result)
    })
}
MyPromise.prototype.rece = function(promiseList){
    return new Promise((resolve,reject)=>{
        promiseList.forEach((promise,index)=>{
            promise.then(val=>{
                resolve(val)
            },reason=>{
                reject(reason)
            })
        })
    })
}


// 一个楼梯有20节，每次只能走1节或者2节，有多少种上楼梯的方法？
// 斐波那契数列 1 1 2 3 5 8 13 21 

let es6 = {
    edition: 6,
    committee: "TC39",
    standard: "ECMA-262"
};
function some(){
    this.edition = 6
    this.committee = "TC39"
    this.standard = "ECMA-262"
}

let es7 = new some()

for(let value of es7){
    console.log(value)
}