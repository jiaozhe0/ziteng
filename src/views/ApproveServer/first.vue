<template>
  <div class="first">
    <p class="first-text">请正确填写工商信息</p>
    <form action="">
     <mt-field  v-model='businessName' label="名称" placeholder="输入工商注册名称"  :attr="{autofocus:true}"></mt-field>
     <mt-field v-model='businessCode' name='gscode' v-validate="'required'" label="工商号码" placeholder="输入工商号码" type="number" ></mt-field>
    </form>
    <button @click="_next" class='center-block next-btn ziteng-btn'>下一步</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { Field, Toast } from 'mint-ui'
export default {
	data() {
    return {
      businessCode: '',
      businessName: ''
    }
  },
  components: {
    MtField: Field
  },
  methods: {
    _next() {
      if (this.businessName === '') {
        Toast('名称不能为空！')
        return
      } else if (this.businessCode === '') {
        Toast('工商号码不能为空！')
        return
      }
      let val = {
        businessName: this.businessName,
        businessCode: this.businessCode,
        pathFirst: true
      }
      this.$emit('info', val)
    },
    _photo() {
      this.$emit('photo')
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.first-text{
  font-size:0.6rem;
  color:@color-text-gray;
  margin:8px auto;
  padding:0 10px;
}
.mint-field{
  border-bottom:1px solid @color-split;
  .mint-cell-wrapper{
    font-size:0.7rem!important;
    border:1px solid red;
  }
}
.next-btn{
  border:none
}


</style>