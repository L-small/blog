在JS中数据的存储位置会影响其读取速度，幸好JS只有几种存储方案。
* 字面量
    字面量主要有：String、Number、Boolean、Object、Array、function、RegExp、null、undefined
* 本地变量
    使用var定义的数据的存储单元
* 数组元素
    存储在JS数组对象内部，以数字为索引
* 对象成员
    存储在JS对象内部，以字符串作为索引
一般情况下，字面量和本地变量的存取差异不大，数组元素和对象成员相对比较耗时，但其实在现在的浏览器里，这些差距微乎其微了。


### 作用域对性能的影响
作用域是理解JS的关键所在，同样作用域关系到性能。其实主要还是标识符的解析会影响到性能。

我们以下面这个函数为例

` function add(num1, num2) {

    var sum = num1 + num2;

    return sum;

}

var total = add(5, 10);`




