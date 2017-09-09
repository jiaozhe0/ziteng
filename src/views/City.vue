<template>
  <div class='city'>
    	<mt-header title="城市"></mt-header>
    	<list-view ref='list'></list-view>	
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import MtHeader from 'components/mtHeader'
import ListView from 'components/ListView'
export default {
  data() {
    return {

    }
  },
  components: {
    Scroll,
    MtHeader,
    ListView
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 

</style>