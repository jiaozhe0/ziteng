<template>
 <div ref="wrapper" class='wrapper'>
	<slot>
	</slot>
 </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: { // 是否监听 滚动事件
      type: Boolean,
      default: false
    },
    isLoadMore: { // 是否监听 滚动事件
      type: Boolean,
      default: false
    },
    isRefresh: {
			type: Boolean,
			default: false
    },
    pullup: {
       type: Boolean,
       default: false
    }
  },
  data() {
		return {
				refreshText: '下拉刷新',
				loadingMoreText: '上拉加载'
		}
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  computed: {
		h() {
			return this.$refs.w.offsetHeight
		}
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
           me.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
          this.scroll.on('touchEnd', () => {
						// alert(this.scroll.maxScrollY)
						if (this.scroll.y > 50) {
              this.$emit('scrollToTop')
            } else if (this.scroll.maxScrollY <= -700 && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
            this.$emit('scrollToGap')
          })
        }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .wrapper{
 	position: absolute;
}
 .wrapper-content{
 	.refresh-icon{
	 	position: absolute;
		.size(100%;40px);
		top:-40px;	
		border:2px solid red;
 	}
 	.loading-icon{
 		position: absolute;
		.size(100%;40px);
		bottom:-40px;
		border:2px solid red;
 	}
 }

</style>