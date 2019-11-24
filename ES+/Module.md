## Module

  es6的模块是在编译时加载，模块会自动采用严格模式

### export

  export常见写法，导出的接口是要与其有动态绑定关系，可以取到内部模块实时的值

    ``` js
    export var a = 1;
    export function app(){};
    const name;
    export name = 1;
    export { name, test };
    export { name as newName };
    ```

### import

  import常见写法，因为被引擎静态分析所以有提升效果（在编译阶段执行），提升到整个模块的头部首先执行。多次重复也只执行一次

    ``` js
    import { name } from '';
    import { name as newName } from '';

    // 整体加载
    import * as newName from '';

    ```

### export default

  default模块中只能有一个。其实相当于把值赋值给default然后导出

    ``` js
    export default function () {}
    import newName from '';

    export default function app() {}
    import newNaem from '''

    // 相当于default变量为1
    export default 1;
    ```

### 模块传递

  ``` js
  export { foo, bar } from '';
  // 相等于
  import { foo, bar } from '';
  export { foo, bar };

  // 默认接口
  export { default } from '';

  // 整体输出
  export * from '';
  ```

### import()

  import()运行时加载模块，返回值是个Promise，类似node的require方法，区别是前者是异步加载，后者是同步

    ``` js
    if() {
      import('.js');
    }

    // 动态路径
    function path() {};
    import(path());

    // 模块加载成功后，模块作为一个对象当做then的方法，可以通过解构赋值
    import('xxx.js').then({ name, bar })

    // 有default输出时
    import('xxx.js').then(myModule => {
      myModule.default;
    })
    ```

  像vue-router中的懒加载就是通过import()来动态加载的


  ``` js
    component: () => import('a.js')
  ```
  
<br>

### 与CommonJS的差别

CommonJS模块的输出是值的拷贝（只在运行时加载一次，然后缓存结果，后面取缓存结果）
ES模块输出的是值的引用

由于CommonJS是值的拷贝，向下面这种情况

  ``` javascript
    // a.js
    let a = 0;
    const add = () => {
      a++;
    }
    module.exports = {
      a,
      add
    }
    // b.js
    const data = require('a.js');
    data.add();
    console.log(data.a)  //0;

    //这样修改才可以，a就是取值器，es6模块就是用取值器的方式
    // a.js
    let a = 0;
    const add = () => {
      a++;
    }
    module.exports = {
      get a() {
        return a;
      },
      add
    }
    // b.js
    const data = require('a.js');
    data.add();
    console.log(data.a)  //1;
  ```

#### es6模块加载加载CommonJS模块

  ``` js
    // a.js
    module.exports = {
      a: 0,
      b: 1
    }
    // 等于
    export default {
      a: 0,
      b: 1
    }

    //b.js
    import data from 'a.js';
    // data = {a: 0, b: 1}
    import default as data from 'a.js';
    // data = {a: 0, b: 1}
    import * as data from 'a.js';
    // data = {
    //  get() default() {return module.exports};
    //  get() a() {return this.default.a}.bind(data);
    //  get() b() {return this.default.b}.bind(data);
    // }
  ```

#### CommonJS模块加载ES6模块

  需要使用import()，所有输出的接口都是输入的对象属性


  ``` js
  // a.js
  export let a = 1;
  export function f() {};

  // b.js
  const data = await import(a.js);
  // data = {
  //  get a() {return a};
  //  get f() {return f};
  // }
  ```

  

参考资料：

> http://es6.ruanyifeng.com/#docs/module