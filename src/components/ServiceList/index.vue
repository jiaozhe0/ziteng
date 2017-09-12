<template>
  <ul>
  	<item v-for="item in serviceList" :serviceItem='item'></item>
  </ul>
</template>

<script  type="text/ecmascript-6">
import Item from './item'
export default {
  props: ['serviceList'],
  components: {
   Item
  },
  methods: {
  }
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';


</style>
