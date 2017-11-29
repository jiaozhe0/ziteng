import WebIM from './WebIM'
import {formatTime} from 'common/js/browser'
import {saveChatToLocal, getChat} from 'common/js/store'
import {getListRemind} from 'api/order'
const chat = (store, user) => {
	console.log(6666, getChat())
	store.commit('CHATLIST', {msg: getChat()})
	var options = {
		apiUrl: WebIM.config.apiURL,
		appKey: WebIM.config.appkey,
		...user
	}

	// var options = {
	// 	apiUrl: WebIM.config.apiURL,
	// 	user: 'b4a6166cd9554070a3006cf0276cbc89',
	// 	pwd: '98cbc6720fc6003a0704559dc6616a4b',
	// 	appKey: WebIM.config.appkey,
	// 	success: function (token) {
 //    },
	// 	error: function(e){
	// 		console.log(JSON.stringify(e));
 //    }
	// }

	WebIM.conn.open(options)
	WebIM.conn.listen({
				onOpened: msg => {
					console.log(msg)
				},
				// 监听文本信息
				onTextMessage: msg => {
					// let key = msg.from || msg.to
					// saveChatToLocal(key, msg)
					msg = {...msg, time: formatTime()}
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
					// store.commit('CHATCOUNT')
				},
				// 监听表情
				onEmojiMessage: msg => {
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
				},
				// 监听图片
				onPictureMessage: msg => {
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
				},
				// 监听地址
				onLocationMessage: msg => {
					console.log(msg)
				},
				// 监听命令
				onCmdMessage: function ( message ) {
					if (message.action === 'SaleOrder') {
						  getListRemind(store.state.user.userId).then(res => {
						    if (res.code === '000000') {
						    	store.commit('ORDERCOUNT', res.data.sellListRemind.unCatch)
						    }
						  })
					}
				}
		})
}
export default chat
