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
        <SliceUpload
          :data="uploadData"
          :slice-size="sliceSize"
          :before-upload="beforeUpload"
          @on-remove="handleRemove"
          :file-list="fileList"
          @on-success="handleUploadSuccess"
          ref="sliceUpload"
        />
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
import {
  updateLiveData,
  createLiveData,
  getliveDataInfo,
  recordForUpload,
} from "@/api/eda";
import SliceUpload from "./SliceUpload";
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
    SliceUpload,
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
      sliceSize: 3,
      fileList: [],
      uploadData: {
        guid: "",
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleUploadSuccess(res, file) {
      this.formData.path = res.data.path;
      this.$message.success(res.message);
      this.fileList = [{ name: file.name, url: res.data.path }];
    },
    async beforeUpload(file) {
      const bytesPerPiece = 1024 * 1024 * this.sliceSize;
      const filesize = file.size;
      const totalPieces = Math.ceil(filesize / bytesPerPiece);
      // 获取凭证
      await this.recordForUpload(totalPieces);
    },
    // 获取上传凭证
    async recordForUpload(total_slice) {
      const data = { total_slice };
      const res = await recordForUpload(data).catch(() => {
        this.uploadLoading = false;
      });
      if (res.code === 0) {
        this.uploadData.guid = res.data.guid;
      }
    },
    handleRemove() {
      this.formData.path = "";
    },
    handleOpen() {
      if (this.id) {
        this.getliveDataInfo();
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
      this.$refs.sliceUpload.clearCancel();
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