<template>
  <div class="news-item" ref='newsWrap' id="scroll">
    <ul class="news-list" ref="newsList">
  	  <li v-for="item in newsList" class='clearfix news-item-list' >
  	    <div class="avatar-img pull-left" >
  	      <img :src="item.picUrl" alt="" class="img-responsive">
  	    </div>
  	    <p class="pull-left news-info">
  	      {{`${item.isRefresh}发布了'${item.appTitle}'服务`}}
  	    </p>
  	  </li>
    </ul>
     <ul class="news-list">
      <li v-for="item in newsList" class='clearfix news-item-list' >
        <div class="avatar-img pull-left" >
          <img :src="item.picUrl" alt="" class="img-responsive">
        </div>
        <p class="pull-left news-info">
          {{`${item.isRefresh}发布了'${item.appTitle}'服务`}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script  type="text/ecmascript-6">
export default {
	props: ['newsList'],
  data() {
    return {
      timer: null
    }
  },
	created() {
		console.log(this.newsList)
	},
  mounted() {
    this.$nextTick(() => {
      let s = document.querySelector('#scroll')
      let h = this.$refs.newsList.offsetHeight
      if (!this.timer) {
            this.timer = setInterval(() => {
              if (s.scrollTop >= h) {
                s.scrollTop = 0
              } else {
                s.scrollTop = s.scrollTop + 50
              }
            }, 2000)
      }
    })
  },
  activated() {
     this.$nextTick(() => {
      console.log(1234556, document.querySelector('#scroll'))
      let s = document.querySelector('#scroll')
      let h = this.$refs.newsList.offsetHeight
      if (!this.timer) {
            this.timer = setInterval(() => {
              if (s.scrollTop >= h) {
                s.scrollTop = 0
              } else {
                s.scrollTop = s.scrollTop + 50
              }
            }, 2000)
      }
    })
  },
  deactivated() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.news-item{
  height: 50px;
  overflow: hidden;
}
.news-list{
  height: auto;
  margin:0;
}
.news-item-list{
      padding: 0 10px;
      .flexbox();
      .flex-wrap(nowrap);
      .align-items(center);
      height:50px
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
