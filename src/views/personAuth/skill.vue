<template>
<div class="skill">
     <router-view @upload='_upload'></router-view>
		<div>
    <mt-header title="职业技能认证" path='/home/auth/person'></mt-header>
    <div class="content skill-content">
    	<p>任选一下任意材料上传，证明你的职业/技能</p>
    	<div class="row">
    	 <!-- 名片 -->
    		<router-link :to="{path: '/home/auth/person/skill/card', query:{status:nameCard.authStatus, pic: nameCard.professionalPic}}" class="col-50 skill-item" tag="div">
    			<div class='skill-item-content'>
	    			<div class="skill-item-picture nameCard" 
	    					:class="{'nameCard': nameCard.authStatus == 4}"></div>
	    			<p>名片认证<span class='danger'v-show="nameCard.authStatus > 1">({{_status(nameCard.authStatus)}})</span></p>
    			</div>
    		</router-link>

    		<!-- 在职证明 -->
    		<router-link :to="{path:'/home/auth/person/skill/job',query: {status:job.authStatus, pic: job.professionalPic}}" class="col-50 skill-item" tag="div">
    			<div class='skill-item-content'>
    			<div class="skill-item-picture square job"
    					 :class="{'jobOn': job.authStatus == 4}"></div>
    			<p>在职证明 <span class='danger'v-show="job.authStatus > 1">({{_status(job.authStatus)}})</span>
    			</p>
    			</div>
    		</router-link>

    		<!-- 工牌 -->
    		<router-link :to="{path:'/home/auth/person/skill/workcard',query: {status:workCard.authStatus, pic: workCard.professionalPic}}" class="col-50 skill-item" tag="div">
	    		<div class='skill-item-content'>
	    			<div class="skill-item-picture square workcard"
	    					 :class="{'workcardOn': workCard.authStatus == 4}"></div>
	    			<p>工牌认证 <span class='danger' v-show="workCard.authStatus > 1">({{_status(workCard.authStatus)}})</span></p>
	    		</div>
    		</router-link>
				
				<!-- 技能 -->
    		<router-link :to="{path:'/home/auth/person/skill/skill',query: {status:skill.authStatus, pic: skill.professionalPic}}" class="col-50 skill-item" tag="div">
	    		<div class='skill-item-content'>
	    			<div class="skill-item-picture square skill"
	    					:class="{'skillOn': skill.authStatus == 4}"></div>
	    			<p>技能证书 <span class='danger'v-show="skill.authStatus > 1">({{_status(skill.authStatus)}})</span>
	    			</p>
	    			</div>
    		</router-link>
				
    </div>
    <p class='danger'>进行技能认证，可以让用户更加相信您的服务哦！</p>
    </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {getUserAuthProfessional} from 'api/home'
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			nameCard: {
				professionalTypeId: '',
				professionalPic: '',
				authStatus: 0,
				professionalId: ''
			},
			job: {
				professionalTypeId: '',
				professionalPic: '',
				authStatus: 0,
				professionalId: ''
			},
			workCard: {
				professionalTypeId: '',
				professionalPic: '',
				authStatus: 0,
				professionalId: ''
			},
			skill: {
				professionalTypeId: '',
				professionalPic: '',
				authStatus: 0,
				professionalId: ''
			}
		}
	},
	components: {
		MtHeader
	},
	// created() {
	// 	this._getUserAuthProfessional(this.user.userId)
	// },
	activated() {
		this._getUserAuthProfessional(this.user.userId)
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		_getUserAuthProfessional(id) {
			getUserAuthProfessional(id).then(data => {
				console.log(123, data)
				if (data.code === '000000' && data.data) {
					data.data.forEach((item) => {
						switch (item.professionalTypeId) {
							case 1:
								this.nameCard = item
								break
							case 2:
								this.job = item
								break
							case 3:
								this.workCard = item
								break
							case 4:
								this.skill = item
								break
						}
					})
				}
			})
		},
		_status(status) {
			let statusText = ''
			switch (status) {
				case 1:
					statusText = '未提交审核'
					break
				case 2:
					statusText = '审核中'
					break
				case 3:
					statusText = '审核失败'
					break
				case 4:
					statusText = '审核成功'
					break
			}
			return statusText
		},
		_upload() {
			this._getUserAuthProfessional(this.user.userId)
		}
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
.skill-content{
	bottom:0;
	background:#eee;
	padding: 0 10px;
	font-size: 0.7rem;
	p{
		margin: 8px 0;
		font-size: 0.6rem;
		color:@color-text-gray;
	}
}
div.skill-item{
	position: relative;
	height: 100px;
	margin-bottom: 15px;
	background-color: #fff;
	border-radius: 5px;
	text-align: center;
	&:last-child,&:nth-child(3){
		margin-bottom:0;
	}
	.skill-item-content{
		position: absolute;
		width: 80%;
		left: 50%;
		top: 50%;
		transform: translate(-50%;-50%);
	}
	.skill-item-picture{
		.size(40px;30px);
		background-repeat: no-repeat;
		background-size: 40px 30px;
		.center-block();
		&.square{
			.square(30px);
			background-size: 30px 30px;
		}
		&.nameCard{
			.bg-view-image('personAuth/nameCardNo')
		}
		&.job{
			.bg-view-image('personAuth/onJobNO')
		}
		&.workcard{
			.bg-view-image('personAuth/workCardNo')
		}
		&.skill{
			.bg-view-image('personAuth/certificateNO')
		}

		&.nameCardOn{
			.bg-view-image('personAuth/nameCard')
		}
		&.jobOn{
			.bg-view-image('personAuth/onJob')
		}
		&.workcardOn{
			.bg-view-image('personAuth/workCard')
		}
		&.skillOn{
			.bg-view-image('personAuth/certificate')
		}
	}
}

</style>