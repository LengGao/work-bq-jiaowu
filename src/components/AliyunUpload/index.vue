<template>
  <div class="ali-yun-upload">
    <el-button size="small" @click="handleFileSelect">选择文件</el-button>
    <ul class="file-list">
      <li class="file-item" v-for="(file, index) in fileList" :key="file.size">
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
import { updatecreate, refreshuploadvideo } from "@/api/sou";
export default {
  name: "AliyunUpload",
  props: {
    value: {
      type: String,
      default: "",
    },

    autpUpload: {
      type: Boolean,
      default: true,
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    onError: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      requestId: this.value,
      aliyunUpload: null,
      aliyunRegion: "cn-shanghai",
      aliyunUserId: "1160528473305736",
      fileList: [],
    };
  },
  watch: {
    value(val) {
      this.requestId = val;
    },
  },
  created() {
    this.initAliYun();
  },
  methods: {
    handleFileDelete(index) {
      this.fileList.splice(index, 1);
    },
    handleFileSelect() {
      let input = document.createElement("input");
      input.value = "选择文件";
      input.type = "file";
      input.onchange = (event) => {
        let file = event.target.files[0];
        this.fileList = [];
        this.fileList.push(file);
        if (this.autpUpload) {
          const paramsJson = '{"Vod":{}}';
          this.aliyunUpload.addFile(file, null, null, null, paramsJson);
          this.upload();
        }
      };
      input.click();
    },
    upload() {
      this.aliyunUpload.startUpload();
    },
    async updatecreate(uploadInfo) {
      const file = uploadInfo.file;
      const file_name = file.name;
      const title = file.name.split(".")[0];
      const data = {
        title,
        file_name,
      };
      const res = await updatecreate(data);
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
    async refreshuploadvideo(videoId) {
      const data = {
        videoId,
      };
      const res = await refreshuploadvideo(data);
      if (res.code === 0) {
        const data = res.data;
        this.aliyunUpload.setUploadAuthAndAddress(
          uploadInfo,
          data.UploadAuth,
          data.UploadAddress,
          data.VideoId
        );
        // this.aliyunUpload.resumeUploadWithAuth(res.UploadAuth);
      }
    },
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
        //开始上传
        onUploadstarted: async (uploadInfo) => {
          console.log(!uploadInfo.videoId);
          if (!uploadInfo.videoId) {
            this.updatecreate(uploadInfo);
          } else {
            this.refreshuploadvideo(uploadInfo.videoId);
          }
        },
        //文件上传成功
        onUploadSucceed: (uploadInfo) => {
          this.$emit("input", uploadInfo.videoId);
          this.onSuccess(uploadInfo);
        },
        //文件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          this.fileList = [];
          this.onError(uploadInfo, code, message);
        },
        //文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {},
        //上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo) {},
        //全部文件上传结束
        onUploadEnd: (uploadInfo) => {},
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