<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
import {Header} from 'mint-ui'
import Scroll from 'components/Scroll'
import {browserTest} from 'common/js/browser'
export default {
  name: 'app',
  data() {
    return {
      isHeader: true
    }
  },
  created() {
    this.isHeader = browserTest()
  },
  mounted() {
    console.log(this.isHeader)
  },
  components: {
    appHeader: Header,
    Scroll
  }
}
</script>

<style scoped lang="less" >
@import 'common/css/mixin.less';


</style>
