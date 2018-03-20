## JS的指向

![](http://ww1.sinaimg.cn/large/006FubJZgy1fpagxfegnwj30rs0823z6.jpg)

还记得执行上下文的生命周期吗？执行上下文在创建阶段的时候确定了this的指向。而执行上下文在函数被调用的时候创建的，同一个函由于调用方式的不同，this的指向也会不同。

### 函数中的this

在一个函数上下文中，this是由调用者提供，由调用函数的方式来决定。如果调用者函数被一个对象拥有，那该函数在调用的时候，内部的this指向该对象。如果函数独立调用，那么该函数内部的this则指向undefined，但是在非严格模式中，当this指向undefined时，他会指向全局对象。

    //demo1
    var a = 20;
    function fn() {
        console.log(this.a);
    }
    fn();   // 独立调用
    
    //demo2
    var a = 20;
    function fn() {
        function foo() {
            console.log(this.a);
        }
        foo();
    }
    fn();   // 独立调用
    
    //demo3
    var a = 20;
    var obj = {
        a: 10,
        c: this.a + 20,
        fn: function () {
            return this.a;
        }
    }

    console.log(obj.c);     // 由于是属性，不遵循函数的性质，所以this指向window
    console.log(obj.fn());  // 被obj对象拥有

由于obj是在全局声明，无论obj.c在什么地方调用，这里的this都指向全局变量，而当obj在函数环境中声明时，这个this指向undefined，在非严格模式下指向window，如下：

    //demo4
    var a = 20;
    function foo () {
        var a = 1;
        var obj = {
            a: 10, 
            c: this.a + 20,
            fn: function () {
                return this.a;
            }
        }
        return obj.c;

    }
    console.log(foo())      // 40

再看下面几个例子加深一下印象：

    //demo5
    var a = 20;
    function getA() {
        return this.a;
    }
    var foo = {
        a: 10,
        getA: getA
    }
    console.log(foo.getA());  // 10

    //demo6
    function foo() {
        console.log(this.a)
    }

    function active(fn) {
        fn(); // 真实调用者，为独立调用
    }

    var a = 20;
    var obj = {
        a: 10,
        getA: foo
    }

    active(obj.getA);

再来看一下setTimeout：

    var obj = {
        a: 20,
        getA: function() {
            setTimeout(function() {
                console.log(this.a)
            }, 1000)
        }
    }

    obj.getA();     // undefined

由于匿名函数导致的this指向undefined，非严格模式下指向window，如果想保存this可以通过bind和闭包与apply方法
    
### 使用call、apply指定this

call和apply的第一个参数都是this将要指向的对象。比如：

    //demo7
    var foo = {
        name: 'joker',
        showName: function() {
        console.log(this.name);
        }
    }
    var bar = {
        name: 'rose'
    }
    foo.showName.call(bar); // rose
    
    //demo8
    var Person = function(name, age) {
        this.name = name;
        this.age  = age;
        this.gender = ['man', 'woman'];
    }

    // 定义子类的构造函数
    var Student = function(name, age, high) {

        // use call
        Person.call(this, name, age);
        this.high = high;
    }
    Student.prototype.message = function() {
        console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
    }

    new Student('xiaom', 12, '150cm').message();    //name: xiaom, age: 12, high: 150cm, gender: man

 
 ### 构造函数与原型方法上的this

    function Person(name, age) {
        this.name = name;
        this.age = age;   
    }

    Person.prototype.getName = function() {
        return this.name;
    }

    var p1 = new Person('Nick', 20);
    p1.getName();     // Nick

通过new操作符调用构造函数会经历4个阶段

* 创建一个新的对象

* 将构造函数的this指向这个对象

* 指向构造函数的代码，为这个对象添加属性、方法等

* 返回新对象

当new操作符调用构造函数的时候，this指向的是新创建的对象，最后又将新的对象返回出来给了实例对象p1，所以构造函数的this指向了新的实例对象p1。原型方法上的this由于是p1.getName()调用，被p1对象拥有的方法，所以this指向p1


<br>

参考资料：

> http://www.cnblogs.com/lsgxeva/p/7976091.html