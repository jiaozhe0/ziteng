<template>
<div>
    <tab class='buyOrder-nav'>
       <tab-item selected @click.native="_setevaluateType(9)">未完成</tab-item>
       <tab-item @click.native="_setevaluateType(1)">已完成</tab-item>
       <tab-item @click.native="_setevaluateType(2)">待评价</tab-item>
       <tab-item @click.native="_setevaluateType(3)">全部</tab-item>
    </tab>
    <!-- <div class="content buyOrder-content"> -->
    	<scroller>
    		<ul class='buyOrder-content-list'>
    			<li v-for="(item,index) in new Array(40)">{{index}}</li>
    		</ul>
    	</scroller>
    <!-- </div> -->
</div>
</template>

<script type="text/ecmascript-6">
import {Tab, TabItem} from 'components/tab/index'
import Scroller from 'components/scroller/index'
export default {
	components: {
		Tab,
		TabItem,
		Scroller
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .buyOrder-nav{
	line-height:44px;
 }
.buyOrder-content{
	bottom:0;
	border:1px solid red;
	.buyOrder-content-list{
		width:100%;
		border:1px solid red;
	}
}
</style>