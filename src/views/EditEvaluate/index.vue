<template>
<div class="editEvaluate">
    <mt-header title="发表评价"></mt-header>
    <div class="content editEvaluate-content"  :data="typeList"> 
    <div class="wrap">
    	<div class="clearfix service">
    		<div class="img-wrap pull-left">
          <img :src="$route.query.pic" alt="" class="img-responsive">  
        </div>
    		<div class="text pull-left">{{$route.query.title}}</div>
    	</div>
    	<div class='evaluate-list star-list'>
    			<div class='evaluate-list-item'>服务描述:<star class='star'  :size="48" :starList="describeLevel" @click.native="_checkDes"></star></div>
    			<div class='evaluate-list-item'>服务态度:<star class='star'  :size="48" :starList="attitudeLevel" @click.native="_checkAtt"></star></div>
    			<div class='evaluate-list-item'>专业技能:<star class='star'  :size="48" :starList="professionalLevel" @click.native="_checkPro"></star></div>
    	</div>
        <div class="tag">
            <p class="title">请选择评价标签(可多选)</p>
            <ul class="tag-list center-text">
                <li class="tag-list-item " v-for="item in typeList" :class="{'on':param.evaluateTypes.indexOf(item.evaluateId)>-1}">
                  <input type="checkbox" :value="item.evaluateId" v-model="param.evaluateTypes">
                  {{item.evaluateTypeName}}
                </li>
            </ul>
        </div>
        <!-- 评价 -->
         <reason placeholder="请填写" @editReason='_reasonText'></reason>      
        <!-- 上传图片列表 -->
       <div class="upload clearfix">
        <upload-pic-list  @uploadPicture='_saveEvaluatePics' @deletePic="_deletePic" @open="_openPicBtn" :pictures="pictures" :process="process" :multiple="true"></upload-pic-list>
       </div>
       </div>
    </div>
    <div class="bar bar-footer footer-btn-wrap">
      <button class="footer-btn" @click="_saveEvaluate">发表评价</button>
    </div>
     <!-- 上传照片按钮 -->
    <!-- <mt-popup v-model="uploadVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
       <upload :multiple="true"  @uploadPicture='_saveEvaluatePics'></upload>
     </mt-popup> -->
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Star from 'components/star/star'
import {getTypes, saveEvaluate, saveEvaluatePic} from 'api/evaluate'
import {mapGetters, mapMutations} from 'vuex'
import UploadPicList from 'components/uploadPicList/index'
import Upload from 'components/uploadPicture/index'
import Scroll from 'components/Scroll'
import Reason from 'components/reason/index'
import * as photo from 'common/js/photo'
import {Toast} from 'mint-ui'
import {createObjectURL} from 'common/js/browser'
export default {
    data() {
        return {
            num: 255,
            typeList: [],
            pictures: [],
            uploadVisible: false,
            describeLevel: ['on', 'off', 'off', 'off', 'off'],
            attitudeLevel: ['on', 'off', 'off', 'off', 'off'],
            professionalLevel: ['on', 'off', 'off', 'off', 'off'],
            submiting: false,
            process: 0,
            param: {
              orderId: '',
              serviceDescribeLevel: 1,
              serviceAttitudeLevel: 1,
              serviceProfessionalLevel: 1,
              evaluateUserId: '',
              evaluatePics: [],
              evaluateTypes: [],
              evaluateDescribe: ''
            }
        }
    },
    created() {
      this._getTypes()
      this.param.evaluateUserId = this.user.userId
    },
    activated() {
      this.setFooter(false)
      this.param.orderId = this.$route.query.orderId
    },
    deactivated() {
      this.setFooter(true)
      this.describeLevel = ['on', 'off', 'off', 'off', 'off']
      this.attitudeLevel = ['on', 'off', 'off', 'off', 'off']
      this.professionalLevel = ['on', 'off', 'off', 'off', 'off']
      this.param = {
              orderId: '',
              serviceDescribeLevel: 1,
              serviceAttitudeLevel: 1,
              serviceProfessionalLevel: 1,
              evaluateUserId: this.user.userId,
              evaluatePics: [],
              evaluateTypes: [],
              evaluateDescribe: ''
            }
    },
    components: {
      Star,
      MtHeader,
      UploadPicList,
      Upload,
      Scroll,
      Reason
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
        // 描述评分
        _checkDes(e) {
          let level = parseInt(e.target.id) + 1
          this.param.serviceDescribeLevel = level
          this.describeLevel = this.describeLevel.map((item, index) => {
            if (index < level) {
              item = 'on'
            } else {
              item = 'off'
            }
            return item
          })
        },
        // 态度评分
        _checkAtt(e) {
          let level = parseInt(e.target.id) + 1
          this.param.serviceAttitudeLevel = level
          this.attitudeLevel = this.attitudeLevel.map((item, index) => {
            if (index < level) {
              item = 'on'
            } else {
              item = 'off'
            }
            return item
          })
        },
        // 技能评分
        _checkPro(e) {
          let level = parseInt(e.target.id) + 1
          this.param.serviceProfessionalLevel = level
          this.professionalLevel = this.professionalLevel.map((item, index) => {
            if (index < level) {
              item = 'on'
            } else {
              item = 'off'
            }
            return item
          })
        },
        // 获取标签列表
        _getTypes() {
          getTypes().then(data => {
            this.typeList = data
          })
        },
        // 保存评价
        _saveEvaluate() {
          if (this.submiting) {
            return
          }
          if (this.param.evaluateDescribe === '') {
            Toast('请输入评价')
            return
          }
          this.submiting = true
          this.param.evaluateTypes = this.param.evaluateTypes.map(item => {
            return {evaluateTypeId: item}
          })
          console.log(this.param)
          saveEvaluate(this.param).then(res => {
            console.log(123, res)
            this.submiting = false
            if (res.code === '000000') {
              Toast('评价成功')
              setTimeout(() => {
                  this.$router.replace({path: '/service/order/detail',
                  query: {'orderId': this.$route.query.orderId, userType: 'user'}})
              }, 2000)
            }
          })
        },
        _deletePic(index) {
          this.pictures.splice(index, 1)
          this.param.evaluatePics.splice(index, 1)
        },
        _saveEvaluatePics(file) {
          // 文件循环
          this.uploadVisible = false
          if (this.pictures.length > 6) {
            Toast('最多上传6张图片')
            return
          }
          let picture = [...file].map((item, index) => {
            this.process = 0
            // 上传图片
            let formData = new FormData()
            formData.append('file', item)
            formData.append('createOrder', index)
            saveEvaluatePic(formData, (data) => {
              console.log(data)
              let loaded = data.loaded
              let total = data.total
              this.$nextTick(() => {
                this.process = ((loaded / total) * 100).toFixed(2)
              })
            }).then(res => {
              console.log(12, res)
              this.param.evaluatePics.push({evaluatePicId: res.data.evaluatePicId})
              if (this.param.evaluatePics.length > 6) {
                this.param.evaluatePics = this.param.evaluatePics.slice(0, 6)
              }
            })
            return {picName: createObjectURL(item)}
          })
          this.pictures = this.pictures.concat(picture)
          if (this.pictures.length > 6) {
            Toast('最多上传6张图片')
            this.pictures = this.pictures.slice(0, 6)
            this.param.evaluatePics = this.param.evaluatePics.slice(0, 6)
          }
        },
        // 保存图片
        _saveEvaluatePic(file) {
          [...file].forEach((item, index) => {
            photo.imgPreview(item).then(data => {
              this.pictures.push(data)
              let formData = new FormData()
              let file = photo.dataURLtoBlob(data)
              console.log(file)
              formData.append('file', file)
              formData.append('createOrder', index)
              console.log(formData)
              saveEvaluatePic(formData, (data) => {
                console.log(data)
              }).then(res => {
                console.log(12, res)
              })
            })
          })
          this.uploadVisible = false
          console.log(12, this.pictures)
        },
        _openPicBtn() {
          this.uploadVisible = true
        },
        _uploadPicure() {},
        ...mapMutations({
          setFooter: 'CHANGE_FOOTER_SHOW'
        }),
        _reasonText(text) {
          this.param.evaluateDescribe = text
        }
    }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .editEvaluate-content{
  background-color: #eee;
  overflow-y: auto;
  .title{
    margin: 0;
    font-size: 0.7rem;
  }
  .wrap{
    height: auto;
  }
 }
 .service{
  padding:10px 15px;
  line-height: 50px;
  font-size: 0.7rem;
  background-color: #fff;
  .img-wrap{
    .square(50px);
    margin-right: 20px
  }
 }
 .tag{
  background-color: #fff;
  width: 100%;
  height: auto;
  padding:10px 10px 0;
  margin-bottom:10px;
  .tag-list{
    margin: 8px 0 0;
  }
  .tag-list-item{
    display: inline-block;
    position: relative;
    background-color: #eee;
    margin: 0 10px 10px 0;
    font-size: 0.6rem;
    padding:8px 10px;
    border-radius: 4px;
    &.on{
      background-color: @color-primary;
      color: #fff
    }
    input{
      display: block;
      position: absolute;
      .size(100%;100%);
      top:0;left: 0;
      z-index: 99;
      opacity: 0
    }
  }
 }
.star-list,.upload,.reason{
  background-color: #fff;
 }
.star-list{
  margin:10px 0;
  padding: 10px;
  div.evaluate-list-item{
    .flexbox();
    .align-items(center);
    margin-bottom: 8px;
    font-size: 0.7rem;
    &:last-child{
      margin-bottom: 0
    }
    .star{
      margin-left: 15px;
    }
  }
}
.upload{
  padding:0 10px;
  height:auto;
}
</style>