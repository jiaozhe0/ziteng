const states = {
  isFooter: true,
  user: {
		// userId: 'b762a2348d3b44499847b65e7ef11e85',
    userId: '',
		userName: '',
		phoneNumber: '',
		photoUrl: '',
		userHuanxin: {
			username: '',
			password: '',
			huanxin_uuid: '',
			huanxin_type: '',
			huanxin_activated: ''
	}
  },
  userInfo: {
		userName: ''
  },
  city: {
		cityId: -1,
		cityName: ''
  },
  server: {},
  serviceTypeList: [],
  parentTypeList: [],
  childTypeList: [],
  config: {
		title: '桔子生活', // 分享标题
    desc: '身边的生活服务专家,都在桔子生活',
    imgUrl: 'https://static.vux.li/logo_520.png',
    link: window.location.href
  },
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
  pictures: {}
}

export default states
