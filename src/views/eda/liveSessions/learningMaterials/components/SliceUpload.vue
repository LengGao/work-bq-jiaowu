<template>
  <el-upload
    ref="upload"
    action="/"
    :show-file-list="!uploadLoading"
    :before-upload="_beforeUpload"
    :file-list="fileList"
    :on-remove="handleRemove"
  >
    <el-button
      :loading="uploadLoading"
      slot="trigger"
      size="small"
      type="primary"
      >上传文件</el-button
    >
    <el-progress
      v-if="uploadLoading"
      class="upload-progress"
      :percentage="progress"
    ></el-progress>
  </el-upload>
</template>

<script>
import axios from "axios";
import { liveDataUpload } from "@/api/eda";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    beforeUpload: {
      type: Function,
      default: () => Promise.resolve(),
    },
    // 文件切片大小
    sliceSize: {
      type: [Number, String],
      default: 5,
    },
    // 并发数量
    parallel: {
      type: [Number, String],
      default: 4,
    },
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      uploadLoading: false,
      partArr: [], // 所有切片
      progress: 0, // 上传进度
      cancelPool: [], // 上传中的请求
    };
  },
  beforeDestroy() {
    this.clearCancel();
  },
  methods: {
    handleRemove() {
      this.$emit("on-remove");
    },
    async _beforeUpload(file) {
      this.uploadLoading = true;
      this.progress = 0;
      await this.beforeUpload(file);
      const bytesPerPiece = 1024 * 1024 * this.sliceSize;
      this.sliceFile(file, bytesPerPiece);
      return Promise.reject();
    },
    dataToFormData(data) {
      const formData = new FormData();
      for (let k in data) {
        formData.append(k, data[k]);
      }
      return formData;
    },
    //文件切片
    sliceFile(file, bytesPerPiece) {
      let start = 0;
      let end;
      let index = 0;
      const filesize = file.size;
      const filename = file.name;
      //计算文件切片总数
      while (start < filesize) {
        end = start + bytesPerPiece;
        if (end > filesize) {
          end = filesize;
        }
        const chunk = file.slice(start, end); //切割文件
        const formData = this.dataToFormData({
          data: chunk,
          name: filename,
          index_slice: index,
          ...this.data,
        });
        this.partArr.push({ formData, file, index });
        start = end;
        index++;
      }
      // 发起上传请求
      this.partUpload();
    },
    // 分片上传
    partUpload() {
      const leng = this.partArr.length;
      const end = leng > this.parallel ? this.parallel : leng;
      // 每次取 发起 this.parallel 个上传请求
      const arr = this.partArr.splice(0, end);
      Promise.all(arr.map((item) => this.liveDataUpload(item))).then(() => {
        if (leng) {
          this.partUpload();
        }
      });
    },
    // 创建 CancelToken 用来取消上传请求
    createCancel(id) {
      const CancelToken = axios.CancelToken;
      return new CancelToken((cancel) => {
        this.cancelPool.push({ cancel, id });
      });
    },
    // 移除完成的
    removeCancel(id) {
      this.cancelPool.forEach((item, index) => {
        if (id === item.id) {
          this.cancelPool.splice(index, 1);
        }
      });
    },
    // 取消并清空请求
    clearCancel() {
      this.cancelPool.forEach(({ cancel }) => cancel());
      this.cancelPool = [];
    },
    // 上传请求
    async liveDataUpload({ formData, file, index }) {
      const cancelToken = this.createCancel(index);
      const res = await liveDataUpload(formData, cancelToken).catch(() => {
        this.uploadLoading = false;
      });
      if (res.code === 0) {
        this.removeCancel(index);
        this.progress = res.data.progress;
        if (res.data.progress === 100) {
          this.$emit("on-success", res, file);
          this.uploadLoading = false;
        }
      }
    },
  },
};
</script>

<style>
</style>