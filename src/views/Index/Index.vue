<template>
  <div class="index">
    <my-header>
      <div class="index-header">
        <div class="def-city">
          <router-link to='/city' v-if="city" >
            {{city.cityName}}
          </router-link> 
        </div>
        <div class="search">
          <router-link to='/index/search'>
            <input type="text"  placeholder="大家都在找“家政服务”" class="search-btn">
          </router-link> 
        </div>
          <div @click="_publishService" class='loginBtn'>
          </div>
      </div>
    </my-header>
			<scroll :data="newsLists" class="content" ref="scroll" :listenScroll="true">
        <div>
          <!-- 推荐服务类别 -->
          <nav class="index-nav row" >
            <ul class="row" v-if="serRecommend.length">
              <li @click="_goServiceList(item)" class=" needsclick col-20 nav-list" v-for="item in serRecommend">
                <div class="img-wrap center-block">
                  <img :src="item.serviceType.pictureUrl" class='img-responsive' alt="">
                </div>
                {{item.serviceType.typeName}}
              </li>
            </ul>
          </nav>
          <!-- 最新消息 -->
  			  <div class="news" >
            <div class="news-icon"></div>
            <div class="news-wrap" v-if="newsLists.length">
             <news-list :newsList="newsLists"></news-list>
            </div>
            <div class="server-button text-center" @click="_publishService">
              发布服务
            </div>
          </div>
          <service-list :serviceList="serviceList" @loadImage="_loadImage"></service-list>
          <div>{{getLsit}}</div>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import MyHeader from 'components/MyHeader'
import ServiceList from 'components/ServiceList'
import NewsList from 'components/news'
import {mapMutations, mapGetters} from 'vuex'
import {getClassifyRecommend, getServiceRecommendList} from 'api/index'
export default {
  data() {
    return {
      serRecommend: [],
      indexAdsense: [],
      newsLists: [],
      currentPageIndex: 0,
      serviceList: []
    }
  },
  components: {
    Scroll,
    MyHeader,
    ServiceList,
    NewsList
  },
  created() {
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    getLsit() {
      console.log(this.city.cityId)
      Promise.all([getClassifyRecommend(), getServiceRecommendList(this.city.cityId)]).then(([a, b]) => {
        this.serRecommend = a.serviceTypeRecommend
        this.newsLists = a.analogService // 新闻
        this.indexAdsense = a.indexAdsense.map(item => {
          let id = item.appProtocol.split('servicelist/')[1]
          let idArr = id.split('&')
          item.typeId = {}
          idArr.forEach(idItem => {
            let arr = idItem.split('=')
            item.typeId[arr[0]] = arr[1]
          })
          return item
        })
        this.serviceList = b
        console.log(this.serviceList)
        this.indexAdsense.forEach((item, index) => {
          this.serviceList.splice(item.appPosition, 0, item)
        })
    })
    },
    ...mapGetters(['city', 'user', 'isFooter', 'serviceTypeList', 'childTypeList'])
  },
  methods: {
    _loadImage() {
      this.$refs.scroll.refresh()
    },
    _publishService() {
      if (this.user.userId) {
        this.$router.push('/editservice')
      } else {
        this.$router.push('/login')
      }
    },
    _goServiceList(data) {
      console.log(data)
      this.serviceTypeList.some((item, index) => {
        console.log(item.parentId + '----' + data.serviceType.serviceTypeId)
        if (item.parentId === data.serviceType.serviceTypeId || item.parentId === data.serviceType.parentId) {
           this.setServiceTypeList(item.typeList)
           return true
        }
      })
      this.$router.push({path: '/serviceList',
      query: {
        searchContent: data.serviceType.typeName,
        serviceParentTypeId: data.serviceTypeId,
        serviceTypeId: data.serviceTypeId
      }})
    },
    ...mapMutations({
      setFooter: 'CHANGE_FOOTER_SHOW',
      setCity: 'CHANGE_CITY',
      setServiceTypeList: 'CHILDTYPELIST'
    })
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '../../common/css/mixin.less';
.index,.content{
  background-color: #eee;
}
.index-nav{
  .size(100%;180px);
  padding: 5px 10px;
  text-align: center;
  margin-left: 0;
  background-color: #fff;
  .nav-list{
   margin-bottom: 15px;
   font-size: 0.6rem;
  .img-wrap{
    .square(30px);
    margin-bottom: 10px;
  }
  }
}
.news,.index-header{
  .flexbox();
  .flex-wrap(nowrap);
  .justify-content(space-around);
  .align-items(center);
   overflow: hidden;
   
}
.index-header{
  .size(100%;44px);
  color: #fff;
  font-size: 0.7rem;
  a{color: #fff;}
  .search{
    width: 70%
  }
  .search-btn{
    display: block;
    .size(100%;30px);
    text-align: center;
    border: none;
    background: lighten(#F7B4B4,10%);
    border-radius: 40px;
    font-size: 12px;
    line-height: 30px;   
  }
  .loginBtn{
    display: inline-block;
    .square(24px);
    .bg-view-image('Index/index-plus');
    background-size: 24px 24px;
  }
}
.news{
  .size(100%,54px);
  border-top:1px solid @color-split;
  border-bottom:1px solid @color-split;
  padding: 0 10px;
  background-color: #fff;
  .server-button{
    .size(110px;30px);
    line-height: 30px;
    border-radius: 40px;
    background-color: @color-primary;
    color:#fff;
    font-size: 0.6rem
  }
  .news-icon{
    .square(34px);
    .bg-view-image('index/fujin');
     background-size: 34px 34px;
     margin-right: 5px;
  }
.news-wrap{
    flex-grow:1;
    align-self:flex-start;
    overflow: hidden;
    font-size:0.7rem;
  }
}
</style>