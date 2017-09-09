<template>
  <scroll class='content' :data="cityList" ref="listview" :listenScroll="listenScroll">
    <ul>
      <li v-for='city in cityList' ref='listGroup'>
        <h2>{{city.letter}}</h2>
        <ul>
          <li v-for='item in city.item'>{{item.cityName}}</li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in key" :data-index="index">{{item}}</li>
      </ul>
    </div>
    <div class="bar">
      {{title}}
    </div>
   
  </scroll>  
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import {Header} from 'mint-ui'
import {cityList} from 'api/city'
const pinyin = require('tiny-pinyin')
import {getData} from 'common/js/browser'

export default {
  data() {
    return {
      cityList: [],
      shorcutList: [],
      title: 'A'
    }
  },
  created() {
    this._getcityData()
    this.touch = {}
  },
  components: {
    Scroll,
    mtHeader: Header
  },
  computed: {
    key() {
      return 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
    }
  },
  methods: {
    onShortcutTouchStart(e) {
       let cityIndex = parseInt(getData(e.target, 'index'))
       let firstTouch = e.touches[0]
       this.touch.y1 = firstTouch.pageY // 手指触碰时的位置
       this.touch.cityIndex = cityIndex
       this._scrollTo(cityIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY // 滑动后的位置
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18) | 0 // 滑动的距离 除以 一个字母的高度
      let cityIndex = this.touch.cityIndex + delta
      console.log('.......')
      this._scrollTo(cityIndex)
    },
    _scrollTo(index) {
      console.log(index)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _getcityData() {
      cityList().then((res) => {
        const data = res.data
        this.cityList = this._normalizeCity(data.baiduCity)
      })
    },
    _normalizeCity(list) {
      let map = {}
      let cityList = []
      this.key.forEach((item, index) => {
          map[item] = {}
          map[item].letter = item
          map[item].item = []
      })

      list.forEach((item, index) => {
        if (pinyin.isSupported()) {
          let firstWord = item.cityName.charAt(0)
          let letter = pinyin.convertToPinyin(firstWord).charAt(0)
          map[letter].item.push({
            cityId: item.cityId,
            cityName: item.cityName
          })
          if (map[letter].item.length > 1) {
            map[letter].item.sort((a, b) => {
              return a.cityName.localeCompare(b.cityName)
            })
          }
        }
      })

      // for (let key in map) {
      //   let cityList = map[key].item
      //   var center = cityList[0]

      //   cityList.sort((a, b) => {
      //     return b.cityName.localeCompare(a.cityName)
      //   })
      // }

      for (let city in map) {
       cityList.push(map[city])
      }
      console.log(cityList)
      return cityList
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';

  .bar{
    position: absolute;
    top: 0;
    left: 0;
    .size(100%;40px);
    background: red;
  }
 
 .list-shortcut{
   position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0,0,0,0.3);
    font-family: Helvetica;
    color:red;
  } 

</style>