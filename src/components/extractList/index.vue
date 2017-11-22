<template>
<div class='income-list'>
    <mt-cell class='income-item' v-for="item in extractList">
    	<div slot='icon'>
    		<div class="title">编号：{{item.extractNo}}</div>
    		<div class="type">{{item.extractTime}}</div>
    	</div>
    	<div class="text-right"> 
    		<div class='statusText'>{{_status(item.extractStatus)}}</div>
            <div class="score">+{{item.extractAmount}}</div>
    	</div>
    </mt-cell>
</div>
</template>

<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
export default {
	props: ['extractList'],
	components: {
		MtCell: Cell
	},
    methods: {
        _status(val) {
            return val === 2 ? '提现成功' : val === 3 ? '提现失败' : '处理中'
        }
    }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .income-list{
 	min-height: 101%;
 }
 .income-item{
 	font-size: 0.6rem;
 	.score{
 		color:@color-primary;
        font-size: 0.8rem
 	}
 	.time,.type{
 		margin-top: 8px;
 		font-size: 0.5rem;
 		color:@color-text-gray;
 		span{
 			/*.text-overflow();*/
 			display: inline-block;
 			width: 50px;
 		}
 	}
    .statusText{
        font-size: 0.6rem;
    }
 }

</style>