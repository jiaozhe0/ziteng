<template>
<div class="editEvaluate">
    <mt-header title="发表评价"></mt-header>
    <scroll class="content editEvaluate-content" ref="scroll" :data="typeList"> 
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
                <li class="tag-list-item " v-for="item in typeList">
                  <input type="checkbox" :value="item.evaluateId" v-model="param.evaluateTypes">
                  {{item.evaluateTypeName}}
                </li>
            </ul>
        </div>
        <!-- 评价 -->
        <div class="reason">
            <div class="result-text">
                <textarea name="" id="" rows="10" placeholder="说点什么，帮助大家挑选更优质的服务" @keyup="_edit"></textarea>
                <div class="number">{{num}}</div>
            </div>
        </div>
       <!-- 上传图片列表 -->
       <div class="upload">
        <upload-pic-list @open="_openPicBtn" :pictures="pictures"></upload-pic-list>
       </div>
       </div>
    </scroll>
    <div class="bar bar-footer footer-btn-wrap">
      <button class="footer-btn" @click="_saveEvaluate">发表评价</button>
    </div>
     <!-- 上传照片按钮 -->
    <mt-popup v-model="uploadVisible"
     position="bottom" 
     :modal="true"
     class="sexPopup"
     >
       <upload :multiple="true" @uploadPicture='_saveEvaluatePic'></upload>
     </mt-popup>
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
import * as photo from 'common/js/photo'
export default {
    data() {
        return {
            num: 255,
            typeList: [],
            pictures: [],
            uploadVisible: false,
            describeLevel: ['off', 'off', 'off', 'off', 'off'],
            attitudeLevel: ['off', 'off', 'off', 'off', 'off'],
            professionalLevel: ['off', 'off', 'off', 'off', 'off'],
            param: {
              orderId: '',
              serviceDescribeLevel: 0,
              serviceAttitudeLevel: 0,
              serviceProfessionalLevel: 0,
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
    mounted() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    activated() {
      this.setFooter(false)
      this.param.orderId = this.$route.query.orderId
    },
    components: {
      Star,
      MtHeader,
      UploadPicList,
      Upload,
      Scroll
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
        // 编辑
        _edit(e) {
            if (this.num <= 0) {
                return
            } else {
                this.num = this.num - e.target.value.length
            }
            this.param.evaluateDescribe = e.target.value
        },
        // 获取标签列表
        _getTypes() {
          getTypes().then(data => {
            this.typeList = data
          })
        },
        // 保存评价
        _saveEvaluate() {
          saveEvaluate(this.param).then(res => {
            console.log(res)
          })
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
              saveEvaluatePic(formData).then(res => {
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
        })
    }
}
</script>
<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .editEvaluate-content{
  background-color: #eee;
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
  padding:0 10px ;
}

</style>