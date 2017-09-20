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
Vue.use(BaiduMap, {
  ak: '134db1b9cf1f1f2b4427210932b34dcb'
})
import {VeeValidate, Veeconfig} from './validation'
Vue.use(VeeValidate, Veeconfig)
Vue.use(Mint)
import {getToken, getUserInfo} from 'api/login'
let search = window.location.search.slice(1)
if (search.indexOf('code') < 0) {
	let url = 'http://test.ijzsh.com/html/index.html#/index'
	window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf21f71c117f32c34&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=state&connect_redirect=1#wechat_redirect.html`
} else {
	let pettern = /(^|&)code=([^&]*)(&|$)/
	let code = search.match(pettern)
	code = code != null ? code[2] : null
	getToken(code).then((data) => {
		alert(Object.keys(data))
		getUserInfo(data.access_token, data.openid).then((res) => {
			alert(Object.keys(res))
		})
	})
}

// Vue.use(Vuelazyload,{
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
		eventHub: new Vue()
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
