<template>
  <div class="content">
   <ul>
     <li v-for="item in list">{{tt(item)}}</li>
   </ul>
  </div>
</template>

<script type="text/ecmascript-6">
// const Exif = require('exif-js')
// const wx = require('weixin-js-sdk')
import {camera} from 'common/js/camera'
// import {sdk} from 'api/wechat'
export default {
  data () {
    return {
      headerImage: '',
      picValue: '',
      list: [1, 2, 3, 4, 5]
    }
  },
  mounted() {
      // Grab elements, create settings, etc.
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            var mediaConfig =  { video: true };
            var errBack = function(e) {
              console.log('An error has occurred!', e)
            };

      // Put video listeners into place
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                });
            }

            /* Legacy code below! */
            else if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function(stream) {
          video.src = stream;
          video.play();
        }, errBack);
      } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
      } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function(stream){
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }, errBack);
      }

      // Trigger photo take
      document.getElementById('snap').addEventListener('click', function() {
        context.drawImage(video, 0, 0, 640, 480);
      });
  },
  created() {
    // sdk()
    // wx.ready(() => {
    //   wx.checkJsApi({
    //     jsApiList: ['chooseImage'],
    //     success(res) {
    //       alert(JSON.stringify(res))
    //     }
    //   })
    // wx.getLocation({
    //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //     success: function (res) {
    //         alert('zouni')
    //         // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //         // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //         // var speed = res.speed; // 速度，以米/每秒计
    //         // var accuracy = res.accuracy; // 位置精度
    //         alert(Object.keys(res))
    //     }
    // })
    // this.refs.photoBtn.onclick = () => {
    //    wx.chooseImage({
    //   success: function (res) {
    //     alert('已选择 ' + res.localIds.length + ' 张图片')
    //   }
    // }
    // })
  },
  // mounted() {
  //   wx.ready(() => {
  //     wx.checkJsApi({
  //       jsApiList: ['chooseImage'],
  //       success(res) {
  //         // alert(JSON.stringify(res))
  //       }
  //     })
  //   wx.getLocation({
  //       type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  //       success: function (res) {
  //           // alert('zouni')
  //           // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
  //           // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
  //           // var speed = res.speed; // 速度，以米/每秒计
  //           // var accuracy = res.accuracy; // 位置精度
  //           // alert(Object.keys(res))
  //       }
  //   })
  //   document.querySelector('#chooseImage').onclick = function () {
  //     wx.chooseImage({
  //     success: function (res) {
  //       alert('已选择 ' + res.localIds.length + ' 张图片')
  //     },
  //     fail: function (err) {
  //       let errs = ''
  //       for (let i in err) {
  //         errs += i + '=' + err[i] + '&'
  //       }
  //       alert(errs)
  //     }
  //   })
  //   }
  // })
  // },
  methods: {
    tt(val) {
      return val + 'test'
    },
    test() {
      console.log('..........')
      // console
      this.context.drawImage(this.video, 0, 0, 640, 480)
    }
    // wxPic() {
    //   alert('photo')
    //   wx.chooseImage({
    //   success: function (res) {
    //     alert('已选择 ' + res.localIds.length + ' 张图片')
    //   }
    // })
    // },
    // upload (e) {
    //   let files = e.target.files || e.dataTransfer.files
    //   if (!files.length) return
    //   alert(files[0].size)
    //   this.picValue = files[0]
    //   this.imgPreview(this.picValue)
    //   alert(this.picValue)
    // },
    // imgPreview (file) {
    //   let self = this
    //   let Orientation
    //   // 去获取拍照时的信息，解决拍出来的照片旋转问题
    //    Exif.getData(file, function() {
    //        Orientation = Exif.getTag(this, 'Orientation')
    //    })
    //   // 看支持不支持FileReader
    //   if (!file || !window.FileReader) return

    //   if (/^image/.test(file.type)) {
    //       // 创建一个reader
    //       let reader = new FileReader()
    //       // 将图片2将转成 base64 格式
    //       reader.readAsDataURL(file)
    //       // 读取成功后的回调
    //       reader.onloadend = function () {
    //         let result = this.result
    //         let img = new Image()
    //         img.src = result
    //         // 判断图片是否大于100K,是就直接上传，反之压缩图片
    //         if (this.result.length <= (100 * 1024)) {
    //           self.headerImage = this.result
    //           self.postImg()
    //         } else {
    //           img.onload = function () {
    //             let data = self.compress(img, Orientation)
    //             self.headerImage = data
    //             self.postImg()
    //           }
    //         }
    //       }
    //     }
    //   },
    //   postImg () {
    //     // 这里写接口
    //   },
    //   rotateImg (img, direction, canvas) {
    //     // 最小与最大旋转方向，图片旋转4次后回到原方向
    //     const minStep = 0
    //     const maxStep = 3
    //     if (img == null) return
    //     // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    //     let height = img.height
    //     let width = img.width
    //     let step = 2
    //     if (step == null) {
    //         step = minStep
    //     }
    //     if (direction === 'right') {
    //         step++
    //         // 旋转到原位置，即超过最大值
    //         step > maxStep && (step = minStep)
    //     } else {
    //         step--
    //         step < minStep && (step = maxStep)
    //     }
    //     // 旋转角度以弧度值为参数
    //     let degree = step * 90 * Math.PI / 180
    //     let ctx = canvas.getContext('2d')
    //     switch (step) {
    //       case 0:
    //           canvas.width = width
    //           canvas.height = height
    //           ctx.drawImage(img, 0, 0)
    //           break
    //       case 1:
    //           canvas.width = height
    //           canvas.height = width
    //           ctx.rotate(degree)
    //           ctx.drawImage(img, 0, -height)
    //           break
    //       case 2:
    //           canvas.width = width
    //           canvas.height = height
    //           ctx.rotate(degree)
    //           ctx.drawImage(img, -width, -height)
    //           break
    //       case 3:
    //           canvas.width = height
    //           canvas.height = width
    //           ctx.rotate(degree)
    //           ctx.drawImage(img, -width, 0)
    //           break
    //     }
    // },
    // compress(img, Orientation) {
    //   let canvas = document.createElement('canvas')
    //   let ctx = canvas.getContext('2d')
    //     // 瓦片canvas
    //   let tCanvas = document.createElement('canvas')
    //   let tctx = tCanvas.getContext('2d')
    //   let initSize = img.src.length
    //   let width = img.width
    //   let height = img.height
    //   // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    //   let ratio
    //   if ((ratio = width * height / 4000000) > 1) {
    //     console.log('大于400万像素')
    //     ratio = Math.sqrt(ratio)
    //     width /= ratio
    //     height /= ratio
    //   } else {
    //     ratio = 1
    //   }
    //   canvas.width = width
    //   canvas.height = height
    //   // 铺底色
    //   ctx.fillStyle = '#fff'
    //   ctx.fillRect(0, 0, canvas.width, canvas.height)
    //   // 如果图片像素大于100万则使用瓦片绘制
    //   let count
    //   if ((count = width * height / 1000000) > 1) {
    //     console.log('超过100W像素')
    //     count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
    //    // 计算每块瓦片的宽和高
    //     let nw = ~~(width / count)
    //     let nh = ~~(height / count)
    //     tCanvas.width = nw
    //     tCanvas.height = nh
    //     for (let i = 0; i < count; i++) {
    //       for (let j = 0; j < count; j++) {
    //         tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
    //         ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
    //       }
    //     }
    //   } else {
    //     ctx.drawImage(img, 0, 0, width, height)
    //   }
    //   // 修复ios上传图片的时候 被旋转的问题
    //   if (Orientation !== '' && Orientation !== 1) {
    //     switch (Orientation) {
    //       case 6: // 需要顺时针（向左）90度旋转
    //           this.rotateImg(img, 'left', canvas)
    //           break
    //       case 8: // 需要逆时针（向右）90度旋转
    //           this.rotateImg(img, 'right', canvas)
    //           break
    //       case 3: // 需要180度旋转
    //           this.rotateImg(img, 'right', canvas) // 转两次
    //           this.rotateImg(img, 'right', canvas)
    //           break
    //     }
    //   }
    //   // 进行最小压缩
    //   let ndata = canvas.toDataURL('image/jpeg', 0.1)
    //   let pic = this.dataURLtoBlob(ndata)
    //   console.log(pic)
    //   console.log('压缩前：' + initSize)
    //   console.log('压缩后：' + ndata.length)
    //   console.log('压缩率：' + (100 * (initSize - ndata.length) / initSize) + '%')
    //   tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    //   return ndata
    // },
    // dataURLtoBlob(dataurl) {
    //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n)
    //     }
    //     return new Blob([u8arr], {type: mime})
    // }
  }
}
</script>
<style scope>
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>