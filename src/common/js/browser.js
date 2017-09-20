// 获取/设置 data-* 属性
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

// 初始化视口的宽/高
export function initSize() {
	return {
		vW: window.innerWidth,
		vH: window.innerHeight
	}
}
// 封装requestAnimationFrame
export const requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function(callback) {
		return window.setTimeout(callback, 1000 / 60) // shoot for 60 fps
  }
})()

export function MP() {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
		// console.log([...arguments])
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=134db1b9cf1f1f2b4427210932b34dcb'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

