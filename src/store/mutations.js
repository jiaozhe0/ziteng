import * as types from './mutation-types'

export const mutation = {
	[types.CHANGE_FOOTER_SHOW](state, ishow) {
		state.isFooter = ishow
	},
	[types.CHANGE_CITY](state, city) {
		state.city = Object.assign({}, state.city, city)
	},
	[types.LOCALCITY](state, city) {
		state.city = Object.assign({}, state.localCity, city)
	},
	[types.LOCAL](state, local) {
		state.local = Object.assign({}, state.local, local)
	},
	[types.USER](state, user) {
		state.user = Object.assign({}, state.user, user)
	},
	[types.SERVER](state, server) {
		state.server = Object.assign({}, state.server, server)
	},
	[types.SERVICETYPELIST](state, serviceTypeList) {
		state.serviceTypeList = serviceTypeList
	},
	[types.CHILDTYPELIST](state, childTypeList) {
		state.childTypeList = childTypeList
	},
	[types.PARENTTYPELIST](state, parentTypeList) {
		state.parentTypeList = parentTypeList
	},
	[types.CONFIG](state, newConfig) {
		state.config = Object.assign({}, state.config, newConfig)
	},
	[types.USERINFO](state, userInfo) {
		state.userInfo = Object.assign({}, state.userInfo, userInfo)
	},
	[types.ADDRESS](state, address) {
		state.address = Object.assign({}, state.address, address)
	},
	[types.STATUS](state, status) {
		state.status = status
	},
	[types.MAP](state, map) {
		state.map = Object.assign({}, state.map, map)
	},
	[types.PICTURES](state, pictures) {
		state.pictures = pictures
	},
	[types.SERVICEINFO](state, info) {
		state.serviceInfo = Object.assign({}, state.serviceInfo, info)
	},
	[types.OPENID](state, id) {
		state.openId = id
	},
	[types.ORDERURL](state, url) {
		state.orderUrl = url
	},
	[types.SERVICEURL](state, url) {
		state.serviceUrl = url
	},
	[types.CITYLIST](state, list) {
		state.serviceUrl = list
	},
	[types.CHATCOUNT](state, key) {
		state.chatList.some(item => {
			console.log(item.id + '===' + key)
			if (item.id === key) {
				state.chatCount -= item.count
				item.count = 0
				return true
			}
		})
	},
	[types.CHATLIST](state, option) {
		console.log(555, option.msg)
    // 空数组，本地聊天的对话
    let key = option.msg.from || option.msg.to
		if (option.msg instanceof Array) {
			state.chatList = option.msg
		} else {
			// 是数组，判断是空数组
			if (state.chatList.length) {
				let has = state.chatList.some(item => {
					if (item.id === key) {
						item.list.push(option.msg)
						console.log(item.list)
						item.count += 1
						return true
					}
				})
				if (!has) {
					state.chatList.push({
								count: 1,
								id: key,
								list: new Array(option.msg)
					})
				}
			} else {
				state.chatList.push({
							count: 1,
							id: key,
							list: new Array(option.msg)
				})
			}
		}
		state.chatCount = 0
		state.chatList.forEach(item => {
			state.chatCount += item.count
		})
	},
	[types.ORDERCOUNT](state, num) {
		state.orderCount = num
	},
	[types.LOADING](state, flag) {
		state.loading = flag
	}
}

export default mutation
