## Promise

Promise对象是一个容器（里面报错并不会影响外面代码的执行），里面通常是异步操作。Promise对象内是同步的，then、catch是异步的。

Promise有三个状态：

* pending 初始状态

* fulfilled 操作成功

* rejected 操作失败

Promise有两个特点：

* 状态的变化不受外界影响，只有异步结果决定

* 状态一旦变化不会再改变


Promise then和catch还可以返回Promise对象，但是返回的是另一个Promise对象。所以可以链式调用。catch放到最后可以接收前面报错。

![](http://ww1.sinaimg.cn/large/006FubJZly1g6ddm8sx9uj310k0euach.jpg)

Promise.finally() 不管Promise对象状态如何都会执行，但是不会有参数值

Promise.all() 将多个Promise包装成一个Promise实例，参数必须有Iterator接口，如果说参数有catch语句，报错了就不会进入到all的catch里，因为参数执行完自己的catch语句则认为状态结束了，所以进入的是then。

Promise.race() 有一个状态变化就结束，参数和all一样，可以用于请求超时（有一个设定时间的定时器，返回一个状态）。

all和race如果参数不是promise实例的话也会通过Promise.resolve方法转为Promise实例

Promise.resolve() 和 Promise.reject() 都会将返回一个Promise实例，可以将不是Promise实例的转化为Promise实例，后者的参数会原封不动的成为其后续方法的参数。

  ```
    setTimeout(() => {
      console.log(1);
    }, 0);

    Promise.resolve().then(() => {
      console.log(2);
    });

    console.log(3);

    //3 2 1
  ```

立即resolve()的Promise对象是在本轮事件循环的结束时执行，而不是下一轮事件循环开始时。


参考资料：

> http://es6.ruanyifeng.com/#docs/module