<template>
 <ul>
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
      <div class="card-content-inner  eval-describe">{{item.evaluateDescribe}}</div>
    </div>
    <div class="card-footer">来自服务{{item.title}}</div>
   </li>
 </ul>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
export default {
  props: ['evaluateList'],
  components: {
    Star
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
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

</style>