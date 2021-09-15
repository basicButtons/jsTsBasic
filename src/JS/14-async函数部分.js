// ES2017 标准引入了async 函数，使得异步操作变得更加方便。
// async函数，就是 Generator 函数的语法糖。
// async 函数对于Generator函数的提升主要体现在以下四个方面：
// （1）内置执行器：Generator函数的执行必须要靠执行器，所以才有co模块等，然后async函数则是自带执行器的，也就是说，async函数的执行，跟普通函数是一模一样的。
// （2）更好的语义表达：async await比起 Generator函数，更好理解。
// （3）更广泛的实用性，在co模块中，yield只能是thunk函数和promise对象，然而async函数的await命令之后可以是各种各样的原始值，或者promise对象，对于原始值，则是返回resolved的promise
// （4）返回值是promise，async则可以看作多个异步操作，包装成一个Promise对象，而await就是内部的then命令的语法糖。

