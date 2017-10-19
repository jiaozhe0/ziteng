<template>
<ul class="row text-center sort-nav no-gutter">
			<li class="col-25 sort-nav-item" 
			:class="{'on': selectedSort=='sale'}"
				@click="_getData('sale')"
			>销售最高</li>
			<li class="col-25 sort-nav-item" 
			:class="{'on': selectedSort=='overall'}"
				@click="_getData('overall')"
			>综合</li>
			<li class="col-25 sort-nav-item" 
			:class="{'on': selectedSort == 'evaluate'}"
			@click="_getData('evaluate')"
			>评价</li>
			<li class="col-25 sort-nav-item" 
			:class="{'on': selectedSort=='price'}"
			@click="_getData('price')"
			>价格最低</li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
		data() {
			return {
					selectedSort: 'sale'
			}
		},
		methods: {
				_getData(sortType) {
						this.selectedSort = sortType
						this.$emit('getServiceList', sortType)
				}
		}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .sort-nav{
 	position:absolute;
 	margin: 0;
 	top:0;
 	z-index: 9;
 	.size(100%;36px);
 	padding: 8px 0;
 	font-size: 0.6rem;
 	.hairline(bottom, @color-split);
 	border-bottom: 1px solid #fff;
 	background-color: #fff;
 	.sort-nav-item.on{
 		transition: color 0.8s @timing-fuction;
 		color: @color-primary;
 	}
 	li~li{
 		border-left: 1px solid @color-split;
 	}
 }
</style>