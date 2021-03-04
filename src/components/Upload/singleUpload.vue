<template>
  <div>
    <!-- :action="rootDir + url.uploadImage" -->
    <el-upload
      :action="rootDir + url.uploadImage"
      :headers="importHeaders"
      name="image"
      ref="upload"
      list-type="picture"
      :multiple="false"
      :data="ruleForm"
      :file-list="fileList"
      :auto-upload="false"
      :show-file-list="showfile"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :on-change="handlechange"
    >
      <el-button size="small" slot="trigger" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过10MB
      </div>
    </el-upload>
    <div class="model-show" v-show="previewFnsh">
      <img :src="modelSrc" alt />
    </div>
    <!-- vueCropper 剪裁图片实现-->
    <!-- <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
          <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" @real-time="realTime" :high="option.high" @img-load="imgLoad" mode="cover" :max-img-size="option.max" @crop-moving="cropMoving"></vue-cropper>
        </div>
    <div
          class="show-preview"
          :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '15px'}"
        >
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
    </div>
      <div slot="footer" class="dialog-footer">
    <button @click="finish('blob')" class="btn">preview(blob)</button>
    <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finish">确认</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import url from '@/assets/js/url'
import Cookies from 'js-cookie'
let defaultfileList = {
  name: '',
  url: '',
}
let mytoken = Cookies.get('loginToken')

export default {
  name: 'singleUpload',
  props: {
    value: String,
    ruleForm: Object,
    icon: '',
  },
  data() {
    return {
      url,
      icons: false,
      dialogVisible: false,
      fileList: [],
      flag: false,
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [],
      importHeaders: {
        token: mytoken,
      },
      option: {
        img: '',
        // size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        // autoCropWidth: 160,
        // autoCropHeight: 150,
        centerBox: false,
        high: true,
        max: 99999,
      },
      show: true,
      fixed: true,
      fixedNumber: [16, 9],
      loading: false,
      cutImg: '',
      previewFnsh: false,
      logo: '',
      showfile: true,
    }
  },
  created() {
    this.importHeaders.token = this.$store.getters.token
    console.log(this.$store.getters.token)
  },
  mounted() {
    this.modelSrc = ''
    console.log(this.icon != undefined)
    if (this.icon != undefined) {
      this.showfile = true
      setTimeout(() => {
        this.change()
      }, 1000)
    }
    console.log(mytoken)
  },
  methods: {
    handlechange(file, fileList) {
      let that = this
      console.log(file, fileList)
      this.flag = file.url
      console.log(file.url)
      // this.$nextTick(() => {
      //   that.option.img = file.url;
      //   that.dialogVisible = true;
      //   console.log(that.option.img);
      // });
      // this.$refs.upload.clearFiles(); //清除文件对象
      // this.logo = file.raw; // 取出上传文件的对象，在其它地方也可以使用
      // this.fileList = [{ name: file.name, url: file.url }]; // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
      // console.log(this.fileList)
    },
    imgLoad(msg) {
      console.log(msg)
    },
    UploadImage(param) {
      console.log(param)
      alert('ewew')
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
    },
    realTime(data) {
      this.previews = data
    },
    change() {
      let that = this
      that.fileList.push({
        name: '图标',
        url: that.icon,
      })
    },
    submitUpload() {
      if (this.flag) {
        this.$refs.upload.submit()
        // console.log(this.ruleForm);
        return
      }
      this.$emit('imgSuccess', '', '')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(res, file) {
      console.log(res, file)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 ' + 10 + 'MB!')
      }
      console.log(file)
      return isLt2M
    },
    handleUploadSuccess(res, file) {
      this.fileList.pop()
      console.log('图片上传')
      this.$emit('imgSuccess', res, file)
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // do something
        this.option.img = ''
        this.cutImg = data
        let file = this.convertBase64UrlToBlob(data)
        this.fileImg = URL.createObjectURL(file)
        console.log(file, this.fileImg)
        this.modelSrc = this.fileImg
        this.fileList[0].url = this.fileImg
        this.imgStream = data
        console.log(data)
        this.dialogVisible = false
        this.previewFnsh = true
      })
      console.log(this.fileList)
    },
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(',')[1]) //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    },
    cropMoving(data) {
      console.log(data, '截图框当前坐标')
    },
  },
}
</script>
<style lang="scss" scoped>
.cropper-content {
  display: flex;
  .cropper {
    width: 500px;
    height: 500px;
    margin: 30px auto;
  }
}
</style>
