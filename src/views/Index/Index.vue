<template>
  <div class="index">
    <my-header class="index-bar">
      <div class="index-header">
        <div class="def-city">
          <router-link to='/city' v-if="city" >
            <span class="name">{{city.cityName}}</span> <i class="city-icon"></i>
          </router-link> 
        </div>
        <div class="search">
          <div class="searchIcon"></div>
          <router-link to='/index/search'>
            <input type="text"  placeholder="大家都在找“家政服务”" class="search-btn">
          </router-link> 
        </div>
          <div @click="_publishService" class='loginBtn'>
          </div>
      </div>
    </my-header>
		s<scroller :dataList="newsLists" 
      class="index-content"
      ref="scroll"
      :refreshIcon="refreshing"
      @refresh='_refresh'
      >
        <div class='index-content-wrap'>
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
  			  <div class="news" v-if="newsLists.length">
            <div class="news-icon" ></div>
            <div class="news-wrap" >
             <news-list :newsList="newsLists"></news-list>
            </div>
            <div class="server-button text-center" @click="_publishService">
              发布服务
            </div>
          </div>
          <service-list :serviceList="serviceList" @loadImage="_loadImage"></service-list>
          <div>{{getLsit}}</div>
          </div>
        </div>
      </scroller>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroller from 'components/scroller/index'
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
      refreshing: true,
      currentPageIndex: 0,
      serviceList: []
    }
  },
  components: {
    Scroller,
    MyHeader,
    ServiceList,
    NewsList
  },
  mounted() {
  },
  activated() {
    this.setFooter(true)
    this.$refs.scroll.$refs.scroll.refresh()
  },
  computed: {
    getLsit() {
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
        this.indexAdsense.forEach((item, index) => {
          this.serviceList.splice(item.appPosition, 0, item)
          this.refreshing = false
        })
        console.log(2345, this.serviceList)
    })
    },
    ...mapGetters(['city', 'user', 'isFooter', 'serviceTypeList', 'childTypeList'])
  },
  methods: {
    _loadImage() {
      this.$refs.scroll.$refs.scroll.refresh()
    },
    _getLsit() {
      this.refreshing = true
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
        this.indexAdsense.forEach((item, index) => {
          this.serviceList.splice(item.appPosition, 0, item)
          this.refreshing = false
        })
    })
    },
    _publishService() {
      if (this.user.userId) {
        this.$router.push('/editservice')
      } else {
        this.$router.push('/login')
      }
    },
    _refresh() {
      this._getLsit()
    },
    _goServiceList(data) {
      console.log(1234567, data)
      let parentId = ''
      console.log(123456, this.serviceTypeList)
      this.serviceTypeList.some((item, index) => {
        if (item.parentId === data.serviceType.serviceTypeId || item.parentId === data.serviceType.parentId) {
           this.setServiceTypeList(item.typeList)
           parentId = item.parentId
           return true
        }
      })
      this.$router.push({path: '/serviceList',
      query: {
        searchContent: '',
        serviceParentTypeId: data.serviceType.parentId === 'root' ? parentId : data.serviceType.parentId,
        serviceTypeId: data.serviceType.parentId === 'root' ? '' : data.serviceType.serviceTypeId
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
 .index-bar{
    padding-right: 0.2rem;
    padding-left: 0.2rem;
  }
 .index .index-content{
  top:44px;
  bottom:50px;
  .index-content-wrap{
    height: auto
  }
 }
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
    width: 70%;
    position:relative;
    .searchIcon{
      position:absolute;
      .square(12px);
      top:50%;margin-top: -6px;
      left:20%;
      background-size: 12px 12px;
      background-image: url('./search.png');
    }
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
    .size(160px;28px);
    line-height: 28px;
    border-radius: 40px;
    background-color: @color-primary;
    color:#fff;
    font-size: 0.6rem
  }
  .news-icon{
    .size(70px;30px);
    .bg-view-image('index/fujin');
     background-size:cover;
     margin-right: 5px;
  }
.news-wrap{
    flex-grow:1;
    align-self:flex-start;
    overflow: hidden;
    font-size:0.7rem;
  }
}

.def-city{
  width: 60px;
  .city-icon{
    float: right;
    margin-top: -15px;
    display: inline-block;
    .square(12px);
    background-size: 12px 12px;
    .bg-view-image('Index/drop-down')
  }
  .name{
    display: inline-block;
    font-size: 0.65rem;
    .text-overflow();
    width: 50px;
    text-align: center;
  }
}

</style>