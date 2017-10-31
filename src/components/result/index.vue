<template>
		<div class="content success-content text-center"
				 v-show='success'>
			<div class="success-icon center-block">
				<div class="icon"></div>
			</div>

			<div v-if="typeName == 'service'">
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

			<div v-else>
				<strong>举报已成功提交</strong>
				<p class="success-text">
				我们会在3个工作日内处理，并第一时间向您反馈
				</p>
				<div class="success-btn-wrap">
					<button @click="_back" class="auth-btn auth">知道了</button>
				</div>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		typeName: {
			type: String,
			default: 'service'
		},
		success: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		_back() {
			this.$emit('back')
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
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
			.bg-image('result/authSuccess')
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