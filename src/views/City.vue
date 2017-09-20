<template>
  <div class='city'>
    	<mt-header title="城市"></mt-header>
    	<list-view ref='list' :cityList="cityList" :letter="key" @select="selectCity"></list-view>	
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import ListView from 'components/ListView'
import {cityList} from 'api/city'
import {mapGetters} from 'vuex'
const pinyin = require('tiny-pinyin')

export default {
  data() {
    return {
      cityList: []
    }
  },
  components: {
    MtHeader,
    ListView
  },
  created() {
    this._getcityData()
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
    selectCity(city) {
       this.$store.commit('CHANGE_CITY', city)
       window.history.back()
    },
    _getcityData() {
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

      for (let key in map) {
        let cityList = map[key].item
        cityList.sort((a, b) => {
          return b.cityName.localeCompare(a.cityName)
        })
      }

      for (let city in map) {
       cityList.push(map[city])
      }
      return cityList
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 

</style>