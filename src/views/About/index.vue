<template>
  <div class="about">
    <mt-header title="关于我们" v-show="isHeader"></mt-header>
    <scroll class='content ' :style="{'top': isHeader ? '44px' : '0px'}">
    	<div class="about-content wrap">
    		<div class="about-versions-content" >
    			<div class="center-block img-wrap">
    				<img src="./logo.png" alt="" class="img-responsive">
    			</div>
    			<p class="about-name">桔子生活</p>
    			<p class="about-versions">当前版本:&nbsp;&nbsp;{{version}}</p>
    		</div>
    		
    		<div class="bar bar-footer about-info">
    			@2017 山东紫藤信息科技有限公司
    	  </div>
    	</div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
export default {
	data() {
		return {
			version: ''
		}
	},
  components: {
    MtHeader,
    Scroll
  },
  created() {
		this.version = this.$route.query.version
  },
  mounted() {
			document.title = '关于我们'
  },
  activated() {
		document.title = '关于我们'
  },
  computed: {
		isHeader() {
			return this.$route.params.broswer === 'html'
		}
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom: 0
 }
 .about-content{
 	position: absolute;
 	text-align:center;
		.about-versions-content{
			margin:120px auto;
			.size(100%;140px);
			font-size:0.8rem;
			.img-wrap{
				.size(100px;100px)
			}
			.about-name{
			 color:@color-text;
			 margin-bottom: 0;
			}
			.about-versions{
				 color:@color-text-gray;
				 margin-top: 5px;
				 font-size:0.67rem;
			}
		}
		.about-info{
			color:@color-text-gray-light;
			color:@color-text-gray;
			font-size: 0.6rem;
			background-color: transparent;
			.hairline(top, #fff)
		}
 }

</style>