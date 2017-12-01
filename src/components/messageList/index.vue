<template>
    <div class='message-item' @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
     <div class="delete" @click='_deletMessage'>删除</div>
     <mt-cell  class='income-item' @click.native="_goChat" ref='cell'>
    	<div slot='icon' class="message-info">
    		<div class="avatar-img" v-if="chatInfo.from">
    			<img :src="chatInfo.ext.userPic" alt="" class="img-responsive">
    		</div>
            <div class="avatar-img" v-else>
                <img :src="chatInfo.ext.otherUserPic" alt="" class="img-responsive">
            </div>
            <div class="mark" v-show="message.count"></div>
    		<div>
	    		<div class="title" v-if="chatInfo.from">{{chatInfo.ext.userNick}}</div>
                <div class="title" v-else>{{chatInfo.ext.otherUserNick}}</div>
                <!-- 对方 -->
                <div v-if="user.userId !== chatInfo.from" class='message'>
                    <div class="text other" v-if="msg">
                    <!-- 标签和文本消息 -->
                    <span v-if="msg instanceof Array">
                        <span v-for="items in msg">
                            <span class='info-text' v-if="items.type=='txt'">{{items.data}}
                            </span>
                            <img :src="items.data" class='emoji' alt=""  v-else >
                        </span>
                    </span>
                    <!-- 纯文本 -->
                    <span v-else >{{msg}}</span>
                </div>
                <!-- 图片消息 -->
                <div class="text other" v-else>
                    [图片]
                </div>

                <div v-else>ll</div>
            </div>
    		</div>
    	</div>
    	<div class="text-right">
    		<div class="time">{{chatInfo.time}}</div>
    	</div>
    </mt-cell>
    </div>
</template>
<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
export default {
	props: ['message'],
    data() {
        return {
            userInfo: {
               otherUserId: '',
               otherUserNick: '',
               otherUserPic: ''
            }
        }
    },
    created() {
        this.touch = {}
        console.log(this.chatInfo)
    },
    computed: {
        msg() {
            return this.chatInfo.data
        },
        chatInfo() {
            return this.message.list[this.message.list.length - 1]
        },
        ...mapGetters(['user'])
    },
	components: {
		MtCell: Cell
	},
    methods: {
        _goChat() {
            console.log(4554, this.chatInfo)
            // 对方
            if (this.chatInfo.to === this.user.userId) {
                this.userInfo = {
                    otherUserId: this.chatInfo.ext.userId,
                    otherUserNick: this.chatInfo.ext.userNick,
                    otherUserPic: this.chatInfo.ext.userPic
                }
            } else {
                this.userInfo = {
                    otherUserId: this.chatInfo.ext.otherUserId,
                    otherUserNick: this.chatInfo.ext.otherUserNick,
                    otherUserPic: this.chatInfo.ext.otherUserPic
                }
            }
            this.$router.push({path: '/message/chat', query: {...this.userInfo}})
        },
        onShortcutTouchStart(e) {
           let firstTouch = e.touches[0]
           this.touch.y1 = firstTouch.pageX // 手指触碰时的位置
           // alert(this.touch.y1)
        },
        onShortcutTouchMove(e) {
          let firstTouch = e.touches[0]
          this.touch.y2 = firstTouch.pageY // 滑动后的位置
         let delta = Math.floor((this.touch.y2 - this.touch.y1)) | 0 // 滑动的距离 除以 一个字母的高度
          console.log(767, delta)
          if (delta <= -60) {
            delta = -60
          } else if (delta >= -20) {
            delta = 0
          }
         this.$refs.cell.$el.style.transform = `translateX(${delta}px)`
          this.$refs.cell.$el.style.webkitTransform = `translateX(${delta}px)`
        },
        _deletMessage() {
            let id = this.chatInfo.from ? this.chatInfo.from : this.chatInfo.ext.otherUserId
            this.setChatList(id)
        },
        ...mapMutations({
            setChatList: 'DELETECHAT'
        })
    }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .income-item{
 	font-size: 0.6rem;
 	.score{
 		color:@color-primary;
 	}
 	.time,.type{
 		margin-top: 8px;
 		font-size: 0.5rem;
 		color:@color-text-gray;
 		span{
 			/*.text-overflow();*/
 			display: inline-block;
 			width: 50px;
 		}
 	}
 }
 .message-info{
            position: relative;
 			.flexbox();
 			.align-items(center);
 			.avatar-img{
 			}
            .message{
                /*border:1px solid red;*/
                height: 16px;
                line-height: 16px;
                overflow: hidden;
                /*.text-overflow();*/
                margin-top: 5px;
                font-size: 0.56rem;
                color:@color-text-gray;

            }
 		}
        .title{
            font-size: 0.66rem;
        }
 		.time{
 			margin-top: -15px;
 		}
 
.mark{
    position: absolute;
    .square(8px);
    top:0;
    left:20px;
    border-radius: 50%;
    background-color: @color-danger
}
.emoji{
    display:inline-block;
    .square(16px);
}
.message-item {
    position: relative;
    .delete{
        position: absolute;
        right:0;
        .size(60px; 100%);
        background-color:@color-danger;
        text-align: center;
        line-height: 60px;
        color:#fff;
    }
}
</style>