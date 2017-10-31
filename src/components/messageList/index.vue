<template>
<div class='income-list'>
    <mt-cell class='income-item' v-for="item in messageList">
    	<div slot='icon'>
    		<div class="title">{{item.serviceTitle}}</div>
    		<div class="type"><span>{{item.serviceType}}</span>x{{item.copies}}</div>
    	</div>
    	<div class="text-right">
    		<div class="score">+{{item.totalAmount}}</div>
    		<div class="time">{{item.finishTime}}</div>
    	</div>
    </mt-cell>
</div>
</template>

<script type="text/ecmascript-6">
import {Cell} from 'mint-ui'
export default {
	props: ['messageList'],
	components: {
		MtCell: Cell
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
 }

</style>