<template>
	<li class="clearfix service-list">
		<div class="img-wrap pull-left">
			<img src="" alt="">
		</div>
		<div class="pull-left service-content">
			<h3 class="service-title"></h3>
			<p class="service-text">内容服务：sdfsdfsdfsdfsdfsdf</p>
			<p class="service-price">0.3元/位</p>
			<p class="service-detail">
				销量 评价
			</p>
			<div class="server-info">
				<div class='avatar-img'>
					dd
				</div>
				<div class=''>
					ll
				</div>
			</div>
		</div>
	</li>
</template>

<script  type="text/ecmascript-6">

export default {
	props: ['serviceItem']
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.service-list{
	margin-bottom: 5px;
	background-color: #fff;
	.service-content{
		padding: 5px 10px 0;
		.service-title{
		margin: 5px 0;
		font-weight: 400
	}
	.service-text,.service-price,.service-detail{
		margin:5px 0 ;
	}
	.service-price{
		color:@color-danger;
		font-size:1rem;
		
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
	}
}
	
}

</style>
