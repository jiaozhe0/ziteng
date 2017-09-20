<template>
  <mt-header :title="title" :style="bg">
    	 <mt-button  :style="icon" icon="back" slot="left" @click.native="back()"></mt-button>
  </mt-header>
</template>

<script  type="text/ecmascript-6">
import {Header} from 'mint-ui'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    bg: {
      type: Object,
      default: function () {
        return { }
      }
    },
    icon: {
      type: Object,
      default: function () {
        return { }
      }
    }
  },
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
