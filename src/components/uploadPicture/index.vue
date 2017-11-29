<template>
			<div class="upload-btn-wrap " :class="{'chatStyle': chat}">
				<!-- <div class="text-center upload-btn">
					<div class="upload-btn-items">
							 <!-- 微信 -->
							<!-- <div class="upload-btn-camera upload-btn-item" @click="_photograph">
							</div> -->
							<!-- 原生 
							<div class="upload-btn-camera upload-btn-item">
						 </div>
							<input type="file" capture="camera" accept="image,video" name="" value="">
							</div>
							<p :class="{'chatStyleText': chat}">拍照</p>
				</div> -->
				<!-- @click="_picture" -->
				<div class="text-center upload-btn">
					<div class="upload-btn-items"  >
						<div class="upload-btn-picture upload-btn-item">
						</div>
						<input type="file" accept="image/*" :multiple="multiple" @change="uploadPicture">
					</div>
					<p :class="{'chatStyleText': chat}">相册</p>
				</div>
				<!-- <div class="text-center upload-btn" v-if="chat" >
					<div class="upload-btn-items"  @click="_goServiceMap">
						<div class="upload-btn-picture upload-btn-item">
						</div>
					</div>
					<p :class="{'chatStyleText': chat}">地图</p>
				</div> -->
			</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Popup} from 'mint-ui'
const wx = require('weixin-js-sdk')
export default {
	props: {
		multiple: {
			type: Boolean,
			default: false
		},
		chat: {
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
		_photograph() {
			wx.chooseImage({
				count: 1,
				sourceType: ['camera'],
				success: function (res) {
					alert(res.localIds[0])
				}
			})
		},
		_picture() {
			let vm = this
			wx.chooseImage({
				count: 1,
				sourceType: ['album'],
				success: function (res) {
					vm.$emit('uploadPicture', res.localIds)
				}
			})
		},
		uploadPicture(e) {
			if (this.multiple) {
				this.$emit('uploadPicture', e.target.files)
			} else {
				this.$emit('uploadPicture', e.target.files[0])
			}
		},
		_goServiceMap() {
			// this.$router.push({path: '/servicemap',
   //      query: {lng: this.orderInfo.address.longitude,
   //        lat: this.orderInfo.address.latitude,
   //         name: this.orderInfo.address.area}})
			this.$emit('goServiceMap')
		}
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
	.upload-btn-wrap{
		position:absoltue;
		bottom: 0;
		left:0;
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
		&.chatStyle{
				position: static;
				background-color: #fff;
			 .size(100%;100px);
			.justify-content(flex-start);
			div.upload-btn{
				height: 60px;
				margin: 0 20px;
				&+div {
					margin-left: 0
				}
				margin:0 20px;
				.upload-btn-items{
					.square(50px);
					.upload-btn-item{
						.square(30px);
						.center-block();
						background-size:30px 30px;
					}
				}
			 }
		 }
		 p{
		 	font-size: 0.6rem;
		 	color: @color-text-gray;
		 	&.chatStyleText{
		 			margin-top: -10px;
		 	}
		 }
	}
</style>