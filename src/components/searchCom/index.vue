<template>
  <div class="bar bar-nav">
  	<my-header>
  		<div class="index-header">
        <div class="def-city">
          <slot></slot>
        </div>
        <label class="search" for='search'>
        	<div class="searchIcon" v-if="ishow"></div>
          <input v-model='newValue' 
                 ref="searchInput"
                 type="text" 
                 v-on:keyup.enter="_search" 
                 id='search' :placeholder="text" 
                 class="search-btn" :class="{'text-center': !ishow}">
        	<div class='resetIcon' @click="_resetValue" v-if="ishow" v-show="newValue">x</div>
        </label>
        <input type="hidden" ref='dd'>
        <div class="publish-btn" @click="_back" >取消</div>
      </div>
  	</my-header>
  </div>
</template>

<script  type="text/ecmascript-6">
import MyHeader from '../MyHeader'
export default {
	props: {
    value: String,
    text: {
      type: String,
      default: '输入想要的服务'
    },
    path: {
      type: String,
      default: ''
    },
    ishow: {
      type: Boolean,
      default: true
    }
  },
	data() {
		return {
				newValue: ''
		}
	},
	activated() {
    this.$refs.searchInput.blur()
		this.newValue = this.value
	},
	components: {
		MyHeader
	},
	methods: {
    _resetValue() {
      this.newValue = ''
    },
		_back() {
      this.$refs.searchInput.blur()
      setTimeout(() => {
        if (this.path) {
          this.$router.push(this.path)
        } else {
          window.history.back()
        }
      }, 500)
		},
		_search(e) {
			let value = e.target.value
      this.$refs.searchInput.blur()
			this.$emit('search', value)
			// this.$emit('update:value', newValue)
		},
		_value(e) {
			let value = e.target.value
      e.target.blur()
			this.$emit('search', value)
			// this.$emit('update:value', newValue)
		}

	}
}
</script>

<style scoped lang="less" >
@import '~common/css/variable.less';
@import '~common/css/mixin.less';
.index-header{
  .flexbox();
  .flex-wrap(nowrap);
  .justify-content(space-between);
  .align-items(center);
   overflow: hidden;
}

.index-header{
  .size(100%;44px);
  color: #fff;
  font-size: 0.6rem;
  a{color: #fff;}
  .search{
    /*width: 88%;*/
    flex: 1;
    position: relative;
    .resetIcon,.searchIcon{
       position:absolute;
       .square(14px);
       top:50%;
    }
    .searchIcon{
      margin-top: -7px;
      left:10px;
      background-size: 14px 14px;
      background-image: url('./search.png');
    }
    .resetIcon{
      right: 10px;
       margin-top: -8px;
      .square(16px);
      border-radius: 100%;
      text-align: center;
      line-height: 16px;
      background-color: #888;
    }
  }
  .search-btn{
    display: block;
    .size(100%;30px);
    border: none;
    background: lighten(#F7B4B4,10%);
    border-radius: 40px;
    font-size: 12px;
    line-height: 30px;
    text-indent: 30px;
    /*text-align: center;*/
    color: @color-text-gray
  }
  .publish-btn{
    text-align: center;
    width: 40px;
  }
}
</style>
