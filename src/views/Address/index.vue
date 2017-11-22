
<template>
<div class="address">
    <search text="搜索您所在的位置" @search="_searchAddress" :ishow="false">
    	<div class="address-city"><span class="addIcon"></span>{{city.cityName}}</div>
    </search>
	<div class="content address-content">
		<div id="allmap" class='map'></div>
		<scroll class="content address-list" :data="addressList">
			<ul class="address-list-wrap">
				<li v-for="item in addressList"
						@click="_setAddress(item)"
					  class='clearfix address-item'>
					<div class="pull-left address-item-icon"></div>
					<div class="address-item-content">
						<span>{{item.title}}</span>
						<p class="address-item-text">{{item.address}}</p>
					</div>
				</li>
			</ul>
			<div class="address-list-title">附近的地点</div>
		</scroll>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Map from 'components/Map'
import MyHeader from 'components/MyHeader'
import Scroll from 'components/Scroll'
import Search from 'components/searchCom/index'
import {mapMutations, mapGetters} from 'vuex'
export default {
	data() {
		return {
			addressList: [],
			cityName: ''
		}
	},
	components: {
		MyMap: Map,
		Scroll,
		MyHeader,
		Search
	},
	activated() {
		console.log(this.local.city.lng + '===' + this.local.city.lat)
		this._initMap()
	},
	computed: {
		...mapGetters(['city', 'local'])
	},
	methods: {
		_searchAddress(value) {
			let options = {
				onSearchComplete: (results) => {
					let address = results.vr
					this.addressList = address
					console.log(666, this.addressList)
					// this._setMap(address[0].point.lng, address[0].point.lat)
				}
			}
			let local = new BMap.LocalSearch(this.map, options)
			local.search(value)
		},
		// 初始化地图
		_initMap() {
			console.log(this.city)
			console.log(12334566, this.local)
			this.map = new BMap.Map('allmap')
			this._setMap(this.local.city.lng, this.local.city.lat, this.city.cityName, true)
			// 坐标移动重新初始化地图
			this.map.addEventListener('dragend', () => {
				let center = this.map.getCenter()
					this._setMap(center.lng, center.lat)
				})
		},
		_setMap(lng, lat, cityName, flag) {
			// alert(lng + '===' + lat)
			// 清除地图
			this.map.clearOverlays()
			let point = null
			console.log(this.local)
			console.log(this.local.city.cityId + '}}}}}}}}' + this.city.cityId)
			if (this.local.city.cityId !== this.city.cityId && flag) {
				this.map.centerAndZoom(cityName, 15)
				let myGeo = new BMap.Geocoder()
				myGeo.getPoint(cityName, (points) => {
					if (points) {
						point = new BMap.Point(points.lng, points.lat)
						this._newMap(point)
					}
				})
			} else {
				// 都需要坐标
				point = new BMap.Point(lng, lat)
				this._newMap(point)
			}
		},
		_newMap(point) {
			this.map.centerAndZoom(point, 15)
			let marker = new BMap.Marker(point)
			this.map.addOverlay(marker)
			var myGeo = new BMap.Geocoder()
			// 根据坐标得到地址描述
			myGeo.getLocation(point, (result) => {
				if (result) {
					console.log(1234, result)
					this.addressList = result.surroundingPois
					console.log(456, this.addressList)
				}
			})
		},
		_setAddress(address) {
			console.log(234, address)
			this.setMap(address)
			window.history.back()
		},
		...mapMutations({
			setMap: 'MAP'
		})
}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.address-content{
	bottom:0;
	.map{
		.size(100%;220px);
	}
}
.address-list{
	top:220px;
	bottom: 0;
	.address-list-title {
		position: absolute;
		top:0;
		.size(100%;30px);
		padding: 0 15px;
		background-color: #eee;
		font-size: 0.6rem;
		line-height: 30px;
	}
	.address-list-wrap{
		margin-top: 30px;
		height: auto;
	}
	.address-item{
		padding: 0 15px;
		font-size: 0.68rem;
		.address-item-icon{
			.square(16px);
			background-size: 16px 16px;
			margin-top: 8px;
			.bg-view-image('Address/dizhi');
		}
		.address-item-content{
			margin-left: 26px;
			padding: 6px 0;
			border-bottom:1px solid @color-split;
		}
		.address-item-text{
			margin: 2px 0 0;
			font-size: 0.54rem;
			color: @color-text-gray;
		}
	}
}
.address-city{
	width:70px;
	.text-overflow()
}
.addIcon{
	display: inline-block;
	.square(15px);
	margin-right: 2px;
	vertical-align: top;
	.bg-view-image('Address/dizhi');
	background-size: 15px 15px;

}
</style>