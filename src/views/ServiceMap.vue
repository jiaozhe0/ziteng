<template>
<div>	
 <mt-header title="服务地图"></mt-header>
  <baidu-map class="content" :center="center" @ready="handler" :zoom="17">
   <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label :content="name" :labelStyle="{color: 'red', fontSize : '14px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
	</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {getLocal} from 'api/system'
var fromPath = ''
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
    this.path = fromPath
    this.name = this.$route.query.name
  },
  beforeRouteEnter(to, from, next) {
    fromPath = from.path
    next()
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      //   this.center.lng = this.$route.query.lng
      //   this.center.lat = this.$route.query.lat
      if (this.$route.query.searchArea) {
        getLocal().then(res => {
          console.log(res)
        })
      } else {
        this.center.lng = this.$route.query.lng
        this.center.lat = this.$route.query.lat
      }
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