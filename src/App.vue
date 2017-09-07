<template>
  <div id="app">
    <app-header fixed title=>
      <div slot='left' icon='back'>返回</div>
      <div slot='right'></div>
    </app-header>
    <div class="text-center">lalal</div>
    <div class="row">
      <div class="col-20">icon</div>
      <div class="col-20">icon</div>
      <div class="col-20">icon</div>
      <div class="col-20">icon</div>
      <div class="col-20">icon</div>

    </div>
    
    <router-view></router-view>

  </div>
</template>

<script  type="text/ecmascript-6">
import {Header} from 'mint-ui'
export default {
  name: 'app',
  components: {
    appHeader: Header
  }
}
</script>

<style scoped lang="less" >
@import 'common/css/mixin.less';


</style>
