import WebIM from './WebIM'
import {formatTime} from 'common/js/browser'
import {saveChatToLocal, getChat} from 'common/js/store'
const chat = (store, user) => {
	console.log(6666, getChat())
	store.commit('CHATLIST', {msg: getChat()})
	// var options = {
	// 	apiUrl: WebIM.config.apiURL,
	// 	appKey: WebIM.config.appkey,
	// 	...user
	// }
	
	var options = {
		apiUrl: WebIM.config.apiURL,
		user: 'b4a6166cd9554070a3006cf0276cbc89',
		pwd: '98cbc6720fc6003a0704559dc6616a4b',
		appKey: WebIM.config.appkey,
		success: function (token) {
        var token = token.access_token;
        WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
    },
		error: function(){
    }
	}

	WebIM.conn.open(options)
	WebIM.conn.listen({
				onOpened: msg => {
					console.log(msg)
				},
				// 监听文本信息
				onTextMessage: msg => {
					alert(111, msg.from)
					// let key = msg.from || msg.to
					// saveChatToLocal(key, msg)
					msg = {...msg, time: formatTime()}
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
					// store.commit('CHATCOUNT')
				},
				// 监听表情
				onEmojiMessage: msg => {
					console.log(222, msg.from)
					// let key = msg.from || msg.to
					// saveChatToLocal(key, msg)
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
					// store.commit('CHATCOUNT')
				},
				// 监听图片
				onPictureMessage: msg => {
					console.log(333, msg)
					// let key = msg.from || msg.to
					// saveChatToLocal(key, msg)
					store.commit('CHATLIST', {msg, flag: true})
					saveChatToLocal(store.state.chatList)
					// store.commit('CHATCOUNT')
				},
				onLocationMessage: msg => {
					console.log()
				}
		})
}
export default chat
