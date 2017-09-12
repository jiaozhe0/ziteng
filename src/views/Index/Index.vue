<template>
  <div class="index">
    <my-header>
      <div class="index-header">
        <div class="def-city">济南</div>
        <div class="search">
          <input type="text" placeholder="大家都在找“家政服务”" class="search-btn">
        </div>
        <div class="publish-btn">地方</div>
      </div>
    </my-header>
			<scroll :data="test" class="content">
        <div>
        <nav class="index-nav row">
          <ul class="row">
            <li class="col-20 nav-list" v-for="item in serRecommend">
              <div class="img-wrap center-block">
                <img :src="item.serviceType.pictureUrl" class='img-responsive' alt="">
              </div>
              {{item.serviceType.typeName}}
            </li>
          </ul>
        </nav>
			  <div class="news">
          <div class="news-icon">dd</div>
          <div class="news-item">
            <ul>
              <li v-for="(l,index) in new Array(10)" class='clearfix news-item-list'>
                <div class="avatar-img pull-left">
                  <img src="./logo.png" alt="" class="img-responsive">
                </div>
                <p class="pull-left news-info">
                  {{index}}dddddddddddddddddddffffffffffffffffffff
                </p>
              </li>
            </ul>
          </div>
          <div class="server-button text-center">
            发布服务
          </div>
        </div>
        <service-list ></service-list>
        </div>
      </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'components/Scroll'
import MyHeader from 'components/MyHeader'
import ServiceList from 'components/ServiceList'
import {mapMutations, mapGetters} from 'vuex'
import {getDefualtCity} from 'api/system'
import {getClassifyRecommend} from 'api/index'

export default {
  data() {
    return {
      serRecommend: [],
      indexAdsense: []
    }
  },
  components: {
    Scroll,
    MyHeader,
    ServiceList
  },
  created() {
    this._getDefaultCity()
    this._getClassifyRecommend()
  },
  computed: {
    test() {
      var arr = new Array(99)
      arr = arr.map((item, index) => {
        return index
      })
      return arr
    },
    ...mapGetters(['city', 'isFooter'])
  },
  methods: {
    _getDefaultCity() {
      getDefualtCity().then((data) => {
        console.log(data)
      })
    },
    _getClassifyRecommend() {
      getClassifyRecommend().then((data) => {
        console.log(data)
        this.serRecommend = data.serviceTypeRecommend
        console.log(1, this.serRecommend)
      })
    },
    ...mapMutations({
      setFooter: 'CHANGE_FOOTER_SHOW'
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
  .search{
    width: 60%
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
  .size(100%,64px);
  border-top:1px solid @color-split;
  border-bottom:1px solid @color-split;
  padding: 0 10px;
  background-color: #fff;
  .server-button{
    .size(130px;30px);
    line-height: 30px;
    border-radius: 40px;
    background-color: @color-primary;
    color:#fff;
    font-size: 0.6rem
  }
  .news-icon{
    width: 34px
  }
  .news-item{
    flex-grow:1;
    margin-bottom: 20px;
    align-self:flex-start;
    overflow: hidden;
    .news-item-list{
      padding: 0 10px;
      .flexbox();
      .flex-wrap(nowrap);
       margin-bottom: 20px;
    }
    .avatar-img{
      .size(30px;30px);
      overflow: hidden;
      border-radius: 50%;
      margin-right:10px;
    }
    .news-info{
      flex:1;
      margin: 0;
      line-height: 30px;
      overflow: hidden;
      .text-overflow(block)
    }
  }

}
</style>