<template>
  <div class='searchList'>
    <search :value="value" @search="_getSearchList" ></search>
    <div class="content" >
    	<scroll style="height: 800px;border:2px solid red">
    
    	<mt-loadmore :bottom-method="_loadMore" autoFill="false">
    		<ul >
    			<li v-for="(i, index) in new Array(60)">{{index}}</li>
    		</ul>
    		<div slot="top" class="mint-loadmore-top">
			    <span v-show="!loading" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
			    <span v-show="loading">Loading...</span>
			  
			  </div>
    	</mt-loadmore>
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
	},
	mounted() {
		this.$nextTick(() => {
			this._getSearchList(this.value)
		})
		console.log('cityId' + this.city.cityId)
	},
	components: {
		Search,
		MtLoadmore: Loadmore,
		Scroll
	},
	methods: {
		_getSearchList(val) {
			this.value = val
			this.cityId = this.city.cityId
			let page = 0
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
</style>