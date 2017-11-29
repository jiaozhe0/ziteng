<template>
<div class=''>
    <tab class='buyOrder-nav'>
       <tab-item selected @click.native="_setevaluateType(2)">未完成</tab-item>
       <tab-item @click.native="_setevaluateType(4)">已完成</tab-item>
       <tab-item @click.native="_setevaluateType(9)" class='tab-reItem'>
       <div class="count" v-if="evaluateCount>0">{{evaluateCount}}</div>待评价</tab-item>
       <tab-item @click.native="_setevaluateType(0)">全部</tab-item>
    </tab>
    <div class="content">
    <div  v-if="orderList.length">
    <scroller class='buyOrder-content'
        :refreshIcon="refreshing"
        :loadIcon="loading"
        :dataList="orderList"
        @refresh="_refresh"
        @loadMore="_loadMore"
        >
       <order-list :orderList="orderList" 
       userType='user' 
       :path="$route.query.flag && $route.query.flag"
       @setOrderInfo="_setOrderInfo"
       @refresh="_refresh"></order-list>
      </scroller>
    </div>
    <div v-else class='noData-wrap'>
      <scroller :refreshIcon="refreshing" @refresh="_refresh">
        <no-data></no-data>
      </scroller>
    </div>
   </div>
   
</div>
</template>
<script type="text/ecmascript-6">
import {Tab, TabItem} from 'components/tab/index'
import Scroller from 'components/scroller/index'
import NoData from 'components/NoData/index'
import OrderList from 'components/orderList/index'
import {getBuyOrderList, getListRemind, finishOrder} from 'api/order'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
const LIMIT = 15
var fromPath = ''
export default {
  data() {
    return {
      loading: false,
      refreshing: false,
      hasMore: false,
      orderList: [],
      evaluateCount: 0, // 评论的数量
      param: {
        userId: '',
        status: 2, // 订单状态（必填：可选数据：0：全部，2：未完成，3：已取消，4：已完成，9：待评价)
        currentPage: 0
      },
      bottom: false,
      orderInfo: { // 订单信息
        orderId: '', // 订单Id
        pic: '', // 图片
        title: '' // 服务名
      },
      hintShow: true // 提示
    }
  },
  created() {
     this.param.userId = this.user.userId
  },
  beforeRouteEnter(to, from, next) {
    fromPath = from.path
    next()
  },
  activated() {
    // 如果小于0
    if (fromPath.indexOf('order/sale') < 0) {
      this._getListRemind(this.user.userId)
    }
    this._getBuyOrderList()
  },
	components: {
		Tab,
		TabItem,
		Scroller,
    NoData,
    OrderList
	},
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
   ...mapMutations({
      setOrderCount: 'ORDERCOUNT'
    }),
    _setOrderInfo(orderInfo) {
      this.hintShow = true
      this.orderInfo = Object.assign({}, this.orderInfo, orderInfo)
    },
    _finishOrder() {
      let param = {
        orderId: this.orderInfo.orderId,
        orderUserId: this.user.userId
      }
      finishOrder(param).then(res => {
        console.log('res')
        if (res.code === '000000') {
          if (res.data.status === 106) {
            Toast('完成订单')
            console.log(this.orderInfo)
            this.$router.push({path: '/order/evaluate', query: {orderId: this.orderInfo.orderId, pic: this.orderInfo.pic, title: this.orderInfo.title}})
            // this.$emit('refresh')
          }
        }
      })
    },
    _setevaluateType(status) {
      this.param.status = status
      this._getBuyOrderList()
    },
    // 获取待评价或待接单个数
    _getListRemind(id) {
      getListRemind(id).then(res => {
        if (res.code === '000000') {
          let saleCount = res.data.sellListRemind.unCatch
          this.setOrderCount(saleCount)
          this.evaluateCount = res.data.purchaseListRemind.unEvaluate
          if (saleCount > 0) {
             this.$router.replace({path: '/order/sale'})
          }
        }
      })
    },
    // 获取购买列表
    _getBuyOrderList() {
      this.param.currentPage = 0
      this.refreshing = true
      this.hasMore = false
      console.log(888, this.param)
      getBuyOrderList(this.param).then(res => {
        console.log(999, res)
        if (res.code === '000000') {
          this._processingData(res.data.list)
        }
      })
    },
    // 刷新
    _refresh() {
      this._getBuyOrderList()
    },
    // 加载更多
    _loadMore() {
      if (this.loading) {
        return
      }
      if (this.hasMore) {
        Toast('没有更多数据')
        return
      }
      this.param.currentPage += 1
      this.loading = true
      getBuyOrderList(this.param).then((data) => {
        if (data.code === '000000') {
          this._processingData(data.data.list, true)
        }
      })
    },
    // 数据处理
    _processingData(data, flag) {
      if (data.length === 0) {
        Toast('没有更多数据')
      }
      if (flag) {
        console.log(567, this.orderList)
        this.orderList = this.orderList.concat(data)
        this.loading = false
        if (data.length < LIMIT) {
          this.hasMore = true
        }
      } else {
        this.orderList = data
        setTimeout(() => {
          this.refreshing = false
        }, 20)
      }
    }
  }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .buyOrder-nav{
	line-height:44px;
  z-index: 99;
 }
.buyOrder-content{
	.buyOrder-content-list{
    margin-top: 0;
		width:100%;
		border:1px solid red;
	}
}
.content{
  bottom: 0;
}
</style>