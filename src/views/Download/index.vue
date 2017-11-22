<template>
<div>
<mt-header title="下载应用"></mt-header>
<div class="content download-content">
 		<div class="logo center-block"></div>
 		<p class="text text-center">
 			下载桔子生活APP, <br>获取更完整的使用体验
 		</p>
 		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.zitengkeji.app" class="button center-block"></a>
 		<div class="copy text-center">
 			最新版本：1.1.11 <br>
 			山东紫藤信息科技有限公司版权所有
 		</div>
</div>
</div>
</template>
<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
export default {
	components: {
		MtHeader
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .download-content{
 	bottom:0;
 	padding: 30px 0;
 	.logo{
 		margin-top: 40px;
 		.size(80px;125px);
 		background-image: url(./icon@2x.png);
 		background-size: cover;
 	}
 	.text{
 		margin: 60px auto;
 		font-size: 0.7rem;
 		color: @color-text-gray
 	}
 	.button{
 		display: block;
 		margin-top: 50px;
 		.size(266px;63px);
 		background-image: url(./butt@2x.png);
 		background-size: cover;
 	}
 	.copy{
 		position: absolute;
 		bottom:10px;
 		.size(100%;40px);
 		font-size: 0.54rem;
		color: @color-text-gray
 	}
 }
</style>