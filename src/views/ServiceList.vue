<template>
<div class="serviceList">
	<mt-header title="服务列表"></mt-header>
	<div class="content" >
		<div class="serlist-top row">
			<div class="serlist-nav col-80">
				<type-slider ref='typeSlider' @getWidth="_getWidth">
					<div class="serlist-item text-center pull-left" 
					:class="{'on': selectedType == 'all'}"
					@click="selectedType = 'all'"
					ref='allBtn'
					>
						<div class="img-wrap">
								<img src="" alt="" class="img-responsive">
							</div>
							<p class='type-text'>全部</p>
					</div>
					<div class="serlist-item text-center pull-left" 
								v-for="(item, index) in childTypeList"
								ref="serlistItem"
								@click="_selectedType(index, item)"
								:class="{'on': selectedType == index}" 
								>
							<div class="img-wrap">
								<img :src="item.pictureUrl" alt="" class="img-responsive">
							</div>
							<p class='type-text'>{{item.typeName}}</p>
					</div>
				</type-slider>
			</div>
			<div class="typeAll-btn col-20" @click="showTypeList = true">
				全部
			</div>
		</div>
		<!-- 排序导航 -->
		<transition name='fade'>
		<div class="serlist-nav-list text-center" v-show="showTypeList">
			<div class="top">
				全部
				<!-- <div class="pull-right">图标</div> -->
			</div>
			<ul class="row no-gutter">
				<li class="col-20 serlist-nav-list-item" 
				v-for="(item, index) in childTypeList"
				@click="_selectedType(index, item)"
				>
				<div>	
					<div class="img-wrap">
						<img :src="item.pictureUrl" alt="" class="img-responsive">
					</div>
					<p class='type-text'>{{item.typeName}}</p>
					</div>
				</li>
			</ul>
		</div>
		</transition>
			<transition name='fade'>
			<div class="mask" @click="showTypeList = false" v-show="showTypeList">
		</div>
		</transition>
		<!-- 服务列表 -->
		<scroll class='content serviceList-content'
						ref='s' 
   					:data="serviceList"
   					:listenScroll="true"
						@scroll="_listenScroll"
						@scrollToTop="_refresh"
						@scrollToEnd="_loadMore"
						@scrollToGap="_resRefresh"
						:pullup="true"
		>
			<!-- <service-list v-show="serviceList.length" 
			class='searchList-wrap' 
			:serviceList="serviceList" ></service-list> -->
			<no-data  ></no-data>
     	<refresh-icon ref='refresh' :top="{'top':-10+'px'}">
   				{{refreshText}}加载
   		</refresh-icon>
     	<sort @getServiceList="_selectedSort" v-show="serviceList.length"></sort>
		</scroll>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import TypeSlider from 'components/TypeSlider'
import Scroll from 'components/Scroll'
import NoData from 'components/NoData/index'
import RefreshIcon from 'components/Refresh/index'
import ServiceList from 'components/ServiceList'
import {getServiceList} from 'api/search'
import {mapGetters} from 'vuex'
import {Refresh, resRefresh} from 'common/js/browser'
import Sort from 'components/Sort'
export default {
	data() {
		return {
			showTypeList: false, // 类型导航列表显示/隐藏
			serviceList: [],
			loading: false,
			sortType: {overall: 'desc'},
			selectedType: 'all',
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
	components: {
		MtHeader,
		TypeSlider,
		NoData,
		Sort,
		Scroll,
		ServiceList,
		RefreshIcon
	},
	created() {
	},
	activated() {
		console.log(this.$route.query)
		this._getServiceList(this.$route.query)
		this._initIndex()
	},
	computed: {
		...mapGetters(['city', 'childTypeList'])
	},
	methods: {
		// 点击类型导航请求数据
		_selectedType(index, val) {
			console.log(index)
			this.selectedType = index
			this._getServiceList(val)
		},
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
		// 跳转页面后初始化下标
		_initIndex() {
			this.childTypeList.some((item, index) => {
				// console.log(item.serviceTypeId + '===' + this.$route.query.serviceTypeId)
				if (item.serviceTypeId === this.$route.query.serviceTypeId) {
					this.selectedType = index
					return true
				}
			})
			console.log(`初始位置${this.selectedType}`)
		},
		// 设置宽度
		_getWidth(w) {
			this.width = w
			console.log(1, this.childTypeList.length)
			setTimeout(() => {
				this.$refs.allBtn.style.width = this.width
			}, 20)
		},
		// 获取第一页数据列表
		_getServiceList(val) {
			this.data.searchContent = val
			this.data.baiduCityId = this.city.cityId
			this.data = Object.assign({}, val)
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
		_processingData(data, flag) {
			if (flag) {
				this.serviceList = this.serviceList.concat(data)
				this.loading = false
			} else {
				this.serviceList = data
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
	watch: {
		selectedType(index) {
			console.log('我的位置' + index)
			if (index >= 1) {
				this.$refs.typeSlider.slider.scrollTo(-(index) * this.width, 0, 400)
			}
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
	 	bottom:0;
	 	.mask{
	 		position: absolute;
	 		.size(100%;100%);
	 		top:0;
	 		left:0;
	 		background-color: rgba(0,0,0,.4);
	 		z-index: 30
	 	}
 		ul{margin: 0}
 }
.serviceList-content{
	top:64px;
	background-color: #eee;
	.searchList-wrap{
		margin-top:40px;
		min-height: 460px;
	}
}
.type-text{
	 		margin: 0;
	 		font-size: 0.6rem;
	 	}
 .serlist-nav-list{
	position: absolute;
	.size(100%;200px);
	z-index: 39;
	background-color: #fff;
	font-size: 0.7rem;
	color: @color-text-gray;
	top:0;
	.top{
		padding: 10px;
		border-bottom: 1px solid @color-split
	}
	li.serlist-nav-list-item{
		.flexbox();
		.justify-content(center);
		.align-items(center);
		height: 79px;
		font-size: 0.6rem;
		border:1px solid @color-split;
		border-top:none;
		color: @color-text-gray;
		&~li{
			border-left: none;
		}
		.img-wrap{
			display: inline-block;
			.square(20px)
		}
	}
 }
 .serlist-nav{
 	overflow: hidden;
 	.serlist-item{
	 	height: 64px;
	 	padding: 5px 0;
	 	border-bottom: 2px solid #fff;
	 	transition: all 0.8s @timing-fuction;
	 	.img-wrap{
	 		display: inline-block;
	 		.square(28px);
	 	}
		&.on{
			border-color: @color-primary
		}
 }
 }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>