<template>
<ul class="addressList">
	<li v-for='item in addressList' class="addressList-item" @click="_goOrder(item)">
		<div class="addressList-userInfo">
			<div class="address-userInfo-userName pull-left">{{item.receiver}}</div>
			{{item.phoneNumber}}
		</div>
		<div class="addressList-info">
			<div class="addressList-info-text">{{item.addressDetail}}
			</div>
			<div class="edit-address-btn" @click="_goAddress(item)"><div class="icon"></div></div>
		</div>
	</li>
</ul>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
export default {
	props: ['addressList'],
	methods: {
		_goAddress(address) {
			this.setAddress(address)
			this.$router.push({path: '/address/edit', query: {update: true}})
		},
		_goOrder(item) {
			console.log(item.area)
			if (this.$route.query.order) {
				this.$router.push({path: '/service/order', query: {address: item.area, id: item.addressId}})
			}
		},
		...mapMutations({
			setAddress: 'ADDRESS'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .addressList-info{
 	.flexbox();
 	.justify-content(space-between);
 	.align-items(center);
 	.addressList-info-text{

 	}
 }
 .addressList{
 	margin: 0;
 	font-size:0.7rem;
 	.addressList-item{
 		padding:10px 15px;
 		background-color: #fff;
 		margin-bottom: 8px;
 		.addressList-userInfo{
 			margin-bottom: 5px;
 		}
 		.address-userInfo-userName{
 			margin-right:20px;
 		}
 		.addressList-info{
 			color:@color-text-gray;
 			font-size: 0.6rem;
 			.addressList-info-text{
 				width:80%;
 			}
 			.edit-address-btn{
 				border-left:1px solid @color-split;
 				padding-left:15px;
 				.icon{
 					.square(20px);
 					background-size: 20px 20px;
 					.bg-image('AddressList/time')
 				}
 			}
 		}
 		
 	}
 }

</style>