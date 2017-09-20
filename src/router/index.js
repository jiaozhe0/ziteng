import Vue from 'vue'
import Router from 'vue-router'
import Index from 'views/Index/Index' // 首页
import Classify from 'views/Classify' // 分类
import Message from 'views/Message' // 消息
import Order from 'views/Order' // 订单
import Home from 'views/Home/index' // 我的
import Search from 'views/Search' // 搜索页
import SearchList from 'views/SearchList' // 搜索结果页
import City from 'views/City' // 城市选择
import Reminder from 'views/Reminder/index' // 提示页
import Agreement from 'views/Agreement' // 协议页
import ZhiMaScore from 'views/ZhiMaScore' // 芝麻信用
import About from 'views/About/index' // 关于我们
import Login from 'views/Login/index' // 登录页
import MyPublish from 'views/MyPublish/index' // 我的发布
// import EditService from 'views/EditService/index'
import Attestation from 'views/Attestation/index'
import AppServer from 'views/ApproveServer/index'
// import AppPerson from 'views/ApproveServer/index'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'hash',
  routes: [
    {
      path: '/',
      meta: {
        auth: true // 如果此路由需要微信授权请设置为true,默认为false
      },
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        // {
        //   path: '/attestation',
        //   name: 'Attestation',
        //   component: Attestation
        // }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchlist',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/reminder/:title/:broswer',
      name: 'Reminder',
      component: Reminder
    },
    {
      path: '/agreement/:title/:broswer',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/zmscore/:broswer',
      name: 'ZhiMaScore',
      component: ZhiMaScore
    },
    {
      path: '/about/:broswer',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/publish',
      name: 'MyPublish',
      component: MyPublish
    },
    {
      path: '/attestation',
      name: 'Attestation',
      component: Attestation,
      children: [
      ]
     },
     {
      path: '/approve/server',
      name: 'AppServer',
      component: AppServer,
      children: [
        // {
        //   path: '/server/first',
        //   component: First
        // }
      ]
    }
  ]
})
