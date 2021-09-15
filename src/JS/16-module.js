// export 方法：

export var firstName = "Micheal"
export var lastName = "JackSon"
export const year = 1958;

export function multiply(x, y) {
    return x * y;
};


function v1() {  }
function v2() {  }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

// 报错
var m = 1;
// export m;
// 报错信息为：Declaration or statement expected.  export 后面期望跟着 生命和 表达式 

// 写法一
// export var m = 1;

// 写法二
// var m = 1;
// export {m};

// 写法三
var n = 1;
// export {n as m}

// export 命令必须在文件的顶层实现。

// import 的用法：

// main.js
// import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// import { lastName as surname } from './profile.js';

// 但是有一点就是 import 命令输入的变量都是只读的，因为它的本质就是输入接口。就是说，不允许对加载的内容进行修改。

import {a as some} from "./new.js"
// some = {}
// TypeError: Assignment to constant variable.
// 当然这种修改是和 const 一样的，如果修改其属性是可以的。 
// 引入的东西没有办法去修改。

// 另外 export 语句输出的接口，与其对应的值是动态绑定关系，也就是说通过该接口，可以取到模块内部实时的值。
// import {foo} from "./new.js"
// console.log(foo)
// setTimeout(()=>{console.log(foo)},1000)
// bar
// baz

// 由于 import 是静态执行的，所以不能使用表达式和变量，这些只有在运行的时候才能得到结果的语法结构，都其中都会报错。

// import {"f"+"oo"} from "./new.js"


// let module = "./new.js"
// import {foo} from module


// if (x === 1) {
//     import { foo } from 'module1';
//   } else {
//     import { foo } from 'module2';
//   }

// 最后 import 语句回去执行所加载的模块，因此可以有以下的写法
// import "lodash"
// 这个地方引入多次但是只会去执行一次。
// import语句是 Singleton 模式。

// 前面我们提到了 import 实在JS引擎分析的时候就进行了,先于其他模块内的其他语句执行.这样的话各种if判断中的JS代码就会报错.
let a = 1
// if(a === 1){
//     import("./new.js")
        // 动态加载模式
// }
if(true){
    // import foo from "./test"
    // 这个地方会报错,原因上面已经讲过
}

// Module 的加载实现:
// 1.浏览器加载
// 一般来说我们都会使用 script 标签来加载JS脚本,默认情况下没浏览器是同步加载JS脚本,也就是说渲染引擎遇到script标签的时候,就会停下来,等到执行完脚本之后,再去继续向下继续渲染.如果是外部脚本,还必须停下来下载脚本.
// 如果脚本体积特别大的话,下载和执行的事件就会比较长,因此会造成浏览器阻塞,用户感觉到比较强烈的卡顿.所以浏览器允许脚本异步加载.

//  <script src="" defer></script>
//  <script src="" async></script>

// 在上述的两行代码中, script 标签打开了 defer async 属性, 脚本就会异步加载.渲染引擎遇到这一行,就回去下载外部脚本,但不会去等他下载和执行完毕,而是直接执行之后的命令.

// defer 与 async 的区别: defer 要等到整个页面在内存中正常渲染结束之后,才会去执行. async 则是一旦下载完成之后,渲染引擎就会中止渲染,执行该脚本.一句话，defer是“渲染完再执行”，async是“下载完就执行”.
//上面代码在网页中插入一个模块foo.js，由于type属性设为module，所以浏览器知道这是一个 ES6 模块。 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。



// ES6 模块和 CommonJS 模块的差异
// 讨论 Node.js 加载 ES6 模块之前,必须要去了解 ES6 模块和 CommonJS 模块完全不同.

// 1. CommonJS 模块输出的是一个值的拷贝,但是ES6输出的是值的引用.
// 2. CommonJS 模块是运行时加载,ES6模块则是模块编译的时候执行.

// CommonJS 模块输出的是值的拷贝,也就是说,一旦输出一个值,模块内部的变化就影响不到这个值了, 然而在 ES6 模块中就不再是生成输出对象的拷贝，而是动态关联模块中的值。

// 第二点:ES6 在模块编译的时候执行就会有以下两个问题,

// 1.import命令会被JS引擎静态分析,优先于模块内的其他内容执行.
// 2.export 命令会有变量声明提前的效果.

