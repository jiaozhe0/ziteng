<template>
  <mt-header :title="title">
    	 <mt-button  icon="back" slot="left" @click.native="back()"></mt-button>
    </mt-header>
</template>

<script  type="text/ecmascript-6">
import {Header} from 'mint-ui'
export default {
  props: ['title'],
  components: {
    mtHeaderd: Header
  },
  methods: {
    back() {
      window.history.back()
    }
  }
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';


</style>
