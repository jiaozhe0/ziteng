<template>
  <scroll class='listView' :data="cityList" ref="listview">
    <ul>
      <li v-for='city in cityList'>
        <h2>{{}}</h2>
        <ul>
          <li v-for=''></li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart">
      <ul>
        <li v-for="(item,index) in shorcutList" :data-index="index"></li>
      </ul>
    </div>
  </scroll>  
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import {Header} from 'mint-ui'
import {cityList} from 'api/city'
// import {getData} from 'common/js/browser'
import header from 'api/common'
export default {
  data() {
    return {
      cityList: [],
      shorcutList: []
    }
  },
  created() {
    cityList().then((data) => {
      console.log(data)
      console.log(header)
    })
  },
  components: {
    Scroll,
    mtHeader: Header
  },
  methods: {
    onShortcutTouchStart(e) {
      // let cityIndex = getData(e.target, 'index')
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .list-shortcut{
  position: absolute;
 }

</style>