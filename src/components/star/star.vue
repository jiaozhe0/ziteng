<template>
  <div class="star" :class="starType"  v-if="starList.length > 0">
  <span v-for="(item, index) in text" :class="item" class="star-item" :id="index"></span>
  </span>
  </div>
  <div class="star" :class="starType" v-else >
    <span v-for="item in itemClasses" :class="item" class="star-item" >
  </span>
  </div>
</template>
<script type='text/ecmascript-6'>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      },
      starList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {},
    created () {},
    mounted () {
    },
    methods: {},
    computed: {
      starType() {
        return 'star-' + this.size
      },
      text() {
        return this.starList
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecial = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecial) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }

</script>
<style lang='less' scoped>
@import '../../common/css/mixin.less';
  .star {
     line-height: 10px;
    &.star-48 {
      span.star-item {
        display: inline-block;
        .size(40px; 20px);
        line-height: 20px;
         padding-right: 22px;
        /*margin-right: 22px;*/
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image('star/star48_on')
        }
        &.half {
          .bg-image('star/star48_half')
        }
        &.off {
          .bg-image('star/star48_off')
        }
      }
    }
    &.star-36 {
      .star-item{
      .size(15px; 15px);
      margin-right: 5px;
      background-size: 15px 15px;
      & + last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image('star/star36_on')
      }
      &.half {
        .bg-image('star/star36_half')
      }
      &.off {
        .bg-image('star/star36_off')
      } }
    }
    &.star-24 {
      .star-item {
        .size(10px; 10px);
        margin-right: 3px;
        background-size: 10px 10px;
        & + last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image('star/star24_on')
        }
        &.half {
          .bg-image('star/star24_half')
        }
        &.off {
          .bg-image('star/star24_off')
        }
      }
    }
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
  }
</style>
