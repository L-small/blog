## http协议

### http1

#### 请求格式

```javascript
  GET / HTTP/1.0
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
  Accept: */*
```

第一行是请求方式 + 请求协议，后面多行是头信息

#### 回应格式

```javascript
  HTTP/1.0 200 OK 
  Content-Type: text/plain
  Content-Length: 137582
  Expires: Thu, 05 Dec 1997 16:00:00 GMT
  Last-Modified: Wed, 5 August 1996 15:55:28 GMT
  Server: Apache 0.84

  <html>
    <body>Hello World</body>
  </html>
```

第一行是请求协议 + 状态码 + 状态描述。后面是头信息 + 空行 + 数据

#### 缺点

每次请求都要新建一次TCP请求，发送完后就关闭了TCP链接，由于建立TCP链接的成本高，并且建立初期传送数据慢，所以性能很差


### http1.1

#### 持久连接

建立TCP连接可以通过多个请求，长时间未请求或者有connection: close时关闭TCP连接。

对于同一域名，浏览器一般允许同时建立6个链接

#### 管道机制

http1.0的时候请求只能一个完事之后再发送另一个请求，1.1版本加入了管道机制，可以依次发送多个请求。但是会有队头阻塞问题，当多个请求依次请求时，第一个请求阻塞，后面的请求及时处理完毕也要等到第一个返回后再依次返回。

#### 管道机制原理

当一个TCP请求可以发送多个请求，并可以对应的返回的时候，就需要有机制来区分数据包是哪个请求的，content-length字段的作用就是来处理这个，这个字段会有个长度，超过这个长度的数据就是下一个数据包的了。
当然content-length字段不是必须的，还有另外一种机制来实现管道机制——分块传输编码，头信息有Transfer-Encoding字段则表明回应将由数量未定的数据块组成，每个块前面都有个16进制的数值，当为0时，代表本次回应完成

```javascript
  HTTP/1.1 200 OK
  Content-Type: text/plain
  Transfer-Encoding: chunked

  25
  This is the data in the first chunk

  1C
  and this is the second one

  3
  con

  8
  sequence

  0
```

### http2


#### 二进制协议

http1.1中头信息是文本，数据可以是文本或者二进制。http2则是头信息和数据都是二进制，统称为帧（包含头信息帧和数据帧）

#### 多工

针对http1中的队头阻塞问题，http2中使用了多路复用技术，即一个TCP链接传递所有请求，返回时不会受到队头阻塞问题，并解决了同一域名限制请求数的问题。


#### 数据流

由于多工的通信方式，我们需要通过对数据包进行标记，才能知道属于哪个请求和回应，每个请求或者回应的所有数据包称之为一个数据流，每个数据流都有个ID，数据包发送的时候都必须标明数据流ID。客户端发送的ID一律为奇数，服务器发送的ID一律为偶数


#### header压缩

http1使用文本的形式传输header，http2会使用头信息压缩机制，一方面头信息使用gzip或compress压缩后再发送，另一方面，客户端和服务端同时维护一份头信息表，所有字段都会存入到这里面生成一个索引号，后面有相同字段就不用发字段了，直接发索引号

#### 服务器推送

HTTP2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。可预知一些请求网页后还要再请求一些资源，可以在请求网页时，主动将这些资源随网页一起发回到客户端


参考资料：

> http://www.ruanyifeng.com/blog/2016/08/http.html