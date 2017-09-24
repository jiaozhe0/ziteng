<template>
	<baidu-map class='map' center="北京"></baidu-map>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			center: {lng: 0, lat: 0}
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.map {
  width: 100%;
  height: 300px;
}
</style>