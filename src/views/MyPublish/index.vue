<template>
  <div class='publish'>
  	<mt-header title="我的发布"></mt-header>
    <div class="content" >
    	<div class="no-publish" v-if="!publishList.length">
    		<div class="img-wrap">
    			<img src="" alt="" class="img-responsive">
    		</div>
    		<strong>没有发布服务</strong>
    		<p>您还没发过服务，现在发布一个吧！</p>
    		<router-link to='/editservice' class='ser-btn center-block'>
    			发布我的第一个服务
    		</router-link>	
    	</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
export default {
	data() {
		return {
			publishList: []
		}
	},
	components: {
			MtHeader
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.content{
	bottom:0;
}
.no-publish{
	margin-top: 40px;
	text-align: center;
	strong{
		font-size: 1.1rem;
		font-weight: 400;
		color: @color-primary
	}
	&>p{
		margin: 2px auto 30px;

		font-size: 0.7rem;
	}
	.ser-btn{
		.size(200px;40px);
		line-height: 40px;
		color: #fff;
		border-radius: 6px;
		background-color: @color-primary;
		font-size: 0.8rem;
	}
}
</style>