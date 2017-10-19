<template>
   <div class="view" >
   		 <mt-header title="sfs"></mt-header>
   		<div class="content view-content">
   			<mt-swipe :show-indicators="false" :continuous="false"  :auto="0" :key="index">
   			  <mt-swipe-item v-for="item in pictures.list" class="img-wrap">
   			  	<img :src="item.picName" alt="" >
   			  </mt-swipe-item>
   			</mt-swipe>
   		</div>
   </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import { Swipe, SwipeItem } from 'mint-ui'
import {mapGetters} from 'vuex'
export default {
	components: {
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem,
      MtHeader
	},
   created() {
      console.log(this.pictures)
   },
	computed: {
		...mapGetters(['pictures'])
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .view-content{
   bottom: 0;
    background-color: #fff;
 }
 .img-wrap{
   .size(100%;100%);
   .flexbox();
   .align-items(flex-end);
   border:1px solid red;
   img{
      display: block;
      height: auto!important
   }
 }

</style>
