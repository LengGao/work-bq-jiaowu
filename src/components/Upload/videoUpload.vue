<template>
  <label for="fileUpload">
    <input
      type="file"
      value="上传录播视频"
      accept="video/*"
      id="fileUpload"
      @change="fileChange($event)"
      class="file_input"
    />
    <span class="file_em">选择文件</span>
    {{ videoNames ? '视频：' + videoNames : '未选择任何文件' }}
  </label>
</template>
<script>
let getFileURL = (file) => {
  var getUrl = null
  if (window.createObjectURL != undefined) {
    // basic
    getUrl = window.createObjectURL(file)
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    getUrl = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    getUrl = window.webkitURL.createObjectURL(file)
  }
  console.log(getUrl)
  return getUrl
}

let courseTimeForm = {
  title: '',
  free: '',
  number: '',
  chapterId: '',
  content: '',
  lbDuration: '',
  mediaSite: '',
  mediaUri: '',
  mediaId: '',
  startTime: '',
  endTime: '',
  maxOnlineNum: '',
  originPrice: '',
  onlinePrice: '',
  onlineProblemPrice: '',
  mediaName: '',
  media_name: '',
}

let loading = ''
import axios from 'axios'
export default {
  inject: ['reload'],
  props: {
    videoName: String,
    editor: String, //标识编辑
    back: {
      type: String,
      default: '',
    }, //标识回顾视频
    api: {
      type: String,
      default: 'editVideoSuccess',
    },
  },
  data() {
    return {
      courseTimeForm: courseTimeForm,
      timeout: '',
      partSize: '',
      parallel: '',
      retryCount: '',
      retryDuration: '',
      region: 'cn-shanghai',
      userId: '1160528473305736',
      file: null,
      authProgress: 0,
      uploadDisabled: true,
      resumeDisabled: true,
      pauseDisabled: true,
      uploader: null,
      statusText: '',
      videoNames: '',
      hasChoosen: false,
    }
  },
  // created() {
  //   console.log(this.api)
  //   this.videoNames = this.videoName
  // },
  watch:{
    videoName(){
      this.videoNames = this.videoName
    }
  },
  methods: {
    myFunction(ele) {
      alert(Math.floor(ele.duration))
    },
    fileChange(e) {
      console.log(this.courseTimeForm, e)
      this.hasChoosen = true
      this.courseTimeForm.mediaName = e.target.value
      this.file = e.target.files[0]
      this.videoNames = e.target.files[0].name
      if (!this.file) {
        alert('请先选择需要上传的文件!')
        return
      }
      // 获取视频或者音频时长
      var audioElement = document.createElement('video')
      console.log()
      // console.log(getFileURL(this.file));
      let url = URL.createObjectURL(this.file)
      console.log(url)
      audioElement.setAttribute('src', url)
      audioElement.oncanplay = () => {}
      console.log(audioElement.duration)
      let lbDuration = 'this.myFunction()'
      let setTime = () => {
        setTimeout(() => {
          this.courseTimeForm.lbDuration = audioElement.duration
          console.log(this.courseTimeForm.lbDuration == false)
          if (!this.courseTimeForm.lbDuration) setTime()
        }, 1000)
      }
      setTime()
      var Title = this.file.name
      var userData = '{"Vod":{}}'
      if (this.uploader) {
        this.uploader.stopUpload()
        this.authProgress = 0
        this.statusText = ''
      }
      this.uploader = this.createUploader()
      console.log(userData)
      this.uploader.addFile(this.file, null, null, null, userData)
      this.uploadDisabled = false
      this.pauseDisabled = true
      this.resumeDisabled = true
    },
    submitUpload() {
      console.log('开始上传')
      if (this.editor == 'ediotr') {
        // 修改
        if (this.hasChoosen) {
          this.authUpload()
        } else {
          this.$api[this.api](this)
        }
        console.log('修改')
      } else {
        // 新增
        this.authUpload()
      }
    },
    authUpload() {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        console.log('lalllal')
        this.uploader.startUpload()
        this.uploadDisabled = true
        this.pauseDisabled = false
      }
    },
    addVideo() {
      if (this.back == 'back') {
        this.$api.addlivevideo(this)
      } else {
        this.$api.addvideo(this)
      }
    },
    createUploader(type) {
      let self = this
      let uploader = new AliyunUpload.Vod({
        timeout: self.timeout || 60000,
        partSize: self.partSize || 1048576,
        parallel: self.parallel || 5,
        retryCount: self.retryCount || 3,
        retryDuration: self.retryDuration || 2,
        region: self.region,
        userId: self.userId,
        // 添加文件成功
        addFileSuccess: function(uploadInfo) {
          console.log(uploadInfo)
          self.uploadDisabled = false
          self.resumeDisabled = false
          self.statusText = '添加文件成功, 等待上传...'
          console.log('addFileSuccess: ' + uploadInfo.file.name)
        },
        // 开始上传
        onUploadstarted: function(uploadInfo) {
          // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
          // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
          // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
          // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
          // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
          // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
          if (!uploadInfo.videoId) {
            console.log(222222)
            self.$api.createUploadVideo(self, uploadInfo, uploader)
            return
            let createUrl =
              'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateUploadVideo?Title=testvod1&FileName=aa.mp4&BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&VideoId=5bfcc7864fc14b96972842172207c9e6'
            axios.get(createUrl).then(({ data }) => {
              console.log(data)
              let uploadAuth = data.UploadAuth
              let uploadAddress = data.UploadAddress
              let videoId = data.VideoId
              uploader.setUploadAuthAndAddress(
                uploadInfo,
                uploadAuth,
                uploadAddress,
                videoId
              )
            })
            self.statusText = '文件开始上传...'
            debugger
          } else {
            // 刷新有问题
            self.$api.refreshUploadVideo(self, uploadInfo, uploader)
            return
            // 如果videoId有值，根据videoId刷新上传凭证
            // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
            let refreshUrl =
              'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' +
              uploadInfo.videoId
            axios.get(refreshUrl).then(({ data }) => {
              let uploadAuth = data.UploadAuth
              let uploadAddress = data.UploadAddress
              let videoId = data.VideoId
              uploader.setUploadAuthAndAddress(
                uploadInfo,
                uploadAuth,
                uploadAddress,
                videoId
              )
            })
          }
        },
        // 文件上传成功
        onUploadSucceed: function(uploadInfo) {
          console.log(uploadInfo)
          self.$message.success('文件上传成功!')
          // self.statusText = "文件上传成功!";
          self.courseTimeForm.mediaId = uploadInfo.videoId
          self.courseTimeForm.mediaSite = uploadInfo.file.size
          self.courseTimeForm.media_name = uploadInfo.file.name
          console.log(
            self.$parent.$parent.$parent.$parent.ruleForm.video_chapter_id
          )
          // self.$api.addvideo(self);
          self.$api.generateDataKey(self)
          console.log(self.editor)
          if (self.editor == 'ediotr') {
            // 修改
            self.$api[self.api](self)
            console.log('修改')
          } else {
            // 新增
            self.addVideo()
          }
        },
        // 文件上传失败
        onUploadFailed: function(uploadInfo, code, message) {
          console.log(
            'onUploadFailed: file:' +
              uploadInfo.file.name +
              ',code:' +
              code +
              ', message:' +
              message
          )
          self.statusText = '文件上传失败!'
          self.$message.error('文件上传失败!')
        },
        // 取消文件上传
        onUploadCanceled: function(uploadInfo, code, message) {
          console.log(
            'Canceled file: ' +
              uploadInfo.file.name +
              ', code: ' +
              code +
              ', message:' +
              message
          )
          self.statusText = '文件已暂停上传'
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function(uploadInfo, totalSize, progress) {
          loading && loading.close()
          let progressPercent = Math.ceil(progress * 100)
          self.authProgress = progressPercent
          self.statusText = '文件上传中...'
          loading = self.$loading({
            lock: true,
            text: '文件上传中...（' + progressPercent + '%）',
            spinner: 'el-icon-loading',
            // background: 'rgba(0, 0, 0, 0.7)'
            background: 'rgba(0, 0, 0, 0)',
          })
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo) {
          // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
          console.log(66666)
          self.$api.createUploadVideo(self, uploadInfo, uploader, (res) => {
            let uploadAuth = data.UploadAuth
            uploader.resumeUploadWithAuth(uploadAuth)
            console.log(
              'upload expired and resume upload with uploadauth ' + uploadAuth
            )
          })
          return
          let refreshUrl =
            'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' +
            uploadInfo.videoId
          axios.get(refreshUrl).then(({ data }) => {
            let uploadAuth = data.UploadAuth
            uploader.resumeUploadWithAuth(uploadAuth)
            console.log(
              'upload expired and resume upload with uploadauth ' + uploadAuth
            )
          })
          self.statusText = '文件超时...'
        },
        // 全部文件上传结束
        onUploadEnd: function(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files')
          self.statusText = '文件上传完毕'
          loading.close()
          self.uploader = null
        },
      })
      return uploader
    },
  },
}
</script>
<style lang="scss" scoped>
.file_em {
  padding: 5px 13px;
  line-height: 28px;
  background: $gb_color;
  color: #fff;
  border-radius: 3px;
}
.file_input {
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
