<template>
<ul class='attestation text-center' :class="attesType">
	<li class="attesItem" v-show="isName"><span class='attesIcon  name'></span><span v-show="isText"> 已实名认证</span></li>
	<li class="attesItem" v-show="isZhima"><span class='attesIcon zhima'></span><span v-show="isText"> 芝麻信用</span></li>
	<li class="attesItem" v-show="isBusiness"><span class='attesIcon business'></span><span v-show="isText"> 认证商家</span></li>
	<li class="attesItem" v-show="isSkill"><span class='attesIcon skill'></span><span v-show="isText"> 技能认证</span></li>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		size: Number,
		isText: {
			type: Boolean,
			default: true
		},
		name: {
			type: Number,
			default: 1
		},
		zhima: {
			type: Number,
			default: 1
		},
		business: {
			type: Number,
			default: 1
		},
		skill: {
			type: Number,
			default: 1
		}
	},
	computed: {
		attesType() {
        return 'attes-' + this.size
		},
		isName() {
			return this.name >= 4
		},
		isZhima() {
			return this.zhima >= 4
		},
		isBusiness() {
			return this.business >= 4
		},
		isSkill() {
			return this.skill >= 4
		}
	},
	created() {
		console.log(444, this.business)
	}
}
</script>

<style scoped lang="less" >
@import '../../common/css/mixin.less';
.attestation{
	margin:0;
	.flexbox();
	.align-items(center);
	.justify-content(space-around);
	.attesIcon{
		display: inline-block;
		float: left;
		&.name{
			 .bg-image('certify/nameCertify')
		}
		&.business{
			 .bg-image('Certify/businessAuth')
		}
		&.skill{
			.bg-image('Certify/skillCertify')
		}
		&.zhima{
			.bg-image('Certify/zhima')
		}
	}
	&.attes-18{
		.attesItem{
			font-size: 0.65rem;
			margin-right: 6px;
			.attesIcon{
				.square(18px);
				margin-right: 4px;
				background-size: 18px 18px;
			}
		}
	}

	&.attes-12{
		.attesItem{
			font-size: 0.5rem;
			margin-right: 6px;
			.attesIcon{
				.square(14px);
				margin-right: 4px;
				background-size: 14px 14px;
			}
		}
	}

}
</style>