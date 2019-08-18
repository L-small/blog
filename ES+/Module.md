## Module

  es6的模块是在编译时加载，模块会自动采用严格模式

### export

  export常见写法，导出的接口是要与其有动态绑定关系，可以取到内部模块实时的值

    export var a = 1;
    export function app(){};
    const name;
    export name = 1;
    export { name, test };
    export { name as newName };

### import

  import常见写法，因为被引擎静态分析所以有提升效果（在编译阶段执行），提升到整个模块的头部首先执行。多次重复也只执行一次

    import { name } from '';
    import { name as newName } from '';

    // 整体加载
    import * as newName from '';

### export default

  default模块中只能有一个。其实相当于把值赋值给default然后导出

    export default function () {}
    import newName from '';

    export default function app() {}
    import newNaem from '''

    // 相当于default变量为1
    export default 1;

### 模块传递

  export { foo, bar } from '';
  // 相等于
  import { foo, bar } from '';
  export { foo, bar };

  // 默认接口
  export { default } from '';

  // 整体输出
  export * from '';

### import()

  import()运行时加载模块，返回值是个Promise，类似node的require方法，区别是前者是异步加载，后者是同步

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
  
<br>

参考资料：

> http://es6.ruanyifeng.com/#docs/module