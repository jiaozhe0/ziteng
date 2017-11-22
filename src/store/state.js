const states = {
  isFooter: false,
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
  userInfo: { // 用户信息，个人主页用
		userName: ''
  },
  city: {
		cityId: -1,
		cityName: '' // 城市名，城市Id
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
  address: {}, // 常用地址
  map: {
    address: '',
    city: '',
    point: {
      lat: '',
      lng: ''
    },
    title: ''
  }, // 地图位置
  status: '', // 个人/商家
  pictures: {}, // 图片浏览
  serviceInfo: {}, // 服务信息
  openId: '',
  orderUrl: '',
  serviceUrl: '',
  chatList: [], // 对话列表
  chatCount: 0, // 消息数量
  orderCount: 0, // 订单数量
  loading: false,
  cityList: []
}
export default states
