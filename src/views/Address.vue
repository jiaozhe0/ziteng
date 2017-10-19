<template>
<div>
    <search text="搜索您所在的位置" @search="_searchAddress">
    	<div class="address-city"><span>dd</span>{{city.cityName}}</div>
    </search>
	<div class="content address-content">
		<div id="allmap" class='map'></div>
		<scroll class="content address-list" :data="addressList">
			<ul class="address-list-wrap">
				<li v-for="item in addressList"
						@click="_setAddress(item)"
					  class='clearfix address-item'>
					<div class="pull-left address-item-icon">icon</div>
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
import Search from 'components/SearchCom'
import {mapMutations, mapGetters} from 'vuex'
export default {
	data() {
		return {
			addressList: []
		}
	},
	components: {
		MyMap: Map,
		Scroll,
		MyHeader,
		Search
	},
	mounted() {
		this._initMap()
	},
	computed: {
		...mapGetters(['city'])
	},
	methods: {
		_searchAddress(value) {
			let options = {
				onSearchComplete: (results) => {
					console.log(results)
					let address = results.vr
					this.addressList = address
					this._setMap(address[0].point.lng, address[0].point.lat)
				}
			}
			let local = new BMap.LocalSearch(this.map, options)
			local.search(value)
		},
		// 初始化地图
		_initMap() {
			this.map = new BMap.Map('allmap')
			this._setMap(this.city.lng, this.city.lat)
			this.map.addEventListener('dragend', () => {
			let center = this.map.getCenter()
				this._setMap(center.lng, center.lat)
			})
		},
		_setMap(lng, lat) {
			console.log(lng, lat)
			this.map.clearOverlays()
			let point = new BMap.Point(lng, lat)
			this.map.centerAndZoom(point, 15)

			let marker = new BMap.Marker(point)
			this.map.addOverlay(marker)
			var myGeo = new BMap.Geocoder()
			// 根据坐标得到地址描述
			myGeo.getLocation(point, (result) => {
				if (result) {
					console.log(1234, result)
					this.addressList = result.surroundingPois
				}
			})
		},
		_setAddress(address) {
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
 @import '~common/css/mixin.less';
.address-content{
	bottom:0;
	.map{
		.size(100%;180px);
	}
}
.address-list{
	top:180px;
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
			width: 30px;
			padding: 8px 0;
		}
		.address-item-content{
			margin-left: 40px;
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
}
</style>