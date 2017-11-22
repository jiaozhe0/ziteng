<template>
<div class='name'>
    <mt-header title="实名认证"></mt-header>
    <div class="content name-content editAddress">
    	<div class="content-wrap">
    		<!-- 状态栏 -->
    		<status :status="param.authStatus" :authDescribe="param.authDescribe" v-show="success || param.authStatus>1">
    		</status>
	    	<p>您上传的身份信息仅用于实名认证，将严格保密，不会出现信息泄露现象</p>
	    	<div class="name-content-wrap avatar-wrap">
		    	<div class='dd'>
			    	<mt-cell title="姓名" class="value-input">
			    		<input class="edit-input" v-validate="'required'" v-model="param.realName" type="text" placeholder="请输入真实姓名" name='name' :disabled="param.authId">
			    	</mt-cell>
		    	</div>
		    	<div class='dd'>
			    	<mt-cell title="身份证号" class="value-input">
			    		<input class="edit-input"  v-model="param.idNumber" type="number" placeholder="请输入身份证号" :disabled="param.authId">
			    	</mt-cell>
		    	</div>
	    		<p class='name-upload-title'>上传证件照</p>
		    	<div class="name-upload clearfix text-center">
		    		<div class="pull-left text-center name-upload-item name-upload-hanlde" @click="_openUpload" v-show="!upload && param.authStatus < 2">
		    			<div class=" name-upload-icon" ></div>
		    			手持身份证照片
		    		</div>
		    		<div class="name-upload-item center-block" v-show="upload || param.idHoldPic && param.authStatus >1 ">
		    			<img :src="param.idHoldPic" alt=""  ref='picture' class='img-responsive'>
		    		</div>
		    		
		    		<div class="pull-right" v-show="!upload && param.authStatus<2">
		    			<span class="pull-left hint-text">实例：</span>
		    			<div class="name-upload-item example"></div>
		    		</div>
		    	</div>
    		</div>
    		<!-- <p v-show="this.param.authStatus == 1 || this.param.authStatus == 3" class='danger'>提示：请手持身份证拍照上传，并确保人脸和证件信息清楚可见 <br>
				注：只拍身份证将无法通过审核
    		</p> -->
    	</div>
    	<div class="bottom" v-show="this.param.authStatus == 1 || this.param.authStatus == 3">
    	<button class="footer-btn" 
    					@click="_saveUserAuthId">
    		{{buttonText}}
    	</button>
    	</div>
    </div>
    <mt-popup v-model="popupVisible"
						  position="bottom" 
						  :modal="true"
						  class="sexPopup">
    	<upload @uploadPicture='_uploadPicture'></upload>
    </mt-popup>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Status from 'components/Status/index'
import {Cell, Popup, Toast} from 'mint-ui'
import Upload from 'components/uploadPicture'
import {mapMutations, mapGetters} from 'vuex'
import {saveUserAuthId, getUserAuthId} from 'api/home'
import {createObjectURL} from 'common/js/browser'
import {imgPreview} from 'common/js/photo'
export default {
	data() {
		return {
			param: {
				file: '',  // 身份证
				userId: '',  // 用户id
				realName: '',   // 真实姓名
				idNumber: '', // 身份证号
				authStatus: 1,
				idHoldPic: ''
			},
			popupVisible: false,
			upload: false, // 是否选择照片，控制照片显示 上传了照片 返回了照片
			submiting: false, // 是否正在提交
			success: false // 提交成功
		}
	},
	created() {
		this.setLoading(false)
		this.setFooter(false)
		this.formData = new FormData()
		this.param.userId = this.user.userId
		this.formData.append('userId', this.user.userId)
	},
	activated() {
		this._getUserAuthId(this.user.userId)
	},
	computed: {
		...mapGetters(['user']),
		buttonText() {
			let text = '提交认证'
			if (this.param.authStatus === 3) {
				text = '重新提交'
			}
			return text
		}
	},
	components: {
		MtHeader,
		MtCell: Cell,
		MtPopup: Popup,
		Upload,
		Status
	},
	methods: {
		_openUpload() {
			this.popupVisible = true
		},
		_saveUserAuthId() {
			if (this.param.authStatus === 3) {
				this.param.authStatus = 1
				this.param.realName = ''
				this.param.idNumber = ''
				this.param.authId = false
				this.param.authDescribe = ''
				this.upload = false
			} else {
				if (this.submiting) {
					return
				}
				if (this.param.realName === '') {
					Toast('请输入姓名')
					return
				}
				if (this.param.idNumber === '') {
					Toast('请输入身份证号')
					return
				}
				let pettern = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
				if (!pettern.test(this.param.idNumber)) {
					Toast('请输入正确的身份证号')
					return
				}
				if (this.param.file === '') {
					Toast('请选择实例上传照片')
					return
				}
				if (this.errors.has('name')) {
					Toast(this.errors.items[0].msg)
					return
				}
				this.formData.append('realName', this.param.realName)
				this.formData.append('idNumber', this.param.idNumber)
				this.formData.append('file', this.param.file)
				this.setLoading(true)
				this.submiting = true
				saveUserAuthId(this.formData).then(data => {
					console.log(data)
					if (data.code === '000000') {
						this.setLoading(false)
						Toast('提交成功！')
						this.submiting = false
						this._getUserAuthId(this.user.userId)
						this.setStatus('person')
					}
				})
			}
		},
		_getUserAuthId(id) {
			getUserAuthId(id).then(data => {
				console.log(data)
				if (data.code === '000000') {
					this.param = Object.assign({}, this.param, data.data)
				}
			})
		},
		_uploadPicture(file) {
			this.param.file = file
			imgPreview(file).then(data => {
				this.formData.append('file', data, 'file_' + Date.parse(new Date()) + '.jpg')
			})
			this.upload = true
			this.popupVisible = false
			this.$refs.picture.src = createObjectURL(file)
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setStatus: 'STATUS',
			setLoading: 'LOADING'
		})
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
.name-content{
	bottom: 0;
	p{
		font-size:0.58rem;
		padding:0 10px;
		margin: 5px 0;
		color:@color-text-gray;
		&.name-upload-title{
			font-size: 0.7rem;
			color:@color-text;
			margin:10px 0 5px;
		}
	}
	background-color: #eee;
	.name-content-wrap{
		background-color: #fff;
		padding: 10px 0;
	}
	.dd{
		padding:0 5px;
	}
	.name-upload{
		padding: 0 10px;
	}
	.name-upload-item{
		.square(110px);
		background:#eee;
		font-size:0.6rem;
		display: inline-block;
		color:@color-text-gray;
		overflow: hidden;
		.name-upload-icon{

		}
		&.example{
			background-size: 110px 110px;
			.bg-view-image('personAuth/identifyCardeg')
		}
	}
	input[disabled]{
		background: transparent;
		color:@color-text;
		font-size: 0.7rem;
	}
}
.name-upload-icon{
			margin: 20px auto 10px;
			.square(34px);
			background-size: 34px 34px;
			.bg-view-image('personAuth/tianjia')
		}
.hint-text{
	font-size:0.64rem;
	margin-right: 3px;
	color:@color-text-gray;
}
</style>