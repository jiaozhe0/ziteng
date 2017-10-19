<template>
<div>
	 <div v-show="!pictureList.lenght">
		 <mt-header :title="title"></mt-header>
		 <div v-show='evaluateList.length'>
		 <div class="wrap" ref="wrap" >
		   <div class="evaluate-header">
		   		<div class='evaluate-all'>
		   		<div><star :score="statistics.totalLevel" :size="36"></star></div>
		   		<div class='evaluate-all-text'>评价(满意度{{statistics.scorePercent}})</div>
		   		</div>
		   <div class='evaluate-list'>
		   		<div class='evaluate-list-item'>服务描述:<star class='star' :score="statistics.describeLevel" :size="24"></star></div>
		   		<div class='evaluate-list-item'>服务态度:<star class='star' :score="statistics.attitudeLevel" :size="24"></star></div>
		   		<div class='evaluate-list-item'>专业技能:<star class='star' :score="statistics.professionalLevel" :size="24"></star></div>
		   </div>
		   </div>
		   <div class="scroll" ref="scroll">
		   	 <!-- 评价类型导航 -->
			   <tab class='evaluate-nav'>
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
			   <div>
			   <scroller  @refresh='_refresh' @loadMore="_loadMore" :dataList="evaluateList">
			   	<evaluate-list class='evaluate-list-wrap' :evaluateList="evaluateList" @pictureList="_getPicture"></evaluate-list>
			   </scroller>
			   </div>
		   </div>
	   </div>
	   </div>
	   <no-data v-show='!evaluateList.length'></no-data>
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
export default {
	data() {
		return {
			evaluateList: [],
			loading: false,
			isMore: false,
			evaluateType: {},
			pictureList: [],
			param: {
				serviceUserId: '',
				currentPage: 0
			},
			statistics: {}
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
		let size = initSize()
		this.$refs.wrap.style.height = (size.vH - 44) + 'px'
		this.$refs.scroll.style.height = (size.vH - 46) + 'px'
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
		if (this.$route.params.type === 'my') {
				this.param.serviceUserId = this.user.userId
				this._getEvaluateStatistics(this.user.userId)
				this._getEvaluateList()
		} else {
			this.param.serviceUserId = this.$route.query.serviceUserId
			this._getEvaluateStatistics(this.param.serviceUserId)
			this._getEvaluateList()
		}
	},
	deactivated() {
		this.setFooter(true)
	},
	methods: {
		_getEvaluateList() {
			this.param.currentPage = 0
			getEvaluateList(Object.assign({}, this.param, this.evaluateType)).then(data => {
				console.log(666, data)
				console.log(this.evaluateType)
				this._processingData(data)
			})
		},
		_getEvaluateStatistics(id) {
			getEvaluateStatistics(id).then(data => {
				console.log(data)
				this.statistics = data.statistics
			})
		},
		_setEvaluateType(val) {
			switch (val) {
				case 0:
					this.evaluateType = {isPicture: 1}
				break
				case 1:
					this.evaluateType = {evaluateType: 1}
					break
				case 2:
					this.evaluateType = {evaluateType: 2}
					break
				case 3:
					this.evaluateType = {evaluateType: 3}
					break
				case 9:
					console.log(val)
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
			} else {
				console.log('加载更多。。。')
				this.param.currentPage += 1
				getEvaluateList(Object.assign({}, this.evaluateType, this.param)).then((data) => {
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
			} else {
				this.evaluateList = data
			}
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
.evaluate-header{
	.size(100%;100px);
	.flexbox();
	.justify-content(space-between);
	.align-items(center);
	margin-bottom:8px;
	padding:0 15px;
	background:#fff;
	.evaluate-all{
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
	min-height:500px;
	margin-top: 0;
}
</style>