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
          <router-link to='/search'>
            <input type="text"  placeholder="大家都在找“家政服务”" class="search-btn">
          </router-link> 
        </div>
        <div class="publish-btn">
          <router-link to='/login'>
            地方
          </router-link>
        </div>
      </div>
    </my-header>
			<scroll :data="newsLists" class="content" ref="scroll">
        <div>
          <!-- 推荐服务类别 -->
          <nav class="index-nav row" >
            <ul class="row" v-if="serRecommend.length">
              <li class="col-20 nav-list" v-for="item in serRecommend">
                <div class="img-wrap center-block">
                  <img :src="item.serviceType.pictureUrl" class='img-responsive' alt="">
                </div>
                {{item.serviceType.typeName}}
              </li>
            </ul>
          </nav>
          <!-- 最新消息 -->
  			  <div class="news" >
            <div class="news-icon">dd</div>
            <div class="news-wrap" v-if="newsLists.length">
             <!-- <news-list :newsList="newsLists"></news-list> -->
            </div>
            <div class="server-button text-center">
              发布服务
            </div>
          </div>
          <!-- <div class="indexAdsense">
            <ul>
              <li v-for="item in indexAdsense">
                <img  @load="loadImage" :src="item.picUrl" alt="" class="img-responsive">
              </li>
            </ul> 
          </div>-->
          <service-list :serviceList="serviceList" @loadImage="_loadImage"></service-list>
          <div>{{getLsit}}</div>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
// import BScroll from 'better-scroll'
import MyHeader from 'components/MyHeader'
import ServiceList from 'components/ServiceList'
import NewsList from 'components/news'
import {mapMutations, mapGetters} from 'vuex'
// import {getDefualtCity} from 'api/system'
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
     // this._getData()
  },
  mounted() {
  },
  computed: {
    getLsit() {
      console.log(123, this.city.cityId)
      Promise.all([getClassifyRecommend(), getServiceRecommendList(this.city.cityId)]).then(([a, b]) => {
        this.serRecommend = a.serviceTypeRecommend
        this.newsLists = a.analogService
        this.indexAdsense = a.indexAdsense
        this.serviceList = b
        this.indexAdsense.forEach((item, index) => {
          this.serviceList.splice(item.appPosition, 0, item)
        })
    })
    },
    ...mapGetters(['city', 'isFooter'])
  },
  methods: {
    _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let height = 0
        let sliderHeight = this.$refs.newsItem.clientHeight
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // addClass(child, 'slider-item')
          child.style.height = sliderHeight + 'px'
          height += sliderHeight
        }
        height += 2 * sliderHeight
        this.$refs.sliderGroup.style.height = height + 'px'
      },
    _loadImage() {
      console.log('....')
      this.$refs.scroll.refresh()
    },
    _getData() {
      console.log(this.city.cityId)
      Promise.all([getClassifyRecommend(), getServiceRecommendList(this.city.cityId)]).then(([a, b]) => {
        this.serRecommend = a.serviceTypeRecommend
        this.newsLists = a.analogService
        this.indexAdsense = a.indexAdsense
        this.serviceList = b
        this.indexAdsense.forEach((item, index) => {
          this.serviceList.splice(item.appPosition, 0, item)
        })
    })
    },
    ...mapMutations({
      setFooter: 'CHANGE_FOOTER_SHOW',
      setCity: 'CHANGE_CITY'
    })
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
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
    width: 40px
  }
.news-wrap{
    flex-grow:1;
    align-self:flex-start;
    overflow: hidden;
    font-size:0.7rem;
  }
}
</style>