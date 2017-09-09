<template>
  <div>
    <mt-header title='Index'></mt-header>
			<scroll :data="test" class="content">
			  <div>
			    <router-link to='/reminder'>温馨提示</router-link>
					<ul class="service-list">
					 <li v-for='item in test'>{{item}}</li>
					</ul>
					</div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import {Header} from 'mint-ui'
export default {
  data() {
    return {
    }
  },
  components: {
    Scroll,
    mtHeader: Header
  },
  computed: {
    test() {
      var arr = new Array(99)
      arr = arr.map((item, index) => {
        return index
      })
      return arr
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';


</style>