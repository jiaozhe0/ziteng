<template>
<div class='income'>
 <mt-header title="我的收入"></mt-header>
 <div class="income-top">
 	<div class="money">
 		我赚了这么多钱
 		<div class='price'>￥{{total}}</div>
 	</div>
 	<div class="row text-center incomeDetail-list">
 		<div class="col-33" @click="$router.push('/reminder/freeze/html')">
 				<span class="text">{{incomeInfo.freezeAmount}}</span>
 			<p>冻结中</p>
 			<div class="icon reminder"></div>
 		</div>
 		<div class="col-33">
 				<span class="text">{{incomeInfo.encashAmount}}</span>
 			<p>可提现</p>
 		</div>
 		<div class="col-33" @click="$router.push('/home/income/extract')">
 				<span class="text">{{incomeInfo.extractAmount}}</span>
 			<p>已提现</p>
 			<div class="icon link"></div>
 		</div>
 	</div>
 </div>
 <p class="income-title">收入明细</p>
 <div class="content income-content">
 		<scroller :dataList="incomeList" 
 		clsss="scroller" 
 		:loadIcon="loading"
 		:refreshIcon="refreshing"
 		@refresh="_refresh" 
 		@loadMore="_loadMore"
 		>	
 		<income-list :incomeList="incomeList"></income-list>
 	 </scroller>	
 </div>
    
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import {getBillDetail, getIncomeList} from 'api/home'
import {Toast} from 'mint-ui'
import IncomeList from 'components/incomeList/index'
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			refreshing: false,
			loading: false,
			isMore: false,
			incomeList: [],
			incomeInfo: {},
			param: {
				userId: '',
				currentPage: 0
			}
		}
	},
	created() {
		this.param.userId = this.user.userId
	},
	activated() {
		this._getBillDetail(this.param.userId)
		this._getIncomeList(this.param)
	},
	components: {
		MtHeader,
		Scroller,
		IncomeList
	},
	computed: {
		...mapGetters(['user']),
		total() {
			return this.incomeInfo.freezeAmount + this.incomeInfo.encashAmount + this.incomeInfo.extractAmount
		}
	},
	methods: {
		// 信息
		_getBillDetail(id) {
			getBillDetail(id).then(res => {
				console.log(3, res)
				this.incomeInfo = res
			})
		},
		_getIncomeList() {
			this.param.currentPage = 0
			getIncomeList(this.param).then(res => {
				console.log(12, res)
				this._processData(res)
			})
		},
		// 加载更多
		_loadMore() {
			if (this.loading) {
				return
			}
			if (this.isMore) {
				Toast('数据加载完成')
				return
			}
			this.loading = true
			this.param.currentPage += 1
			getIncomeList(this.param).then((data) => {
				console.log(456, data)
				this._processData(data, true)
			})
		},
		// 刷新
		_refresh() {
			this.refreshing = true
			this._getIncomeList()
		},
		// 数据处理
		_processData(data, flag) {
			if (!data.length) {
				Toast('暂无数据')
				this.loading = false
				return
			}
			if (flag) {
				this.incomeList = this.incomeList.concat(data)
				if (data.length < 15) {
					this.isMore = true
				}
				this.loading = false
			} else {
				this.isMore = false
				this.incomeList = data
				this.refreshing = false
			}
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .income-content{
 	top:218px;
 	bottom: 0;
 }
 .income {
 	p{margin: 0;}
 }
 .income-top{
 	background-color: @color-primary;
 	margin-top: -1px;
 	color:#fff;
 	font-size: 0.6rem;
 	padding: 15px 10px;
 	.money{
 		margin-bottom:20px;
 		.price {
 			font-size: 1rem;
 		}
 	}
 	.incomeDetail-list{
 		div.col-33{
 			position:relative;
 			&+div{
 				border-left:1px solid @color-split;
 			}
 			.text{
 				font-size: 0.8rem;
 			}
 			p{
 				opacity: 0.7
 			}
 			.icon{
 				right: 4px;
 				top:4px;
 				position: absolute;
 				.square(12px);
 				background-size: 12px 12px;
 				&.reminder{
 					.bg-view-image('Income/cash-question')
 				}
 				&.link{
 					top:12px;
 					.bg-view-image('Income/disclosure-arrow')
 				}
 			}
 		}
 	}
 }
 .income-title{
		padding:8px 10px;
 		background-color: #eee;
 		font-size: 0.7rem;
 	}

</style>