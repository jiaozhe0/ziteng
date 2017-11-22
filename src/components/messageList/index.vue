<template>
    <mt-cell class='income-item' @click.native="_goChat">
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
                <div v-if="user.userId !== chatInfo.from">
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
        <!-- <div v-else>dd</div> -->
    	<div class="text-right">
    		<div class="time">{{chatInfo.time}}</div>
    	</div>
    </mt-cell>
</template>
<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
import {mapGetters} from 'vuex'
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
        }
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
</style>