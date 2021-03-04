<template>
  <div>
    <!-- :action="rootDir + url.uploadImage" -->
    <el-upload
      :action="recordEdit==2?rootDir + url.alterFileList:rootDir + url.appendFile"
      accept=".mp4, .doc, .docx, .pdf, .xlsx, .xls, .png, .jpeg, .ppt, .pptx,.zip,.jpg"
      :headers="importHeaders"
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
      :limit="limitNumber"
    >
      <el-button size="small" slot="trigger" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过10MB
      </div>
    </el-upload>
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
    course_id: '',
    icon: '',
    limitNumber:'',
    recordEdit:'',
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
    // this.ruleForm.course_id = this.course_id
    this.modelSrc = ''
    // console.log(this.icon != undefined)
    // if (this.icon != undefined) {
    //   this.showfile = true
    //   setTimeout(() => {
    //     this.change()
    //   }, 1000)
    // }
    // console.log(mytoken)
  },
  watch:{
    icon(newName, oldName){
        this.change()
     },
  },
  methods: {
    handlechange(file, fileList) {
      let that = this
      console.log(file, fileList)
      this.flag = file.url
      console.log(file.url)
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
        if(that.icon){
          that.fileList = []
            that.fileList.push({
                name: that.ruleForm.suffix || '图标',
                url: that.icon,
            })
        }
    },
    submitUpload() {
      if (this.flag) {
        this.$refs.upload.submit()
        return
      }
      this.$emit('fileSuccess', '', '')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(res, file) {
      console.log(res, file)
    },
    beforeUpload(file) {
      this.ruleForm.course_id = this.course_id
      console.log(this.ruleForm)
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过 ' + 100 + 'MB!')
      }
      console.log(file)
      return isLt2M
    },
    handleUploadSuccess(res, file) {
      this.fileList.pop()
      console.log('图片上传')
      console.log(file)
      this.$emit('fileSuccess', res, file)
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    // finish() {
    //   // 获取截图的base64 数据
    //   this.$refs.cropper.getCropData((data) => {
    //     // do something
    //     this.option.img = ''
    //     this.cutImg = data
    //     let file = this.convertBase64UrlToBlob(data)
    //     this.fileImg = URL.createObjectURL(file)
    //     console.log(file, this.fileImg)
    //     this.modelSrc = this.fileImg
    //     this.fileList[0].url = this.fileImg
    //     this.imgStream = data
    //     console.log(data)
    //     this.dialogVisible = false
    //     this.previewFnsh = true
    //   })
    //   console.log(this.fileList)
    // },
    // convertBase64UrlToBlob(urlData) {
    //   let bytes = window.atob(urlData.split(',')[1]) //去掉url的头，并转换为byte
    //   //处理异常,将ascii码小于0的转换为大于0
    //   let ab = new ArrayBuffer(bytes.length)
    //   let ia = new Uint8Array(ab)
    //   for (var i = 0; i < bytes.length; i++) {
    //     ia[i] = bytes.charCodeAt(i)
    //   }
    //   return new Blob([ab], { type: 'image/jpeg' })
    // },
    // cropMoving(data) {
    //   console.log(data, '截图框当前坐标')
    // },
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
