const md5 = require('md5')
// 获取当前时间
function getNowFormatDate() {
	var date = new Date()
	var seperator1 = '-'
	var seperator2 = ':'
	var month = date.getMonth() + 1
	var strDate = date.getDate()
	if (month >= 1 && month <= 9) {
		month = '0' + month
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		' ' + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds()
	return currentdate
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
var browser = ''
var version = ''
var browserMatch = uaMatch(userAgent.toLowerCase())
if (browserMatch.browser) {
	browser = browserMatch.browser
	version = browserMatch.version
}

var str = browser
var str2 = ''

function demo(str) {
	for (var i = 0; i < str.length; i++) {
		str2 += str.charAt(str.length - i - 1)
	}
}
demo(str)
var str3 = version
var str4 = ''

function demoe(str3) {
	for (var i = 0; i < str3.length; i++) {
		str4 += str3.charAt(str3.length - i - 1)
	}
}
demoe(str3)

var time = getNowFormatDate()

// 封装请求头

export default {
	'machine-code': str,
	'network-code': str3,
	'current-time': time,
	'token': (md5(str2 + str4 + time)).toUpperCase()
}

