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
