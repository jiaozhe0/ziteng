<template>
 <div class='serDetial'>
    <mt-header  :path="serviceUrl" :share="$route.query.share && !$route.query.share" :bg="{'background':'rgba(0,0,0,.4)','zIndex':200}" :title="serviceInfo.title"></mt-header>
		<div class='content serDetial-wraps' ref="scroll">
			<div class="serDetial-wrap">
			<div class="serDetial-content">
				<mt-swipe :auto="4000">
				  <mt-swipe-item class="swipe" v-for="(item,index) in serviceInfo.servicePic" :key="index">
				  	<img :key="index" @click="_toView(serviceInfo.servicePic, index)" @load="_imageLoad" :src="item.picName" alt="" class="img-responsive">
				  </mt-swipe-item>
				</mt-swipe>
				<div class="serDetial-top clearfix">
					<div class="pull-left">
						<div class="serDetial-service-title">{{serviceInfo.title}}</div>
						<div class="serDetial-estimate"> 
						<span v-if="serviceInfo.evaluateNumber > 0">
						好评度：<strong>{{serviceInfo.evaluateNumber | score}}</strong>
						</span>
						<span v-else>暂无评价</span>
						<span>销量: 
						<strong>{{serviceInfo.salesNumber}}&nbsp;单</strong>
						</span>
						</div>
					</div>
					<div class="pull-right serDetial-price">
						<div class="serDetial-price-text">{{serviceInfo.priceType == 2 ? serviceInfo.subscription + '元' : serviceInfo.priceNumber}}</div>
						<div class="serDetial-unit">{{serviceInfo.priceType == 2 ? '预约金' : '元/次'}}</div>
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
			      <div class="card-content-inner" ref="describe">
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
									 :business="serviceInfo.userAuthStatus.authBusinessStatus"
									 :zhima="parseInt(serviceInfo.userAuthStatus.authZhimaxinyongStatus)"
			    				 ></certify>
			    			</div>
			    		</div>
			    	</div>
			    </div>
			     <div class="card-footer">
			     <router-link :to="{path:'/servicemap', query:{lng:serviceInfo.longitude, lat:serviceInfo.latitude,
			     name:serviceInfo.baiduCityName}}" class='address-btn'>
			     <div class="address-icon"></div> {{serviceInfo.baiduCityName}}
			     </router-link>
			     	<div class="icon"></div>
			     </div>
			  </div>
			</div>
				<div class="card evaluateList" ref="evaluate" v-if="evaluateList.length">
			    <div class="card-header" @click="_goEvaluate">
			    	<div class="serDtial-title">
			    		用户评价&nbsp;&nbsp;({{evaluateList.length}})
			    	</div>
			    	<div>全部<span class="icon"></span></div>
			  	</div>
			    <div class="card-content evaluate-wrap">
						<evaluate-list :footer="false" :evaluateList="[...evaluateList[0]]"></evaluate-list>
			    </div>
			  </div>
			</div>
		</div>
		<div class="bar bar-footer serDetial-footer share-footer" v-if="$route.query.share">
			<div class='clearfix share-footer-logo'>
					<div class="logo pull-left"></div>
					<div class="pull-left share-footer-text"> 
						<div>桔子生活</div>
						<span class='share-footer-slogan'>你身边的生活服务超市</span>
					</div>
			</div>
			<div>
				<a class='open-btn' 
				href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zitengkeji.app">打开应用</a>
			</div>
		</div>
		<div class="bar bar-footer serDetial-footer" v-else>
			<div class="store-btn" :class="{'on':collect}" @click="_saveServiceCollection">收藏</div>
			<div class="message-btn">发消息</div>
			<div class="order-btn" @click="_goOrder">立即下单</div>
		</div>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import EvaluateList from 'components/EvaluateList/index'
import {Swipe, SwipeItem, Toast, Cell} from 'mint-ui'
import {mapMutations, mapGetters} from 'vuex'
import {getServiceDetails, saveServiceCollection, getServiceCollection, deleteServiceCollection} from 'api/service'
import {getEvaluateList} from 'api/evaluate'
// import {share} from 'common/js/share'
// import {initSize} from 'common/js/browser'
import Certify from 'components/Certify/index'
var serUrl = ''
export default {
	data() {
		return {
			serviceInfo: {
				serviceDescribe: '',
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
	updated() {
		this.$refs.describe.innerHTML = this.text
	},
	activated() {
		this.$root.config = ''
		this._setUrl(serUrl)
		let serviceId = this.$route.query.serviceId
		this.collectParam.serviceId = this.$route.query.serviceId
		this.collectParam.collectionUserId = this.user.userId
		this._getServiceDetails(serviceId, this.user.userId)
		this._getEvaluateList(serviceId)
		this._getServiceTypeName()
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
		...mapGetters(['user', 'serviceTypeList', 'serviceUrl']),
		text() {
			let ll = /\n+}/g
			let t = this.serviceInfo.serviceDescribe.replace(ll, '<br/>')
			return t
		}
	},
	components: {
		MtHeader,
		Scroller,
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem,
		EvaluateList,
		Certify,
		MtCell: Cell
	},
	mounted() {
		this.$refs.describe.innerHTML = this.test
	},
	beforeRouteEnter(to, from, next) {
    serUrl = from.path
    next()
  },
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setConfig: 'CONFIG',
			setServiceInfo: 'SERVICEINFO',
			setPictures: 'PICTURES',
			setServiceUrl: 'SERVICEURL'
		}),
		_toView(pictures, i) {
			let picList = pictures.map(item => {
				return {picName: item.picName}
			})
     let picture = {
      index: i,
      list: picList
     }
     console.log(picture)
     this.setPictures(picture)
     this.$router.push('/view')
    },
		_goEvaluate() {
			this.$router.push({path: '/home/evaluate/service', query: {serviceId: this.$route.query.serviceId}})
		},
		// 获取服务详情
		_getServiceDetails(serviceId, collectionUserId) {
			getServiceDetails(serviceId, collectionUserId).then((data) => {
				this.serviceInfo = Object.assign({}, this.serviceInfo, data.serviceInfo)
				if (this.user.userId === this.$route.query.serviceId) {
					this.$root.config = {
						title: `我在桔子生活发布了一个${this.typeName}服务,求围观`,
						desc: '身边的生活服务专家,都在桔子生活',
						imgUrl: this.serviceInfo.servicePic[0].picName,
						link: window.location.href + '&share=true'
					}
				} else {
					this.$root.config = {
						title: `推荐一个${this.typeName}服务,我觉得值五星`,
						desc: '身边的生活服务专家,都在桔子生活',
						imgUrl: this.serviceInfo.servicePic[0].picName,
						link: window.location.href + '&share=true'
					}
				}				// 判断是否收藏
				if (data.serviceCollection && data.serviceCollection.serviceCollectionId) {
						this.collect = data.serviceCollection.serviceCollectionId
					} else {
						this.collect = ''
				}
				this.collectParam.serviceUserId = data.serviceInfo.serviceId
				// 设置分享内容
			})
		},
		// 获取评价列表
		_getEvaluateList(serviceId) {
			this.refreshing = true
			this.param.currentPage = 0
			this.param.serviceId = serviceId
			getEvaluateList(this.param).then((data) => {
				console.log(123, data)
				this._processingData(data)
			})
		},
		// 刷新
		_refresh() {
			this._getEvaluateList(this.$route.query.serviceId)
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
		// 前往个人主页
		_goHomePage(userId) {
			this.$router.push({path: '/homepage', query: {userId: userId, share: this.$route.query.share && this.$route.query.share}})
		},
		// 前往订单页
		_goOrder() {
			let info = {
				serviceId: this.$route.query.serviceId,
				title: this.serviceInfo.title,
				singleAmount: this.serviceInfo.priceType === 2 ? this.serviceInfo.subscription : this.serviceInfo.priceNumber,
				priceType: this.serviceInfo.priceType
			}
			this.setServiceInfo(info)
			this.$router.push({path: '/service/order', query: {serviceId: this.$route.query.serviceId}})
		},
		_imageLoad() {
			if (!this.checkloaded) {
          this.checkloaded = true
          // this.$refs.scroll.refresh()
      }
		},
		_getServiceTypeName() {
			// let flag = false
			return this.serviceTypeList.some(item => {
				item.typeList.some(sonItem => {
					if (sonItem.serviceTypeId === this.$route.query.serviceTypeId) {
						this.typeName = sonItem.typeName
						return true
					}
				})
			})
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
		},
		// 设置来源路由
		_setUrl(url) {
      console.log(99999, url)
      if (url.indexOf('/index') > -1 || url.indexOf('/serviceList') > -1 || url.indexOf('/index/search/list') > -1) {
        console.log(url)
        this.setServiceUrl(url)
      }
    }
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
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
	 			font-size: 0.9rem
	 			// margin-bottom:2px;
	 		}
	 	}
	 	.serDetial-unit{
	 		font-size:0.6rem;
	 	}
 }
 	.serDtial-title{
 		border-left: 3px solid @color-danger;
 		padding-left:10px;
 		font-size: 0.7rem;
 	}
 .card{
 	.card-header{
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
 	width:100%;
 	height:auto;
 	overflow: hidden;
 }
 }
 .share-footer{
	background-color: #5B5B59;
	overflow-y: hidden;
	padding: 0 15px;
	.open-btn{
		display: inline-block;
		background-color: @color-primary;
		color:#fff;
		.size(100px;34px);
		line-height: 34px;
		border:none;
	}
	.share-footer-logo{
		.flexbox();
		.align-items(center);
		.logo{
			.square(34px);
			background-size: 34px 34px;
			margin-right: 8px;
			.bg-view-image('ServiceDetail/myIcon');
		}
	}
	.share-footer-text{
		height: 30px;
		text-align: left;
		line-height: 16px;
		font-size: 0.65rem;
		color:#fff;
		.share-footer-slogan{
			font-size: 0.5rem;
		}
	}
 }
 .address-icon{
 	display: inline-block;
	vertical-align: middle;
 	.square(18px);
 	background-size: 18px 18px;
 	.bg-view-image('ServiceDetail/dizhi');
 }
 .address-btn{
 	width: 90%
 }
 .icon{
 	margin-left: 6px;
 	display: inline-block;
	vertical-align: middle;
 	.square(16px);
 	background-size: 16px 16px;
 	.bg-view-image('ServiceDetail/disclosure-arrow');
 }
 .swipe {
	 .img-responsive{
	 	position: absolute;
	 	top:50%;
	 	left:50%;
	 	transform: translate(-50%,-50%);
 	  object-fit: cover;
 		width:100%;
 		height:auto;
 	}
 }

</style>