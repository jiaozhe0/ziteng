<template>
  <div>
   <!-- <mt-header title='购买订单'></mt-header> -->
    <mt-header title="购买订单" v-if="$route.query.flag"></mt-header>
  	<div class="bar row order-nav text-center" v-else>
  		<router-link to="/order/buy" tag='div' class="col-50 text-right"active-class="order-nav-active">购买订单</router-link>
  		<router-link to="/order/sale" tag='div' class="col-50 text-left" active-class="order-nav-active">出售订单</router-link>
  	</div>
  	<div class="content" :class="{'buyOrder':$route.query.flag}">
  		<keep-alive>
          <router-view></router-view>
      </keep-alive>
  	</div>
    <hint :iShow.sync="hintShow" @finishOrder="_finishOrder"></hint>
  </div>
</template>

<script type="text/ecmascript-6">
import {getListRemind, finishOrder} from 'api/order'
import MtHeader from 'components/mtHeader'
import {Toast} from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
import Hint from 'components/hint/index'
export default {
  data() {
    return {
      orderCount: 0,
      hintShow: false,
      param: {}
    }
  },
  components: {
    MtHeader,
    Hint
  },
  activated() {
    this.setFooter(true)
    // window.history.forward(1)
    this.$root.eventHub.$on('setOrderInfo', (data) => {
      this.hintShow = true
      this.param = data
    })
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations({
      setFooter: 'CHANGE_FOOTER_SHOW'
    }),
    // 获取待评价或待接单个数
    _getListRemind(id) {
      getListRemind(id).then(res => {
        if (res.code === '000000') {
          let saleCount = res.data.sellListRemind.unCatch
          this.evaluateCount = res.data.purchaseListRemind.unEvaluate
          if (saleCount > 0) {
            this.$router.replace({path: '/order/sale', query: {count: saleCount}})
          } else {
            this.$router.replace({path: '/order/buy'})
          }
        }
      })
    },
    _finishOrder() {
      let params = {
        orderId: this.param.orderId,
        orderUserId: this.user.userId
      }
        finishOrder(params).then(res => {
        if (res.code === '000000') {
          if (res.data.status === 106) {
            Toast('完成订单')
            this.hintShow = false
            this.$router.push({path: '/order/evaluate', query: {orderId: this.param.orderId, pic: this.param.pic, title: this.param.title}})
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .buyOrder{
  bottom:0
 }
.order-nav{
	background:@color-primary;
	font-size:0.65rem;
	line-height:44px;
	color:rgba(255,255,255,0.4);
	.order-nav-active{
		color:#fff;
    font-size:0.7rem;
	}
}
</style>