<template>
	<div class="login">
	<mt-header :bg="{'background':'#fff'}" :icon="{color:'#fe5815','font-size':'xx-large'}"></mt-header>
  <div class="content"> 
    <div class="img-wrap center-block">
    <img src="./logo.png" alt="" class="img-responsive"></div>
    
    	<label for="" class='center-block login-group'>
    		<input  v-validate="'required|phone'" v-model="tel" type="number" placeholder="手机号码" class='login-input' name='phone'>
    		<i @click="_reset" class='reset-btn'>X</i>
    	</label>
	    <label for="" class='center-block login-group'>
	    	<input v-validate="'required|digits:6'" name='code' v-model="code" type="number" placeholder="验证码" class='login-input'>
	    	<button type="button" 
	    					class='ver-btn' 
	    					:class="{'on': disabled}"
	    					 @click="_getCode">
	    		<span v-if="!again&&!disabled">获取验证码</span>
	    		<span v-else-if="disabled">倒计时{{time}}秒</span>
	    		<span v-else-if="again">重新发送</span>	
	    	</button>
	    </label>
	    <div class="text-left reminder-text">点击登录，即表示同意《用户协议》</div>
	    <button type="button" class='login-btn' @click="_login">
				登录
	    </button>
   
    <div class="wechat">
    	<p class="wechat-title">第三方登录</p>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui'
import {getTelMessage, bindWeixinUserPhone} from 'api/login'
import MtHeader from 'components/mtHeader'
import {mapMutations, mapGetters} from 'vuex'
export default {
	data() {
	return {
		tel: '',
		code: '',
		time: 60,
		flag: true,
		disabled: false,
		again: false,
		loginFlag: false
	}
	},
	components: {
		MtHeader
	},
	computed: {
		...mapGetters(['user'])
	},
  methods: {
		...mapMutations({
			setUser: 'USER'
		}),
		_reset() {
			this.tel = ''
		},
		// 获取验证码
		_getCode() {
			if (this.errors.has('phone')) {
				Toast(this.errors.items[0].msg)
				return
			}
			let timer = null
			if (this.disabled) {
				return
			}
			if (this.time >= 60) {
			this.disabled = true
			Toast('获取验证码')
			this._getTelMessage(this.tel)
			timer = setInterval(() => {
				if (this.time > 0) {
					this.time--
				} else {
					clearInterval(timer)
					this.time = 60
					this.disabled = false
					this.again = true
				}
			}, 1000)
			}
		},
		_getTelMessage(tel) {
			getTelMessage(tel).then((res) => {
				console.log(res)
			})
		},
		_login() {
			if (this.errors.has('phone')) {
				Toast(this.errors.items[0].msg)
				return
			} else if (this.errors.has('code')) {
				Toast(this.errors.items[0].msg)
				return
			} else if (this.code === '') {
				Toast('请输入验证码！')
				return
			}
			if (this.loginFlag) {
				return
			}
			this.loginFlag = true
			Toast({
				message: '手机绑定中'
			})
			bindWeixinUserPhone(this.$route.query.unionid, this.tel, this.code).then((data) => {
				this.loginFlag = false
				if (data.status && data.status === '1001') {
					Toast('验证码验证失败')
				} else if (data.status && data.status === '1003') {
					Toast('该手机已绑微信')
					this.$router.push('/index')
				} else if (data.userId) {
					this.setUser(data)
					Toast('手机绑定成功')
					this.$router.push('/index')
				}
			})
		},
		...mapMutations({
				setUser: 'USER'
		})
  }
  }
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom: 0;
 	padding: 40px;
 	text-align: center;
 	font-size: 0.7rem;
 	.img-wrap{
 		.size(100px;100px)
 	}
 	.login-input{
 		display: block;
 		position: relative;
 		border: none;
 		.size(100%;40px);
 		line-height: 40px;
 		text-indent: 12px;
 		/*border-bottom: 1px solid @border-default-color;*/
 	}
 	.login-group{
 		position: relative;
		margin: 20px auto;
		.hairline(bottom, @border-default-color);
		.ver-btn,.reset-btn{
			position: absolute;
			right: 0;
			bottom: 5px;
		}
		.ver-btn{
			.size(90px;32px);
			line-height: 32px;
			border: none;
			font-size: 0.6rem;
			background-color: @color-primary;
			color:#fff;
			&.on{
				background-color: #999
			}
		}
		.reset-btn{

		}
 	}
 	.reminder-text{
 		margin-top: -10px;
 		font-size: 0.6rem;
 		color: @color-text-gray
 	}
 	.login-btn{
 		display: block;
 		margin-top: 40px;
 		.size(100%;40px);
 		border: none;
 		border-radius: 40px;
 		background-color: @color-primary;
 		color: #fff;
 	}
 	.wechat-title{
 		position: relative;
 		margin-top: 40px;
 		font-size: 0.6rem;
 		color: @color-text-gray;
 		&:after,&:before{
 			content: '';
	    position: absolute;
	    bottom: 50%;
	    top: auto;
	    height: 1px;
	    width: 30%;
	    background-color: #e7e7e7;
	    display: block;
	    z-index: 15;
	    -webkit-transform-origin: 50% 100%;
	    transform-origin: 50% 100%;
 		};
 		&:after{
			right: 0;
			left:auto;
 		};
 		&:before{
 			left:0;
 			right: auto
 		}
 }
}
</style>