## JS变量对象

### 前言

如果变量和执行上下文相关，变量自己知道它的数据存储在哪里，并且知道如何访问，这种机制称为变量对象。

变量对象存储着在上下文中声明的以下内容：函数的形参（arguments）、变量、函数声明

当调用一个函数或者进入代码的时候，一个新的执行上下文就会被创建，一个执行上下文的声明周期可以分为两个阶段：

* 创建阶段
* 代码执行阶段

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpagxfegnwj30rs0823z6.jpg)

### 变量对象

变量对象的创建过程：（解释变量提升）

* 建立arguments对象，检查当前上下文的参数，建立该对象下的属性和属性值
* 检查当前上下文的函数声明，也就是function关键字声明的函数，在变量对象中以函数名创建一个属性，属性值指向该函数所在内存地址的引用。如果函数名属性已存在，该属性将会被新的引用覆盖(所有函数声明)
* 检查当前上下文的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。如果该变量名的属性已存在，则会跳过，原属性值不改变（所有变量声明）。

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpagxt5qd0j30jh09qmxh.jpg)

变量对象的创建过程决定了：函数的声明比变量声明的优先级更高一点

    var a;              // 变量声明
    function a() {      // 函数声明
        alert(123)
    }

    console.log(typeof a)  // function


### 变量对象和活动对象的区别：

在执行上下文的创建阶段，变量对象的属性都是不可访问的，进入执行上下文阶段，变量对象变成了活动对象，属性都可以访问，并进行执行阶段的操作，他们都是同一个对象，只是处在了执行上下文的不同生命周期。

例子：

    function test1() {
        console.log(a)
        console.log(foo())

        var a = 1;
        function foo() {
            return 2;
        }
    }
    test1()
    // undefined
    // 2

创建的过程：

    test1EC = {
        VO(变量对象): {},   	// 创建变量对象
        scopeFun: {},		// 创建作用域链
        this: {}			// 确定this指向
    }

    VO= {
        arguments: {...},
        foo: (函数foo的地址引用),
        a: undefined
    }
当进入执行阶段的时候

    AO = {
        arguments: {...},
        foo: (函数foo的地址引用),
        a: 1
    }

例子：

    function test() {
        console.log(foo);
        console.log(bar);

        var foo = 'Hello';
        console.log(foo);
        var bar = function () {
            return 'world';
        }

        function foo() {
            return 'hello';
        }
    }
    结果：
    test()
    foo() {
        return 'hello';
    }
    // undefined
    // Hello


### 全局上下文中的变量对象

全局上下文的变量对象初始阶段就有Math、String等作为自身属性，正常情况下全局对象不能通过名称直接访问，我们可以通过全局上下文的this或者递归引用自身，例如：DOM中的window

    String(10);  // 就是global.String(10)

    // 带有前缀：

    window.a = 10  // === global.window.a = 10 === global.a = 10
    this.b = 20   // global.b = 20

在全局上下文中，变量对象就是全局对象自己

    VO(globalContext) === global;


### 引申：关于变量

看一下这个例子:

    alert(a)   // undefined
    alert(b)   // b is not defined

    b = 10
    var a = 20;

此时全局上下文：

    VO = {
        a: undefined
    }


为什么a是undefined而b是没有声明，这是因为在JS中，变量只能通过var关键字声明，所以在全局变量对象中并没有b的属性（不是变量声明），等到执行阶段才会出现b

    b = 10;
    alert(b); // 10, 代码执行阶段创建

<br>

参考资料：

> http://www.cnblogs.com/lsgxeva/p/7976034.html

> http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html