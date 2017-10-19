<template>
<div class="personAuth">
	<mt-header title="我的认证" path="/home"></mt-header>
	<div class="content personAuth-content">
		<router-link to="" class='personAuth-item center-block zhima' tag="div">
			<div class="personAuth-item-icon">
			 <div class="icon">
			 </div>
			 <div>芝麻信用
			 	 <p class="explain-text">{{zhimaText}}</p>
			 </div>
			</div>
			<div class="personAuth-item-btn">
				<button v-if="authStatus.authProfessionalStatus !== 4">去认证</button>
			</div>
		</router-link>
		<router-link to="/home/auth/person/skill" class='personAuth-item center-block skill' tag="div">
			<div class="personAuth-item-icon">
			 <div class="icon">
			 </div>
			 <div>技能认证
			 	 <p class="explain-text">{{skillText}}</p>
			 </div>
			</div>
			<div class="personAuth-item-btn">
				<button v-if="authStatus.authZhimaxinyongStatus !== 4">去认证</button>
				<div v-else>
					<div class="success-icon"></div>
					已授权
			  	</div>
			</div>
		</router-link>
		<router-link to="/home/auth/person/name" class='personAuth-item center-block realName' tag="div">
			<div class="personAuth-item-icon">
			 <div class="icon">
			 </div>
			 <div>实名认证
			 	 <p class="explain-text">{{nameText}}</p>
			 </div>
			</div>
			<div class="personAuth-item-btn">
				<button v-if="authStatus.authUserIdStatus !== 4">去认证</button>
				<div v-else>
					<div class="success-icon"></div>
					已授权
				</div>
			</div>
		</router-link>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {mapGetters} from 'vuex'
import {getUserAuthStatus} from 'api/home'
export default {
	components: {
		MtHeader
	},
	data() {
		return {
			authStatus: {
				authStatusId: '',
				authBusinessStatus: 1,
				authZhimaxinyongStatus: 1, // 芝麻
				authUserIdStatus: 1, // 实名
				authProfessionalStatus: 1 // 技能
			}
		}
	},
	created() {
		this._getUserAuthStatus(this.user.userId)
	},
	computed: {
		...mapGetters(['user']),
		nameText() {
			let text = '您还未进行实名认证'
			if (this.authStatus.authUserIdStatus === 4) {
				text = '您已实名认证'
			}
			return text
		},
		zhimaText() {
			let text = '您还未认证芝麻信用'
			if (this.authStatus.authUserIdStatus === 4) {
				text = '您已实名认证'
			}
			return text
		},
		skillText() {
			let text = '您还未认证职业技能'
			if (this.authStatus.authUserIdStatus === 4) {
				text = '您已通过认证职业技能'
			}
			return text
		}
	},
	methods: {
		_getUserAuthStatus(id) {
			getUserAuthStatus(id).then((data) => {
				if (data.code === '000000') {
					this.authStatus = data.data[0]
				}
			})
		}
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
@color-skill:#f79e45;
@color-realName:#f25f14;
@color-zhima:#59c3bc;
.personAuth-content{
	padding:20px 15px;
	bottom:0;
}
.personAuth-item{
	.flexbox();
	.justify-content(space-between);
	.align-items(center);
	.size(100%;100px);
	border-radius: 10px;
	overflow: hidden;
	color:#fff;
	margin-bottom: 20px;
	.personAuth-item-btn{
		.flexbox();
		.align-items(center);
		.justify-content(center);
		.size(35%;100px);
		font-size: 0.7rem;
		.success-icon{
			.square(30px);
			margin:0 auto;
			background-size: 30px 30px;
			.bg-view-image('personAuth/authSuccess')
		}
		button{
			border:1px solid #fff;
			background: transparent;
			border-radius: 5px;
			padding: 5px 10px;
		}
	}
	.personAuth-item-icon{
		flex: 1;
		.flexbox();
		.justify-content(space-around);
		.align-items(center);
		 font-size: 0.8rem;
		.explain-text{
			font-size: 0.6rem;
			margin:4px 0;
		}
		.icon{
			.square(60px);
			background-size: 60px 60px;
		}
	}
	&.zhima{
		background-color: @color-zhima;
		box-shadow: 0 2px 8px @color-zhima;
		.personAuth-item-btn{
			background-color: darken(@color-zhima,15%)
		}
		.icon{
			.bg-view-image('personAuth/bigZhima')
		}
	}
	&.skill{
		background-color: @color-skill;
		box-shadow: 0 2px 8px @color-skill;
		.personAuth-item-btn{
			background-color: darken(@color-skill,15%)
		}
		.icon{
			.bg-view-image('personAuth/bigJinneg')
		}
	}
	&.realName{
		background-color: @color-realName;
		box-shadow: 0 2px 8px @color-realName;
		.personAuth-item-btn{
			background-color: darken(@color-realName,15%)
		}
		.icon{
			.bg-view-image('personAuth/bigShiming')
		}
	}
}

</style>