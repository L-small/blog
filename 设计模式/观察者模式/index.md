## 观察者模式和发布订阅模式

* 什么是观察者模式

一个或多个观察者对目标的状态感兴趣，它们通过将自己依附在目标对象上以便注册所感兴趣的内容。目标状态发生改变并且观察者可能对这些改变感兴趣，就会发送一个通知消息，调用**每个**观察者的更新方法。当观察者不再对目标状态刚兴趣的时，他们可以简单地将自己从中分离。

  ```
  function ObserverList() {
    this.observerList = [];
  }
        
          ObserverList.prototype.add = function(obj) {
    return this.observerList.push(obj);
  };

  ObserverList.prototype.count = function() {
    return this.observerList.length;
  };

  ObserverList.prototype.get = function(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  };

  ObserverList.prototype.indexOf = function(obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }
    return -1;
  };

  ObserverList.prototype.removeAt = function(index) {
    this.observerList.splice(index, 1);
  };

  function Subject() {
    this.observers = new ObserverList();
  }

  Subject.prototype.addObserver = function(observer) {
    this.observers.add(observer);
  };

  Subject.prototype.removeObserver = function(observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  };

  Subject.prototype.notify = function(context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  };

  // The Observer
  function Observer() {
    this.update = function() {
      // ...
    };
  }
  ```



* 什么是发布订阅模式

发布订阅模式使用了一个主题/事件通道，这个通道介于希望接收到通知(订阅者)的对象和激活事件的对象（发布者）之间，该事件系统允许代码定义应用程序的自定义应用程序的**特定事件**，这些事件可以传递自定义参数，自定义参数包含订阅者所需的值。其目的是避免订阅者和发布者之间产生依赖关系。


  ```
  // 中介对象
  var pubsub = {};

  (function(myObject) {
    var topics = {};
    var subUid = -1;

    myObject.publish = function(topic, args) {
      if (!topics[topic]) {
        return false;
      }
      var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(args);
      }
      return this;
    };

    myObject.subscribe = function(topic, func) {
      if (!topics[topic]) {
        topics[topic] = [];
      }
      var token = (++subUid).toString();
      topics[topic].push({
        token: token,
        func: func
      });
      return token;
    };

    myObject.unsubscribe = function(token) {
      for (var m in topics) {
        if (topics[m]) {
          for (var i = 0, j = topics[m].length; i < j; i++) {
            if (topics[m][i].token === token) {
              topics[m].splice(i, 1);
              return token;
            }
          }
        }
      }
      return this;
    };
  })(pubsub);

  // 订阅
  pubsub.subscribe('aaa', () => {
    console.log('aaa');
  })
  // 发布
  pubsub.publish('aaa', {name: 'aaa'});
  ```

区别：

观察者模式：目标对象需要维护一系列的观察者，包括添加、删除、通知等方法。
发布订阅模式：维护观察者的操作全部由中介对象承担（事件中心），目标对象有数据变化则发布就好了，观察者只订阅相应的事件就好了，两者之间解耦。


优点：

维护了相关对象之间的一致性，无需对象间的紧密耦合，从而降低代码的耦合度。

缺点：

由于发布订阅模式解耦了发布者和订阅者，发布者并不能确保订阅者完成了任务（发生错误）。
发布者发生变化后导致的订阅者执行任务产生的成本不能保证（可能产生循环依赖，多个订阅者通知成本高）。