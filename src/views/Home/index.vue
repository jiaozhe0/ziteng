<template>
  <div class="home content">
    <header class="home-header">
    	<div class='home-avatar'>
    		<div class="avatar-img">
    			<img src="./n_meiyou.png" alt="" class="center-block img-responsive">
    		</div>
    	</div>
    	<router-link to='/city' class="home-edit-info" >
	    	<div class="">
	    		<p>18453156726</p>
    			<p>编辑个人资料</p>
	    	</div>
    		<div class="home-icon">
    			d
    		</div>
    		</router-link>
    	
    	<!-- <div class="home-edit-info">点击登录</div> -->
    </header>
    <div class="home-info ">
    	<div class="">
    		<span class="home-info-score">0.00</span>
    		<p class="home-info-text">我的收入</p>
    	</div>
    	<div class="">
    		<span class="home-info-score">0.00</span>
    		<p class="home-info-text">收藏夹</p>
    	</div>
    </div>
    <div class="home-space"></div>
   	 
    <div class="home-list">
    	<mt-cell title="我的发证" is-link :to="user.userId?'/publish':'/login'">
    	</mt-cell>
    	<mt-cell title="我的认证" is-link :to="user.userId?'/city':'/login'">
    	</mt-cell>
    	<mt-cell title="我的评价" is-link :to="user.userId?'/city':'/login'">
    	</mt-cell>
    </div>
    <div class="home-space"></div>
    <div class="home-list">
    	<mt-cell title="常用地址" is-link :to="user.userId?'/city':'/login'">
    	  <span style="color: green"></span>
    	</mt-cell>
    	<mt-cell title="常见问题" icon="sre" is-link>
    	<i slot="icon">dd</i>	
    	  <span style="color: green"></span>
    	</mt-cell>
    	<mt-cell title="投诉举报" is-link>
    	  <span style="color: green"></span>
    	</mt-cell>
    </div>
    <div class="home-space"></div>
    <div class="home-list">
    	<mt-cell title="设置" is-link>
    	  <span style="color: green"></span>
    	</mt-cell>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell } from 'mint-ui'
import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				flag: true
			}
		},
		components: {
			MtCell: Cell
		},
		computed: {
			...mapGetters(['user'])
		},
		mounted() {
		},
		methods: {
		}
	}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
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
		 		background:#fff;
		 		img{
		 			vertical-align: middle;
		 		}
	 	}
	 }
}
.home-info{
	.justify-content(space-around);
	.size(100%;90px);
	 text-align: center;
	 font-size: 0.7rem;
	 background-color: #fff;
	 .home-info-text{
	 		margin-top:5px;
	 }
	 .home-info-score{
	 		font-size: 1.2rem;
	 		color: @color-primary
	 }
}
.mint-cell{
	min-height:46px;
	.mint-cell-text{
		font-size:0.7rem!important;
	}
}

</style>