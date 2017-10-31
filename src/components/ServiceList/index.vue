<template>
	  <ul class='servicelist'>
	  	<!-- <item v-for="(item,index) in serviceList" :serviceItem="item" :key="index"></item> -->
	  	<li class="clearfix service-list needsclick " v-for="(serviceItem,index) in serviceList" :key="index">
		<div class="class-adsense" 
		     v-if="serviceItem.appPosition" 
		     @click="_goServiceList(serviceItem)">
				<img @load="loadImage" :src="serviceItem.picUrl" alt="" class="img-responsive">
		</div>
		<div class="service-info" :class="{'on':homeStyle}"  v-else >
			<!-- <div class="">{{serviceItem.title}}</div> -->
			<router-link :to="{path: '/servicedetail', query: {serviceId: serviceItem.serviceId,share:$route.query.share && $route.query.share,serviceTypeId:serviceItem.serviceType.serviceTypeId}}" >
			<div class="img-wrap pull-left" >
				<img :src="serviceItem.servicePic[0].picName" alt="" 
				class="img-responsive">
			</div>
			<div class=" service-content">
				<h3 class="service-title">{{serviceItem.title}}</h3>
				<p class="service-text">内容服务：{{serviceItem.serviceDescribe}}</p>
				<p class="service-price">
					{{serviceItem.priceType == 2 ? '预约金'+serviceItem.subscription + '元': serviceItem.priceNumber +'元/次'}}
				</p>
				<p class="service-detail" v-if="serviceItem.userInfo">
					销量:&nbsp;{{serviceItem.salesNumber}}单 &nbsp;<span v-if="serviceItem.evaluateNumber > 0">好评度:&nbsp;{{serviceItem.evaluateNumber | score
}}</span> <span v-else>暂无评价</span>
				</p>
				<div class="server-info" v-if="serviceItem.userInfo">
					<div>
						<div class='avatar-img server-user-photo'>
							<img  :src="serviceItem.userInfo.photoUrl" alt="" class="">
						</div>
					</div>
					<div class='text-left user-name'>{{serviceItem.userInfo.userName}}</div>						
					<div class='' >
			    				<certify :size="12" :isText="false"
			    				 :name="serviceItem.userAuthStatus.authUserIdStatus"
									 :skill="serviceItem.userAuthStatus.authProfessionalStatus"
									 :bussiness="serviceItem.userAuthStatus.authBusinessStatus"
									 :zhima="serviceItem.userAuthStatus.authZhimaxinyongStatus"
			    				 ></certify>
			    </div>
				</div>
			</div>
			</router-link>
			</div>
	</li>
	  </ul>
</template>

<script  type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'
import Certify from '../Certify/index'
export default {
	props: {
		serviceList: {
			type: Array
		},
		homeStyle: {
			type: Boolean,
      default: false
		},
		share: {
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
			this.serviceTypeList.some((item, index) => {
				if (item.parentId === data.typeId.serviceParentTypeId) {
					console.log(item.parentId + '===' + data.typeId.serviceParentTypeId)
					this.setTypeList(item.typeList)
					return true
				}
      })
      this.$router.push({path: '/serviceList',
      query: {
        searchContent: data.appTitle,
        serviceParentTypeId: data.typeId.serviceParentTypeId,
        serviceTypeId: data.typeId.serviceTypeId
      }})
		},
		...mapMutations({
			setTypeList: 'CHILDTYPELIST'
		})
	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.servicelist{
	position: relative;
	margin:0px;
	z-index: 2;
	min-height: 101%
}
.service-info{
	padding: 5px 10px;
}
.img-wrap{
		.square(120px);
		overflow: hidden;
		border-radius: 8px;
	}
.service-list{
	margin-bottom: 5px;
	background-color: #fff;
	overflow: hidden;
	.service-content{
		padding: 0 8px 0;
		margin-left: 120px;
		.service-title{
		margin: 0 0 1px 0;
		font-weight: 400;
		font-size: 0.78rem;
		font-weight: 400
	}
	.service-text,.service-price,.service-detail{
		margin:1px 0 ;
	}
	.service-price{
		color:@color-danger;
		font-size:0.85rem;
	}
	.service-text{
		.text-overflow();
		font-size:0.7rem;
		color:@color-text-secondary;
	}
	.service-detail{
		position: relative;
		padding-bottom: 5px;
		margin-bottom: 5px;
		color:@color-text-gray;
		font-size:0.6rem;
		.hairline(bottom, @color-split);
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

</style>
