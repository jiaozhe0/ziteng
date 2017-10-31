// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
// import Vuelazyload from 'vue-lazyload'
Vue.config.productionTip = false
import 'mint-ui/lib/style.css'
import 'common/css/index.less'
import Mint from 'mint-ui'
import BaiduMap from 'vue-baidu-map'
// 全局数据异步获取
import {getServiceList} from 'api/service'
import {getDefualtCity, getJsSignature, cityList, getLocal} from 'api/system'
fastclick.attach(document.body)
const wx = require('weixin-js-sdk')
Vue.use(BaiduMap, {
  ak: '134db1b9cf1f1f2b4427210932b34dcb'
})
import {VeeValidate, Veeconfig} from './validation'
Vue.use(VeeValidate, Veeconfig)
Vue.use(Mint)
import {share} from 'common/js/share'
import {getToken, getUserInfo, registerWeixin} from 'api/login'
if (window.location.href.indexOf('share') < 0) {
let search = window.location.search.slice(1)
if (search.indexOf('code') < 0) {
	let url = 'http://test.ijzsh.com/html/index.html#/index'
	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf21f71c117f32c34&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=state&connect_redirect=1#wechat_redirect.html`
} else {
	let pettern = /(^|&)code=([^&]*)(&|$)/
	let code = search.match(pettern)
	code = code != null ? code[2] : null
	getToken(code).then((weixinData) => {
		// alert(weixinData.openid)
		store.commit('OPENID', weixinData.openid)
		getUserInfo(weixinData.access_token, weixinData.openid).then((res) => {
			let postData = {
				screen_name: res.nickname,
				refreshToken: weixinData.refresh_token,
				accessToken: weixinData.access_token,
				gender: res.sex,
				profile_image_url: res.headimgurl,
				iconurl: res.headimgurl,
				name: res.nickname
			}
			let userData = Object.assign({}, postData, weixinData, res)
			console.log(userData)
			registerWeixin(userData).then((datas) => {
				console.log(datas)
				if (!datas['userId']) {
					initVue()
					router.push({path: '/login', query: {unionid: weixinData.unionid}})
				} else {
					// alert(Object.keys(datas))
					store.commit('USER', datas)
					// alert(store.state.user.userId)
					initVue()
				}
			})
		})
	})
}
} else {
	initStaticPage()
}

// 图片懒加载
// Vue.use(Vuelazyload,{
// })

// -------------------------------------过滤器
Vue.filter('score', (val) => {
 return val > 0 ? `${(val * 20)}%` : 0
})
// ----------------------------------loading页
var preloadImage = function () {
  return new Promise(function (resolve, reject) {
    var image = new Image()
		image.onload = resolve
		image.onerror = reject
		image.src = '../static/loading.png'
  }).then(() => {
	document.querySelector('#loading').classList.add('loadingIn')
  })
}
// ------------------------------------微信分享
wx.error(function(res) {
	alert(Object.keys(res))
	console.log(9999, res)
})
const ztUrl = window.location.href.split('#')[0]
getJsSignature(ztUrl).then(data => {
	let config = {
		appId: 'wxf21f71c117f32c34',
		jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
	}
	wx.config(Object.assign(data, config))
})

// 创建Vue实例
function newVue() {
	setTimeout(() => {
		const vm = new Vue({
			el: '#app',
			data: {
				eventHub: new Vue(),
				config: {
					title: '桔子生活', // 分享标题
					desc: '身边的生活服务专家,都在桔子生活',
					imgUrl: 'https://static.vux.li/logo_520.png',
					link: window.location.href
				}
			},
			router,
			store,
			template: '<App/>',
			components: { App }
			})
		vm.$watch('config', (newVal) => {
			share(newVal)
		})
		document.querySelector('#loading').style.display = 'none'
	}, 20)
}

// 初始化页面
function initVue() {
	Promise.all([getServiceList(store), getDefualtCity(), getLocal(), cityList()]).then(([service, city, cityData, cityList]) => {
		if (cityData) {
			cityList.data.baiduCity.some((item, index) => {
				if (cityData.cityName === item.cityName) {
					cityData.cityId = item.cityId
					return true
				}
			})
			store.commit('CHANGE_CITY', cityData)
		} else {
			// 设置默认城市
			let systemCity = {
				cityName: city[1].configValue,
				cityId: city[0].configValue
			}
			store.commit('CHANGE_CITY', systemCity)
		}
		newVue()
	})
}

// 初始化静态页面
function initStaticPage() {
	Promise.all([getServiceList(store), getDefualtCity()]).then(([service, city]) => {
		// 设置默认城市
		let systemCity = {
			cityName: city[1].configValue,
			cityId: city[0].configValue
		}
		store.commit('CHANGE_CITY', systemCity)
		newVue()
	})
}
console.log(typeof initStaticPage)
preloadImage()
// initVue()
/* eslint-disable no-new */
