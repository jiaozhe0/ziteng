<template>
<div class="face">
	<div v-for="(value, key) in emojiList" class='face-item'>
		<img :src="path + value" alt="" @click="_selectFace(key)" class="faces">
	</div>
	<!-- <img :src="'./faces/'+src" alt=""> -->
</div>
</template>

<script type="text/ecmascript-6">
const emoji = require('../../im/emoji')
export default {
	data() {
		return {
			emojiList: emoji.map,
			path: emoji.path,
			src: 'ee_2.png'
		}
	},
	methods: {
		_selectFace(item) {
			this.$emit('selectFace', item)
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .face{
 	.flexbox();
 	.align-items(center);
 	.justify-content(flex-start);
 	.flex-wrap(wrap);
 	 background:#fff;
 	 line-height: 20px;
 	.align-content(flex-start);
 	.faces{
 		display: inline-block;
 		.square(28px)
 	}
 	.face-item{
 		padding:2px 4px;
 	}
 }

</style>