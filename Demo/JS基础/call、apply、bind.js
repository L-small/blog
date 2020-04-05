Function.prototype.call = function(context) {
  const env = context || window;
  env.fn = this;

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  const result = env.fn(...args);
  delete env.fn;
  return result;
}


Function.prototype.apply = function() {
  const [ context = window, arr] = arguments;
  context.fn = this;

  let args = [];
  arr && arr.length ? context.fn() : args = arguments.map((item, index) => index !== 0);
  
  const result = context.fn(...args);
  delete context.fn;

  return result;
}


Function.prototype.bind = function() {
  const self = this;
  const args = arguments.map((item, index) => index !== 0);

  const fNOP = function() {};
  const fBound = function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  // 等于
  // fBound.prototype = Object.create(this.prototype);
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

// Object.create其实就是
// Object.create = function (o) {
//   function f() {}
//   f.prototype = o;
//   return new f;
// }