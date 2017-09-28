<template>
<div>	
 <mt-header title="服务地图"></mt-header>
  <baidu-map class="content" :center="center" @ready="handler" :zoom="15">
   <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label :content="name" :labelStyle="{color: 'red', fontSize : '14px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
	</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
export default {
	data() {
		return {
      center: {},
      name: ''
    }
	},
  components: {
    MtHeader
  },
  activated() {
    this.name = this.$route.query.name
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = this.$route.query.lng
      this.center.lat = this.$route.query.lat
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.content{
  bottom:0
}
</style>