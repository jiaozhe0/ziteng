<template>
  <div class="vux-tab-item" :class="[currentSelected ? activeClass : '', {'vux-tab-selected': currentSelected, 'vux-tab-disabled': disabled}]" :style="style" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script>
import { childMixin } from '../../mixins/multi-items'

export default {
  mixins: [childMixin],
  props: {
    activeClass: String,
    disabled: Boolean
  },
  computed: {
    style () {
      return {
        height: this.$parent.height,
        lineHeight: this.$parent.lineHeight,
        borderColor: this.$parent.activeColor,
        color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
<style lang="less">
@import '~common/css/variable.less';
@import '~common/css/mixin.less';

</style> 