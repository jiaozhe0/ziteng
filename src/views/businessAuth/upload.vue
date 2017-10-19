<template>
<div class='upload'>
    <mt-header title="上传证明材料" class='ll' path="/home/auth/server"></mt-header>
    <div class="content upload-content text-center" v-show='!upload || againUpload'>
      <!-- 名片拍摄 -->
      <div class="upload-item" v-if="this.$route.params.type == 'business'">
        <p>营业执照拍摄说明</p>
        <div class="upload-content-pic business">
        </div>
        <p class='text-left require-text'>1.请手持名片拍摄，确保姓名职务等信息拍摄清晰
        </p>
      </div>

      <!-- 在职证明 -->
      <div class="upload-item" v-if="this.$route.params.type == 'shop'">
        在职证明拍摄说明
        <div class="upload-content-pic shop">
        </div>
        <p class='text-left require-text'>1.请确保姓名/职务/公司等信息拍摄清晰
        </p>
      </div>     
      
      <!-- 上传照片按钮 -->
      <div class="upload-btn-wrap">
        <upload @uploadPicture='_uploadPicture'></upload>
      </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Upload from 'components/uploadPicture'
import Status from 'components/Status/index'
import {Cell, Popup, Toast} from 'mint-ui'
export default {
  data() {
    return {
      upload: false,  // 未提交之前
      submiting: false, // 是否在提交中
      success: true, // 提交成功
      againUpload: false, // 重新提交
      status: 0
    }
  },
  created() {
    this.setFooter(false)
    this.formData = new FormData()
    this.formData.append('userId', this.user.userId)
    this.formData.append('professionalTypeId', this.professionalTypeId)
    this.status = this.$route.query.status
  },
  components: {
    MtHeader,
    MtCell: Cell,
    MtPopup: Popup,
    Upload,
    Status
  }
}
</script>
<style scoped lang="less" >
@import '~common/css/variable.less';
@import '../../common/css/mixin.less';

.content{
  z-index: 23;
  .upload-item{
    .center-block();
    width: 262px;
    padding:50px 0 60px;
    color:#fff;
    .require-text{
      font-size: 0.6rem;
    }
  }
  .upload-content-pic{
    .size(262px;180px);
    .center-block();
    overflow: hidden;
    background-size:262px 180px;
    &.business{
      .bg-view-image('personAuth/nameCardeg')
    }
    &.shop{
      .bg-view-image('personAuth/onJobeg')
    }
  }
}
.upload-content{
  bottom:0;
  font-size:0.7rem;
  background:#000;
  .upload-btn-wrap{
    position: absolute;
    bottom: 0;
    .flexbox();
    .align-items(center);
    .justify-content(space-around);
    .size(100%;180px);
    background:#fff;
  }
}


</style>