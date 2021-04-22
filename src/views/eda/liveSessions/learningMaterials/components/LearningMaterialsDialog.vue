<template>
  <!--学习资料弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="450px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="资料名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入资料名称"
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="上传资料" prop="path">
        <el-input v-show="false" v-model="formData.path"></el-input>
        <el-upload
          ref="upload"
          action="/"
          :show-file-list="!uploadLoading"
          :before-upload="beforeUpload"
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
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
import {
  updateLiveData,
  createLiveData,
  getliveDataInfo,
  liveDataUpload,
  recordForUpload,
} from "@/api/eda";
import AliyunUpload from "@/components/AliyunUpload/index";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  components: {
    AliyunUpload,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        name: "",
        path: "",
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        path: [{ required: true, message: "请上传", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      guid: "",
      uploadLoading: false,
      fileList: [],
      parallel: 5, // 并发数量
      partSize: 5, // 单片大小 5mb
      partArr: [], // 所有切片
      progress: 0, // 上传进度
      cancelPool: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  beforeDestroy() {
    this.clearCancel();
  },
  methods: {
    handleRemove() {
      this.formData.path = "";
    },
    handleOpen() {
      if (this.id) {
        this.getliveDataInfo();
      }
    },
    async beforeUpload(file) {
      const bytesPerPiece = 1024 * 1024 * this.partSize;
      const filesize = file.size;
      const totalPieces = Math.ceil(filesize / bytesPerPiece);
      this.uploadLoading = true;
      this.progress = 0;
      // 获取凭证
      await this.recordForUpload(totalPieces);
      // 开始切片
      this.sliceFile(file, bytesPerPiece);
      return Promise.reject();
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
        const formData = new FormData();
        formData.append("data", chunk, filename);
        formData.append("name", filename);
        formData.append("index_slice", index);
        formData.append("guid", this.guid);
        this.partArr.push({ formData, filename, index });
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
    async liveDataUpload({ formData, filename, index }) {
      const cancelToken = this.createCancel(index);
      const res = await liveDataUpload(formData, cancelToken).catch(() => {
        this.uploadLoading = false;
      });
      if (res.code === 0) {
        this.removeCancel(index);
        this.progress = res.data.progress;
        if (res.data.progress === 100 && this.visible) {
          this.uploadLoading = false;
          this.formData.path = res.data.path;
          this.$message.success(res.message);
          this.fileList = [{ name: filename, url: res.data.path }];
        }
      }
    },

    // 获取上传凭证
    async recordForUpload(total_slice) {
      const data = { total_slice };
      const res = await recordForUpload(data).catch(() => {
        this.uploadLoading = false;
        return Promise.reject();
      });
      if (res.code === 0) {
        this.guid = res.data.guid;
        return Promise.resolve(res);
      }
    },
    //获取详情
    async getliveDataInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getliveDataInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.formData.name = res.data.data_name;
        this.formData.path = res.data.path;
        this.fileList = [
          {
            name: `${res.data.data_name}.${res.data.extension}`,
            url: res.data.path,
          },
        ];
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        //修改
        data.id = this.id;
      } else {
        //新增
        data.live_id = this.$route.query.live_id || "";
        data.live_class_id = this.$route.query.live_class_id || "";
      }
      const api = this.id ? updateLiveData : createLiveData;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$emit("on-success");
        this.$message.success(res.message);
        this.resetForm("formData");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.fileList = [];
      this.uploadLoading = false;
      this.partArr = [];
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.clearCancel();
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-progress {
  /deep/.el-progress-bar {
    margin-right: -60px;
    padding-right: 55px;
  }
}
</style>