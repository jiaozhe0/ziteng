import Vue from 'vue'
import Router from 'vue-router'
import Index from 'views/Index/index'
import Classify from 'views/Classify'
import Message from 'views/Message'
import Order from 'views/Order'
import Home from 'views/Home'
import Search from 'views/Search'
import City from 'views/City'
import Reminder from 'views/Reminder/index'
import Agreement from 'views/Agreement'
import ZhiMaScore from 'views/ZhiMaScore'
import About from 'views/About/index'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
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
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
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
    }
  ]
})
