### 一、为什么JS是单线程

是由JS的用途决定的，其用途主要是与用户互动，以及操作DOM，如果不是单线程的话会带来很复杂的同步问题。比如：如果是多线程的话，一个用户新建一个DOM，另一个用户删除同一个DOM，该如何处理将变得非常麻烦。

在html5中提出了web worker（todo 改天添加web worker的讲解）标准，JS可以创建多个线程或者是iframe，但是其他子线程主要是用来进行JS计算不能操作DOM，且受到子线程的控制。所以也并没有改变JS单线程的本质

### 二、同步和异步

由于是单线程，所有任务需要排队，但是如果队列中所有的任务都是同步的话会造成资源的浪费。

于是任务分为两类：同步任务和异步任务。

异步任务的过程：

    主线程（函数调用栈）发起一个异步请求，相应的工作线程接收请求，并告知主线程已经收到，主线程继续执行后面的同步代码，同时工作线程执行异步任务，工作线程完成工作后，通知主线程，主线程收到通知后，执行回调函数

### 三、宏任务和微任务

宏任务（micro-task）主要是：script代码段、setTimeout、setInterval、Promise的构造函数是同步的、setImmediate、I/O、UIrendering
微任务（macro-task）主要是：Promise的回调、process.nextTick

### 四、任务队列和事件循环

了解任务队列之前，先了解一下任务源，我们将发起异步任务的称之为任务源（setTimeout、Promise等），进入任务队列的是他们指定的任务。

在一个线程中，事件循环是唯一的，任务队列是多个的。来自不同任务源的队列进入到不同的任务队列，setTimeout和setInterval是同源的

**事件循环的步骤：**

    1、运行主线程（函数调用栈）中的同步任务
    2、主线程（函数调用栈）执行到任务源时，通知相应的webAPIs进行相应的执行异步任务，将任务源指定的异步任务放入任务队列中
    3、主线程（函数调用栈）中的任务执行完毕后，然后执行所有的微任务，再执行宏任务，找到一个任务队列执行完毕，再执行所有的微任务
    4、不断执行第三步

> 事件循环：指主线程重复从任务队列中取消息，执行的过程

先来一个简单的例子：

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

因为promise的构造函数是同步的，promise.then是异步的微任务，所以promise beigin先于end

根据上面对宏任务和微任务的分析，其输出的情况为【promise begin——end——then begin——begin】


再来一个复杂点的，我们来一步一步的分析一个例子来看：

    console.log('golb1');

    setTimeout(function() {
        console.log('timeout1');
        process.nextTick(function() {
            console.log('timeout1_nextTick');
        })
        new Promise(function(resolve) {
            console.log('timeout1_promise');
            resolve();
        }).then(function() {
            console.log('timeout1_then')
        })
    })

    setImmediate(function() {
        console.log('immediate1');
        process.nextTick(function() {
            console.log('immediate1_nextTick');
        })
        new Promise(function(resolve) {
            console.log('immediate1_promise');
            resolve();
        }).then(function() {
            console.log('immediate1_then')
        })
    })

    process.nextTick(function() {
        console.log('glob1_nextTick');
    })

    new Promise(function(resolve) {
        console.log('glob1_promise');
        resolve();
    }).then(function() {
        console.log('glob1_then')
    })

    setTimeout(function() {
        console.log('timeout2');
        process.nextTick(function() {
            console.log('timeout2_nextTick');
        })
        new Promise(function(resolve) {
            console.log('timeout2_promise');
            resolve();
        }).then(function() {
            console.log('timeout2_then')
        })
    })

    process.nextTick(function() {
        console.log('glob2_nextTick');
    })

    new Promise(function(resolve) {
        console.log('glob2_promise');
        resolve();
    }).then(function() {
        console.log('glob2_then')
    })

    setImmediate(function() {
        console.log('immediate2');
        process.nextTick(function() {
            console.log('immediate2_nextTick');
        })
        new Promise(function(resolve) {
            console.log('immediate2_promise');
            resolve();
        }).then(function() {
            console.log('immediate2_then')
        })
    })


一、第一步、首先执行宏任务script。全局入栈。输出glob1

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpha35x5lej30yg0fut9h.jpg)

二、遇到setTimeout，作为任务源，将指定的任务加入宏任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpha5ef94yj30yg0fodgr.jpg)

三、遇到setImmediate，作为任务源，将指定的任务加入宏任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpha6yakiaj30yg0gj0tt.jpg)

四、遇到process.nextTick，作为任务源，将指定的任务加入微任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpha7r6xfjj30yg0gijsm.jpg)

五、遇到Promise的构造函数，进入执行栈，输出glob1_promise，Promise.then()作为任务源，将指定的任务加入微任务

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphauyyvepj30yg0fmdh3.jpg)

六、遇到setTimeout，作为任务源，将指定的任务加入宏任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphav52u3dj30yg0fwwft.jpg)

七、遇到process.nextTick，作为任务源，将指定的任务加入微任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphavdazftj30yg0gaabf.jpg)

八、遇到Promise的构造函数，进入执行栈，输出glob2_promise，Promise.then()作为任务源，将指定的任务加入微任务

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphavjxjkhj30yg0fujsu.jpg)

九、遇到setImmediate，作为任务源，将指定的任务加入宏任务队列

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphavru2hdj30yg0g6q4g.jpg)

十、执行所有微任务队列，输出glob1_nextTick和glob2_nextTick、glob1_then、glob2_then

![](http://ww1.sinaimg.cn/large/006FubJZgy1fphaw1fbi4j30yg0gswfn.jpg)

十一、循环执行宏任务队列，执行setTimeout队列、由于遇到promise、process.nextTick等任务源，将新的微任务添加到队列中，然后执行完setTimeout队列后，再将刚添加进去的微任务全部执行，然后再执行setImmediate，依次循环下去




**事件机制其实就是异步任务的通知机制**


参考资料：

> https://segmentfault.com/a/1190000004322358

> http://www.ruanyifeng.com/blog/2014/10/event-loop.html

> https://zhuanlan.zhihu.com/p/33127885

> https://segmentfault.com/a/1190000012806637

> https://www.cnblogs.com/nullcc/p/5841182.html