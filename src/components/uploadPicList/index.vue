<template>
<div class='onload-wrap-pic row'>
		    		<div class="pull-left upload-item col-25" v-for="(item,index) in pictures">
		    			<div class="close-icon" @click="_deletePic(index)">×</div>
		    			<img :src="item.picName" alt="" class="img-responsive">
		    			<!--  -->
		    			<div class="process" v-show="process[item.name]< 100">{{process[item.name]}}%</div>
		    		</div>
		    		 <div class='upload-btn upload-item col-25' v-if="pictures.length <= 5">
		    		 	<input type="file" accept="image/*"  @change="_uploadPicture">
		    		 	<div class="upload-btn-content text-center">
		    		     <div class="upload-btn-icon"></div>
		    		     添加图片
		    		    </div>
		    		 </div>
		    		 <div style="color:#fff">{{test}}</div>
</div>
</template>

<script type="text/ecmascript-6">
import UploadBtn from 'components/uploadBtn/index'
export default {
	props: {
		pictures: {
			type: Array
		},
		test: {
			type: [String, Number, Object, Array]
		},
		process: {
			type: [String, Number, Object, Array]
		},
		multiple: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		processList() {
			let processList = []
			return processList.push(this.process)
		}
	},
	data() {
		return {
			picList: this.pictures,
			list: [1, 2, 4]
		}
	},
	components: {
		UploadBtn
	},
	methods: {
		_deletePic(index) {
			this.$emit('deletePic', index)
		},
		_openUploadBtn() {
			this.$emit('open')
		},
		_uploadPicture(e) {
			console.log(e.target.files)
			if (this.multiple) {
				this.$emit('uploadPicture', e.target.files)
			} else {
				this.$emit('uploadPicture', e.target.files)
			}
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .onload-wrap-pic{
 	background-color: #fff;
 	.upload-item{
		position: relative;
		height: 70px;
		background: #eee;
		margin-bottom:8px;
		font-size: 0.6rem;
		/*margin-left: 0;*/
		.upload-btn-icon{
			margin: 10px auto 4px;
			.square(26px);
			background-size: 26px 26px;
			.bg-image('uploadBtn/tianjia')
		}
		.close-icon{
			position: absolute;
			right: 0;
			.square(20px);
			text-align: center;
			line-height: 20px;
			color: #fff;
			background-color: rgba(0,0,0,.4);
		}
		.process{
			position: absolute;
			.size(100%;100%);
			top:0;
			left:0;
			text-align: center;
			line-height: 80px;
			font-size: 0.54rem;
			background-color: rgba(255,255,255,.6);
			z-index: 999
		}
	}
	.upload-btn{
		position: relative;
		overflow: hidden;
		input {
			position: absolute;
			display: block;
			.size(100%;100%);
			top:0;left:0;
			z-index: 990;
			opacity:0
		}
	}
}
</style>