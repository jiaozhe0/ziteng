<template>
  <div class='publish'>
  	<mt-header title="我的发布"></mt-header>
    <div class="content" :class="{'gap':publishList.length}">
    	<div @click="$router.push(url)" v-show="!auth" class="status-wrap">
    		<status :type="auth"></status>
    	</div>
    	<div class="no-publish" v-if="!publishList.length">
    		<div class="img-wrap">
    		</div>
    		<router-link to='/editservice' class='ser-btn center-block'>
    		<strong>没有发布服务</strong>
    		<p>您还没发过服务，现在发布一个吧！</p>
    			发布我的第一个服务
    		</router-link>	
    	</div>
			<scroller :dataList="publishList" 
							v-else class='list-content' 
							@refresh="_refresh"
							@loadMore="_loadMore"
							:refreshIcon='refreshing'
							:loadIcon='loading'
							:class="{'on': !auth}">
				<publish-list :serviceList="publishList"></publish-list>
			</scroller>
    </div>
    <div class="bar bar-footer">
    	<router-link to="/editservice" class='footer-btn'>发布服务</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroller from 'components/scroller/index'
import Status from 'components/Status/index'
import PublishList from 'components/publishList/index'
import {getCurrentUserServiceList} from 'api/service'
import {getUserAuthStatus} from 'api/home'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
const LIMIT = 15 // 请求的页数
export default {
	data() {
		return {
			publishList: [],
			loading: false, // 加载状态
			refreshing: false,
			hasMore: false, // 是否有更多数据
			param: {
				userId: '',
				page: {
					currentPage: 0
				}
			},
			authStatus: {}
		}
	},
	created() {
		this.setFooter(false)
		this.param.userId = this.user.userId
	},
	activated() {
		this._getCurrentUserServiceList()
		this._getUserAuthStatus(this.user.userId)
	},
	deactivated() {
		this.setFooter(true)
	},
	computed: {
		...mapGetters(['user', 'status']),
		auth() {
			let status = false
			for (let i in this.authStatus) {
				if (this.authStatus[i] === 4) {
					status = true
					break
				}
			}
			return status
		},
		url() {
				let url = 'home/auth'
				if (this.status === 'person') {
					url = '/home/auth/person'
				} else if (this.status === 'business') {
					url = '/home/auth/server'
				}
				return url
			}
	},
	components: {
			MtHeader,
			Scroller,
			PublishList,
			Status
	},
	methods: {
		// 获取状态
		_getUserAuthStatus(id) {
			getUserAuthStatus(id).then(data => {
					if (data.code === '000000') {
						let auth = data.data[0]
						this.authStatus = data.data[0]
						if (auth.authBusinessStatus > 1) {
							this.setStatus('business')
						} else {
							if (auth.authProfessionalStatus > 1 || auth.authUserIdStatus > 1 || auth.authZhimaxinyongStatus) {
								this.setStatus('person')
							}
						}
					}
				})
		},
		_getCurrentUserServiceList() {
			this.refreshing = true
			this.param.currentPage = 0
			getCurrentUserServiceList(this.param).then(data => {
				if (data.code === '000000') {
					this._processingData(data.data)
				}
			})
		},
		_refresh() {
			if (this.refreshing) {
				return
			}
			this._getCurrentUserServiceList()
		},
		_loadMore() {
			if (this.loading) {
				return
			}
			if (this.hasMore) {
				Toast('没有更多数据')
				return
			}
			this.loading = true
			this.param.currentPage += 1
			getCurrentUserServiceList(this.param).then(data => {
				if (data.code === '000000') {
					this._processingData(data.data, true)
				}
			})
		},
		// 数据处理
		_processingData(val, flag) {
			if (val.length === 0) {
				Toast('没有更多数据')
				return
			}
			if (flag) {
				this.publishList = this.publishList.concat(val)
				setTimeout(() => {
					this.loading = false
				}, 20)
				if (val.length < LIMIT) {
					this.hasMore = true
				}
			} else {
				this.publishList = val
				setTimeout(() => {
					this.refreshing = false
				}, 200)
			}
		},
		...mapMutations({
			setFooter: 'CHANGE_FOOTER_SHOW',
			setStatus: 'STATUS'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '../../common/css/variable.less';
@import '../../common/css/mixin.less';
.content{
	bottom:0;
	&.gap{
		bottom:60px;
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
		/*.bg-view-image('myPublish/workCardeg')*/
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
.list-content{
	&.on{
		top:30px!important;
	}
}
.bar-footer{
	height:60px;
	background:#fff;
}
</style>