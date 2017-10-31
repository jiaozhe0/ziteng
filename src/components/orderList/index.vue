<template>
<ul class="orderList">
   <li class="orderList-item small-cell" v-for="item in orderList" @click="_toOrderDetail(item)">
		<mt-cell :title="item.serviceTitle">
			<span class="danger">{{item.orderStatus == 0 ? '未支付':item.orderStatus == 1?'待接待':item.orderStatus == 2 ? '服务进行中': item.orderStatus == 3 ? '服务已取消': '服务已完成'}}</span>
		</mt-cell>
		<mt-cell>
			<div slot='icon' class='user-info'>
				<div class="avatar-img">
					<img :src="item.user.photoUrl" alt="" class="img-responsive">
				</div>
				<div>{{item.user.userName}}</div>
			</div>
			<div>
				<a :href="'tel:'+item.user.phoneNumber" @click.stop="">电话</a>
				<a>信息</a>
			</div>
		</mt-cell>
		<mt-cell >
			<div slot="icon" ><i class="icon time"></i><span>{{item.makeTime}}</span></div>
		</mt-cell>
		<mt-cell v-if="item.address" class="unborder" @>
			<div slot="icon"><i class="icon address"></i><span>{{item.address.area}}</span></div>
		</mt-cell>
	
		<!-- 不取消订单时显示或者状态未完成时 -->
		<mt-cell v-if="item.orderStatus == 0 || item.orderStatus == 1 || item.orderStatus == 2 && userType == 'user' || item.orderStatus== 4 && item.isEvaluate == 0">

			<div slot="icon" v-if="item.isEvaluate !== 0">待付金额：<span>{{item.totalAmount}}元{{item.orderStatus}}</span></div>
			<!-- 购买订单 -->
			<div class='orderList-btn' v-if="userType=='user'">
				<button class="pay-btn cancel" @click.stop="_goEvaluate(item)" v-if="item.orderStatus==4 && item.isEvaluate == 0">去评价</button>
				<button class="pay-btn cancel" 
				@click.stop="_goCancelOrder(item.orderId)"
				v-if="item.orderStatus == 0 || item.orderStatus == 1 || item.orderStatus == 2">取消订单</button>
				<button class="pay-btn pay" @click.stop="_goPayOrder(item.orderId)" v-if="item.orderStatus==0">待支付</button>
				<button class="pay-btn pay" v-if="item.orderStatus == 2" @click.stop="_finishOrder(item.orderId)">确认完成</button>
			</div>
			<!-- 出售订单 -->
			<div class='orderList-btn' v-else>
				<button class="pay-btn cancel" @click.stop="_goCancelOrder(item.orderId)">拒单</button>
				<button class="pay-btn pay" @click.stop="_receiveOrder(item.orderId)">确认接单</button>
			</div>
		</mt-cell>	
   </li>
</ul>
</template>

<script type="text/ecmascript-6">
import {Cell, Toast} from 'mint-ui'
import {receiveOrder, finishOrder, getStatus} from 'api/order'
import {mapGetters} from 'vuex'
export default {
	props: {
		orderList: {
			type: Array
		},
		userType: {
			type: String
		},
		path: {
			type: Boolean
		}
	},
	components: {
		MtCell: Cell
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		_toOrderDetail(item) {
			if (this.path) {
				this.$router.push({path: '/home/report',
					query: {
					serviceTitle: item.serviceTitle,
					orderId: item.orderId,
					serviceUserId: item.serviceUserId,
					serviceId: item.serviceId}})
			} else {
				this.$router.push({path: '/service/order/detail', query: {orderId: item.orderId, userType: this.userType}})
			}
		},
		// 取消订单/拒单
		_goCancelOrder(id) {
			this.$router.push({path: '/service/order/cancel', query: {orderId: id, userType: this.userType}})
		},
		// 去支付
		_goPayOrder(id) {
			getStatus(id).then(res => {
				if (res.code === '000000') {
					console.log(res)
					let time = res.data.remainTime
					console.log(time)
					if (time) {
						let second = parseInt(time / 1000 % 60, 10)
						let minute = parseInt(time / 1000 / 60 % 60, 10)
						if (minute > 1) {
							this.$router.push({path: '/service/order/pay',
								query: {orderId: id, userType: this.userType, second: second, minute: minute}})
						} else {
								Toast('支付已超时')
								return
						}
					}
				}
			})
		},
		// 服务者接单
		_receiveOrder(id) {
			let param = {
				orderId: id,
				serviceUserId: this.user.userId
			}
			console.log(param)
			receiveOrder(param).then(res => {
				console.log(res)
				if (res.code === '000000') {
					if (res.data.status === 103) {
						this.$emit('refresh')
						Toast('接单成功')
					}
				}
			})
		},
		// 购买确认完成
    _finishOrder(id) {
			let param = {
				orderId: id,
				orderUserId: this.user.userId
			}
      finishOrder(param).then(res => {
        console.log('res')
        if (res.code === '000000') {
					if (res.data.status === 106) {
						Toast('完成订单')
						this.$emit('refresh')
						this._getDetail()
					}
        }
      })
    },
		// 去评价
    _goEvaluate(item) {
      this.$router.push({path: '/order/evaluate', query: {orderId: item.orderId, pic: item.servicePicName, title: item.serviceTitle}})
    }
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.orderList{
	margin-top:0;
	min-height:101%;
	.orderList-item{
		margin-bottom:8px;
		.orderList-btn{
			.pay-btn{
				height: 26px;
				line-height: 26px;
				padding: 0px 8px;
				font-size: 0.54rem;
				&.cancel{
					color: @color-text-gray
				}
				&.pay{
					margin-left: 5px;
					border-color: @color-danger;
					background-color: transparent;
					color: @color-danger
				}
			}
		}
		.icon{
			display: inline-block;
			.square(16px);
			background-size: 16px 16px;
			vertical-align: middle;
			margin-right: 4px;
			&.time{
				.bg-image('orderList/dizhi');
			}
			&.address{
				.bg-image('orderList/dizhi');
			}
		}
	}
}
</style>