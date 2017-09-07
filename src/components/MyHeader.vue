<template>
  <div class="bar">
  	<slot></slot>
  </div>
</template>

<script  type="text/ecmascript-6">
export default {
  
}
</script>

<style scoped lang="less" >
@import 'common/css/variable.less';
@import 'common/css/mixin.less';
.bar{
  position: absolute;
  right: 0;
  left: 0;
  z-index: 10;
  height: @bar-base-height;
  padding-right: @bar-side-spacing;
  padding-left: @bar-side-spacing;
  background-color: #f7f7f8;
  .hairline(bottom, @border-default-color);
  -webkit-backface-visibility: hidden; // Make sure the bar is visible when a modal animates in.
          backface-visibility: hidden;
}

</style>
