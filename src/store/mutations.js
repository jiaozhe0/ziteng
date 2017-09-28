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
	}
}

export default mutation
