function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}


function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context);
    }, wait)
  }
}


function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(this, args);
    }, wait)
  }
}


function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    
    if (timeout) clearTimeout(timeout);
    if (immediate) {

      const callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, wait);

    } else {
      timeout = setTimeout(function() {
        func.apply(conotext, args);
      })
    }
  }
}