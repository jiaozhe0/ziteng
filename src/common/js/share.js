const wx = require('weixin-js-sdk')
export function share(config) {
	wx.ready(() => {
		wx.onMenuShareAppMessage(config)
		wx.onMenuShareTimeline(config)
	})
}
