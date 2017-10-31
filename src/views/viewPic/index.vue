<template>
   <div class="view" >
   		<mt-header :title="index+1 +'/'+ length"></mt-header>
   		<!-- <div class="content view-content">
   			<mt-swipe :show-indicators="false" :continuous="false"  :auto="0" :key="index">
   			  <mt-swipe-item v-for="item in pictures.list" class="img-wrap">
   			  	<img :src="item.picName" alt="" >
   			  </mt-swipe-item>
   			</mt-swipe>
   		</div> -->
         <div class="content view-content" v-if="pictures.list.length">
            <slider class="slider-item" :autoPlay="false" :index="index" :length="length" @scrollPic="_setIndex">
               <div class="img-wrap slider-item" v-for="item in pictures.list">
                  <img :src="item.picName" alt="" >
               </div>
            </slider>
         </div>
   </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import { Swipe, SwipeItem } from 'mint-ui'
import Slider from 'components/slider/index'
import {mapGetters} from 'vuex'
export default {
   data() {
      return {
         length: 0,
         index: 0
      }
   },
	components: {
		MtSwipe: Swipe,
		MtSwipeItem: SwipeItem,
      MtHeader,
      Slider
	},
   activated() {
      this.length = this.pictures.list.length
      this.index = this.pictures.index
   },
	computed: {
		...mapGetters(['pictures'])
	},
   methods: {
      _setIndex(i) {
         this.index = i
      }
   }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .view-content{
   bottom: 0;
   background-color: #000;
 }
 .slider-item{
   .size(100%;100%)
 }
 .img-wrap{
   position: relative;
   .size(100%;100%);
   .flexbox();
   .align-items(center);
   img{
      display: block;
      width:100%;
      height: auto!important
   }
 }

</style>
