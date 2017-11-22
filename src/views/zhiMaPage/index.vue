<template>
  <div class="zhima">
    <mt-header title='我的芝麻分' path="/home"></mt-header>
		 <div class="content zhima-content">
		 	<iframe :src="$route.query.path" frameborder="0" class="view"></iframe>
		 </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
export default {
	components: {
		MtHeader
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.zhima-content{
	bottom: 0
}
.zhima{
	.view{
		display: block;
		.square(100%)
	}
}
</style>