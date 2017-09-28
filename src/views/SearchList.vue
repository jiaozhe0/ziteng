<template>
  <div class='searchList'>
    <search :value="key" @search="_getSearchList" ></search>
     <scroll class="content" 
     	ref='s' 
      :data="searchList"
      :listenScroll="true"
     	@scroll="_listenScroll"
     	@scrollToTop="_refresh"
     	@scrollToEnd="_loadMore"
     	@scrollToGap="_resRefresh"
     	:pullup="true"
     >
     	<service-list :serviceList="searchList" v-show="searchList.length" class='searchList-wrap'></service-list>
     	<no-data v-show="!searchList.length" class='ll'></no-data>
     	<refresh-icon ref='refresh' :top="{'top':searchList.length ? -10+'px' : -40 + 'px'}">
   				{{refreshText}}加载
   		</refresh-icon>
     	<sort @getServiceList="_selectedSort" v-show="searchList.length"></sort>
     </scroll>	
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import Search from 'components/SearchCom'
import RefreshIcon from 'components/Refresh/index'
import ServiceList from 'components/ServiceList'
import NoData from 'components/NoData/index'
import Sort from 'components/Sort'
import { Loadmore } from 'mint-ui'
import {getServiceList} from 'api/search'
import {mapGetters} from 'vuex'
import {saveToLocal} from 'common/js/store'
import {Refresh, resRefresh} from 'common/js/browser'
export default {
	data() {
		return {
			searchList: [],
			loading: false,
			sortType: {overall: 'desc'},
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
	},
	activated() {
		this.data.searchContent = this.$route.query.value
		this._getSearchList(this.$route.query.value)
	},
	components: {
		Search,
		MtLoadmore: Loadmore,
		Scroll,
		NoData,
		Sort,
		ServiceList,
		RefreshIcon
	},
	methods: {
		// 数据排序
		_selectedSort(val) {
			switch (val) {
				case 'overall':
					this.sortType = {overall: 'desc'}
				break
				case 'price':
					this.sortType = {priceNumber: 'desc'}
				break
				case 'sale':
					this.sortType = {salesNumber: 'desc'}
					break
				case 'evaluate':
					this.sortType = {evaluateNumber: 'desc'}
					break
			}
			this.data.page = 0
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				console.log(data)
				this._processingData(data.data)
			})
		},
		// 获取第一页列表
		_getSearchList(val) {
			this.data.searchContent = val
			this.data.baiduCityId = this.city.cityId
			saveToLocal(val)
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				console.log(data)
				this._processingData(data.data)
			})
		},
		// 加载更多
		_loadMore() {
			if (this.loading) {
				return
			} else {
				console.log('加载更多。。。')
				this.data.page += 1
				getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
					console.log(data)
					this._processingData(data.data, true)
				})
			}
		},
		// 刷新
		_refresh() {
			console.log('刷新。。。')
			this.data.page = 0
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				console.log(data)
				this._processingData(data.data)
			})
		},
		// 数据处理
		_processingData(val, flag) {
			if (flag) {
				this.searchList.concat(val)
				this.loading = false
			} else {
				this.searchList = val
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
.ll{
	border:1px solid red;
	height: 990px;
}
</style>