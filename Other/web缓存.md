## web缓存

### 1、缓存基本认识

缓存是提高页面访问速度的一个很好的方式，优秀的缓存策略可以减少延迟，缩短网页请求时间，减少带宽。

缓存可以分为：强缓存和协商缓存

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdlzifsvrj30d70fr3yt.jpg)

<br>

### 2、强缓存：

通过控制台可以看到，http状态为200，size显示from cache的请求是命中了强缓存的请求。

强缓存主要是Expires或者Cache-Control这两个response header实现的，他们都是表示资源在客户端缓存的有效期，Cache-Control的优先级高于Expires，两个header可同时存在

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdmbl30xij30m805jjsi.jpg)

#### 1) Expires

是http1.0提出的一个表示资源过期时间的header，过期时间是一个绝对时间，用GMT格式字符串表示，如：Expires:Thu, 31 Dec 2037 23:55:55 GMT

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdmc8uk8sj30ai04yt8s.jpg)

* 过程：

（1）浏览器第一次向服务器请求一个资源，服务器在返回这个资源的同时，在response header上加上Expires的header

（2）浏览器接收到这个资源的时候，会把这个资源连同所有response header一起缓存下来

（3）浏览器再次请求这个资源时，先从缓存中查找这个资源，找到后再和它的Expires跟当前本地时间作比较，如果在Expires指定时间前，则命中缓存

（4）如果没命中缓存，则请求服务器获取资源，并更新Expires Header

* 缺点：由于Expires返回的是一个绝对时间，修改本地时间会影响缓存命中的结果。

#### 2） Cache-Control

是http1.1提出的一个表示资源过期时间的header，过期时间是一个相对时间，以秒为单位，用数值表示，如：Cache-Control:max-age=315360000

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdmovipqwj30fb04vaa6.jpg)

* 过程：

（1）浏览器第一次向服务器请求一个资源，服务器在返回这个资源的同时，在response header上加上Cache-Control的header

（2）浏览器接收到这个资源的时候，会把这个资源连同所有response header一起缓存下来

（3）浏览器再次请求这个资源时，先从缓存中查找这个资源，找到后再通过第一次请求时间和Cache-Control设定的有效期计算出资源过期时间，这个时间跟当前本地时间作比较，如果在过期时间前，则命中缓存

（4）如果没命中缓存，则请求服务器获取资源，并更新Cache-Control Header

<br>

### 3、协商缓存

http状态码是304，并显示Not Modified，则是命中了协商缓存

协商缓存主要是通过[Last-Modified，If-Modified-Since]和[ETag，If-None-Match]这两对header来管理

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdols45qrj30m805bmyn.jpg)

#### 1） [Last-Modified，If-Modified-Since]

* 过程：

（1）浏览器第一次向服务器请求一个资源，服务器在返回这个资源的同时，在response header里加上Last-Modified，这个表示这个资源在服务器上最后的修改时间

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdomb1desj30bm04tq31.jpg)

（2）浏览器再次向服务器请求这个资源时，在request header上加上If-Modified-Since，这个值就是上次请求response的Last-Modified的值

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdomhzvaaj30ng06adgb.jpg)

（3）服务器收到请求时，根据传过来的If-Modified-Since和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回304 Not Modified，但是服务器不会返回资源内容。当返回了304 Not Modified时，response中不会再添加Last-Modified，因为资源没有变化，Last-Modified也不会变化

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdomsemw2j30ak02wq2w.jpg)

（4）浏览器收到304响应后，从浏览器缓存中加载资源

（5）如果协商缓存没有命中，则从服务器中加载资源，Last-Modified在重新加载的时候会更新，并通过response header返回回去

* 缺点：一般很可靠，但是也会有服务器资源发生变化，但是最后修改时间却没有变化的情况

#### 2） [ETag，If-Modified-Since]

* 过程：

（1）浏览器第一次请求服务器资源时，服务器返回资源的同时，在response header里加上ETag，这个值是当前资源的唯一的标识，只要资源有变化，ETag就会变化

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdon1pm72j30b204t0su.jpg)

（2）浏览器再次请求这个资源的时候，在request header上加上If-None-Match，这个值就是上次请求返回的ETag的值

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdon6jvogj30mu06474s.jpg)

（3）服务器收到资源请求时，服务器会再生成一个新的ETag和传来的If-None-Match作比较，如果相同则命中缓存，返回304 Not Modified，不返回资源内容，并将ETag返回回去，即使没有变化。如果不相同，则返回资源内容。

![](http://ww1.sinaimg.cn/large/006FubJZgy1frdonb04rdj30ae030weg.jpg)