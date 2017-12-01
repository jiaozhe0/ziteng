<template>
 	<div class="mask" v-show="iShow">
 		<div class="payPanel">
 			  <div class="card-content text-center">
 			    <div class="card-content-inner">
						<p>确认后订单将完成，费用转入对方账户 <br>是否确认完成?</p>
 			    </div>
 			  </div>
 			  <div class="card-footer">
 			  	<div class="textOn payPanel-btn text-center" @click="_cancel(flag, $event)">取消</div>
 			  	<div class="textOn payPanel-btn text-center" @click="_finishOrder">确认</div>
 			  </div>
 		</div>
 	</div>
</template>
<script type="text/ecmascript-6">
export default {
		props: ['iShow'],
		methods: {
			_finishOrder(event) {
				if (!event._constructed) {
					this.$emit('finishOrder')
					return
				}
			},
			_cancel(flag, event) {
				if (!event._constructed) {
					this.$emit('update:iShow', false)
					return
				} else {
					return
				}
			}
		}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
.card-content-inner p{
	padding-top:30px;
}
</style>