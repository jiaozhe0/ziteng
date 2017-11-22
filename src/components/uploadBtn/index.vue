<template>
<div class='upload-btn' 
			:style="{'width':square +'px','height':square +'px','margin':margin}">
	<div class="upload-btn-content text-center" v-show="!url">
    <div class="upload-btn-icon"></div>
    <slot></slot>
   </div>
   <img :src="url" alt="" v-show="url" class="img-responsive">
</div>
</template>

<script type="text/ecmascript-6">
 export default {
 	props: {
 		url: {
			type: String,
			default: ''
 		},
 		square: {
 			type: Number
 		},
 		margin: {
 			type: String
 		}
 	}
 }
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.upload-btn{
		position:relative;
		.size(120px;120px);
		margin:0 auto;
		background-color: #eee;
		font-size: 0.6rem;
		color: @color-text-gray;
		border:1px solid @color-split;
		.upload-btn-content{
			position: absolute;
			.size(100%;80px);
			left:50%;
			top: 50%;
			transform: translate(-50%,-50%);
			font-size: 0.5rem;
		}
		.upload-btn-icon{
			margin: 20px auto 4px;
			.square(26px);
			background-size: 26px 26px;
			.bg-image('uploadPicList/tianjia')
		}
		&>input{
			display: block;
			position: absolute;
			.size(100%;100%);
			opacity: 0
		}
	}
</style>