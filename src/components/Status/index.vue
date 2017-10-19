<template>
<div class='status danger text-center' >
	<div v-if="type">{{statusText}}</div>
  <router-link v-else to=""  class="service-status">
  	<div>你还未提交认证，用户无法购买您的服务</div>
  	<div>去认证</div>
  </router-link>
</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		status: {
			type: Number,
			default: 0
		},
		type: {
			type: Boolean,
			default: true
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
					statusText = '审核失败(图片与信息不符)'
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