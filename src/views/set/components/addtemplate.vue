<template>
  <!-- 添加模板弹窗 -->
  <section>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="550px"
      @open="handleOpen"
      :close-on-click-modal="false"
      @closed="resetForm('ruleForm')"
    >
      <div class="content">
        <span class="title">配置合同</span>
        <el-form
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          :show-message="true"
          class="formmargin"
          v-loading="uploadLoading"
        >
          <el-form-item label="合同名称" prop="template_name">
            <el-input
              placeholder="请输入合同名称"
              v-model="ruleForm.template_name"
              style="width: 340px"
            ></el-input>
          </el-form-item>

          <el-form-item label="上传合同" prop="template_url">
            <el-upload
              class="upload-button"
              name="file"
              :headers="headers"
              :action="uploadUrl"
              :file-list="fileList"
              :on-error="handleUploadError"
              :on-success="handleUploadSuccess"
              :before-upload="beforeUpload"
              ref="upload"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip" style="width: 400px">
                上传格式仅支持PDF文件， 且文件大小不得超过5M。
              </div>
            </el-upload>
          </el-form-item>

          <!-- <el-form-item label="模板code" prop="template_code">
            <el-input placeholder="请输入模板code" v-model="ruleForm.template_code" style="width:340px;"></el-input>
          </el-form-item> -->

          <!-- <el-form-item prop="contractTemplateCode">
            <el-input placeholder="请输入模板code" v-model="ruleForm.contractTemplateCode" style="width:340px;" type="hidden"></el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hanldeCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { templateadd, templateedit, uploadUrl } from "@/api/system";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    contractInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    id: {
      type: [String, Number],
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  created() {},
  data() {
    return {
      fileList: [],
      uploadUrl,
      uploadLoading: false,
      uploadImg: this.value,
      visible: this.value,
      ruleForm: {
        id: "",
        template_name: "",
        template_url: "",
        template_code: "",
      },
      rules: {
        template_name: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        template_url: [
          { required: true, message: "请选择文件", trigger: "blur" },
        ],
      },
      headers: {
        token: this.$store.state.user.token,
      },
      dialogTitle: "添加模板",
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  created() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (var k in this.ruleForm) {
        this.ruleForm[k] = "";
      }
      this.fileList = [];
      this.hanldeCancel();
    },
    handleOpen() {
      if (this.contractInfo.id) {
        for (var i in this.contractInfo) {
          this.ruleForm[i] = this.contractInfo[i];
        }
      }
    },
    //添加模板接口
    async templateadd() {
      const data = {
        id: this.ruleForm.id,
        template_name: this.ruleForm.template_name,
        template_url: this.ruleForm.template_url,
        template_code: this.ruleForm.template_code,
      };
      const res = await templateadd(data);
      console.log(res.data.data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.hanldeCancel();
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            //修改
            this.templateedit();
          } else {
            //添加
            this.templateadd();
          }
        } else {
          return false;
        }
      });
    },
    //编辑模板接口
    async templateedit() {
      const data = {
        id: this.ruleForm.id,
        template_name: this.ruleForm.template_name,
        template_url: this.ruleForm.template_url,
        template_code: this.ruleForm.template_code,
      };
      console.log(data);
      const res = await templateedit(data);
      if (res.code == 0) {
        console.log(res);
        this.$message.success(res.message);
        this.$emit("on-success");
        this.hanldeCancel();
      }
    },

    handleUploadError() {
      this.$message.error("上传失败");
    },
    handleUploadSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.ruleForm.template_url = res.data.data.file_url;
        this.ruleForm.editTemplateUrl = res.data.data.editTemplateUrl;
        this.ruleForm.template_code = res.data.data.contractTemplateCode;
      } else {
        this.$message.error(res.message);
      }
    },
    beforeUpload() {
      if (this.$refs.upload.uploadFiles.length > 1) {
        this.$message.warning("只能上传一份！");
        return false;
      }
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.table_bottom {
  text-align: right;
}
.content {
  padding: 0 30px 30px 30px;
}
.content .title {
  display: block;
  height: 16px;
  line-height: 16px;
  border-left: 3px solid rgb(1, 153, 255);
  padding-left: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-top: 10px;
}
[data-v-7af6cb0d] .el-form-item {
  margin-bottom: 25px;
}
.btnspan {
  color: rgb(172, 172, 172);
  margin-left: 10px;
}
.formmargin {
  padding-bottom: 20px;
}

/deep/.el-dialog__footer {
  padding: 0 40px 40px 0;
}
</style>