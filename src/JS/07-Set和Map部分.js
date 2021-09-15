// ES6中 提供了一个新的数据解构 Set. 他类似于数组,但是成员的每一个值是唯一的,没有重复的值. set本身是一个构造函数,用来生成 Set 数据解构.
const s = new Set()
let array = [2, 3, 5, 4, 5, 2, 2]
array.forEach(x => s.add(x))

for (let i of s) {
    console.log(i)
}

// set 可以用于去除重复元素 
let newArray = [...new Set(array)]
console.log(newArray)
console.log((new Set(array)).size)

// Set 的属性和方法
// 属性
let set = new Set(array)
console.log(set.size)

// 方法
set.add(10)
// add 方法返回set对象本身

console.log(set.delete(2))
// add 方法返回一个布尔值,表示删除是否成功
console.log(set)

// has 方法
console.log(set.has(5))

// clear 消除成员
set.clear()
console.log(set)

// set还有相关的迭代方法
let newSet = new Set(["Green", "Red", "Blue"])
for (let item of newSet.keys()) {
    console.log(item)
}
for (let item of newSet.values()) {
    console.log(item)
}
for (let item of newSet.entries()) {
    console.log(item)
}

console.log(Set.prototype[Symbol.iterator] === Set.prototype.values) // true
console.log(Set.prototype[Symbol.iterator] === Set.prototype.keys) // true
console.log(Set.prototype[Symbol.iterator] === Set.prototype.entries) // false

// forEach 方法：
let set2 = new Set([1, 4, 9]);
set2.forEach((value, key) => console.log(key + ' : ' + value))

// set 还可以进行 map 和 filter 操作。

// WeakSet 与 Set 类似，也不可以存放重复的值。
// 但是，它与 Set 有两个区别。首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

let a1 = [
    [1, 2],
    [3, 4]
]
let ws = new WeakSet(a1)
console.log(ws)
// 上述代码中 a1 中每一个元素都是 数组（对象） a1中的每一个元素会成为weakSet的成员。

const b1 = [1, 2]
// let ws1 = new WeakSet(b1)
// 由于 b1 的每一个元素都不是对象所以说，这个地方会报错。

// 同样的 WeakSet 中有三个方法：
// WeakSet.prototype.add(value)
// WeakSet.prototype.delete(value)
// WeakSet.prototype.has(value)

const ws2 = new WeakSet()
const obj1 = {}
const obj2 = {}
ws2.add(obj1)
ws2.add(obj2)
console.log(ws2.has(obj1))
console.log(ws2.has(obj2))

ws2.delete(obj1)
console.log(ws2.has(obj1))

ws2.delete(obj2)
console.log(ws2.has(obj2))

// WeakSet 中没有 size 也没有 forEach 等迭代方法。
// WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

// weakSet 可以用在深 copy 的地方，来防止循环引用的问题出现。

// 在 JS 中已经有 Object 这样一个东西来表示键值对了，但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。 因此引入了一个 Map 对象来解决一个 值-值的对应关系，而不是 string-值的关系。 对于 Object 来说，也是Hash的一种方式，但是对于 Map 来说 则是一种更加完善的 Hash 方式。

let map1 = new Map()
let obj3 = {}
let obj4 = {}
map1.set(obj3, "content1")
map1.set(obj4, "content2")
console.log(map1.get(obj3))
console.log(map1.get(obj4))

// 这种方式是一个个去添加的方式建立一个 Map 对象。同样的，我们可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

const map2 = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);
map2.forEach(
    (value, key) => {
        console.log(`${key}--${value}`)
    }
)
// 这个地方和 set 一样都是，第一个元素是value，第二个元素是key
// Map 同 Set 一样 具有 size 属性 具有 set get has delete clear属性。 Map 的遍历方法有 keys values entries forEach 
const map3 = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);

for (let key of map3.keys()) {
    console.log(key)
}

for (let value of map3.values()) {
    console.log(value)
}

for (let entry of map3.entries()) {
    console.log(entry)
}

for (let [key, value] of map3.entries()) {
    console.log(key, value);
}
// 对于迭代器而言，就是正常的key value了

for (let [key, value] of map3) {
    console.log(key, value);
}
console.log(map3[Symbol.iterator] === map3.entries)

// WeakMap 结构与 map 相似，也是用于生成键值对的集合。WeakMap与Map的区别有两点。
// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
// 对于上述代码，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。

// weakMap 上只有四个方法 set get has 和 delete
