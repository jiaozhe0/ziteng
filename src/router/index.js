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
import EditService from 'views/EditService/index' // 编辑(发布)服务
import Attestation from 'views/Attestation/index' // 我们认证
import BusinessAuth from 'views/BusinessAuth/index' // 商家认证
import ServiceList from 'views/ServiceList/index' // 服务列表
// 服务详情
const ServiceDetail = (resolve) => {
  import('views/ServiceDetail').then((module) => {
    resolve(module)
  })
}
const Address = (resolve) => {
  import('views/Address').then((module) => {
    resolve(module)
  })
}
// 个人主页
const HomePage = (resolve) => {
  import('views/HomePage/index').then((module) => {
    resolve(module)
  })
}
// 服务者评价
const Evaluate = (resolve) => {
  import('views/Evaluate/index').then((module) => {
    resolve(module)
  })
}
// 服务地址
const ServiceMap = (resolve) => {
  import('views/ServiceMap').then((module) => {
    resolve(module)
  })
}
// 我的收藏
const MyCollect = (resolve) => {
  import('views/MyCollect/index').then((module) => {
    resolve(module)
  })
}

// 订单
const BuyOrder = (resolve) => {
  import('views/BuyOrder').then((module) => {
    resolve(module)
  })
}
const PersonInfo = (resolve) => {
  import('views/personInfo/index').then((module) => {
    resolve(module)
  })
}
const EditAddress = (resolve) => {
  import('views/EditAddress/index').then((module) => {
    resolve(module)
  })
}
const MyAddress = (resolve) => {
  import('views/MyAddress/index').then((module) => {
    resolve(module)
  })
}
const MyReport = (resolve) => {
  import('views/MyReport/index').then((module) => {
    resolve(module)
  })
}
// 个人验证
const PersonAuth = (resolve) => {
  import('views/personAuth/index').then((module) => {
    resolve(module)
  })
}
// 技能验证
const SkillAuth = (resolve) => {
  import('views/personAuth/skill').then((module) => {
    resolve(module)
  })
}
// 实名认证
const NameAuth = (resolve) => {
  import('views/personAuth/name').then((module) => {
    resolve(module)
  })
}
// 技能验证图片上传
const SkillAuthUpload = (resolve) => {
  import('views/personAuth/upload').then((module) => {
    resolve(module)
  })
}
// 商业图片上传
const BusinessAuthUpload = (resolve) => {
  import('views/personAuth/upload').then((module) => {
    resolve(module)
  })
}
// 图片浏览
const ViewPicture = (resolve) => {
  import('views/ViewPic/index').then((module) => {
    resolve(module)
  })
}
// 照相浏览
const Photo = (resolve) => {
  import('views/photo/index').then((module) => {
    resolve(module)
  })
}
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
      component: Order,
      children: [
        {
          path: '/order/buy',
          component: BuyOrder
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
      ]
    },
    {
      path: '/index/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/index/search/list',
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
      path: '/home/publish',
      name: 'MyPublish',
      component: MyPublish
    },
     {
      path: '/home/address',
      component: MyAddress
    },
    {
      path: '/home/collect',
      component: MyCollect
    },
     {
      path: '/home/report',
      component: MyReport
    },
    {
      path: '/home/auth',
      name: 'Attestation',
      component: Attestation,
      children: [
      ]
     },
     {
      path: '/home/auth/server',
      name: 'BusinessAuth',
      component: BusinessAuth
    },
    {
      path: '/home/auth/server/upload:type',
      component: BusinessAuthUpload
    },
    {
      path: '/home/auth/person',
      component: PersonAuth
    },
    {
      path: '/home/auth/person/skill',
      component: SkillAuth,
      children: [
         {
          path: ':type',
          component: SkillAuthUpload
        }
      ]
    },
    {
      path: '/home/auth/person/name',
      component: NameAuth
    },
    {
      path: '/servicelist',
      name: 'ServiceList',
      component: ServiceList,
      children: [
        // {
        //   path: ':id',
        //   name: 'ServiceDetail',
        //   component: ServiceDetail
        // }
      ]
    },
    {
      path: '/servicedetail',
      name: 'ServiceDetail',
      component: ServiceDetail
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/home/evaluate/:type',
      name: 'Evaluate',
      component: Evaluate
    },
    {
      path: '/servicemap',
      name: 'ServiceMap',
      component: ServiceMap
    },
    {
      path: '/home/info',
      component: PersonInfo
    },
    {
      path: '/editservice',
      component: EditService
    },
    {
      path: '/address/edit',
      component: EditAddress
    },
    {
      path: '/view',
      component: ViewPicture
    },
    {
      path: '/photo',
      component: Photo
    }
  ]
})
