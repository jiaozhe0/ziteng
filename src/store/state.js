const states = {
  user: {
		// userId: '49e6797f37c644f8b6c882fcbab37395',
    // userId: 'b4a6166cd9554070a3006cf0276cbc89',
    userId: '',
		userName: '',
		phoneNumber: '',
		photoUrl: '',
		userHuanxin: {
			username: '',
			password: '',
			huanxin_uuid: '',
			huanxin_type: '',
			huanxin_activated: '' // 用户
	}
  },
  city: {
		cityId: -1,
		cityName: '' // 选择城市名，城市Id
  },
  localCity: {
    cityId: -1,
    cityName: ''
  },
  local: {},
  server: {},
  serviceTypeList: [],
  parentTypeList: [],
  childTypeList: [],
  map: {
    address: '',
    city: '',
    point: {
      lat: '',
      lng: ''
    },
    title: ''
  }, // 设置地图位置
  status: '', // 认证个人/商家
  pictures: {}, // 图片浏览
  userInfo: { // 用户信息，修改个人信息时使用
    userName: ''
  },
  address: {}, // 常用地址,修改地址时使用
  serviceInfo: {}, // 编辑发布服务信息，修改服务信息时使用
  openId: '', // oCiKTwF0g46BI60Gq3yIH33ddv1c
  orderUrl: '', // 订单详情的来路路径
  serviceUrl: '', // 服务详情的来路路径
  serListUrl: '', // 服务详情的来路路径
  chatList: [], // 对话列表
  chatCount: 0, // 消息数量
  orderCount: 0, // 订单数量
  cityList: [], // 选择城市列表
  loading: false, // 全局Loaing
  isFooter: false // 全局底部导航
}
export default states
