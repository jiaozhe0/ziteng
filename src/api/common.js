const md5 = require('md5')

// 获取当前时间
function getNowFormatDate() {
  var date = new Date()
  var month = date.getMonth() + 1
  month = month <= 9 ? `0${month}` : month
  var day = date.getDate()
  day = day <= 9 ? `0${day}` : day
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
// 获取浏览器和版本号
var userAgent = window.navigator.userAgent,
  rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
  rFirefox = /(firefox)\/([\w.]+)/,
	rOpera = /(opera).+version\/([\w.]+)/,
	rChrome = /(chrome)\/([\w.]+)/,
	rSafari = /version\/([\w.]+).*(safari)/

 function uaMatch(ua) {
	var match = rMsie.exec(ua)
	if (match != null) {
		return { browser: 'IE', version: match[2] || '0' }
	}
  match = rFirefox.exec(ua)
	if (match != null) {
		return { browser: match[1] || '', version: match[2] || '0' }
	}
  match = rOpera.exec(ua)
	if (match != null) {
		return { browser: match[1] || '', version: match[2] || '0' }
	}
  match = rChrome.exec(ua)

	if (match != null) {
		return { browser: match[1] || '', version: match[2] || '0' }
  }
	match = rSafari.exec(ua)
	if (match != null) {
		return { browser: match[2] || '', version: match[1] || '0' }
	}
	if (match != null) {
		return { browser: '', version: '0' }
	}
}

var browserMatch = uaMatch(userAgent.toLowerCase())
if (browserMatch.browser) {
	var browser = browserMatch.browser,
      browserReverse = [...browserMatch.browser].reverse().reduce((x, y) => {
				return x + y
			})
  var version = browserMatch.version,
			versionReverse = [...browserMatch.version].reverse().reduce((x, y) => {
				return x + y
			})
}

let time = getNowFormatDate()

export const header = {
	'machine-code': browser,
	'network-code': version,
  'current-time': time,
  'token': (md5(`${browserReverse}${versionReverse}${time}`)).toUpperCase()
}

export const server = 'http://test.zitengkeji.com'
