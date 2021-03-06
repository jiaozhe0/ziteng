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
	rSafari = /version\/([\w.]+).*(safari)/,
	iPhone = /Version\/(\w+\.\w+).*(Safari)/

	// iphoe = /Mozilla/
// Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko)
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
	match = iPhone.exec(ua)
	if (match != null) {
		return { browser: match[2] || '', version: match[1] || '0' }
	}
	if (!match) {
		return { browser: 'Safari', version: '0' }
	}
}
var browserMatch = uaMatch(userAgent.toLowerCase())
if (browserMatch && browserMatch.browser) {
	var browser = browserMatch.browser,
      browserReverse = [...browserMatch.browser].reverse().reduce((x, y) => {
				return x + y
			})
  var version = browserMatch.version,
			versionReverse = [...browserMatch.version].reverse().reduce((x, y) => {
				return x + y
			})
}
// let time = getNowFormatDate()
export function header() {
	let timer = getNowFormatDate()
	return {
		'machine-code': browser,
		'network-code': version,
		'current-time': timer,
		'token': (md5(`${browserReverse}${versionReverse}${timer}`)).toUpperCase()
	}
}

// export const server = 'http://test.ijzsh.com' // 开发环境
export const server = 'http://www.ijzsh.com' // 生成环境
