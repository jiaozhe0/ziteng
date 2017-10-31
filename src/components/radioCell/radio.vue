<template>
<div>
	<slot></slot>
</div>
</template>

<script type="text/ecmascript-6">
import { parentMixin } from './mix'
export default {
	mixins: [parentMixin]
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';

</style>