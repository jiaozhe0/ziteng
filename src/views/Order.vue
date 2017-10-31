<template>
  <div>
    <mt-header title="购买订单" v-if="$route.query.flag"></mt-header>
  	<div class="bar row order-nav text-center" v-else>
  		<router-link to="/order/buy" tag='div' class="col-50 text-right"active-class="order-nav-active">购买订单</router-link>
  		<router-link to="/order/sale" tag='div' class="col-50 text-left" active-class="order-nav-active">出售订单</router-link>
  	</div>
  	<div class="content">
  		<keep-alive>
          <router-view></router-view>
      </keep-alive>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getListRemind} from 'api/order'
import MtHeader from 'components/mtHeader'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      orderCount: 0
    }
  },
  created() {
  },
  components() {
    MtHeader
  },
  activated() {
    if (!this.$route.query.flag) {
      this._getListRemind(this.user.userId)
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
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