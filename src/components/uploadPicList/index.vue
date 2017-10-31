<template>
<label for="" class='onload-wrap-pic clearfix'>
		    		<div class="pull-left upload-item" v-for="(item,index) in pictures">
		    			<div class="close-icon" @click="_deletePic(index)">×</div>
		    			<img :src="item" alt="" class="img-responsive">
		    		</div>
		    		 <upload-btn class="pull-left" :square="80"
		    		 				margin="0"
		    		 				@click.native="_openUploadBtn" >
		    		 		添加图片
		    		 </upload-btn>
</label>
</template>

<script type="text/ecmascript-6">
import UploadBtn from 'components/uploadBtn/index'
export default {
	props: {
		pictures: {
			type: Array
		}
	},
	data() {
		return {
			picList: this.pictures
		}
	},
	components: {
		UploadBtn
	},
	methods: {
		_deletePic(index) {
		},
		_openUploadBtn() {
			this.$emit('open')
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .onload-wrap-pic{
	 padding:10px;
 	.upload-item{
		position: relative;
		.square(80px);
		margin-right: 8px;
		background: #eee;
		.close-icon{
			position: absolute;
			right: 0;
			.square(20px);
			text-align: center;
			line-height: 20px;
			color: #fff;
			background-color: rgba(0,0,0,.4);
		}
	}
}
</style>