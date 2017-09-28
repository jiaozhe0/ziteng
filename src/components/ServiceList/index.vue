<template>
	  <ul class='servicelist'>
	  	<!-- <item v-for="(item,index) in serviceList" :serviceItem="item" :key="index"></item> -->
	  	<li class="clearfix service-list needsclick" v-for="(serviceItem,index) in serviceList" :key="index">
		<div class="class-adsense" 
		     v-if="serviceItem.appPosition" 
		     @click="_goServiceList(serviceItem)">
				<img @load="loadImage" :src="serviceItem.picUrl" alt="" class="img-responsive">
		</div>
		<div class="service-info" :class="{'on':homeStyle}"  v-else >
			<!-- <div class="">{{serviceItem.title}}</div> -->
			<router-link :to="{path: 'servicedetail', query: {serviceId: serviceItem.serviceId}}" tag='div'>
			<div class="img-wrap pull-left" >
				<img :src="serviceItem.servicePic[0].picName" alt="" 
				class="img-responsive">
			</div>
			<div class=" service-content">
				<h3 class="service-title">{{serviceItem.title}}</h3>
				<p class="service-text">内容服务：{{serviceItem.serviceDescribe}}</p>
				<p class="service-price">0.3元/位</p>
				<p class="service-detail" v-if="serviceItem.userInfo">
					销量&nbsp;:&nbsp;{{serviceItem.salesNumber}} &nbsp评价&nbsp;:&nbsp;
				</p>
				<div class="server-info" v-if="serviceItem.userInfo">
					<div>
						<div class='avatar-img server-user-photo'>
							<img  :src="serviceItem.userInfo.photoUrl" alt="" class="">
						</div>
					</div>
					<div class='text-left user-name'>{{serviceItem.userInfo.userName}}</div>						
					<div class='' >
						ll
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
		}
	},
	...mapMutations({
		setTypeList: 'CHILDTYPELIST'
	})
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.servicelist{
	position: relative;
	margin:0px;
	z-index: 2
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
		padding: 0 10px 0;
		margin-left: 120px;
		.service-title{
		margin: 0 0 2px 0;
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
		.hairline(bottom, @border-default-color);
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
