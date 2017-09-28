<template>
 <div class='serDetial'>
    <mt-header :bg="{'background':'rgba(0,0,0,.4)','zIndex':200}" :title="serviceInfo.title"></mt-header>
		<scroll class='content' ref="scroll">
			<div class="serDetial-content">
				<mt-swipe :auto="4000">
				  <mt-swipe-item v-for="(item,index) in serviceInfo.servicePic">
				  	<img :key="index" @load="_imageLoad" :src="item.picName" alt="" class="img-responsive">
				  </mt-swipe-item>
				</mt-swipe>
				<div class="serDetial-top clearfix">
					<div class="pull-left">
						<div class="serDetial-service-title">{{serviceInfo.title}}</div>
						<div class="serDetial-estimate"> 
						<span>好评度：
						<strong>{{serviceInfo.evaluateNumber}}</strong></span>
						<span>销量: 
						<strong>{{serviceInfo.salesNumber}}</strong>
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
			    				<div v-show="serviceInfo.userAuthStatus.authZhimaxinyongStatus">
			    					<img src="" alt="" class="img-responsive">芝麻信用
			    				</div>
			    				<div v-show="serviceInfo.userAuthStatus.authUserIdStatus">
			    					<img src="" alt="" class="img-responsive">已实名认证
			    				</div>
			    				<div v-show=''>
			    					<img src="" alt="" class="img-responsive">
			    				</div>
			    				<div v-show=''>
			    					<img src="" alt="" class="img-responsive">
			    				</div>
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
		</scroll>
		<div class="bar bar-footer serDetial-footer">
			<div class="store-btn">收藏</div>
			<div class="message-btn">发消息</div>
			<div class="order-btn">立即下单</div>
		</div>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {Swipe, SwipeItem} from 'mint-ui'
import {mapMutations} from 'vuex'
import {getServiceDetails} from 'api/service'
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
			}
		}
	},
	created() {
		this.setFooter(false)
	},
	activated() {
		this._getServiceDetails(this.$route.query.serviceId)
	},
	deactivated() {
		console.log('.........')
		this.setFooter(true)
	},
	beforeDestroy() {
		this.setFooter(true)
	},
	destroyed() {
		this.setFooter(true)
	},
	components: {
		MtHeader,
		Scroll,
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		}),
		_getServiceDetails(serviceId, collectionUserId) {
			getServiceDetails(serviceId, collectionUserId).then((data) => {
				console.log(data)
				this.serviceInfo = Object.assign({}, this.serviceInfo, data.serviceInfo)
			})
		},
		_goHomePage(userId) {
			this.$router.push({path: '/homepage', query: {userId: userId}})
		},
		_imageLoad() {
			if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
      }
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	top:0;
 	background:#eee
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
 		border-left:3px solid red;
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
</style>