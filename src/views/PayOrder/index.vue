<template>
<div class="payOrder">
 	<mt-header title="支付收银台" @click.native="iShow=true" :isBack="false"></mt-header>
 	<div class="content payOrder-content">
 		<p class="timer text-center">
 			请在{{minute}}时秒{{second < 10 ? '0'+second : second}}内完成支付
 		</p>
 		<mt-cell title="订单金额" class='order-item'>
  			<span class="payOrder-text danger">{{$route.query.totalAmount}}</span>
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
			}
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
	destroyed() {
		clearInterval(this.timer)
	},
	activated() {
		this.setFooter(false)
		if (this.$route.query.minute) {
			this.minute = this.$route.query.minute
			this.second = this.$route.query.second
		}
		this._countDown()
	},
	deactivated() {
		clearInterval(this.timer)
		this.minute = 29
		this.second = 60
		this.setFooter(true)
	},
	computed: {
		...mapGetters(['openId'])
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		}),
		_goOrderDetail() {
			this.iShow = false
			if (url.indexOf('/service/order') > -1) {
				this.$router.push({path: '/service/order/detail',
					query: {'minute': this.minute,
					'hour': this.hour,
					'orderId': this.$route.query.orderId,
					'serviceId': this.$route.query.serviceId,
					userType: 'user'}})
			} else {
				window.history.back()
			}
		},
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
        if (this.second <= 1) {
          this.minute -= 1
          this.second = 60
          if (this.minute < 0) {
            this.cancel = false
            clearInterval(this.timer)
            return
          }
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
		_onBridgeReady(data) {
			WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
				if (res.err_msg === 'get_brand_wcpay_request:ok') {
						this.$router.push({path: '/service/order/detail',
											query: {'minute': this.minute,
											'hour': this.hour,
											'orderId': this.$route.query.orderId,
											'serviceId': this.$route.query.serviceId,
											userType: 'user'}})
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