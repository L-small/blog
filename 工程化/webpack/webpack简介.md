## webpack

![] (https://user-gold-cdn.xitu.io/2018/3/19/1623bfac4a1e0945?w=2152&h=850&f=png&s=133657)

webpack会将我们多个项目模块打包构建成项目运行需要的几个静态文件。

### entry

多个代码模块一般会有一个项目入口，比如一个.js文件，这就是构建的入口。从这个文件开始解析依赖。也可以有多个入口

```javascript
  module.exports = {
    entry: './src/index.js'
  }

  module.exports = {
    entry: {
      main: ''
    }
  }

  module.exports = {
    entry: {
      foo: '',
      test: ''
    }
  }

  module.exports = {
    entry: {
      main: ['./other/index.js', './src/index.js']
    }
  }
```

### loader

webpack中处理多种文件格式的机制，可以理解为一个转换器，将各种文件格式转换成webpack支持打包的模块，一般默认webpack打包成js文件

```javascript
  module: {
    rules: [
      {
        test: /\.js/,
        include: [path.resolve(__dirname, 'src')],
        use: 'babel-loader'
      }
    ]
  }
```

### plugin

webpack中其他的流程就都是plugin了，当loader将文件转换完成后的其他操作都交由plugin来完成。

```javascript
  const uglifyPlugin= require('uglifyPlugin');

  module.exports = {
    plugins: [
      new uglifyPlugin()
    ]
  }
```

### output

webpack构建完成出来的静态文件。

```javascript
  module.exports = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
```

### 流程

entry(设定需要编译的入口) => loader(将入口文件和依赖等转换成webpack支持的格式) => plugin(对文件进行处理) => ouput(输出构建完成的文件))