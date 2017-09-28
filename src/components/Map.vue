<template>
<div>	
   <label>关键词：<input v-model="keyword"></label>
  <label>地区：<input v-model="location"></label>
  <baidu-map>
    <bm-view class="map"></bm-view>
    <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
     <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  </baidu-map>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			keyword: '',
			location: '',
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