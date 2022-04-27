<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}届别`"
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
      <el-form-item label="届别名称" prop="title">
        <el-input
          style="width: 217px"
          v-model="formData.title"
          placeholder="请输入届别名称"
        />
      </el-form-item>
      <el-form-item label="所属分类" prop="category_id">
        <el-cascader
          filterable
          clearable
          v-model="formData.category_id"
          :options="categoryOptions"
          :props="{ checkStrictly: true }"
        ></el-cascader>
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
  name: "AddGrade",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    categoryOptions: {
      type: Array,
      default: () => [],
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
        category_id: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        category_id: [{ required: true, message: "请选择", trigger: "change" }],
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
        this.formData.category_id = [this.editData.category_id];
      }
    },

    async submit() {
      const { category_id } = this.formData;
      const data = {
        ...this.formData,
        category_id: [...category_id].pop(),
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


