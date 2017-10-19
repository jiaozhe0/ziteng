<template>
			<div class="upload-btn-wrap">
				<div class="text-center">
					<div class="upload-btn-items">
					<div class="upload-btn-camera upload-btn-item">
					</div>
					<input type="file" capture="camera" accept="image,video" name="" value="">
					</div>
					<p>拍照</p>
				</div>
				<div class="text-center">
					<div class="upload-btn-items">
					<div class="upload-btn-picture upload-btn-item">
					</div>
					<input type="file" accept="image/*" :multiple="multiple" @change="uploadPicture">
					</div>
					<p>相册</p>
				</div>
			</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Popup} from 'mint-ui'
export default {
	props: {
		multiple: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	components: {
		MtHeader,
		MtCell: Cell,
		MtPopup: Popup
	},
	methods: {
		uploadPicture(e) {
			if (this.multiple) {
				this.$emit('uploadPicture', e.target.files)
			} else {
				this.$emit('uploadPicture', e.target.files[0])
			}
		}
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
	.upload-btn-wrap{
		position: absolute;
		bottom: 0;
		.flexbox();
		.align-items(center);
		.justify-content(space-around);
		.size(100%;240px);
		background:#fff;
		.upload-btn-items{
				position: relative;
				display: table-cell;
				vertical-align: middle;
				.square(70px);
				background-color: #eee;
				border:1px solid @color-split;
				input{
					position: absolute;
					.size(100%;100%);
					top:0;left:0;
					opacity: 0;
				}
				.upload-btn-item{
					.square(40px);
					.center-block();
					background-size:40px 40px;
					&.upload-btn-picture{
						.bg-image('uploadPicture/picture')
					}
					&.upload-btn-camera{
						.bg-image('uploadPicture/camera')
					}
				}
		}
		p{
			font-size:0.7rem;
		}
	}
</style>