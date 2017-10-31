<template>
<div class="serviceList">
	<mt-header title="服务列表"></mt-header>
	<div class="content" >
		<div class="serlist-top row">
			<div class="serlist-nav col-80" v-if="childTypeList">
				<type-slider ref='typeSlider' @getWidth="_getWidth">
					<div class="serlist-item text-center pull-left" 
					:class="{'on': selectedType == 'all'}"
					@click="_all"
					ref='allBtn'
					>
					<div class="img-wrap all-icon"></div>
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
				<div>
					<div class="icon center-block"></div>
					全部
				</div>
			</div>
		</div>
		<!-- 排序导航 -->
		<transition name='fade'>
		<div class="serlist-nav-list text-center clearfix" v-show="showTypeList">
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
		 <scroller class="noData" v-if="!serviceList.length">
		   <no-Data></no-Data>
		 </scroller>
			<div class='test' v-else>
			<sort @getServiceList="_selectedSort"></sort>
		  <scroller class="scroller" 
		  @refresh='_refresh' 
		  :refreshIcon='refreshing'
		  :loadIcon='loading'
		  @loadMore="_loadMore">
			<service-list :serviceList="serviceList"></service-list>
		 </scroller>
		 </div>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import TypeSlider from 'components/TypeSlider'
import Scroller from 'components/scroller/index'
import NoData from 'components/NoData/index'
import RefreshIcon from 'components/Refresh/index'
import ServiceList from 'components/ServiceList'
import {getServiceList} from 'api/search'
import {mapGetters} from 'vuex'
import Sort from 'components/Sort'
import {Toast} from 'mint-ui'
const LIMIT = 15
export default {
	data() {
		return {
			showTypeList: false, // 类型导航列表显示/隐藏
			serviceList: [],
			loading: false,
			refreshing: false,
			hasMore: false,
			sortType: {overall: 'desc'},
			selectedType: 'all',
			data: {
				searchContent: '',
				baiduCityId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				pageNum: 0
			},
			refreshText: '下拉'
		}
	},
	components: {
		MtHeader,
		TypeSlider,
		NoData,
		Sort,
		Scroller,
		ServiceList,
		RefreshIcon
	},
	activated() {
		console.log(12, this.$route.query)
		this._getServiceList(this.$route.query)
		this._initIndex()
	},
	deactivated() {
		this.selectedType = 'all'
	},
	computed: {
		...mapGetters(['city', 'childTypeList'])
	},
	methods: {
		_all() {
			this.selectedType = 'all'
			this.data.searchContent = ''
			this._getServiceList(this.$route.query)
		},
		// 点击类型导航请求数据
		_selectedType(index, val) {
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
					this.sortType = {priceNumber: 'asc'}
				break
				case 'sale':
					this.sortType = {salesNumber: 'desc'}
					break
				case 'evaluate':
					this.sortType = {evaluateNumber: 'desc'}
					break
			}
			this.refreshing = true
			this.data.page = 0
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				this._processingData(data.data)
			})
		},
		// 跳转页面后初始化下标
		_initIndex() {
			this.childTypeList.some((item, index) => {
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
			setTimeout(() => {
				this.$refs.allBtn.style.width = this.width
			}, 20)
		},
		// 获取第一页数据列表
		_getServiceList(val) {
			this.refreshing = true
			this.data.baiduCityId = this.city.cityId
			this.data = Object.assign({}, this.data, val)
			this.data = Object.assign({}, this.data, this.sortType)
			getServiceList(this.data).then((data) => {
				if (data.code === '000000') {
					this._processingData(data.data)
				}
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
			this.data.pageNum += 1
			this.loading = true
			getServiceList(Object.assign({}, this.data, this.sortType)).then((data) => {
				if (data.code === '000000') {
					this._processingData(data.data, true)
				}
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
				if (data.code === '000000') {
					this._processingData(data.data)
				}
			})
		},
		// 数据处理
		_processingData(data, flag) {
			if (data.length === 0) {
				Toast('没有更多数据')
			}
			if (flag) {
				this.serviceList = this.serviceList.concat(data)
				this.loading = false
				if (data.length < LIMIT) {
					this.hasMore = true
				}
			} else {
				this.serviceList = data
				setTimeout(() => {
					this.refreshing = false
				}, 20)
			}
		}
	},
	watch: {
		selectedType(index) {
			console.log('我的位置' + index)
			if (index >= 1) {
				this.$refs.typeSlider.slider.scrollTo(-(index) * this.width, 0, 400)
			}
			this.showTypeList = false
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
 .icon{
 	.square(24px);
	background-size: 24px 24px;
 }
 .typeAll-btn{
 	height: 60px;
 	.flexbox();
 	.align-items(center);
 	.justify-content(center);
 	box-shadow: 1px 0 5px 6px rgba(230,230,230,.7s);
 	text-align: center;
 	font-size: 0.6rem;
 	.icon{
 		.square(20px);
 		background-size: 20px 20px;
 		.bg-view-image('ServiceList/classifyOther');
 		margin-bottom: 5px;
 	}
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
	 	height: 60px;
	 	padding: 5px 0;
	 	border-bottom: 2px solid #fff;
	 	transition: all 0.8s @timing-fuction;
	 	font-size:0.6rem;
	 	.img-wrap{
	 		display: inline-block;
	 		.square(24px);
	 	}
		&.on{
			color:@color-primary;
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
.noData{
	top:62px!important;
}
.test{
	position: absolute;
	.size(100%;90%);
	.scroller{
		top:38px;
	}
}
.all-icon{
	.square(24px);
	background: url('./all.png') no-repeat;
	background-size: 24px 24px;
}
</style>