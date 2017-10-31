const states = {
  isFooter: false,
  user: {
		// userId: 'b762a2348d3b44499847b65e7ef11e85',
    // userId: '033ae71687d848cea817dcb071fa4533', // i
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
  serviceUrl: ''
}

export default states
