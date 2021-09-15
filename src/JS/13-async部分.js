// async 使用注意点：

// 1.对于await后面的语法错误处理，因为只有执行为resolve的时候，就能继续往下执行。可以使用try catch 或者  使用 promise 的 catch 方法。
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}
// 另一种写法
async function myFunction() {
    await somethingThatReturnsAPromise()
        .catch(function (err) {
            console.log(err);
        });
}

// 2.对于多个不相互依赖的 promise 的 await 操作，最好不要让他们等待。
let foo = await getFoo();
let bar = await getBar();

// 上面代码可以写成，
let foo1 = getFoo()
let bar1 = getBar()
await foo1
await bar1

// 3 await 必须用在 async 函数中，用到一般的函数中的时候就会报错。

// 4.forEach中的函数自己就是异步执行的了，所以说在此基础之上，  await操作，不会像我们想象的那个样子执行完一个函数之后自爱情之行另外一个。
// 如果需要如此的话，需要使用 for 循环。


// async 函数的实现原理。
async function fn(args) {
    // ...
}

function fn(args) {
    return spawn(function* () {
        // ...
    });
}

// spawn 的代买如下：
function spawn(genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF()
        function step(nextF) {
            let next
            try {
                next = nextF()
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () {
                    return gen.next(v);
                });
            }, function (e) {
                step(function () {
                    return gen.throw(e);
                });
            });
        }
        step(function() { return gen.next(undefined); });
    })
}
// 上面的代码其实很好解释，就是说，对于asnyc函数中的 await 后面的内容，就是每一次执行后面的操作的时候，就是将其包装为一个 new Promise 的执行器，然后对于后面的代码就是放到该 promise 的 then 中去。
