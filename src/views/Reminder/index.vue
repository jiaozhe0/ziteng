<template>
  <div class="reminder">
    <mt-header title="温馨提示" v-show="isHeader"></mt-header>
    <scroll class='content' :style="{'top': isHeader ? '44px' : '0px'}">
    	<div class="reminder-content">
    		<img src="./warm.png" alt="" class='img-responsive'>
        <section class='reminder-text' v-if="this.$route.params.title === 'server'">
          <p class='reminder-text-item'>
            <i class="reminder-icon"></i>
            当服务完成时，请联系服务使用者进入订单页面，点击“确认完成”按键。点击后此服务进入“服务已完成”状态，收入将由系统自动转入“我的收入”中；
          </p>
          <p class='reminder-text-item'>
          <i class="reminder-icon"></i>
          当订单进入“服务进行中”状态，且服务使用者未点击“确认完成”按键，三天后订单将自动进入“服务已完成”状态，同时收入自动转入“我的收入”中。
          </p>
        </section>
        <section class='reminder-text' v-else-if="this.$route.params.title === 'user'">
          <p class='reminder-text-item'>
            <i class="reminder-icon"></i>
            咨询和交易过程请在桔子生活平台内进行，若聊天记录及资金交易不在平台内发生，当遭遇诈骗或服务纠纷时，平台很难取证，容易造成钱财损失；
          </p>
          <p class='reminder-text-item'>
          <i class="reminder-icon"></i>
          请仔细阅读服务详情，下单前咨询服务细节，并保存相关聊天记录；
          </p>
          <p class='reminder-text-item'>
          <i class="reminder-icon"></i>
          服务未完成状态，请勿点击确认完成。服务完成后，款项会在7天后转入商家账户。如果对订单有异议，请尽快联系桔子生活客服申请仲裁，避免不必要的损失。
          </p>
        </section>
        <section class='reminder-text' v-else>
          <p class='reminder-text-item'>
            <i class="reminder-icon"></i>
            为保障买卖双方利益，当服务完成时，服务款项自动打入服务者账户中，进入“冻结中”状态；
          <p class='reminder-text-item'>
          <i class="reminder-icon"></i>
          “冻结中”的收入，会在7天后解冻，进入可提现状态，此时可进行提现；
          </p>
        </section>
    	</div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
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
    this.isHeader = this.$route.params.broswer === 'html'
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