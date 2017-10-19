<template>
  <mt-header :title="title" :style="bg">
    	 <mt-button  :style="icon" icon="back" slot="left" @click.native="back()"></mt-button>
       <mt-button  slot="right" @click="handle"><slot></slot></mt-button>
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
    },
    path: {
      type: String,
      default: ''
    }
  },
  components: {
    mtHeaderd: Header
  },
  methods: {
    back() {
      if (this.path) {
        this.$router.push(this.path)
      } else {
        window.history.back()
      }
    },
    handle() {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';


</style>
