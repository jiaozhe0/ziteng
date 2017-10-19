<template>
  <div class="bar bar-nav">
  	<my-header>
  		<div class="index-header">
        <div class="def-city">
          <slot></slot>
        </div>
        <label class="search" for='search'>
        	<span></span>
          <input v-model='newValue' 
                 type="text" 
                 v-on:keyup.enter="_search" 
                 id='search' :placeholder="text" 
                 class="search-btn">
        	<span></span>
        </label>
        <input type="hidden" ref='dd'>
        <div class="publish-btn" @click="_back" >取消</div>
      </div>
  	</my-header>
  </div>
</template>

<script  type="text/ecmascript-6">
import MyHeader from './MyHeader'
export default {
	props: {
    value: String,
    text: {
      type: String,
      default: '输入想要的服务'
    }
  },
	data() {
		return {
				newValue: ''
		}
	},
	activated() {
		this.newValue = this.value
	},
	components: {
		MyHeader
	},
	methods: {
		_back() {
			window.history.back()
		},
		_search(e) {
			let value = e.target.value
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
  }
  .search-btn{
    display: block;
    .size(100%;30px);
    border: none;
    background: lighten(#F7B4B4,10%);
    border-radius: 40px;
    font-size: 12px;
    line-height: 30px;
    /*text-indent: 30px;*/
    text-align: center;
    color: @color-text-gray
  }
  .publish-btn{
    text-align: center;
    width: 40px;
  }
}
</style>
