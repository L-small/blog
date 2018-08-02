问题描述：

正常情况：
![](http://ww1.sinaimg.cn/large/006FubJZly1ftvh9cto90j30ej0pumzh.jpg)

IOS下：
![](http://ww1.sinaimg.cn/large/006FubJZly1ftvha1h5lkj30ej0pun23.jpg)

解决方法：

当点击输入框的时候或者input事件监听的时候将fixed改为absolute定位，并且父级元素一直到html都设置height:100%。