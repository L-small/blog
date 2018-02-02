### 作用域对性能的影响
作用域是理解JS的关键所在，同样作用域关系到性能。其实主要还是标识符的解析会影响到性能。而我们主要是从特别细微的地方去分析作用域的性能问题。
可能有一些地方的优化在引擎不断优化的情况下已经成效渐微，但是我觉得还是有必要去从根源了解为什么我们要这么做，

**追根溯源**

我们以下面这个函数为例

```javascript
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}
var total = add(5, 10);
```
我们先来看一下在执行add函数的时候的作用域链
![](https://ws1.sinaimg.cn/large/006FubJZgy1fnol12ro3vj30db08daeh.jpg)
可以从图中看到全局对象位于作用域的末端，活动对象位于作用域的前端

标识符解析：
当函数在执行的时候，每遇到一个变量都会去搜索执行环境的作用域链，查找同名的标识符，且搜索过程是从作用域链的头部开始。搜索的时候先以当前运行函数的活动对象开始一直到作用域链的最后，如果搜索到则使用这个标识符对应的变量，没有则为视为标识符未定义。
所以一个标识符所在的位置越深，它的读写速度越慢，由于全局变量总是存在于执行环境作用域链的最末端。所以函数中局部变量 > 全局变量。

other：
当名字相同的两个变量在作用域链的不同部分的时候，那么标识符则为最先找到的那个
```javascript
var a = 1;
function test(){
    var a = 2;
    return a;
}
test();  // a = 2
```

**最佳实践**

* 用局部变量替换全局变量
* 减少访问全局变量或者位于作用域链深处的标识符的次数
```javascript
funtion init(){
    var doc = document,
        bd = doc.body;
        
        doc.getElementById('test').onclick = function(){}
        
        bd.className = '';
}
```

</br>
</br>
**举一反三**

问：既然作用域对性能有影响，那我们有什么办法去临时改变作用域链么？
答案是有的，JS中with和try-catch是可以临时改变作用域链的。

**疑惑**

* with语句主要是为了将代码的作用域设置到同一个特定的对象中（额，这句话有点抽象啊！！别急，我们看一下追根溯源）
* 为什么都说with语句性能有问题？
* try-catch又是怎么改变作用域链的，是否有性能问题，又该怎么避免性能问题？

**追根溯源**

我们还是要找个例子，比如：
```javascript
funtion init(){
    with(document){
        var bd = body，
            links = getElementsByTagName('a');
        
        getElementById('test').onclick = function(){}
        
        bd.className = '';
    }
}
```
我们把前面的init函数改造了一下，当执行到with语句的时候，执行环境的作用域链被临时改变了，一个新的活动对象被创建，它包含了参数指定的对象的所有属性，并将新的活动对象推入作用域链的首位（这就解决了我们的第一点疑惑，所以定义with语句的目的主要是简化多次写同一个对象的工作）。如图：
![](https://ws1.sinaimg.cn/large/006FubJZgy1fnon0y60euj30c60a1wig.jpg)
可以从图中看到，第一位的是参数的对象，第二位是局部变量，第三位是全局变量。
虽然访问document对象的属性变快了，但是局部变量的访问变慢了。这就是with语句的性能问题（我们的第二点疑惑也解决了）。

try-catch同样在try代码块中发生错误的时候，会自动跳转到catch，其将异常对象推入作用域链，并将其置于作用域链的首位。同with。

**最佳实践**

* 简化catch语句的代码，最好没有局部变量的访问
```javascript
try{
    init()
} catch(error) {
    handleError(error)
}
```
由于只有一条语句，且没有对局部变量的访问，所以作用域链的临时改动并不会影响性能。

</br>
</br>
**举一反三**

问：函数的闭包也依赖作用域，那闭包有没有性能问题？
答案：有的

**追根溯源**

再来个闭包例子：
```javascript
function assignEvents() {
    var id = 'xdi9592';
    document.getElementById('save-btn').onclick = function(event) {
        saveDocument(id);
    }
}
```
当执行assignEvents函数时，就会创建包含当前环境的第一个活动对象，然后再就是全局的一个活动对象。当闭包被创建的时候，它的[[scope]]属性被初始化为前面的两个活动对象。如下图：
![](https://ws1.sinaimg.cn/large/006FubJZgy1fo1dk3r7brj30du07z42k.jpg)
通常函数执行完成之后，函数的活动对象会随着执行环境一起销毁，但是由于闭包的引用仍然存在，所以闭包中的活动对象无法销毁，因此需要更多的内存消耗，要注意内存泄漏的问题。除了这个之外，当闭包执行的时候，闭包的执行环境还会创建一个当前环境的第一活动对象，之前的两个引用再往后排，由此变成了下面的样子：
![](https://ws1.sinaimg.cn/large/006FubJZgy1fo1dqn9d8nj30ds09zdkl.jpg)
由于函数访问的id和saveDocument不在第一活动对象中，频繁的跨作用域访问标识符时，又是一次性能的损耗。

**最佳实践**

* 小心的使用闭包
* 常用的跨作用域链的变量存储在局部变量中，然后访问局部变量