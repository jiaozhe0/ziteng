// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Vuelazyload from 'vue-lazyload'
Vue.config.productionTip = false
import 'mint-ui/lib/style.css'
import 'common/css/index.less'
import Mint from 'mint-ui'
import BaiduMap from 'vue-baidu-map'
// 全局数据异步获取
import {getServiceList} from 'api/service'
import {getDefualtCity} from 'api/system'
Vue.use(BaiduMap, {
  ak: '134db1b9cf1f1f2b4427210932b34dcb'
})
import {VeeValidate, Veeconfig} from './validation'
Vue.use(VeeValidate, Veeconfig)
Vue.use(Mint)
// import {getToken, getUserInfo, registerWeixin} from 'api/login'
// let search = window.location.search.slice(1)
// if (search.indexOf('code') < 0) {
// 	let url = 'http://test.ijzsh.com/html/index.html#/index'
// 	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf21f71c117f32c34&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=state&connect_redirect=1#wechat_redirect.html`
// } else {
// 	let pettern = /(^|&)code=([^&]*)(&|$)/
// 	let code = search.match(pettern)
// 	code = code != null ? code[2] : null
// 	getToken(code).then((weixinData) => {
// 		getUserInfo(weixinData.access_token, weixinData.openid).then((res) => {
// 			let postData = {
// 				screen_name: res.nickname,
// 				refreshToken: weixinData.refresh_token,
// 				accessToken: weixinData.access_token,
// 				gender: res.sex,
// 				profile_image_url: res.headimgurl,
// 				iconurl: res.headimgurl,
// 				name: res.nickname
// 			}
// 			let userData = Object.assign({}, postData, weixinData, res)
// 			registerWeixin(userData).then((datas) => {
// 				if (!datas.userId) {
// 					router.push({path: '/login', query: {unionid: weixinData.unionid}})
// 				}
// 			})
// 		})
// 	})
// }
// 图片懒加载
// Vue.use(Vuelazyload,{
// })

// 获取服务类型数据
Promise.all([getServiceList(store), getDefualtCity()]).then(([service, cityData]) => {
	let city = {
		cityName: cityData[1].configValue,
		cityId: cityData[0].configValue
  }
  store.commit('CHANGE_CITY', city)
	const vm = new Vue({
  el: '#app',
  data: {
		eventHub: new Vue()
  },
  router,
  store,
  template: '<App/>',
  components: { App }
 })
 console.log(vm)
})

// Promise.all([getServiceList(store)]).then(([service]) => {
// 	console.log(123, service)
//  const vm = new Vue({
//   el: '#app',
//   data: {
// 		eventHub: new Vue()
//   },
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
//  })
//  console.log(vm)
// })
/* eslint-disable no-new */
