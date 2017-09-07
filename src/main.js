// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuelazyload from 'vue-lazyload'
Vue.config.productionTip = false
import 'mint-ui/lib/style.css'
import 'common/css/index.less'
import Mint from 'mint-ui'
Vue.use(Mint)

// Vue.use(Vuelazyload,{
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
