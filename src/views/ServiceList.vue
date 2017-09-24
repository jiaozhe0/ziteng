<template>
<div class="serviceList">
	<mt-header title="服务列表"></mt-header>
	<div class="content" >
		<div class="serlist-top row">
			<div class="serlist-nav col-80">
				<type-slider ref='typeSlider' @getWidth="_getWidth">
					<div class="serlist-item text-center pull-left" 
					:class="{'on': selectedType == 0}"
					@click="selectedType=0"
					>
						<div class="img-wrap">
								<img src="" alt="" class="img-responsive">
							</div>
							<p class='type-text'>全部</p>
					</div>
					<div class="serlist-item text-center pull-left" 
								v-for="(item, index) in childTypeList"
								ref="serlistItem"
								@click="_selectedType(index)"
								:class="{'on': selectedType == ++index}" 
								>
							<div class="img-wrap">
								<img :src="item.pictureUrl" alt="" class="img-responsive">
							</div>
							<p class='type-text'>{{item.typeName}}</p>
					</div>
				</type-slider>
			</div>
			<div class="typeAll-btn col-20" @click="showTypeList = true">
				全部
			</div>
		</div>
		<!-- 排序导航 -->
		<ul class="row text-center sort-nav no-gutter" v-if="serviceList.length">
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='sale'}">销售最高</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='composite'}">综合</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort == 'comment'}">评价</li>
			<li class="col-25 sort-nav-item" :class="{'on': selectedSort=='price'}">价格最低</li>
		</ul>
		<transition name='fade'>
		<div class="serlist-nav-list text-center" v-show="showTypeList">
			<div class="top">
				全部
				<!-- <div class="pull-right">图标</div> -->
			</div>
			<ul class="row">
				<li class="col-20" v-for="(i, index) in type">{{i}}</li>
			</ul>
		</div>
		</transition>
			<transition name='fade'>
			<div class="mask" @click="showTypeList = false" v-show="showTypeList">
		</div>
		</transition>
		<!-- 服务列表 -->
		<div class="serList-conent">
			<no-datas v-if="!serviceList.length"></no-datas>
		</div>
		<router-view></router-view>
	</div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import TypeSlider from 'components/TypeSlider'
import NoDatas from 'components/NoData/index'
import {getServiceList} from 'api/search'
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			type: [],
			selectedType: 0,
			selectedSort: 'sale', // 列表排序
			showTypeList: false, // 类型导航列表显示/隐藏
			page: 0, // 页码
			serviceList: []
		}
	},
	components: {
		MtHeader,
		TypeSlider,
		NoDatas
	},
	created() {
	},
	mounted() {
	},
	activated() {
		this._getServiceList()
		this._initIndex()
	},
	computed: {
		...mapGetters(['city', 'childTypeList'])
	},
	methods: {
		_selectedType(index) {
			this.selectedType = index
		},
		_initIndex() {
			this.childTypeList.some((item, index) => {
				console.log(item.serviceTypeId + '===' + this.$route.query.serviceTypeId)
				if (item.serviceTypeId === this.$route.query.serviceTypeId) {
					this.selectedType = index
					return true
				}
			})
			console.log(`初始位置${this.selectedType}`)
		},
		_getWidth(w) {
			this.width = w
		},
		_getServiceList() {
			console.log(this.$route.query)
			let data = Object.assign({}, {baiduCity: this.city.cityId, page: 0}, this.$route.query)
			getServiceList(data).then((res) => {
				this.serviceList = res.data
				console.log(1, res)
			})
		}
	},
	watch: {
		selectedType(index) {
			if (index >= 1) {
				this.$refs.typeSlider.slider.scrollTo(-(--index) * this.width, 0, 400)
			}
		}
	}
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	bottom:0;
 	.mask{
 		position: absolute;
 		.size(100%;100%);
 		top:0;
 		left:0;
 		background-color: rgba(0,0,0,.4);
 		z-index: 8
 	}
 }

 .serlist-nav-list{
	position: absolute;
	.size(100%;140px);
	z-index: 9;
	background-color: #fff;
	font-size: 0.7rem;
	top:0;
	.top{
		padding: 8px;
		border-bottom: 1px solid @color-split
	}
 }
 .serlist-nav{
 	overflow: hidden;
 	.serlist-item{
	 	height: 64px;
	 	padding: 5px 0;
	 	border-bottom: 2px solid #fff;
	 	transition: all 0.8s @timing-fuction;
	 	.img-wrap{
	 		display: inline-block;
	 		.square(28px);
	 	}
	 	.type-text{
	 		margin: 0;
	 		font-size: 0.6rem;
	 	}
		&.on{
			border-color: @color-primary
		}
 }
 }
 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>