<template>
  <div class="index">
    <mt-header title='Index'></mt-header>
			<scroll :data="test" class="content">
        <nav class="index-nav row">
          <ul class="row">
          <li class="col-20 nav-list" v-for="(l,index) in new Array(10)">{{index}}</li>
          </ul>
        </nav>
			  <div class="news">
          <div class="news-icon">dd</div>
          <div class="news-item">
            <ul>
              <li v-for="(l,index) in new Array(10)">{{index}}</li>
            </ul>
          </div>
          <div class="news-button">d</div>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import {Header} from 'mint-ui'
export default {
  data() {
    return {
    }
  },
  components: {
    Scroll,
    mtHeader: Header
  },
  computed: {
    test() {
      var arr = new Array(99)
      arr = arr.map((item, index) => {
        return index
      })
      return arr
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.index-nav{
  .size(100%;180px);
  border:1px solid red;
  text-align: center;
  margin-left: 0;
  .nav-list{
    margin-bottom: 28px
  }
}
.news{
  .size(100%,64px);
  .flexbox();
  .flex-wrap(nowrap);
  .justify-content(space-around);
  .align-items(center);
  overflow: hidden;
}
</style>