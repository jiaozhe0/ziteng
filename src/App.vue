<template>
  <div id="app">
    <mt-footer v-show="isFooter"></mt-footer>
     <keep-alive include="ServiceList">
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script  type="text/ecmascript-6">
import MtFooter from 'components/MyFooter/index'
import {getDefualtCity} from 'api/system'
import {mapMutations, mapGetters} from 'vuex'
// import {MP} from 'common/js/browser'
export default {
  name: 'app',
  data() {
    return {
      isHeader: true
    }
  },
  created() {
    this._getDefaultCity()
  },
  mounted() {
     this._getDefaultCity()
     setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
      })
     }, 3000)
  },
  computed: {
    ...mapGetters(['city', 'isFooter'])
  },
  components: {
   MtFooter
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
    ...mapMutations({
      setCity: 'CHANGE_CITY'
    })
  }
}
</script>

<style scoped lang="less" >
@import 'common/css/mixin.less';


</style>
