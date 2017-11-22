<template>
<div class="message">
    <mt-header :title="$route.query.otherUserNick"></mt-header>
    <div class="content message-content">
    	<div v-if="chatsList && chatsList.length">
    		<chat-list :chatList="chatsList"></chat-list>
    	</div>
    	<div ref='bottom' class='toBottom'></div>
    </div>
    <div class="bar bar-footer" :class="{'emojiOn': emojiShow, 'addOn': addShow}">
     <div class="msg-footer">
     <div class="input-wrap">
    		<input type="text" v-model='msg' class='msg-input' @focus="_bottomVisible">
    		<div class="emoji-icon" @click="_emojiShow"></div>
    	 </div>
    		<button v-show="!show"  class='btn add' @click="_addShow">+</button>
    		<button v-show="show" @click="_sendText" class='btn send'>发送</button>
     </div>
     <div class="picture" v-show="addShow">
     	<upload-pic :chat="true" @uploadPicture="_sendImage" :multiple="true"></upload-pic>
     </div>
     <div class="emoji" v-show="emojiShow">
     		<emoji-list @selectFace="_selectFace" ></emoji-list>
     </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import ChatList from 'components/chatList/index'
import {saveChatToLocal} from 'common/js/store'
import WebIM from '../../im/WebIM'
import {sendTxtMessage, sendImage} from '../../im/send'
import {mapGetters, mapMutations} from 'vuex'
import EmojiList from 'components/face/index'
import uploadPic from 'components/uploadPicture/index'
import {formatTime} from 'common/js/browser'
export default {
	data() {
		return {
			chatInfo: {
				list: []
			},
			msg: '',
			emojiShow: false,
			addShow: false,
			bottomShow: false,
			from: '',
			fromUser: {}
		}
	},
	components: {
		MtHeader,
		ChatList,
		EmojiList,
		uploadPic
	},
	created() {
		this.fromUser = {
			userId: this.user.userId,
			userNick: this.user.userName,
			userPic: this.user.photoUrl
		}
	},
	mounted() {
		this.$refs.bottom.scrollIntoView(false)
	},
	updated() {
		this.$refs.bottom.scrollIntoView(false)
	},
	activated() {
		formatTime()
		this.setFooter(false)
		console.log(23456, this.chatsList)
		localStorage.clear()
		this._initMessageList()
		console.log(666666, this.from)
	},
	deactivated() {
		this.setFooter(true)
		this.setChatCount(this.from)
		this.chatInfo = {
				list: []
			}
		saveChatToLocal(this.chatList)
		// this.chatsList = []
	},
	computed: {
		...mapGetters(['user', 'chatList']),
		show() {
			return this.msg.length > 0
		},
		chatsList: {
			set(val) {
				this.chatInfo.list = val
			},
			get() {
				return this.chatInfo.list
			}
		}
	},
	methods: {
		_bottomVisible() {
			this.bottomShow = false
			this.addShow = false
			this.emojiShow = false
		},
		_sendText() {
			let obj = {
				ext: {
					...this.fromUser,
					...this.$route.query
				},
				msg: this.msg
			}
			sendTxtMessage(this.$route.query.otherUserId, obj).then((data) => {
				this._updateMessage(data)
			})
		},
		_sendImages(e) {
			let ext = {
					...this.fromUser,
					...this.$route.query
				}
			sendImage(e.target.files, this.from, ext).then((data) => {
				console.log(23, data)
			})
		},
		_sendImage(data) {
			if (data.length > 0) {
					if (/^image\/\w+$/.test(data[0].type)) {
                var blob = data[0]
                var url = window.URL.createObjectURL(blob)
                var id = WebIM.conn.getUniqueId()             // 生成本地消息id
                var msg = new WebIM.message('img', id) // 创建图片消息
                let vm = this
                msg.set({
                    apiUrl: WebIM.config.apiURL,
                    file: {data: blob, url: url},
                    to: this.from,                     // 接收消息对象
                    ext: {
											...this.fromUser,
											...this.$route.query
                    },
                    roomType: false,
                    chatType: 'singleChat',
                    onFileUploadError(error) {
												console.log(error)
                        console.log('Error')
                    },
                    onFileUploadComplete(data) {
												console.log(data)
                        console.log('Complete')
                    },
                    success(id) {
												console.log(12356, id)
												console.log(msg.body)
												vm._updateMessage(msg.body)
                        console.log('Success')
                    }
                })
                WebIM.conn.send(msg.body)
            }
        }
		},
		_emojiShow() {
			this.bottomShow = !this.bottomShow
			this.emojiShow = !this.emojiShow
			this.addShow = false
		},
		_addShow() {
			this.bottomShow = !this.bottomShow
			this.emojiShow = false
			this.addShow = !this.addShow
		},
		// 处理消息
		_updateMessage(data) {
			// 图片信息
			if (data.type !== 'img') {
				let msgData = this._processMsg(data.msg)
				data.data = msgData
				this.msg = ''
				this.emojiShow = false
			}
			this.addShow = false
			data = {...data, time: formatTime()}
			this.setCHATLIST({msg: data})
			saveChatToLocal(this.chatList)
			if (!this.chatInfo.list.length) {
				this._initMessageList()
			}
		},
		_processMsg(data) {
			let p = /(\[.{0,3}\]|[^[.{0,3}\]]+)/g
			let pp = /(\[.{0,3}\])/
			let msgArr = data.match(p)
			if (msgArr.length > 1) {
			let message = msgArr.map(item => {
					let flag = true
					let obj = {}
					for (let face in WebIM.Emoji.map) {
						if (face === item) {
							obj['data'] = WebIM.Emoji.path + WebIM.Emoji.map[face]
							obj['type'] = 'emoji'
							flag = false
							break
						}
					}
					if (flag) {
						obj['data'] = item
						obj['type'] = 'txt'
					}
					return obj
				})
			console.log(5656, message)
					return message
			} else {
				if (msgArr.length === 1) {
					if (pp.test(msgArr[0])) {
						let obj = {
							data: WebIM.Emoji.path + WebIM.Emoji.map[msgArr[0]],
							type: 'emoji'
						}
						return new Array(obj)
					} else {
						return data
					}
				}
			}
		},
		_selectFace(emoji) {
			this.msg += emoji
		},
		_initMessageList() {
			this.from = this.$route.query.otherUserId
			this.chatList.some(item => {
				if (item.id === this.from) {
					this.chatInfo = item
					return true
				}
			})
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setChatCount: 'CHATCOUNT',
			setCHATLIST: 'CHATLIST'
		})
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .message{
 	.message-content{
 		overflow-y: auto;
 		background-color: #eee;
 	}
 	.bar-footer{
 		z-index: 999;
 		padding-left: 0;
 		padding-right: 0;
 		transform: translateY(0px);
 		transition: all 0.5s @timing-fuction;
 		&.emojiOn{
 			transform: translateY(-145px);
 		}
 		&.addOn{
 			transform: translateY(-100px);
 		}
 	}
 	.msg-input{
 		width: 100%;
 		height: 40px;
 		border:none;
 		border-bottom:1px solid green;
 		color: @color-text
 	}
 	.msg-footer{
 		.flexbox();
 		.align-items(center);
 		.justify-content(flex-start);
 		.size(100%;50px);
 		padding-left: 0.5rem;
 		padding-right: 0.5rem;
 		background: #fff;
 		// margin-bottom: 3px;
 		.input-wrap{
 			position: relative;
 			flex:1;
 			margin-right: 10px;
	 		.emoji-icon{
	 			position: absolute;
	 			.square(22px);
	 			right: 0px;
	 			top:50%;
	 			background-size: 22px 22px;
	 			background-image: url('./face.jpg');
	 			transform: translateY(-50%);
	 		}
 		}
 	}
 	.emoji{
		width: 100%;
		height: auto;
 	}
 	.btn{
 		display: block;
 		right: 10px;
 		&.add{
 			.square(32px);
 			padding: 0;
 			line-height: 10px;
 			box-sizing: border-box;
 			border-radius: 50%;
 			text-align: center;
 			font-size: 28px;
			font-weight: bold;
 			background-color: transparent;
 			border:1px solid @color-text-gray;
 			color: @color-text-secondary;
 		}
		&.send{
		 .size(76px;35px);
		 line-height: 35px;
		 background: transparent;
		 border-radius: 3px;
		 border:1px solid @color-text-gray;
		 color: @color-text;
		 font-size: 0.8rem
		} 		
 	}
 }
 .toBottom{
 	opacity: 0;
 }
</style>