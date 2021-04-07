<template>
  <!--导入订单-->
  <el-dialog
    title="导入订单"
    :visible.sync="visible"
    width="700px"
    class="add-class"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <Title text="下载模板" />
    <div class="dowload">
      <el-button size="small" type="primary" @click="handleDownload">
        <i class="el-icon-download"></i> 下载模板</el-button
      >
      <p class="el-upload__tip">
        点击按钮下载模版， 并按照规定格式填写数据，黄色表头表示的列为必选项。
      </p>
    </div>
    <Title text="数据配置" />
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="来源机构" prop="from_organization_id">
            <el-cascader
              style="width: 100%"
              v-model="formData.from_organization_id"
              placeholder="请选择来源机构"
              :options="selectOptions"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属分类" prop="category_id">
            <el-cascader
              style="width: 100%"
              v-model="formData.category_id"
              placeholder="请选择所属分类"
              :options="typeOptions"
              filterable
          clearable
          :props="{ checkStrictly: true }"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属项目" prop="project_id">
            <el-select
              v-model="formData.project_id"
              placeholder="请选择所属项目"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.project_id"
                :label="item.project_name"
                :value="item.project_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="开通网课" prop="online_course">
            <el-radio-group v-model="formData.online_course">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <Title text="上传文件" />
    <div class="file-upload">
      <el-upload
        ref="upload"
        :data="uploadData"
        :headers="headers"
        :action="uploadUrl"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :before-upload="beforeUpload"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">
          <i class="el-icon-upload2"></i> 选择文件</el-button
        >
        <div slot="tip" class="el-upload__tip">
          上传文件格式仅支持xlsx， 且文件大小不得超过5M
        </div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
    <a ref="a" download=""></a>
  </el-dialog>
</template>

<script>
import { getproject } from "@/api/eda";
import { cloneOptions } from "@/utils/index";
import { getCateList, getInstitutionSelectData } from "@/api/sou";
import { importUrl, downloadUrl } from "@/api/fina";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downloadUrl,
      uploadUrl: importUrl,
      headers: {
        token: this.$store.state.user.token,
      },
      visible: this.value,
      formData: {
        from_organization_id: "",
        category_id: "",
        project_id: "",
        online_course: "",
      },
      rules: {
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        online_course: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        category_id: [{ required: true, message: "请选择", trigger: "change" }],
        project_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      uploadLoading: false,
      projectOptions: [],
      typeOptions: [],
      selectOptions: [],
      uploadData: {},
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // 下载模板
    handleDownload() {
      const a = this.$refs.a;
      a.download = "订单模板.xlsx";
      a.href = this.downloadUrl;
      a.click();
    },
    handleOpen() {
      this.getInstitutionSelectData();
      this.getproject();
      this.getCateList();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const uploadFiles = this.$refs?.upload?.uploadFiles || [];
          if (!uploadFiles.length) {
            this.$message.warning("请上传文件！");
            return;
          }
          if (uploadFiles.length > 1) {
            this.$message.error("只能上传一份文件");
            return;
          }
          this.uploadData = {
            ...this.formData,
            category_id: Array.isArray(this.formData.category_id)
              ? [...this.formData.category_id].pop()
              : this.formData.category_id,
            from_organization_id: Array.isArray(
              this.formData.from_organization_id
            )
              ? [...this.formData.from_organization_id].pop()
              : this.formData.from_organization_id,
          };
          this.$nextTick(() => {
            this.$refs.upload.submit();
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.typeOptions = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 机构下拉
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.selectOptions = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    // 获取项目下拉
    async getproject(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getproject(data);
      if (res.code === 0) {
        this.projectOptions = res.data;
      }
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
    handleUploadError() {
      this.$message.error("上传失败");
      this.$refs.upload.clearFiles();
      this.uploadLoading = false;
    },
    beforeUpload(file) {
      const fileType = file.name.substr(-4);
      const isXls = fileType === "xlsx";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isXls) {
        this.$message.error("请上.xlsx格式文件");
        return false;
      }
      if (!isLt5M) {
        this.$message.error("文件大小不能超过 5MB!");
        return false;
      }
      this.uploadLoading = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-upload__tip {
  color: #909399;
  font-size: 12px;
}
.dowload {
  margin-bottom: 10px;
}
</style>