<template>
  <div class='publish' >
  	<mt-header title="选择常用地址"></mt-header>
    <div class="content" :class="{'noData':!addressList.length}">
    	<div class="no-publish" v-if="!addressList.length">
    		<div class="img-wrap">
    		</div>
    		<strong>没有服务地点</strong>
    		<p>还没发过服务地点，快去添加一个吧英雄！</p>
    		<router-link to='/address/edit' class='ser-btn center-block'>
    			添加服务地点
    		</router-link>	
    	</div>
			<address-list v-else :addressList="addressList" :isEdit="!!$route.query.order"></address-list>
    </div>
    <div class="bar footer-btn-wrap bar-footer" v-show="addressList.length">
    	<router-link to="/address/edit" class="footer-btn">新建地址</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {mapMutations, mapGetters} from 'vuex'
import AddressList from 'components/AddressList/index'
import {getUserAddressList} from 'api/home'
export default {
	data() {
		return {
			addressList: []
		}
	},
	activated() {
		this.setFooters(false)
		this._getUserAddressList(this.user.userId)
	},
	computed: {
		...mapGetters(['user'])
	},
	deactivated() {
		this.setFooters(true)
	},
	components: {
			MtHeader,
			AddressList
	},
	methods: {
		...mapMutations({
			setFooters: 'CHANGE_FOOTER_SHOW'
		}),
		_getUserAddressList(userId) {
			getUserAddressList(userId).then(data => {
				console.log(23, data)
				this.addressList = data
			})
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.content{
	background:#eee;
	.noData{
		bottom:0;
	}
}
.no-publish{
	margin-top: 40px;
	text-align: center;
	strong{
		font-size: 0.8rem;
		font-weight: 400;
		color: @color-primary
	}
	&>p{
		margin: 2px auto 30px;
		font-size: 0.6rem;
	}
	.img-wrap{
		.size(375px;180px);
		background-size: 375px 180px;
		margin-bottom: 30px;
		.bg-view-image('MyPublish/noService')
	}
	.ser-btn{
		.size(200px;36px);
		line-height: 36px;
		color: #fff;
		border-radius: 6px;
		background-color: @color-primary;
		font-size: 0.65rem;
	}
}
</style>