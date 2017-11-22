<template>
  <div class="reason">
      <div class="result-text">
          <textarea name="" id="" 
          rows="10" :placeholder="placeholder" 
          @keyup="_edit" ref='reason' v-model="text"></textarea>
          <div class="number">{{number}}</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    num: {
      type: Number,
      default: 255
    },
    placeholder: {
      type: String
    },
    reasonText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      text: '',
      number: this.num
    }
  },
  activated() {
    this.text = this.reasonText
    this.$nextTick(() => {
       this.number = this.num - this.$refs.reason.value.length
       console.log('123' + this.$refs.reason.value)
    })
  },
  deactivated() {
    this.text = ''
    this.number = this.num
  },
  computed: {
  },
  methods: {
    _edit(e) {
      if (this.number <= 0) {
        e.target.value = e.target.value.slice(0, this.num)
        return
      } else {
        this.number = this.num - e.target.value.length
        this.$emit('editReason', e.target.value)
      }
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
   .result-text{
    padding: 10px;
    position: relative;
    textarea{
      .size(100%;130px);
      border-radius: 4px;
      border:1px solid @color-split;
      text-indent: 8px;
      font-size: 0.7rem;
    }
    .number{
      position: absolute;
      .size(20px;20px);
      bottom: 14px;
      right:20px;
      font-size: 0.54rem;
    }
}
</style>