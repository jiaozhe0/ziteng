<template>
<div class='cancelOrder'>
   <mt-header title="取消原因"></mt-header>
   <div class="content cancelOrder-content">
   	<div class="content-wrap" v-if="options.length">
   		<reminder>请告知您取消服务的原因，您的意见对我们很重要~</reminder>
	   	<radio-cell :radioList='options' :modelVal="result" @changeVal='_changeResult'>
	   	</radio-cell>
	   	<reason v-show="result.indexOf('other') > -1" placeholder="填写原因" @editReason='_reasonText' ref='reason'></reason>
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
import Reminder from 'components/reminder/index'
import {cancelOrder, cancelReasons, refuseOrder} from 'api/order'
import {mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
import Reason from 'components/reason/index'
var fromPath = ''
export default {
	data() {
		return {
			reasonText: '',
			path: '',
			options: [],
			param: {
				reason: {
					cancelReasonTypeId: '',
					cancelReasonDescribe: ''
				}
			},
			result: '',
			num: 255
		}
	},
	beforeRouteEnter(to, from, next) {
		fromPath = from.path
		next()
	},
	components: {
		MtHeader,
		RadioCell,
		Reason,
		Reminder
	},
	computed: {
		...mapGetters(['user'])
	},
	activated() {
		this.path = fromPath
		this._getCancelReasons(this.$route.query.userType === 'user' ? 1 : 2)
	},
	deactivated() {
		this.result = ''
		this.options = []
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
			console.log(val)
			this.options.some(item => {
				if (item.value === val) {
					this.param.reason.cancelReasonTypeId = item['cancelReasonId']
					if (item.value !== 'other1') {
						this.param.reason.cancelReasonDescribe = item['title']
					}
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
						let obj = {}
						obj['title'] = item.cancelReasonName
						obj['cancelReasonId'] = item.cancelReasonId
						obj['value'] = item.cancelReasonId
						this.options.push(obj)
					})
					this.result = this.options[0]['cancelReasonId']
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
				console.log(this.$refs.reason.$refs.reason.value)
				cancelOrder(this.param).then(res => {
				console.log(2, res)
				if (res.code === '000000') {
					Toast(res.data.msg)
					setTimeout(() => {
							this.$router.replace({path: fromPath,
							query: {'orderId': this.$route.query.orderId, userType: 'user'}})
					}, 2000)
				}
      })
			} else {
				this.param.orderId = this.$route.query.orderId
				this.param.serviceUserId = this.user.userId
				refuseOrder(this.param).then(res => {
								console.log(2, res)
								if (res.code === '000000') {
									Toast(res.data.msg)
									setTimeout(() => {
											this.$router.replace({path: fromPath,
											query: {'orderId': this.$route.query.orderId, userType: 'service'}})
									}, 20)
								}
				})
			}
    },
    _reasonText(text) {
			this.param.reason.cancelReasonDescribe = text
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