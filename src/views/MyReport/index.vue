<template>
<div class="report">
    <mt-header title="投诉举报"></mt-header>
    <div class="content skill-content">
    	<mt-cell  title="选择投诉订单" is-link>
    		<span>选择订单</span>
    	</mt-cell>
    	 <mt-radio
    	   title="请选择投诉举报的原因"
    	   :value.sync="value"
    	   :options="options">
    	 </mt-radio>
    	<p>进行技能认证，可以让用户更加相信您的服务哦！</p>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Cell, Radio} from 'mint-ui'
export default {
	data() {
		return {
			options: [
				'服务者爽约',
				'服务不好',
				'态度不好',
				'损坏不赔',
				'连带推销'
			]
		}
	},
	components: {
		MtHeader,
		MtCell: Cell,
		MtRadio: Radio
	}
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';

</style>