<template>
  <div class="classify">
  	<mt-header title="分类"></mt-header>
  	<div class="content">
  		<div class="classify-nav pull-left"  ref='classifyNav'>
				<ul>
					<li class='classify-list'
					 v-for="(item,index) in typeList" 
					 @click="selectedType = item.serviceTypeId"
					 :class="{'on':selectedType == item.serviceTypeId}"
					 >{{item.typeName}}</li>
				</ul>
  	  </div>
  	<div class="classify-content">
			<ul>
				<li v-for="(items,index) in serviceType" v-show="selectedType == items.parentId">
					<ul class='row'>
						<li class='col-33 text-center 
						typeList-item' 
						v-for="item in items.typeList"
						@click="_goServiceList(item)" >
						<div class="img-wrap center-block">
							<img :src="item.pictureUrl" alt="" class="img-responsive">
						</div>
						<p >{{item.typeName}}</p>
						</li>
					</ul>
				</li>
			</ul>
  	</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import MtHeader from 'components/mtHeader'
import {getServiceTypeList} from 'api/search'
import {mapGetters, mapMutations} from 'vuex'
export default {
	data() {
		return {
			typeList: [],
			serviceType: [],
			selectedType: 0
		}
	},
	components: {
		MtHeader
	},
	computed: {
		...mapGetters(['parentTypeList', 'serviceTypeList', 'childTypeList'])
	},
	created() {
		// this._getServiceTypeList()
		this._initData()
	},
	mounted() {
		this.scroll = new BScroll(this.$refs.classifyNav, {
			probeType: 3,
			click: true
		})
	},
	updated() {
		if (this.scroll) {
				this.scroll.refresh()
			}
	},
	methods: {
		_initData() {
			this.typeList = this.parentTypeList
			this.serviceType = this.serviceTypeList
			this.selectedType = this.typeList[0].serviceTypeId
		},
		_goServiceList(serviceData) {
			this.serviceType.some((item) => {
				if (item.parentId === serviceData.parentId) {
					this.setServiceTypeList(item.typeList)
					return true
				}
			})
			this.$router.push({path: '/serviceList',
      query: {
      searchContent: serviceData.typeName,
      serviceParentTypeId: serviceData.parentId,
      serviceTypeId: serviceData.serviceTypeId
      }})
		},
		_getServiceTypeList() {
			getServiceTypeList().then(data => {
				let serviceType = {}
				data.forEach((item, index) => {
					if (!serviceType[item.parentId]) {
						serviceType[item.parentId] = {}
						serviceType[item.parentId]['parentId'] = item.parentId
						serviceType[item.parentId]['typeList'] = []
					}
					if (item.parentId !== 'root') {
						serviceType[item.parentId]['typeList'].push(item)
					} else if (item.parentId === 'root') {
						this.typeList.push(item)
					}
				})
				for (let key in serviceType) {
					this.serviceType.push(serviceType[key])
				}
				this.selectedType = this.typeList[0].serviceTypeId
			})
		},
		...mapMutations({
			setServiceTypeList: 'CHILDTYPELIST'
		})
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 	.classify-nav{
 		width: 110px;
 		height: 100%;
 		border-right:1px solid @color-split;
 		text-align: center;
 		font-size: 0.7rem;
 		.classify-list{
 			margin-bottom: 30px;
 			&.on{
 				color:@color-primary;
 				border-left: 3px solid @color-primary
 			}
 		}
 		ul{
 			height: auto;
 			padding-bottom: 20px
 		}
 	}
 	.classify-content{
 		margin-left: 110px;
 		.typeList-item{
 			font-size: 0.6rem;
 			margin-bottom: 25px;
 			.img-wrap{
 				.square(38px)
 			}
 			p{
 				margin-top: 5px
 			}
 		}
 		
 	}
 }

</style>