<template>
  <div class="reminder">
    <mt-header title="温馨提示" v-show="isHeader"></mt-header>
    <scroll class='content'>
    	<div class="reminder-content">
    		<img src="./warm.png" alt="" class='img-responsive'>
        <section class='reminder-text'>
          <p class='reminder-text-item'>
            <i class="reminder-icon"></i>
            当服务完成时，请联系服务使用者进入订单页面，点击“确认完成”按键。点击后此服务进入“服务已完成”状态，收入将由系统自动转入“我的收入”中；
          </p>
          <p class='reminder-text-item'>
          <i class="reminder-icon"></i>
          当订单进入“服务进行中”状态，且服务使用者未点击“确认完成”按键，三天后订单将自动进入“服务已完成”状态，同时收入自动转入“我的收入”中。
          </p>
        </section>
    	</div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {browserTest} from 'common/js/browser'
export default {
  data() {
    return {
      isHeader: true
    }
  },
  components: {
    MtHeader,
    Scroll
  },
  created() {
    this.isHeader = browserTest()
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
  bottom:0;
  padding:30px 60px;
  background-color: #fffce2;
  .reminder-content{
    height:auto;
    font-size:12px;
    color:@color-text-secondary;
    .reminder-icon{
      display:inline-block;
      margin-right: 5px;
      .square(6px);
      border-radius: 50%;
      background:@color-text-secondary;
    }
    .reminder-text{
      margin-top:36px;
      .reminder-text-item{
        margin-bottom: 20px;
      }
    }               
  }
 }
</style>