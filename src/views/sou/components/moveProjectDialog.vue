<template>
  <!--移动项目-->
  <el-dialog
    title="移动项目"
    :visible.sync="visible"
    width="800px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="80px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="项目名称" prop="projectId">
        <el-select
          v-model="formData.projectId"
          placeholder="请选择"
          filterable
          clearable
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
import { getProjectList, moveProject } from "@/api/sou";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
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
        projectId: "",
      },
      rules: {
        projectId: [{ required: true, message: "请选择项目", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      projectOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.getProjectList();
      }
    },

    // 获取项目选项
    async getProjectList() {
      const data = {
        limit: 99999,
      };
      this.detaiLoading = true;
      const res = await getProjectList(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.projectOptions = res.data.data.filter(
          (item) => item.project_id !== this.id
        );
      }
    },
    async submit() {
      const data = {
        id: this.id,
        target_id: this.formData.projectId,
      };
      this.addLoading = true;
      const res = await moveProject(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
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
.live-dialog {
  .w-100 {
    width: 100%;
  }
  .question-bank-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 48%;
    }
  }
}
</style>