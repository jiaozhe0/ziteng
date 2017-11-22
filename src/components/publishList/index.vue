<template>
	  <ul class='servicelist'>
	  	<li class="clearfix service-list needsclick" v-for="(serviceItem,index) in serviceList" :key="index">
				<div class="card">
					<div class="card-content">
					<div class="service-info">
				   <!-- <div class="">{{serviceItem.title}}</div> -->
						<router-link :to="{path: '/servicedetail', query: {serviceId: serviceItem.serviceId, showStatus: serviceItem.authStatus}}" tag='div'>
							<!-- 服务图片	 -->
							<div class="img-wrap pull-left" v-lazy:background-image="serviceItem.servicePic[0].picName">
							</div>
							<!-- 服务详情 -->
							<div class="service-content">
								<div class="clearfix service-top">
									<h3 class="service-title pull-left">{{serviceItem.title}}</h3> 
									<div class='pull-left service-status' :class="{'service-status-on': serviceItem.authStatus == 3}" >
										{{serviceItem.authStatus == 1 ? '审核成功' : serviceItem.authStatus == 2 ? '审核失败':'审核中'}}
									</div class='pull-left'>
								</div>
								<p class="service-text">内容服务：{{serviceItem.serviceDescribe}}</p>
								<p class="service-price">
								{{serviceItem.priceType == 1 ? serviceItem.priceNumber + '元/次' : '预约金：'+serviceItem.subscription+'元'}}
								</p>
							</div>
						</router-link>
					</div>
					</div>
					 <div class="card-footer">
							<div>
									<router-link :to="{path:'/editservice',query:{serviceId:serviceItem.serviceId}}" tag='button' class='edit-btn'>编辑</router-link>
									<button class="edit-btn enable-btn" 
											@click="_updateServiceStatus(serviceItem)"
											v-show="serviceItem.authStatus==1">{{serviceItem.serviceStatus == 2? '恢复服务':'暂停服务'}}</button>
							</div>
							<div>
								<span v-if="serviceItem.authStatus > 1">服务未发布</span>
								<span v-else>{{serviceItem.serviceStatus == 1 ? '服务已发布' : '服务已暂停'}}</span>
							</div>
					 </div>
				</div>
			</li>
	  </ul>
</template>

<script  type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import Certify from '../Certify/index'
import {updateServiceStatus} from 'api/service'
export default {
	props: {
		serviceList: {
			type: Array
		},
		homeStyle: {
			type: Boolean,
      default: false
		}
	},
	components: {
		Certify
	},
	computed: {
		...mapGetters(['serviceTypeList'])
	},
  methods: {
		loadImage() {
      this.$emit('loadImage')
		},
		_goServiceList(data) {
			console.log('........')
			this.serviceTypeList.some((item, index) => {
					item.typeList.some((items, index) => {
						console.log(items.serviceTypeId + '===' + data.indexAdsenseId)
						if (items.serviceTypeId === data.indexAdsenseId) {
							this.setServiceTypeList(item.typeList)
							return true
						}
					})
      })
      // this.$router.push({path: '/serviceList',
      // query: {
      //   searchContent: data.appTitle,
      //   serviceParentTypeId: data.serviceTypeId,
      //   serviceTypeId: data.serviceTypeId
      // }})
		},
		_updateServiceStatus(serviceItem) {
			this.setLoading(true)
			console.log(serviceItem)
			console.log(serviceItem.serviceId + '===' + serviceItem.serviceStatus)
			let stauts = serviceItem.serviceStatus === 1 ? 2 : 1
			let param = {
				serviceId: serviceItem.serviceId,
				serviceStatus: stauts
			}
			updateServiceStatus(param).then(data => {
				console.log(9999, data)
				if (data.code === '000000') {
					this.setLoading(false)
					serviceItem.serviceStatus = stauts
				}
			})
		},
		...mapMutations({
		setTypeList: 'CHILDTYPELIST',
		setLoading: 'LOADING'
	})
	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.servicelist{
	position: relative;
	min-height:101%;
	margin:0px;
	z-index: 2
}
.service-info{
	padding: 5px 10px;
}
.img-wrap{
		.square(70px);
		overflow: hidden;
		border-radius: 8px;
		background-size: cover;
	}
.service-list{
	margin-bottom: 5px;
	background-color: #fff;
	overflow: hidden;
	height: 140px;
	.service-content{
		padding:5px 10px;
		margin-left: 80px;
		.service-top{
			height: 22px;
		}
		.service-title{
			display: inline-block;
			width:140px;
			.text-overflow();
			margin: 0 4px 2px 0;
			font-weight: 400;
			font-size: 0.7rem;
			font-weight: 400
	  }
	  .service-status{
	  	text-align: center;
	  	display: block;
	  	.size(44px;15px);
	  	line-height: 17px;
	  	font-size: 0.5rem;
	  	border-radius: 2px;
	  	background-color: #eee;
	  	&.service-status-on{
	  		background-color: #359FFF;
	  		color:#fff;
	  	}
	  }
	.service-text,.service-price,.service-detail{
		margin:1px 0 ;
	}
	.service-price{
		color:@color-danger;
		font-size:0.7rem;
	}
	.service-text{
		width: 100%;
		.text-overflow();
		font-size:0.6rem;
		color:@color-text-secondary;
	}
	.service-detail{
		position: relative;
		padding-bottom: 5px;
		margin-bottom: 5px;
		color:@color-text-gray;
		font-size:0.6rem;
		/*.hairline(bottom, @border-default-color);*/
	}
	.server-info{
		.flexbox();
	  .flex-wrap(nowrap);
	  .justify-content(space-between);
	  .align-items(center);
	  font-size: 0.6rem;
	  .server-user-photo{
	  	display: inline-block;
	  	.square(20px);
	  	img{
	  		display: block;
	  		.size(100%;100%);
	  	}
	  }
	  .user-name{
	  	flex: 1
	  }
	}
}
.on{
		padding-top: 10px;
		.img-wrap{
			.square(60px)!important;
		}
		.service-content{
			margin-left: 60px;
		}
			.service-title{
				margin:0;
				font-weight: 400;
				font-size: 0.75rem;
		}
		.service-text,.service-price,.service-detail{
			font-size: 0.6rem;
			margin:0;
		}
		.service-price{
			font-size: 0.78rem;
		}
	}
}
.card-footer{
	.edit-btn{
		display: inline-block;
		.size(78px;24px);
		line-height: 24px;
		padding: 0;
		border-radius: 2px;
		background-color: transparent;
		font-size: 0.6rem;
		color:@color-danger;
		border:1px solid @color-danger;
		&.enable-btn{
			margin-left: 8px;
			border:1px solid @color-text-gray;
			color:@color-text-gray;
		}
	}
}

</style>
