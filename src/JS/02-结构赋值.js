// 数组的解构
let [a,b,c] = [1,2,3]
console.log(a,b,c)
// 数组的解构赋值其实就是对应的模式匹配
let [foo,[[bar],baz]] = [1,[[2],3]]
console.log(foo,bar,baz)
//没有解构成功的话就是返回undefined
let [some] = [];
let [some1, some2] = [1];
console.log(some,some1,some2)

// 解构过程中设定默认值
let [some3 = true] = []
console.log(some3) 
// 如果在解构的过程中失败了，那么就可以使用默认值，也就是数组对应的位置为undefined的时候才会去使用默认值。也就是说null的时候不可以。

// 解构不仅仅用于数组还可以用于对象。
let {some4,some5} = {some4:"123123",some5:"12reu1rwu"}
console.log(some4,some5)
// 对象解构的时候，跟数组解构有一点不同的地方就是数组这边的需要根据位置来判断，但是对象是根据变量的名称来判断的。如果没有名称一样的时候就会返回一个undefined
// 但是有的时候我不想让他们一样的时候，我们可以使用如下形式进行操作
let {foo:somefoo,bar:somebar} = {foo:"aaa",bar:"bbb"}
console.log(somefoo,somebar)
// 这个里面就反应出来这个问题，就是当我们这边的一些变量已经被用过了，就会有这个问题，我们需要使用一个新的变量来进行这样的操作。
// 同样的道理，对于对象解构也可以使用默认值。同样的只有当解构的变量严格为undefined的时候，我们才会去使用默认值
var {x = 3} = {x: undefined};

// 一般我们都会对一个解构赋值的时候前面加上let或者const

// 解构赋值的用途，
// 1.交换变量。对于斐波那契数列的求解过程中就用到了
function FIB(number){
    if(number <= 2){
        return 1
    }
    let pre = 0
    let cur = 1
    while(number--){
        [cur ,pre] = [pre+cur,cur]
    }
    return pre
}
console.log(FIB(5))
// 用处还有很多就是对于反转列表的时候。这里就不去一一列出来了。
