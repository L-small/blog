function unique(array) {
  var result = [];
  for( var i = 0, len = array.length; i < len; i++ ){
    for (var j = 0, jLen = result.length; j < jLen; j++) {
      if (result[j] === array[i]) {
        break;
      }
    }
    if (j === jLen) {
      result.push(array[i])
    }
  }
  return result;
}


function unique(array) {
  const result = [];
  for(let i = 0, len = array.length; i < len; i++) {
    if (result.indexOf(array[i]) === -1) {
      result.push(array[i])
    }
  }
  return result
}


function unique(array) {
  const result = [];
  const sorted = array.slice().sort();
  let curItem;
  for (let i = 0, len = sorted.length; i < len; i++) {
    if (!i || curItem !== sorted[i]) {
      result.push(sorted[i]);
    }
    curItem = sorted[i];
  }
  return result;
}


function unique(array) {
  const obj = {};
  for( let i = 0, len = array.length; i < len; i++ ) {
    if (!obj[array[i]]) obj[array[i]] = true;
  }
  return Object.keys(obj);
}


function unique(array) {
  const obj = {};
  return array.filter((item, index, array) => {
    return obj.hasOwnProperty(`${typeof item}${JSON.stringify(item)}`) ? false : obj[`${typeof item}${JSON.stringify(item)}`] = true
  })
}


function unique(array) {
  return array.filter((item, index, array) => {
    return array.indexOf(item) === index
  })
}


function unique(array) {
  return Array.from(new Set(array))
}


function unique(array) {
  return [...new Set(array)];
}