<template>
<div class="message">
    <mt-header title="我的消息" :share="false"></mt-header>
    <div class="content message-content" v-if="chatList.length">
    	<message-list v-for="item in chatList" :message="item"></message-list>
    </div>
    <div class="content" v-else>
    	<div class="no-publish">
    		<div class="img-wrap">
    		</div>
    		<strong>暂无消息</strong>
    		<p>好消息一定在路上.....</p>
    	 </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import MessageList from 'components/messageList'
import {mapGetters, mapMutations} from 'vuex'
export default {
	data() {
		return {
			messageList: []
		}
	},
	created() {
		console.log(8887, this.chatList)
		this.isFooter(true)
	},
	computed: {
		...mapGetters(['chatList'])
	},
	components: {
		MtHeader,
		MessageList
	},
	methods: {
		...mapMutations({
			isFooter: 'CHANGE_FOOTER_SHOW'
		})
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .no-publish{
	margin-top: 40px;
	text-align: center;
	strong{
		font-size: 0.8rem;
		font-weight: 400;
		color: @color-primary
	}
	&>p{
		margin: 2px auto 30px;
		font-size: 0.6rem;
		color:@color-text-gray;
	}
	.img-wrap{
		.size(375px;180px);
		background-size: 375px 180px;
		margin: 30px auto;
		background-image: url('./noMessage@2x.png');
	}
	.ser-btn{
		.size(200px;36px);
		margin:20px auto;
		line-height: 36px;
		color: #fff;
		border-radius: 6px;
		background-color: @color-primary;
		font-size: 0.65rem;
	}
}
</style>