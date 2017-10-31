<template>
<div class='cancelOrder'>
   <mt-header title="取消原因"></mt-header>
   <div class="content cancelOrder-content">
   	<div class="content-wrap" v-if="options[0].title">
	   	<radio-cell :radioList='options' :modelVal="result" @changeVal='_changeResult'>
	   	</radio-cell>
	   	<div class="result-text" v-show="result == 'other'">
	   		<textarea name="" id="" rows="10" placeholder="请填写您取消的原因"></textarea>
	   		<div class="number">{{num}}</div>
	   	</div>
	  </div>
	  <div class="footer">
	  	<button class="footer-btn" @click="_cancelOrder">提交</button>
	  </div>
   </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import RadioCell from 'components/RadioCell/index'
import Radio from 'components/RadioCell/radio'
import {cancelOrder, cancelReasons} from 'api/order'
import {mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
export default {
	data() {
		return {
			options: [
				{
					value: 'noWant',
					title: ''
				},
				{
					value: 'better',
					title: ''
				},
				{
					value: 'cannot',
					title: '对方不能提供我要的服务'
				},
				{
					value: 'other',
					title: '其他原因'
				}
			],
			param: {
				reason: {
					cancelReasonTypeId: '',
					cancelReasonDescribe: ''
				}
			},
			result: 'noWant',
			num: 255
		}
	},
	components: {
		MtHeader,
		RadioCell,
		Radio
	},
	computed: {
		...mapGetters(['user'])
	},
	activated() {
		this._getCancelReasons(this.$route.query.userType === 'user' ? 1 : 2)
	},
	deactivated() {
		this.param = {
			reason: {
				cancelReasonTypeId: '',
				cancelReasonDescribe: ''
			}
		}
	},
	methods: {
		_changeResult(val) {
			this.result = val
			this.options.some(item => {
				if (item.value === val) {
					console.log(item)
					this.param.reason.cancelReasonTypeId = item['cancelReasonId']
					this.param.reason.cancelReasonDescribe = item['title']
					return true
				}
			})
		},
		// 获取取消订单原因
		_getCancelReasons(type) {
			cancelReasons(type).then(res => {
				console.log(666, res)
				if (res.code === '000000') {
					res.data.map((item, index) => {
						this.options[index]['title'] = item.cancelReasonName
						this.options[index]['cancelReasonId'] = item.cancelReasonId
					})
					this.param.reason.cancelReasonTypeId = this.options[0]['cancelReasonId']
					this.param.reason.cancelReasonDescribe = this.options[0]['title']
				}
			})
		},
    // 取消订单
    _cancelOrder() {
			if (this.$route.query.userType === 'user') {
				this.param.orderId = this.$route.query.orderId
				this.param.orderUserId = this.user.userId
			} else {
				this.param.orderId = this.$route.query.orderId
				this.param.serviceUserId = this.user.userId
			}
			console.log(1, this.param)
      cancelOrder(this.param).then(res => {
				console.log(2, res)
				if (res.code === '000000') {
					Toast('订单取消成功')
					setTimeout(() => {
							this.$router.push({path: '/service/order/detail',
							query: {'orderId': this.$route.query.orderId, userType: 'user'}})
					}, 2000)
				}
      })
    }
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .cancelOrder-content{
 	bottom: 0;
 }
 
</style>