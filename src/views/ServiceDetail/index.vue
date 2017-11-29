<template>
 <div class='serDetial'>
    <mt-header :path="serviceUrl" :share="$route.query.share && !$route.query.share" :bg="{'background':'rgba(0,0,0,0)','zIndex':200}" :icon="true"></mt-header>
		<div class='content serDetial-wraps' ref="scroll">
		<status :type="false" :serviceStatus="serviceInfo.authStatus" v-if="$route.query.showStatus > 1">
		</status>
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
			    		用户评价&nbsp;&nbsp;({{allCount}})
			    	</div>
			    	<div>全部<span class="icon"></span></div>
			  	</div>
			    <div class="card-content evaluate-wrap">
						<evaluate-list :footer="false" :evaluateList="[...evaluateList[0]]"></evaluate-list>
			    </div>
			  </div>
			  <div class="space" style="height: 30px"></div>
			</div>
		</div>
		<router-link class="reminder-text clearfix danger" to="/reminder/user/html" tag="div">
			<div class="pull-left text">温馨提示：为确保交易安全，请在平台内完成未付款</div>
			<strong class="pull-right">&gt;</strong>
		</router-link>
		<!-- v-if="$route.query.share" -->
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
			<div class="store-btn"  @click="_saveServiceCollection">
			<div v-if="collect" class="on"> <div class="icon-btn collected" ></div> 已收藏 </div>
			<div v-else ><div class="icon-btn collect"></div> 收藏 </div>
			</div>
			<div class="message-btn" @click="_goChat"><div class="icon-btn send"></div>发消息</div>
			<div class="order-btn" @click="_goOrder"> 立即下单 </div>
		</div>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import EvaluateList from 'components/EvaluateList/index'
import {Swipe, SwipeItem, Toast, Cell} from 'mint-ui'
import {mapMutations, mapGetters} from 'vuex'
import {getServiceDetails, saveServiceCollection, deleteServiceCollection} from 'api/service'
import {getEvaluateList, getEvaluateStatistics} from 'api/evaluate'
// import {share} from 'common/js/share'
// import {initSize} from 'common/js/browser'
import Certify from 'components/Certify/index'
import Status from 'components/Status/index'
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
			collect: false,
			submitting: false,
			serviceCollectionId: '',
			allCount: 0
		}
	},
	updated() {
		this.$refs.describe.innerHTML = this.text
	},
	activated() {
		this.setOrderUrl('')
		this.setFooter(false)
		this.$root.config = ''
		this._setUrl(serUrl)
		let serviceId = this.$route.query.serviceId
		this.collectParam.serviceId = this.$route.query.serviceId
		this.collectParam.collectionUserId = this.user.userId
		this._getServiceDetails(serviceId, this.user.userId)
		this._getEvaluateList(serviceId)
		this._getServiceTypeName()
		this._getEvaluateStatistics()
	},
	deactivated() {
		this.setFooter(true)
		this.collect = false
		this.serviceCollectionId = ''
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
			let ll = /\n+/g
			let t = this.serviceInfo.serviceDescribe.replace(ll, '<br/>')
			console.log(this.serviceInfo.serviceDescribe)
			console.log(t)
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
		MtCell: Cell,
		Status
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
			setServiceUrl: 'SERVICEURL',
			setLoading: 'LOADING',
			setOrderUrl: 'ORDERURL'
		}),
		_toLogin() {
			if (!this.user.userId) {
				this.$router.push('/login')
				return
			}
		},
		_toView(pictures, i) {
			let picList = pictures.map(item => {
				return {picName: item.picName}
			})
     let picture = {
      index: i,
      list: picList
     }
     this.setPictures(picture)
     this.$router.push('/view')
    },
		_goEvaluate() {
			this.$router.push({path: '/home/evaluate/service', query: {serviceId: this.$route.query.serviceId, footer: false}})
		},
		// 获取服务详情
		_getServiceDetails(serviceId, collectionUserId) {
			this.setLoading(true)
			getServiceDetails(serviceId, collectionUserId).then((data) => {
				this.serviceInfo = Object.assign({}, this.serviceInfo, data.serviceInfo)
				console.log(999, this.serviceInfo)
				this.setLoading(false)
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
						console.log(989, this.collect)
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
				this._processingData(data)
			})
		},
		// 获取评价数
		_getEvaluateStatistics() {
			getEvaluateStatistics(this.param).then(res => {
				this.allCount = res.statistics && res.statistics.allCount
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
			if (!this.user.userId) {
				this.$router.push('/login')
				return
			}
			if (this.serviceInfo.userId === this.user.userId) {
					Toast('不能购买自己的服务')
					return
				}
			let info = {
				serviceId: this.serviceInfo.serviceId,
				title: this.serviceInfo.title,
				singleAmount: this.serviceInfo.priceType === 2 ? this.serviceInfo.subscription : this.serviceInfo.priceNumber,
				priceType: this.serviceInfo.priceType
			}
			this.setServiceInfo(info)
			this.$router.push({path: '/service/order', query: {serviceId: this.serviceInfo.serviceId}})
		},
		_imageLoad() {
			if (!this.checkloaded) {
          this.checkloaded = true
      }
		},
		_getServiceTypeName() {
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
			if (!this.user.userId) {
				this.$router.push('/login')
				return
			}
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
				if (this.serviceInfo.userId === this.user.userId) {
					Toast('不能收藏自己的服务')
					return
				}
				saveServiceCollection(this.collectParam).then(data => {
					if (data.code === '000000') {
						Toast('收藏成功')
						this.collect = data.data.serviceCollectionId
					}
				})
			}
		},
		// 设置来源路由
		_setUrl(url) {
      console.log(99999, url)
      if (url.indexOf('/home/collect') > -1 || url.indexOf('/home/publish') > -1 || url.indexOf('/index') > -1 || url.indexOf('/serviceList') > -1 || url.indexOf('/index/search/list') > -1) {
        console.log(url)
        this.setServiceUrl(url)
      }
    },
    // 对话
     _goChat() {
				if (!this.user.userId) {
					this.$router.push('/login')
					return
				}
        if (this.serviceInfo.userId === this.user.userId) {
					Toast('不能给自己发送信息！')
					return
				}
        this.userInfo = {
            otherUserId: this.serviceInfo.userId,
            otherUserNick: this.serviceInfo.userInfo.userName,
            otherUserPic: this.serviceInfo.userInfo.photoUrl
        }
        this.$router.push({path: '/message/chat', query: {...this.userInfo}})
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
  .align-items(center);
  .size(100%;50px);
	text-align: center;
	line-height: 50px;
	background-color: #fff;
	color: @color-text-secondary;
	font-size: 0.7rem;
	padding: 0;
	.message-btn,.store-btn{
		width: 25%;
		height: 35px;
		text-align: center;
		line-height: 20px;
		font-size: 0.54rem;
		flex:1;
		.on{
			color:@color-primary
		}
	}
	.store-btn{
		border-right: 1px solid @color-split;
	}
	.order-btn{
		width: 50%;
		background-color: @color-primary;
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

.icon-btn{
	.square(16px);
	background-size: 16px 16px;
	.center-block();
	&.collect{
			.bg-view-image('ServiceDetail/save');
	}
	&.collected{
		.bg-view-image('ServiceDetail/saveSelected');
	}
	&.send{
		.bg-view-image('ServiceDetail/Send-mes');
	}
}
.reminder-text{
	position: absolute;
	.size(100%; 30px);
	padding: 0 10px;
	line-height: 30px;
	background-color: #fff8bf;
	bottom: 50px;
	z-index: 99;
	.text{
		width: 80%;
		.text-overflow();
	}
}
</style>