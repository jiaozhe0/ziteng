<template>
  <div class="search">
  	<search @search="_getSearchList"></search>
    <div class="content">
    	<h4 class='search-title'>热门搜索</h4>
    	<ul class='search-list-wrap'>
    		<li @click="_getSearchList(item.title)" v-for="(item,index) in hotList" class="hot-search search-list">
						{{item.title}}
    		</li>
    	</ul>
    	<h4 class='search-title'>历史搜索</h4>
    	<ul class='search-list-wrap' >
    		<li class='history-search search-list' 
    		v-for="item in historyList"
    		@click="_getSearchList(item)"
    		>
    			{{item}}
    		</li>
    	</ul>
    	<button @click='_delet' class='center-block delet-btn'>清空历史</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Search from 'components/SearchCom'
import {getSearchTitleList} from 'api/search'
import {loadFromLocal} from 'common/js/store'
import {Toast} from 'mint-ui'
export default {
	data() {
		return {
			historyList: [],
			hotList: [],
			value: ''
		}
	},
	components: {
		Search
	},
	created() {
		this._getSearchTitleList()
		console.log(4, localStorage.__historyTitle__)
	},
	activated() {
		console.log(loadFromLocal())
		this.historyList = loadFromLocal()
	},
	methods: {
		_delet() {
			this.historyList = []
			localStorage.__historyTitle__ = []
		},
		_getSearchList(val) {
			if (val === '') {
				Toast('内容不得为空')
				return
			}
			this.$router.push({path: 'search/list', query: {value: val}})
		},
		_getSearchTitleList() {
			getSearchTitleList().then((data) => {
				console.log(data)
				this.hotList = data
			})
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
		bottom: 0;
		padding: 10px;
 }
 .search-title{
 	margin: 5px;
 	font-size: 0.8rem;
 	font-weight: 400
 }
 .search-list-wrap{
 		margin:10px 0;
	 	.search-list{
			display:inline-block;
			padding:5px 10px;
			background-color: @color-split;
			border-radius: 6px;
			margin:0px 15px 15px 0;
			font-size:0.7rem
		}
 }
.delet-btn{
			.size(80%;40px);
			margin-top: 20px;
			background: none;
			border:1px solid #ddd;
			font-size: 0.7rem;
		}
</style>