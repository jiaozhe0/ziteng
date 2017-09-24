<template>
	<div class="servicelist">
	  <ul>
	  	<!-- <item v-for="(item,index) in serviceList" :serviceItem="item" :key="index"></item> -->
	  	<li class="clearfix service-list" v-for="(serviceItem,index) in serviceList" :key="index">
		<div class="class-adsense" v-if="serviceItem.appPosition">
			<router-link to='/login'>
				<img @load="loadImage" :src="serviceItem.picUrl" alt="" class="img-responsive">
			</router-link>
		</div>
		<div class="service-info" v-else>
			<router-link to='/city' tag='div'>
			<div class="img-wrap pull-left">
				<img :src="serviceItem.servicePic[0].picName" alt="" 
				class="img-responsive">
			</div>
			<div class=" service-content">
				<h3 class="service-title">{{serviceItem.title}}</h3>
				<p class="service-text">内容服务：{{serviceItem.serviceDescribe}}</p>
				<p class="service-price">0.3元/位</p>
				<p class="service-detail">
					销量&nbsp;:&nbsp;{{serviceItem.salesNumber}} &nbsp评价&nbsp;:&nbsp;
				</p>
				<div class="server-info">
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
  </div>
</template>

<script  type="text/ecmascript-6">
import Item from './item'
export default {
	props: ['serviceList'],
  components: {
   Item
  },
  methods: {
		loadImage() {
      this.$emit('loadImage')
		}
	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.servicelist>ul{
	margin-top: 10px;
}
.service-info{
	padding: 5px 10px;
}
.img-wrap{
		.square(130px);
		overflow: hidden;
		border-radius: 8px;
	}
.service-list{
	margin-bottom: 5px;
	background-color: #fff;
	overflow: hidden;
	.service-content{
		padding: 5px 10px 0;
		margin-left: 140px;
		.service-title{
		margin: 0 0 4px 0;
		font-weight: 400;
		font-size: 0.78rem;
		font-weight: 400
	}
	.service-text,.service-price,.service-detail{
		margin:3px 0 ;
	}
	.service-price{
		color:@color-danger;
		font-size:0.9rem;
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
		/*position: relative;*/
		/*.size(100%;20px);*/
		.flexbox();
	  .flex-wrap(nowrap);
	  .justify-content(space-between);
	  .align-items(center);
	  /*.hairline(top, @border-default-color);*/
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
	
}

</style>
