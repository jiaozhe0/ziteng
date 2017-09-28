<template>
  <div class="refresh" ref='refresh' :style="top">
  		<div class="refresh-text">
  		<slot></slot>
  		</div>
  		<div class="img-wrap" ref='icon'>
			<img src="./drop-down-1@2x.png"  alt="" class="img-responsive">
  		</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props: ['top'],
	data() {
		return {
			text: '下拉'
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.refresh{
	position: absolute;
	 top:-50px;
	.size(100%;60px);
	.flexbox();
	.justify-content(center);
	.align-items(center);
	transition: all 0.5s @timing-fuction;
	/*text-align: center;
	line-height: 10px;
	display: table-cell;
	vertical-align: middle;*/
	font-size: 0.7rem;
	.refresh-content, .refresh-text,.img-wrap{
		display:inline-block;
	}
	.refresh-text{
		margin-right: 12px;
	}
	.img-wrap{
		.square(26px);
		transition: all 0.5s @timing-fuction;
	}
}

</style>