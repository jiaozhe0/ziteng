<template>
	<li class="clearfix service-list">
		<div class="class-adsense" v-if="serviceItem.appPosition">
			<router-link to='/login'>
				<img @load="loadImage" :src="serviceItem.picUrl" alt="" class="img-responsive">
			</router-link>
		</div>
		<div class="service-info" v-else>
			<router-link to='/city'>
			<div class="img-wrap pull-left">
				<img :src="serviceItem.servicePic[0].picName" alt="" 
				class="img-responsive">
			</div>
			<div class=" service-content">
				<h3 class="service-title">{{serviceItem.title}}</h3>
				<p class="service-text">内容服务：{{serviceItem.serviceDescribe}}</p>
				<p class="service-price">0.3元/位</p>
				<p class="service-detail">
					销量{{serviceItem.salesNumber}} 评价
				</p>
				<div class="server-info">
					<div>
						<div class='avatar-img server-user-photo'>
							<img @load="loadImage" :src="serviceItem.userInfo.photoUrl" alt="" class="">
						</div>
					</div>
					<span>{{serviceItem.userInfo.userName}}</span>						
					<div class='' >
						ll
					</div>
				</div>
			</div>
			</router-link>
			</div>
	</li>
</template>

<script  type="text/ecmascript-6">
export default {
	props: ['serviceItem'],
	methods: {
		loadImage() {
			if (!this.checkloaded) {
				this.checkloaded = true
				this.$root.eventHub.$emit('loadImage')
			}
		}
	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
	.img-wrap{
		.square(120px);
		overflow: hidden;
		border:4px solid red;
	}
.service-list{
	margin-bottom: 5px;
	background-color: #fff;
	overflow: hidden;
	.service-content{
		padding: 5px 10px 0;
		margin-left: 140px;
		.service-title{
		margin: 5px 0;
		font-weight: 400;
		font-size: 0.9rem
	}
	.service-text,.service-price,.service-detail{
		margin:5px 0 ;
	}
	.service-price{
		color:@color-danger;
		font-size:1rem;
		
	}
	.service-text{
		.text-overflow();
		font-size:0.7rem;
	}
	.service-detail{
		color:@color-text-gray;
		font-size:0.6rem;
	}
	.server-info{
		position: relative;
		.size(100%;40px);
		.flexbox();
	  .flex-wrap(nowrap);
	  .justify-content(space-between);
	  .align-items(center);
	  .hairline(top, @border-default-color);
	  font-size: 0.7rem;
	  .server-user-photo{
	  	display: inline-block;
	  	.square(25px);
	  	img{
	  		display: block;
	  		.size(100%;100%);
	  	}
	  }
	}
}
	
}

</style>
