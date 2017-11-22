<template>
  <div class='searchList'>
    <search :value="key" @search="_getSearchList" path="/index/search"></search>
    <div class="content" ref="ll">
     <scroller class="noData" v-if="!searchList.length" ref="noData">
       <no-Data></no-Data>
     </scroller>
    	<div class='test' v-else>
    	<sort @getServiceList="_selectedSort"></sort>
      <scroller class="top"
       @refresh='_refresh' 
       @loadMore="_loadMore"
       :refreshIcon="refreshing"
       :loadIcon="loading"
       ref='scroll'
       >
    	<service-list :serviceList="searchList" :searchContent="data.searchContent && data.searchContent"></service-list>
     </scroller>
     </div>
     </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroller from 'components/scroller/index'
import Search from 'components/searchCom/index'
import ServiceList from 'components/ServiceList'
import NoData from 'components/NoData/index'
import Sort from 'components/Sort'
import {getServiceList} from 'api/search'
import {mapGetters} from 'vuex'
import {saveToLocal} from 'common/js/store'
import {Toast} from 'mint-ui'
const LIMIT = 15
var url = ''
export default {
	data() {
		return {
			searchList: [],
			loading: false,
			refreshing: false,
			hasMore: false,
			sortType: {salesNumber: 'desc'},
			value: '',
			data: {
				searchContent: '',
				baiduCityId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				page: 0
			},
			refreshText: '下拉'
		}
	},
	created() {
		console.log('出发了嘛')
		this.data.searchContent = this.$route.query.value
	},
	activated() {
		// console.log(this.$refs.ll)
		if (url.indexOf('/servicedetail') > -1) {
			this._getSearchList(this.data.searchContent)
		} else {
			this.data.searchContent = this.$route.query.value && this.$route.query.value
			this._getSearchList(this.$route.query.value)
		}
	},
	deactivated() {
		// if (url.indexOf('/servicedetail') < 0) {
		// 	this.searchList = []
		// }
	},
	beforeRouteEnter(to, from, next) {
		url = from.path
		next()
	},
	components: {
		Search,
		Scroller,
		NoData,
		Sort,
		ServiceList
	},
	methods: {
		// 数据排序
		_selectedSort(val) {
			switch (val) {
				case 'overall':
					this.sortType = {overall: 'desc'}
				break
				case 'price':
					this.sortType = {priceNumber: 'asc'}
				break
				case 'sale':
					this.sortType = {salesNumber: 'desc'}
					break
				case 'evaluate':
					this.sortType = {evaluateNumber: 'desc'}
					break
			}
			this.data.page = 0
			console.log(88, this.sortType)
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				console.log(data)
				this._processingData(data.data)
			})
		},
		// 获取第一页列表
		_getSearchList(val) {
			this.refreshing = true
			this.data.searchContent = val
			this.data.baiduCityId = this.city.cityId
			saveToLocal(val)
			console.log(123, this.data)
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				console.log(data)
				this._processingData(data.data)
			})
		},
		// 加载更多
		_loadMore() {
			if (this.loading) {
				return
			}
			if (this.hasMore) {
				Toast('没有更多数据')
				return
			}
				this.data.page += 1
				this.loading = true
				getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
					console.log(data)
					this._processingData(data.data, true)
				})
		},
		// 刷新
		_refresh() {
			if (this.refreshing) {
				return
			}
			this.data.page = 0
			this.refreshing = true
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				this._processingData(data.data)
			})
		},
		// 数据处理
		_processingData(val, flag) {
			if (val.length === 0) {
				Toast('没有更多数据')
			}
			if (flag) {
				this.searchList.concat(val)
				this.loading = false
				if (val.length < LIMIT) {
					this.hasMore = true
				}
			} else {
				this.searchList = val
				this.refreshing = false
			}
		}
	},
	computed: {
		...mapGetters(['city']),
		key() {
			return this.$route.query.value
		},
		listHeight() {
			return this.$refs.searchList.offsetHeight
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom: 0;
 	background-color: #eee;
 }
.loading-icon{
	position: absolute;
	.size(100%;40px);
	top:0;	
	border:2px solid red;
	z-index:-1
}
.searchList-wrap{
	margin-top: 40px!important;
	min-height: 600px;
}
.top{
	top:36px!important;
}
</style>