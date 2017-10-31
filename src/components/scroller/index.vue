<template>
	<div class='content scroller'>
		<div class='scroll-wrap'>
		<!-- 刷新图标 -->
		  <div class="refresh icon-item"  ref='refresh'>
		  		<div class="refresh-text">{{refreshText}}刷新</div>
		  		<div class="img-wrap" ref='refreshIcon'></div>
		  </div>
		 <div class="loading-wrap text-center" v-show="refreshIcon">
			<div class="loading-icon"></div>
		 	<div class="img-wrap"></div>
		 </div>
  	<scroll class='data-content content'
  					:class="{'refresh':refreshIcon,'loading':loadIcon}"
   					:data="dataList"
   					:listenScroll="true"
						@scroll="_listenScroll"
						@scrollToTop="_refresh"
						@scrollToEnd="_loadMore"
						@scrollToGap="_resRefresh"
						:pullup="true"
						ref="scroll"
						>
			<slot></slot>

			<div class="icon-item loading" ref="load">
				<div class="refresh-text">{{loadText}}加载</div>
		  	<div class="img-wrap" ref='loadIcon'></div>
			</div>
		</scroll>
				<div class="loading-wrap text-center bottom-loading" v-show="loadIcon">
			<div class="loading-icon"></div>
		 	<div class="img-wrap"></div>
		 </div>
		<!-- 下拉图标 -->
	</div>
	</div>
</template>
<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
export default {
	props: {
		dataList: {
			type: Array
		},
		refreshIcon: {
			type: Boolean,
			default: false
		},
		loadIcon: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			refreshText: '下拉',
			loadText: '上拉'
		}
	},
	mounted() {
	},
	components: {
		Scroll
	},
	methods: {
		// 刷新
		_refresh() {
			this.$emit('refresh')
		},
		// 加载更多
		_loadMore() {
			this.$emit('loadMore')
		},
		// 监听滑动
		_listenScroll(pos, maxVal) {
			this.$emit('scrollTop', pos.y)
			if (pos.y > 0 && pos.y <= 50) {
				this.$refs.refreshIcon.style.transform = `scale(${1 + pos.y / 100})`
				this.$refs.refreshIcon.style.webkitTransform = `scale(${1 + pos.y / 100})`
				this.$refs.refresh.style.transform = `translateY(${pos.y}px)`
				this.$refs.refresh.style.webkitTransform = `translateY(${pos.y}px)`
			}
			if (pos.y > 50) {
				this.refreshText = '松开'
			}
			if (maxVal >= pos.y) {
				this.$refs.loadIcon.style.transform = `scale(${1 - (pos.y - maxVal) / 100})`
				this.$refs.loadIcon.style.webkitTransform = `scale(${1 - (pos.y - maxVal) / 100})`
				this.$refs.load.style.transform = `translateY(${pos.y - maxVal}px)`
				this.$refs.load.style.webkitTransform = `translateY(${pos.y - maxVal}px)`
			}
			if (pos.y <= maxVal - 50) {
				this.loadText = '松开'
			}
		},
		// 监听滑动结束
		_resRefresh() {
			this.$refs.refreshIcon.style.transform = `scale(1)`
			this.$refs.refreshIcon.style.webkitTransform = `scale(1})`
			this.$refs.refresh.style.transform = `translateY(0)`
			this.$refs.refresh.style.webkitTransform = `translateY(0)`
			this.$refs.loadIcon.style.transform = `scale(1)`
			this.$refs.loadIcon.style.webkitTransform = `scale(1)`
			this.$refs.load.style.transform = `translateY(0)`
			this.$refs.load.style.webkitTransform = `translateY(0)`
			this.refreshText = '下拉'
			this.loadText = '上拉'
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	top:0;
 }
 .content-wrap{
 	
 }
 .scroll-wrap{
 		position: relative;
 		.size(100%;100%);
 		.icon{
 			position: absolute;
 			.size(100%;40px);
 			top:0px;
 			z-index: 55
 		}
 		.img-wrap{
 			display: inline-block;
		.square(26px);
		background-size:26px 26px;
		.bg-image('scroller/drop-down-1')
	}
 }
.scroller{
 	bottom:0;
 	}
.data-content{
	top:0;
	bottom:0;
	background-color: #eee;
	&.refresh{
		transform: translateY(50px);
	}
	&.loading{
		transform: translateY(-50px);
	}
}
.icon-item{
	position: absolute;
	.size(100%;60px);
	.flexbox();
	z-index:99;
	.justify-content(center);
	.align-items(center);
	transition: all 0.5s @timing-fuction;
	font-size: 0.7rem;
	.refresh-content, .refresh-text,.img-wrap{
		display:inline-block;
	}
	&.refresh{
		top:-50px;
	}
	&.loading{
		bottom:-50px;
	}
	.refresh-text{
		margin-right: 12px;
	}
}
.loading-wrap{
	.size(100%;50px);
	line-height: 50px;
	background-color: #eee;
	&.bottom-loading{
		position: absolute;
    bottom: 0;
	}
	.img-wrap{
		.square(32px);
		background-size: 32px;
		vertical-align: middle;
	}
	.loading-icon{
		display: inline-block;
		vertical-align: middle;
		.size(31px;7px);
		background-size: 31px 7px;
		.bg-image('scroller/Rep0');
		animation: loading 0.8s infinite;
	}
	@keyframes loading {
		0{.bg-image('scroller/Rep0')}
		50%{.bg-image('scroller/Rep1')}
		100%{.bg-image('scroller/Rep2')}
	} 
}
</style>