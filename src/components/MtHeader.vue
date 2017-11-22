<template>
  <mt-header :title="title" :style="bg">
    	 <mt-button  v-show='share'  icon="back" slot="left" @click.native="back()" :class="{'backIcon': icon}"></mt-button>
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
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: ''
    },
    share: {
      type: Boolean,
      default: true
    },
    isBack: {
      type: Boolean,
      default: true
    }
  },
  components: {
    mtHeaderd: Header
  },
  methods: {
    back() {
      if (this.path) {
        this.$router.replace(this.path)
      } else if (this.isBack) {
         window.history.back()
      } else {
        return
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
