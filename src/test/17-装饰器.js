// 类装饰器
@testable
class MyClass{

}
function testable(target){
    target.isTestAble = true
}

// console.log(MyClass.isTestAble)

// 如果想要给每一个实例化的对象都新增该属性的话,那么就需要对该方法的原型进行修饰了
function newTestable(target){
    target.prototype.isTestAble = true
}
@newTestable
class MyTestAbleClass{

}
let some1 = new MyTestAbleClass()
console.log(some1.isTestAble)

// 方法的装饰
class Person{
    @readonly
    name(){
        return `${this.first} ${this.second}`
    }
}
function readonly(target,name,descriptor){
    // descriptor 对象原来的值如下所示.
    // {
    //     value:someValue,
    //     enumerable:false,
    //     configurable:true,
    //     writable:true
    // }
    descriptor.writable = false
    return descriptor
}

// 装饰器函数的第一个参数是类的原型对象,上例是Person.prototype, 装饰器的本意是要"装饰"类的实例,但是这个时候实例还没有产生,所以只能去装饰原型. 第二个参数是所要装饰的属性名,第三个是该属性的描述对象.
// 最后被修改的返回值对象可以用来修饰对象.

class Math{
    @log
    add(a,b){
        return a+b
    }
}
function log(target,name,descriptor){
    var oldValue = descriptor.value
    descriptor.value = function(){
        console.log(`Calling ${name} with`, arguments)
        return oldValue.apply(this,arguments)
    }
    return descriptor
}
const math = new Math()
math.add(1,2)

// 装饰器实现防抖与节流
// 防抖
function debounce(delay){
    return  function(target,key,descriptor){
        const oldValue = descriptor.value
        let timer = null
        descriptor.value = function(){
            clearTimeout(timer)
            timer = setTimeout(()=>{
                oldValue.apply(this,arguments)
            },delay)
        }
        return descriptor
    }
}

// 节流
function throttle(delay){
    
    return function(target,key,descriptor){
        const oldValue = descriptor.value
        let timer = null
        descriptor.value = function(){
            let arg = arguments
            let context = this
            if(!timer){
                timer = setTimeout(()=>{
                    oldValue.apply(context,arg)
                    clearTimeout(timer)
                },delay)
            }
        }
        return descriptor
    }
}
class test{
    @throttle(2000)
    someLog(){
        console.log("test");
    }
}

let some11 = new test()
let count = 100000
while(count--){
    some11.someLog()
}
