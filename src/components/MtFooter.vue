<template>
  <mt-tabbar class='footer'>
  <mt-tab-item >
    <router-link to='/index'>
      首页
    </router-link> 
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/classify'>
      分类
    </router-link> 
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/message'>
      消息
    </router-link>
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/order'>
      订单
    </router-link>
  </mt-tab-item>
  <mt-tab-item >
    <router-link to='/home'>
      我的
    </router-link>
  </mt-tab-item>
</mt-tabbar>
</template>

<script  type="text/ecmascript-6">
import { Tabbar, TabItem } from 'mint-ui'
export default {
  components: {
    mtTabbar: Tabbar,
    mtTabItem: TabItem
  },
  methods: {
  }
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.footer{
  .size(100%;55px);
  .hairline(top, @border-default-color);
  .mint-tab-item{
    background:#fff;
  }
}

</style>
