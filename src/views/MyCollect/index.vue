<template>
  <div class='publish'>
  	<mt-header title="我的收藏" path="/home"></mt-header>
    <div class="content">
			<no-data v-if="!collectList.length"></no-data>
			<scroller v-else
				:dataList="collectList"
			  @refresh='_getServiceCollection'
			  :refreshIcon='refreshing'
			  :loadIcon='loading'
			  @loadMore="_loadServiceCollection">
				<service-list :serviceList="collectList"></service-list>
			</scroller>
    </div>
    <div class="bar bar-footer">
    	<router-link to="/editservice" class='footer-btn'>发布服务</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import Status from 'components/Status/index'
import NoData from 'components/NoData/index'
import ServiceList from 'components/ServiceList/index'
import {getServiceCollectionList} from 'api/home'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
const LIMIT = 15
export default {
	data() {
		return {
			collectList: [],
			loading: false, // 加载状态
			refreshing: false,
			hasMore: false,
			param: {
				userId: '',
				page: {
					currentPage: 0
				}
			}
		}
	},
	created() {
		this.param.userId = this.user.userId
	},
	activated() {
		this._getServiceCollection()
	},
	computed: {
		...mapGetters(['user'])
	},
	components: {
			MtHeader,
			Scroller,
			ServiceList,
			Status,
			NoData
	},
	methods: {
		_getServiceCollection() {
			this.refreshing = true
			this.param.page.currentPage = 0
			getServiceCollectionList(this.param).then(data => {
				console.log(12, data)
				if (data.code === '000000') {
					this._processingData(data.data)
				}
			})
		},
		_loadServiceCollection() {
			if (this.loading) {
				return
			}
			if (this.hasMore) {
				Toast('没有更多数据')
				return
			}
			this.param.page.currentPage += 1
			getServiceCollectionList(this.param).then(data => {
				if (data.code === '000000') {
					this._processingData(data.data, true)
				}
			})
		},
		// 数据处理
		_processingData(val, flag) {
			if (val.length < 0) {
					Toast('没有更多数据')
					return
				}
			if (flag) {
				this.collectList = this.collectList.concat(val)
				this.loading = false
				if (val.length < LIMIT) {
					this.hasMore = true
				}
			} else {
				this.collectList = val
				this.refreshing = false
				this.hasMore = false
			}
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '../../common/css/variable.less';
@import '../../common/css/mixin.less';
.content{
	bottom:0;
	&.gap{
		bottom:60px;
	}
}

</style>