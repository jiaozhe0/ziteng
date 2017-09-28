<template>
<div>
	 <mt-header title="用户评价"></mt-header>
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
   <tab class='evaluate-nav'>
      <tab-item selected @click.native="_setevaluateType(9)">全部评价<div>{{statistics.allCount}}</div></tab-item>
      <tab-item @click.native="_setevaluateType(1)">好评<div class="evaluate-num">{{statistics.isGood}}</div></tab-item>
      <tab-item @click.native="_setevaluateType(2)">中评<div class="evaluate-num">{{statistics.isMedium}}</div></tab-item>
      <tab-item @click.native="_setevaluateType(3)">
      <div>差评
      <div class="evaluate-num">{{statistics.isNegative}}</div>
      </div>
      </tab-item>
      <tab-item @click.native="_setevaluateType(0)"><div></div>有图<div class="evaluate-num">{{statistics.isPicture}}</div></tab-item>
   </tab>
   <scroll class='content'
						ref='s' 
   					:data="evaluateList"
   					:listenScroll="true"
						@scroll="_listenScroll"
						@scrollToTop="_refresh"
						@scrollToEnd="_loadMore"
						@scrollToGap="_resRefresh"
						:pullup="true"
   >
   	<evaluate-list class='evaluate-list-wrap' :evaluateList="evaluateList"></evaluate-list>
   	<refresh-icon ref='refresh' >
   				{{refreshText}}加载
   	</refresh-icon>
   </scroll>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {Tab, TabItem} from 'components/tab/index'
import EvaluateList from 'components/EvaluateList/index'
import NoData from 'components/NoData/index'
import Star from 'components/star/star'
import RefreshIcon from 'components/Refresh/index'
import {Refresh, resRefresh} from 'common/js/browser'
import {getEvaluateList, getEvaluateStatistics} from 'api/evaluate'
import {mapMutations} from 'vuex'
export default {
	data() {
		return {
			evaluateList: [],
			loading: false,
			isMore: false,
			evaluateType: {},
			refreshText: '下拉',
			param: {
				serviceUserId: '',
				currentPage: 0
			},
			statistics: {}
		}
	},
	components: {
		Scroll,
		MtHeader,
		Tab,
		TabItem,
		EvaluateList,
		NoData,
		RefreshIcon,
		Star
	},
	created() {
		this.setFooter()
	},
	activated() {
		this.param.serviceUserId = this.$route.query.serviceUserId
		this._getEvaluateStatistics(this.param.serviceUserId)
		this._getEvaluateList()
	},
	destroyed() {
		this.setFooter(true)
	},
	methods: {
		_getEvaluateList() {
			this.param.currentPage = 0
			getEvaluateList(Object.assign({}, this.param, this.evaluateType)).then(data => {
				console.log(data)
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
		_setevaluateType(val) {
			switch (val) {
				case 0:
					this.evaluateType = {isPicture: 0}
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
		_refresh() {},
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
		_resRefresh() {
			this.$nextTick(() => {
				resRefresh(this.refreshEle)
				this.refreshText = '下拉'
			})
		},
		_listenScroll(pos) {
			this.refreshEle = this.$refs.refresh.$refs
			Refresh(this.refreshEle, pos.y)
			if (pos.y > 50) {
				this.refreshText = '松开'
			}
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
.content{
	top:220px;
	bottom:0;
	background:#eee;
}
.evaluate-list-wrap{
	min-height:500px;
	margin-top: 0;
}
</style>