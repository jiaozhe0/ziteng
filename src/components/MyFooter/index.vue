<template>
  <mt-tabbar class='myFooter needsclick'>
  <!-- :to="user.userId?'/home/info':'/login'" -->
  <mt-tab-item >
    <router-link to='/index' class="needsclick">
      <div @click="selected='home'" >
        <div class="icon home" :class="{'home-on':selected=='home'}"></div>
        首页
      </div>
    </router-link> 
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/classify' class="needsclick">
    <div  @click="selected='classify'" class="needsclick">
     <div class="icon classify" :class="{'classify-on':selected=='classify'}"></div>
      分类
    </div>
    </router-link> 
  </mt-tab-item>
  <mt-tab-item >
  <!--  :to="user.userId ? '/message': '/login'" -->
    <router-link :to="user.userId ? '/download': '/login'" class='tab-reItem' replace>
      <div  @click="selected='message'">
      <div class="icon message" :class="{'message-on':selected=='message'}"></div>
      消息
      </div>
      <div class="count" v-if="chatCount>0">{{chatCount}}</div>
    </router-link>
  </mt-tab-item>
  <mt-tab-item >
    <router-link :to="user.userId ? '/download': '/login'" class='tab-reItem'>
    <div @click="selected='order'">
      <div class="icon order" ></div>订单
    </div>
    <div class="count" v-show="orderCount>0">{{orderCount}}</div>
    </router-link>
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/home'>
      <div @click="selected='my'">
      <div class="icon my" :class="{'my-on':selected=='my'}"></div>
      我的
      </div>
    </router-link>
  </mt-tab-item>
</mt-tabbar>
</template>

<script  type="text/ecmascript-6">
import { Tabbar, TabItem } from 'mint-ui'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      selected: 'home'
    }
  },
  components: {
    mtTabbar: Tabbar,
    mtTabItem: TabItem
  },
  computed: {
    ...mapGetters(['chatCount', 'orderCount', 'user'])
  },
  created() {
    this._setSelcted()
  },
  methods: {
    _setSelcted() {
      switch (this.$route.name) {
        case 'Index':
          this.selected = 'home'
          break
        case 'Classify':
          this.selected = 'classify'
          break
        case 'Message':
          this.selected = 'message'
          break
        case 'Order':
          this.selected = 'order'
          break
        case 'Home':
          this.selected = 'my'
          break
      }
    }
  }
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';
.myFooter{
  .size(100%;55px);
  .hairline(top, @border-default-color);
  .mint-tab-item{
    background:#fff;
  }
  .icon{
    margin:5px auto;
    .size(20px;20px);
    background-size: 20px 20px;
    &.home{
      .bg-image('MyFooter/home-off');
    }
    &.classify{
      .bg-image('MyFooter/fenlei-off');
    }
    &.message{
      .bg-image('MyFooter/chatList');
    }
    &.order{
      .bg-image('MyFooter/case-off');
    }
    &.my{
      .bg-image('MyFooter/MY-off');
    }

  /*  &.home-on{
      .bg-image('MyFooter/home-on');
    }
    &.classify-on{
      .bg-image('MyFooter/fenlei-on');
    }
    &.message-on{
      .bg-image('MyFooter/chatList-on');
    }
   
    &.my-on{
      .bg-image('MyFooter/MY-on');
    }*/
     &.order-on{
      .bg-image('MyFooter/case-on');
    }
  }
 .tab-reItem.active {
   .icon {
      &.order{
        .bg-image('MyFooter/case-on');
    }
 }
}
  .router-link-exact-active{
    .icon{
      &.home{
        .bg-image('MyFooter/home-on');
      }
      &.classify{
        .bg-image('MyFooter/fenlei-on');
      }
      &.message{
        .bg-image('MyFooter/chatList-on');
      }
      &.order{
        .bg-image('MyFooter/case-on');
      }
      &.my{
        .bg-image('MyFooter/MY-on');
      }
    }
  }
}
.count{
  .square(14px);
  line-height: 15px;
  font-size: 0.5rem;
  top:-7px;
  right:21px
}
</style>
