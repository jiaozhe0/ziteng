<template>
<div> 
  <baidu-map>
    <bm-view class="map"></bm-view>
    <bm-local-search keyword="餐馆" :nearby="nearby" :auto-viewport="true" :panel="false"></bm-local-search>
    <bm-circle :center="nearby.center" :radius="nearby.radius"></bm-circle>
  </baidu-map>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      center: {},
      location: '',
      keyword: '',
       nearby: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 1000
      }
    }
  },
  created() {
    this.location = '淄博'
    this.keyword = '中心医院'
  },
  methods: {
    // handler ({BMap, map}) {
    //   console.log(BMap, map)
    //   // this.center.lng = this.$route.query.lng
    //   // this.center.lat = this.$route.query.lat
    //   this.loction = '淄博中心医院'
    // }
  },
  computed: {
    ...mapGetters(['city'])
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.content{
  bottom:0
}
.map{
  .size(100%;300px);
}
</style>