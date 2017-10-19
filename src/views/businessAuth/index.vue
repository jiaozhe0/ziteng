<template>
  <div class="appServer">
  	<mt-header path="/home" title="商家用户认证"></mt-header>
  	<div class="content" v-if="authData.businessId == '' || againUpload">
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
        <!-- 上传工商信息 -->
  			<div class="first" v-show="path == 'first'">
  			  <p class="first-text">请正确填写工商信息</p>
  			   <mt-field  v-model='businessName' label="名称" placeholder="输入工商注册名称"  :attr="{autofocus:true}"></mt-field>
  			   <mt-field v-model='businessCode' name='gscode' v-validate="'required'" label="工商号码" placeholder="输入工商号码" type="number" ></mt-field>
  			  <button @click="_nextSecond" class='center-block next-btn ziteng-btn'>下一步</button>
  			</div>

        <!-- 上传工商执照 -->
  			<div class="second" v-show="path == 'second'">
  			  <p class="first-text text-center">照片仅用于用户认证，我们将保证信息安全</p>
  			   <!-- 图片显示/按钮 -->
          <upload-btn @click.native="popupVisible = true" :url="businessFile">
            上传工商执照照片   
          </upload-btn>
  			  <button @click="_nextThird" class='center-block next-btn ziteng-btn'>下一步</button>
  			</div>

        <!-- 上传店铺图片 -->
  			<div class="third" v-show="path == 'third'">
  			  <p class="first-text text-center">照片仅用于用户认证</p>
  			   <upload-btn @click.native="popupVisible = true" :url="businessAddressFile">
            上传工商执照照片   
          </upload-btn>
  			  <button @click="_submit" class='center-block next-btn ziteng-btn'>提交认证</button>
  			</div>
  		</div>
  	</div>
    <div class="content view-content editAddress" v-else>
      <div class="content-wrap value-input">
        <status :status="authData.authStatus"></status>
          <mt-cell title="名称" :value="authData.businessName"></mt-cell>
        <mt-cell title="工商号码" :value="authData.businessCode"></mt-cell>
        <mt-cell title="营业执照" class="business-wrap">
          <upload-btn class='business-wrap-pic' @click.native="popupVisible = true" :url="authData.businessPic"></upload-btn>
        </mt-cell>
          <mt-cell title="店铺照片" class="business-wrap">
            <upload-btn class='business-wrap-pic' @click.native="popupVisible = true" :url="authData.businessAddressPic"></upload-btn>
          </mt-cell>
        </div>
        <button class="footer footer-btn" @click="againUpload=true">
          重新认证
        </button>
    </div>
    <mt-popup v-model="popupVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
     <upload @uploadPicture='_uploadPicure'></upload>
     </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import { Field, Toast, Popup, Cell } from 'mint-ui'
import {saveUserAuthBusiness, getUserAuthBusiness} from 'api/home'
import uploadBtn from 'components/uploadBtn/index'
import Status from 'components/Status/index'
import Upload from 'components/uploadPicture'
import {createObjectURL} from 'common/js/browser'
import {mapGetters, mapMutations} from 'vuex'
export default {
	data() {
		return {
			pathFirst: false,
			pathSecond: false,
			path: 'first',
      popupVisible: false,
      submiting: false,
      againUpload: false,
      authData: {
        businessId: '',
        userId: '',
        businessName: '',
        businessAddressPic: '',
        businessPic: '',
        authTime: '',
        authDescribe: '',
        authStatus: 1
      },
			businessCode: '',
      businessName: '',
      businessFile: '',
      businessAddressFile: ''
		}
	},
	components: {
		MtHeader,
		mtField: Field,
    uploadBtn,
    mtPopup: Popup,
    mtCell: Cell,
    Upload,
    Status
	},
	created() {
		this.formData = new FormData()
    this.formData.append('userId', this.user.userId)
	},
  activated() {
    this._getUserAuthBusiness(this.user.userId)
  },
  computed: {
    ...mapGetters(['user', 'status'])
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
			this.formData.append('businessName', this.businessName)
			this.formData.append('businessCode', this.businessCode)
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
			if (this.businessFile === '') {
        Toast('工商执照不能为空！')
        return
      }
      this.path = 'third'
      this.pathSecond = true
    },
    _submit(e) {
			if (this.businessAddressFile === '') {
        Toast('工商执照不能为空！')
        return
      }
      if (this.submiting) {
        return
      }
      Toast('正在提交！')
			saveUserAuthBusiness(this.formData).then((data) => {
				console.log(data)
        if (data.code === '000000') {
          Toast('提交成功！')
          this.againUpload = false
          this._getUserAuthBusiness(this.user.userId)
          this.submiting = false
          this.setStatus('business')
          window.localStorage.setItem('status', 'business')
        }
			})
    },
    _getUserAuthBusiness(id) {
      getUserAuthBusiness(id).then(data => {
        console.log(88, data)
        if (data.code === '000000') {
          this.$nextTick(() => {
            this.authData = Object.assign({}, this.authData, data.data)
          })
        }
      })
    },
    _uploadPicure(file) {
      if (this.path === 'second') {
        console.log('businessFile')
        this.formData.append('businessFile', file)
        this.businessFile = createObjectURL(file)
        this.popupVisible = false
      } else if (this.path === 'third') {
        console.log('businessAddressFile')
        this.formData.append('businessAddressFile', file)
        this.businessAddressFile = createObjectURL(file)
        this.popupVisible = false
      }
    },
    ...mapMutations({
      'setStatus': 'STATUS'
    })
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
}
.view-content{
  .business-wrap-pic{
    margin: 5px auto;
  }
}
</style>