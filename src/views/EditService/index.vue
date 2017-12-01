<template>
  <div class='publish'>
  	<mt-header title="发布服务"></mt-header>
  	<div class="content publish-content">
	  	<div class="publish-wrap">
	    	<div class="service-form">
		    	<div class="form-item">
			    	<div>
			    		<mt-field v-model="param.title" placeholder="请输入一个服务标题不超过15字" @keyup.native="_wacthTitle"></mt-field>
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
						<div class="upload">
						 <upload-pic-list :multiple="true" 
						 									@uploadPicture='_uploadPicure' 
						 									@deletePic="_deletePic"
						 									:process="processList"
						 									:test="process"
						 									:pictures="param.servicePic"></upload-pic-list>
						</div>
		    	</div>
		    	<div class="form-item">
		    		<div class="selectedPrice text-center">
		    			<!-- 选择金额模式 -->
		    			<div class="selectedPrice-btn center-block">
		    				<button type='button':class="{'selected': param.priceType === 1}" @click="_selectPriceType(1)">一口价</button>
		    				<button type='button':class="{'selected': param.priceType === 2}" @click="_selectPriceType(2)">预约金</button>
		    			</div>
		    			<div class='text' v-if="param.priceType === 1">服务价格固定，建议选择一口价模式</div>
		    			<div class='text' v-else>服务价格不确定，建议选择预约金模式</div>
		    		</div>
			    	<mt-cell title="服务价格"  v-if="param.priceType === 1">
			    	  <input type="number" class='price-input text-right'
			    	   placeholder="请输入服务价格(元)"
			    	   v-model="onePrice"
			    	   @keyup="_changePrice">
			    	 </mt-cell>
			    	 <mt-cell title="预约金额"  is-link v-else  @click.native="_openPrice">
			    	  <span class='textOn' v-if="param.subscription">{{param.subscription}}</span>
			    	  <span v-else>请选择预约金额</span>
			    	 </mt-cell>
			    	 <router-link to="/address">
				    	<mt-cell title="我的位置" is-link >
				    	  <span>{{addressName}}</span>
				    	</mt-cell>
						 </router-link>
		    	</div>
		    	<router-link to="/agreement/server/html" class="textOn remind-text">
		    	<p>发布前请阅读《服务者管理规则》</p>
		    	</router-link>
	    	 	<!-- <div>{{param.servicePicId.length}}</div> -->
	    	 </div>
	    </div>
		</div>
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
						<router-link replace :to="{path:url, query:{skill:true}}" class="auth-btn danger unauth" >立即认证</router-link to="">
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
     <div class="sexPopup-top" v-if="priceData[0].values.length">
     	<div class="textOn" @click="_cancelPrice">取消</div>
     	<div>预约金金额</div>
     	<div class="textOn" @click="_setPrice">确定</div>
     </div>
   		 <mt-picker :slots="priceData" @change="getSlotValue"></mt-picker>
    </mt-popup>
    <!-- 上传照片 -->
    <!-- <mt-popup v-model="uploadVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
    	 <upload :multiple="true"  @uploadPicture='_uploadPicure'></upload>
     </mt-popup> -->
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Picker, Popup, Field, Toast} from 'mint-ui'
import uploadBtn from 'components/uploadBtn/index'
import Upload from 'components/uploadPicture'
import Scroll from 'components/Scroll'
import UploadPicList from 'components/uploadPicList/index'
import {createObjectURL} from 'common/js/browser'
import {getLocal} from 'api/system'
import {saveServicePicture, saveServiceInfo, getServiceDetails, getServiceParameter, updateServiceInfo} from 'api/service'
import {mapGetters, mapMutations} from 'vuex'
import {getUserAuthStatus} from 'api/home'
import {dataURLtoBlob, imgPreview} from 'common/js/photo'
const wx = require('weixin-js-sdk')
let fromUrl = ''
export default {
	data() {
		return {
			indexs: 0,
			publishList: [],
			remainNum: 500, // 描述字数
			popupVisible: false, // 价格popup显示
			uploadVisible: false, // 上传图片popup显示
			priceTransmit: 0, // 预约金价格中间值
			onePrice: '', // 一口价价格中间值
			sumbiting: false,
			success: false,
			process: 0,
			processList: {},
			priceData: [ // 预约价格
				{
					flex: 1,
					values: [],
					defaultIndex: 0
				}
			],
			serviceInfo: {}, // 服务信息
			param: {
				title: '', // 标题
				serviceDescribe: '', // 描述
				baiduCityId: '', // 城市id
				baiduCityName: '', // 城市名
				longitude: '',
				latitude: '',
				priceNumber: 0, // 价格
				userId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				serviceUnitTypeId: '',
				servicePicId: [], // 图片ID
				servicePic: [],
				subscription: 0,
				priceType: 1 // 价格类型 一口价/预约金
			},
			auth: '',
			serviceId: '',
			toUrl: ''
		}
	},
	beforeRouteEnter(to, from, next) {
		fromUrl = from.path
		next()
	},
	beforeRouteLeave(to, from, next) {
		this.toUrl = to.path
		next()
	},
	created() {
		this._getServiceParameter()
	},
	activated() {
		console.log(9999999999, this.local)
		this.param.userId = this.user.userId
		this.param.baiduCityId = this.city.cityId
		// 来源路径如果不是/address,清空map数据,重新定位，
		if (fromUrl.indexOf('address') < 0 && this.toUrl.indexOf('agreement') < 0) {
			this.setMap({
				uid: '',
				point: {
					lng: '',
					lat: ''
				},
				title: ''
			})
		}
		// 如果是编辑进来的去除定位
		if (fromUrl.indexOf('home/publish') > -1) {
				this.setLocal({map: {
					uid: '',
					point: {
						lng: '',
						lat: ''
					},
					title: ''
				}})
		} else {
			this._getLocal()
		}
		this.serviceId = this.$route.query.serviceId && this.$route.query.serviceId
		// 如果有服务ID 并且来源不是从选择地址
		if (this.serviceId && fromUrl.indexOf('address') < 0) {
			this.process = 100
			this._getServiceDetails(this.$route.query.serviceId)
		}
		this._getUserAuthStatus(this.user.userId)
	},
	deactivated() {
		this.uploadVisible = false
		this.success = false
		if (this.toUrl.indexOf('address') < 0 && this.toUrl.indexOf('agreement') < 0) {
			this.onePrice = ''
			this.setMap({
				uid: '',
				point: {
					lng: '',
					lat: ''
				},
				title: ''
			})
			this.remainNum = 500
			this.priceTransmit = 0
			this.indexs = 0
			this.param = {
				title: '', // 标题
				serviceDescribe: '', // 描述
				baiduCityId: '', // 城市id
				baiduCityName: '', // 城市名
				longitude: '',
				latitude: '',
				priceNumber: 0, // 价格
				userId: '',
				serviceParentTypeId: '',
				serviceTypeId: '',
				serviceUnitTypeId: '',
				servicePicId: [], // 图片ID
				servicePic: [],
				subscription: '',
				priceType: 1 // 价格类型 一口价/预约金
			}
		}
	},
	computed: {
		...mapGetters(['user', 'city', 'map', 'status', 'local', 'cityList']),
		addressName() {
			let name = '请手动选择'
			if (this.map.title) {
				name = this.map.title
				this.param.longitude = this.map.point.lng
				this.param.latitude = this.map.point.lat
			} else if (this.local.map.uid) {
				name = this.local.map.title
				this.param.longitude = this.local.map.lng
				this.param.latitude = this.local.map.lat
			}
			this.param.baiduCityName = name
			return name
		},
		url() {
				let url = '/home/auth/person'
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
			Upload,
			UploadPicList
	},
	methods: {
		_cancelPrice() {
			this.popupVisible = false
		},
		// 定位
		_getLocal() {
			console.log(234568, this.local)
			getLocal().then(res => {
				res.data.baiduCity.some((item, index) => {
				if (res.city.cityName === item.cityName) {
					res.city.cityId = item.cityId
					return true
				}
			})
			this.setLocal(res)
			})
		},
		_openPicBtn() {
			this.uploadVisible = true
		},
		_openPrice() {
			this.popupVisible = true
			this.priceData[0].defaultIndex = 0
			this.priceNumber = this.priceData[0].values[0]
			this.$nextTick(() => {
				setTimeout(() => {
					this.priceData[0].defaultIndex = 1
					this.priceNumber = this.priceData[0].values[1]
				}, 20)
			})
		},
		// 监听标题字数
		_wacthTitle(e) {
			if (e.target.value.length > 14) {
				e.target.value = e.target.value.slice(0, 14)
				Toast('标题不能多于15个字！')
			}
		},
		// 监听服务详情字数变化
		_setNum(e) {
			if (this.remainNum === 0) {
				e.target.value = e.target.value.slice(0, 500)
				return
			}
			this.remainNum = 500 - e.target.value.length
		},
		// 选择价格类型 1:一口价 2：预约金
		_selectPriceType(type) {
			this.param.priceType = type
			if (type === 1) {
				this.param.subscription = 0
				this.param.priceNumber = this.onePrice || 0
			} else {
				this.param.priceNumber = 0
				this.param.subscription = this.priceTransmit && Number(this.priceTransmit.slice(0, -1))
			}
		},
		// 监听一口价价格
		_changePrice(e) {
			console.log(e.target.value)
			this.param.priceNumber = e.target.value
		},
		// 获取预约金额
		_getServiceParameter() {
			getServiceParameter().then(data => {
				console.log('预约金额')
				if (data.code === '000000') {
					this.priceData[0].values = data.data.serviceSubscription.map(item => {
						return item.subscription + '元'
					})
					this.priceData[0].values.unshift('')
				}
			})
		},
		// 设置预约金价格
		_setPrice() {
			this.param.priceNumber = 0
			this.param.subscription = this.priceTransmit && Number(this.priceTransmit.slice(0, -1))
			this.popupVisible = false
		},
		// 插件方法：获得价格
		getSlotValue(picker, values) {
			this.priceTransmit = values[0]
		},
		// 微信图片上传
		_uploadPicures(files) {
			this.param.servicePic = files.map((item, index) => {
				let picInfo = {
					createOrder: index,
					picName: item
				}
				new Promise((resolve, reject) => {
					wx.uploadImage({
						localId: item,
						success(res) {
							resolve(res.serverId)
						}
					})
				}).then(serverId => {
					alert('返回图片的服务器端ID---' + serverId)
					wx.downloadImage({
						serverId: serverId,
						isShowProgressTips: 1,
						success(ress) {
							alert(' // 返回图片下载后的本地ID' + ress.localId)
							wx.getLocalImgData({
								localId: ress.localId,
								success(d) {
									alert(' //base64' + d.localData)
									let f = dataURLtoBlob(d.localData)
									alert(f)
									let formData = new FormData()
									formData.append('file', f)
									formData.append('createOrder', 0)
									saveServicePicture(formData).then(data => {
										let str = ''
										for (let i in data) {
											str += i + '=' + data[i] + '&'
										}
										alert(str)
									})
								}
							})
						},
						fail(err) {
							let str = ''
							for (let i in err) {
								str += i + '=' + err[i] + '&'
							}
							alert(str)
						}
					})
				})
				return picInfo
			})
		},
		// 上传图片
		_uploadPicure(files) {
			let pictureList = []
			this.uploadVisible = false
			if (this.param.servicePic.length > 6) {
					Toast('最多上传6张图片')
					return
			}
			pictureList = [...files].map((item, index) => {
				this.process = 0
				this.indexs++
				console.log(this.indexs)
				imgPreview(item).then(data => {
				// 上传图片
				let formData = new FormData()
				formData.append('file', data, 'file_' + Date.parse(new Date()) + '.jpg')
				formData.append('createOrder', this.indexs)
				// 上传图片 异步
				saveServicePicture(formData, (data) => {
              let loaded = data.loaded
              let total = data.total
              this.$nextTick(() => {
                this.process = ((loaded / total) * 100).toFixed(2)
                this.processList[item.name] = this.process
              })
            }).then(data => {
            this.process = this.process
            console.log('返回数据')
            console.log(124556, data)
						// 上传服务的图片id
						this.param.servicePicId.push(data.data.servicePicId)
					// 限制图片
					if (this.param.servicePicId.length > 6) {
						this.param.servicePicId = this.param.servicePicId.slice(0, 6)
					}
				})
        })
        // 页面显示图片
        let picInfo = {
         createOrder: index,
         picName: createObjectURL(item),
         name: item.name
        }
        return picInfo
			})
			this.param.servicePic = this.param.servicePic.concat(pictureList)
			if (this.param.servicePic.length > 6) {
				Toast('最多上传6张图片')
				this.param.servicePicId = this.param.servicePicId.slice(0, 6)
				this.param.servicePic = this.param.servicePic.slice(0, 6)
			}
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
				this.serviceInfo.longitude = String(this.serviceInfo.longitude)
				this.serviceInfo.latitude = String(this.serviceInfo.latitude)
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
					console.log(this.param)
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
		// 验证表单
		_validate() {
			if (this.param.title === '') {
				Toast('标题不能为空！')
				return
			}
			if (this.param.title.length > 15) {
				Toast('标题不能多于15个字！')
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
			if (this.param.priceNumber === 0 && this.param.subscription === 0) {
				Toast('价格不能为空')
				return
			}
			if (this.param.baiduCityName === '请选择') {
				Toast('请选择地点')
				return
			}
			if (this.sumbiting) {
				return
			}
			return true
		},
		// 获取服务详情
		_getServiceDetails(id) {
			this.setLoading(true)
			getServiceDetails(id).then(data => {
				this.param = Object.assign({}, this.param, data.serviceInfo)
				console.log(456898, this.param)
				this.serviceInfo = data.serviceInfo
				this.indexs = 0
				this.serviceInfo.servicePic.forEach(item => {
					if (this.indexs < item.createOrder) {
						this.indexs = item.createOrder
					}
				})
				this.indexs += 1
				console.log(1234, data.serviceInfo)
				this.comparePic = data.serviceInfo.servicePic.map(item => {
					return item
				})
				// 设置价格
				if (this.param.priceType === 1) {
					this.onePrice = this.param.priceNumber
					this.priceTransmit = 0
				} else {
					this.priceTransmit = this.param.subscription + '元'
				}
				// 设置地址
				// this._setAddress(this.param.longitude, this.param.latitude)
				this.setMap({
					uid: '',
					point: {
						lng: this.param.longitude,
						lat: this.param.latitude
					},
					title: this.param.baiduCityName
				})
				// 字数显示
				this.remainNum = 500 - this.param.serviceDescribe.length
				data.serviceInfo.servicePic.forEach((item, index) => {
					this.param.servicePicId.push(item.servicePicId)
				})
				this.setLoading(false)
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
				if (typeof val1[key] !== 'string' && typeof val1[key] !== 'number') {
					console.log(typeof val1[key])
					continue
				} else {
					if (val1[key] !== val2[key]) {
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
		// _setAddress(lng, lat) {
		// 	var myGeo = new BMap.Geocoder()
		// 	myGeo.getLocation(new BMap.Point(lng, lat), (result) => {
		// 		this.setMap(result.surroundingPois[0])
		// 	})
		// },
		...mapMutations({
			'setStatus': 'STATUS',
			'setMap': 'MAP',
			'setLocal': 'LOCAL',
			'setLoading': 'LOADING'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.publish-content{
	overflow-y: auto;
	bottom:60px;
	background:#eee;
	.publish-wrap{
		padding: 0 5px;
		background-color: #fff;
	}
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
		margin-bottom:4px;
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
			.text{
				font-size: 0.56rem;
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
			color:#888;
			font-size:0.7rem;
			color:@color-primary;
		}
	}
}
.bar-footer{
		height: 60px;
		line-height: 60px;
		/*background-color: #fff;*/
	&.on{
		z-index: 99
	}
}
.remind-text{
	display: block;
	height: 26px;
	padding-left: 10px;
	font-size: 0.6rem;
}
.success-content{
	bottom:0!important;
	z-index:9990;
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
			border:1px solid @color-primary;
			.size(180px;46px);
			line-height: 44px;
			font-size: 0.7rem;
			&.unauth{
				color: @color-primary;
				border:1px solid @color-primary;
			}
			&.auth{
				background-color: transparent;
				color:@color-primary;
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
.upload::after{
	content:'';
	display: block;
	height: 4px;
	background-color:#eee;
}
</style>