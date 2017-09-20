<template>
  <div class="attest">
    <mt-header title="我的认证"></mt-header>
    <div class="content" >
    	<p class="text-center approve-text">请选择认证身份	<br>选定后不可更改哦</p>
			<div class="check-position">
				<div class='text-center'>
					<div class="center-block approve-person position-item" :class="{'approve-person-on':checked === 'person'}"  @click="checked='person'">
					</div>
					我是个人用户
				</div>
				<div class='text-center'>
					<div class="center-block position-item approve-server" :class="{'approve-server-on':checked === 'server'}" @click="checked='server'">
					</div>
					我是商家用户
				</div>
			</div>
			
			<router-link to="" class='center-block approve-btn'>下一步{{url}}</router-link>
    	 
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
export default {
	data() {
		return {
			checked: 'person'
		}
	},
	computed: {
		url() {
			return this.checked === 'person' ? '/person' : '/server'
		}
	},
	components: {
		MtHeader
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom:0
 }
.check-position{
	.flexbox();
	.flex-wrap(nowrap);
	.justify-content(space-around);
	.align-items(center);
	overflow: hidden;
	color: @color-text-secondary
}
.approve-text{
	margin-top: 40px;
	margin-bottom:50px; 
	font-size:0.7rem;
	boreder:1px solid red;
	color: @color-text-gray
}
.approve-btn{
	.size(80%;40px);
	margin-top: 50px;
	border-radius: 8px;
	text-align: center;
	line-height: 40px;
	background-color: @color-primary;
	color:#fff;
	font-size: 0.7rem;
}
.position-item{
	.square(80px);
	background-image:url('./approve_img.png');
	background-repeat: no-repeat;
	background-size: cover;
	transition: all 0.4s;
	margin-bottom: 20px;
	font-size: 0.7rem;
	&.approve-person{
		background-position: -79px 0;
	}
	&.approve-person-on{
		background-position: 0 0;
	}
	&.approve-server{
		background-position: -238px 0;
	}
	&.approve-server-on{
		background-position: -158px 0;
	}
}
</style>