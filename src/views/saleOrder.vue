<template>
<div class=''>
    <tab class='buyOrder-nav' ref='tabItem'>
       <tab-item selected @click.native="_setevaluateType(1)" class='tab-reItem'>
       <div class="count" v-if="orderCount>0">{{orderCount}}</div>待接单</tab-item>
       <tab-item @click.native="_setevaluateType(2)">进行中</tab-item>
       <tab-item @click.native="_setevaluateType(4)">已完成</tab-item>
       <tab-item @click.native="_setevaluateType(3)">已取消</tab-item>
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
       <order-list @refresh="_jdRefresh" :orderList="orderList" userType='service'></order-list>
      </scroller>
    </div>
    <div v-else class='noData-wrap'>
      <scroller :refreshIcon="refreshing"
        @refresh="_refresh"
      >
        <no-data :typeStyle="false"></no-data>
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
import {getSellOrderList, getListRemind} from 'api/order'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
const LIMIT = 15
export default {
  data() {
    return {
      loading: false,
      refreshing: false,
      hasMore: false,
      orderList: [],
      param: {
        userId: '',
        status: 1,
        currentPage: 0
      }
    }
  },
  created() {
    this.param.userId = this.user.userId
  },
  activated() {
    this._getSellOrderList()
    this._getListRemind(this.user.userId)
  },
  components: {
    Tab,
    TabItem,
    Scroller,
    NoData,
    OrderList
  },
  computed: {
    ...mapGetters(['user', 'orderCount'])
  },
  methods: {
    ...mapMutations({
      setOrderCount: 'ORDERCOUNT'
    }),
    // 跳到进行中
    _goWorking() {
      this.$refs.tabItem.currentIndex = 1
      this.param.status = 2
    },
    // 选择订单状态
    _setevaluateType(status) {
      this.param.status = status
      this._getSellOrderList()
    },
    // 获取待评价或待接单个数
    _getListRemind(id) {
      getListRemind(id).then(res => {
        if (res.code === '000000') {
          this.setOrderCount(res.data.sellListRemind.unCatch)
        }
      })
    },
    // 获取订单列表
    _getSellOrderList() {
      this.param.currentPage = 0
      this.refreshing = true
      console.log(888, this.param)
      getSellOrderList(this.param).then(res => {
        console.log(999, res)
        if (res.code === '000000') {
          this._processingData(res.data.list)
        }
      })
    },
    // 刷新
    _refresh() {
      this._getSellOrderList()
      this._getListRemind(this.user.userId)
    },
    _jdRefresh() {
      this._goWorking()
      this._refresh()
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
      getSellOrderList(this.param).then((data) => {
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
  /*margin-top: 44px;*/
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