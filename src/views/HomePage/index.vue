<template>
<div class='homePage'>
   <mt-header title="个人主页"></mt-header>
   <div class="content" ref='wrap'>
   	<div class="homePage-header" ref='header'>
			<div class="homepage-header-content" >
   		<div class="homePage-top"></div>
   		<div class="homePage-info card text-center" ref='main'>
   			<div class="card-content" >
   				<div class="card-content-inner">
   					<div class="avatar-img" ref='avatar'>
							<img :src="server.photoUrl" 
							alt="" 
							class="img-responsive" 
							v-if="server.photoUrl">
   						<img src="./n_meiyou.png" alt="" v-else>
   					</div>
   					<div class="homePage-info-text" ref='userInfo'>
   						<strong class="userName">{{server.userName}}</strong>
							<p class="serviceTime">服务次数:&nbsp;{{server.salesNumber}}</p>
   					</div>
   				</div>
   			</div>
				<div class="approve card-footer">
					<certify :size="18"
									 :name="serverStatus.authUserIdStatus"
									 :skill="serverStatus.authProfessionalStatus"
									 :bussiness="serverStatus.authBusinessStatus"
									 :zhima="serverStatus.authZhimaxinyongStatus"	
					></certify>
				</div>
   		</div>
   		</div>
   	</div>
   	<div class="serviceList" ref='serviceWrap'>
   		<div class='ll'>
   		<div class="evaluate" >
   			<mt-cell :title="'用户评价('+server.evaluateNumber+')'" is-link @click.native="_goEvaluate">
   			  <span>全部</span>
   			</mt-cell>
   		</div>
   	  	<div class="title">TA发布的服务</div>
   			<scroller :dataList="serviceList" 
   			clsss="scroller" 
   			:loadIcon="loading"
   			:refreshIcon="refreshing"
   			@refresh="_refresh" 
   			@loadMore="_loadMore">	
   			<service-list :serviceList="serviceList" :homeStyle="true"></service-list>
   		 </scroller>	
   		</div>
   	</div>
   </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import ServiceList from 'components/ServiceList'
import {mapMutations, mapGetters} from 'vuex'
import {getOtherUserServiceList, getUserAllInfo} from 'api/service'
import { Cell, Toast } from 'mint-ui'
import Certify from 'components/Certify/index'
export default {
	data() {
		return {
			serviceList: [],
			refreshText: '下拉',
			server: {},
			serverStatus: {},
			isMore: false,
			loading: false,
			refreshing: false,
			requestData: {
				userId: '',
				page: {
					currentPage: 0
				}
			}
		}
	},
	components: {
		MtHeader,
		Scroller,
		Cell,
		ServiceList,
		Certify
	},
	computed: {
		...mapGetters(['user', 'config'])
	},
	activated() {
		this._getUserAllInfo(this.$route.query.userId)
		this._getOtherUserServiceList()
	},
	mounted() {
		this.height = window.innerHeight
		this.$refs.wrap.onscroll = (e) => {
			console.log(e.target.scrollTop)
			if (this.timer) {
				clearInterval(this.timer)
			}
			this.timer = setInterval(() => {
				this.$refs.avatar.style.transform = `scale(${1 - e.target.scrollTop / 260})`
				this.$refs.avatar.style.webkitTransform = `scale(${1 - e.target.scrollTop / 260})`
				this.$refs.avatar.style.opacity = `${1 - e.target.scrollTop / 260}`
				this.$refs.main.style.height = `${110 - e.target.scrollTop / 26})px`
			}, 0)
		}
		this.$nextTick(function() {
			this.$refs.serviceWrap.style.height = `${this.height - 44}px`
			this.$refs.s.$refs.wrapper.style.height = `${this.height - 140}px`
		})
	},
	deactivated() {
		this.$root.config = {
			title: '桔子生活', // 分享标题
			desc: '身边的生活服务专家,都在桔子生活',
			imgUrl: 'https://static.vux.li/logo_520.png',
			link: window.location.href
		}
	},
	methods: {
		_goEvaluate() {
			this.$router.push({path: '/home/evaluate/server', query: {serviceUserId: this.$route.query.userId}})
		},
		_getUserAllInfo(data) {
			getUserAllInfo(data).then((data) => {
				console.log(123, data)
				this.server = data
				this.serverStatus = data.userAuthStatuss[0]
				// 设置分享内容
				if (this.user.userId === this.server.userId) {
					this.$root.config = {
						title: `想知道我有哪些超级技能？快进来围观我的个人主页吧`,
						desc: '身边的生活服务专家,都在桔子生活',
						imgUrl: this.server.photoUrl,
						link: window.location.href
					}
				} else {
					this.$root.config = {
						title: '我发现了一个师傅,手艺不孬,推荐给各位',
						desc: '身边的生活服务专家,都在桔子生活',
						imgUrl: this.server.photoUrl,
						link: window.location.href
					}
				}
			})
		},
		_getOtherUserServiceList() {
			this.requestData.userId = this.$route.query.userId
			this.refreshing = true
			this.requestData.page.currentPage = 0
			getOtherUserServiceList(this.requestData).then((data) => {
				console.log(124, data)
				this._processData(data)
			})
		},
		// 加载更多
		_loadMore() {
			if (this.loading) {
				return
			}
			if (this.isMore) {
				Toast('数据加载完成')
				return
			}
			alert('上拉加载')
			this.loading = true
			this.requestData.page.currentPage += 1
			getOtherUserServiceList(this.requestData).then((data) => {
				console.log(456, data)
				this._processData(data, true)
			})
		},
		// 刷新
		_refresh() {
			this.refreshing = true
			this._getOtherUserServiceList()
		},
		// 数据处理
		_processData(data, flag) {
			if (!data.length) {
				Toast('暂无数据')
				return
			}
			if (flag) {
				this.serviceList = this.serviceList.concat(data)
				if (data.length < 15) {
					this.isMore = true
				}
				this.loading = false
			} else {
				this.isMore = false
				this.serviceList = data
				this.refreshing = false
			}
		},
		...mapMutations({
			setConfig: 'CONFIG'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.content{
	bottom:0;
	overflow-y: auto;
	background-color: #eee;
}
.homePage-header{
	position: relative;
	overflow: hidden;
	z-index:auto;
	.size(100%;220px);
	background:#fff;
	.homepage-header-content{
		position: fixed;
		z-index:auto;
		.size(100%;200px);
		.homePage-info-text{
			transform: translate(0, 40px);
			.userName{
				font-weight: 400;
			}
			.serviceTime{
				margin: 0;
				font-size: 0.6rem;
				color:@color-text-gray;
			} 
		}
		.card-content-inner{
			height: 110px;
		}
		.card-footer{
			.justify-content(space-around)
		}
		.avatar-img{
			position: absolute;
			text-align: center;
			left:50%;
			margin-left: -50px;
			top:-50%;
			.square(100px);
			padding: 5px;
			background-color: #fff;
			border:1px solid @color-split;
			img{
				display: inline-block;
			}
		}
		.homePage-top{
			.size(100%;70px);
			background-color: @color-primary
		}
		.card{
			margin: 0;
		}
	}
}
.mint-cell-wrapper{
			font-size: 0.6rem!important;
			.mint-cell-text{
				font-size: 0.6rem;
			}
}
.serviceList{
	position: relative;
	margin-top: 10px;
	z-index:auto;
	overflow: hidden;
	background-color: #eee;
	.evaluate{
		position: absolute;
		width: 100%;
	}
	.title{
		.size(100%;44px);
		margin-top:44px;
		line-height: 44px;
		font-size: 0.7rem;
		padding-left: 10px;
		border-bottom: 1px solid @color-split;
		background-color: #fff;
	}
}
.test{
	height: auto;
	background-color: #eee;
}
.serviceList-wrap{
	position: absolute;
	background: #eee;
	width: 100%;
	height: 400px;
	top:98px;
	overflow-y: hidden;
}
.loading{
	position: absolute;
	.size(100%;30px);
	top:0;
	border:1px solid red;
	z-index: 0;
}

.scroller{
	margin-top: 46px;
	top:40px;
}
.ll{
	position: relative;
	.size(100%;100%);
	padding-top:1px
}
</style>