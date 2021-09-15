// Proxy 可以理解为在目标对象之前设置一层“拦截”，外界对该对象的访问，都必须通过该拦截。因此提供了一种拦截，可以对外界的访问进行过滤和改写。Proxy一词的意思是代理，用在表示由它“代理”某些操作。可以翻译为“代理
let obj = new Proxy({},{
    get: function(target,propKey,receiver){
        console.log(`Getting ${propKey}`)
        return Reflect.get(target,propKey,receiver)
    },
    set:function(target,propKey,value,receiver){
        console.log(`Setting ${propKey}`)
        return Reflect.set(target,propKey,value,receiver)
    }
})
obj.count = 1
++obj.count


// var proxy = new Proxy(target, handler);
var proxy = new Proxy({}, {
    get: function(target, propKey) {
      return 35;
    }
  });
  
  proxy.time // 35
  proxy.name // 35
  proxy.title // 35

//   Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

// 需要注意的是如果想要使得拦截器起到作用，必须直接作用到拦截器上，而不能是作用到原始对象上。如果handler不存在时候，我们就会直接调用到对象本身。