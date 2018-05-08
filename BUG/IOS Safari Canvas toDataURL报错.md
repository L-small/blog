问题描述：

canvas合成图片的时候，如果图片不是同域的话会在调用toDataUrl方法的时候报错，即使通过cors跨域处理了之后，在safari下还会报跨域问题，可能是Safari对图片进行了缓存，请求的并不是服务器，而是缓存，所以依然会有跨域问题

解决方法：

给图片链接添加时间戳

例子：

    let temple = document.querySelector('.temple')
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    canvas.width = 590
    canvas.height = 908
    context.drawImage(temple, 0, 0, 590, 908)
    let img = new Image()
    img.onload =  function() {
        context.drawImage(img, 205, 560, 180, 180)
    }
    img.crossOrigin = 'Anonymous'
    img.src = `${imgsrc}?time=${new Date().getTime()}`