<template>
  <div class='searchList'>
    <search :value="value" @search="_getSearchList" ></search>
    <div >
    	<scroll class="content"  style="border:2px solid red" >
    		<ul >
    			<li v-for="(i, index) in new Array(60)">{{index}}</li>
    		</ul>
    		<ul class="row text-center sort-nav no-gutter">
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='sale'}">销售最高</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='composite'}">综合</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort == 'comment'}">评价</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='price'}">价格最低</li>
			</ul>
    </scroll>	
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import Search from 'components/SearchCom'
import { Loadmore } from 'mint-ui'
import {getSearchList} from 'api/search'
import {mapGetters} from 'vuex'
import NoData from 'components/NoData/index'
export default {
	data() {
		return {
			searchList: [],
			value: '',
			cityId: '',
			loading: false,
			page: 0
		}
	},
	created() {
		this.value = this.$route.query.value
		this._getSearchList(this.$route.query.value)
	},
	actived() {
		this._getSearchList()
	},
	components: {
		Search,
		MtLoadmore: Loadmore,
		Scroll,
		NoData
	},
	methods: {
		_getSearchList(val) {
			this.value = val
			this.cityId = this.city.cityId
			let page = 0
			console.log(`searchContent=${this.value}cityId=${this.cityId}page=${page}`)
			getSearchList(this.value, this.cityId, page).then((data) => {
				console.log(data)
			})
		},
		_loadMore(id) {
			alert('....')
			if (this.loading) {
				return
			} else {
				this.page += 1
				getSearchList(this.value, this.cityId, this.page).then((data) => {
					console.log(data)
					this.loading = false
				})
			}
			this.$oroadcast('onTopLoad', id)
		}
	},
	computed: {
		...mapGetters(['city'])
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom: 0
 }
 .sort-nav{
 	position: absolute;
 	.size(100%;30px);
 	top:0;
 }
</style>