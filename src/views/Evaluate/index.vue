<template>
<div>
	 <div v-show="!pictureList.lenght">
		 <mt-header :title="title"></mt-header>
		 <!-- v-show="!evaluateList.length && !unData" -->
		 <no-data v-if="!evaluateList.length && !unData" :typeStyle="false"></no-data>
		 <!-- v-show='evaluateList.length || unData' -->
		 <div v-show='evaluateList.length || unData'>
		 <div class="wrap" ref="wrap">
		   <div class="evaluate-header">
		   		<div class='evaluate-all'>
		   		<div><star :score="statistics.totalLevel" :size="36"></star></div>
		   		<div class='evaluate-all-text'>{{statistics.allCount}}人评价(满意度{{statistics.scorePercent}})</div>
		   		</div>
		   <div class='evaluate-list'>
		   		<div class='evaluate-list-item'>服务描述:<star class='star' :score="statistics.describeLevel" :size="24"></star></div>
		   		<div class='evaluate-list-item'>服务态度:<star class='star' :score="statistics.attitudeLevel" :size="24"></star></div>
		   		<div class='evaluate-list-item'>专业技能:<star class='star' :score="statistics.professionalLevel" :size="24"></star></div>
		   </div>
		   <ul class='typeList' v-if="typeStatistics.length">
		   	<li v-for="item in typeStatistics" class='typeList-item'>
		   		{{item.evaluateTypeName}}&nbsp;&nbsp;{{item.count}}
		   	</li>
		   </ul>
		   </div>
		   <div class="scroll" ref="scroll">
		   	 <!-- 评价类型导航 -->
			   <tab class='evaluate-nav' :flag="true" ref="tab">
			      <tab-item selected @click.native="_setEvaluateType(9)">全部评价<div>{{statistics.allCount}}</div></tab-item>
			      <tab-item @click.native="_setEvaluateType(1)">好评<div class="evaluate-num">{{statistics.isGood}}</div></tab-item>
			      <tab-item @click.native="_setEvaluateType(2)">中评<div class="evaluate-num">{{statistics.isMedium}}</div></tab-item>
			      <tab-item @click.native="_setEvaluateType(3)">
			      <div>差评
			      <div class="evaluate-num">{{statistics.isNegative}}</div>
			      </div>
			      </tab-item>
			      <tab-item @click.native="_setEvaluateType(0)"><div></div>有图<div class="evaluate-num">{{statistics.isPicture}}</div></tab-item>
			   </tab>
			   <div class="evaluate-content" ref="scroll">
			   <scroller  @refresh='_refresh' 
			   :refreshIcon='refreshing'
			   :loadIcon='loading'
			   @loadMore="_loadMore" 
			   :dataList="evaluateList"
			   @scrollTop='_scrollTop'
			   >
			   	<evaluate-list :footer="$route.query.footer" class='evaluate-list-wrap' :evaluateList="evaluateList" @pictureList="_getPicture"></evaluate-list>
			   </scroller>
			  </div>
		   </div>
	   </div>
	   </div>
	   <!-- v-show='!evaluateList.length && !unData' -->
	   <!-- <no-data ></no-data> -->
   </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import {Tab, TabItem} from 'components/tab/index'
import EvaluateList from 'components/EvaluateList/index'
import NoData from 'components/NoData/index'
import Star from 'components/star/star'
import {initSize} from 'common/js/browser'
import {getEvaluateList, getEvaluateStatistics} from 'api/evaluate'
import {mapMutations, mapGetters} from 'vuex'
import {Toast} from 'mint-ui'
// const LIMIT = 15
export default {
	data() {
		return {
			evaluateList: [],
			loading: false,
			isMore: false,
			unData: false,
			refreshing: false,
			evaluateType: {},
			pictureList: [],
			typeStatistics: [],
			param: {
				currentPage: 0
			},
			statistics: {
				totalLevel: 0
			},
			typeNum: 9
		}
	},
	components: {
		Scroller,
		MtHeader,
		Tab,
		TabItem,
		EvaluateList,
		NoData,
		Star
	},
	created() {
		this.setFooter()
	},
	mounted() {
		// let size = initSize()
		// this.$refs.wrap.style.height = (size.vH - 44) + 'px'
		// this.$refs.scroll.style.height = (size.vH - 46) + 'px'
	},
	computed: {
		title() {
			let title = '用户评价'
			if (this.$route.params.type === 'my') {
				title = '个人评价'
			}
			return title
		},
		...mapGetters(['user'])
	},
	activated() {
		console.log(90909, this.evaluateList)
		console.log(1010101, this.typeStatistics)
		let size = initSize()
		this.$refs.wrap.style.height = (size.vH - 44) + 'px'
		this.$refs.scroll.style.height = (size.vH - 46) + 'px'
		if (this.$route.params.type === 'my') {
				this.typeId = {serviceUserId: this.user.userId}
				this._getEvaluateStatistics({serviceUserId: this.user.userId})
				this._getEvaluateList()
		} else if (this.$route.params.type === 'server') {
			this.typeId = {serviceUserId: this.$route.query.serviceUserId}
			this._getEvaluateStatistics({serviceUserId: this.$route.query.serviceUserId})
			this._getEvaluateList()
		} else {
			this.typeId = {serviceId: this.$route.query.serviceId}
			this._getEvaluateStatistics({serviceId: this.$route.query.serviceId})
			this._getEvaluateList()
		}
	},
	beforeRouteLeave(to, from, next) {
		this.toPath = to.path
		next()
	},
	deactivated() {
		this.setFooter(true)
		if (this.toPath.indexOf('view') < 0) {
			this.typeNum = 9
			this.param = {currentPage: 0}
			this.evaluateList = []
			this.typeStatistics = []
			this.evaluateType = {}
			this.$refs.tab.currentIndex = 0
		}
		// this.evaluateList = []
		// this.statistics = {
		// 		totalLevel: 0
		// 	}
		// this.typeStatistics = []
		// this.typeNum = 9
		// this.param = {currentPage: 0}
		// this.evaluateType = {}
		this.unData = false
	},
	methods: {
		_scrollTop(top) {
			if (top < 0) {
				this.$refs.wrap.scrollTop = this.$refs.wrap.scrollTop - Math.floor(top) * 2
			}
		},
		//
		_getEvaluateList() {
			this.param.currentPage = 0
			this.refreshing = true
			getEvaluateList(Object.assign({}, this.param, this.typeId, this.evaluateType)).then(data => {
				console.log(12345559, Object.assign({}, this.param, this.typeId, this.evaluateType))
				console.log(data)
				this._processingData(data)
			})
		},
		// 统计状态
		_getEvaluateStatistics(id) {
			console.log('请求参数')
			console.log(id)
			getEvaluateStatistics(id).then(data => {
				console.log('返回数据')
				console.log(1233455, data)
				this.statistics = data.statistics ? Object.assign({}, this.statistics, data.statistics) : {totalLevel: 0}
				this.typeStatistics = data.typeStatistics ? data.typeStatistics : []
			})
		},
		_setEvaluateType(val) {
			switch (val) {
				case 0:
					this.evaluateType = {isPicture: 1}
					this.unData = true
				break
				case 1:
					this.evaluateType = {evaluateType: 1}
					this.unData = true
					break
				case 2:
					this.evaluateType = {evaluateType: 2}
					this.unData = true
					break
				case 3:
					this.evaluateType = {evaluateType: 3}
					this.unData = true
					break
				case 9:
					this.evaluateType = {}
					break
			}
			this._getEvaluateList()
		},
		// 数据刷新
		_refresh() {
			this._getEvaluateList()
		},
		// 加载更多
		_loadMore() {
			if (this.loading) {
				return
			} else if (this.hasMore) {
				Toast('没有更多数据')
				return
			}	else {
				this.param.currentPage += 1
				getEvaluateList(Object.assign({}, this.evaluateType, this.param, this.typeId)).then((data) => {
					console.log(data)
					this._processingData(data, true)
				})
		}
		},
		// 数据处理
		_processingData(data, flag) {
			if (flag) {
				this.evaluateList = this.evaluateList.concat(data)
				this.loading = false
				// if (data.length < LIMIT) {
				// 	this.hasMore = true
				// }
			} else {
				this.evaluateList = data
				this.refreshing = false
			}
			console.log(12344, this.evaluateList)
		},
		_getPicture(pictures, index) {
			console.log(4, pictures)
			this.pictureList = pictures
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .wrap{
 	position: relative;
 	width:100%;
 	overflow-y: auto;
 }
 .evaluate-content{
 	/*position: relative;*/
 	/*height: 1000px;*/
 }
 .s{
 	border:2px solid green;
 	height: 100%;
 }
.evaluate-header{
	width: 100%;
	height: auto;
	.flexbox();
	.justify-content(space-between);
	.align-items(center);
	.flex-wrap(wrap);
	margin-bottom:8px;
	padding:10px 15px;
	padding-bottom: 10px;
	background:#fff;
	.evaluate-all{
		width:60%;
		font-size:0.7rem;
	}
	.evaluate-list{
		width:40%;
		.flexbox();
		.flex-wrap(wrap);
		.align-content(space-around);
		font-size:0.7rem;
		.evaluate-list-item{
			width:100%;
			margin:2px 0;
			.star{
				margin-left:5px;
				display:inline-block
			}
		}
	}
}
.evaluate-nav{
	font-size:0.7rem;
	height:60px;
	padding-top:10px;
	.evaluate-num{
		font-size:0.6rem;
	}
}
.scroll{
	position: relative;
	.content{
		top:66px;
		bottom:0;
		background:#eee;
	}
}
.evaluate-list-wrap{
	/*min-height:500px;*/
	margin-top: 0;
}
.typeList{
	margin:10px 0 0;
	li{
		display:inline-block;
		margin-bottom:4px;
		font-size: 0.5rem;
		text-align: center;
		border-radius: 4px;
		padding: 5px;
		background-color: @color-split;
		margin-right: 8px;
	}
}
</style>