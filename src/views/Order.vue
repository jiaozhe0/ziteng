<template>
  <div>
  	<div class="bar row order-nav text-center">
  		<router-link to="/order/buy" tag='div' class="col-50 text-right"active-class="order-nav-active">购买订单</router-link>
  		<router-link to="/sale" tag='div' class="col-50 text-left" active-class="order-nav-active">出售订单</router-link>
  	</div>
  	<div class="content">
  		<router-view></router-view>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.order-nav{
	background:@color-primary;
	font-size:0.65rem;
	line-height:44px;
	color:rgba(255,255,255,0.4);
	.order-nav-active{
		color:#fff;
    font-size:0.7rem;
	}
}
</style>