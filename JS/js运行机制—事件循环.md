### 一、为什么JS是单线程

是由JS的用途决定的，其用途主要是与用户互动，以及操作DOM，如果不是单线程的话会带来很复杂的同步问题。比如：如果是多线程的话，一个用户新建一个DOM，另一个用户删除同一个DOM，该如何处理将变得非常麻烦。

在html5中提出了web worker（todo 改天添加web worker的讲解）标准，JS可以创建多个线程或者是iframe，但是其他子线程主要是用来进行计算不能操作DOM，且受到子线程的控制。所以也并没有改变JS单线程的本质

### 任务队列


![](http://ww1.sinaimg.cn/large/006FubJZgy1fp2f66t1nmj30gb0iwq3v.jpg)