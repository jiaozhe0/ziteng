<template>
  <scroll class='content' 
          ref="listview" 
          :data="cityList" 
          :probeType = probeType
          :listenScroll="listenScroll"
          @scroll="scroll">
    <ul>
      <li v-for='city in cityList' ref='listGroup'>
        <h2>{{city.letter}}</h2>
        <ul>
          <li v-for='item in city.item' @click="selected(item)">{{item.cityName}}</li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in letter" 
            :data-index="index" 
            class='list-shortcut-item'
            :class="{'on' : index === currentIndex}"
            >{{item}}</li>
      </ul>
    </div>
    <div class="bar" v-show="cityList" ref="fixed">
     {{fixedTitle}}
    </div>
   
  </scroll>  
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import {Header} from 'mint-ui'
import {getData} from 'common/js/browser' // 获得/设置 data-* 属性
// const ANCHOR_HEIGHT = 18 // 右边字母锚点的高度
const TITLE_HEIGHT = 30 // 固定标题栏的高度
export default {
  props: ['cityList', 'letter'],
  data() {
    return {
      shorcutList: [],
      scrollY: -1, // 记录Y轴的坐标位置
      currentIndex: 0,
      diff: -1 // 记录
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = [] // 保存每组城市距离顶部的高度
    this.touch = {} // 保存touch事件信息
  },
  components: {
    Scroll,
    mtHeader: Header
  },
  computed: {
    fixedTitle() {
      if (this.scrollY > 0) { return '' }
      return this.cityList[this.currentIndex] ? this.cityList[this.currentIndex].letter : ''
    }
  },
  methods: {
    onShortcutTouchStart(e) {
       let cityIndex = parseInt(getData(e.target, 'index'))
       let firstTouch = e.touches[0]
       this.touch.y1 = firstTouch.pageY // 手指触碰时的位置
       this.touch.cityIndex = cityIndex
       this.currentIndex = cityIndex
       this._scrollTo(cityIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY // 滑动后的位置
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18) | 0 // 滑动的距离 除以 一个字母的高度
      let cityIndex = this.touch.cityIndex + delta // 初始坐标 + 滑动过的坐标个数
      this.currentIndex = cityIndex
      this._scrollTo(cityIndex)
    },
    scroll(pos) { // Y轴的坐标值
      this.scrollY = pos.y
    },
    _scrollTo(index) { // 点击右侧锚点，快速定位
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() { // 将每组城市的高度装入 listHeight 数组里
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      Array.from(list).forEach((item, index) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    },
    selected(item) {
      this.$emit('select', item)
    }
  },
  watch: {
    cityList() {
      setTimeout(() => {
        this._calculateHeight()
      })
    },
    scrollY(newY) { // 监听Y轴坐标的变化，同步（currentIndex状态）右侧锚点的高亮，同步（diff状态）距离差
      const listHeight = this.listHeight
      const length = listHeight.length - 1
      // 当往上面拉，newY值大于0时 ，向下滑动newY值 为负值
      if (newY > 0) {
        this.currentIndex = 0
      }
      // 中间的滑动
      for (let i = 0; i < length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY > height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，并且-newY大于最后一个元素的上限
      if (-newY > listHeight[length]) {
        this.currentIndex = length
      }
      this.currentIndex = 0
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
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
    .list-shortcut-item{
      &.on{
        color:green
      }
    }
  } 

</style>