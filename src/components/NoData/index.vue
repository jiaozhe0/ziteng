<template>
<scroll class="noData" @scroll="getData" :listenScroll="true">
	<div class="noData-wrap">
		<div class="loading text-center">sdfsf</div>
	  <div class="noData-content">
	  	<div class="noData-pic"></div>
	    <p class='noData-title'>暂无数据</p>
			<p class='noData-info'>SORRY,没有找到您要的服务</p>
  	</div>
  </div>
</scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '../Scroll'
export default {
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
 .noData{
 	position: absolute;
 	.size(100%;90%);
 	background-color: #F5F5F5
 	/*border:1px solid red;*/
 }
 .noData-wrap{
 	height: 101%;
 	position: relative;
 }
.noData-content{
	position: absolute;
	top:50%;
	left:50%;
	transform: translate(-50%;-60%);
	text-align: center;
/*	border:1px solid green;
*/	.noData-pic{
		.size(375px;180px);
		background-size:375px 180px;
		background-repeat: no-repeat;
		vertical-align: top;
		/*.bg-image("noData")*/
	}
	p{
		margin: 0;
	}
	.noData-title{
		color: @color-primary;
		margin-bottom: 5px;
	}
	.noData-info{
		font-size: 0.6rem;
		color: @color-text-gray
	}
}

</style>