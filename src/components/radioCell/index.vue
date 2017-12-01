<template>
<div>
   <mt-cell v-for="item in radioList">
   	<div slot="icon" class='radio-wrap'>
   		 <input type="radio" :value="item.value" v-model="result" class="radioBtn">
   		 <div class="radio order-item-radio text-center" :class="{'on': result == item.value}">
   			<div class="radio-icon" ></div>
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
			result: ''
		}
	},
	created() {
		this.result = this.modelVal
	},
	activated() {
		this.$nextTick(() => {
			this.result = this.modelVal
		})
		console.log(88888, this.result)
	},
	deactivated() {
		this.result = ''
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
 @import '../../common/css/mixin.less';
 .radio-wrap{
 	.flexbox();
 	.align-items(center);
 	position: relative;
 	input.radioBtn{
 		position: absolute;
 		display: block;
 		.size(100%;100%);
 		top:0;left:0;
 		z-index: 8;
 		opacity: 0
 	}
 	.radio {
		margin-right: 10px;
		opacity: 1!important;
 	}
 }
 .title{
 	font-size:0.64rem;
 }
 .des{
 	display: inline-block;
 	width: 160px;
 	color:@color-text-gray;
 	font-size: 0.5rem;
 }
 .radio-icon{
 	display: inline-block;
 	line-height: 28px;
 	.size(12px;8px);
 	background-size: 100%;
 	.bg-image('radioCell/right');
 }
</style>