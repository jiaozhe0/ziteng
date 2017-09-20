export function MP() {
  return new Promise(function (resolve, reject) {
    window.onload = function (BMap) {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=134db1b9cf1f1f2b4427210932b34dcb'
    script.onerror = reject
    document.head.appendChild(script)
  })
}