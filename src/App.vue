<template>
  <div id="app">
    <mt-footer v-show="isFooter" ></mt-footer>
     <keep-alive include="ServiceList">
     <router-view></router-view>
    </keep-alive>
    <mt-loading ></mt-loading>
  </div>
</template>

<script  type="text/ecmascript-6">
import MtFooter from 'components/MyFooter/index'
import {getDefualtCity} from 'api/system'
import {mapMutations, mapGetters} from 'vuex'
import {getListRemind} from 'api/order'
import Loading from 'components/Loading/index'
export default {
  name: 'app',
  data() {
    return {
      isHeader: true,
      orderCount: 0,
      loadingShow: true
    }
  },
  created() {
    // this._getDefaultCity()
    this._getListRemind(this.user.userId)
  },
  mounted() {
     // 系统默认城市
     // this._getDefaultCity()
     setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
      })
     }, 3000)
  },
  computed: {
    ...mapGetters(['city', 'isFooter', 'user'])
  },
  components: {
   MtFooter,
   MtLoading: Loading
  },
  methods: {
    _getDefaultCity() {
      getDefualtCity().then((data) => {
        let city = {
          cityName: data[1].configValue,
          cityId: data[0].configValue
        }
        this.setCity(city)
      })
    },
    _getListRemind(id) {
      getListRemind(id).then(res => {
        if (res.code === '000000') {
          this.setOrderCount(res.data.sellListRemind.unCatch)
        }
      })
    },
    ...mapMutations({
      setCity: 'CHANGE_CITY',
      setOrderCount: 'ORDERCOUNT'
    })
  }
}
</script>

<style scoped lang="less" >
@import 'common/css/mixin.less';


</style>
