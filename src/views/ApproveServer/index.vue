<template>
  <div class="appServer">
  	<mt-header title="商家用户认证"></mt-header>
  	<div class="content">
  		<div class="appServer-header text-center">
  			<ul class="appServer-path">
  				<li class="appServer-path-item " :class="{'on':pathFirst}">
  					<div class="center-block path-icon on" ></div>
  					填写工商信息
  				</li>
  				<li class="appServer-path-item "  :class="{'on':pathSecond}">
  					<div class="center-block path-icon" :class="{'on':pathFirst}"></div>
  					上传工商执照
  				</li>
  				<li class="appServer-path-item" :class="{'on':pathSecond}">
  					<div class="center-block path-icon" :class="{'on':pathSecond}"></div>
  					上传店铺照片
  				</li>
  			</ul>
  		</div>
  		<div class="appServer-content">
  			<div class="first" v-show="path == 'first'">
  			  <p class="first-text">请正确填写工商信息</p>
  			   <mt-field  v-model='businessName' label="名称" placeholder="输入工商注册名称"  :attr="{autofocus:true}"></mt-field>
  			   <mt-field v-model='businessCode' name='gscode' v-validate="'required'" label="工商号码" placeholder="输入工商号码" type="number" ></mt-field>
  			  <button @click="_nextSecond" class='center-block next-btn ziteng-btn'>下一步</button>
  			</div>
  			<div class="second" v-show="path == 'second'">
  			  <p class="first-text text-center">照片仅用于用户认证，我们将保证信息安全</p>
  			  <label for="businessPhoto" class="center-block text-center bus-photo">
  			  	<img src="" alt="" class='img-responsive' ref='busPhoto'>
  			   <!-- <div class="bus-photo-wrap">
  			   	<div class="img-wrap">
  			   		<img src="" alt="" ref='busPhoto'>
  			   	</div>
  			  	 上传工商执照照片
  			   </div> -->
  			  	<input @change="_setbusinessFile" type="file" id='businessPhoto' class="file">
  			  </label>
  			  <button @click="_nextThird" class='center-block next-btn ziteng-btn'>下一步</button>
  			</div>
  			<div class="third" v-show="path == 'third'">
  			  <p class="first-text text-center">照片仅用于用户认证</p>
  			  <label for="businessPhoto" class="center-block text-center bus-photo">
  			  	<img src="" alt="" class='img-responsive' ref='busAddPhoto'>
  			   <!-- <div class="bus-photo-wrap">
  			   	<div class="img-wrap">
  			   		<img src="" alt="" ref='busPhoto'>
  			   	</div>
  			  	 上传工商执照照片
  			   </div> -->
  			  	<input @change="_setBusinessAddFile" type="file" id='businessPhoto' class="file">
  			  </label>
  			  <button @click="_submit" class='center-block next-btn ziteng-btn'>提交认证</button>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import { Field, Toast } from 'mint-ui'
import {saveUserAuthBusiness} from 'api/home'
export default {
	data() {
		return {
			pathFirst: false,
			pathSecond: false,
			path: 'first',
			businessCode: '',
      businessName: '',
      businessFile: '',
      businessAddressFile: ''
		}
	},
	components: {
		MtHeader,
		mtField: Field
	},
	created() {
		this.fileData = new FormData()
	},
	methods: {
		_nextSecond() {
      if (this.businessName === '') {
        Toast('名称不能为空！')
        return
      } else if (this.businessCode === '') {
        Toast('工商号码不能为空！')
        return
      }
      this.path = 'second'
			this.pathFirst = true
			this.fileData.append('businessName', this.businessName)
			this.fileData.append('businessCode', this.businessCode)
    },
    _setbusinessFile(e) { // 上传商户营业执照
			let file = e.target.files[0]
			this._readFile(file).then((data) => {
				this.$refs.busPhoto.src = data
				this.fileData.append('businessFile', file)
				this.businessFile = data
			})
    },
    _nextThird() {
			console.log('....')
			if (this.businessFile === '') {
        Toast('工商执照不能为空！')
        return
      }
      this.path = 'third'
      this.pathSecond = true
    },
    _setBusinessAddFile(e) { // 上传商户地址图片
			let file = e.target.files[0]
			this._readFile(e.target.files[0]).then((data) => {
				this.$refs.busAddPhoto.src = data
				this.fileData.append('businessAddressFile', file)
				this.this.businessAddressFile = data
			})
    },
    _submit(e) {
			if (this.businessAddressFile === '') {
        Toast('工商执照不能为空！')
        return
      } else {
				saveUserAuthBusiness(this.fileData).then((data) => {
					console.log(data)
				})
      }
    },
    _readFile(file) {
			return new Promise((resolve, reject) => {
				let reader = new FileReader()
				if (/image/.test(file.type)) {
					reader.readAsDataURL(file)
				}
				reader.onload = () => {
					resolve(reader.result)
				}
			})
    }
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom:0;
 	background-color: #eee;
 }
 .appServer-header{
 		background:@color-primary;
 		.size(100%;90px);
 		padding-top: 10px;
 		.appServer-path{
 			margin:0; 
 			color:#fff;
 			font-size:0.7rem;
 		}
 		.path-icon{
 			position: relative;
 			.square(20px);
 			box-sizing: border-box;
 			background-color: red;
 			border:3px solid red;
 			border-radius: 50%;
			z-index:99;
			transition: all 0.4s;
			&.on{
				background-color: #fff;
			}
 		}
 		.appServer-path-item{
 			display: inline-block;
 			.size(30%;80px);
 			line-height: 50px;
 			position: relative;
 			&:after,&:before{
 				position:absolute;
 				box-sizing: border-box;
 				top:10px;
 				content: '';
 			}
 			&:after,&:before{
 				.size(100%;8px);
 				background-color: red;
 				left:50%;
 				margin-top: -4px;
 			}
 			&:before{
 				transition: all 0.4s;
 				width: 0;
 				height: 4px;
 				margin-top: -2px;
 				margin-left: 1px;
 				background-color: #fff;
 				z-index: 100
 			}
 			
 			&.on{
 				&:before{
 					width:100%;
 				}
 			}
 			&:last-child:after,&:last-child:before{
 				content: none;
 			};
 		}
 }
 .first-text{
  font-size:0.6rem;
  color:@color-text-gray;
  margin:8px auto;
  padding:0 10px;
}
.next-btn{
  border:none
}
.second,.third{
	background-color: #fff;
	position:absolute;
	.size(100%;100%);
	.first-text{
		margin:20px auto;
	}
	.bus-photo{
		position:relative;
		.size(120px;120px);
		background-color: #eee;
		font-size: 0.6rem;
		color: @color-text-gray;
		.bus-photo-wrap{
			position: absolute;
			.size(100%;80px);
			left:50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		&>input{
			display: block;
			position: absolute;
			.size(100%;100%);
			opacity: 0
		}
	}
}
</style>