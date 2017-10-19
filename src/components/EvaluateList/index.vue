<template>
 <ul class="evaluateList-wrap">
  <li class="card evaluateList" v-for="item in evaluateList">
    <div class="card-header eval-userInfo-header">
    	<div class="clearfix eval-userInfo">
    		<div class="avatar-img pull-left">
    			<img :src="item.evaluateUser.photoUrl" alt="" class="img-responsive" v-if="item.evaluateUser.photoUrl">
          <img src="./n_meiyou.png" alt="" v-else class="img-responsive">
    		</div>
    		<div class='pull-left'>
    			<div class="">{{item.evaluateUser.userName}}</div>
    			<div class="">
           <star :score="item.evaluateLevel" :size="24"></star>
          </div>
    		</div>
    	</div>
    	<div class='eval-time'>{{item.evaluateTime}}</div>
    </div>
    <div class="card-content">
       <ul v-if="item.evaluatePics.length" class="picture-list">
          <li v-for="(picture,index) in item.evaluatePics" class="picture-item" @click="view(item.evaluatePics, index)">
            <img :src="picture.picName" alt="" class='img-responsive'>
          </li>
      </ul>
      <div class="card-content-inner  eval-describe" v-else>
        {{item.evaluateDescribe}}
      </div>
      
    </div>
    <div class="card-footer">来自服务{{item.title}}</div>
   </li>
 </ul>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import {mapMutations} from 'vuex'
export default {
  props: ['evaluateList'],
  components: {
    Star
  },
  methods: {
    view(pictures, i) {
     let picture = {
      index: i,
      list: pictures
     }
     this.setPictures(picture)
     this.$router.push('/view')
    },
    ...mapMutations({
        setPictures: 'PICTURES'
      })
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .evaluateList-wrap{
  min-height:101%;
  height:auto
 }
.evaluateList{
  margin-top:0;
}
 .eval-userInfo-header{
  .eval-time{
    font-size:0.6rem;
    color:@color-text-gray
  }
  .eval-userInfo{
    display: table-cell;
    font-size:0.7rem;
    vertical-align: middle;
    .avatar-img{
      .square(34px);
     }
  }
}

.eval-describe{
  font-size:0.7rem
}
.card-footer{
	min-height: 1.4rem;
	padding:0.4rem 0.75rem;
	font-size: 0.6rem;
  color:@color-text-gray
}
.picture-list{
  margin:0;
  padding: 10px 8px;
  .flexbox();
  .align-items(center);
  .justify-content(flex-start);
  .flex-wrap(wrap);
  .picture-item{
    .square(46px);
    margin: 0 4px 4px;
  }

}
</style>