<template>
  <div id="app">
    <mt-footer></mt-footer>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
import MtFooter from 'components/MtFooter'
export default {
  name: 'app',
  data() {
    return {
      isHeader: true
    }
  },
  mounted() {
    console.log(this.isHeader)
  },
  components: {
   MtFooter
  }
}
</script>

<style scoped lang="less" >
@import 'common/css/mixin.less';


</style>
