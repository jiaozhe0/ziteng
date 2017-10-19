<template>
 <div class='serDetial'>
    <mt-header :bg="{'background':'rgba(0,0,0,.4)','zIndex':200}" :title="serviceInfo.title"></mt-header>
		<div class='content serDetial-wraps' ref="scroll">
			<div class="serDetial-wrap">
			<div class="serDetial-content">
				<mt-swipe :auto="4000">
				  <mt-swipe-item v-for="(item,index) in serviceInfo.servicePic" :key="index">
				  	<img :key="index" @load="_imageLoad" :src="item.picName" alt="" class="img-responsive">
				  </mt-swipe-item>
				</mt-swipe>
				<div class="serDetial-top clearfix">
					<div class="pull-left">
						<div class="serDetial-service-title">{{serviceInfo.title}}</div>
						<div class="serDetial-estimate"> 
						<span>好评度：
						<strong>{{serviceInfo.evaluateNumber | score}}</strong></span>
						<span>销量: 
						<strong>{{serviceInfo.salesNumber}}&nbsp;单</strong>
						</span>
						</div>
					</div>
					<div class="pull-right serDetial-price">
						<div class="serDetial-price-text">{{serviceInfo.priceNumber}}</div>
						<div class="serDetial-unit">元/小时</div>
					</div>
				</div>
				<!-- 服务描述 -->
				<div class="card">
			    <div class="card-header">
			    	<div class="serDtial-title">
			    		服务描述
			    	</div>
			    </div>
			    <div class="card-content">
			      <div class="card-content-inner">
			      	{{serviceInfo.serviceDescribe}}
			      </div>
			    </div>
			  </div>
			  <!-- 服务者信息 -->
			  <div class="card">
			    <div class="card-header" @click="_goHomePage(serviceInfo.userId)">
			    	<div class="clearfix userInfo">
			    		<div class="avatar-img pull-left" v-if="serviceInfo.userInfo.photoUrl">
			    			<img :src="serviceInfo.userInfo.photoUrl" alt="" class="img-responsive">
			    		</div>
			    		<div class="userInfo-content">
			    			<div>{{serviceInfo.userInfo.userName}}
			    			</div>
			    			<div class="auth-wrap">
			    				<certify :size="18"
			    				 :name="serviceInfo.userAuthStatus.authUserIdStatus"
									 :skill="serviceInfo.userAuthStatus.authProfessionalStatus"
									 :bussiness="serviceInfo.userAuthStatus.authBusinessStatus"
									 :zhima="parseInt(serviceInfo.userAuthStatus.authZhimaxinyongStatus)"
			    				 ></certify>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			     <div class="card-footer">
			     <router-link :to="{path:'/servicemap', query:{lng:serviceInfo.longitude, lat:serviceInfo.latitude,
			     name:serviceInfo.baiduCityName}}">
			     {{serviceInfo.baiduCityName}}
			     </router-link>
			     </div>
			  </div>
			</div>
				<div class="card evaluateList" ref="evaluate" v-show="evaluateList.length">
			    <div class="card-header">
			    	<div class="serDtial-title">用户评价</div>
			    </div>
			    <div class="card-content evaluate-wrap">
			    <div>
			      <scroller :dataList="evaluateList"
			      					:refreshIcon="refreshing"
			      					:loadIcon="loading"
			      					@refresh="_refresh"
			      					@load="_loadMore"
			      >
			      	<evaluate-list :evaluateList="evaluateList"></evaluate-list>
			      </scroller>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		<div class="bar bar-footer serDetial-footer">
			<div class="store-btn" :class="{'on':collect}" @click="_saveServiceCollection">收藏</div>
			<div class="message-btn">发消息</div>
			<div class="order-btn">立即下单</div>
		</div>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import EvaluateList from 'components/EvaluateList/index'
import {Swipe, SwipeItem, Toast} from 'mint-ui'
import {mapMutations, mapGetters} from 'vuex'
import {getServiceDetails, saveServiceCollection, getServiceCollection, deleteServiceCollection} from 'api/service'
import {getEvaluateList} from 'api/evaluate'
import {share} from 'common/js/share'
import {initSize} from 'common/js/browser'
import Certify from 'components/Certify/index'
export default {
	data() {
		return {
			serviceInfo: {
				userInfo: {
					photoUrl: ''
				},
				userAuthStatus: {
					authZhimaxinyongStatus: ''
				}
			},
			evaluateList: [],
			param: {
				serviceId: '',
				currentPage: 0
			},
			// 获取收藏 收藏服务
			collectParam: {
				serviceId: '',
				collectionUserId: '',
				serviceUserId: ''
			},
			loading: false,
			refreshing: false,
			hasMore: false,
			collect: false
		}
	},
	created() {
		this.setFooter(false)
	},
	mounted() {
		let size = initSize()
		this.$refs.evaluate.style.height = (size.vH - 140) + 'px'
	},
	activated() {
		let serviceId = this.$route.query.serviceId
		this.collectParam.serviceId = this.$route.query.serviceId
		this.collectParam.collectionUserId = this.user.userId
		this._getServiceDetails(serviceId, this.user.userId)
		this._getEvaluateList(serviceId)
	},
	deactivated() {
		this.setFooter(true)
		this.$root.config = {
			title: '桔子生活', // 分享标题
			desc: '身边的生活服务专家,都在桔子生活',
			imgUrl: 'https://static.vux.li/logo_520.png',
			link: window.location.href
		}
	},
	computed: {
		...mapGetters(['user', 'config'])
	},
	components: {
		MtHeader,
		Scroller,
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem,
		EvaluateList,
		Certify
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setConfig: 'CONFIG'
		}),
		// 获取服务详情
		_getServiceDetails(serviceId, collectionUserId) {
			getServiceDetails(serviceId, collectionUserId).then((data) => {
				this.serviceInfo = Object.assign({}, this.serviceInfo, data.serviceInfo)
				// 判断是否收藏
				if (data.serviceCollection && data.serviceCollection.serviceCollectionId) {
						console.log(data.serviceCollection.serviceCollectionId)
						this.collect = data.serviceCollection.serviceCollectionId
					} else {
						this.collect = ''
				}
				this.collectParam.serviceUserId = data.serviceInfo.serviceId
				share(this.config)
			})
		},
		// 获取评价列表
		_getEvaluateList(serviceId) {
			this.refreshing = true
			this.param.currentPage = 0
			this.param.serviceId = serviceId
			getEvaluateList(this.param).then((data) => {
				this._processingData(data)
			})
		},
		_refresh() {
			this._getEvaluateList(this.$route.query.serviceId)
		},
		_loadMore() {
			if (this.loading) {
				return
			}
			if (this.hasMore) {
				Toast('没有更多数据')
				return
			}
				console.log('加载更多。。。')
				this.param.currentPage += 1
				getEvaluateList(this.param).then((data) => {
					console.log(data)
					this._processingData(data, true)
				})
		},
		// 数据处理
		_processingData(data, flag) {
			if (flag) {
				this.evaluateList = this.evaluateList.concat(data)
				this.loading = false
			} else {
				this.evaluateList = data
				this.refreshing = false
			}
			if (data.length < 15) {
				this.hasMore = true
			}
		},
		_goHomePage(userId) {
			this.$router.push({path: '/homepage', query: {userId: userId}})
		},
		_imageLoad() {
			if (!this.checkloaded) {
          this.checkloaded = true
          // this.$refs.scroll.refresh()
      }
		},
		// 删除/保存收藏
		_saveServiceCollection() {
			if (this.collect !== '') {
				console.log(this.collect)
				deleteServiceCollection(this.collect).then(data => {
					console.log(data)
					if (data.code === '000000') {
						Toast('删除成功')
						this.collect = ''
					}
				})
			} else {
				saveServiceCollection(this.collectParam).then(data => {
					if (data.code === '000000') {
						Toast('收藏成功')
						this.collect = true
					}
				})
			}
		},
		// 获取收藏
		_getServiceCollection() {
			getServiceCollection(this.collectParam).then(data => {
				if (data.code === '000000') {
					console.log(data.data.collectionUserId)
					if (data.data && data.data.collectionUserId) {
						this.collect = true
					} else {
						this.collect = false
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	top:0;
 	background:#eee;
 	&.serDetial-wraps{
 		overflow-y: auto;
 	}
 }
 .serDetial-top{
	 	background:#fff;
	 	padding:0.5rem 0.75rem;
	 	.serDetial-service-title{
	 		font-size:0.75rem;
	 		margin-bottom:4px;
	 	}
	 	.serDetial-estimate{
	 		color:@color-text-secondary;
	 		font-size:0.6rem;
	 		span{
	 			margin:0 0.5rem 0 0
	 		}
	 		strong{
	 			font-weight: normal;
	 			color: @color-primary
	 		}
	 	}
	 	.serDetial-price{
	 		font-size:0.75rem;
	 		color:@color-primary;
	 		.serDetial-price-text{
	 			// margin-bottom:2px;
	 		}
	 	}
	 	.serDetial-unit{
	 		font-size:0.6rem;
	 	}
 }
 .card{
 	.serDtial-title{
 		padding-left:10px;
 		font-size: 0.7rem;
 	}
 	.card-content-inner{
 		font-size:0.6rem;
 	}
 }

.serDetial-footer{
	.flexbox();
  .flex-wrap(nowrap);
  .justify-content(space-between);
  .align-items(stretch);
  .size(100%;50px);
	text-align: center;
	line-height: 50px;
	background-color: #fff;
	color: @color-text-secondary;
	font-size: 0.7rem;
	padding: 0;
	.message-btn,.store-btn{
		width: 25%;
		text-align: center;
		flex:1;
		&.on{
			color:@color-danger
		}
	}
	.store-btn{
		border-right: 1px solid @color-split;
	}
	.order-btn{
		width: 50%;
		background-color: #F04848;
		color:#fff;
	}
}
 .mint-swipe{
 	.size(100%;240px);
 }
 .userInfo{
 	width: 100%;
 	font-size: 0.7rem;
 	.avatar-img{
		.square(40px);
	}
	.userInfo-content{
		margin-left: 50px;
	}
	.auth-wrap{
		.flexbox();
		.justify-content(flex-start);
		.align-items(center);
		margin-top: 4px;
		font-size: 0.6rem;
		color:@color-text-gray;
	}
 }
 
 .serDetial-wrap{
 		height: auto;
 }
 .evaluateList{
 	position:relative;
 	.size(100%;100%);
 	margin-bottom: 0; 
 .evaluate-wrap{
 	.size(100%;100%);
 	.card-content-inner{
 		.size(100%;102%);
 	}
 }
 }
</style>