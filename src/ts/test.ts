let some22  = null
let some23 = 1
let some24 = some22 ?? some23
console.log(some24)


// strickNullChecks 需要在tsconfig.json 中去设置，默认情况下是关闭的。
// 开启之后 undefined和null只能赋值给他们自己的类型了,但是可以赋值给void any unknown 类型.
let m1:boolean=undefined;
let m2:string = "!23";
console.log(m2!.length)

// void 只有用来修饰函数返回值的时候才是有意义的,在其他地方都是没有任何意义的.
function log(message:string):void{
    console.log(message)
}

// 对于void类型而言, 可以对于一个函数而言返回一个 undefined, 但是无法返回 void.
function foo():void{
    return undefined
}

// 枚举类型 枚举类型由零个或者多个成员组成,每一个都是一个或者多个常量,在TS中,枚举类型是一种原始数据类型,它通过 enum 来定义.
enum season{
    Spring,
    Summer,
    Fall,
    Winter
}
// 可以按照枚举成员的类型分为三类.
// 数值型枚举
enum Direction{
    Up,    // 0 
    Down,   // 1
    Left,    // 2
    Right     // 3
}
const diretion:Direction = Direction.Up

const direction:Direction = Direction.Up

console.log(direction)
// 在例中,我们使用 enum 关键词定义了枚举类型 Direction,包含了四个枚举成员.每一个数值类型的枚举成员都表示一个具体的数字. 我已经标记到上面了
// 但是当我们想要去到哪都标记他们的时候呢,就可以如下所示了
enum Direction2 {
    Up = 1 + 1,    // 1
    Down,      // 2
    Left = 10, // 10
    Right      // 11
}
let d2 :Direction2=Direction2.Down
let d3 :Direction2=Direction2.Right
console.log(d2)
console.log(d3)
// 我们在给一个 Direction 赋值的时候,其实不仅仅可以使用 enum 来进行赋值,也可以直接使用 number 来进行.

let d4 : Direction = 0
console.log(d4 === Direction.Up)
// true

// 字符串枚举
enum Direction3{
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = "Right",
    U = Up,
    D = Down,
    L = Left,
    R = Right
}

let d5:Direction3 = Direction3.D
console.log(d5 === "Down")
// 我们可以通过 enum对象来判断 一个 Direction3 类型的值,但是反过来对于一个字符串枚举类型而言,我们不能使用字符串来给他们赋值.

// d5 = "Down"
// Type "down" is not assignable to type "Direction3".

function getNumber(a:number) : number{
    return a
}
// 异构型枚举
enum Color{
    Black = 0,
    White = "White"
}

// 在定义异构枚举的时候, 我们无法计算量去给一个枚举元素赋值,函数,计算等都不可以,只能使用一个字面量.

// 同时对于异构类型,空白的只能放在最前面,因为如果放到后面,它将不知道应该怎么去补齐.

function f1(message : unknown){
    if(typeof message === "string"){
        return message.length
    }
}


let arr : number[] = [1,2,3,4,5]
let num = arr[100]
// num = "1"
// Type "string" is not assignable to type "number"


// 只读数组
let arr2 : ReadonlyArray<number> = [1,2,3]
// arr2[2] = 4
// 这地方就不可以修改

let arr3 : readonly number[] = [1,2,3]
// arr3[1] = 0
// readonly 不可以和泛型数组一起使用。

let arr4 : Readonly<Array<number>> = [1,2,3]
// Readonly 是TS中的工具类型，用来修饰只读类型。

// 只读数组中不能使用任何修改数组的方法，包含push pop shift unshift等等这些。
// 实际上可以使用 Readonly<T> 来定义绝大多数的只读元素。

// let temp = {
//     x:0,
//     y:0
// }
// const point : {x:number} = {x:number,y:number}

function f(x:number){
    console.log(x)
}
f.version = 1
let foo22 :{(x:number):void,version:number} = f;

// 重载函数，一般来说，TS很难对函数重载进行类型推断，

class test{
    name:"123"
}
class newTest extends test{
    otherName:"123"
}
let obj123 = new newTest()
console.log(obj123)
console.log(Object.getPrototypeOf(newTest))

function f11<T extends Boolean>(){

}
f11<true>()
f11<false>()
f11<boolean>()
// f11<string>()
// Type string does not satify the constraint "Boolean".

type someType = {
    <T>(x:T):void;
}
let getSomeType:someType;
getSomeType = function(arg){
    console.log(arg)
}

// 联合类型 和 交叉类型  的关系：
// 联合类型是满足 多个类型中的一个， 交叉类型 是满足多个类型的所有属性。

interface Clickable{
    click():void
}

interface Focusable{
    click2():void
}

type T = Clickable & Focusable;
let ts:T = {
    click(){
        console.log("1")
    },
    click2(){
        console.log("2")
    }
}
ts.click2()

let ts1:Clickable ={
    click(){

    }
}




// 交叉类型中的属性，
interface A{
    a:boolean
}
interface B{
    b:boolean
}

// A&B 等同于 下面的
type someTypes1={
    a:boolean;
    b:boolean;
}

interface A1{
    x:{a:boolean}
}
interface B1{
    x:{b:boolean}
}
// 需要指出的时候，interface 是存在接口合并的。
// A1&B1 等同于 
type someTypes2 = {
    x:{a:boolean,b:boolean}
}

