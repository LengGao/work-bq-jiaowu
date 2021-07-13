<template>
  <div class="ali-yun-upload">
    <el-button size="small" @click="handleFileSelect" :loading="uploadLoading"
      >选择文件</el-button
    >
    <transition name="el-fade-in-linear">
      <el-progress
        v-show="percentage && percentage !== 100"
        :percentage="percentage"
      ></el-progress>
    </transition>
    <ul class="file-list">
      <li class="file-item" v-for="(file, index) in fileList" :key="file.id">
        <span class="file-item-name">{{ file.name }}</span>
        <i
          class="el-icon-close file-item-delete"
          @click="handleFileDelete(index)"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  updatecreate,
  refreshuploadvideo,
  generatevideodatakey,
} from "@/api/sou";
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
  },
  data() {
    return {
      requestId: this.value,
      aliyunUpload: null,
      aliyunRegion: "cn-shanghai",
      aliyunUserId: "1160528473305736",
      fileList: [],
      percentage: 0,
      duration: 0,
      uploadLoading: false,
    };
  },
  watch: {
    value(val) {
      this.requestId = val;
    },
    defaultFiles: {
      handler(data) {
        this.fileList = [...data];
      },
      immediate: true,
    },
  },
  created() {
    this.initAliYun();
  },
  methods: {
    // 取消上传
    cancelUpload() {
      this.aliyunUpload.cancelFile(0);
      this.percentage = 0;
      this.uploadLoading = false;
    },
    handleFileDelete(index) {
      this.fileList.splice(index, 1);
      this.$emit("on-remove", index);
    },
    handleFileSelect() {
      let input = document.createElement("input");
      input.value = "选择文件";
      input.type = "file";
      input.accept = "video/*";
      input.onchange = (event) => {
        let file = event.target.files[0];
        this.beforeUpload(file);
      };
      input.click();
    },
    beforeUpload(file) {
      if (file.type.indexOf("video") === -1) {
        this.$message.error("请上传视频");
        return;
      }
      const paramsJson = '{"Vod":{}}';
      this.aliyunUpload.addFile(file, null, null, null, paramsJson);
      this.upload();
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
    upload() {
      this.aliyunUpload.startUpload();
    },
    // 视频转码
    async generatevideodatakey(video_id) {
      const data = {
        video_id,
      };
      const res = await generatevideodatakey(data);
      console.log(res);
    },
    //获取上传凭证
    async updatecreate(uploadInfo) {
      const file = uploadInfo.file;
      const file_name = file.name;
      const title = file.name.split(".")[0];
      const data = {
        title,
        file_name,
      };
      const res = await updatecreate(data).catch(() => {
        // 重置
        this.uploadLoading = false;
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
    async refreshuploadvideo(videoId) {
      const data = {
        videoId,
      };
      const res = await refreshuploadvideo(data).catch(() => {
        // 重置
        this.uploadLoading = false;
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
        addFileSuccess: (uploadInfo) => {
          this.uploadLoading = true;
          this.percentage = +(Math.random() * 1).toFixed(2);
        },
        //开始上传
        onUploadstarted: async (uploadInfo) => {
          // 没有videoId就获取凭证后上传
          if (!uploadInfo.videoId) {
            this.updatecreate(uploadInfo);
          } else {
            // 有就刷新凭证后上传
            this.refreshuploadvideo(uploadInfo.videoId);
          }
        },
        //文件上传成功
        onUploadSucceed: (uploadInfo) => {
          this.uploadLoading = false;
          this.onSuccess({ ...uploadInfo, duration: this.duration });
          this.fileList = [];
          this.fileList.push({
            name: uploadInfo.file.name,
            id: uploadInfo.videoId,
          });
          console.log(uploadInfo);
          this.generatevideodatakey(uploadInfo.videoId);
        },
        //文件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          this.fileList = [];
          this.uploadLoading = false;
          console.log("文件上传失败", code, message);
          this.onError(uploadInfo, code, message);
        },
        //文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          let progress = Math.floor(loadedPercent * 100);
          progress && (this.percentage = progress);
        },
        //上传凭证或STS token超时
        onUploadTokenExpired: (uploadInfo) => {
          this.uploadLoading = false;
          const uploadAuth = this.updatecreate();
          this.aliyunUpload.resumeUploadWithAuth(uploadAuth);
        },
        //全部文件上传结束
        onUploadEnd: (uploadInfo) => {
          this.uploadLoading = false;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file-name {
  margin-left: 10px;
  color: #909399;
}
.file-list {
  .file-item {
    padding: 4px;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &-delete {
      display: none;
    }
    &:hover {
      background-color: #f5f7fa;
      .file-item-delete {
        display: inline-block;
      }
    }
  }
}
</style>