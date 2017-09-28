<template>
  <div class='publish'>
  	<mt-header title="发布服务"></mt-header>
  	<scroll class="content">
    	<form action="" class="service-form">
    	<div class="form-item">
	    	<label for="serTitle">
	    		<input type="text" id='serTitle' placeholder="请输入一个服务标题不超过15字">
	    	</label>
	    	<label for="serDetial">
	    	<textarea name=""  placeholder="编辑服务描述，准确的描述有助于用户了解您的服务 （至少需要10个字）" id="" cols="30" rows="40" id="serDetial">
	    	</textarea>
				</label>
	    	<label for="">
	    		<div class="file-wrap">
	    			<input type="file">
	    		</div>
	    	</label>
	    	<label for="">
	    		<mt-cell title="选择服务地点" is-link>
	    	  	<span style="color: green"></span>
	    		</mt-cell>
	    	</label>
    	</div>

    	<div class="form-item">
    		<label for="">
	    		<mt-cell title="选择服务类型" is-link>
	    	  <span style="color: green"></span>
    		</mt-cell>
    		</label>
    		<label for="">
	    		<mt-cell title="价格" >
	    	  	<span><input type="text" placeholder="dd"></span>
	    	  </mt-cell>
    		</label>
    		<label for="">
	    		<mt-cell title="单位" is-link>
	    	  	<span>请选择</span>
	    	  </mt-cell>
    		</label>
    		</div>

			<div class="form-item">
    		<label for="">
	    		<mt-cell title="建议预约时间" is-link>
	    	  	<span style="color: green"></span>
    			</mt-cell>
    		</label>
    	</div>
    	</form>
    </scroll>	
    <div class="bar-footer">
    	
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import { Cell,  } from 'mint-ui'
import Scroll from 'components/Scroll'
export default {
	data() {
		return {
			publishList: []
		}
	},
	components: {
			MtHeader,
			MtCell: Cell,
			Scroll
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .mint-cell-wrapper{
		border:1px solid red;
		font-size: 40px!important;
		background-size: 40px
	}
.content{
	bottom:0;
	background:#eee;
}
.service-form{
	input,textarea{
		display:block;
		.size(100%;50px);
		border:none;
		font-size:0.7rem;
	}
	label{
		display:block;
		padding:5px 10px 0;
		border-bottom:1px solid @color-split;
	}
	input{
		line-height:50px;
	}
	textarea{
		height:160px;
	}
	.form-item{
		background:#fff;
		margin-bottom:10px;
	}
	
	.mint-cell:last-child{
		background-size:0
	}

}

</style>