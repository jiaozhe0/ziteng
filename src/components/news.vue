<template>
  <div class="news-item" >
  	<slider>
  	  <div v-for="item in newsList" class='clearfix news-item-list' >
  	    <div class="avatar-img pull-left" >
  	      <img :src="item.picUrl" alt="" class="img-responsive">
  	    </div>
  	    <p class="pull-left news-info">
  	      {{`${item.isRefresh}发布了'${item.appTitle}'服务`}}
  	    </p>
  	  </div>
		</slider>
  </div>
</template>

<script  type="text/ecmascript-6">
import Slider from './slider'
export default {
	props: ['newsList'],
	mounted() {
		// console.log(1, document.querySelector('.news-item-list'))
	},
	created() {
		console.log(this.newsList)
	},
	components: {
		Slider
	},
	update() {
		this._scroll()
	},
	methods: {
		_scroll() {
			console.log(document.querySelector('news-item-list'))
			let scroll = this.$refs.sliderGroup.children
			console.log(scroll.length)
		}
	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
    .news-item-list{
      padding: 0 10px;
      .flexbox();
      .flex-wrap(nowrap);
      .align-items(center);
      height:54px
    }
    .avatar-img{
      .size(30px;30px);
      overflow: hidden;
      border-radius: 50%;
      margin-right:10px;
      border:1px solid @color-split
    }
    .news-info{
      flex:1;
      margin: 0;
      line-height: 30px;
      overflow: hidden;
      .text-overflow(block)
    }

</style>
