import {getJsSignature} from './system.js'
const wx = require('weixin-js-sdk')
const ztUrl = window.location.href.split('#')[0]
export function sdk() {
	alert(ztUrl)
	getJsSignature(ztUrl).then(data => {
		let config = {
			appId: 'wxf21f71c117f32c34',
			jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
		}
		wx.config(Object.assign(data, config))
	})
}
