"use strict";

var _class, _class2, _class3, _class4, _dec, _class5;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 类装饰器
var MyClass = testable(_class = function MyClass() {
  _classCallCheck(this, MyClass);
}) || _class;

function testable(target) {
  target.isTestAble = true;
} // console.log(MyClass.isTestAble)
// 如果想要给每一个实例化的对象都新增该属性的话,那么就需要对该方法的原型进行修饰了


function newTestable(target) {
  target.prototype.isTestAble = true;
}

var MyTestAbleClass = newTestable(_class2 = function MyTestAbleClass() {
  _classCallCheck(this, MyTestAbleClass);
}) || _class2;

var some1 = new MyTestAbleClass();
console.log(some1.isTestAble); // 方法的装饰

var Person = (_class3 = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "name",
    value: function name() {
      return "".concat(this.first, " ").concat(this.second);
    }
  }]);

  return Person;
}(), (_applyDecoratedDescriptor(_class3.prototype, "name", [readonly], Object.getOwnPropertyDescriptor(_class3.prototype, "name"), _class3.prototype)), _class3);

function readonly(target, name, descriptor) {
  // descriptor 对象原来的值如下所示.
  // {
  //     value:someValue,
  //     enumerable:false,
  //     configurable:true,
  //     writable:true
  // }
  descriptor.writable = false;
  return descriptor;
} // 装饰器函数的第一个参数是类的原型对象,上例是Person.prototype, 装饰器的本意是要"装饰"类的实例,但是这个时候实例还没有产生,所以只能去装饰原型. 第二个参数是所要装饰的属性名,第三个是该属性的描述对象.
// 最后被修改的返回值对象可以用来修饰对象.


var Math = (_class4 = /*#__PURE__*/function () {
  function Math() {
    _classCallCheck(this, Math);
  }

  _createClass(Math, [{
    key: "add",
    value: function add(a, b) {
      return a + b;
    }
  }]);

  return Math;
}(), (_applyDecoratedDescriptor(_class4.prototype, "add", [log], Object.getOwnPropertyDescriptor(_class4.prototype, "add"), _class4.prototype)), _class4);

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log("Calling ".concat(name, " with"), arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

var math = new Math();
math.add(1, 2); // 装饰器实现防抖与节流
// 防抖

function debounce(delay) {
  return function (target, key, descriptor) {
    var oldValue = descriptor.value;
    var timer = null;

    descriptor.value = function () {
      var _arguments = arguments,
          _this = this;

      clearTimeout(timer);
      timer = setTimeout(function () {
        oldValue.apply(_this, _arguments);
      }, delay);
    };

    return descriptor;
  };
} // 节流


function throttle(delay) {
  return function (target, key, descriptor) {
    var oldValue = descriptor.value;
    var timer = null;

    descriptor.value = function () {
      var arg = arguments;
      var context = this;

      if (!timer) {
        timer = setTimeout(function () {
          oldValue.apply(context, arg);
          clearTimeout(timer);
        }, delay);
      }
    };

    return descriptor;
  };
}

var test = (_dec = throttle(2000), (_class5 = /*#__PURE__*/function () {
  function test() {
    _classCallCheck(this, test);
  }

  _createClass(test, [{
    key: "someLog",
    value: function someLog() {
      console.log("test");
    }
  }]);

  return test;
}(), (_applyDecoratedDescriptor(_class5.prototype, "someLog", [_dec], Object.getOwnPropertyDescriptor(_class5.prototype, "someLog"), _class5.prototype)), _class5));
var some11 = new test();
var count = 100000;

while (count--) {
  some11.someLog();
}