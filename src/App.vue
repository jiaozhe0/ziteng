<template>
  <div id="app">
    <mt-footer></mt-footer>
     <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script  type="text/ecmascript-6">
import MtFooter from 'components/MtFooter'
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
    console.log(this.city)
     this._getDefaultCity()
     setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('ddd')
      })
     }, 3000)
  },
  computed: {
    ...mapGetters(['city'])
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
