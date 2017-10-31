<template>
<div>
   <mt-cell v-for="item in radioList">
   	<div slot="icon" class='radio-wrap'>
   		<div class="radio order-item-radio" :class="{'on': result == item.value}">
   			<input type="radio" :value="item.value" v-model="result">
   			<div class=" text-center" >✓</div>
   		</div>
   		<span class="title">{{item.title}}</span>
   	</div>
   	<div class='des text-left'>{{item.text ? item.text : ''}}</div>
   </mt-cell>
</div>
</template>

<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
export default {
	props: {
		radioList: {
			type: Array
		},
		modelVal: {
			type: String
		}
	},
	data() {
		return {
			result: this.modelVal
		}
	},
	components: {
		MtCell: Cell
	},
	watch: {
		result(val) {
			this.$emit('changeVal', val)
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .radio-wrap{
 	.flexbox();
 	.align-items(center);
 	.radio {
		margin-right: 10px;
		opacity: 1!important;
 	}
 }
 .title{
 	font-size:0.68rem;
 }
 .des{
 	display: inline-block;
 	width: 160px;
 	color:@color-text-gray;
 	font-size: 0.5rem;
 }
</style>