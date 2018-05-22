## BFC定义：

BFC(Block Formatting context)，块级格式上下文，是一种布局方式。这种布局方式是，盒子们在所在的container block顶部一个接一个的垂直排列，水平方向上撑满整个宽度，两个相邻BFC之间的距离由margin决定。相当于黑盒，里面怎么改动也不会影响外面。

在同一个BFC内，两个垂直方向相邻的块级元素的margin会发生塌陷。解决办法是：这两个块级元素也创建BFC

<br>

## 如何创建BFC

* float属性不为none

* overflow属性不为visible

* position为absolute或者fixed

* display为table-cell、table-caption、inline-block、flex、inline-flex

<br>

## BFC布局规则

* 内部的Box会在垂直方向上一个接一个的放置

* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会重叠

* 每个元素的margin box的左边，与包含块的border box的左边相接触。即使存在浮动也是这样

* BFC的区域不会与float box重叠

* BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

* 计算BFC高度的时候，浮动元素也参与计算

## BFC的作用

1、清楚内部浮动(浮动元素，父元素高度塌陷)

2、margin边距重叠（）

重叠规则：

* 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

* 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

* 两个外边距一正一负时，折叠结果是两者的相加的和。

3、创建自适应两列布局

![](http://ww1.sinaimg.cn/large/006FubJZgy1frkjkt5tvrj30i60c8wi8.jpg)


参考资料

> http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html

> https://www.jianshu.com/p/acf76871d259
