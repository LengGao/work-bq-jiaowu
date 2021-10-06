<template>
  <div class="ali-yun-upload">
    <el-upload
      v-bind="$attrs"
      drag
      accept="video/*"
      action="/"
      :before-upload="beforeUpload"
      :http-request="upload"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="onChange"
      ref="uploadEl"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import { createUploadVideo, refreshuploadvideo } from "@/api/sou";
export default {
  name: "AliyunUpload",
  props: {
    value: {
      type: String,
      default: "",
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    onError: {
      type: Function,
      default: () => {},
    },
    defaultFiles: {
      type: Array,
      default: () => [],
    },
    videoName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      requestId: this.value,
      aliyunUpload: null,
      aliyunRegion: "cn-shanghai",
      aliyunUserId: "1160528473305736",
      fileList: [],
      duration: 0,
      elementUpload: {},
    };
  },
  watch: {
    value(val) {
      this.requestId = val;
    },
    defaultFiles: {
      handler(list) {
        this.fileList = [...list];
      },
      immediate: true,
    },
  },
  created() {
    this.initAliYun();
  },
  methods: {
    onChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    // 取消上传
    cancelUpload() {
      this.aliyunUpload.cancelFile(this.aliyunUpload._uploadList.length - 1);
    },
    handleRemove() {
      this.cancelUpload();
      this.$emit("on-remove");
    },
    beforeUpload(file) {
      if (file.type.indexOf("video") === -1) {
        this.$message.error("请上传视频");
        return false;
      }
      const paramsJson = '{"Vod":{}}';
      this.cancelUpload();
      this.aliyunUpload.addFile(file, null, null, null, paramsJson);
      this.getDuration(file);
    },
    // 获取视频时长
    getDuration(file) {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;
      video.onloadeddata = () => {
        this.duration = video.duration;
      };
    },
    upload(elementUpload) {
      this.elementUpload = elementUpload;
      this.aliyunUpload.startUpload();
    },

    //获取上传凭证
    async createUploadVideo(uploadInfo) {
      const file = uploadInfo.file;
      const file_name = file.name;
      const title = this.videoName || file.name.split(".")[0];
      const data = {
        title,
        file_name,
      };
      const res = await createUploadVideo(data).catch(() => {
        // 重置
        this.initAliYun();
      });
      if (res.code === 0) {
        const data = res.data;
        this.aliyunUpload.setUploadAuthAndAddress(
          uploadInfo,
          data.UploadAuth,
          data.UploadAddress,
          data.VideoId
        );
        return data.UploadAuth;
      }
    },
    // 刷新上传凭证
    async refreshuploadvideo(uploadInfo) {
      const data = {
        video_id: uploadInfo.videoId,
      };
      const res = await refreshuploadvideo(data).catch(() => {
        // 重置
        this.initAliYun();
      });
      if (res.code === 0) {
        const data = res.data;
        this.aliyunUpload.setUploadAuthAndAddress(
          uploadInfo,
          data.UploadAuth,
          data.UploadAddress,
          data.VideoId
        );
      }
    },
    //初始化
    initAliYun() {
      this.aliyunUpload = new AliyunUpload.Vod({
        //阿里账号ID，必须有值
        userId: this.aliyunUserId,
        //上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: this.aliyunRegion,
        //分片大小默认1 MB，不能小于100 KB
        partSize: 1024 * 1024 * 5,
        //并行上传分片个数，默认5
        parallel: 5,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 添加文件成功
        addFileSuccess: (uploadInfo) => {},
        //开始上传
        onUploadstarted: async (uploadInfo) => {
          // 没有videoId就获取凭证后上传
          if (!uploadInfo.videoId) {
            this.createUploadVideo(uploadInfo);
          } else {
            // 有就刷新凭证后上传
            this.refreshuploadvideo(uploadInfo);
          }
        },
        //文件上传成功
        onUploadSucceed: (uploadInfo) => {
          this.onSuccess({ ...uploadInfo, duration: this.duration });
          this.elementUpload.onSuccess();
        },
        //文件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          console.log("文件上传失败", code, message);
          this.onError(uploadInfo, code, message);
          this.elementUpload.onError();
        },
        //文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          let percent = Math.floor(loadedPercent * 100);
          percent && this.elementUpload.onProgress({ percent });
        },
        //上传凭证或STS token超时
        onUploadTokenExpired: (uploadInfo) => {
          const uploadAuth = this.createUploadVideo(uploadInfo);
          this.aliyunUpload.resumeUploadWithAuth(uploadAuth);
        },
        //全部文件上传结束
        onUploadEnd: (uploadInfo) => {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ali-yun-upload[disabled] {
  /deep/.el-upload-dragger {
    background-color: #efefef;
    cursor: no-drop;
    &:hover {
      border-color: #d9d9d9;
    }
  }
}
</style>