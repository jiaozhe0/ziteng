<template>
 <div class='serDetial'>
    <mt-header :bg="{'background':'rgba(0,0,0,.4)','zIndex':200}"></mt-header>
		<scroll class='content'>
			<div class="serDetial-content">
				<mt-swipe :auto="4000">
				  <mt-swipe-item>1sdf</mt-swipe-item>
				  <mt-swipe-item>2sdf</mt-swipe-item>
				  <mt-swipe-item>3sdfsdf</mt-swipe-item>
				</mt-swipe>
				<div class="serDetial-top clearfix">
					<div class="pull-left">
						<div class="serDetial-service-title">擦拭玻璃</div>
						<div class="serDetial-estimate"> 
						<span>好评度： <strong>122</strong></span>
						<span>销量: <strong>455</strong></span>
						</div>
					</div>
					<div class="pull-right serDetial-price">
						<div class="">100.0</div>
						<div class="serDetial-unit">元/小时</div>
					</div>
				</div>
				<!-- 服务描述 -->
				<div class="card">
			    <div class="card-header">
			    	<div class="serDtial-title">
			    		服务描述
			    	</div>
			    </div>
			    <div class="card-content">
			      <div class="card-content-inner">头和尾的卡片。卡头是用来显示一些额外的信息，或自定义操作卡标题和页脚。</div>
			    </div>
			  </div>
			  <!-- 服务预约时间 -->
			  <div class="card">
			    <div class="card-header">
			    	<div class="serDtial-title">
			    		建议预约时间
			    	</div>
			    </div>
			    <div class="card-content">
			      <div class="card-content-inner">头和尾的卡片。卡头是用来显示一些额外的信息，或自定义操作卡标题和页脚。</div>
			    </div>
			  </div>
			  <!-- 服务者信息 -->
			  <div class="card">
			    <div class="card-header">
			    	<div>
			    		<div class="avatar-wrap pull-left">
			    			<img src="" alt="">
			    		</div>
			    		<div class="pull-left">
			    			<div>服务者信息</div>
			    			<div>认证</div>
			    		</div>
			    	</div>
			    </div>
			    <div class="card-content">
			      <div class="card-content-inner">头和尾的卡片。卡头是用来显示一些额外的信息，或自定义操作卡标题和页脚。</div>
			    </div>
			  </div>
			</div>
		</scroll>
		<div class="bar bar-footer serDetial-footer">
			<div class="store-btn">收藏</div>
			<div class="message-btn">发消息</div>
			<div class="order-btn">立即下单</div>
		</div>
 </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {Swipe, SwipeItem} from 'mint-ui'
import {mapMutations} from 'vuex'
export default {
	data() {
		return {}
	},
	created() {
		this.setFooter()
	},
	components: {
		MtHeader,
		Scroll,
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem
	},
	methods: {
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	top:0;
 	background:#eee
 }
 .serDetial-top{
	 	background:#fff;
	 	padding:0.5rem 0.75rem;
	 	.serDetial-service-title{
	 		font-size:0.8rem
	 	}
	 	.serDetial-estimate{
	 		color:@color-text-secondary;
	 		font-size:0.6rem;
	 		span{
	 			margin:0 0.5rem 0 0
	 		}
	 		strong{
	 			font-weight: normal;
	 			color: @color-primary
	 		}
	 	}
	 	.serDetial-price{
	 		color:@color-primary
	 	}
	 	.serDetial-unit{
	 		font-size:0.6rem;
	 	}
 }
 .card{
 	.serDtial-title{
 		border-left:4px solid red;
 		padding-left:10px;
 	}
 }

.serDetial-footer{
	.flexbox();
  .flex-wrap(nowrap);
  .justify-content(space-between);
  .align-items(stretch);
  .size(100%;50px);
	text-align: center;
	line-height: 50px;
	background-color: #fff;
	color: @color-text-secondary;
	font-size: 0.7rem;
	.message-btn,.store-btn{
		width: 25%;
		text-align: center;
		flex:1;
	}
	.store-btn{
		border-right: 1px solid @color-split;
	}
	.order-btn{
		width: 50%;
		background-color: #F04848;
		color:#fff;
	}
}
 .mint-swipe{
 	background:red;
 	.size(100%;300px)
 }

</style>