<template>
<div class='status danger text-center'>
	<!-- 我的认证页面：认证状态， -->
	<div v-if="type">{{statusText}}<span v-if="authDescribe">({{authDescribe}})</span></div>
	<!-- 服务详情页：服务发布审核状态 -->
	<div v-else-if='!type && !!serviceStatus'>{{serviceText}}</div>
	<!-- 我的发布页面：认证状态 -->
  <div v-else  class="service-status">
  	<div>你还未提交认证，用户无法购买您的服务</div>
  	<div>去认证</div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		type: { // 如果type值为true,则表示身份真正
			type: Boolean,
			default: true
		},
		status: { // 身份认证状态值
			type: Number,
			default: 0
		},
		authDescribe: { // 认证信息描述
			type: String,
			default: ''
		},
		serviceStatus: { // 发布服务的审核状态值
			type: Number,
			default: 0
		}
	},
	computed: {
		statusText() {
			let statusText = ''
			switch (this.status) {
				case 1:
					statusText = '未提交审核'
					break
				case 3:
					statusText = '审核失败'
					break
				case 4:
					statusText = '审核成功'
					break
				case 2:
				default:
					statusText = '审核中'
				break
			}
			return statusText
		},
		serviceText() {
			let text = ''
			switch (this.serviceStatus) {
				case 3:
					text = '服务正在审核中，请耐心等待'
				break
				case 2:
					text = '审核未通过，请重新提交服务'
				break
			}
			return text
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .status{
			/*position: absolute;
			top:0;*/
			.size(100%;34px);
			font-size: 0.6rem;
			line-height: 34px;
			background: #fff8bf;
	.service-status{
		.flexbox();
		.align-items(center);
		.justify-content(space-between);
		padding: 0 15px;
	}
}

</style>