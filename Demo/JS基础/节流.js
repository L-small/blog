function throttle(func, wait) {
  let context, args;
  preTime = 0;

  return function () {
    context = this;
    args = arguments;
    const nowTime = +new Date();
    if (nowTime - preTime >= wait) {
      func.apply(context, args);
      preTime = nowTime;
    }
  }
}


function throttle(func, wait) {
  let context, args, timeout;
  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait)
    }
  }
}


function throttle(func, wait) {
  let context, args, preTime;

  return function() {
    const now = +new Date();
    var remain = wait - (now - preTime);
    context = this;
    args = arguments;
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      preTime = now;
      func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        preTime = +new Date();
        timeout = null;
        func.apply(func, args);
      }, remain);
    }
  }
}