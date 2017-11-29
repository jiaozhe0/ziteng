<template>
<div class='reminder danger'>
	<slot></slot>
</div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .reminder{
			.flexbox();
			.align-items(center);
			.size(100%;34px);
			font-size: 0.6rem;
			line-height: 34px;
			background: #fff8bf;
		.justify-content(space-between);
		padding: 0 15px;
}

</style>