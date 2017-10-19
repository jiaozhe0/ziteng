<template>
  <div class='publish'>
  	<mt-header title="发布服务"></mt-header>
  	<scroll class="content">
    	<div class="service-form">
	    	<div class="form-item">
		    	<div>
		    		<mt-field v-model="param.title" placeholder="请输入一个服务标题不超过15字"></mt-field>
		    	</div>
		    	<label for="serDetail" class="serDetail-wrap">
		    	<textarea @focusin.native="_test" name=""  
		    	placeholder="编辑服务描述，准确的描述有助于用户了解您的服务 （至少需要10个字）" 
		    	id="" cols="30" rows="40" id="serDetail" 
		    	class="serDetail" @keyup="_setNum" v-model="param.serviceDescribe">
		    	</textarea>
		    		<div class="num">{{remainNum}}</div>
					</label>
					<!-- 上传照片 -->
		    	<label for="" class='onload-wrap-pic clearfix'>
		    		<div class="pull-left upload-item" v-for="(item,index) in param.servicePic">
		    			<div class="close-icon" @click="_deletePic(index)">×</div>
		    			<img :src="item.picName" alt="" class="img-responsive">
		    		</div>
		    		 <upload-btn class="pull-left" :square="80"
		    		 				margin="0"
		    		 				@click.native="uploadVisible = true" >
		    		 		添加图片
		    		 </upload-btn>
		    	</label>
	    	</div>
	    	<div class="form-item">
	    		<div class="selectedPrice text-center">
	    			<!-- 选择金额模式 -->
	    			<div class="selectedPrice-btn center-block">
	    				<button type='button':class="{'selected': param.priceType === 1}" @click="_selectPriceType(1)">一口价</button>
	    				<button type='button':class="{'selected': param.priceType === 2}" @click="_selectPriceType(2)">预约金</button>
	    			</div>
	    			服务价格不确定，建议选择预约金模式
	    		</div>
		    	<mt-cell title="服务价格"  v-if="param.priceType === 1">
		    	  <input type="number" class='price-input text-right'
		    	   placeholder="请输入服务价格(元)"
		    	   v-model="onePrice"
		    	   @keyup="_changePrice">
		    	 </mt-cell>
		    	 <mt-cell title="预约金额"  is-link v-else  @click.native="popupVisible = true">
		    	  <span class='textOn' v-if="priceTransmit">{{priceTransmit}}</span>
		    	  <span v-else>请选择预约金额</span>
		    	 </mt-cell>
		    	 <router-link to="/address">
			    	<mt-cell title="我的位置" is-link >
			    	  <span>{{addressName}}</span>
			    	</mt-cell>
					 </router-link>
	    	</div>
	    	<router-link to="/servicemap" class="danger remind-text">发布前请阅读《服务者管理规则》</router-link>
    	 	<div>{{param.servicePicId}}</div>
    	 </div>
    </scroll>
    <!-- 提交成功 -->
		<div class="content success-content text-center"
				 v-show='success'>
			<div class="success-icon center-block">
				<div class="icon"></div>
			</div>
			<strong>服务已成功提交</strong>
			<p class="success-text">感谢您发布服务，我们马上进行审核，审核结果短信送至您的手机，请耐心等待！</p>
			<div class="success-btn-wrap" v-if="auth">
				<button @click="_back" class="auth-btn auth">知道了</button>
			</div>
			<div class="success-btn-wrap" v-else>
				<router-link :to="url" class="auth-btn danger unauth">立即认证</router-link to="">
				<p class="danger unauth-text">提示：您还没有实名认证，通过认证后用户才能看到您发布的服务</p>
			</div>
		</div>
    <div class="bar bar-footer on" >
			<button class="footer-btn" @click="_saveServiceInfo">发布服务</button>
  	</div>

    <!-- 预约金额 -->
    <mt-popup v-model="popupVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
     <div class="sexPopup-top">
     	<div class="textOn" @click="popupVisible = false">取消</div>
     	<div>预约金金额</div>
     	<div class="textOn" @click="_setPrice">确定</div>
     </div>
   		 <mt-picker :slots="priceData" @change="getSlotValue"></mt-picker>
    </mt-popup>
   
    <!-- 上传照片 -->
    <mt-popup v-model="uploadVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
    	 <upload :multiple="true" @uploadPicture='_uploadPicure'></upload>
     </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Picker, Popup, Field, Toast} from 'mint-ui'
import uploadBtn from 'components/uploadBtn/index'
import Upload from 'components/uploadPicture'
import Scroll from 'components/Scroll'
import {createObjectURL} from 'common/js/browser'
import {saveServicePicture, saveServiceInfo, getServiceDetails, updateServiceInfo} from 'api/service'
import {mapGetters, mapMutations} from 'vuex'
import {getUserAuthStatus} from 'api/home'
export default {
	data() {
		return {
			publishList: [],
			remainNum: 500, // 描述字数
			popupVisible: false, // 价格popup显示
			uploadVisible: false, // 上传图片popup显示
			priceTransmit: 0, // 价格中间
			onePrice: '', // 中间件
			sumbiting: false,
			success: false,
			priceData: [
				{
					flex: 1,
					values: [19, 39, 59],
					defaultIndex: 0
				}
			],
			serviceInfo: {},
			param: {
				title: '', // 标题
				serviceDescribe: '', // 描述
				baiduCityId: '', // 城市id
				baiduCityName: '', // 城市名
				longitude: '',
				latitude: '',
				priceNumber: '', // 价格
				userId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				serviceUnitTypeId: '',
				servicePicId: [], // 图片ID
				servicePic: [],
				priceType: 1 // 价格类型 一口价/预约金
			},
			auth: '',
			serviceId: ''
		}
	},
	created() {
		this.param.userId = this.user.userId
		this.param.baiduCityName = this.city.cityName
		this.param.baiduCityId = this.city.cityId
	},
	activated() {
		this.serviceId = this.$route.query.serviceId && this.$route.query.serviceId
		if (this.serviceId) {
			this._getServiceDetails(this.$route.query.serviceId)
		}
		this._getUserAuthStatus(this.user.userId)
	},
	deactivated() {
		this.success = false
		this.onePrice = ''
		if (this.serviceId) {
			this.param = {
				title: '', // 标题
				serviceDescribe: '', // 描述
				baiduCityId: '', // 城市id
				baiduCityName: '', // 城市名
				longitude: '',
				latitude: '',
				priceNumber: '', // 价格
				userId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				serviceUnitTypeId: '',
				servicePicId: [], // 图片ID
				servicePic: [],
				priceType: 1 // 价格类型 一口价/预约金
			}
		}
	},
	computed: {
		...mapGetters(['user', 'city', 'map', 'status']),
		addressName() {
			let name = '请选择'
			if (this.map.uid) {
				name = this.map.title
				this.param.longitude = this.map.point.lng
				this.param.latitude = this.map.point.lat
			}
			return name
		},
		priceText() {
			this.param
		},
		url() {
				let url = '/home/auth'
				if (this.status === 'person') {
					url = '/home/auth/person'
				} else if (this.status === 'business') {
					url = '/home/auth/server'
				}
				return url
		}
	},
	components: {
			MtHeader,
			MtCell: Cell,
			MtPicker: Picker,
			MtPopup: Popup,
			MtField: Field,
			Scroll,
			uploadBtn,
			Upload
	},
	methods: {
		_setNum(e) {
			if (this.remainNum === 0) {
				return
			}
			this.remainNum = 500 - e.target.value.length
		},
		_changePrice(e) {
			console.log(e.target.value)
			this.param.priceNumber = e.target.value
		},
		// 选择价格类型
		_selectPriceType(type) {
			this.param.priceType = type
			if (type === 1) {
				this.onePrice = ''
			}
		},
		// 获得价格
		getSlotValue(picker, values) {
			this.priceTransmit = values[0]
		},
		// 设置价格
		_setPrice() {
			this.param.priceNumber = this.priceTransmit
			this.popupVisible = false
		},
		// 上传图片
		_uploadPicure(files) {
			let pictureList = []
			this.uploadVisible = false
			pictureList = [...files].map((item, index) => {
				let formData = new FormData()
				formData.append('file', item)
				formData.append('createOrder', index)
				// 上传图片
				saveServicePicture(formData).then(data => {
					this.param.servicePicId.push(data.data.servicePicId)
					console.log(data)
				})
				let picInfo = {
					createOrder: index,
					picName: createObjectURL(item)
				}
				return picInfo
			})
			this.param.servicePic = this.param.servicePic.concat(pictureList)
		},
		// 删除图片
		_deletePic(index) {
			this.param.servicePic.splice(index, 1)
			this.param.servicePicId.splice(index, 1)
		},
		// 发布服务信息
		_saveServiceInfo() {
			if (this.serviceId) {
				console.log(123, this.param)
				console.log(234, this.serviceInfo)
				let pic = this._comparePic(this.param.servicePic, this.comparePic)
				let flag = this._compareValue(this.param, this.serviceInfo)
				console.log(flag)
				if (flag || pic) {
					if (this._validate()) {
						updateServiceInfo(this.param).then(data => {
							console.log(data)
							if (data.code === '000000') {
								Toast('修改申请已提交，等候审核')
								this.sumbiting = false
								window.history.back()
							}
						})
					}
				} else {
					Toast('没有修改')
				}
			} else {
				if (this._validate()) {
					Toast('正在提交')
					this.sumbiting = true
					saveServiceInfo(this.param).then(data => {
						console.log(data)
						if (data.code === '000000') {
							this.authStatus = data.data[0]
							this.success = true
							this.sumbiting = false
						}
					})
				}
			}
		},
		_validate() {
			if (this.param.title === '') {
				Toast('标题不能为空！')
				return
			}
			if (this.param.title.length < 4) {
				Toast('标题不能少于4个字')
				return
			}
			if (this.param.serviceDescribe === '') {
				Toast('描述不能为空！')
				return
			}
			if (this.param.serviceDescribe.length < 10) {
				Toast('描述至少10个字')
				return
			}
			if (!this.param.servicePicId.length) {
				Toast('请选择图片')
				return
			}
			if (!this.param.priceNumber === 0) {
				Toast('价格不能为空')
				return
			}
			if (this.sumbiting) {
				return
			}
			return true
		},
		// 获取服务详情
		_getServiceDetails(id) {
			getServiceDetails(id).then(data => {
				this.param = Object.assign({}, this.param, data.serviceInfo)
				this.serviceInfo = data.serviceInfo
				this.comparePic = data.serviceInfo.servicePic.map(item => {
					return item
				})
				// 设置价格
				if (this.param.priceType === 1) {
					this.onePrice = this.param.priceNumber
					this.priceTransmit = 0
				} else {
					this.priceTransmit = this.param.priceNumber
				}
				// 设置地址
				this._setAddress(this.param.longitude, this.param.latitude)
				// 字数显示
				this.remainNum = 500 - this.param.serviceDescribe.length
				data.serviceInfo.servicePic.forEach((item, index) => {
					this.param.servicePicId.push(item.servicePicId)
				})
			})
		},
		// 获取状态
		_getUserAuthStatus(id) {
			getUserAuthStatus(id).then(data => {
					if (data.code === '000000') {
						let auth = data.data[0]
						if (auth.authBusinessStatus > 1) {
							this.url = '/home/auth/server'
							this.setStatus('business')
							this.auth = auth.authBusinessStatus === 4 ? 'true' : ''
						} else {
							if (auth.authProfessionalStatus > 1 || auth.authUserIdStatus > 1 || auth.authZhimaxinyongStatus) {
								this.setStatus('person')
								this.auth = auth.authProfessionalStatus === 4 ? 'true' : auth.authUserIdStatus === 4 ? 'true' : auth.authZhimaxinyongStatus === 4 ? 'true' : ''
							}
						}
					}
				})
		},
		_back() {
			window.history.back()
		},
		_setValue(data) {
			let newData
			for (let i in data) {
				if (data[i] !== 'string') {
					if (data[i] instanceof Array || data[i] !== null && data[i] instanceof Object) {
						newData[i] = this._setValue(data[i])
					}
				} else {
					newData[i] = data[i]
				}
			}
			return newData
		},
		_compareValue(val1, val2) {
			let flag = false
			for (let key in val1) {
				if (typeof val1[key] !== 'string') {
					continue
				} else {
					if (this.param[key] !== this.serviceInfo[key]) {
						flag = true
						break
					}
				}
			}
			return flag
		},
		_comparePic(val1, val2) {
			let flag = false
			if (val1.length === val2.length) {
				val1.some((item, index) => {
					if (item !== val2[index]) {
						flag = true
						return true
					}
				})
			} else {
				flag = true
			}
			return flag
		},
		_setAddress(lng, lat) {
			var myGeo = new BMap.Geocoder()
			myGeo.getLocation(new BMap.Point(lng, lat), (result) => {
				this.setMap(result.surroundingPois[0])
			})
		},
		...mapMutations({
			'setStatus': 'STATUS',
			'setMap': 'MAP'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.content{
	overflow: auto;
	bottom:60px;
	background:#eee;
}
.service-form{
	height: auto;
	input,textarea{
		display:block;
		.size(100%;45px);
		border:none;
		font-size:0.6rem;
	}
	label{
		display:block;
		padding:5px 10px 0;
		border-bottom:1px solid @color-split;
	}
	textarea{
		overflow-y:scroll;
	}
	// 服务详情
	.serDetail-wrap{
		position: relative;
		height: 145px;
		.serDetail{
			height:120px;
		}
		.num{
			position: absolute;
			right: 15px;
			bottom: 0;
			font-size: 0.6rem;
			color:@color-text-gray;
		}
	}
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
	.form-item{
		background:#fff;
		margin-bottom:10px;
		.onload-wrap-pic{
			padding:10px;
		}
		.selectedPrice{
			.size(100%;90px);
			padding: 15px;
			font-size: 0.6rem;
			color: @color-text-gray;
			.selectedPrice-btn{
				margin-bottom: 8px;
				.size(70%;32px);
				background-color: #eee;
				border-radius: 30px;
			}
			button{
				.size(48%;32px);
				display: inline-block;
				border:none;
				background-color: transparent;
				color: @color-text;
				border-radius: 30px;
				&.selected{
					background-color: @color-primary;
					transition: all 0.5s;
					color:#fff;
				}
			}
		}
		.price-input{
			height: 30px;
			margin-right:8px;
			color:@color-primary;
		}
	}
}
.bar-footer{
		height: 60px;
		line-height: 60px;
		background-color: #fff;
	&.on{
		z-index: 99
	}
}
.remind-text{
	display: block;
	padding:0 10px 20px;
}
.success-content{
	bottom:0;
	z-index:100;
	padding: 30px 20px;
	background-color:#fff;
	.success-icon{
		position: relative;
		.square(100px);
		border-radius: 50%;
		background-color: @color-primary;
		margin: 20px auto 40px;
		.icon{
			position: absolute;
			left:50%;
			top:50%;
			transform: translate(-50%,-50%);
			.square(60px);
			background-size: 60px 60px;
			.bg-view-image('EditService/authSuccess')
		}
		&:after,&:before{
			content:'';
			position: absolute;
			border-radius: 50%;
		}
		&:after{
			.square(120px);
			top:-10px;
			left:-10px;
			z-index: -30;
			background-color:rgba(255,224,198,.4);
		}
		&:before{
			.square(140px);
			top:-20px;
			left:-20px;
			z-index: -30;
			background-color:rgba(255,224,198,.3);
		}
	}
	strong{
		color:@color-text-secondary;
	}
	.success-btn-wrap{
		margin-top: 30px;
		.auth-btn{
			display: block;
			margin: 0 auto;
			border:none;
			.size(180px;46px);
			line-height: 46px;
			font-size: 0.7rem;
			&.unauth{
				color: @color-danger;
				border:1px solid @color-danger;
			}
			&.auth{
				background-color: @color-primary;
				color:#fff;
			}
		}
		.unauth-text{
			font-size: 0.5rem;
		}
	}
	.success-text{
		font-size: 0.6rem;
		color: @color-text-gray
	}
}

</style>