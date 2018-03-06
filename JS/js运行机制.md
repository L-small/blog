### 一、为什么JS是单线程

是由JS的用途决定的，其用途主要是与用户互动，以及操作DOM，如果不是单线程的话会带来很复杂的同步问题。比如：如果是多线程的话，一个用户新建一个DOM，另一个用户删除同一个DOM，该如何处理将变得非常麻烦。

在html5中提出了web worker（todo 改天添加web worker的讲解）标准，JS可以创建多个线程或者是iframe，但是其他子线程主要是用来进行计算不能操作DOM，且受到子线程的控制。所以也并没有改变JS单线程的本质

### 任务队列

由于是单线程，所有任务需要排队，但是如果队列中所有的任务都是同步的话会造成资源的浪费。

于是任务分为两类：同步任务和异步任务。


异步任务的过程：

    主线程发起一个异步请求，相应的工作线程接收请求，并告知主线程已经收到（异步函数返回），主线程继续执行后面的同步代码，同事工作线程执行异步任务，工作线程完成工作后，通知主线程，主线程收到通知后，执行回调函数

**运行机制：**

    1、运行主线程中的同步任务
    2、主线程执行到异步任务的发起函数（注册|定义的函数），通知相应的webAPIs进行相应的执行异步任务，将异步任务运行结果的通知放入任务队列中
    3、主线程中的任务执行完毕后，读取任务队列中的消息，放入主线程中执行
    4、不断执行第三步

> 消息：指注册异步任务时添加的回调函数

> 任务队列：指存放消息的队列

> 事件循环：指主线程重复从任务队列中取消息，执行的过程

![](http://ww1.sinaimg.cn/large/006FubJZgy1fp3iau1x7dj30i10a174m.jpg)
![](http://ww1.sinaimg.cn/large/006FubJZgy1fp2f66t1nmj30gb0iwq3v.jpg)

可以看到第二张图中还有macro-task（宏任务）和micro-task（微任务）

* macro-task：setTimeout、setInterval
* micro-task：Promise、process.nextTick

在运行机制的第二条中，将异步任务运行结果放入到任务队列中是会区分一下任务类型，分为宏任务和微任务。他们的区别是当主进程执行完成后，会先调用微任务进入主进程执行，执行完后再调用宏任务进入主线程执行。

    setTimeout(() => {
        console.log('begin')
    })

    new Promise((resolve) => {
        console.log('promise begin')
        for(let i = 0; i < 1000; i++) {
            i == 999 && resolve()
        }
    }).then(() => {
        console.log('then begin')
    })

    console.log('end')

根据上面对宏任务和微任务的分析，其输出的情况为【promise begin——end——then begin——begin】而不是【promise begin——end——then begin——begin】

### 异步与事件

任务队列中的每条消息都对应着一个事件，我们来看一下比较常见的几种异步任务：

#### 1、DOM事件

    let button = document.getElementById('#btn')
    button.addEventListener('click', (e) => {
        console.log()
    })

addEventListener函数就是异步任务的发起函数，事件监听器函数是异步任务的回调函数。当用户完成点击操作的时候，表示在浏览器的其他线程完成异步任务完成，将异步任务的回调（事件监听器函数）封装成消息放入任务队列，等待主线程执行

#### 2、SetTimeout

setTimeout(fn, 1000)可以看成是timer.addEventListener('timeout', 1000, fn)。
也是一个类似的事件

#### 3、Ajax

    $.ajax(url, (res) => {})

主线程发起ajax请求后，会继续执行主线程中的同步任务。当拿到响应后，会把响应封装成消息（这里是一个JS对象）

    var message = function() {
        callbackFn(res)
    }

callbackFn就是注册时的回调函数

**事件机制其实就是异步任务的通知机制**


参考资料：

* https://segmentfault.com/a/1190000004322358
* http://www.ruanyifeng.com/blog/2014/10/event-loop.html
* https://zhuanlan.zhihu.com/p/33127885
* https://segmentfault.com/a/1190000012806637