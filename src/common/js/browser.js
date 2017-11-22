// const timeStamp = require('time-stamp')

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

export function Refresh(ele, pos, text) {
	if (pos > 0 && pos <= 50) {
		console.log(pos)
		ele.icon.style.transform = `scale(${1 + pos / 100})`
		ele.refresh.style.transform = `translateY(${pos}px)`
	} else if (pos > 50) {
		return '松开'
	}
}

export function resRefresh(ele) {
		ele.icon.style.transform = `scale(1)`
		ele.refresh.style.transform = `translateY(0)`
}

export function createObjectURL(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob)
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob)
  } else {
    return null
  }
}
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  console.log(newClass)
  el.className = newClass.join(' ')
}

export function formatTime() {
  return new Date().toLocaleString()
}
