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
					<div v-show="">芝麻信用</div>
					<div v-show="">已实名认证</div>
					<div></div>
				</div>
   		</div>
   		</div>
   	</div>
   	<div class="serviceList" ref='serviceWrap'>
   		<div class="evaluate" >
   			<mt-cell :title="'用户评价('+server.evaluateNumber+')'" is-link @click.native="_ll">
   			  <span>全部</span>
   			</mt-cell>
   		</div>
   		<div class="title">TA发布的服务</div>
   		<scroll class='serviceList-wrap' 
   		ref='s' 
   		:data="serviceList"
   		:listenScroll="true"
			@scroll="_listenScroll"
			@scrollToTop="_refresh"
			@scrollToEnd="_loadMore"
			@scrollToGap="_resRefresh"
			:pullup="true"
   		 >
   			<service-list :serviceList="serviceList" :homeStyle="true"></service-list>
   			<refresh-icon ref='refresh'>
   				{{refreshText}}加载
   			</refresh-icon>
   		</scroll>
   	</div>
   </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import ServiceList from 'components/ServiceList'
import RefreshIcon from 'components/Refresh/index'
import {getOtherUserServiceList, getUserAllInfo} from 'api/service'
import { Cell, Toast } from 'mint-ui'
import {Refresh, resRefresh} from 'common/js/browser'
export default {
	data() {
		return {
			serviceList: [],
			refreshText: '下拉',
			server: {},
			isMore: false,
			loading: false,
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
		Scroll,
		Cell,
		ServiceList,
		RefreshIcon
	},
	created() {
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
	methods: {
		_ll() {
			this.$router.push({path: '/serappraise', query: {serviceUserId: this.$route.query.userId}})
		},
		_getUserAllInfo(data) {
			getUserAllInfo(data).then((data) => {
				console.log(123, data)
				this.server = data
			})
		},
		_getOtherUserServiceList() {
			this.requestData.userId = this.$route.query.userId
			this.requestData.page.currentPage = 0
			getOtherUserServiceList(this.requestData).then((data) => {
				console.log(124, data)
				this._processData(data)
			})
		},
		// 加载更多
		_loadMore() {
			if (this.loading || this.isMore) {
				Toast('数据加载完成')
				return
			}
			console.log('上拉加载')
			this.loading = true
			this.requestData.page.currentPage += 1
			getOtherUserServiceList(this.requestData).then((data) => {
				console.log(456, data)
				this._processData(data, true)
			})
		},
		// 刷新
		_refresh() {
			console.log('下拉刷新')
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
			}
		},
		_resRefresh() {
			this.$nextTick(() => {
				resRefresh(this.refreshEle)
				this.refreshText = '下拉'
			})
		},
		_listenScroll(pos) {
			this.refreshEle = this.$refs.refresh.$refs
			Refresh(this.refreshEle, pos.y)
			if (pos.y > 50) {
				this.refreshText = '松开'
			}
		}
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
		position: absolute;
		top:54px;
		.size(100%;44px);
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
</style>