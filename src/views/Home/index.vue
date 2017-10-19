<template>
  <div class="home content">
    <header class="home-header">
    	<div class='home-avatar'>
    		<div class="avatar-img">
					<img :src="userInfo.photoUrl" alt="" class="center-block img-responsive" v-if="userInfo.photoUrl">
    			<img src="./n_meiyou.png" alt="" class="center-block img-responsive" v-else>
    		</div>
    	</div>
    	<router-link :to="user.userId?'/home/info':'/login'" class="home-edit-info" >
	    	<div class="home-header-userInfo">
	    		<p>{{userInfo.userName}}</p>
    			<p>编辑个人资料</p>
	    	</div>
    		<div class="home-icon">
    			&gt;
    		</div>
    		</router-link>
    	
    	<!-- <div class="home-edit-info">点击登录</div> -->
    </header>
    <div class="home-info ">
    	<div class="home-info-total">
    		<span class="home-info-score">{{total}}</span>
    		<p class="home-info-text">我的收入</p>
    	</div>
    	<router-link to='/home/collect' class="" tag="div">
    		<span class="home-info-score">{{collectionCount}}</span>
    		<p class="home-info-text">收藏夹</p>
    	</router-link >
    </div>
    <div class="home-space"></div>
   	 
    <div class="home-list">
    	<mt-cell title="我的发布" is-link :to="user.userId?'/home/publish':'/login'">
    	<i slot="icon" class="icon publish"></i>
    	</mt-cell>
    	<mt-cell title="我的认证" is-link :to="user.userId? url:'/login'">
    	<i slot="icon" class="icon auth"></i>
    	</mt-cell>
    	<mt-cell title="我的评价" is-link :to="user.userId?'/home/evaluate/my':'/login'">
    	<i slot="icon" class="icon commet"></i>
    	</mt-cell>
    </div>
    <div class="home-space"></div>
    <div class="home-list">
    	<mt-cell title="常用地址" is-link :to="user.userId?'/home/address':'/login'">
    	<i slot="icon" class="icon address"></i>
    	</mt-cell>
    	<mt-cell title="投诉举报" icon="sre" is-link :to="user.userId?'/home/report':'/login'">
    	<i slot="icon" class='icon complain'></i>	
    	</mt-cell>
    </div>
    <div class="home-space"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell } from 'mint-ui'
import {mapGetters, mapMutations} from 'vuex'
import {getIndexInfo, getSerColCount, getTotal, getUserAuthStatus} from 'api/home.js'
	export default {
		data() {
			return {
				flag: true,
				collectionCount: 0,
				total: 0,
				url: '/home/auth'
			}
		},
		activated() {
			this._getIndexInfo(this.user.userId)
			this._getSerColCount(this.user.userId)
			this._getTotal(this.user.userId)
			this._getUserAuthStatus(this.user.userId)
		},
		components: {
			MtCell: Cell
		},
		computed: {
			...mapGetters(['user', 'userInfo'])
		},
		mounted() {
			document.title = '关于我们'
		},
		methods: {
			_getIndexInfo(userId) {
				getIndexInfo(userId).then((data) => {
					this.setUserInfo(data)
				})
			},
			_getSerColCount(userId) {
				getSerColCount(userId).then(data => {
					this.collectionCount = data
				})
			},
			_getTotal(userId) {
				getTotal(userId).then(data => {
					this.total = data.total
				})
			},
			_getUserAuthStatus(id) {
				getUserAuthStatus(id).then(data => {
					if (data.code === '000000') {
						let auth = data.data[0]
						if (auth.authBusinessStatus > 1) {
							this.url = '/home/auth/server'
							this.setStatus('bussion')
						} else {
							if (auth.authProfessionalStatus > 1 || auth.authUserIdStatus > 1 || auth.authZhimaxinyongStatus) {
								this.url = '/home/auth/person'
								this.setStatus('person')
							}
						}
					}
				})
			},
			...mapMutations({
				setUserInfo: 'USERINFO',
				setStatus: 'STATUS'
			})
		}
	}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
 .content{
 	top:0;
 	background-color: #eee;
 }
.home-header,.home-header .home-edit-info,.home-info {
	 		width:70%;
	 		.flexbox();
	 		.flex-wrap(nowrap);
	 		.justify-content(space-between);
	 		.align-items(center);
	 		 overflow: hidden;
	 	}
.home-edit-info{
	color:#fff;
}
.home-header{
	.size(100%;110px);
	 padding: 15px;
	 background:@color-primary;
	 color:#fff;
	 font-size:0.7rem;
	 .home-avatar{
		 	.avatar-img{
		 		display: table-cell;
		 		text-align: center;
		 		vertical-align: middle;
		 		.square(78px);
		 		border:2px solid #fff;
		 		background:#fff;
		 		img{
		 			vertical-align: middle;
		 		}
	 	}
	 }
	 .home-header-userInfo{
	 	&>p{
	 		font-size: 0.6rem;
	 		margin:0;
	 	}
	 }
}
.home-info{
	.justify-content(space-around);
	.size(100%;80px);
	 text-align: center;
	 font-size: 0.6rem;
	 background-color: #fff;
	 position: relative;
	 .home-info-text{
	 		margin-top:0;
	 }
	 .home-info-score{
	 		font-size: 1.2rem;
	 		color: @color-primary
	 }
	 &:after{
	 	content:'';
	 	position: absolute;
	 	border-right:1px solid @color-split;
	 	height: 60px;
	 }
}
.icon{
	display: inline-block;
	margin-right: 5px;
	vertical-align: middle;
	.square(20px);
	background-size: 20px 20px;
	&.publish{
		.bg-view-image('Home/myPublish')
	}
	&.address{
		.bg-view-image('Home/myAddress')
	}
	&.auth{
		.bg-view-image('Home/myCertify')
	}
	&.commet{
		.bg-view-image('Home/myCommet')
	}
	&.complain{
		.bg-view-image('Home/complain')
	}
}

</style>