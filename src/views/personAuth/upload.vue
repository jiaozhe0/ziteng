<template>
<div class='upload'>
    <mt-header title="上传证明材料" class='ll' path="/home/auth/person/skill"></mt-header>
    <div class="content upload-content text-center" v-show='!upload || againUpload'>

    	<!-- 名片拍摄 -->
    	<div class="upload-item" v-if="this.$route.params.type == 'card'">
    		<p>名片拍摄说明</p>
    		<div class="upload-content-pic card">
    		</div>
    		<p class='text-left require-text'>1.请手持名片拍摄，确保姓名职务等信息拍摄清晰
    		</p>
    	</div>

    	<!-- 在职证明 -->
    	<div class="upload-item" v-if="this.$route.params.type == 'job'">
    		在职证明拍摄说明
    		<div class="upload-content-pic job">
    		</div>
    		<p class='text-left require-text'>1.请确保姓名/职务/公司等信息拍摄清晰
    		</p>
    	</div>

    	<!-- 工牌拍摄说明 -->
    	<div class="upload-item" v-if="this.$route.params.type == 'workcard'">
    		工牌拍摄说明
    		<div class="upload-content-pic workcard">
    		</div>
    		<p class='text-left require-text'>1.请确保姓名/职务等信息拍摄清晰
    		</p>
    	</div> 

    	<!-- 工牌拍摄说明 -->
    	<div class="upload-item" v-if="this.$route.params.type == 'skill'">
    		<p>证书拍摄说明</p>
    		<div class="upload-content-pic skill">
    		</div>
    		<p class='text-left require-text'>1.请确保姓名，证书信息等拍摄清晰
    		</p>
    	</div>     	
			
			<!-- 上传照片按钮 -->
			<div class="upload-btn-wrap">
				<upload @uploadPicture='_uploadPicture'></upload>
			</div>
    </div>
   	<div v-show='upload || this.$route.query.status && !againUpload'>
    <div class="content view-content" >
    	<status :status="parseInt(this.$route.query.status)" v-show="!success || this.$route.query.status && !againUpload">
    	</status>
    	<div class="upload-item">
    		<div class="upload-content-pic">
    			<img :src="this.$route.query.pic" alt="" ref='picture' class='img-responsive'>
    		</div>
    	</div>
    </div>
    <div class="bar footer-btn-wrap bar-footer" :class="{'uploadFooter':upload || this.$route.query.status === 3}" >
    	<button v-show='success' class="footer-btn" @click="_saveUserAuthProfessional">{{buttonText}}</button>
    </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Upload from 'components/uploadPicture'
import Status from 'components/Status/index'
import {createObjectURL} from 'common/js/browser'
import {mapMutations, mapGetters} from 'vuex'
import {Cell, Popup, Toast} from 'mint-ui'
import {saveUserAuthProfessional} from 'api/home'
export default {
	data() {
		return {
			upload: false,  // 未提交之前
			submiting: false, // 是否在提交中
			success: true, // 提交成功
			againUpload: false, // 重新提交
			status: 0
		}
	},
	created() {
		this.setFooter(false)
		this.formData = new FormData()
		this.formData.append('userId', this.user.userId)
		this.formData.append('professionalTypeId', this.professionalTypeId)
		this.status = this.$route.query.status
	},
	deactivated() {
		this.setFooter(true)
	},
	components: {
		MtHeader,
		MtCell: Cell,
		MtPopup: Popup,
		Upload,
		Status
	},
	computed: {
		...mapGetters(['user']),
		professionalTypeId() {
			let type = 0
			switch (this.$route.params.type) {
				case 'card':
					type = 1
					break
				case 'job':
					type = 2
					break
				case 'workcard':
					type = 3
					break
				case 'skill':
					type = 4
					break
			}
			return type
		},
		buttonText() {
			let text = '提交'
			if (!this.againUpload && this.$route.query.status && this.$route.query.status === 3) {
				text = '重新提交'
			}
			return text
		}
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setStatus: 'STATUS'
		}),
		_uploadPicture(file) {
			this.upload = true
			this.formData.append('file', file)
			this.status = 0
			this.success = true
			this.$refs.picture.src = createObjectURL(file)
		},
		_saveUserAuthProfessional() {
			// 判断审核失败 againUpload:false
			if (!this.againUpload && this.$route.query.status && this.$route.query.status === 3) {
				this.againUpload = true
			} else {
				if (this.submiting) {
					return
				}
				Toast('材料提交中！')
				this.submiting = true
				saveUserAuthProfessional(this.formData).then((data) => {
					console.log(data)
					if (data.code === '000000') {
						Toast('提交成功！')
						this.submiting = false
						this.success = false
						this.setStatus('person')
						window.localStorage.setItem('status', 'person')
						this.$emit('upload')
					}
				})
			}
		}
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';

.content{
	z-index: 23;
	.upload-item{
		.center-block();
		width: 262px;
		padding:50px 0 60px;
		color:#fff;
		.require-text{
			font-size: 0.6rem;
		}
	}
	.upload-content-pic{
		.size(262px;180px);
		.center-block();
		overflow: hidden;
		background-size:262px 180px;
		&.card{
			.bg-view-image('personAuth/nameCardeg')
		}
		&.job{
			.bg-view-image('personAuth/onJobeg')
		}
		&.workcard{
			.bg-view-image('personAuth/workCardeg')
		}
		&.skill{
			.bg-view-image('personAuth/certificateeg')
		}
	}
}
.upload-content{
	bottom:0;
	font-size:0.7rem;
	background:#000;
	.upload-btn-wrap{
		position: absolute;
		bottom: 0;
		.flexbox();
		.align-items(center);
		.justify-content(space-around);
		.size(100%;180px);
		background:#fff;
	}
}
.uploadFooter{
	z-index: 99;
	background-color: #fff!important;
}

</style>