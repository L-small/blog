##typeof null

JS类型值是存在32 BIT 单元里,32位有1-3位表示TYPE TAG,其它位表示真实值，而表示object的标记位正好是低三位都是0
000: object. The data is a reference to an object.
而js里的Null 是机器码NULL空指针, (0x00 is most platforms).所以空指针引用 加上 对象标记还是0,最终体现的类型还是object..这也就是为什么Number(null)===0吧...

> http://2ality.com/2013/10/typeof-null.html