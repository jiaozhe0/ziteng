<template>
<div class="bookingOrder">
 <mt-header title="预约下单" ></mt-header>
 <div class="content bookingOrder-content editAddress">
 	<div class="bookingOrder-top">
 		<div class="order-info">{{param.title}}</div>
 		<div class='order-number'>
 			<button class='order-number-btn' @click="_minus">-</button>
 			<button class='order-number-btn'>{{param.copies}}</button>
 			<button class='order-number-btn' @click="param.copies++">+</button>
 		</div>
 	</div>
 	<mt-cell title="预约时间"  is-link class='order-handler-btn' @click.native="openPopupVisible">
 	 	<i slot="icon" class="icon time"></i>
 	  <span>{{dateName ? dateName : ''}}</span>
 	</mt-cell>
 	<mt-cell title="选择服务地点"  is-link class='order-handler-btn' @click.native="$router.push({path:'/home/address',query:{order:true}})">
 	  <i slot="icon" class="icon address"></i><span>{{area ? area : ''}}</span>
 	</mt-cell>
 	<mt-cell class='order-handler-btn '>
 		<div slot="icon"><i  class="icon edit"></i><input type="text"  v-model='param.orderRemark' class='edit-input' placeholder="备注信息"></div>
 	</mt-cell>
 	<mt-cell title="订单金额"  class='order-handler-btn'>
 	<div><span class="price danger">￥{{param.singleAmount}}</span> x {{param.copies}}</div>
 	</mt-cell>
 	<section class='text'>
 			<p><strong>温馨提示</strong></p>
 			<p><span class="textOn">请仔细核对填写的手机号，并保持电话畅通</span>，服务者会在服务开始前与此号码沟通服务具体事宜
 			</p>
 			<p>下单即代表同意 <router-link class="textOn" to="/agreement/service/html" ><<用户服务协议>></router-link></p>
 	</section>
 
 </div>

  <!-- footer -->
 <div class="bar bar-footer serDetial-footer order-footer">
 	<div class="text-center order-pay">待支付：<span class="danger">￥{{pay}}</span></div><div class="order-btn" @click="_placeOrder">确认支付</div>
 </div>
	<!-- 时间选择 -->
	<mt-popup v-model="popupVisible"
  position="bottom" 
  :modal="true"
  class="sexPopup">
  <div class="sexPopup-top" v-if="orderDate.length">
  	<div class="textOn" @click="popupVisible = false">取消</div>
  	<div>预约时间</div>
  	<div class="textOn" @click="_setDate">确定</div>
  </div>
	 <mt-picker :data="orderDate" :columns=2 v-model='year6Value'  @on-change='change' ref="datePicker">
	</mt-picker>
	</mt-popup>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Popup, Toast} from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
import {getAppointmentTime, placeOrder} from 'api/order'
import Picker from 'components/picker/index'
var fromPath = ''
// , placeOrder
const timeStamp = require('time-stamp')
export default {
	data() {
		return {
			area: '', // 地址
			dateTransmit: '',
			hxUserId: '', // 环信userid
			param: {
				'serviceId': '', // 服务id
				'orderUserId': '', // 下单用户
				'copies': 1, // 份数（必填）
				'orderAmount': 0, // 订单金额
				'singleAmount': 0, // 单价
				'makeTime': '', // 时间,
				'totalAmount': '', // 总价
				'orderAddressId': '',
				'orderRemark': '',
				'priceType': 1
			},
			currentTime: {},
			popupVisible: false,
			orderDate: [],
			dateName: '',
			year6Value: []
		}
	},
	beforeRouteEnter(to, from, next) {
		fromPath = from.path
		next()
	},
	beforeRouteLeave(to, from, next) {
		this.toPath = to.path
		next()
	},
	activated() {
		this.setFooter(false)
		this.param.orderUserId = this.user.userId
		this.param = Object.assign({}, this.param, this.serviceInfo)
		if (fromPath.indexOf('servicedetail') > -1) {
			this.hxUserId = this.$route.query.userId && this.$route.query.userId
		}
		// 地址
		if (this.$route.query.id) {
			this.param.orderAddressId = this.$route.query.id
			this.area = this.$route.query.address
		}
	},
	deactivated() {
		if (this.toPath.indexOf('address') < 0 && this.toPath.indexOf('agreement/service/html') < 0) {
			this.dateName = ''
			this.hxUserId = ''
			this.area = ''
			this.orderDate = []
			this.param = {
				'serviceId': '', // 服务id
				'copies': 1, // 份数（必填）
				'orderAmount': 0, // 订单金额
				'singleAmount': 0, // 单价
				'makeTime': '', // 时间,
				'totalAmount': '', // 总价
				'orderAddressId': '',
				'orderRemark': '',
				'priceType': 1
			}
		}
	},
	components: {
			MtHeader,
			MtCell: Cell,
			MtPicker: Picker,
			MtPopup: Popup
	},
	computed: {
		...mapGetters(['serviceInfo', 'user']),
		pay() {
			this.param.totalAmount = this.param.singleAmount * this.param.copies
			this.param.orderAmount = this.param.totalAmount
			return this.param.totalAmount
		}
	},
	methods: {
		change (value) {
			this.dateTransmit = value.join(' ')
    },
		// 获取时间
		_getAppointmentTime() {
			getAppointmentTime().then(data => {
				this.currentTime = Object.assign({}, this.currentTime, data)
				let syM = (60 - parseInt(new Date(this.formatDate(this.currentTime.currentTime)).getMinutes())) * 60 * 1000
				let sT = new Date(this.formatDate(this.currentTime.currentTime)).getTime() + syM + this.currentTime.limitOrderTime
				let eT = new Date(this.formatDate(timeStamp() + ' ' + this.currentTime.endTime)).getTime() + 30 * 60 * 100
				if (sT < eT) {
					this._initDate()
					this._initHour(sT, eT)
				} else {
					this._initDate(true)
				}
				setTimeout(() => {
					this.popupVisible = true
				}, 20)
			})
		},
		// 下订单
		_placeOrder() {
			placeOrder(this.param).then(res => {
				if (res.code === '000000') {
					let data = res.data
					if (data.status === 101) {
						this.$router.replace({path: '/service/order/pay', query: {orderId: data.orderId, userId: this.hxUserId, serviceId: this.$route.query.serviceId, totalAmount: this.pay}})
					} else {
						Toast(data.msg)
					}
				}
			})
		},
		// 设置时间
		_setDate() {
			this.dateName = this.$refs.datePicker.getNameValues()
			this.param.makeTime = this.dateTransmit + ':00'
			this.popupVisible = false
		},
		// 数量减
		_minus() {
			if (this.param.copies <= 1) {
				return
			}
			this.param.copies--
		},
		// 初始化时间
		_initDate(flag) {
			// 当前时间
			let sT = new Date(this.formatDate(this.currentTime.currentTime)).getTime()
			if (flag) {
				sT += 24 * 1 * 3600 * 1000
			}
			// 结束时间 + 7天
			let eT = sT + 24 * 7 * 3600 * 1000
			let week = ''
			for (; sT < eT; sT += 24 * 1 * 3600 * 1000) {
				let time = new Date(sT)
				let dateData = {
					parent: 0
				}
				if (timeStamp(time) !== timeStamp()) {
					let j = '00'
					// 一天内的开始时间 结束时间
					let i = this.currentTime.startTime && parseInt(this.currentTime.startTime.split(':')[0])
					let e = this.currentTime.endTime && parseInt(this.currentTime.endTime.split(':')[0])
					this.orderDate.push({
						parent: timeStamp(time),
						name: '08:00',
						value: '08:00'
					})
					while (i < e) {
						let hourData = {
							parent: timeStamp(time)
						}
						if (j === '00') {
							j = 30
						} else {
							i++
							j = '00'
						}
						let t = i < 10 ? '0' + i : i
						hourData['name'] = `${t}:${j}`
						hourData['value'] = `${t}:${j}`
						this.orderDate.push(hourData)
					}
				}
				switch (time.getDay()) {
					case 1:
						week = '一'
						break
					case 2:
						week = '二'
						break
					case 3:
						week = '三'
						break
					case 4:
						week = '四'
						break
					case 5:
						week = '五'
						break
					case 6:
						week = '六'
						break
					case 0:
						week = '日'
						break
				}
				dateData['value'] = timeStamp(time)
				// 设置日期显示
				let pettern = /\d{4}-(\d{1,2})-(\d{1,2})$/
				dateData['name'] = timeStamp(time).replace(pettern, ($1, $2, $3) => {
					return `${$2}月${$3}日(周${week})`
				})
				this.orderDate.push(dateData)
			}
		},
		// 初始化小时
		_initHour(sT, eT) {
			for (; sT <= eT; sT += 30 * 60 * 1000) {
				let hourData = {
					parent: timeStamp()
				}
				let time = new Date(sT)
				let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
				let minutes = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes()
				hourData['value'] = `${hour}:${minutes}`
				hourData['name'] = `${hour}:${minutes}`
				this.orderDate.push(hourData)
			}
		},
		openPopupVisible() {
			this._getAppointmentTime()
		},
		// 兼容safari 浏览器
		formatDate(date) {
			return date.replace(/-/g, '/')
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		})
	},
	watch: {
		popupVisible(val) {
			if (!val) {
				this.orderDate = []
			}
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .bookingOrder-content{
 	background-color: #eee;
 }
.bookingOrder-top{
	.flexbox();
	.align-items(center);
	.justify-content(space-between);
	padding:15px;
	background-color: #fff;
	margin-bottom: 8px;
	button.order-number-btn{
		display: inline-block;
		float: left;
		border:1px solid @color-split;
		background-color: transparent;
		width: 34px;
		&:nth-child(2){
			border-left: none;
			border-right: none;
			width: 40px;
			color:@color-danger;
		}
	}
}
.order-handler-btn{
	min-height:48px;
	margin-bottom: 8px;
	font-size: 0.7rem;
	color:@color-text-gray;
}
input.edit-input{
	display: inline-block;
	font-size: 0.7rem!important;
  font-weight: 400;
  margin-left: 5px;
	width: 90%;
	&::-webkit-input-placeholder{
		color:rgb(153, 153, 153);
	}
}
.order-footer{
	.order-pay{
		flex: 1
	}
}
.icon{
	display: inline-block;
	.square(18px);
	background-size: 18px 18px;
	vertical-align: middle;
	
	&.time{
		.bg-view-image('BookingOrder/time')
	}
	&.address{
		.bg-view-image('BookingOrder/dizhi');
	}
	&.edit{
		margin-top: -4px;
		.bg-view-image('BookingOrder/beizhu');
	}
}
section.text{
	padding: 10px;
	font-size: 0.6rem;
	p{
		margin: 5px 0;
	}
}
</style>