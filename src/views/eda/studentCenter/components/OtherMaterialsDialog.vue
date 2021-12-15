<template>
  <!--添加编辑课时弹窗-->
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
      <el-form-item label="资料名称" prop="file_name">
        <el-input
          v-model="formData.file_name"
          placeholder="请输入资料名称"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="上传资料">
        <el-upload
          ref="upload"
          :data="formData"
          :headers="headers"
          :action="uploadUrl"
          :on-error="handleUploadError"
          :on-success="handleUploadSuccess"
          :auto-upload="false"
          :before-upload="beforeUpload"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
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
import { updateUserFile, createUserFile, updateUserFileName } from "@/api/eda";
export default {
  name: "OtherMaterialsDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        file_name: "",
      },
      rules: {
        file_name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      chapterOptions: [],
      addLoading: false,
      detaiLoading: false,
      uploadUrl: "/",
      headers: {
        token: this.$store.state.user.token,
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      this.uploadUrl = createUserFile;
      if (this.id) {
        this.uploadUrl = updateUserFile;
        this.formData.file_name = this.fileName;
      }
    },
    handleUploadError() {
      this.$message.error("上传失败");
      this.uploadLoading = false;
    },
    handleUploadSuccess(res) {
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      } else {
        this.$message.error(res.message);
      }
      this.$refs.upload.clearFiles();
      this.uploadLoading = false;
    },
    beforeUpload() {
      this.uploadLoading = true;
    },
    async updateUserFileName() {
      const data = {
        ...this.formData,
      };
      const res = await updateUserFileName(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const uploadFiles = this.$refs?.upload?.uploadFiles || [];
          if (!uploadFiles.length && !this.id) {
            this.$message.warning("请选择文件！");
            return;
          }
          if (this.id) {
            //修改
            this.formData.id = this.id;
          } else {
            //新增
            this.formData.uid = this.$route.query.uid || "";
          }
          // 修改文件名
          if (!uploadFiles.length) {
            this.updateUserFileName();
            return;
          }
          this.$nextTick(() => {
            this.$refs.upload.submit();
          });
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>