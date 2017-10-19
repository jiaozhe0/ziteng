import axios from 'axios'
var sha1 = require('sha1')
const appId = 'wxf21f71c117f32c34' // appId
const appsecret = 'd82375e390df6937cbf5e90afbe9910a' // 应用密钥
const ztUrl = encodeURIComponent(window.location.href.split('#')[0])
export function test(wx) {
// 时间戳
function time() {
	return new Date().getTime()
}
// 签名
function makeSignature(nonceStr, time, ticket, url) {
	let arr = [`jsapi_ticket=${ticket}`, `nonceStr=${nonceStr}`, `time=${time}`, `url=${url}`]
	arr.sort((a, b) => {
		if (a < b) {
			return -1
		} else if (a > b) {
			return 1
		} else {
			return 0
		}
	})
	return sha1(arr)
}

// 生成随机字符串
function makeNonceStr() {
	let codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let code = []
	for (let i = 0; i < 16; i++) {
			code.push(codeSet.charAt(Math.floor(Math.random() * codeSet.length)))
	}
	return code.join('')
}

function makeTicket(appId, appsecret) {
	let accessToken = ''
	// 获取token
	let WECHAT_DATA_TOKEN = window.localStorage.getItem('WECHAT_DATA_TOKEN') || {}
	if (!WECHAT_DATA_TOKEN.accessToken || WECHAT_DATA_TOKEN['expire_time'] < time()) {
		console.log('........')
		const TOKEN_URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appsecret}`
		axios.get(TOKEN_URL).then((data) => {
			if (data['accessToken']) {
				accessToken = data['accessToken']
				WECHAT_DATA_TOKEN['accessToken'] = data['accessToken']
				WECHAT_DATA_TOKEN['expire_time'] = time() + 7000
				window.localStorage.setItem('WECHAT_DATA_TOKEN', WECHAT_DATA_TOKEN)
				return getjTicket(accessToken, appId, appsecret)
			}
		})
	} else {
		accessToken = WECHAT_DATA_TOKEN['accessToken']
		return getjTicket(accessToken, appId, appsecret)
	}
}

function getjTicket(accessToken, appId, appsecret) {
	return new Promise((resolve, reject) => {
		let ticket = ''
		// 获取jsapi_ticket 有效期7200秒
		let WECHAT_DATA_TICKET = window.localStorage.getItem('WECHAT_DATA_TICKET') || {}
		// let TICKET_URL = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?accessToken=${accessToken}&type=jsapi`
		if (!WECHAT_DATA_TICKET['ticket'] || WECHAT_DATA_TICKET['expire_time'] < time()) {
			const TICKET_URL = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?accessToken=${accessToken}&type=jsapi`
			axios.get(TICKET_URL).then(data => {
				if (data['ticket']) {
					ticket = data['ticket']
					WECHAT_DATA_TICKET['ticket'] = data['ticket']
					WECHAT_DATA_TICKET['expire_time'] = time() + 7000
					window.localStorage.setItem('WECHAT_DATA_TOKEN', WECHAT_DATA_TICKET)
					resolve(ticket)
				}
			})
		} else {
			ticket = WECHAT_DATA_TICKET['ticket']
			resolve(ticket)
		}
	})
}

makeTicket(appId, appsecret).then((ticket) => {
	var nonceStr = makeNonceStr()
	var timestamp = time()
	var signature = makeSignature(nonceStr, timestamp, ticket, ztUrl)
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature, // 必填，签名，见附录1
		jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
})
}

// wx.ready(() => {
//   console.log('wechat ready')
//   wx.onMenuShareAppMessage({
//     title: '桔子生活', // 分享标题
//     desc: '桔子生活',
//     link: 'http://test.ijzsh.com?x-page=wechat_share_message',
//   })

//   wx.onMenuShareTimeline({
//     title: '桔子生活', // 分享标题
//     desc: '桔子生活',
//     link: 'https://vux.li?x-page=wechat_share_timeline',
//   })
// })
