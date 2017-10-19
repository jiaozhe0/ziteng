<template>
  <div class="news-item" ref='newsWrap' >
    <div class="news-list" ref='newsList'>
  	  <div v-for="item in newsList" class='clearfix news-item-list' >
  	    <div class="avatar-img pull-left" >
  	      <img :src="item.picUrl" alt="" class="img-responsive">
  	    </div>
  	    <p class="pull-left news-info">
  	      {{`${item.isRefresh}发布了'${item.appTitle}'服务`}}
  	    </p>
  	  </div>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
export default {
	props: ['newsList'],
	created() {
		console.log(this.newsList)
	},
  mounted() {
    this.$refs.newsWrap.scrollTop = 50
  }
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.news-item{
/*  border:1px solid red;
*/  height: 50px;
}
.news-list{
  height: auto;

}
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
