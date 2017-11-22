<template>
<div class='editAddress'>
 <mt-header :title="title">
		<span v-if="this.$route.query.update" @click="iShow=true">删除</span>
 </mt-header>
 <div class="content">
    <mt-cell title="所在城市：" class="value-input">
    	<input class="edit-input" type="text" :value="param.city ? param.city :city.cityName" disabled>
    </mt-cell>
    <mt-cell class="address-name" title="小区/大厦/写字楼/学校等：" is-link to="/address">
    	<span class="address-text">{{param.area? param.area : '点击选择'}}</span>
    </mt-cell>
    <mt-cell title="门牌号：" class="value-input">
    	<input class="edit-input" v-model="param.houseNumber" type="text" placeholder="例如：5号楼1101室">
    </mt-cell>
    <mt-cell title="联系人：" class="value-input">
    	<input class="edit-input"  v-model="param.receiver" type="text" placeholder="请输入联系人">
    </mt-cell>
     <mt-cell title="性别：" class="value-input">
    	<div class="edit-input">
  		 <label for="women" class="editAddress-radio">
  		 <div class="editAddress-radio-icon" :class="{'selected':param.sex==2}">✓</div>
  		 <input type="radio" id="women" value=2  v-model="param.sex">女士</label>
  		 <label for="man" class="editAddress-radio">
  		  <div class="editAddress-radio-icon" :class="{'selected':param.sex==1}">✓</div>
  		  <input type="radio" id="man" value=1  v-model="param.sex" >男士</label>
    	</div>
    </mt-cell>
     <mt-cell title="联系电话：" class="value-input">
    	<input class="edit-input" name='phone' v-validate="'required|phone'" 
    	v-model="param.phoneNumber"
    	 type="number" 
    	placeholder="请输入联系方式">
    </mt-cell>
			<div class="text-center">
      	<button class="footer-btn editAddress-btn" @click="_saveUserAddress">保存</button>
			</div>
   </div>

    	<div class="mask" v-show="iShow" @click="iShow=false">
    		<div class="payPanel">
    			  <div class="card-content text-center">
    			    <div class="card-content-inner">
    			    确认要删除吗？
    			    </div>
    			  </div>
    			  <div class="card-footer">
    			  	<div class="textOn payPanel-btn" @click="iShow=false">取消</div>
    			  	<div class="textOn payPanel-btn" @click="_deleteAddress">确定</div>
    			  </div>
    		</div>
    	</div>
</div>
</template>

<script type="text/ecmascript-6">
import { Cell, Toast } from 'mint-ui'
import MtHeader from 'components/mtHeader'
import {mapGetters, mapMutations} from 'vuex'
import {saveUserAddress, updateUserAddress, deleteUserAddress} from 'api/home'
export default {
	data() {
		return {
			addressList: [],
			submiting: false,
			iShow: false,
			param: {
				sex: 1,
				userId: '',
				receiver: '', // 联系人
				city: '',
				province: '',
				isDefault: 1,
				baiduCityId: '',
				houseNumber: '',
				longitude: '',
				latitude: '',
				area: '',
				phoneNumber: '',
				addressDetail: ''
			}
		}
	},
	activated() {
		console.log(this.city)
		this.param.city = this.city.cityName
		this.param.baiduCityId = this.city.cityId
		this.param.userId = this.user.userId
		if (this.$route.query.update) {
			this.compareParam = this.address // 比较的地址信息
			this.param = 	Object.assign({}, this.param, this.address)
			console.log(1234, this.param)
		}
		if (this.map.title) {
			this.param.area = this.map.title
			this.param.longitude = this.map.point.lng
			this.param.latitude = this.map.point.lat
			this.param.addressDetail = this.map.address
		}
	},
	deactivated() {
		this.param = {
				sex: 1,
				userId: '',
				receiver: '', // 联系人
				city: '',
				isDefault: 1,
				baiduCityId: '',
				houseNumber: '',
				longitude: '',
				latitude: '',
				area: '',
				phoneNumber: '',
				addressDetail: ''
			}
		let newMap = {
    address: '',
    city: '',
    point: {
      lat: '',
      lng: ''
    },
    title: ''
  }
		this.setMap(newMap)
	},
	components: {
		MtCell: Cell,
		MtHeader
	},
	computed: {
		...mapGetters(['city', 'user', 'map', 'address', 'local']),
		title() {
			return this.$route.query.update ? '修改服务地点' : '新建服务地点'
		}
	},
	methods: {
		_validate() {
			if (this.param.area === '') {
				Toast('地址不能为空！')
				return
			}
			if (this.param.receiver === '') {
				Toast('联系人不能为空！')
				return
			}
			if (this.param.phoneNumber === '') {
				Toast('联系方式不能为空！')
				return
			}
			if (this.errors.has('phone')) {
				Toast(this.errors.items[0].msg)
				return
			}
			if (this.submiting) {
				return
			}
			this.submiting = true
			return true
		},
		_saveUserAddress() {
			if (this.$route.query.update) {
				let flag = true
				for (let i in this.param) {
					if (this.param[i] !== this.compareParam[i]) {
						flag = false
						break
					}
				}
				if (flag) {
					Toast('您未更改信息！')
				} else {
					if (this._validate()) {
						updateUserAddress(this.param).then(data => {
							if (data.code === '000000') {
								Toast('修改成功！')
								this.submiting = false
								this._goBack()
							}
						})
					}
				}
			} else {
				if (this._validate()) {
					saveUserAddress(this.param).then(data => {
						console.log(data)
						if (data.code === '000000') {
							Toast('添加成功！')
							this.submiting = false
							this._goBack()
						}
					})
				}
			}
		},
		_deleteAddress() {
			deleteUserAddress(this.param.addressId).then(data => {
				console.log(data)
				if (data.code === '000000') {
						Toast('删除成功！')
						this._goBack()
					}
			})
		},
		_goBack() {
			setTimeout(() => {
				window.history.back()
			}, 2000)
		},
		...mapMutations({
			setMap: 'MAP'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom: 0;
 	background-color: #eee;
 }
 .edit-input{
 	.editAddress-radio{
 		position: relative;
 		display: inline-block;
 		.size(80px;40px);
 		line-height: 40px;
 		.editAddress-radio-icon{
 			position: relative;
 			display: inline-block;
 			vertical-align: middle;
 			.square(25px);
 			margin-right: 5px;
 			border:1px solid #999;
 			border-radius: 50%;
 			text-align: center;
 			line-height: 25px;
 			color:transparent;
 			&.selected{
 				background-color: @color-primary;
 				color:#fff;
 				border-color: @color-primary
 			}
 		}
 		input{
			display: inline-block;
			position: absolute;
			top:0;
			left:0;
			.size(100%;100%);
			opacity: 0;
 		}
 	}
 }
.editAddress-btn{
	margin-top: 30px;
}
.address-text{
	text-align: right;
	display: inline-block;
}
.card-content-inner{
	height: 124px;
	line-height: 124px
}
</style>