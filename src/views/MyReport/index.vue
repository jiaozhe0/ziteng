<template>
<div class="report">
    <mt-header title="订单投诉" path="/home"></mt-header>
    <div class="content report-content">
    	<mt-cell  title="选择投诉订单" is-link @click.native="_goOrderList">
    		<span>{{title ? title : '选择订单'}}</span>
    	</mt-cell>
    	<p class="title">请选择投诉举报的原因</p>
    	<div v-if="options.length">
    	<radio-cell :radioList='options' :modelVal="result" @changeVal='_changeResult'>
    	</radio-cell>
    	</div>
    	<!-- 评价 -->
      <reason  :reasonText="param.reportContent" ref='reason' placeholder="请选择投诉举报的原因" @editReason='_reasonText'></reason>
    	<!-- <div class="report-text">
            <div class="result-text">
                <textarea name="" id="" rows="10" placeholder="说点什么，帮助大家挑选更优质的服务" @keyup="_edit"></textarea>
                <div class="number">{{num}}</div>
            </div>
       </div> -->
    </div>
    <result typeName='report' :success="success" @back="_backHome"></result>
    <div class="bar bar-footer">
    	<button class="footer-btn" @click='_saveUserReport'>提交举报</button>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Result from 'components/result/index'
import {getUserReportTypeList, saveUserReport} from 'api/home'
import RadioCell from 'components/RadioCell/index'
import {Cell, Toast} from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
import Reason from 'components/reason/index'
// var formPath = ''
export default {
	data() {
		return {
			options: [],
			title: '',
			num: 255,
			success: false,
			result: '',
			param: {
				reportUserId: '',
				serviceUserId: '',
				orderId: '',
				serviceId: '',
				reportContent: '',
				reportTypeId: ''
			}
		}
	},
	created() {
		this.setFooter(false)
	},
	beforeRouteEnter(to, from, next) {
		// formPath = from.path
		next()
	},
	beforeRouteLeave(to, from, next) {
		this.toPath = to.path
		next()
	},
	activated() {
		this._getUserReportTypeList()
		this.param.reportUserId = this.user.userId
		this.title = this.$route.query.serviceTitle && this.$route.query.serviceTitle
		this.param.serviceUserId = this.$route.query.serviceUserId && this.$route.query.serviceUserId
		this.param.orderId = this.$route.query.orderId && this.$route.query.orderId
		this.param.serviceId = this.$route.query.serviceId && this.$route.query.serviceId
	},
	deactivated() {
		this.setFooter(true)
		this.title = ''
		if (this.toPath.indexOf('order/buy') < 0) {
			this.result = ''
			this.options = []
			this.param = {
				orderId: '',
				serviceUserId: '',
				serviceId: '',
				reportContent: '',
				reportTypeId: ''
			}
		}
	},
	components: {
		MtHeader,
		MtCell: Cell,
		RadioCell,
		Result,
		Reason
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		_getUserReportTypeList() {
			getUserReportTypeList().then(res => {
				console.log(res)
				this.options = res.data.map(item => {
					let obj = {}
					obj['title'] = item.reportTypeName
					obj['text'] = item.reportDescribe
					obj['value'] = item.reportTypeId
					return obj
				})
				this.result = this.options[0].value
				this.param.reportTypeId = this.options[0].value
				console.log(this.param.reportContent)
			})
		},
		// 保存投诉
		_saveUserReport() {
			if (!this.param.orderId) {
				Toast('请选择要投诉的订单!')
				return
			}
			this.param.reportContent = this.$refs.reason.$refs.reason.value
			console.log(this.param)
			saveUserReport(this.param).then(res => {
				console.log(res)
				if (res.code === '000000') {
					this.success = true
				}
			})
		},
		_changeResult(val) {
			this.options.forEach(item => {
				if (item.value === val) {
					console.log(12, val)
					this.param.reportTypeId = val
				}
			})
		},
		_reasonText(val) {
			this.param.reportContent = val
		},
		_goOrderList() {
			this.$router.push({path: '/order/buy', query: {flag: true}})
		},
		_backHome() {
			this.success = false
			this.$router.push({path: '/home'})
		},
		_edit() {},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		})
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.report-content {
	background-color: #eee;
	overflow-y: auto;
	.title{
		margin: 0;
		padding:6px 10px 4px;
		background-color: #eee;
		font-size: 0.54rem;
	}
	.report-text{
		margin-top: 8px;
		background-color: #fff;
	}
}
</style>