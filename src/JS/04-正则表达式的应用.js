let hd = "houdunren2200hdcms9988"
let res = hd.match(/\d/g).join("")
console.log(res)

// 正则表达式创建的方式
// 字面量的方式
let hd1 = "houdunren.com"
console.log(/hou/.test(hd))
let reg = new RegExp("u","g")
let newRes = reg.test(hd)
console.log(newRes)

// 选择符
let hd2 = "houdunren.com"
console.log(/u|@/.test(hd))
let tel = "010-9999999"
console.log(/(010|020)\-\d{7,8}/.test(tel))

let reg2 = /[123456]/
let hd3 = "1"
console.log(hd3.match(reg2))

let reg4 = /(12|34)/
let hd4 = "888888881324"
console.log(hd4.match(reg4))
// null

// 转移符号
let url = "https://www.baidu.com"
console.log(/https?:\/\/\w+\.\w+\.\w+/.test(url))

// 元字符
let hd5 = "houdunren 2021"
console.log(hd5.match(/\d+/g))

let hd6 = `
    张三:010-9999999,李四:020-88888888
`
console.log(hd6.match(/[^\s-\d:,]+/g))
// \s表示是制表符 空格 换行符 回车等等
// \S表示的除了上述的空白之外的内容
// \d表示的是数字

let email = "786609202@qq.com"
console.log(email.match(/^\w+@\w+\.\w+$/g))
// \w表示的是 字符 数字 下划线 \W表示的是除了字母数字下划线之外的内容

// i g 模式修正符
let hd7 = "hoUdunren"
console.log(hd7.replace(/u/ig,"@"))

// m多行匹配

let hd8 = `
    #1 js,200元 #
    #2 php,300元 #
    #3 houdunren.com # 后盾人
    #4 node.js,180 #
`
let books = hd8.match(/^\s*#\d+\s+.+\s+#\s*$/gm).map(item => {
    item = item.replace(/\s*#\d*\s*/g,"").split(",")
    let [name , price] = item
    return {name,price}
})
console.log(books)

let hd9 = "houdunren"
let reg9 = /\w/g;
while(res = reg9.exec(hd9)){
    console.log(reg9.lastIndex)
    console.log(res)
}

// 在这里的事情就是，对于个正则表达式这个东西，它会去保存一个lastIndex这个属性，来确保下一次运行的时候还会是这个位置。

// 原子表 [] 原子表中的内容就是表达内容表面的意思不进行转义。

// 区间匹配
let hd10 = "2021"
console.log(hd10.match(/[0-9]{3,6}/g));

// 排除匹配
let hd11 = "houdunren.com"
console.log(hd11.match(/[^ue]/g))

// 原子组


// 禁止贪婪 ？ ？本身表示的意思是0或者1个，那么对于这个？表示禁止贪婪的话，那么就是？？

// 关于正则表达式的一些方法
// search match  matchAll split replace
// $& 表示匹配到的内容 原子组也可以使用别名

// 前置断言 ?<=   后置断言？=  后置否断言？！ 前置否定断言 ?<!
let userPhones = `
    向军电话：12345678901
    后盾人电话:98765432101
`
let reg13 = /(?<=\d{7})\d{4}/g
console.log(reg13.test(userPhones))
userPhones = userPhones.replace(reg13,v=>{
    console.log(v)
    return "*".repeat(4)
})
console.log(userPhones)

let money = "12332317892.00"
let reg12 = /\B(?=(?:\d{3})*(?:\d{3}\.)(?:\d*)$)/g
let test = reg12.test(money)
console.log(test)
money = money.replace(reg12,",")
console.log(money) 