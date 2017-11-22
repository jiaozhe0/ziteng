<template>
 <div>
 <mt-header title="个人资料"></mt-header>
 <div class="content">
 <div class="content-wrap">
 <mt-cell title="头像" is-link  class="avatar-wrap">
 	<label for="avatar" slot=icon></label>
 	<div class="avatar-img">
 	  <input  id="avatar" type="file" accept="image/*"  @change="_uploadPicure" class="avatar-btn">
 		<img :src="userInfo.photoUrl" alt="" class="img-responsive" v-if="userInfo.photoUrl" ref="avatarImg" />
 		<img src="./n_meiyou.png" v-else alt="" class="img-responsive" />
 	</div>
 </mt-cell>
 <mt-cell title="用户名" value="说明文字">
 	<input type="text" class='userName text-right' v-model="param.userName">
 </mt-cell>
 <mt-cell title="生日" is-link @click.native="openDate">
 <span >{{param.birthday}}</span>
 </mt-cell>
 <mt-cell title="性别" is-link @click.native="popupVisible = true">
  {{setSexText}}
 </mt-cell>
  <mt-cell title="手机号码(不可更改)" >
  {{userInfo.phoneNumber}}
 </mt-cell>
 </div>

 <div class="footer text-center">
 	<button class='footer-btn' @click="_updateUserInfo">保存</button>
 </div>
 </div>
 <mt-datetime-picker
 	ref="dataPicker"
  :visible="pickerVisible"
  :startDate="new Date('1960-01-01')"
  :endDate="new Date('2017-10-01')"
  type="date"
  year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日"
  @confirm="handleChange"
  >
</mt-datetime-picker>
<!-- 性别 -->
 <mt-popup v-model="popupVisible"
  position="bottom" 
  ref="sexPicker"
  :modal="true"
  class="sexPopup"
  >
  <div class="sexPopup-top">
  	<div class="textOn" @click="popupVisible = false">取消</div>
  	<div>性别</div>
  	<div class="textOn" @click="setSex">确定</div>
  </div>
 <mt-picker :slots="sexData" @change="getSlotValue"></mt-picker>
 </mt-popup>
	<!-- 图片 -->
	<mt-popup v-model="picVisible"
					  position="bottom" 
					  :modal="true"
					  class="sexPopup">
 		 <upload @uploadPicture='_uploadPicure'></upload>
  </mt-popup>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, DatetimePicker, Picker, Popup, Toast} from 'mint-ui'
import {mapMutations, mapGetters} from 'vuex'
import {updateUserInfo, updateUserInfoPicture} from 'api/home'
import Upload from 'components/uploadPicture'
import {createObjectURL} from 'common/js/browser'
const timeStamp = require('time-stamp')
import {imgPreview} from 'common/js/photo'
export default {
	data() {
		return {
			pickerVisible: true,
			popupVisible: false,
			setSexText: '未填写',
			picVisible: false,
			sumbiting: false,
			sexData: [
				{
					flex: 1,
					values: ['男', '女'],
					defaultIndex: 1
				}
			],
			param: {
				userId: '',
				sex: 0,
				userName: '',
				birthday: '未填写'
			}
		}
	},
	components: {
		MtHeader,
		MtCell: Cell,
		MtDatetimePicker: DatetimePicker,
		MtPicker: Picker,
		MtPopup: Popup,
		Upload
	},
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.$refs.dataPicker.currentValue = new Date(new Date('1990').getFullYear(), 0, 1)
				this.sexData[0].defaultIndex = 0
			}, 20)
		})
	},
	created() {
		this.setFooter(false)
	},
	activated() {
		this._initUserInfo()
	},
	deactivated() {
		this.setFooter(true)
		this.popupVisible = false
		this.$refs.dataPicker.close()
		this.pickerVisible = false
	},
	computed: {
		...mapGetters(['userInfo']),
		getSex() {
			let sexValue = 0
			switch (this.setSexText) {
				case '男':
					sexValue = 1
					break
				case '女':
					sexValue = 2
					break
				default:
					sexValue = 0
					break
			}
			return sexValue
		},
		getSexText() {
		}
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setLoading: 'LOADING'
		}),
		// 打开日期
		openDate() {
			this.$refs.dataPicker.open()
		},
		getSlotValue(picker, values) {
			this.sexTransmit = values[0]
		},
		// 设置性别
		setSex() {
			this.setSexText = this.sexTransmit
			this.param.sex = this.getSex
			this.popupVisible = false
		},
		// 设置生日
		handleChange(value) {
			this.param.birthday = timeStamp(value)
		},
		// 初始化用户信息
		_initUserInfo() {
			this.param = {
				userId: this.userInfo.userId,
				sex: this.userInfo.sex,
				userName: this.userInfo.userName,
				birthday: this.userInfo.birthday
			}
			// 性别
			switch (this.param.sex) {
				case '1':
					this.setSexText = '男'
					break
				case '2':
					this.setSexText = '女'
					break
				default:
					this.setSexText = '未填写'
					break
			}
		},
		// 修改用户信息
		_updateUserInfo() {
			let flag = false
			for (let i in this.param) {
				if (this.param[i] !== this.userInfo[i]) {
					console.log(i)
					console.log(this.param[i] + '===' + this.userInfo[i])
					flag = true
					break
				}
			}
			if (flag) {
				console.log(this.param)
				this.setLoading(true)
				updateUserInfo(this.param).then(res => {
				if (this.sumbiting) {
					return
				}
				this.sumbiting = true
				console.log(res)
				if (res.code === '000000') {
					this.setLoading(false)
					Toast('修改成功')
					this.sumbiting = false
				}
			})
			} else {
				Toast('未作修改')
			}
		},
		_uploadPicure(e) {
				// this.setLoading(true)
				let formData = new FormData()
				let file = e.target.files[0]
				imgPreview(file).then(data => {
					formData.append('userId', this.userInfo.userId)
					formData.append('file', data, 'file_' + Date.parse(new Date()) + '.jpg')
					updateUserInfoPicture(formData).then(res => {
						if (res.code === '000000') {
							this.setLoading(false)
							Toast('修改成功')
							this.$refs.avatarImg.src = createObjectURL(file)
						}
					})
				})
				this.picVisible = false
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom:0;
 }
.avatar-wrap{
 	height: 80px;
 	.flexbox();
 	.align-items(center);
 	margin-bottom: 8px;
 	.mint-cell-wrapper{
 		background-size:0 0;
 	}
 }
 .avatar-img{
 	position:relative;
 	.square(60px);
 	background-color: #eee;
 	.avatar-btn{
		position: absolute;
		.square(100%);
		z-index: 999;
		opacity: 0
 	}
 }
 .userName{
 	border:none;
 	font-size:0.7rem;
 	color:#888;
 	margin-right: 22px;
 }
 
</style>