<template>
  <div class="slider" ref="sliders">
    <div class="slider-group" ref="sliderGroup" style='margin:0'>
      <slot>
      </slot>
    </div>
    <!-- <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: 0,
        currentPageIndex: 0
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this._setSliderWidth()
      //   this._initSlider()
      //   if (this.autoPlay) {
      //     this._play()
      //   }
      // }, 2000)

      window.addEventListener('resize', () => {
        if (!this.sliders) {
          return
        }
        this._setSliderWidth(true)
        this.sliders.refresh()
      })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        this.dots = this.children.length
        let height = 0
        let sliderHeight = this.$refs.sliders.clientHeight
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.height = sliderHeight + 'px'
          height += sliderHeight
        }
        if (this.loop && !isResize) {
          height += 2 * sliderHeight
        }
        this.$refs.sliderGroup.style.height = height + 'px'
        console.log(height)
      },
      _initSlider() {
        this.sliders = new BScroll(this.$refs.sliders, {
          scrollX: false,
          scrollY: true,
          momentum: false,
          snap: {
            loop: true,
            threshold: 0.3,
            speed: 400
          },
          snapLoop: true,
          snapSpeed: 400
        })
        // this.slider.goToPage(0, 1, 400)
        this.sliders.on('scrollEnd', () => {
          let pageIndex = this.sliders.getCurrentPage().pageY
          if (this.loop) {
            pageIndex -= 1
            if (pageIndex === this.dots) {
							pageIndex = 0
            }
          }
          console.log(pageIndex)
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            this._play()
          }
        })

        this.sliders.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        console.log(pageIndex)
        this.timer = setTimeout(() => {
          this.sliders.goToPage(0, pageIndex, 400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="less">
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.slider{
	height: 54px;
}
  /*.slider{
    height: 64px;
    overflow: hidden;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a{
          display: block;
          height: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img{
          display: block;
          width: 100%;
        }
      }
    }
  }*/
   /* .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      text-align: center;
      font-size: 0;
      .dot{
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%
        background: $color-text-l
        &.active{
          width: 20px
          border-radius: 5px
          background: $color-text-ll
        }
      }*/
</style>