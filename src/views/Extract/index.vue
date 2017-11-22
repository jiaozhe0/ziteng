<template>
  <div class='publish'>
  	<mt-header title="提现记录"></mt-header>
    <div class="content">
			<no-data v-if="!extractLists.length"></no-data>
			<scroller v-else
			  @refresh='_getExtractList'
			  :refreshIcon='refreshing'
			  :loadIcon='loading'
			  @loadMore="_loadExtractList">
				<extract-list :extractList="extractLists"></extract-list>
			</scroller>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import Status from 'components/Status/index'
import NoData from 'components/NoData/index'
import ExtractList from 'components/ExtractList/index'
import {getExtractList} from 'api/home'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
const LIMIT = 15
export default {
	data() {
		return {
			extractLists: [],
			loading: false, // 加载状态
			refreshing: false,
			hasMore: false,
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
		this._getExtractList()
	},
	computed: {
		...mapGetters(['user'])
	},
	components: {
			MtHeader,
			Scroller,
			Status,
			NoData,
			ExtractList
		},
	methods: {
		_getExtractList() {
			this.refreshing = true
			this.hasMore = false
			this.param.currentPage = 0
			getExtractList(this.param).then(data => {
				console.log(12, data)
				if (data.code === '000000') {
					this._processingData(data.data)
				}
			})
		},
		_loadExtractList() {
			if (this.loading) {
				return
			}
			if (this.hasMore) {
				Toast('没有更多数据')
				return
			}
			this.param.currentPage += 1
			getExtractList(this.param).then(data => {
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
				this.extractLists = this.extractLists.concat(val)
				this.loading = false
				if (val.length < LIMIT) {
					this.hasMore = true
				}
			} else {
				this.extractLists = val
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