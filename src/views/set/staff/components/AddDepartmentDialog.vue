<template>
  <!--部门弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="400px"
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
      <el-form-item
        label="所属部门"
        prop="parent_id"
        :rules="[
          {
            required: title !== `编辑部门`,
            message: `请选择`,
            trigger: `change`,
          },
        ]"
      >
        <el-cascader
          :disabled="title === `编辑部门`"
          style="width: 100%"
          :options="departmentOptions"
          placeholder="请选择部门"
          clearable
          filterable
          :props="{
            value: 'id',
            label: 'title',
            checkStrictly: true,
          }"
          v-model="formData.parent_id"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="部门名称" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入部门名称"
          type="text"
          maxlength="30"
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
  getDepartmentInfo,
  modifyDepartment,
  createDepartment,
} from "@/api/set";
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
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
        parent_id: "",
      },
      rules: {
        title: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    departmentOptions() {
      return [
        {
          title: "作为一级部门",
          id: 0,
        },
      ].concat(this.options);
    },
  },
  methods: {
    // dialog 打开时
    handleOpen() {
      this.formData.parent_id = this.id;
      if (this.title === "编辑部门") {
        this.getDepartmentInfo();
      }
    },

    // 部门详情
    async getDepartmentInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getDepartmentInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const { parent_id } = this.formData;
      const data = {
        ...this.formData,
        parent_id: Array.isArray(parent_id) ? parent_id.pop() : parent_id,
      };
      if (this.title === "编辑部门") {
        data.id = this.id;
      }
      const api =
        this.title === "编辑部门" ? modifyDepartment : createDepartment;
      this.addLoading = true;
      const res = await api(data).catch(() => {
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

