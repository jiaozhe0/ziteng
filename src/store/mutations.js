import * as types from './mutation-types'

export const mutation = {
	[types.CHANGE_FOOTER_SHOW](state, ishow) {
		state.isFooter = ishow
	},
	[types.CHANGE_CITY](state, city) {
		state.city = Object.assign({}, state.city, city)
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
	}
}

export default mutation
