<template>
  <div class='city page'>
    	<mt-header title="选择城市"></mt-header>
    	<list-view ref='list' :localCity="localCity" :cityList="cityList" :letter="key" @select="selectCity"></list-view>	
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import ListView from 'components/ListView/index'
import Loading from 'components/Loading/index'
import {cityList} from 'api/city'
import {mapGetters, mapMutations} from 'vuex'
const pinyin = require('tiny-pinyin')
export default {
  data() {
    return {
      cityList: [],
      localCity: {},
      loadingShow: true
    }
  },
  components: {
    MtHeader,
    ListView,
    MtLoading: Loading
  },
  created() {
    this._getcityData()
    this.localCity = this.city
  },
  mounted() {
		console.log(this.city)
  },
  updated() {
		console.log(this.city)
  },
  computed: {
    key() {
      return 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
    },
    ...mapGetters([
			'city'
    ])
  },
  methods: {
    ...mapMutations({
      setLoading: 'LOADING'
    }),
    selectCity(city) {
       this.$store.commit('CHANGE_CITY', city)
       window.history.back()
    },
    _getcityData() {
      this.setLoading(true)
      cityList().then((res) => {
        let data = res.data
        console.log(res)
        this.cityList = this._normalizeCity(data.baiduCity)
      })
    },
    _normalizeCity(list) {
      let map = {}
      let cityList = []
      this.key.forEach((item, index) => {
          map[item] = {}
          map[item].letter = item
          map[item].item = []
      })
      list.forEach((item, index) => {
        if (pinyin.isSupported()) {
          let firstWord = item.cityName.charAt(0)
          let letter = pinyin.convertToPinyin(firstWord).charAt(0)
          map[letter].item.push({
            cityId: item.cityId,
            cityName: item.cityName
          })
        }
      })
      console.log(998, map['C'])
      let chongQing = {}
      // let shenYang = {}
      map['Z'].item = map['Z'].item.filter(items => {
        if (items.cityId === 132) {
          chongQing['cityId'] = items.cityId
          chongQing['cityName'] = items.cityName
        }
        return items.cityId !== 132
      })
      map['C'].item = map['C'].item.filter(items => {
        if (items.cityId === 132) {
          chongQing['cityId'] = items.cityId
          chongQing['cityName'] = items.cityName
        }
        return items.cityId !== 132
      })
      map['C'].item.push(chongQing)
      for (let city in map) {
       cityList.push(map[city])
      }
      this.setLoading(false)
      return cityList
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 
</style>