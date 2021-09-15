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
@testable
class MyTestAbleClass{

}
let some1 = new MyTestAbleClass()
console.log(some1.isTestAble)