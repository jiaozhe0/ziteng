import * as types from './mutation-types'

export const mutation = {
	[types.CHANGE_FOOTER_SHOW](state, ishow) {
		state.isFooter = ishow
	},
	[types.CHANGE_CITY](state, city) {
		state.city = city
	}
}

export default mutation
