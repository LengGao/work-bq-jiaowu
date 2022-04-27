<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}费用`"
    :visible="value"
    width="400px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="费用名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入费用名称" />
      </el-form-item>
      <el-form-item label="重复收费" prop="costType">
        <el-radio-group v-model="formData.costType">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addGrade, updateGrade } from "@/api/sou";
export default {
  name: "AddCost",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      addLoading: false,
      formData: {
        title: "",
        costType: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        costType: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.editData.id;
    },
  },
  methods: {
    handleOpen() {
      if (this.isEdit) {
        this.formData.title = this.editData.title;
      }
    },

    async submit() {
      const data = {
        ...this.formData,
      };
      let requestApi = addGrade;
      if (this.isEdit) {
        data.id = this.editData.id;
        requestApi = updateGrade;
      }
      this.addLoading = true;
      const res = await requestApi(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("success");
        this.hanldeClose();
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
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>


