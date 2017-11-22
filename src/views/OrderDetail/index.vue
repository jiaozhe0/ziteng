<template>
<div class='orderDetail'>
    <mt-header title="订单详情" :path="orderUrl"></mt-header>
    <!-- 购买路径 -->
    <div class="appServer-header orderDetail-header text-center" v-if="orderInfo.orderStatus !== 3 && param.userType == 'user'">
  			<ul class="appServer-path">
  				<li class="appServer-path-item " :class="{'on':buyPathFirst}">
  					<div class="center-block path-icon on" ></div>
  					<span class="path-text on">支付</span>
  				</li>
  				<li class="appServer-path-item " :class="{'on':buyPathSecond}">
  					<div class="center-block path-icon" :class="{'on':buyPathFirst}"></div>
  					<span class="path-text" :class="{'on':buyPathFirst}">等待对方接单</span>
  				</li>
  				<li class="appServer-path-item "  :class="{'on':buyPathThird}">
  					<div class="center-block path-icon" :class="{'on':buyPathSecond}"></div>
  					<span class="path-text" :class="{'on':buyPathSecond}">服务进行中</span>
  				</li>
  				<li class="appServer-path-item" :class="{'on':buyPathFourth}">
  					<div class="center-block path-icon" :class="{'on':buyPathThird}"></div>
  					<span class="path-text" :class="{'on':buyPathThird}">完成</span>
  				</li>
  			</ul>
  	</div>

    <!-- 售出路径 -->
      <div class="appServer-header orderDetail-header text-center service" v-else-if="orderInfo.orderStatus !== 3 && param.userType == 'service'">
          <ul class="appServer-path">
            <li class="appServer-path-item " :class="{'on':buyPathSecond}">
              <div class="center-block path-icon on" ></div>
              <span class="path-text on">接单</span>
            </li>
            <li class="appServer-path-item " :class="{'on':buyPathThird}">
              <div class="center-block path-icon" :class="{'on':buyPathSecond}"></div>
              <div class="path-text path-text-center" :class="{'on':buyPathSecond}">
                服务进行中
                <router-link class="" to="/reminder/user/html">怎样完成服务?</router-link>
              </div>
            </li>
            <li class="appServer-path-item" :class="{'on':buyPathThird}">
              <div class="center-block path-icon" :class="{'on':buyPathThird}"></div>
              <span class="path-text" :class="{'on':buyPathThird}">完成</span>
            </li>
          </ul>
      </div>

  	<scroll class="content orderDetail-content" 
    :class="{'on':orderInfo.orderStatus == 3, 'success':orderInfo.orderStatus == 3 || orderInfo.orderStatus == 4 && orderInfo.isEvaluate == 1|| orderInfo.orderStatus == 2 && param.userType == 'service'}"
    ref="scroll">
      <div class="scroll-content">
  		<p class="order-point" v-if="orderInfo.orderStatus == 3 || orderInfo.orderStatus == 0">
       {{orderInfo.orderStatus == 3 ? '服务已取消'+ '' + '('+ orderInfo.cancelTypeName + ')' : '订单已提交，请在' + minute + '分' + seconds + '秒之内完成付款，超时订单将自动取消'}}
  		</p>
  		<div class="card orderDetail-card">
  			 <div class="card-content">
  			   <div class="card-content-inner ">
  			   	<div class="clearfix" v-if="orderInfo.service">
  			   		<div class="img-wrap pull-left">
  			   			<img :src="orderInfo.service.servicePicName" alt="" class="img-responsive">
  			   		</div>
  			   		<div class="pull-left">{{orderInfo.service.title}}</div>
  			   	</div>
  			   	<div class='orderDetail-price'>
  			   		<div class='total'>￥{{orderInfo.totalAmount}}</div>
  			   		<div class="text-right copies">x {{orderInfo.copies}}</div>
  			   	</div>
  			   </div>
  			 </div>
  			 <div class="card-footer">
  			 	<div class='user-info' v-if="orderInfo.service">
          <div class="avatar-img ">
            <img :src="orderInfo.user.photoUrl" alt="" class="img-responsive">
          </div>
          <div class="name">{{orderInfo.user.userName}}</div>
          </div>
  			 	<div v-if="orderInfo.user">
          <!-- v-if="orderInfo.orderStatus == 2" -->
            <a v-if="orderInfo.orderStatus == 2" :href="'tel:'+ _number()" @click.stop="" class="concatBtn phone"></a>
            <button @click="_goChat" class="concatBtn message"></button>
          </div>
  			 </div>
  		</div>
  		<mt-cell title="预约时间" class='order-item'>
  			<span class="order-item-text">{{orderInfo.makeTime}}</span>
  		</mt-cell>
  		<mt-cell title="联系人" class='order-item' v-if="orderInfo.address">
  			<span class="order-item-text">{{orderInfo.address.receiver}}</span>
  		</mt-cell>
  		<mt-cell title="电话" class='order-item' v-if="orderInfo.address">
  			<span class="order-item-text">{{orderInfo.address.phoneNumber}}</span>
  		</mt-cell>
  		<mt-cell title="地址" class='order-item' is-link @click.native="_toAddress" v-if="orderInfo.address">
  			<span class="order-item-text">{{orderInfo.address.area}}</span>
  		</mt-cell>
  		<mt-cell title="订单编号" class='order-item'>
  			<span class="order-item-text">{{orderInfo.displayOrderId}}</span>
  		</mt-cell>
  		<mt-cell title="订单总价" class='order-item'>
  			<span class="order-item-text">{{orderInfo.totalAmount}}元</span>
  		</mt-cell>
  		<mt-cell title="支付路径" class='order-item'>
  			<span class="order-item-text" v-if="orderInfo.payType == 2"><div class="payIcon aliPay"></div>支付宝</span>
        <span class="order-item-text" v-else><div class="payIcon weChat"></div>微信</span>
  		</mt-cell>
      <p class='textOn ' v-if="orderInfo.orderStatus == 2 && param.userType == 'service'">如订单遇到问题，请联系客服解决。客服热线：4006061260</p>
      <p class='textOn ' v-if="orderInfo.orderStatus == 3 && param.userType == 'user'">退款信息</p>
     <div class="card evaluateList" ref="evaluate" v-if="evaluateList.length">
          <div class="card-header">
            <div class="serDtial-title">
              我的评价
            </div>
          </div>
          <div class="card-content evaluate-wrap">
            <evaluate-list :footer="false" :evaluateList="evaluateList"></evaluate-list>
          </div>
        </div>

    </div>
  	</scroll>
    <!-- 底部导航 -->
    <div class="bar bar-footer text-right orderDetail-footer" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1 || orderInfo.orderStatus == 2 && param.userType == 'user' || orderInfo.orderStatus == 4 && orderInfo.isEvaluate == 0 ">
      <div class="text-right" v-if="param.userType == 'user'">
           <button class="pay-btn pay" v-if="orderInfo.orderStatus == 4 && orderInfo.isEvaluate == 0" @click="_goEvaluate">去评价</button>
           <button class="pay-btn cancel" @click="_goCancelOrder" v-show="cancel" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1 || orderInfo.orderStatus == 2">取消订单</button>
           <button class="pay-btn pay" v-if="orderInfo.orderStatus == 0" @click="_goOrderPay">立即支付</button>
           <button class="pay-btn pay" v-if="orderInfo.orderStatus == 2" @click="_finishOrder" >确认完成</button>
      </div>
      <div class="text-right" v-else-if="param.userType == 'service'">
           <button class="pay-btn cancel" @click="_goCancelOrder" v-show="cancel">拒单</button>
           <button class="pay-btn pay" @click="_receiveOrder">确认接单</button>
      </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {Cell, Toast} from 'mint-ui'
import {getDetail, getStatus, receiveOrder, finishOrder} from 'api/order'
import {mapMutations, mapGetters} from 'vuex'
import {getEvaluateList} from 'api/evaluate'
import EvaluateList from 'components/EvaluateList/index'
var url = ''
export default {
	data() {
		return {
			buyPathFirst: false,
			buyPathSecond: false,
      buyPathThird: false,
      buyPathFourth: false,
      salePathFirst: false,
      salePathSecond: false,
      salePathThird: false,
			second: 0,
			minute: 0,
      evaluateList: [],
      orderInfo: {},
      cancel: true,
      param: {
        orderId: '', // 服务ID
        userType: '', // 用户类型
        userId: '' // 用户ID
      },
      orderStatus: {}
		}
	},
	created() {
    this.setFooter(false)
    this.param.userId = this.user.userId
	},
  activated() {
    this._setUrl(url)
    if (this.$route.query.hour) {
      this.minute = this.$route.query.hour && this.$route.query.hour
      this.second = this.$route.query.minute && this.$route.query.minute
      this._countDown()
    }
    this.param.orderId = this.$route.query.orderId
    this.param.userType = this.$route.query.userType
    this._getDetail(this.param)
    this._getStatus(this.$route.query.orderId)
  },
  deactivated() {
    this.buyPathFirst = false
    this.buyPathSecond = false
    this.buyPathThird = false
    this.setFooter(true)
    clearInterval(this.timer)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  beforeRouteEnter(to, from, next) {
    url = from.path
    next()
  },
  updated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    ...mapGetters(['user', 'orderUrl']),
    seconds () {
      return this.second < 10 ? '0' + this.second : this.second
    }
  },
	components: {
		MtHeader,
		MtCell: Cell,
    Scroll,
    EvaluateList
	},
	methods: {
    // 电话
    _number() {
      return this.user.userId === this.orderInfo.serviceUserId ? this.orderInfo.address.phoneNumber : this.orderInfo.user.phoneNumber
    },
    // 前往取消订单/拒接
    _goCancelOrder() {
      this.$router.push({path: '/service/order/cancel', query: {userType: this.$route.query.userType, orderId: this.$route.query.orderId}})
    },
    // 获取订单详情
    _getDetail(data) {
      console.log('订单服务param')
      console.log(data)
      this.setLoading(true)
      getDetail(data).then(res => {
        if (res.code === '000000') {
          this.orderInfo = res.data
          console.log('服务详情')
          console.log(this.orderInfo)
          this.evaluateList = this.orderInfo.evaluate ? new Array(this.orderInfo.evaluate) : []
          if (this.orderInfo.orderStatus === 1) {
            this.buyPathFirst = true
          } else if (this.orderInfo.orderStatus === 2) {
            this.buyPathFirst = true
            this.buyPathSecond = true
          } else if (this.orderInfo.orderStatus === 4) {
            this.buyPathFirst = true
            this.buyPathSecond = true
            this.buyPathThird = true
          }
          this.setLoading(false)
          console.log(555, this.orderInfo)
        }
      })
    },
    // 获取订单状态
    _getStatus(id) {
      getStatus(id).then(res => {
        if (res.code === '000000') {
          this.orderStatus = res.data
          console.log(99, this.orderStatus)
          if (this.orderStatus.remainTime) {
            console.log(this.orderStatus.remainTime)
            this.second = parseInt(this.orderStatus.remainTime / 1000 % 60, 10)
            this.minute = parseInt(this.orderStatus.remainTime / 1000 / 60 % 60, 10)
            this._countDown()
          }
        }
      })
    },
    // 服务者接单
    _receiveOrder() {
      let data = {
        serviceUserId: this.param.userId,
        orderId: this.param.orderId
      }
      receiveOrder(data).then(res => {
        console.log(res)
        if (res.code === '000000') {
          if (res.data.status === 103) {
            Toast('接单成功')
            this.$nextTick(() => {
             this._getDetail(this.param)
            })
          }
        }
      })
    },
    // 购买确认完成
    _finishOrder() {
      let data = {
        orderUserId: this.param.userId,
        orderId: this.param.orderId
      }
      finishOrder(data).then(res => {
        console.log(res)
        if (res.code === '000000') {
          if (res.data.status === 106) {
            Toast('完成订单')
            this.$nextTick(() => {
              // this._getDetail(this.param)
              this.$router.push({path: '/order/evaluate', query: {orderId: this.orderInfo.orderId, pic: this.orderInfo.service.servicePicName, title: this.orderInfo.service.title}})
            })
          }
        }
      })
    },
    // 进入支付页面
    _goOrderPay() {
      this.$router.push({path: '/service/order/pay', query: {'orderId': this.orderInfo.orderId, minute: this.minute, second: this.second}})
    },
    // 倒计时
    _countDown() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.second <= 0) {
          this.minute -= 1
          this.second = 60
          if (this.minute <= 0) {
            this.cancel = false
            clearInterval(this.timer)
            return
          }
        }
        this.second -= 1
      }, 1000)
    },
    // 去评价
    _goEvaluate() {
      this.$router.replace({path: '/order/evaluate', query: {orderId: this.orderInfo.orderId, pic: this.orderInfo.service.servicePicName, title: this.orderInfo.service.title}})
    },
    // 获取评价列表
    _getEvaluateList(serviceId) {
      this.refreshing = true
      this.param.currentPage = 0
      this.param.serviceId = serviceId
      getEvaluateList(this.param).then((data) => {
        console.log(data)
      })
    },
    _setUrl(url) {
      if (url.indexOf('/order/buy') > -1 || url.indexOf('/order/sale') > -1) {
        this.setOrderUrl(url)
      } else if (url.indexOf('/order/pay') > -1) {
        let uri = '/servicedetail?serviceId=' + this.$route.query.serviceId
        this.setOrderUrl(uri)
      }
    },
    _toAddress() {
      this.$router.push({path: '/servicemap',
        query: {lng: this.orderInfo.address.longitude,
          lat: this.orderInfo.address.latitude,
           name: this.orderInfo.address.area}})
    },
    _goChat() {
      this.$router.push({path: '/message/chat',
        query: {
          otherUserId: this.orderInfo.user.userId,
          otherUserNick: this.orderInfo.user.userName,
          otherUserPic: this.orderInfo.user.photoUrl
        }})
    },
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
      setOrderUrl: 'ORDERURL',
      setLoading: 'LOADING'
		})
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .orderDetail-content{
 	top:134px;
 	background-color: #eee;
  &.on{
    top:44px!important;
  }
  &.success{
    bottom:0!important;
  }
  .scroll-content{
    height: auto;
    margin-bottom: 20px
  }
  .order-point{
    margin:0;
    padding:10px;
    font-size:0.6rem;
    background-color:@color-hint;
    color:@color-danger
  }
  .textOn{
    height: 40px;
    font-size: 0.54rem;
    padding: 0 10px;
  }
 }
 .orderDetail-header{
 		.appServer-path-item{
 			width:24%;
 			.path-text{
	 			color:rgba(255,255,255,0.5);
  	 		&.on{
  	 			color:#fff;
  	 		}
	 	 }
 		}
  &.service{
    .appServer-path-item{
      width:32.5%;
      .path-text-center{
        position: relative;
        top:14px;
        display: inline-block;
        line-height: 18px;
        a{
          margin: 0;
          display: block;
          font-size: 0.52rem;
          color: #fff;
        }
      }
    }
  }
 }
 .orderDetail-card{
    margin-top:0px;
 		margin-bottom: 8px;
	 	.card-content-inner{
	 		.flexbox();
	 		.justify-content(space-between);
	 		.align-items(center)
	 	}
    .img-wrap{
      .square(54px);
      margin-right: 8px;
    }
 }
 .order-item{
 		color:@color-text-gray;
 	.order-item-text{
 		color:@color-text-secondary;
 	}
 }
 .orderDetail-price{
   .total{
    font-size: 0.8rem;
   }
   .copies{
    font-size: 0.64rem;
    color: @color-text-gray;
   }
 }
 .orderDetail-footer {
    background-color: #fff;
 }
 .payIcon{
  display: inline-block;
  .square(26px);
  margin-right: 5px;
  background-size: 26px 26px;
  vertical-align: middle;
  &.weChat{
    .bg-view-image('OrderDetail/weChatPay');
  }
  &.aliPay{
    .bg-view-image('OrderDetail/aliPay');
  }
 }
 .concatBtn{
  display: inline-block;
  .square(28px);
  background-size: 28px 28px;
  &.phone{
    .bg-view-image('OrderDetail/phone')
  }
  &.message{
      margin-left: 18px;
      border:none;
     .bg-view-image('OrderDetail/doMessage');
     background-color: transparent;
  }
 }
 .serDtial-title{
  border-left: 3px solid @color-danger;
  padding-left:10px;
  font-size: 0.7rem;
 }
</style>