<template>
<div class="loading" v-show="loading">
		<div class="loading-wrap text-center">
    	<div class="loading-icon"></div>
    		<span class="text">玩命加载中...</span>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
	computed: {
		...mapGetters(['loading'])
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .loading{
 	position: absolute;
 	background-color: rgba(0,0,0,.4);
 	.size(100%;100%);
 	z-index: 999;
 	top:0;left:0;
 	.loading-wrap{
 		position: absolute;
 		padding: 10px 36px;
 		background:rgba(0,0,0,.4);
 		border-radius: 8px;
 		top:50%;left:50%;
 		transform: translate(-50%,-50%);
 		.text{
 			font-size:0.7rem;
 			color:#fff;
 		}
 	}
 	.loading-icon{
 		margin:4px auto;
 		.size(35px;45px);
 		background-size: 35px 45px;
 		.bg-image('Loading/loading0');
		animation: loading 0.8s infinite; 
 	}
 }
@keyframes loading {
		0{.bg-image('Loading/loading0')}
		50%{.bg-image('Loading/loading1')}
		100%{.bg-image('Loading/loading2')}
	} 
</style>