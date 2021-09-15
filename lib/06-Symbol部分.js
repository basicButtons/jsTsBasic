"use strict";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Symbol.for()
var s1 = Symbol["for"]("foo");
var s2 = Symbol["for"]("foo");
console.log(s1 === s2);
console.log(s1); // Symbol.for 不同于一般的Symbol，这个是对于一个字符串生成一个Symbol，如果该字符串已经有了Symbol值，那么我们就再生成一个。
// Symbol.for() 与 Symbol() 两种写法都会生成新的Symbol。他们的区别是，前者会被登记在全局环境中以供搜索，但是后者则不会去被搜索。
// Symbol.for()不会每次调用都会去返回一个新的Symbol类型的值，二十会先去检查给定的 key 是否存在，如果不存在才会新建一个值。
// 比如 执行30次 Symbol.for("cat") 都只会只有一个Symbol值, 但是执行30次 Symbol("cat") 则只会返回30个完全不同的 Symbol 值
// 这个地方就有用到单例模式。
// 单例模式等待有后续实现。

var SingleItem = function () {
  var instance;

  var getObject = function getObject(name, age) {
    this.name = name;
    this.age = age;
  };

  return function (name, age) {
    return instance || (instance = new getObject(name, age));
  };
}();

var obj1 = SingleItem("mx", 20);
var obj2 = SingleItem("mx", 21);
console.log(obj1 === obj2); // 对其进行解耦,将单例写成一个装饰器. 芜湖,我好像想把一切东西都解构出来,然后弄成装饰器然后调用哦哦哦.

var single = function single(func) {
  _classCallCheck(this, single);

  this.instance = void 0;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.instance || (this.instance = _construct(func, args));
  };
};

var GetObject = function GetObject(name, age) {
  _classCallCheck(this, GetObject);

  this.name = name;
  this.age = age;
};

var singleObject = new single(GetObject);
var objs1 = new singleObject("mx", 20);
var objs2 = new singleObject("mx", 21);
console.log(objs1 === objs2);