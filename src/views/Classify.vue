<template>
  <div class="classify">
  	<div class="content">
  		<div class="classify-nav"  ref='classifyNav'>
				<ul>
					<li v-for="(i,index) in arr" @click="test()">{{index}}</li>
				</ul>
  	  </div>
  	<div class="classify-content">
			dfdsdfasfdsaf
  	</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
	data() {
		return {
		}
	},
	computed: {
		arr() {
			return new Array(60)
		}
	},
	mounted() {
		this.scroll = new BScroll(this.$refs.classifyNav, {
			probeType: 3,
			click: true
		})
	},
	methods: {
		test() {
			console.log('.......')
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	border:2px solid blue;
 	.classify-nav{
 		width: 120px;
 		height: 100%;
 		border:1px solid red;
 		ul{
 			height: auto;
 		}
 	}
 	.classify-content{
 		margin-left: 120px;
 		background: red;
 	}
 }

</style>