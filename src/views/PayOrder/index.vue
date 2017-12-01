<template>
<div class="payOrder">
 	<mt-header title="支付收银台" @click.native="iShow=true" :isBack="false"></mt-header>
 	<div class="content payOrder-content">
 		<p class="timer text-center">
 			请在{{minute}}分{{second < 10 ? '0'+second : second}}秒内完成支付
 		</p>
 		<mt-cell title="订单金额" class='order-item'>
  			<span class="payOrder-text textOn">{{$route.query.totalAmount}}元</span>
  	</mt-cell>
  	<div class='payOrder-title'>支付方式</div>
  	<!--  <mt-cell title="支付宝" class='order-item'>
  	 	<div class="order-item-radio text-center" :class="{'on':payType == 'zfb'}">✓
  	 		<input type="radio" v-model="payType" value='zfb'>
  	 	</div>
  	 </mt-cell> -->
  	<mt-cell  class='order-item'>
  		<div slot='icon'><i class="payIcon"></i>微信支付</div>
  		<div class="order-item-radio text-center" :class="{'on':payType == 'wx'}">✓
  			<input type="radio" v-model="payType" value='wx'>
  		</div>
  	</mt-cell>
 	</div>
 	
 	<div class="bar bar-footer footer-btn-wrap">
 		<button class="footer-btn" @click="_payOrder">
 			确认支付
 		</button>
 	</div>
 	<div class="mask" v-show="iShow" @click="iShow=false">
 		<div class="payPanel">
 			  <div class="card-content text-center">
 			    <div class="card-content-inner">
 			    确认要离开收银台
					<p class="text-left">您的订单在30分钟内未支付将取消，请尽快完成支付</p>
 			    </div>
 			  </div>
 			  <div class="card-footer">
 			  	<div class="textOn payPanel-btn" @click="iShow=false">继续支付</div>
 			  	<div class="textOn payPanel-btn" @click="_goOrderDetail">确认离开</div>
 			  </div>
 		</div>
 	</div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {wxMpPayInfo} from 'api/order'
import {Cell} from 'mint-ui'
import WebIM from '../../im/WebIM'
import {mapGetters, mapMutations} from 'vuex'
var url = ''
export default {
	data() {
		return {
			payType: 'wx',
			minute: 29,
			second: 60,
			iShow: false,
			param: {
				orderId: '',
				openId: ''
			},
			test: false,
			paySuccess: false
		}
	},
	components: {
		MtHeader,
		MtCell: Cell
	},
	created() {
		this.param.openId = this.openId
	},
	beforeRouteEnter(to, from, next) {
		url = from.path
		next()
	},
	beforeRouteLeave(to, from, next) {
		if (!this.paySuccess) {
			this.iShow = true
			setTimeout(() => {
				if (this.test) {
					this.test = false
					this.iShow = false
					next()
				}
		}, 20)
	} else {
			next()
		}
	},
	destroyed() {
		clearInterval(this.timer)
	},
	activated() {
		this.setFooter(false)
		if (this.$route.query.minute || this.$route.query.second) {
			this.minute = this.$route.query.minute
			this.second = this.$route.query.second
		}
		this._countDown()
	},
	deactivated() {
		clearInterval(this.timer)
		this.minute = 29
		this.second = 60
		this.paySuccess = false
		this.setFooter(true)
	},
	computed: {
		...mapGetters(['openId'])
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		}),
		// 前往订单详情页
		_goOrderDetail() {
			this.iShow = false
			this.test = true
			if (url.indexOf('/service/order') > -1) {
				this.$router.replace({path: '/service/order/detail',
					query: {'minute': this.minute,
					'hour': this.hour,
					'orderId': this.$route.query.orderId,
					'serviceId': this.$route.query.serviceId,
					userType: 'user'}})
			} else {
				this.$router.replace({path: url})
			}
		},
		// 支付
		_payOrder() {
			this._wxMpPayInfo().then(data => {
				this._onBridgeReady(data)
			})
		},
		// 倒计时
    _countDown() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        if (this.second <= 0) {
          if (this.minute <= 0 && this.second <= 0) {
            this.cancel = false
            clearInterval(this.timer)
            this.paySuccess = true
            this.$router.push({path: '/service/order/detail',
							query: {
								'orderId': this.$route.query.orderId,
								'serviceId': this.$route.query.serviceId,
								userType: 'user'}})
            return
          }
          this.minute -= 1
          this.second = 60
        }
        this.second -= 1
      }, 1000)
    },
		_wxMpPayInfo() {
			this.param.orderId = this.$route.query.orderId
			return wxMpPayInfo(this.param).then(res => {
				if (res.code === '000000') {
					if (res.data.status === 102) {
						return Promise.resolve(res.data.payInfo)
					}
				}
			})
		},
		_sendMessage(userId, callback) {
			var id = WebIM.conn.getUniqueId() // 生成本地消息id
			var msg = new WebIM.message('cmd', id) // 创建命令消息
			msg.set({
				msg: '',
				to: userId,
				action: 'SaleOrder',
				ext: {},
				success() {
					callback()
				}
			})
			WebIM.conn.send(msg.body)
		},
		_onBridgeReady(data) {
			WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
				if (res.err_msg === 'get_brand_wcpay_request:ok') {
						this._sendMessage(this.$route.query.userId, () => {
							this.paySuccess = true
							this.$router.replace({path: '/service/order/detail',
												query: {'minute': this.minute,
												'hour': this.hour,
												'orderId': this.$route.query.orderId,
												'serviceId': this.$route.query.serviceId,
												userType: 'user'}})
						})
					}
				})
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .payOrder-content{
 	background:#eee;
 	.payOrder-title{
 		padding:10px;
 		font-size:0.7rem;
 	}
 	.timer{
 		margin:15px auto;
 		font-size:0.7rem;
 	}
 }
.payIcon{
	display: inline-block;
	.square(20px);
	margin-right:8px;
	vertical-align: middle;
	.bg-view-image('PayOrder/weChatPay');
	background-size: 20px 20px;

}
</style>