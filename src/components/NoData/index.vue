<template>
	<div class="noData-wrap">
	  <div class="noData-content">
	  	<div class="noData-pic"></div>
	    <p class='noData-title'>暂无数据</p>
			<p class='noData-info' v-if="typeStyle">SORRY,没有找到您要的服务</p>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from '../Scroll'
export default {
	props: {
		typeStyle: {
			type: Boolean,
			default: true
		}
	},
	components: {
		Scroll
	},
	methods: {
		getData(y) {
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .noData-wrap{
 	position: absolute;
 	.size(100%;100.2%);
	z-index: 10;
	background: #fff;
 }
.noData-content{
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%;-60%);
	text-align: center;
	.noData-pic{
		.size(300px;140px);
		background-size:300px 140px;
		background-repeat: no-repeat;
		vertical-align: top;
		.bg-image("NoData/noData")
	}
	p{
		margin: 0;
	}
	.noData-title{
		margin: 5px auto;
		font-size:0.8rem;
		color: @color-primary;
	}
	.noData-info{
		font-size: 0.6rem;
		color: @color-text-gray
	}
}

</style>