<template>
  <div class="refresh">
  	<div>{{text}}刷新</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			text: '下拉'
		}
	}

}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';

</style>