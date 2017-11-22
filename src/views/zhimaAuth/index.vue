<template>
  <div class='zhima'>
    <mt-header title="芝麻认证"></mt-header>
    <div class="content zhima-content ">
      <mt-field label="姓名" placeholder="请输入真实姓名" v-model="name"></mt-field>
      <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="nameCard"></mt-field>
      <div></div>
      <div class="btn-wrap text-center">
        <button class="footer-btn" @click="_getAuthorize">下一步</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import {Field, Toast} from 'mint-ui'
import {getAuthorize, getZmScore} from 'api/home'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      name: '',
      nameCard: ''
    }
  },
  components: {
    MtHeader,
    MtField: Field
  },
  computed: {
    ...mapGetters(['user'])
  },
  activated() {
   this._getZmScore(this.user.userId)
  },
  deactivated() {
    this.name = ''
    this.nameCard = ''
  },
  methods: {
    _getZmScore(id) {
      getZmScore(id).then(data => {
        if (data.code === '000000') {
          console.log(data)
        }
      })
    },
    _getAuthorize() {
      if (this._validate()) {
        getAuthorize({
          userId: this.user.userId,
          identityName: this.name,
          identityCard: this.nameCard
        }).then(data => {
          console.log(data)
          if (data.code === '000000') {
            console.log('跳转页面')
            this.$router.replace({path: '/zmpage', query: {path: data.data.url}})
            // window.location.href = data.data.url
          }
        })
      }
    },
    _validate() {
      let flag = true
      if (this.name === '') {
        Toast('姓名不得为空')
        return
      }
      if (this.nameCard === '') {
        Toast('身份证号不得为空')
        return
      }
      let pettern = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
      if (!pettern.test(this.nameCard)) {
        Toast('请输入正确的身份证号')
        return
      }
      return flag
    }
  }
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .zhima-content{
  bottom:0;
  .btn-wrap{
    margin-top:30px;
  }
 }

</style>